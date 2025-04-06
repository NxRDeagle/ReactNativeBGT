import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Loader from '../../../global-components/Loader';

export default function AddComponent({
  header,
  type,
  load,
  components,
  onChange,
  onChangeCount,
  count,
  addComponent,
  search,
  next,
  back,
  navigation,
}) {
  const [listVisible, setListVisible] = useState(false);

  const handleSearchChange = text => {
    onChange(text, type);
    setListVisible(!!text);
  };

  const handleAddItem = item => {
    addComponent(type, item);
    setListVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>

      <TextInput
        value={search}
        onChangeText={handleSearchChange}
        placeholder="Например: ASUS, ROG STRIX"
        style={styles.input}
        onFocus={() => setListVisible(!!search)}
      />
      <Text style={styles.hint}>Введите бренд и модель через запятую</Text>

      {['ram', 'gpu', 'hard_disk'].includes(type) && (
        <TextInput
          value={count.toString()}
          onChangeText={text => onChangeCount(Number(text) || 1)}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Количество"
        />
      )}

      {load ? (
        <Loader />
      ) : listVisible ? (
        <FlatList
          data={components}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleAddItem(item)}>
              <Text>
                {item.brand} {item.model}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Ничего не найдено</Text>
          }
          style={styles.list}
        />
      ) : null}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, back ? null : styles.disabled]}
          onPress={() => back(type)}
          disabled={!back}>
          <Text style={styles.buttonText}>Назад</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, next ? null : styles.disabled]}
          onPress={next}
          disabled={!next}>
          <Text style={styles.buttonText}>Далее</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateComponent', {type})}>
        <Text style={styles.createButtonText}>Создать компонент</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  empty: {
    textAlign: 'center',
    padding: 15,
    color: '#999',
  },
  list: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  disabled: {
    opacity: 0.5,
  },
  createButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#007bff',
  },
});
