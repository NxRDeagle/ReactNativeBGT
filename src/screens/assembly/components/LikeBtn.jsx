import React, {useState} from 'react';
import {TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import { assembLike } from '../../../services/routes';

export default function LikeBtn({userId, likes, assembId}) {
  const [like, setLike] = useState(likes.includes(userId));

  const getLike = async (user_id, assembly_id) => {
    try {
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
