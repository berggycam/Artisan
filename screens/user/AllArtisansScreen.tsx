import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import fonts from '../../constants/fonts';
import StarRating from '../../components/shared/StarRating';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

// Mock data for artisans
const allArtisans = [
  {
    id: '1',
    name: 'John Smith',
    profession: 'Plumber',
    rating: 4.8,
    reviews: 127,
    hourlyRate: 45,
    image: 'https://via.placeholder.com/60',
    location: 'Downtown',
    isOnline: true,
    specialties: ['Pipe Repair', 'Installation', 'Maintenance'],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    profession: 'Electrician',
    rating: 4.9,
    reviews: 89,
    hourlyRate: 55,
    image: 'https://via.placeholder.com/60',
    location: 'Midtown',
    isOnline: false,
    specialties: ['Wiring', 'Electrical Repairs', 'Installation'],
  },
  {
    id: '3',
    name: 'Mike Davis',
    profession: 'Carpenter',
    rating: 4.7,
    reviews: 156,
    hourlyRate: 40,
    image: 'https://via.placeholder.com/60',
    location: 'Uptown',
    isOnline: true,
    specialties: ['Furniture', 'Repairs', 'Custom Work'],
  },
  {
    id: '4',
    name: 'Lisa Wilson',
    profession: 'Cleaner',
    rating: 4.6,
    reviews: 203,
    hourlyRate: 25,
    image: 'https://via.placeholder.com/60',
    location: 'Downtown',
    isOnline: true,
    specialties: ['Deep Cleaning', 'Regular Cleaning', 'Move-in/out'],
  },
  {
    id: '5',
    name: 'David Brown',
    profession: 'Painter',
    rating: 4.8,
    reviews: 94,
    hourlyRate: 35,
    image: 'https://via.placeholder.com/60',
    location: 'Suburbs',
    isOnline: false,
    specialties: ['Interior Painting', 'Exterior Painting', 'Color Consultation'],
  },
  {
    id: '6',
    name: 'Emma Garcia',
    profession: 'Gardener',
    rating: 4.5,
    reviews: 67,
    hourlyRate: 30,
    image: 'https://via.placeholder.com/60',
    location: 'Midtown',
    isOnline: true,
    specialties: ['Landscaping', 'Maintenance', 'Design'],
  },
];

const AllArtisansScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredArtisans = allArtisans.filter(artisan =>
    artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artisan.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artisan.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleArtisanPress = (artisan: typeof allArtisans[0]) => {
    navigation.navigate('ArtisanProfile', { artisanId: artisan.id });
  };

  const renderArtisanItem = ({ item }: { item: typeof allArtisans[0] }) => (
    <TouchableOpacity
      style={[styles.artisanItem, { 
        backgroundColor: currentTheme.colors.surface,
        borderColor: currentTheme.colors.border
      }]}
      onPress={() => handleArtisanPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.artisanHeader}>
        <View style={styles.artisanInfo}>
          <Image source={{ uri: item.image }} style={styles.artisanImage} />
          <View style={styles.artisanDetails}>
            <View style={styles.nameRow}>
              <Text style={[styles.artisanName, { color: currentTheme.colors.text }]}>{item.name}</Text>
              {item.isOnline && (
                <View style={[styles.onlineIndicator, { backgroundColor: currentTheme.colors.success }]}>
                  <Text style={[styles.onlineText, { color: currentTheme.colors.background }]}>Online</Text>
                </View>
              )}
            </View>
            <Text style={[styles.artisanProfession, { color: currentTheme.colors.textSecondary }]}>{item.profession}</Text>
            <View style={styles.ratingRow}>
              <StarRating rating={item.rating} />
              <Text style={[styles.reviewCount, { color: currentTheme.colors.textSecondary }]}>({item.reviews} reviews)</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.priceText, { color: currentTheme.colors.primary }]}>${item.hourlyRate}</Text>
          <Text style={[styles.priceLabel, { color: currentTheme.colors.textSecondary }]}>/hour</Text>
        </View>
      </View>
      
      <View style={styles.specialtiesContainer}>
        {item.specialties.slice(0, 3).map((specialty, index) => (
          <View key={index} style={[styles.specialtyTag, { backgroundColor: currentTheme.colors.background }]}>
            <Text style={[styles.specialtyText, { color: currentTheme.colors.textSecondary }]}>{specialty}</Text>
          </View>
        ))}
        {item.specialties.length > 3 && (
          <Text style={[styles.moreSpecialties, { color: currentTheme.colors.primary }]}>+{item.specialties.length - 3} more</Text>
        )}
      </View>
      
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={16} color={currentTheme.colors.textSecondary} />
        <Text style={[styles.locationText, { color: currentTheme.colors.textSecondary }]}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={currentTheme.colors.background} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: currentTheme.colors.border }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: currentTheme.colors.surface }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>All Artisans</Text>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: currentTheme.colors.surface }]}>
          <Ionicons name="filter-outline" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { 
          backgroundColor: currentTheme.colors.surface,
          borderColor: currentTheme.colors.border
        }]}>
          <Ionicons name="search" size={20} color={currentTheme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: currentTheme.colors.text }]}
            placeholder="Search artisans..."
            placeholderTextColor={currentTheme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={currentTheme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Summary */}
      <View style={styles.resultsContainer}>
        <Text style={[styles.resultsText, { color: currentTheme.colors.textSecondary }]}>
          {filteredArtisans.length} artisans found
        </Text>
      </View>

      {/* Artisans List */}
      <FlatList
        data={filteredArtisans}
        renderItem={renderArtisanItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.artisansContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color={currentTheme.colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: currentTheme.colors.text }]}>No artisans found</Text>
            <Text style={[styles.emptySubtitle, { color: currentTheme.colors.textSecondary }]}>
              Try adjusting your search terms
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  artisansContainer: {
    paddingHorizontal: 20,
    paddingBottom: isSmallScreen ? 100 : 120,
  },
  artisanItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  artisanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  artisanInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  artisanImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  artisanDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  artisanName: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: fonts.medium,
  },
  onlineIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  onlineText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: fonts.medium,
  },
  artisanProfession: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: fonts.regular,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: 12,
    marginLeft: 4,
    fontFamily: fonts.regular,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: fonts.bold,
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  specialtyTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  moreSpecialties: {
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    marginLeft: 4,
    fontFamily: fonts.regular,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: fonts.medium,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },
});

export default AllArtisansScreen; 