import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

/**
 * Компонент индикатора загрузки
 * @param {string} size Размер индикатора ('small' или 'large')
 * @param {string} color Цвет индикатора
 */
const Loader = ({size = 'large', color = 'tomato'}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Loader;
