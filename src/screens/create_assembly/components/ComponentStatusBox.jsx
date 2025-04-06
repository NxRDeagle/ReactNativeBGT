import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppSvg from '../../../svg/AppSvg';
import {component_header} from '../../../constants';

/**
 * Отображает статус текущего компонента сборки
 */
export default function ComponentStatusBox({type, error}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppSvg type={type} style={styles.icon} />
        <Text style={styles.title}>{component_header[type]}</Text>
        <AppSvg
          type={error && error.length ? 'close' : 'accept'}
          style={styles.status}
        />
      </View>

      {error.length > 0 && (
        <View style={styles.errors}>
          {error.map((err, i) => (
            <Text key={i} style={styles.error}>
              {err}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  status: {
    width: 20,
    height: 20,
  },
  errors: {
    marginTop: 8,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 3,
  },
});
