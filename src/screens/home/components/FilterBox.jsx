import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function FilterBox({activeFilter, onFilterChange}) {
  const filters = [
    {key: '', label: 'Все'},
    {key: 'low_price', label: 'По цене +'},
    {key: 'high_price', label: 'По цене -'},
    {key: 'low_like', label: 'По лайкам +'},
    {key: 'high_like', label: 'По лайкам -'},
    {key: 'my', label: 'Мои'},
  ];

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterNote}>Отфильтровать:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.key}
            onPress={() => onFilterChange(filter.key)}
            style={[
              styles.filterButton,
              activeFilter === filter.key && styles.activeFilter,
            ]}>
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.key && styles.activeFilterText,
              ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterNote: {
    marginRight: 10,
    fontSize: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  activeFilter: {
    backgroundColor: 'tomato',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterText: {
    color: 'white',
  },
});
