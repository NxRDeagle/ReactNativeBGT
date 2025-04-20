// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Loader from '../../global-components/Loader';
// import { useState } from 'react';
// import { create_component, component_logo } from '../../constants';
// import { postComponent } from '../../services/routes';

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import userAvatar from "../../img/user_avatar.jpg";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AboutApp() {

    const [username, setUserName] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUserName(JSON.parse(user)?.login);
      }
    };
    getUser();
  }, []);

    return(
        <ScrollView contentContainerStyle={styles.container}>
      
      {username ? (
                <Text style={styles.welcomeText}>Добро пожаловать, {username}!</Text>
            ) : null}
      
      <Image 
        source={userAvatar}
        style={styles.logo}
      />
      
      <Text style={styles.title}>BeatGT</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>О нашем приложении</Text>
        <Text style={styles.text}>
          BeatGT - это ваш персональный помощник в мире компьютерных компонентов. 
          Мы помогаем как новичкам, так и опытным энтузиастам собрать идеальный ПК 
          под любые задачи и бюджет.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Наши возможности:</Text>
        <Text style={styles.text}>
          • Подбор совместимых компонентов {"\n"}
          • Создание своих уникальных сборок {"\n"}
          • Добавление новых компонентов в наше приложение {"\n"}
          • Написание отзыва на понравившиеся сборки и компоненты
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Почему мы?</Text>
        <Text style={styles.text}>
          Наша база данных постоянно обновляется и включает все новинки рынка. 
          Уникальный алгоритм проверки совместимости учитывает даже самые тонкие нюансы. 
          Простой и интуитивный интерфейс делает процесс сборки приятным и понятным.
        </Text>
      </View>
      
      <Text style={styles.footerText}>
        Версия 1.0.0 {"\n"}
        © 2025 BeatGT Team
      </Text>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#f5f5f5',
      padding: 20,
      alignItems: 'center',
    },
    logo: {
      width: 120,
      height: 120,
      marginBottom: 20,
      borderRadius: 20,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2a52be',
        marginBottom: 10,
        textAlign: 'center',
      },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 30,
      textAlign: 'center',
    },
    section: {
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#2a52be',
      marginBottom: 15,
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
      color: '#555',
    },
    footerText: {
      fontSize: 14,
      color: '#888',
      textAlign: 'center',
      marginTop: 10,
      lineHeight: 20,
    },
});