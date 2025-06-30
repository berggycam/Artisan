import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  TextInput,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

// Warm, earthy color palette (matching app theme)
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
    white: '#FFFFFF'
  },
  background: {
    primary: '#FFFEF7',
    secondary: '#FBF8F3',
    tertiary: '#F5F1EA'
  },
  border: '#E8DDD4',
  success: '#8FBC8F',
  warning: '#DAA520',
  error: '#CD5C5C'
};

// Mock artisans data
const mockArtisans = [
  {
    id: '1',
    name: 'Kwame Asante',
    specialty: 'Vulcanizer',
    location: 'Tema Station',
    rating: 4.8,
    jobs: 150,
    price: '₵15-30',
    verified: true,
    available: true,
    avatar: null,
    services: ['Tire Repair', 'Tire Replacement', 'Wheel Alignment']
  },
  {
    id: '2',
    name: 'Akosua Mensah',
    specialty: 'Seamstress',
    location: 'Makola Market',
    rating: 4.9,
    jobs: 89,
    price: '₵20-80',
    verified: true,
    available: false,
    avatar: null,
    services: ['Dress Making', 'Alterations', 'Fashion Design']
  },
  {
    id: '3',
    name: 'Ibrahim Mohammed',
    specialty: 'Phone Repair',
    location: 'Circle Mall',
    rating: 4.7,
    jobs: 234,
    price: '₵25-150',
    verified: false,
    available: true,
    avatar: null,
    services: ['Screen Repair', 'Battery Replacement', 'Software Issues']
  },
  {
    id: '4',
    name: 'Kofi Amponsah',
    specialty: 'Welder',
    location: 'Suame Magazine',
    rating: 4.6,
    jobs: 67,
    price: '₵50-200',
    verified: true,
    available: true,
    avatar: null,
    services: ['Metal Fabrication', 'Gate Repair', 'Furniture Making']
  },
  {
    id: '5',
    name: 'Ama Serwaa',
    specialty: 'Hair Stylist',
    location: 'Osu',
    rating: 4.5,
    jobs: 123,
    price: '₵30-100',
    verified: true,
    available: false,
    avatar: null,
    services: ['Hair Styling', 'Braiding', 'Hair Treatment']
  },
  {
    id: '6',
    name: 'Yaw Boateng',
    specialty: 'Electrician',
    location: 'Accra Central',
    rating: 4.8,
    jobs: 178,
    price: '₵40-120',
    verified: true,
    available: true,
    avatar: null,
    services: ['Electrical Repairs', 'Installation', 'Wiring']
  },
  {
    id: '7',
    name: 'Efua Addo',
    specialty: 'Caterer',
    location: 'East Legon',
    rating: 4.9,
    jobs: 45,
    price: '₵100-500',
    verified: true,
    available: true,
    avatar: null,
    services: ['Event Catering', 'Home Cooking', 'Food Delivery']
  },
  {
    id: '8',
    name: 'Kwesi Owusu',
    specialty: 'Plumber',
    location: 'Dansoman',
    rating: 4.7,
    jobs: 92,
    price: '₵35-150',
    verified: false,
    available: true,
    avatar: null,
    services: ['Pipe Repair', 'Installation', 'Drainage']
  }
];

const NewChatScreen: React.FC = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All', icon: 'grid-outline' },
    { id: 'auto', name: 'Auto', icon: 'car-outline' },
    { id: 'home', name: 'Home', icon: 'home-outline' },
    { id: 'beauty', name: 'Beauty', icon: 'cut-outline' },
    { id: 'tech', name: 'Tech', icon: 'phone-portrait-outline' },
    { id: 'food', name: 'Food', icon: 'restaurant-outline' }
  ];

  const filteredArtisans = mockArtisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || 
                           artisan.specialty.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(item.id)}
      activeOpacity={0.8}
    >
      <Ionicons 
        name={item.icon as any} 
        size={20} 
        color={selectedCategory === item.id ? COLORS.text.white : COLORS.text.primary} 
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.categoryTextActive
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderArtisan = ({ item }: { item: typeof mockArtisans[0] }) => (
    <TouchableOpacity 
      style={styles.artisanCard}
      onPress={() => {
        // Create a new conversation and navigate to chat
        const newConversation = {
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
        navigation.navigate('ChatDetail', { conversation: newConversation });
      }}
      activeOpacity={0.8}
    >
      <View style={styles.artisanHeader}>
        <View style={styles.artisanImageContainer}>
          <View style={styles.artisanImage}>
            <Ionicons name="person" size={28} color={COLORS.text.secondary} />
          </View>
          {item.available && <View style={styles.availableDot} />}
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={12} color={COLORS.text.white} />
            </View>
          )}
        </View>
        
        <View style={styles.artisanInfo}>
          <View style={styles.artisanNameRow}>
            <Text style={styles.artisanName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={COLORS.warning} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.artisanSpecialty}>{item.specialty}</Text>
          
          <View style={styles.artisanDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={12} color={COLORS.text.tertiary} />
              <Text style={styles.detailText}>{item.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="briefcase-outline" size={12} color={COLORS.text.tertiary} />
              <Text style={styles.detailText}>{item.jobs} jobs</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="cash-outline" size={12} color={COLORS.text.tertiary} />
              <Text style={styles.detailText}>{item.price}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubble-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
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
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      {/* Header */}
      <LinearGradient
        colors={[COLORS.background.primary, COLORS.background.secondary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>New Chat</Text>
            <Text style={styles.headerSubtitle}>Find artisans to chat with</Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={COLORS.text.tertiary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search artisans, services, locations..."
              placeholderTextColor={COLORS.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={COLORS.text.tertiary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Artisans List */}
      <FlatList
        data={filteredArtisans}
        keyExtractor={item => item.id}
        renderItem={renderArtisan}
        contentContainerStyle={styles.artisansList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={COLORS.text.tertiary} />
            <Text style={styles.emptyTitle}>No artisans found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search or category filter</Text>
          </View>
        }
      />
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  searchContainer: {
    marginTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  categoriesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
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
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginLeft: 6,
  },
  categoryTextActive: {
    color: COLORS.text.white,
  },
  artisansList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  artisanCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
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
  artisanHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  artisanImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  artisanImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.background.primary,
  },
  verifiedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artisanInfo: {
    flex: 1,
  },
  artisanNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  artisanName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginLeft: 4,
  },
  artisanSpecialty: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  artisanDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  chatButton: {
    padding: 8,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  servicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
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
    color: COLORS.primary,
    fontWeight: '600',
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

export default NewChatScreen; 