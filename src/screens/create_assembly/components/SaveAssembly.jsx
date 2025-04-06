import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Loader from '../../../global-components/Loader';

/**
 * Просмотр и сохранение готовой сборки
 */
export default function SaveAssembly({
  info,
  clear,
  error,
  name,
  handleChangeName,
  handleSubmit,
  load,
}) {
  const totalPrice = info.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={clear}>
        <Text style={styles.clear}>Очистить сборку</Text>
      </TouchableOpacity>

      <FlatList
        data={info}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Image source={{uri: item.logo}} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price} ₽</Text>
            </View>
          </View>
        )}
      />

      <TextInput
        value={name}
        onChangeText={handleChangeName}
        placeholder="Название сборки"
        style={styles.input}
      />

      <View style={styles.total}>
        <Text style={styles.totalText}>Итого:</Text>
        <Text style={styles.totalPrice}>{totalPrice} ₽</Text>
      </View>

      {!Object.values(error).flat().length && (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={e => handleSubmit(e, totalPrice)}
          disabled={load}>
          {load ? (
            <Loader size="small" color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Сохранить сборку</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clear: {
    color: 'red',
    textAlign: 'right',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
