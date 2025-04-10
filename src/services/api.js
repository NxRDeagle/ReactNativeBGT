import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BeatGTApi = axios.create({
  baseURL: 'http://10.0.2.2:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор запросов
BeatGTApi.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('user');
      if (token) {
        const t = JSON.parse(token);
        config.headers.Authorization = `Bearer ${t.token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

// Интерцептор ответа
BeatGTApi.interceptors.response.use(
  async res => {
    const newToken = res.headers['x-auth-token'];

    if (newToken) {
      try {
        await AsyncStorage.setItem('jwtToken', newToken);
      } catch (error) {
        console.error('Ошибка при попытке сохранить токен:', error);
      }
    }
    return Promise.resolve(res.data || res);
  },
  async error => {
    console.log(error);
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.clear();
      } catch (e) {
        console.error('Ошибка при попытке очистить хранилище:', e);
      }
    }
    return Promise.reject(
      error.response?.data?.error || error.response?.data || error.message,
    );
  },
);

export default BeatGTApi;
