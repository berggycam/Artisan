import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/inputs/SearchBar';
import { useTheme } from '../../context/ThemeContext';

// Mock job opportunities data
const mockJobOpportunities = [
  {
    id: '1',
    title: 'Hair Styling for Wedding',
    client: 'Sarah Johnson',
    location: 'Accra Central',
    budget: '₵200-300',
    duration: '3-4 hours',
    date: '2024-02-15',
    category: 'Beauty',
    description: 'Need a professional hair stylist for wedding ceremony. Bride and 3 bridesmaids.',
    urgency: 'high',
    status: 'open',
  },
  {
    id: '2',
    title: 'Phone Screen Replacement',
    client: 'Michael Davis',
    location: 'Tema',
    budget: '₵80-120',
    duration: '1-2 hours',
    date: '2024-02-10',
    category: 'Electronics',
    description: 'iPhone 12 screen cracked, need replacement with original parts.',
    urgency: 'medium',
    status: 'open',
  },
  {
    id: '3',
    title: 'Custom Dress Making',
    client: 'Grace Addo',
    location: 'Osu',
    budget: '₵150-250',
    duration: '2-3 days',
    date: '2024-02-20',
    category: 'Fashion',
    description: 'Need a custom dress for graduation ceremony. Measurements provided.',
    urgency: 'low',
    status: 'open',
  },
  {
    id: '4',
    title: 'Car Tire Repair',
    client: 'Kwame Asante',
    location: 'Kaneshie',
    budget: '₵50-80',
    duration: '30-45 minutes',
    date: '2024-02-08',
    category: 'Automotive',
    description: 'Flat tire on Toyota Corolla, need immediate repair.',
    urgency: 'high',
    status: 'open',
  },
  {
    id: '5',
    title: 'House Cleaning Service',
    client: 'Emma Wilson',
    location: 'East Legon',
    budget: '₵100-150',
    duration: '4-5 hours',
    date: '2024-02-12',
    category: 'Cleaning',
    description: 'Deep cleaning needed for 3-bedroom apartment. Move-in cleaning.',
    urgency: 'medium',
    status: 'open',
  },
];

const categories = [
  { id: 'all', name: 'All Jobs', icon: 'briefcase-outline' },
  { id: 'beauty', name: 'Beauty', icon: 'cut-outline' },
  { id: 'electronics', name: 'Electronics', icon: 'phone-portrait-outline' },
  { id: 'fashion', name: 'Fashion', icon: 'shirt-outline' },
  { id: 'automotive', name: 'Automotive', icon: 'car-outline' },
  { id: 'cleaning', name: 'Cleaning', icon: 'water-outline' },
  { id: 'construction', name: 'Construction', icon: 'hammer-outline' },
  { id: 'cooking', name: 'Cooking', icon: 'restaurant-outline' },
];

const recentSearches = [
  'Hair styling',
  'Phone repair',
  'Dress making',
  'Car repair',
];

const ArtisanSearchScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'urgency'>('date');
  const [budgetRange, setBudgetRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let filtered = mockJobOpportunities.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.client.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => 
        item.category.toLowerCase() === selectedCategory
      );
    }

    // Filter by budget range
    if (budgetRange !== 'all') {
      filtered = filtered.filter(item => {
        const budget = parseInt(item.budget.split('-')[0].replace('₵', ''));
        switch (budgetRange) {
          case 'low': return budget <= 100;
          case 'medium': return budget > 100 && budget <= 200;
          case 'high': return budget > 200;
          default: return true;
        }
      });
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'budget':
          const budgetA = parseInt(a.budget.split('-')[0].replace('₵', ''));
          const budgetB = parseInt(b.budget.split('-')[0].replace('₵', ''));
          return budgetB - budgetA; // Higher budget first
        case 'urgency':
          const urgencyOrder = { high: 3, medium: 2, low: 1 };
          return urgencyOrder[b.urgency as keyof typeof urgencyOrder] - urgencyOrder[a.urgency as keyof typeof urgencyOrder];
        default:
          return 0;
      }
    });

    return filtered;
  }, [search, selectedCategory, sortBy, budgetRange]);

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons 
        name={item.icon as any} 
        size={20} 
        color={selectedCategory === item.id ? currentTheme.colors.background : currentTheme.colors.text} 
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderJobItem = ({ item }: { item: typeof mockJobOpportunities[0] }) => (
    <TouchableOpacity
      style={styles.jobCard}
      activeOpacity={0.85}
      onPress={() => navigation?.navigate('JobDetail', { job: item })}
    >
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <View style={[
            styles.urgencyBadge,
            item.urgency === 'high' && styles.highUrgency,
            item.urgency === 'medium' && styles.mediumUrgency,
            item.urgency === 'low' && styles.lowUrgency,
          ]}>
            <Text style={styles.urgencyText}>{item.urgency}</Text>
          </View>
        </View>
        <Text style={styles.jobBudget}>{item.budget}</Text>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.jobDetailRow}>
          <Ionicons name="person-outline" size={14} color={currentTheme.colors.textSecondary} />
          <Text style={styles.jobDetailText}>{item.client}</Text>
        </View>
        <View style={styles.jobDetailRow}>
          <Ionicons name="location-outline" size={14} color={currentTheme.colors.textSecondary} />
          <Text style={styles.jobDetailText}>{item.location}</Text>
        </View>
        <View style={styles.jobDetailRow}>
          <Ionicons name="time-outline" size={14} color={currentTheme.colors.textSecondary} />
          <Text style={styles.jobDetailText}>{item.duration}</Text>
        </View>
        <View style={styles.jobDetailRow}>
          <Ionicons name="calendar-outline" size={14} color={currentTheme.colors.textSecondary} />
          <Text style={styles.jobDetailText}>{item.date}</Text>
        </View>
      </View>

      <Text style={styles.jobDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.jobActions}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="bookmark-outline" size={20} color={currentTheme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderRecentSearch = (searchTerm: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.recentSearchItem}
      onPress={() => setSearch(searchTerm)}
    >
      <Ionicons name="time-outline" size={16} color={currentTheme.colors.textSecondary} />
      <Text style={styles.recentSearchText}>{searchTerm}</Text>
    </TouchableOpacity>
  );

  const renderFilterSection = () => (
    <View style={styles.filterSection}>
      <View style={styles.filterRow}>
        <Text style={styles.filterTitle}>Sort by:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterChip, sortBy === 'date' && styles.activeFilterChip]}
            onPress={() => setSortBy('date')}
          >
            <Text style={[styles.filterChipText, sortBy === 'date' && styles.activeFilterChipText]}>
              Date
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, sortBy === 'budget' && styles.activeFilterChip]}
            onPress={() => setSortBy('budget')}
          >
            <Text style={[styles.filterChipText, sortBy === 'budget' && styles.activeFilterChipText]}>
              Budget
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, sortBy === 'urgency' && styles.activeFilterChip]}
            onPress={() => setSortBy('urgency')}
          >
            <Text style={[styles.filterChipText, sortBy === 'urgency' && styles.activeFilterChipText]}>
              Urgency
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <View style={styles.filterRow}>
        <Text style={styles.filterTitle}>Budget range:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterChip, budgetRange === 'all' && styles.activeFilterChip]}
            onPress={() => setBudgetRange('all')}
          >
            <Text style={[styles.filterChipText, budgetRange === 'all' && styles.activeFilterChipText]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, budgetRange === 'low' && styles.activeFilterChip]}
            onPress={() => setBudgetRange('low')}
          >
            <Text style={[styles.filterChipText, budgetRange === 'low' && styles.activeFilterChipText]}>
              Low (₵0-100)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, budgetRange === 'medium' && styles.activeFilterChip]}
            onPress={() => setBudgetRange('medium')}
          >
            <Text style={[styles.filterChipText, budgetRange === 'medium' && styles.activeFilterChipText]}>
              Medium (₵100-200)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, budgetRange === 'high' && styles.activeFilterChip]}
            onPress={() => setBudgetRange('high')}
          >
            <Text style={[styles.filterChipText, budgetRange === 'high' && styles.activeFilterChipText]}>
              High (₵200+)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <LinearGradient
        colors={[COLORS.warmOrange, COLORS.bronze, COLORS.gold]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Find Jobs</Text>
        <View style={styles.searchContainer}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search jobs, clients, locations..."
            onClear={() => setSearch('')}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons 
              name={showFilters ? "options" : "options-outline"} 
              size={24} 
              color={COLORS.text.white} 
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Job Categories</Text>
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
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.recentSearchesList}>
              {recentSearches.map(renderRecentSearch)}
            </View>
          </View>
        )}

        {/* Results */}
        <View style={styles.resultsSection}>
          {search && (
            <Text style={styles.resultsCount}>
              {filteredResults.length} job{filteredResults.length !== 1 ? 's' : ''} found
            </Text>
          )}
          
          {filteredResults.length === 0 && search ? (
            <View style={styles.noResultsContainer}>
              <Ionicons name="briefcase-outline" size={48} color={COLORS.text.tertiary} />
              <Text style={styles.noResultsText}>No jobs found</Text>
              <Text style={styles.noResultsSubtext}>Try adjusting your search or filters</Text>
            </View>
          ) : (
            <FlatList
              data={filteredResults}
              keyExtractor={(item) => item.id}
              renderItem={renderJobItem}
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
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  categoriesList: {
    paddingRight: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCategoryItem: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginLeft: 6,
  },
  selectedCategoryText: {
    color: COLORS.text.white,
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background.secondary,
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
    color: COLORS.text.primary,
    marginRight: 12,
    minWidth: 80,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.background.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text.secondary,
  },
  activeFilterChipText: {
    color: COLORS.text.white,
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
    backgroundColor: COLORS.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recentSearchText: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginLeft: 6,
  },
  resultsSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  resultsCount: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 12,
    fontWeight: '500',
  },
  resultsList: {
    paddingBottom: 32,
  },
  jobCard: {
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
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
    flex: 1,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  highUrgency: {
    backgroundColor: COLORS.error,
  },
  mediumUrgency: {
    backgroundColor: COLORS.warning,
  },
  lowUrgency: {
    backgroundColor: COLORS.success,
  },
  urgencyText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.text.white,
    textTransform: 'uppercase',
  },
  jobBudget: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  jobDetails: {
    marginBottom: 12,
  },
  jobDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  jobDetailText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 6,
  },
  jobDescription: {
    fontSize: 14,
    color: COLORS.text.primary,
    lineHeight: 20,
    marginBottom: 16,
  },
  jobActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  applyButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.white,
  },
  saveButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: COLORS.background.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  noResultsSubtext: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default ArtisanSearchScreen; 