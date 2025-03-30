import React, {useState} from 'react';
import {TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {assembLike} from '../../../service/route';

export default function LikeBtn({userId, likes, assembId}) {
  const [like, setLike] = useState(likes.includes(userId));

  const getLike = async (user_id, assembly_id) => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        Alert.alert('Ошибка', 'Требуется авторизация');
        return;
      }

      const data = {user_id, assembly_id};
      const response = await assembLike(data);
      setLike(response.like);
    } catch (e) {
      Alert.alert('Ошибка', 'Что-то пошло не так');
    }
  };

  return (
    <TouchableOpacity
      onPress={() => getLike(userId, assembId)}
      style={[
        styles.likeButton,
        like ? styles.likeButtonActive : styles.likeButtonInactive,
      ]}>
      <Text style={styles.likeButtonText}>
        {like ? 'Разонравилось' : 'Понравилось'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  likeButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  likeButtonActive: {
    backgroundColor: '#00BFFF',
  },
  likeButtonInactive: {
    backgroundColor: '#1E90FF',
  },
  likeButtonText: {
    color: 'white',
  },
});
