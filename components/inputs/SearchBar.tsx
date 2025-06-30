import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onSubmit?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  placeholder, 
  onClear,
  onSubmit 
}) => (
  <View style={styles.container}>
    <View style={styles.searchIconContainer}>
      <Ionicons name="search" size={20} color={COLORS.text.secondary} />
    </View>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || 'Search...'}
      placeholderTextColor={COLORS.text.tertiary}
      onSubmitEditing={onSubmit}
      returnKeyType="search"
    />
    {value.length > 0 && (
      <TouchableOpacity style={styles.clearButton} onPress={onClear}>
        <Ionicons name="close-circle" size={20} color={COLORS.text.secondary} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  searchIconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  clearButton: {
    marginLeft: 8,
    padding: 2,
  },
});

export default SearchBar; 