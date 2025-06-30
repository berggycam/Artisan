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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../../components/inputs/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);
const isSmallScreen = height < 700; // Same threshold as navigation

const Tab = createBottomTabNavigator();

// Service categories with warm gradients
const serviceCategories = [
  { 
    id: 'auto', 
    name: 'Auto & Transport', 
    icon: 'car-sport', 
    services: ['Vulcanizers', 'Mechanics', 'Car Wash', 'Bike Repairs']
  },
  { 
    id: 'construction', 
    name: 'Construction', 
    icon: 'hammer', 
    services: ['Welding', 'Carpentry', 'Masonry', 'Plumbing']
  },
  { 
    id: 'home', 
    name: 'Home Services', 
    icon: 'home', 
    services: ['Tailors', 'Phone Repair', 'Locksmiths', 'Shoe Repair']
  },
  { 
    id: 'handyman', 
    name: 'Quick Fixes', 
    icon: 'build', 
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
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();
  
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
      style={[styles.categoryCard, {
        shadowColor: colors.text.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
      }]}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={currentTheme.gradient as [string, string, string]}
        style={styles.categoryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.categoryIconContainer}>
          <Ionicons name={item.icon as any} size={28} color="#FFFFFF" />
        </View>
        <Text style={[styles.categoryName, { color: "#FFFFFF" }]}>{item.name}</Text>
        <Text style={[styles.categoryCount, { color: "#FFFFFF" }]}>{item.services.length} services</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderArtisanCard = ({ item }: { item: typeof featuredArtisans[0] }) => (
    <TouchableOpacity 
      style={[styles.artisanCard, { 
        backgroundColor: colors.background.primary,
        borderColor: colors.border,
        shadowColor: colors.text.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      }]}
      onPress={() => handleArtisanPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.artisanHeader}>
        <View style={styles.artisanImageContainer}>
          <View style={[styles.artisanImagePlaceholder, { 
            backgroundColor: colors.background.secondary,
            borderColor: colors.border,
          }]}>
            <Ionicons name="person" size={32} color={colors.text.primary} />
          </View>
          {item.available && <View style={[styles.availableDot, { 
            backgroundColor: colors.success,
            borderColor: colors.background.primary,
          }]} />}
        </View>
        
        <View style={[styles.ratingContainer, { backgroundColor: colors.background.secondary }]}>
          <Ionicons name="star" size={14} color={colors.warning} />
          <Text style={[styles.ratingText, { color: colors.text.primary }]}>{item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.artisanInfo}>
        <View style={styles.artisanNameRow}>
          <Text style={[styles.artisanName, { color: colors.text.primary }]}>{item.name}</Text>
          {item.verified && <Ionicons name="checkmark-circle" size={16} color={colors.primary} />}
        </View>
        <Text style={[styles.artisanSpecialty, { color: colors.primary }]}>{item.specialty}</Text>
        
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color={colors.text.secondary} />
          <Text style={[styles.artisanLocation, { color: colors.text.secondary }]}>{item.location}</Text>
        </View>
        
        <View style={styles.artisanStats}>
          <Text style={[styles.jobsCompleted, { color: colors.text.secondary }]}>{item.jobs} jobs</Text>
          <Text style={[styles.priceRange, { color: colors.text.primary }]}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQuickService = ({ item }: { item: typeof quickServices[0] }) => (
    <TouchableOpacity 
      style={[
        styles.quickServiceCard, 
        { 
          backgroundColor: colors.background.primary,
          borderColor: colors.border,
          shadowColor: colors.text.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        item.urgent && { 
          borderColor: colors.error,
          backgroundColor: colors.error + '15',
        }
      ]}
      onPress={() => handleQuickServicePress(item)}
      activeOpacity={0.8}
    >
      <Ionicons 
        name={item.icon as any} 
        size={20} 
        color={item.urgent ? colors.error : colors.primary} 
      />
      <Text style={[
        styles.quickServiceText, 
        { color: colors.text.primary },
        item.urgent && { color: colors.error }
      ]}>
        {item.name}
      </Text>
      {item.urgent && <View style={[styles.urgentDot, { backgroundColor: colors.error }]} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background.primary} 
      />
      
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Header Section with warm gradient */}
        <LinearGradient
          colors={currentTheme.gradient as [string, string, string]}
          style={[styles.header, { borderBottomColor: colors.border }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={[styles.welcomeText, { color: "#FFFFFF" }]}>Akwaaba! 👋</Text>
              <Text style={[styles.subtitle, { color: "#FFFFFF" }]}>Find trusted artisans near you</Text>
            </View>
            
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={[styles.headerButton, { 
                  backgroundColor: "#FFFFFF20",
                  borderColor: "#FFFFFF30",
                }]}
                onPress={() => navigation.navigate('Notifications')}
              >
                <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
                <View style={[styles.notificationBadge, { backgroundColor: colors.error }]} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.headerButton, { 
                  backgroundColor: "#FFFFFF20",
                  borderColor: "#FFFFFF30",
                }]}
                onPress={() => navigation.navigate('Profile')}
              >
                <Ionicons name="person-circle-outline" size={24} color="#FFFFFF" />
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
          <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Quick Actions</Text>
          </View>
          
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('Bookings')}
            >
              <LinearGradient
                colors={currentTheme.gradient as [string, string, string]}
                style={[styles.quickActionIcon, { shadowColor: colors.primary }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={[styles.quickActionText, { color: colors.text.primary }]}>Bookings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('Messages')}
            >
              <LinearGradient
                colors={currentTheme.gradient as [string, string, string]}
                style={[styles.quickActionIcon, { shadowColor: colors.primary }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={[styles.quickActionText, { color: colors.text.primary }]}>Messages</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('Favorites')}
            >
              <LinearGradient
                colors={currentTheme.gradient as [string, string, string]}
                style={[styles.quickActionIcon, { shadowColor: colors.primary }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={[styles.quickActionText, { color: colors.text.primary }]}>Favorites</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('Emergency')}
            >
              <LinearGradient
                colors={[colors.error, colors.error + '80']}
                style={[styles.quickActionIcon, { shadowColor: colors.error }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="flash-outline" size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={[styles.quickActionText, { color: colors.text.primary }]}>Emergency</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Service Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllCategories')}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
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
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Need Help Now?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Emergency')}>
              <Ionicons name="flash" size={20} color={colors.error} />
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
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Top Rated Artisans</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllArtisans')}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
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
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Recent Activity</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ActivityHistory')}>
                <Text style={[styles.seeAllText, { color: colors.primary }]}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.activityContainer, { 
              backgroundColor: colors.background.primary,
              borderColor: colors.border,
              shadowColor: colors.text.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }]}>
              {recentActivity.map((activity, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.activityItem, { borderBottomColor: colors.border }]}
                  onPress={() => navigation.navigate('ActivityDetails', { activity })}
                >
                  <View style={styles.activityIcon}>
                    <Ionicons 
                      name={activity.type === 'booking' ? 'checkmark-circle' : 'chatbubble-ellipses'} 
                      size={20} 
                      color={activity.status === 'completed' ? colors.success : colors.warning} 
                    />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={[styles.activityTitle, { color: colors.text.primary }]}>
                      {activity.service} with {activity.artisan}
                    </Text>
                    <Text style={[styles.activityStatus, { color: colors.text.primary }]}>
                      {activity.status === 'completed' ? 'Completed' : 'Pending response'} • {activity.time}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.text.primary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Optional: add a little space above the tab bar */}
        <View style={{ height: isSmallScreen ? 80 : 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
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
  },
  subtitle: {
    fontSize: 16,
  },
  headerButton: {
    position: 'relative',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
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
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionText: {
    fontSize: 12,
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
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
  quickServicesContainer: {
    paddingRight: 20,
  },
  quickServiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    position: 'relative',
  },
  quickServiceText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  urgentDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  artisansContainer: {
    paddingRight: 20,
  },
  artisanCard: {
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 200,
    borderWidth: 1,
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
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  availableDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
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
  },
  artisanSpecialty: {
    fontSize: 14,
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
    marginLeft: 4,
  },
  artisanStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  jobsCompleted: {
    fontSize: 12,
    fontWeight: '500',
  },
  priceRange: {
    fontSize: 12,
    fontWeight: '600',
  },
  activityContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
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
  },
  activityStatus: {
    fontSize: 12,
  },
});

export default HomeScreen;