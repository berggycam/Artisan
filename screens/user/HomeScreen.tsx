import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  Dimensions,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../../components/inputs/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

// Warm, earthy color palette
const COLORS = {
  primary: '#D2691E',      // Chocolate/Sienna - warm primary
  primaryLight: '#E6965C', // Lighter warm tone
  primaryDark: '#A0522D',  // Darker earth tone
  secondary: '#CD853F',    // Peru/Sandy brown
  accent: '#8B4513',       // Saddle brown - deep earth
  warm: '#F4A460',         // Sandy brown - warm highlight
  text: {
    primary: '#2F1B14',    // Dark brown
    secondary: '#5D4037',  // Medium brown
    tertiary: '#8D6E63',   // Light brown
    white: '#FFFFFF'
  },
  background: {
    primary: '#FFFEF7',    // Warm white
    secondary: '#FBF8F3',  // Cream
    tertiary: '#F5F1EA'    // Light beige
  },
  border: '#E8DDD4',       // Warm gray
  success: '#8FBC8F',      // Dark sea green - earthy green
  warning: '#DAA520',      // Goldenrod
  error: '#CD5C5C'         // Indian red - earthy red
};

// Service categories with warm gradients
const serviceCategories = [
  { 
    id: 'auto', 
    name: 'Auto & Transport', 
    icon: 'car-sport', 
    gradient: [COLORS.primary, COLORS.primaryLight],
    services: ['Vulcanizers', 'Mechanics', 'Car Wash', 'Bike Repairs']
  },
  { 
    id: 'construction', 
    name: 'Construction', 
    icon: 'hammer', 
    gradient: [COLORS.accent, COLORS.primaryDark],
    services: ['Welding', 'Carpentry', 'Masonry', 'Plumbing']
  },
  { 
    id: 'home', 
    name: 'Home Services', 
    icon: 'home', 
    gradient: [COLORS.secondary, COLORS.warm],
    services: ['Tailors', 'Phone Repair', 'Locksmiths', 'Shoe Repair']
  },
  { 
    id: 'handyman', 
    name: 'Quick Fixes', 
    icon: 'build', 
    gradient: [COLORS.warning, COLORS.secondary],
    services: ['Painters', 'TV/Antenna', 'Generator Repair', 'Electricians']
  },
];

// Featured artisans
const featuredArtisans = [
  { 
    id: '1', 
    name: 'Kwame Asante', 
    specialty: 'Vulcanizer', 
    location: 'Tema Station',
    rating: 4.8,
    jobs: 150,
    price: '₵15-30',
    verified: true,
    available: true
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
    available: false
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
    available: true
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
    available: true
  },
];

// Quick service suggestions
const quickServices = [
  { name: 'Tire Repair', icon: 'car', urgent: true },
  { name: 'Phone Screen Fix', icon: 'phone-portrait', urgent: false },
  { name: 'Key Cutting', icon: 'key', urgent: false },
  { name: 'Generator Fix', icon: 'flash', urgent: true },
];

// Recent bookings/activity
const recentActivity = [
  { type: 'booking', artisan: 'Kwame', service: 'Tire Puncture', status: 'completed', time: '2 hours ago' },
  { type: 'message', artisan: 'Akosua', service: 'Dress Alteration', status: 'pending', time: '1 day ago' },
];

const HomeScreen: React.FC = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category.id);
    navigation.navigate('CategoryServices', { category });
  };

  const handleArtisanPress = (artisan: any) => {
    navigation.navigate('ArtisanProfile', { artisan });
  };

  const handleQuickServicePress = (service: any) => {
    navigation.navigate('ServiceRequest', { service });
  };

  const renderCategoryCard = ({ item }: { item: typeof serviceCategories[0] }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={item.gradient as [string, string]}
        style={styles.categoryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.categoryIconContainer}>
          <Ionicons name={item.icon as any} size={28} color={COLORS.text.white} />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.services.length} services</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderArtisanCard = ({ item }: { item: typeof featuredArtisans[0] }) => (
    <TouchableOpacity 
      style={styles.artisanCard}
      onPress={() => handleArtisanPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.artisanHeader}>
        <View style={styles.artisanImageContainer}>
          <View style={styles.artisanImagePlaceholder}>
            <Ionicons name="person" size={32} color={COLORS.text.secondary} />
          </View>
          {item.available && <View style={styles.availableDot} />}
        </View>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={COLORS.warning} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.artisanInfo}>
        <View style={styles.artisanNameRow}>
          <Text style={styles.artisanName}>{item.name}</Text>
          {item.verified && (
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
          )}
        </View>
        
        <Text style={styles.artisanSpecialty}>{item.specialty}</Text>
        
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color={COLORS.text.secondary} />
          <Text style={styles.artisanLocation}>{item.location}</Text>
        </View>
        
        <View style={styles.artisanStats}>
          <Text style={styles.jobsCompleted}>{item.jobs} jobs</Text>
          <Text style={styles.priceRange}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQuickService = ({ item }: { item: typeof quickServices[0] }) => (
    <TouchableOpacity 
      style={[styles.quickServiceCard, item.urgent && styles.urgentService]}
      onPress={() => handleQuickServicePress(item)}
      activeOpacity={0.8}
    >
      <Ionicons 
        name={item.icon as any} 
        size={20} 
        color={item.urgent ? COLORS.error : COLORS.primary} 
      />
      <Text style={[styles.quickServiceText, item.urgent && styles.urgentText]}>
        {item.name}
      </Text>
      {item.urgent && <View style={styles.urgentDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header Section with warm gradient */}
        <LinearGradient
          colors={[COLORS.background.primary, COLORS.background.secondary]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.welcomeText}>Akwaaba! 👋</Text>
              <Text style={styles.subtitle}>Find trusted artisans near you</Text>
            </View>
            
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => navigation.navigate('Notifications')}
              >
                <Ionicons name="notifications-outline" size={24} color={COLORS.text.primary} />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => navigation.navigate('Profile')}
              >
                <Ionicons name="person-circle-outline" size={24} color={COLORS.text.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <SearchBar 
            value={search} 
            onChangeText={setSearch} 
            placeholder="Search services, artisans, locations..."
          />
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('Bookings')}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryLight]}
                style={styles.quickActionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="calendar-outline" size={24} color={COLORS.text.white} />
              </LinearGradient>
              <Text style={styles.quickActionText}>Bookings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('Messages')}
            >
              <LinearGradient
                colors={[COLORS.accent, COLORS.primaryDark]}
                style={styles.quickActionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="chatbubble-outline" size={24} color={COLORS.text.white} />
              </LinearGradient>
              <Text style={styles.quickActionText}>Messages</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('Favorites')}
            >
              <LinearGradient
                colors={[COLORS.secondary, COLORS.warm]}
                style={styles.quickActionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="heart-outline" size={24} color={COLORS.text.white} />
              </LinearGradient>
              <Text style={styles.quickActionText}>Favorites</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('Emergency')}
            >
              <LinearGradient
                colors={[COLORS.error, '#E8725C']}
                style={styles.quickActionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="flash-outline" size={24} color={COLORS.text.white} />
              </LinearGradient>
              <Text style={styles.quickActionText}>Emergency</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Service Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllCategories')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={serviceCategories}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
            renderItem={renderCategoryCard}
          />
        </View>

        {/* Quick Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Need Help Now?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Emergency')}>
              <Ionicons name="flash" size={20} color={COLORS.error} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={quickServices}
            keyExtractor={item => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickServicesContainer}
            renderItem={renderQuickService}
          />
        </View>

        {/* Featured Artisans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Rated Artisans</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllArtisans')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={featuredArtisans}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.artisansContainer}
            renderItem={renderArtisanCard}
          />
        </View>

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ActivityHistory')}>
                <Text style={styles.seeAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.activityContainer}>
              {recentActivity.map((activity, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.activityItem}
                  onPress={() => navigation.navigate('ActivityDetails', { activity })}
                >
                  <View style={styles.activityIcon}>
                    <Ionicons 
                      name={activity.type === 'booking' ? 'checkmark-circle' : 'chatbubble-ellipses'} 
                      size={20} 
                      color={activity.status === 'completed' ? COLORS.success : COLORS.warning} 
                    />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityTitle}>
                      {activity.service} with {activity.artisan}
                    </Text>
                    <Text style={styles.activityStatus}>
                      {activity.status === 'completed' ? 'Completed' : 'Pending response'} • {activity.time}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={COLORS.text.tertiary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Optional: add a little space above the tab bar */}
        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  headerButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: COLORS.error,
    borderRadius: 4,
  },
  searchBar: {
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionText: {
    fontSize: 12,
    color: COLORS.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingRight: 20,
  },
  categoryCard: {
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  categoryGradient: {
    width: 140,
    height: 120,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIconContainer: {
    marginBottom: 12,
  },
  categoryName: {
    color: COLORS.text.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    color: COLORS.text.white,
    fontSize: 12,
    opacity: 0.9,
  },
  quickServicesContainer: {
    paddingRight: 20,
  },
  quickServiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
    shadowColor: COLORS.text.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  urgentService: {
    borderColor: COLORS.error,
    backgroundColor: '#FDF2F2',
  },
  quickServiceText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  urgentText: {
    color: COLORS.error,
  },
  urgentDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: COLORS.error,
    borderRadius: 4,
  },
  artisansContainer: {
    paddingRight: 20,
  },
  artisanCard: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 200,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.text.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  artisanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  artisanImageContainer: {
    position: 'relative',
  },
  artisanImagePlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 24,
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
    borderColor: COLORS.background.primary,
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
  artisanInfo: {
    alignItems: 'flex-start',
  },
  artisanNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  artisanName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  artisanSpecialty: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  artisanLocation: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  artisanStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  jobsCompleted: {
    fontSize: 12,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  priceRange: {
    fontSize: 12,
    color: COLORS.text.primary,
    fontWeight: '600',
  },
  activityContainer: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: COLORS.text.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  activityIcon: {
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  activityStatus: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
});

export default HomeScreen;