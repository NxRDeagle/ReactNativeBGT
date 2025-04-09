import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import {getAssemblies} from '../../services/routes';
import AssemblyBox from './components/AssemblyBox';
import FilterBox from './components/FilterBox';

export default function HomeScreen() {
  const route = useRoute();
  const [assembliesInfo, setAssembliesInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setNickname(JSON.parse(user)?.login);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchAssemblies = async () => {
      setLoading(true);
      try {
        const urlGetSearch = `?type=${route.params?.type || ''}&filter=${
          activeFilter || ''
        }&nickname=${nickname || ''}`;
        const response = await getAssemblies(urlGetSearch);
        console.log(`response: ${JSON.stringify(response)}`);
        setAssembliesInfo(response.data || []);
      } catch (error) {
        console.error('Error fetching assemblies:', error);
        setAssembliesInfo([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssemblies();
  }, [activeFilter, route.params?.type, nickname]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {!route.params?.type && (
          <FilterBox
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        )}

        {loading ? (
          <View style={styles.loaderContainer}>
            <Text>Загрузка...</Text>
          </View>
        ) : (
          <>
            {assembliesInfo.length > 0 ? (
              assembliesInfo.map(assembly => (
                <AssemblyBox
                  key={assembly.assembly_id}
                  assemblyInfo={assembly}
                />
              ))
            ) : (
              <Text style={styles.notFound}>Сборки не найдены :(</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  notFound: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
