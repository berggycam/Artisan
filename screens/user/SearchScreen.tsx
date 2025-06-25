import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/inputs/SearchBar';

// Warm, earthy color palette (copied from HomeScreen)
const COLORS = {
  primary: '#D2691E',
  primaryLight: '#E6965C',
  primaryDark: '#A0522D',
  secondary: '#CD853F',
  accent: '#8B4513',
  warm: '#F4A460',
  text: {
    primary: '#2F1B14',
    secondary: '#5D4037',
    tertiary: '#8D6E63',
    white: '#FFFFFF',
  },
  background: {
    primary: '#FFFEF7',
    secondary: '#FBF8F3',
    tertiary: '#F5F1EA',
  },
  border: '#E8DDD4',
  success: '#8FBC8F',
  warning: '#DAA520',
  error: '#CD5C5C',
};

// Mock search results
const mockResults = [
  {
    id: '1',
    name: 'Kwame Asante',
    specialty: 'Vulcanizer',
    location: 'Tema Station',
    rating: 4.8,
    available: true,
  },
  {
    id: '2',
    name: 'Akosua Mensah',
    specialty: 'Seamstress',
    location: 'Makola Market',
    rating: 4.9,
    available: false,
  },
  {
    id: '3',
    name: 'Ibrahim Mohammed',
    specialty: 'Phone Repair',
    location: 'Circle Mall',
    rating: 4.7,
    available: true,
  },
];

const SearchScreen: React.FC = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(mockResults);

  // Optionally filter results by search
  const filteredResults = results.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.specialty.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  const renderResult = ({ item }: { item: typeof mockResults[0] }) => (
    <TouchableOpacity
      style={styles.resultCard}
      activeOpacity={0.85}
      onPress={() => navigation && navigation.navigate && navigation.navigate('ViewArtisan', { artisan: item })}
    >
      <View style={styles.resultAvatarContainer}>
        <View style={styles.resultAvatarCircle}>
          <Ionicons name="person" size={28} color={COLORS.text.secondary} />
        </View>
        {item.available && <View style={styles.availableDot} />}
      </View>
      <View style={styles.resultInfo}>
        <View style={styles.resultNameRow}>
          <Text style={styles.resultName}>{item.name}</Text>
        </View>
        <Text style={styles.resultSpecialty}>{item.specialty}</Text>
        <View style={styles.resultLocationRow}>
          <Ionicons name="location-outline" size={12} color={COLORS.text.secondary} />
          <Text style={styles.resultLocation}>{item.location}</Text>
        </View>
        <View style={styles.resultRatingRow}>
          <Ionicons name="star" size={14} color={COLORS.warning} />
          <Text style={styles.resultRating}>{item.rating}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.text.tertiary} style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ marginTop: 0, marginBottom: 0 }}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search artisans, services, locations..."
          />
        </View>
      </LinearGradient>
      <View style={styles.resultsSection}>
        {filteredResults.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search-outline" size={48} color={COLORS.text.tertiary} />
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => item.id}
            renderItem={renderResult}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text.white,
    marginBottom: 12,
  },
  searchBar: {
    marginTop: 0,
    marginBottom: 0,
  },
  resultsSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  resultsList: {
    paddingBottom: 32,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.text.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  resultAvatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  resultAvatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  availableDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    backgroundColor: COLORS.success,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: COLORS.background.secondary,
  },
  resultInfo: {
    flex: 1,
  },
  resultNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  resultSpecialty: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultLocation: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  resultRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultRating: {
    fontSize: 12,
    color: COLORS.text.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  noResultsContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.text.tertiary,
    marginTop: 12,
    fontWeight: '500',
  },
});

export default SearchScreen; 