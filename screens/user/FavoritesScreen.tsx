import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  Animated,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useThemedColors } from '../../constants/colors';

const { width } = Dimensions.get('window');

interface FavoriteItem {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  available: boolean;
  image: string | null;
  reviews: number;
  verified: boolean;
  distance: string;
}

interface FavoriteCardProps {
  item: FavoriteItem;
  colors: any;
  onPress: () => void;
  index: number;
}

const FavoriteCard = ({ item, colors, onPress, index }: FavoriteCardProps) => {
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
    opacity: fadeAnim,
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[styles.modernCard, { backgroundColor: colors.background.secondary }]}
        activeOpacity={0.9}
        onPress={onPress}
      >
        {/* Glassmorphism effect */}
        <BlurView intensity={20} style={styles.cardBlur}>
          <LinearGradient
            colors={[
              `${colors.primary}15`,
              `${colors.accent}08`,
              `${colors.background.secondary}95`
            ]}
            style={styles.cardGradient}
          >
            {/* Header section with avatar and status */}
            <View style={styles.cardHeader}>
              <View style={styles.avatarSection}>
                <View style={[styles.modernAvatar, { backgroundColor: colors.background.tertiary }]}>
                  <LinearGradient
                    colors={[colors.primary, colors.accent]}
                    style={styles.avatarGradient}
                  >
                    <Text style={[styles.avatarText, { color: colors.text.white }]}>
                      {item.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    </Text>
                  </LinearGradient>
                </View>
                
                {/* Status indicators */}
                <View style={styles.statusContainer}>
                  {item.available && (
                    <View style={[styles.availableIndicator, { backgroundColor: colors.success }]}>
                      <View style={[styles.availablePulse, { backgroundColor: colors.success }]} />
                    </View>
                  )}
                  {item.verified && (
                    <View style={[styles.verifiedBadge, { backgroundColor: colors.primary }]}>
                      <Ionicons name="checkmark" size={8} color={colors.text.white} />
                    </View>
                  )}
                </View>
              </View>

              {/* Favorite heart */}
              <TouchableOpacity style={styles.heartButton}>
                <LinearGradient
                  colors={[colors.error, `${colors.error}80`]}
                  style={styles.heartGradient}
                >
                  <Ionicons name="heart" size={16} color={colors.text.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Content section */}
            <View style={styles.cardContent}>
              <View style={styles.nameSection}>
                <Text style={[styles.modernName, { color: colors.text.primary }]} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={[styles.specialtyPill, { backgroundColor: `${colors.primary}20` }]}>
                  <Text style={[styles.specialtyText, { color: colors.primary }]}>
                    {item.specialty}
                  </Text>
                </View>
              </View>

              {/* Info grid */}
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Ionicons name="location" size={14} color={colors.accent} />
                  <Text style={[styles.infoText, { color: colors.text.secondary }]} numberOfLines={1}>
                    {item.location}
                  </Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Ionicons name="navigate" size={14} color={colors.accent} />
                  <Text style={[styles.infoText, { color: colors.text.secondary }]}>
                    {item.distance}
                  </Text>
                </View>
              </View>

              {/* Rating section */}
              <View style={styles.ratingSection}>
                <View style={styles.starsContainer}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < Math.floor(item.rating) ? "star" : i < item.rating ? "star-half" : "star-outline"}
                      size={12}
                      color={colors.warning}
                    />
                  ))}
                </View>
                <Text style={[styles.ratingText, { color: colors.text.primary }]}>
                  {item.rating}
                </Text>
                <Text style={[styles.reviewsText, { color: colors.text.tertiary }]}>
                  ({item.reviews})
                </Text>
                
                <View style={styles.statusBadge}>
                  <View style={[
                    styles.statusDot, 
                    { backgroundColor: item.available ? colors.success : colors.error }
                  ]} />
                  <Text style={[styles.statusText, { color: colors.text.secondary }]}>
                    {item.available ? 'Available' : 'Busy'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Action indicator */}
            <View style={styles.actionIndicator}>
              <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
            </View>
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
};

const FavoritesScreen: React.FC = ({ navigation }: any) => {
  const colors = useThemedColors();
  const [headerAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const headerAnimatedStyle = {
    opacity: headerAnim,
    transform: [
      {
        translateY: headerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        }),
      },
    ],
  };

  const mockFavorites: FavoriteItem[] = [
    {
      id: '1',
      name: 'Kwame Asante',
      specialty: 'Vulcanizer',
      location: 'Tema Station',
      rating: 4.8,
      available: true,
      image: null,
      reviews: 127,
      verified: true,
      distance: '2.3 km',
    },
    {
      id: '2',
      name: 'Akosua Mensah',
      specialty: 'Seamstress',
      location: 'Makola Market',
      rating: 4.9,
      available: false,
      image: null,
      reviews: 89,
      verified: true,
      distance: '1.8 km',
    },
    {
      id: '3',
      name: 'Kofi Adjei',
      specialty: 'Electrician',
      location: 'Osu',
      rating: 4.7,
      available: true,
      image: null,
      reviews: 203,
      verified: false,
      distance: '3.1 km',
    },
  ];

  const renderFavorite = ({ item, index }: { item: FavoriteItem; index: number }) => (
    <FavoriteCard
      item={item}
      colors={colors}
      index={index}
      onPress={() => navigation?.navigate?.('ArtisanProfile', { artisanId: item.id })}
    />
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <LinearGradient
        colors={[`${colors.primary}20`, `${colors.accent}10`, `${colors.background.secondary}80`]}
        style={styles.emptyIconContainer}
      >
        <Ionicons name="heart-outline" size={64} color={colors.text.tertiary} />
      </LinearGradient>
      <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
        No Favorites Yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.text.secondary }]}>
        Start exploring and add artisans to your favorites for quick access
      </Text>
      <TouchableOpacity style={[styles.exploreButton, { backgroundColor: colors.primary }]}>
        <Text style={[styles.exploreText, { color: colors.text.white }]}>
          Explore Artisans
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Modern Header */}
      <Animated.View style={headerAnimatedStyle}>
        <LinearGradient
          colors={[colors.primary, colors.accent]}
          style={styles.modernHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <BlurView intensity={30} style={styles.headerBlur}>
            <View style={styles.headerContent}>
              <View>
                <Text style={[styles.headerTitle, { color: colors.text.white }]}>
                  My Favorites
                </Text>
                <Text style={[styles.headerSubtitle, { color: `${colors.text.white}80` }]}>
                  {mockFavorites.length} saved artisans
                </Text>
              </View>
              
              <View style={styles.headerActions}>
                <TouchableOpacity style={[styles.headerButton, { backgroundColor: `${colors.text.white}20` }]}>
                  <Ionicons name="search" size={20} color={colors.text.white} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.headerButton, { backgroundColor: `${colors.text.white}20` }]}>
                  <Ionicons name="filter" size={20} color={colors.text.white} />
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </LinearGradient>
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        {mockFavorites.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={mockFavorites}
            keyExtractor={(item) => item.id}
            renderItem={renderFavorite}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modernHeader: {
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  headerBlur: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  modernCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardBlur: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  cardGradient: {
    padding: 20,
    minHeight: 140,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarSection: {
    position: 'relative',
  },
  modernAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    flexDirection: 'row',
    gap: 4,
  },
  availableIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  availablePulse: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    opacity: 0.3,
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  heartGradient: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  nameSection: {
    marginBottom: 12,
  },
  modernName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  specialtyPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialtyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  infoText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  reviewsText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionIndicator: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -9,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  exploreText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FavoritesScreen;