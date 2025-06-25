import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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

const mockFavorites = [
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
];

const FavoritesScreen: React.FC = ({ navigation }: any) => {
  const renderFavorite = ({ item }: { item: typeof mockFavorites[0] }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation && navigation.navigate && navigation.navigate('ViewArtisan', { artisan: item })}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={28} color={COLORS.text.secondary} />
        </View>
        {item.available && <View style={styles.availableDot} />}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color={COLORS.text.secondary} />
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={COLORS.warning} />
          <Text style={styles.rating}>{item.rating}</Text>
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
        <Text style={styles.headerTitle}>Favorites</Text>
      </LinearGradient>
      <View style={styles.listSection}>
        {mockFavorites.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Ionicons name="heart-outline" size={48} color={COLORS.text.tertiary} />
            <Text style={styles.noResultsText}>No favorites yet</Text>
          </View>
        ) : (
          <FlatList
            data={mockFavorites}
            keyExtractor={(item) => item.id}
            renderItem={renderFavorite}
            contentContainerStyle={styles.list}
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
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  list: {
    paddingBottom: 32,
  },
  card: {
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
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarCircle: {
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
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    backgroundColor: COLORS.success,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.background.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  specialty: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginLeft: 4,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.text.tertiary,
    marginTop: 12,
  },
});

export default FavoritesScreen; 