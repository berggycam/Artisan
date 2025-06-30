import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Dimensions,
  StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../../components/inputs/SearchBar';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);
const isSmallScreen = height < 700; // Threshold for smaller screens

// Enhanced mock data
const mockArtisans = [
  {
    id: '1',
    name: 'Kwame Asante',
    specialty: 'Vulcanizer',
    location: 'Tema Station',
    rating: 4.8,
    available: true,
    price: '₵50-100',
    experience: '5 years',
    category: 'Automotive',
    image: null,
  },
  {
    id: '2',
    name: 'Akosua Mensah',
    specialty: 'Seamstress',
    location: 'Makola Market',
    rating: 4.9,
    available: false,
    price: '₵30-80',
    experience: '8 years',
    category: 'Fashion',
    image: null,
  },
  {
    id: '3',
    name: 'Ibrahim Mohammed',
    specialty: 'Phone Repair',
    location: 'Circle Mall',
    rating: 4.7,
    available: true,
    price: '₵40-120',
    experience: '3 years',
    category: 'Electronics',
    image: null,
  },
  {
    id: '4',
    name: 'Grace Addo',
    specialty: 'Hair Stylist',
    location: 'Osu',
    rating: 4.6,
    available: true,
    price: '₵60-150',
    experience: '6 years',
    category: 'Beauty',
    image: null,
  },
  {
    id: '5',
    name: 'Kofi Owusu',
    specialty: 'Carpenter',
    location: 'Kaneshie',
    rating: 4.5,
    available: true,
    price: '₵80-200',
    experience: '10 years',
    category: 'Construction',
    image: null,
  },
];

const categories = [
  { id: 'all', name: 'All', icon: 'grid-outline' },
  { id: 'automotive', name: 'Automotive', icon: 'car-outline' },
  { id: 'fashion', name: 'Fashion', icon: 'shirt-outline' },
  { id: 'electronics', name: 'Electronics', icon: 'phone-portrait-outline' },
  { id: 'beauty', name: 'Beauty', icon: 'cut-outline' },
  { id: 'construction', name: 'Construction', icon: 'hammer-outline' },
  { id: 'cleaning', name: 'Cleaning', icon: 'water-outline' },
  { id: 'cooking', name: 'Cooking', icon: 'restaurant-outline' },
];

const recentSearches = [
  'Hair stylist',
  'Phone repair',
  'Carpenter',
  'Seamstress',
];

const SearchScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();
  
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let filtered = mockArtisans.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.specialty.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase())
    );

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => 
        item.category.toLowerCase() === selectedCategory
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter(item => {
        const price = parseInt(item.price.split('-')[0].replace('₵', ''));
        switch (priceRange) {
          case 'low': return price <= 50;
          case 'medium': return price > 50 && price <= 100;
          case 'high': return price > 100;
          default: return true;
        }
      });
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          const priceA = parseInt(a.price.split('-')[0].replace('₵', ''));
          const priceB = parseInt(b.price.split('-')[0].replace('₵', ''));
          return priceA - priceB;
        case 'distance':
          // Mock distance sorting
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

    return filtered;
  }, [search, selectedCategory, sortBy, priceRange]);

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {
          backgroundColor: selectedCategory === item.id ? colors.primary : colors.background.secondary,
          borderColor: selectedCategory === item.id ? colors.primary : colors.border,
        }
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons 
        name={item.icon as any} 
        size={20} 
        color={selectedCategory === item.id ? colors.background.primary : colors.text.primary} 
      />
      <Text style={[
        styles.categoryText,
        { color: selectedCategory === item.id ? colors.background.primary : colors.text.primary }
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderResult = ({ item }: { item: typeof mockArtisans[0] }) => (
    <TouchableOpacity
      style={[styles.resultCard, { 
        backgroundColor: colors.background.secondary,
        borderColor: colors.border,
        shadowColor: colors.text.secondary,
      }]}
      activeOpacity={0.85}
      onPress={() => navigation?.navigate('ArtisanProfile', { artisanId: item.id })}
    >
      <View style={styles.resultAvatarContainer}>
        <View style={[styles.resultAvatarCircle, { 
          backgroundColor: colors.background.tertiary,
          borderColor: colors.border,
        }]}>
          <Ionicons name="person" size={28} color={colors.text.secondary} />
        </View>
        {item.available && <View style={[styles.availableDot, { 
          backgroundColor: colors.success,
          borderColor: colors.background.secondary,
        }]} />}
      </View>
      <View style={styles.resultInfo}>
        <View style={styles.resultNameRow}>
          <Text style={[styles.resultName, { color: colors.text.primary }]}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={[styles.resultRating, { color: colors.text.primary }]}>{item.rating}</Text>
          </View>
        </View>
        <Text style={[styles.resultSpecialty, { color: colors.primary }]}>{item.specialty}</Text>
        <View style={styles.resultDetails}>
          <View style={styles.resultLocationRow}>
            <Ionicons name="location-outline" size={12} color={colors.text.secondary} />
            <Text style={[styles.resultLocation, { color: colors.text.secondary }]}>{item.location}</Text>
          </View>
          <View style={styles.resultPriceRow}>
            <Ionicons name="cash-outline" size={12} color={colors.text.secondary} />
            <Text style={[styles.resultPrice, { color: colors.text.secondary }]}>{item.price}</Text>
          </View>
        </View>
        <View style={styles.resultExperience}>
          <Ionicons name="time-outline" size={12} color={colors.text.secondary} />
          <Text style={[styles.experienceText, { color: colors.text.secondary }]}>{item.experience} experience</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
  );

  const renderRecentSearch = (searchTerm: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.recentSearchItem, { 
        backgroundColor: colors.background.secondary,
        borderColor: colors.border,
      }]}
      onPress={() => setSearch(searchTerm)}
    >
      <Ionicons name="time-outline" size={16} color={colors.text.secondary} />
      <Text style={[styles.recentSearchText, { color: colors.text.primary }]}>{searchTerm}</Text>
    </TouchableOpacity>
  );

  const renderFilterSection = () => (
    <View style={[styles.filterSection, { 
      backgroundColor: colors.background.secondary,
    }]}>
      <View style={styles.filterRow}>
        <Text style={[styles.filterTitle, { color: colors.text.primary }]}>Sort by:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterChip, {
              backgroundColor: sortBy === 'rating' ? colors.primary : colors.background.primary,
              borderColor: sortBy === 'rating' ? colors.primary : colors.border,
            }]}
            onPress={() => setSortBy('rating')}
          >
            <Text style={[styles.filterChipText, {
              color: sortBy === 'rating' ? colors.background.primary : colors.text.secondary
            }]}>
              Rating
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, {
              backgroundColor: sortBy === 'price' ? colors.primary : colors.background.primary,
              borderColor: sortBy === 'price' ? colors.primary : colors.border,
            }]}
            onPress={() => setSortBy('price')}
          >
            <Text style={[styles.filterChipText, {
              color: sortBy === 'price' ? colors.background.primary : colors.text.secondary
            }]}>
              Price
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, {
              backgroundColor: sortBy === 'distance' ? colors.primary : colors.background.primary,
              borderColor: sortBy === 'distance' ? colors.primary : colors.border,
            }]}
            onPress={() => setSortBy('distance')}
          >
            <Text style={[styles.filterChipText, {
              color: sortBy === 'distance' ? colors.background.primary : colors.text.secondary
            }]}>
              Distance
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <View style={styles.filterRow}>
        <Text style={[styles.filterTitle, { color: colors.text.primary }]}>Price range:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterChip, {
              backgroundColor: priceRange === 'all' ? colors.primary : colors.background.primary,
              borderColor: priceRange === 'all' ? colors.primary : colors.border,
            }]}
            onPress={() => setPriceRange('all')}
          >
            <Text style={[styles.filterChipText, {
              color: priceRange === 'all' ? colors.background.primary : colors.text.secondary
            }]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, {
              backgroundColor: priceRange === 'low' ? colors.primary : colors.background.primary,
              borderColor: priceRange === 'low' ? colors.primary : colors.border,
            }]}
            onPress={() => setPriceRange('low')}
          >
            <Text style={[styles.filterChipText, {
              color: priceRange === 'low' ? colors.background.primary : colors.text.secondary
            }]}>
              Low (₵0-50)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, {
              backgroundColor: priceRange === 'medium' ? colors.primary : colors.background.primary,
              borderColor: priceRange === 'medium' ? colors.primary : colors.border,
            }]}
            onPress={() => setPriceRange('medium')}
          >
            <Text style={[styles.filterChipText, {
              color: priceRange === 'medium' ? colors.background.primary : colors.text.secondary
            }]}>
              Medium (₵50-100)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, {
              backgroundColor: priceRange === 'high' ? colors.primary : colors.background.primary,
              borderColor: priceRange === 'high' ? colors.primary : colors.border,
            }]}
            onPress={() => setPriceRange('high')}
          >
            <Text style={[styles.filterChipText, {
              color: priceRange === 'high' ? colors.background.primary : colors.text.secondary
            }]}>
              High (₵100+)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.primary} 
      />
      
      <LinearGradient
        colors={currentTheme.gradient as [string, string, string]}
        style={[styles.header, { shadowColor: colors.primary }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Search Artisans</Text>
        <View style={styles.searchContainer}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search artisans, services, locations..."
            onClear={() => setSearch('')}
          />
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: colors.background.primary + '20' }]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons 
              name={showFilters ? "options" : "options-outline"} 
              size={24} 
              color={colors.text.primary} 
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Filters */}
        {showFilters && renderFilterSection()}

        {/* Recent Searches */}
        {!search && filteredResults.length === 0 && (
          <View style={styles.recentSearchesSection}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Recent Searches</Text>
            <View style={styles.recentSearchesList}>
              {recentSearches.map(renderRecentSearch)}
            </View>
          </View>
        )}

        {/* Results */}
        <View style={styles.resultsSection}>
          {search && (
            <Text style={[styles.resultsCount, { color: colors.text.secondary }]}>
              {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
            </Text>
          )}
          
          {filteredResults.length === 0 && search ? (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search-outline" size={48} color={colors.text.tertiary} />
              <Text style={[styles.noResultsText, { color: colors.text.tertiary }]}>No artisans found</Text>
              <Text style={[styles.noResultsSubtext, { color: colors.text.tertiary }]}>Try adjusting your search or filters</Text>
            </View>
          ) : (
            <FlatList
              data={filteredResults}
              keyExtractor={(item) => item.id}
              renderItem={renderResult}
              contentContainerStyle={styles.resultsList}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
  },
  categoriesSection: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  categoriesList: {
    paddingRight: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 6,
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 12,
    minWidth: 80,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  recentSearchesSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  recentSearchesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  recentSearchText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 6,
  },
  resultsSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  resultsCount: {
    fontSize: 14,
    color: '#000',
    marginBottom: 12,
    fontWeight: '500',
  },
  resultsList: {
    paddingBottom: isSmallScreen ? 100 : 120,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  availableDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  resultInfo: {
    flex: 1,
  },
  resultNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultRating: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    marginLeft: 4,
  },
  resultSpecialty: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 4,
  },
  resultDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  resultLocation: {
    fontSize: 12,
    color: '#000',
    marginLeft: 4,
  },
  resultPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultPrice: {
    fontSize: 12,
    color: '#000',
    marginLeft: 4,
    fontWeight: '500',
  },
  resultExperience: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 4,
  },
  noResultsContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  noResultsText: {
    fontSize: 16,
    color: '#000',
    marginTop: 12,
    fontWeight: '500',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default SearchScreen; 