import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {assembLike} from '../../../service/route';
import AppSvg from '../../../svg/AppSvg';

export default function AssemblyBox({assemblyInfo}) {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);

  useEffect(() => {
    const checkLike = async () => {
      const user = await AsyncStorage.getItem('user');
      const userId = user ? JSON.parse(user).id : null;
      setLike(assemblyInfo.likes.includes(userId));
      setCountLike(assemblyInfo.likes.length);
    };
    checkLike();
  }, [assemblyInfo.likes]);

  const handleLike = async () => {
    const user = await AsyncStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    if (!userId) return;

    const data = {
      user_id: userId,
      assembly_id: assemblyInfo.assembly_id,
    };

    try {
      const response = await assembLike(data);
      setLike(response.like);
      setCountLike(prev => (response.like ? prev + 1 : prev - 1));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const goToAssembly = () => {
    navigation.navigate('Assembly', {id: assemblyInfo.assembly_id});
  };

  return (
    <View style={styles.assemblyBox}>
      <View style={styles.logoBox}>
        <Image
          source={{uri: assemblyInfo.image_url}}
          style={styles.assemblyImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.assemblyName}>
          Название сборки: {assemblyInfo.assembly_name}
        </Text>
        <Text style={styles.assemblyAuthor}>
          Автор сборки: {assemblyInfo.author}
        </Text>

        {assemblyInfo.components?.map((component, index) => (
          <Text key={index} style={styles.componentItem}>
            * {component.type}: {component.name}
          </Text>
        ))}
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.price}>{assemblyInfo.price} Руб.</Text>

        <TouchableOpacity onPress={goToAssembly} style={styles.detailsButton}>
          <Text style={styles.buttonText}>Подробнее о сборке</Text>
        </TouchableOpacity>

        <View style={styles.likeContainer}>
          <Text style={styles.likeCount}>{countLike}</Text>
          <TouchableOpacity onPress={handleLike}>
            <AppSvg
              type={like ? 'like-filled' : 'like'}
              style={styles.likeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assemblyBox: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoBox: {
    width: '100%',
    height: 200,
  },
  assemblyImage: {
    width: '100%',
    height: '100%',
  },
  infoBox: {
    padding: 16,
  },
  assemblyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  assemblyAuthor: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  componentItem: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  statsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: 'tomato',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginRight: 8,
    fontSize: 16,
  },
  likeIcon: {
    width: 24,
    height: 24,
  },
});
