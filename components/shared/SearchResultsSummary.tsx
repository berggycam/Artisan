import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

interface SearchResultsSummaryProps {
  count: number;
  searchTerm: string;
  category?: string;
  filters?: string[];
}

const SearchResultsSummary: React.FC<SearchResultsSummaryProps> = ({
  count,
  searchTerm,
  category,
  filters = []
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainInfo}>
        <Ionicons name="search" size={16} color={COLORS.text.secondary} />
        <Text style={styles.resultsText}>
          {count} result{count !== 1 ? 's' : ''} found
        </Text>
      </View>
      
      {searchTerm && (
        <View style={styles.searchTermContainer}>
          <Text style={styles.searchTermLabel}>for:</Text>
          <Text style={styles.searchTerm}>"{searchTerm}"</Text>
        </View>
      )}
      
      {category && category !== 'all' && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Category:</Text>
          <Text style={styles.filterValue}>{category}</Text>
        </View>
      )}
      
      {filters.length > 0 && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterLabel}>Filters:</Text>
          <View style={styles.filtersList}>
            {filters.map((filter, index) => (
              <Text key={index} style={styles.filterValue}>
                {filter}{index < filters.length - 1 ? ', ' : ''}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginLeft: 6,
  },
  searchTermContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  searchTermLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginRight: 4,
  },
  searchTerm: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  filterLabel: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginRight: 4,
  },
  filterValue: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  filtersList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SearchResultsSummary; 