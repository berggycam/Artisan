import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  TextInput,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');

// Mock artisans data for the category
const mockArtisans = [
  {
    id: '1',
    name: 'Kwame Asante',
    specialty: 'Welding',
    location: 'Tema Station',
    rating: 4.8,
    jobs: 150,
    price: '₵50-200',
    verified: true,
    available: true,
    services: ['Metal Fabrication', 'Gate Repair', 'Furniture Welding'],
    experience: '8 years'
  },
  {
    id: '2',
    name: 'Kofi Amponsah',
    specialty: 'Carpentry',
    location: 'Suame Magazine',
    rating: 4.6,
    jobs: 89,
    price: '₵30-150',
    verified: true,
    available: false,
    services: ['Furniture Making', 'Door Installation', 'Cabinet Work'],
    experience: '12 years'
  },
  {
    id: '3',
    name: 'Ibrahim Mohammed',
    specialty: 'Masonry',
    location: 'Circle Mall',
    rating: 4.7,
    jobs: 234,
    price: '₵40-180',
    verified: false,
    available: true,
    services: ['Wall Construction', 'Tiling', 'Foundation Work'],
    experience: '15 years'
  },
  {
    id: '4',
    name: 'Emmanuel Osei',
    specialty: 'Plumbing',
    location: 'Dansoman',
    rating: 4.9,
    jobs: 67,
    price: '₵35-120',
    verified: true,
    available: true,
    services: ['Pipe Repair', 'Installation', 'Drainage'],
    experience: '10 years'
  },
  {
    id: '5',
    name: 'Daniel Addo',
    specialty: 'Welding',
    location: 'Kaneshie',
    rating: 4.5,
    jobs: 45,
    price: '₵45-180',
    verified: false,
    available: true,
    services: ['Auto Body Repair', 'Metal Work', 'Security Gates'],
    experience: '6 years'
  },
  {
    id: '6',
    name: 'Samuel Mensah',
    specialty: 'Carpentry',
    location: 'Accra Central',
    rating: 4.4,
    jobs: 78,
    price: '₵25-120',
    verified: true,
    available: false,
    services: ['Wood Carving', 'Window Frames', 'Custom Furniture'],
    experience: '9 years'
  }
];

const CategoryServicesScreen: React.FC = ({ navigation, route }: any) => {
  const { category } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'verified' | 'available'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'price'>('rating');

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'verified', label: 'Verified' },
    { key: 'available', label: 'Available' }
  ];

  const sortOptions = [
    { key: 'rating', label: 'Rating', icon: 'star' },
    { key: 'experience', label: 'Experience', icon: 'time' },
    { key: 'price', label: 'Price', icon: 'cash' }
  ];

  const filteredAndSortedArtisans = useMemo(() => {
    let filtered = mockArtisans;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(artisan =>
        artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.services.some(service => 
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by selected filter
    if (selectedFilter === 'verified') {
      filtered = filtered.filter(artisan => artisan.verified);
    } else if (selectedFilter === 'available') {
      filtered = filtered.filter(artisan => artisan.available);
    }

    // Sort by selected criteria
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'price':
          const aPrice = parseInt(a.price.split('-')[0].replace('₵', ''));
          const bPrice = parseInt(b.price.split('-')[0].replace('₵', ''));
          return aPrice - bPrice;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedFilter, sortBy]);

  const renderFilterChip = (filter: typeof filters[0]) => (
    <TouchableOpacity
      key={filter.key}
      style={[
        styles.filterChip,
        selectedFilter === filter.key && styles.activeFilterChip
      ]}
      onPress={() => setSelectedFilter(filter.key as any)}
    >
      <Text style={[
        styles.filterChipText,
        selectedFilter === filter.key && styles.activeFilterChipText
      ]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );

  const renderSortOption = (option: typeof sortOptions[0]) => (
    <TouchableOpacity
      key={option.key}
      style={[
        styles.sortOption,
        sortBy === option.key && styles.activeSortOption
      ]}
      onPress={() => setSortBy(option.key as any)}
    >
      <Ionicons 
        name={option.icon as any} 
        size={16} 
        color={sortBy === option.key ? COLORS.gold : COLORS.text.secondary} 
      />
      <Text style={[
        styles.sortOptionText,
        sortBy === option.key && styles.activeSortOptionText
      ]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );

  const renderArtisan = ({ item }: { item: typeof mockArtisans[0] }) => (
    <TouchableOpacity 
      style={styles.artisanCard}
      onPress={() => navigation.navigate('ArtisanProfile', { artisanId: item.id })}
      activeOpacity={0.8}
    >
      <View style={styles.artisanHeader}>
        <View style={styles.artisanInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={COLORS.text.secondary} />
            </View>
            {item.available && <View style={styles.onlineIndicator} />}
            {item.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={12} color={COLORS.gold} />
              </View>
            )}
          </View>
          
          <View style={styles.artisanDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.artisanName}>{item.name}</Text>
              {item.verified && (
                <Ionicons name="checkmark-circle" size={16} color={COLORS.gold} />
              )}
            </View>
            <Text style={styles.artisanSpecialty}>{item.specialty}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={COLORS.text.secondary} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.artisanStats}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color={COLORS.warning} />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.jobsText}>({item.jobs} jobs)</Text>
          </View>
          <Text style={styles.priceText}>{item.price}</Text>
          <Text style={styles.experienceText}>{item.experience} exp</Text>
        </View>
      </View>
      
      <View style={styles.servicesContainer}>
        {item.services.slice(0, 3).map((service, index) => (
          <View key={index} style={styles.serviceTag}>
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
        {item.services.length > 3 && (
          <Text style={styles.moreServices}>+{item.services.length - 3} more</Text>
        )}
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={() => {
            const conversation = {
              id: Date.now().toString(),
              artisanName: item.name,
              artisanSpecialty: item.specialty,
              lastMessage: '',
              timestamp: 'Now',
              unreadCount: 0,
              avatar: null,
              online: item.available,
              lastMessageType: 'text'
            };
            navigation.navigate('ChatDetail', { conversation });
          }}
        >
          <Ionicons name="chatbubble-outline" size={16} color={COLORS.bronze} />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking', { artisan: item })}
        >
          <Ionicons name="calendar-outline" size={16} color={COLORS.text.white} />
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      {/* Header */}
      <LinearGradient
        colors={[COLORS.bronze, COLORS.brownDark]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text.white} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <View style={styles.categoryIconContainer}>
              <Ionicons name={category.icon as any} size={24} color={COLORS.text.white} />
            </View>
            <Text style={styles.headerTitle}>{category.name}</Text>
            <Text style={styles.headerSubtitle}>{category.services.length} services available</Text>
          </View>
          
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color={COLORS.text.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search artisans, services, locations..."
            placeholderTextColor={COLORS.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters and Sort */}
      <View style={styles.filtersContainer}>
        <View style={styles.filtersRow}>
          <Text style={styles.filtersLabel}>Filter:</Text>
          {filters.map(renderFilterChip)}
        </View>
        
        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          {sortOptions.map(renderSortOption)}
        </View>
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {filteredAndSortedArtisans.length} {filteredAndSortedArtisans.length === 1 ? 'artisan' : 'artisans'} found
          </Text>
        </View>

        <FlatList
          data={filteredAndSortedArtisans}
          keyExtractor={(item) => item.id}
          renderItem={renderArtisan}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.artisansList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={64} color={COLORS.text.secondary} />
              <Text style={styles.emptyTitle}>No artisans found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search terms or filters
              </Text>
            </View>
          }
        />
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
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  categoryIconContainer: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.white,
    opacity: 0.9,
  },
  shareButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
    marginLeft: 12,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.background.primary,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filtersLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginRight: 12,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.background.secondary,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: COLORS.bronze,
    borderColor: COLORS.bronze,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text.secondary,
  },
  activeFilterChipText: {
    color: COLORS.text.white,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginRight: 12,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.background.secondary,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    gap: 4,
  },
  activeSortOption: {
    backgroundColor: COLORS.gold + '20',
    borderColor: COLORS.gold,
  },
  sortOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text.secondary,
  },
  activeSortOptionText: {
    color: COLORS.gold,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  artisansList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  artisanCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  artisanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  artisanInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.background.secondary,
  },
  verifiedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 8,
    padding: 1,
  },
  artisanDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  artisanName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  artisanSpecialty: {
    fontSize: 14,
    color: COLORS.bronze,
    fontWeight: '500',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  artisanStats: {
    alignItems: 'flex-end',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  jobsText: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.bronze,
    marginBottom: 2,
  },
  experienceText: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  servicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  serviceTag: {
    backgroundColor: COLORS.background.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  serviceText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  moreServices: {
    fontSize: 12,
    color: COLORS.bronze,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.background.tertiary,
    borderWidth: 1,
    borderColor: COLORS.bronze,
    gap: 6,
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.bronze,
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.bronze,
    gap: 6,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.white,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default CategoryServicesScreen; 