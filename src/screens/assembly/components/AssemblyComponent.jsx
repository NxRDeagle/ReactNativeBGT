import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AssemblyComponent({logo, price, onPress, children}) {

  const navigation = useNavigation();
  
  const handleDetailsPress = () => {
    navigation.navigate('PcComponent', {
      infoData: componentData,
      type_component: type
    });
  };

  return (
    <View style={styles.componentRow}>
      <Image
        source={{uri: logo}}
        style={styles.componentLogo}
        resizeMode="contain"
      />
      <Text style={styles.componentNote}>{children}</Text>
      <View style={styles.componentInfoBox}>
        <Text style={styles.componentPrice}>{price} Руб.</Text>
        <TouchableOpacity onPress={handleDetailsPress} style={styles.componentButton}>
          <Text style={styles.buttonText}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  componentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  componentLogo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  componentNote: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  componentInfoBox: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  componentPrice: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  componentButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});
