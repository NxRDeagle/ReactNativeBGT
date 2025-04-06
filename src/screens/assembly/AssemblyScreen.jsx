import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {assembly} from '../../constants';
import {getAssemblies, delAssemb} from '../../services/routes';
import AssemblyComponent from './components/AssemblyComponent';
import LikeBtn from './components/LikeBtn';

export default function AssemblyScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;

  const [assemblyInfo, setAssemblyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserId(parsedUser.id);
          setLogin(parsedUser.nickname);
        }

        const response = await getAssemblies();
        const data = response?.data ?? [];
        const foundAssembly = data.find(item => item.assembly_id === id) ?? [];
        console.log(`FOUND: ${JSON.stringify(foundAssembly)}`);

        if (!foundAssembly) {
          throw new Error('Сборка не найдена');
        }

        const transformedAssembly = {
          ...foundAssembly,
          cpu: foundAssembly.components.find(c => c.type === 'cpu'),
          gpu: foundAssembly.components.find(c => c.type === 'gpu'),
          ram: foundAssembly.components.filter(c => c.type === 'ram'),
          motherboard: foundAssembly.components.find(
            c => c.type === 'motherboard',
          ),
          hull: foundAssembly.components.find(c => c.type === 'hull'),
          'hard-disk': foundAssembly.components.filter(
            c => c.type === 'hard-disk',
          ),
          'power-supply': foundAssembly.components.find(
            c => c.type === 'power-supply',
          ),
          cooler: foundAssembly.components.find(c => c.type === 'cooler'),
        };

        setAssemblyInfo(transformedAssembly);
      } catch (e) {
        setError(e.message);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const getStatusAssembly = assemblyInfo => {
    if (!assemblyInfo) return false;

    let logic = true;
    assembly.forEach(c => {
      if (Array.isArray(assemblyInfo[c.code_name])) {
        assemblyInfo[c.code_name].forEach(item => {
          if (item?.status !== 'accepted') {
            logic = false;
          }
        });
      } else {
        if (assemblyInfo[c.code_name]?.status !== 'accepted') {
          logic = false;
        }
      }
    });
    return logic;
  };

  const deleteAssembly = async id => {
    try {
      await delAssemb(id);
      navigation.goBack();
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось удалить сборку');
    }
  };

  const goComponent = (id, type) => {
    navigation.navigate('Component', {id, type});
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!assemblyInfo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Сборка не найдена!</Text>
      </View>
    );
  }

  const isAssemblyConfirmed = getStatusAssembly(assemblyInfo);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{assemblyInfo.assembly_name}</Text>

      <View style={styles.authorContainer}>
        <Image
          source={{uri: assemblyInfo.author_avatar}}
          style={styles.avatar}
        />
        <Text style={styles.authorName}>{assemblyInfo.author}</Text>
      </View>

      <View style={styles.componentsList}>
        {assembly.map(item => (
          <React.Fragment key={item.code_name}>
            {Array.isArray(assemblyInfo[item.code_name])
              ? assemblyInfo[item.code_name].map(d => (
                  <AssemblyComponent
                    key={`${item.code_name}${d.id}`}
                    logo={d.logo}
                    price={d.price}
                    onPress={() => goComponent(d.id, item.type)}>
                    {item.note} {d.name}
                  </AssemblyComponent>
                ))
              : assemblyInfo[item.code_name] && (
                  <AssemblyComponent
                    key={`${item.code_name}${assemblyInfo[item.code_name].id}`}
                    logo={assemblyInfo[item.code_name].logo}
                    price={assemblyInfo[item.code_name].price}
                    onPress={() =>
                      goComponent(assemblyInfo[item.code_name].id, item.type)
                    }>
                    {item.note} {assemblyInfo[item.code_name].name}
                  </AssemblyComponent>
                )}
          </React.Fragment>
        ))}

        <View
          style={[
            styles.statusContainer,
            isAssemblyConfirmed ? styles.statusOk : styles.statusWarning,
          ]}>
          <Text style={styles.statusText}>
            {isAssemblyConfirmed
              ? 'Сборка подтверждена!'
              : 'Сборка не подтверждена, возможно один или несколько компонентов могут нести не достоверную информацию!'}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Итого: {assemblyInfo.price} Руб.</Text>

        {login === assemblyInfo.author && (
          <TouchableOpacity
            onPress={() => deleteAssembly(assemblyInfo.assembly_id)}
            style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Удалить сборку</Text>
          </TouchableOpacity>
        )}

        <LikeBtn
          userId={userId}
          assembId={assemblyInfo.assembly_id}
          likes={assemblyInfo.likes}
        />
      </View>
    </ScrollView>
  );
}

// Стили остаются без изменений
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '500',
  },
  componentsList: {
    marginBottom: 20,
  },
  statusContainer: {
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  statusOk: {
    backgroundColor: '#d4edda',
  },
  statusWarning: {
    backgroundColor: '#f8d7da',
  },
  statusText: {
    color: '#155724',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});
