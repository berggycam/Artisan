import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Alert,
  FlatList,
  Animated,
  Platform,
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StarRating from '../../components/shared/StarRating';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

// Responsive Design System
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const screenScale = screenWidth / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

// More robust responsive breakpoint system
const getDeviceType = () => {
  if (screenWidth < 360) return 'small';      // Small phones (iPhone SE, etc.)
  if (screenWidth < 390) return 'medium';     // Standard phones (iPhone 12, etc.)
  if (screenWidth < 430) return 'large';      // Large phones (iPhone Pro Max, etc.)
  if (screenWidth < 768) return 'xlarge';     // Extra large phones
  return 'tablet';                            // Tablets and larger
};

const deviceType = getDeviceType();

// Responsive values based on device type
const responsive = {
  small: {
    // Layout
    headerHeight: screenHeight * 0.35,
    avatarSize: 70,
    padding: 12,
    
    // Typography
    title: 18,
    subtitle: 14,
    body: 13,
    caption: 11,
    
    // Spacing
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    
    // UI Elements
    iconSize: 16,
    buttonHeight: 44,
    borderRadius: 8,
    tabHeight: 40,
  },
  medium: {
    headerHeight: screenHeight * 0.36,
    avatarSize: 80,
    padding: 16,
    
    title: 20,
    subtitle: 16,
    body: 14,
    caption: 12,
    
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 24,
    
    iconSize: 18,
    buttonHeight: 48,
    borderRadius: 10,
    tabHeight: 44,
  },
  large: {
    headerHeight: screenHeight * 0.37,
    avatarSize: 90,
    padding: 18,
    
    title: 22,
    subtitle: 17,
    body: 15,
    caption: 13,
    
    xs: 6,
    sm: 10,
    md: 18,
    lg: 22,
    xl: 26,
    
    iconSize: 20,
    buttonHeight: 50,
    borderRadius: 12,
    tabHeight: 46,
  },
  xlarge: {
    headerHeight: screenHeight * 0.38,
    avatarSize: 100,
    padding: 20,
    
    title: 24,
    subtitle: 18,
    body: 16,
    caption: 14,
    
    xs: 6,
    sm: 12,
    md: 20,
    lg: 24,
    xl: 28,
    
    iconSize: 22,
    buttonHeight: 52,
    borderRadius: 14,
    tabHeight: 48,
  },
  tablet: {
    headerHeight: screenHeight * 0.32,
    avatarSize: 120,
    padding: 24,
    
    title: 28,
    subtitle: 20,
    body: 18,
    caption: 16,
    
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    
    iconSize: 24,
    buttonHeight: 56,
    borderRadius: 16,
    tabHeight: 52,
  }
};

const r = responsive[deviceType];

// Portfolio grid calculation
const getPortfolioColumns = () => {
  if (screenWidth < 360) return 2;
  if (screenWidth < 768) return 2;
  return 3;
};

const portfolioColumns = getPortfolioColumns();
const portfolioItemWidth = (screenWidth - (r.padding * 2) - (r.md * (portfolioColumns - 1))) / portfolioColumns;

// Mock data (simplified for better performance)
const mockArtisan = {
  id: '1',
  name: 'Akosua Mensah',
  specialty: 'Hair Stylist & Color Expert',
  avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200',
  coverImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
  rating: 4.8,
  reviewCount: 127,
  experience: '8 years',
  location: 'Downtown, New York',
  badge: 'Top Rated',
  responseTime: '~30 min',
  completedJobs: 450,
  about: 'Professional hair stylist with over 8 years of experience in creating beautiful hairstyles for all occasions. Specializing in bridal hair, color treatments, and modern cuts. I believe every client deserves to feel confident and beautiful.',
  services: [
    { id: '1', name: 'Hair Cut & Style', price: '$45', duration: '45 min', popular: true },
    { id: '2', name: 'Hair Coloring', price: '$120', duration: '2 hours', popular: true },
    { id: '3', name: 'Bridal Hair', price: '$150', duration: '1.5 hours', popular: false },
    { id: '4', name: 'Hair Treatment', price: '$80', duration: '1 hour', popular: false },
  ],
  reviews: [
    {
      id: '1',
      user: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 5,
      comment: 'Sarah is amazing! She did my wedding hair perfectly. Very professional and friendly.',
      date: '2 days ago',
      helpful: 12
    },
    {
      id: '2',
      user: 'Jessica Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      rating: 5,
      comment: 'Best hair stylist I\'ve ever been to. She really knows how to work with different hair types.',
      date: '1 week ago',
      helpful: 8
    },
  ],
  portfolio: [
    'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300',
    'https://images.unsplash.com/photo-1552642084-9a907e5884ee?w=300',
    'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=300',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300',
  ],
  isOnline: true,
  isVerified: true,
  availability: [
    { day: 'Today', slots: 3 },
    { day: 'Tomorrow', slots: 5 },
    { day: 'Thu', slots: 2 },
  ],
  emergencyServices: [
    {
      id: 'police',
      name: 'Ghana Police Service',
      icon: 'shield-checkmark',
      phone: '191',
      description: 'Emergency police response',
      responseTime: '5-10 min',
      isEmergency: true,
      color: '#1E40AF'
    },
    {
      id: 'fire',
      name: 'Ghana Fire Service',
      icon: 'flame',
      phone: '192',
      description: 'Fire emergency response',
      responseTime: '5-15 min',
      isEmergency: true,
      color: '#DC2626'
    },
    {
      id: 'ambulance',
      name: 'National Ambulance Service',
      icon: 'medical',
      phone: '193',
      description: 'Medical emergency response',
      responseTime: '8-12 min',
      isEmergency: true,
      color: '#059669'
    },
    {
      id: 'electric',
      name: 'Emergency Electrician',
      icon: 'flash',
      phone: '+233 24 123 4567',
      description: 'Electrical emergency repairs',
      responseTime: '15-30 min',
      isEmergency: false,
      color: '#7C3AED'
    },
  ]
};

const TABS = [
  { key: 'about', label: 'About', icon: 'information-circle-outline' },
  { key: 'services', label: 'Services', icon: 'cut-outline' },
  { key: 'emergency', label: 'Emergency', icon: 'warning-outline' },
  { key: 'reviews', label: 'Reviews', icon: 'star-outline' },
  { key: 'portfolio', label: 'Portfolio', icon: 'images-outline' }
];

interface ArtisanProfileScreenProps {
  navigation: any;
}

const ArtisanProfileScreen: React.FC<ArtisanProfileScreenProps> = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();
  
  const [selectedTab, setSelectedTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [dimensions, setDimensions] = useState({ width: screenWidth, height: screenHeight });
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Check if artisan is already in favorites
    checkFavoriteStatus();

    return () => subscription?.remove();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      // TODO: Replace with actual API call when backend is connected
      // const response = await fetch(`/api/users/favorites/${mockArtisan.id}`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      // setIsFavorite(data.data.isFavorite);
      
      // For now, use mock data
      setIsFavorite(false);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call when backend is connected
      // const response = await fetch(`/api/users/favorites/${mockArtisan.id}`, {
      //   method: isFavorite ? 'DELETE' : 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsFavorite(!isFavorite);
      
      Alert.alert(
        isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
        isFavorite ? 'Artisan removed from your favorites.' : 'Artisan added to your favorites.'
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorites. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareContent = {
        title: `${mockArtisan.name} - ${mockArtisan.specialty}`,
        message: `Check out ${mockArtisan.name}, a ${mockArtisan.specialty} with ${mockArtisan.rating}⭐ rating and ${mockArtisan.experience} of experience. Available in ${mockArtisan.location}.`,
        url: `https://artisanapp.com/artisan/${mockArtisan.id}`, // Replace with actual deep link
      };

      const result = await Share.share(shareContent, {
        dialogTitle: `Share ${mockArtisan.name}'s Profile`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share. Please try again.');
    }
  };

  const bookAppointment = () => {
    // Use the first available service for booking
    const firstService = mockArtisan.services[0];
    navigation.navigate('Booking', { bookingId: `booking_${mockArtisan.id}_${firstService.id}` });
  };

  const sendMessage = () => {
    const conversation = {
      id: `chat_${mockArtisan.id}`,
      artisanName: mockArtisan.name,
      artisanSpecialty: mockArtisan.specialty,
      avatar: mockArtisan.avatar,
      online: mockArtisan.isOnline,
    };
    navigation.navigate('ChatDetail', { conversation });
  };

  // Render Functions
  const renderHeader = () => (
    <View style={styles.header}>
      <Image source={{ uri: mockArtisan.coverImage }} style={styles.coverImage} />
      
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
        style={styles.headerGradient}
      />
      
      {/* Header Actions */}
      <View style={[styles.headerActions, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={r.iconSize} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerRightActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={r.iconSize} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, isLoading && styles.actionButtonDisabled]} 
            onPress={toggleFavorite}
            disabled={isLoading}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={r.iconSize} 
              color={isFavorite ? "#EF4444" : "#FFFFFF"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: mockArtisan.avatar }} style={styles.avatar} />
          {mockArtisan.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        
        <View style={styles.nameContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.artisanName}>{mockArtisan.name}</Text>
            {mockArtisan.isVerified && (
              <Ionicons name="checkmark-circle" size={r.iconSize} color="#10B981" />
            )}
          </View>
          <Text style={styles.artisanSpecialty}>{mockArtisan.specialty}</Text>
          
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{mockArtisan.badge}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={r.iconSize - 2} color="#F59E0B" />
              <Text style={styles.ratingText}>{mockArtisan.rating}</Text>
              <Text style={styles.reviewCountText}>({mockArtisan.reviewCount})</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={[styles.tabNavigation, { backgroundColor: colors.background.primary, borderBottomColor: colors.border }]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabScrollContainer}
      >
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab, 
              selectedTab === tab.key && { backgroundColor: colors.bronze + '15' }
            ]}
            onPress={() => setSelectedTab(tab.key)}
          >
            <Ionicons
              name={tab.icon as any}
              size={r.iconSize - 2}
              color={selectedTab === tab.key ? colors.bronze : colors.text.secondary}
            />
            <Text style={[
              styles.tabText, 
              { color: colors.text.secondary },
              selectedTab === tab.key && { color: colors.bronze, fontWeight: '600' }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderStatsCard = () => (
    <View style={[styles.card, { backgroundColor: colors.background.secondary }]}>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.bronze }]}>{mockArtisan.completedJobs}</Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Jobs Done</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.bronze }]}>{mockArtisan.experience}</Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Experience</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.bronze }]}>{mockArtisan.responseTime}</Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Response</Text>
        </View>
      </View>
    </View>
  );

  const renderAboutTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: colors.background.secondary }]}>
        <Text style={[styles.aboutText, { color: colors.text.primary }]} numberOfLines={showFullAbout ? undefined : 3}>
          {mockArtisan.about}
        </Text>
        <TouchableOpacity 
          style={styles.readMoreButton}
          onPress={() => setShowFullAbout(!showFullAbout)}
        >
          <Text style={[styles.readMoreText, { color: colors.bronze }]}>
            {showFullAbout ? 'Show Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      </View>

      {renderStatsCard()}

      <View style={[styles.card, { backgroundColor: colors.background.secondary }]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="location" size={r.iconSize} color={colors.bronze} />
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Location & Availability</Text>
        </View>
        <Text style={[styles.locationText, { color: colors.text.secondary }]}>{mockArtisan.location}</Text>
        
        <View style={styles.availabilityContainer}>
          {mockArtisan.availability.map((item, index) => (
            <View key={index} style={[styles.availabilityItem, { backgroundColor: colors.background.primary }]}>
              <Text style={[styles.availabilityDay, { color: colors.text.secondary }]}>{item.day}</Text>
              <View style={[styles.slotsBadge, { backgroundColor: colors.bronze }]}>
                <Text style={styles.slotsText}>{item.slots} slots</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderServicesTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {mockArtisan.services.map((service) => (
        <View key={service.id} style={[styles.card, { backgroundColor: colors.background.secondary }]}>
          <View style={styles.serviceHeader}>
            <View style={styles.serviceLeft}>
              <View style={styles.serviceNameRow}>
                <Text style={[styles.serviceName, { color: colors.text.primary }]}>{service.name}</Text>
                {service.popular && (
                  <View style={[styles.popularBadge, { backgroundColor: colors.warning }]}>
                    <Text style={styles.popularText}>Popular</Text>
                  </View>
                )}
              </View>
              <View style={styles.serviceMeta}>
                <Ionicons name="time-outline" size={r.iconSize - 4} color={colors.text.secondary} />
                <Text style={[styles.serviceDuration, { color: colors.text.secondary }]}>{service.duration}</Text>
              </View>
            </View>
            <Text style={[styles.priceText, { color: colors.bronze }]}>{service.price}</Text>
          </View>
          
          <TouchableOpacity style={[styles.bookServiceButton, { backgroundColor: colors.bronze }]}>
            <Ionicons name="calendar-outline" size={r.iconSize - 2} color={colors.text.white} />
            <Text style={styles.bookServiceButtonText}>Book Service</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderEmergencyTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.emergencyHeader, { backgroundColor: colors.background.secondary }]}>
        <Ionicons name="warning" size={r.iconSize + 4} color={colors.error} />
        <Text style={[styles.emergencyTitle, { color: colors.text.primary }]}>Emergency Services</Text>
        <Text style={[styles.emergencySubtitle, { color: colors.text.secondary }]}>Quick access to emergency services and urgent repairs</Text>
      </View>

      {/* Official Emergency Services */}
      <Text style={[styles.sectionTitleLarge, { color: colors.text.primary }]}>Official Emergency Services</Text>
      {mockArtisan.emergencyServices.filter(service => service.isEmergency).map((service) => (
        <View key={service.id} style={[styles.card, { backgroundColor: colors.background.secondary }]}>
          <View style={styles.emergencyCardHeader}>
            <View style={[styles.emergencyIconContainer, { backgroundColor: service.color }]}>
              <Ionicons name={service.icon as any} size={r.iconSize} color={colors.text.white} />
            </View>
            <View style={styles.emergencyInfo}>
              <Text style={[styles.emergencyName, { color: colors.text.primary }]}>{service.name}</Text>
              <Text style={[styles.emergencyDescription, { color: colors.text.secondary }]}>{service.description}</Text>
              <View style={styles.emergencyMeta}>
                <Ionicons name="time-outline" size={r.iconSize - 4} color={colors.text.secondary} />
                <Text style={[styles.emergencyResponseTime, { color: colors.text.secondary }]}>{service.responseTime}</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.emergencyCallButton, { backgroundColor: service.color }]}
            onPress={() => {
              Alert.alert(
                'Emergency Call',
                `Call ${service.name}?\n\nPhone: ${service.phone}`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Call Now', onPress: () => console.log(`Calling ${service.phone}`) }
                ]
              );
            }}
          >
            <Ionicons name="call" size={r.iconSize - 2} color={colors.text.white} />
            <Text style={styles.emergencyCallText}>Call {service.phone}</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Emergency Artisans */}
      <Text style={[styles.sectionTitleLarge, { color: colors.text.primary }]}>Emergency Artisans</Text>
      {mockArtisan.emergencyServices.filter(service => !service.isEmergency).map((service) => (
        <View key={service.id} style={[styles.card, { backgroundColor: colors.background.secondary }]}>
          <View style={styles.emergencyCardHeader}>
            <View style={[styles.emergencyIconContainer, { backgroundColor: service.color }]}>
              <Ionicons name={service.icon as any} size={r.iconSize} color={colors.text.white} />
            </View>
            <View style={styles.emergencyInfo}>
              <Text style={[styles.emergencyName, { color: colors.text.primary }]}>{service.name}</Text>
              <Text style={[styles.emergencyDescription, { color: colors.text.secondary }]}>{service.description}</Text>
              <View style={styles.emergencyMeta}>
                <Ionicons name="time-outline" size={r.iconSize - 4} color={colors.text.secondary} />
                <Text style={[styles.emergencyResponseTime, { color: colors.text.secondary }]}>{service.responseTime}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.emergencyActions}>
            <TouchableOpacity style={[styles.emergencyCallButtonSecondary, { borderColor: colors.border }]}>
              <Ionicons name="call" size={r.iconSize - 2} color={service.color} />
              <Text style={[styles.emergencyCallTextSecondary, { color: service.color }]}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.emergencyMessageButton, { backgroundColor: colors.bronze + '15' }]}>
              <Ionicons name="chatbubble-outline" size={r.iconSize - 2} color={colors.bronze} />
              <Text style={[styles.emergencyMessageText, { color: colors.bronze }]}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderReviewsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: colors.background.secondary }]}>
        <View style={styles.reviewsHeader}>
          <Text style={[styles.reviewsRatingNumber, { color: colors.bronze }]}>{mockArtisan.rating}</Text>
          <View style={styles.reviewsRatingInfo}>
            <StarRating rating={mockArtisan.rating} />
            <Text style={[styles.reviewsCount, { color: colors.text.secondary }]}>({mockArtisan.reviewCount} reviews)</Text>
          </View>
        </View>
      </View>

      {mockArtisan.reviews.map((review) => (
        <View key={review.id} style={[styles.card, { backgroundColor: colors.background.secondary }]}>
          <View style={styles.reviewHeader}>
            <Image source={{ uri: review.avatar }} style={styles.reviewerAvatar} />
            <View style={styles.reviewInfo}>
              <Text style={[styles.reviewerName, { color: colors.text.primary }]}>{review.user}</Text>
              <View style={styles.reviewRating}>
                <StarRating rating={review.rating} />
                <Text style={[styles.reviewDate, { color: colors.text.secondary }]}>{review.date}</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.reviewComment, { color: colors.text.primary }]}>{review.comment}</Text>
          <TouchableOpacity style={styles.helpfulButton}>
            <Ionicons name="thumbs-up-outline" size={r.iconSize - 4} color={colors.text.secondary} />
            <Text style={[styles.helpfulText, { color: colors.text.secondary }]}>Helpful ({review.helpful})</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderPortfolioTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.portfolioGrid}>
        {mockArtisan.portfolio.map((image, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.portfolioItem}
            onPress={() => {
              Alert.alert('Portfolio Image', `Viewing image ${index + 1} of ${mockArtisan.portfolio.length}`);
            }}
          >
            <Image source={{ uri: image }} style={styles.portfolioImage} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'about': return renderAboutTab();
      case 'services': return renderServicesTab();
      case 'emergency': return renderEmergencyTab();
      case 'reviews': return renderReviewsTab();
      case 'portfolio': return renderPortfolioTab();
      default: return renderAboutTab();
    }
  };

  const renderBottomActions = () => (
    <View style={[styles.bottomActions, { backgroundColor: colors.background.primary, borderTopColor: colors.border }]}>
      <TouchableOpacity style={[styles.messageButton, { borderColor: colors.bronze }]} onPress={sendMessage}>
        <Ionicons name="chatbubble-outline" size={r.iconSize} color={colors.bronze} />
        <Text style={[styles.messageButtonText, { color: colors.bronze }]}>Message</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.bookButton} onPress={bookAppointment}>
        <LinearGradient
          colors={[colors.bronze, colors.gold]}
          style={styles.bookButtonGradient}
        >
          <Ionicons name="calendar" size={r.iconSize} color={colors.text.white} />
          <Text style={styles.bookButtonText}>Book Now</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor="transparent" 
        translucent 
      />
      
      {renderHeader()}
      {renderTabs()}
      
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        {renderTabContent()}
      </Animated.View>

      {renderBottomActions()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    height: r.headerHeight,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  headerActions: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: r.padding,
    zIndex: 2,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    opacity: 0.6,
  },
  headerRightActions: {
    flexDirection: 'row',
    gap: r.sm,
  },
  profileInfo: {
    position: 'absolute',
    bottom: r.padding,
    left: r.padding,
    right: r.padding,
    flexDirection: 'row',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: r.md,
  },
  avatar: {
    width: r.avatarSize,
    height: r.avatarSize,
    borderRadius: r.avatarSize / 2,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.xs,
  },
  artisanName: {
    fontSize: r.title,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  artisanSpecialty: {
    fontSize: r.body,
    color: '#FFFFFF',
    marginTop: r.xs,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: r.sm,
    gap: r.sm,
  },
  badge: {
    backgroundColor: '#D2691E',
    paddingHorizontal: r.sm,
    paddingVertical: r.xs,
    borderRadius: r.borderRadius,
  },
  badgeText: {
    fontSize: r.caption,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.xs,
  },
  ratingText: {
    fontSize: r.body,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  reviewCountText: {
    fontSize: r.caption,
    color: '#FFFFFF',
    opacity: 0.9,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  // Tab Navigation Styles
  tabNavigation: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabScrollContainer: {
    paddingHorizontal: r.padding,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: r.md,
    paddingVertical: r.sm,
    marginRight: r.sm,
    borderRadius: r.borderRadius,
    gap: r.xs,
  },
  activeTab: {
    backgroundColor: '#D2691E15',
  },
  tabText: {
    fontSize: r.caption,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#D2691E',
    fontWeight: '600',
  },

  // Content Styles
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    padding: r.padding,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: r.borderRadius,
    padding: r.padding,
    marginBottom: r.md,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  // About Tab Styles
  aboutText: {
    fontSize: r.body,
    color: '#1F2937',
    lineHeight: r.body * 1.5,
  },
  readMoreButton: {
    marginTop: r.sm,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: r.caption,
    color: '#D2691E',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: r.title,
    fontWeight: 'bold',
    color: '#D2691E',
  },
  statLabel: {
    fontSize: r.caption,
    color: '#6B7280',
    marginTop: r.xs,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: r.md,
    gap: r.sm,
  },
  sectionTitle: {
    fontSize: r.subtitle,
    fontWeight: '600',
    color: '#1F2937',
  },
  sectionTitleLarge: {
    fontSize: r.subtitle,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: r.md,
    marginTop: r.lg,
  },
  locationText: {
    fontSize: r.body,
    color: '#6B7280',
    marginBottom: r.md,
  },
  availabilityContainer: {
    flexDirection: 'row',
    gap: r.sm,
  },
  availabilityItem: {
    flex: 1,
    alignItems: 'center',
    padding: r.sm,
    backgroundColor: '#F9FAFB',
    borderRadius: r.borderRadius,
  },
  availabilityDay: {
    fontSize: r.caption,
    color: '#6B7280',
    fontWeight: '500',
  },
  slotsBadge: {
    backgroundColor: '#D2691E',
    paddingHorizontal: r.sm,
    paddingVertical: r.xs,
    borderRadius: r.borderRadius,
    marginTop: r.xs,
  },
  slotsText: {
    fontSize: r.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Services Tab Styles
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: r.md,
  },
  serviceLeft: {
    flex: 1,
  },
  serviceNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.sm,
    marginBottom: r.xs,
  },
  serviceName: {
    fontSize: r.subtitle,
    fontWeight: '600',
    color: '#1F2937',
  },
  popularBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: r.xs,
    paddingVertical: 2,
    borderRadius: r.borderRadius / 2,
  },
  popularText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.xs,
  },
  serviceDuration: {
    fontSize: r.caption,
    color: '#6B7280',
  },
  priceText: {
    fontSize: r.title,
    fontWeight: 'bold',
    color: '#D2691E',
  },
  bookServiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D2691E',
    paddingVertical: r.sm,
    borderRadius: r.borderRadius,
    gap: r.xs,
  },
  bookServiceButtonText: {
    fontSize: r.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Emergency Tab Styles
  emergencyHeader: {
    alignItems: 'center',
    marginBottom: r.lg,
    padding: r.padding,
    backgroundColor: '#FFFFFF',
    borderRadius: r.borderRadius,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyTitle: {
    fontSize: r.title,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: r.sm,
  },
  emergencySubtitle: {
    fontSize: r.body,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: r.xs,
  },
  emergencyCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: r.md,
  },
  emergencyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: r.md,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyName: {
    fontSize: r.subtitle,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: r.xs,
  },
  emergencyDescription: {
    fontSize: r.body,
    color: '#6B7280',
    marginBottom: r.xs,
  },
  emergencyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.xs,
  },
  emergencyResponseTime: {
    fontSize: r.caption,
    color: '#6B7280',
  },
  emergencyCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: r.sm,
    borderRadius: r.borderRadius,
    gap: r.xs,
  },
  emergencyCallText: {
    fontSize: r.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emergencyActions: {
    flexDirection: 'row',
    gap: r.sm,
  },
  emergencyCallButtonSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: r.sm,
    borderRadius: r.borderRadius,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: r.xs,
  },
  emergencyCallTextSecondary: {
    fontSize: r.body,
    fontWeight: '600',
  },
  emergencyMessageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: r.sm,
    borderRadius: r.borderRadius,
    backgroundColor: '#D2691E15',
    gap: r.xs,
  },
  emergencyMessageText: {
    fontSize: r.body,
    color: '#D2691E',
    fontWeight: '600',
  },

  // Reviews Tab Styles
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.lg,
  },
  reviewsRatingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#D2691E',
  },
  reviewsRatingInfo: {
    flex: 1,
  },
  reviewsCount: {
    fontSize: r.body,
    color: '#6B7280',
    marginTop: r.xs,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: r.md,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: r.md,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: r.body,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: r.xs,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.sm,
  },
  reviewDate: {
    fontSize: r.caption,
    color: '#6B7280',
  },
  reviewComment: {
    fontSize: r.body,
    color: '#1F2937',
    lineHeight: r.body * 1.4,
    marginBottom: r.md,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.xs,
    alignSelf: 'flex-start',
  },
  helpfulText: {
    fontSize: r.caption,
    color: '#6B7280',
  },

  // Portfolio Tab Styles
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: r.md,
  },
  portfolioItem: {
    width: portfolioItemWidth,
    height: portfolioItemWidth * 1.2,
    borderRadius: r.borderRadius,
    overflow: 'hidden',
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Bottom Actions Styles
  bottomActions: {
    flexDirection: 'row',
    padding: r.padding,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: r.md,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: r.md,
    borderRadius: r.borderRadius,
    borderWidth: 2,
    borderColor: '#D2691E',
    gap: r.xs,
  },
  messageButtonText: {
    fontSize: r.body,
    color: '#D2691E',
    fontWeight: '600',
  },
  bookButton: {
    flex: 2,
    borderRadius: r.borderRadius,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: r.md,
    gap: r.xs,
  },
  bookButtonText: {
    fontSize: r.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ArtisanProfileScreen;