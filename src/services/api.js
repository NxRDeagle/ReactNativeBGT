import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const BeatGTApi = axios.create({
  baseURL: process.env.MAIN_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Интерцептор запроса
// BeatGTApi.interceptors.request.use(
//   async config => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// // Интерцептор ответа
// BeatGTApi.interceptors.response.use(
//   async res => {
//     const newToken = res.headers['x-auth-token'];

//     if (newToken) {
//       try {
//         await AsyncStorage.setItem('jwtToken', newToken);
//       } catch (error) {
//         console.error('Ошибка при попытке сохранить токен:', error);
//       }
//     }
//     return Promise.resolve(res.data || res);
//   },
//   async error => {
//     if (error.response?.status === 401) {
//       try {
//         await AsyncStorage.clear();
//         Alert.alert(
//           'Срок действия пользовательской сессии истёк',
//           'Пожалуйста, авторизуйтесь заново',
//         );
//       } catch (e) {
//         console.error('Ошибка при попытке очистить хранилище:', e);
//       }
//     }
//     return Promise.reject(error.response?.data || error.message);
//   },
// );

export default BeatGTApi;
