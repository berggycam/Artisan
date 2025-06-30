import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Booking, RealTimeLocation } from '../../types/booking';
import { useBookingStore } from '../../store/bookingStore';
import BookingCard from '../../components/cards/BookingCard';
import LocationMap from '../../components/shared/LocationMap';
import locationService from '../../services/location';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

interface BookingDetailScreenProps {
  route: {
    params: {
      booking: Booking;
    };
  };
}

const BookingDetailScreen: React.FC<BookingDetailScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { booking } = route.params;
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();
  
  const [realTimeLocation, setRealTimeLocation] = useState<RealTimeLocation | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [estimatedArrival, setEstimatedArrival] = useState<number | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const { getRealTimeLocation, startLocationTracking, updateBooking } = useBookingStore();

  useEffect(() => {
    // Animate entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Location tracking logic
    if (booking.currentStatus === 'confirmed' || booking.currentStatus === 'in_progress') {
      startLocationTracking(booking.artisanId);
      
      const location = getRealTimeLocation(booking.artisanId);
      if (location) {
        setRealTimeLocation(location);
        updateLocationInfo(location);
      }

      const interval = setInterval(() => {
        const updatedLocation = getRealTimeLocation(booking.artisanId);
        if (updatedLocation) {
          setRealTimeLocation(prevLocation => {
            // Only update if the location has actually changed
            if (!prevLocation || 
                prevLocation.location.latitude !== updatedLocation.location.latitude ||
                prevLocation.location.longitude !== updatedLocation.location.longitude) {
              updateLocationInfo(updatedLocation);
              return updatedLocation;
            }
            return prevLocation;
          });
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [booking.artisanId, booking.currentStatus, startLocationTracking, getRealTimeLocation]);

  const updateLocationInfo = (location: RealTimeLocation) => {
    const calculatedDistance = locationService.calculateDistance(
      location.location,
      booking.userLocation
    );
    setDistance(calculatedDistance);

    const arrival = locationService.calculateEstimatedArrival(
      location.location,
      booking.userLocation
    );
    setEstimatedArrival(arrival);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'confirmed': return colors.success;
      case 'in_progress': return colors.primary;
      case 'completed': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.warning;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return 'time-outline';
      case 'confirmed': return 'checkmark-circle-outline';
      case 'in_progress': return 'play-circle-outline';
      case 'completed': return 'checkmark-done-circle-outline';
      case 'cancelled': return 'close-circle-outline';
      default: return 'help-circle-outline';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      pending: 'Awaiting Confirmation',
      confirmed: 'Confirmed & Ready',
      in_progress: 'Service in Progress',
      completed: 'Successfully Completed',
      cancelled: 'Booking Cancelled',
    };
    return statusMap[status as keyof typeof statusMap] || 'Status Unknown';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking? This action cannot be undone.',
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            // Update booking status to cancelled
            updateBooking(booking.id, { currentStatus: 'cancelled' });
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleContactArtisan = () => {
    // Navigate to chat screen
    (navigation as any).navigate('ChatDetail', { 
      conversation: {
        id: `chat_${booking.artisanId}`,
        artisanName: booking.artisanName,
        artisanSpecialty: booking.serviceName,
        avatar: booking.artisanAvatar,
        online: true,
      }
    });
  };

  const handleRateBooking = () => {
    // Navigate to rating screen
    (navigation as any).navigate('RateApp', { bookingId: booking.id });
  };

  const DetailRow = ({ icon, label, value, color }: { icon: string; label: string; value: string; color?: string }) => (
    <View style={styles.detailRow}>
      <View style={[styles.iconContainer, { backgroundColor: color ? `${color}15` : colors.background.secondary }]}>
        <Ionicons name={icon as any} size={20} color={color || colors.primary} />
      </View>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  const ActionButton = ({ 
    icon, 
    text, 
    onPress, 
    backgroundColor, 
    style 
  }: { 
    icon: string; 
    text: string; 
    onPress: () => void; 
    backgroundColor: string;
    style?: any;
  }) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.actionButtonContent}>
        <Ionicons name={icon as any} size={22} color={colors.text.white} />
        <Text style={styles.actionButtonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderActionButtons = () => {
    if (booking.currentStatus === 'cancelled') {
      return (
        <View style={styles.actionButtonsContainer}>
          <ActionButton
            icon="chatbubble-ellipses-outline"
            text="Contact Support"
            backgroundColor={colors.primary}
            onPress={handleContactArtisan}
          />
        </View>
      );
    }

    return (
      <View style={styles.actionButtonsContainer}>
        {booking.currentStatus !== 'completed' && (
          <ActionButton
            icon="close-circle-outline"
            text="Cancel Booking"
            backgroundColor={colors.error}
            onPress={handleCancelBooking}
          />
        )}
        
        <ActionButton
          icon="chatbubble-ellipses-outline"
          text="Contact Artisan"
          backgroundColor={colors.primary}
          onPress={handleContactArtisan}
          style={{ flex: 1, marginRight: 12 }}
        />
        
        {booking.currentStatus === 'completed' && (
          <ActionButton
            icon="star-outline"
            text="Rate Service"
            backgroundColor={colors.secondary}
            onPress={handleRateBooking}
          />
        )}
      </View>
    );
  };

  return (
    <>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background.primary} 
      />
      <LinearGradient
        colors={[colors.background.primary, colors.background.secondary]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header with Blur Effect */}
        <BlurView intensity={80} style={[styles.header, { paddingTop: insets.top }]}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Booking Details</Text>
              <Text style={styles.headerSubtitle}>#{booking.id.slice(-8)}</Text>
            </View>
            
            <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
              <Ionicons name="ellipsis-horizontal" size={24} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </BlurView>

        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Status Card */}
          <View style={styles.statusCard}>
            <View style={[styles.statusIconContainer, { backgroundColor: getStatusColor(booking.currentStatus) }]}>
              <Ionicons 
                name={getStatusIcon(booking.currentStatus) as any} 
                size={28} 
                color={colors.text.white} 
              />
            </View>
            <View style={styles.statusContent}>
              <Text style={styles.statusText}>{getStatusText(booking.currentStatus)}</Text>
              <Text style={styles.statusSubtext}>
                {booking.currentStatus === 'pending' && 'Waiting for artisan confirmation'}
                {booking.currentStatus === 'confirmed' && 'Artisan is on the way'}
                {booking.currentStatus === 'in_progress' && 'Service is being performed'}
                {booking.currentStatus === 'completed' && 'Service completed successfully'}
                {booking.currentStatus === 'cancelled' && 'Booking was cancelled'}
              </Text>
            </View>
          </View>

          {/* Payment Information */}
          <View style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <Text style={styles.paymentTitle}>Payment Information</Text>
            </View>
            
            <DetailRow
              icon="card-outline"
              label="Total Amount"
              value={formatPrice(booking.price)}
              color={colors.success}
            />
            
            <DetailRow
              icon="checkmark-circle-outline"
              label="Payment Status"
              value={(booking.paymentStatus || 'pending').charAt(0).toUpperCase() + (booking.paymentStatus || 'pending').slice(1)}
              color={
                booking.paymentStatus === 'paid' ? colors.success :
                booking.paymentStatus === 'pending' ? colors.warning :
                booking.paymentStatus === 'refunded' ? colors.primary :
                colors.error
              }
            />
          </View>

          {/* Service Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Service Details</Text>
            <View style={styles.sectionDivider} />
            
            <DetailRow
              icon="cut-outline"
              label="Service"
              value={booking.serviceName}
            />
            
            <DetailRow
              icon="person-outline"
              label="Artisan"
              value={booking.artisanName}
            />
            
            <DetailRow
              icon="calendar-outline"
              label="Scheduled Date"
              value={formatDate(booking.scheduledDate)}
            />
            
            <DetailRow
              icon="time-outline"
              label="Duration"
              value={`${booking.duration} minutes`}
            />
            
            <DetailRow
              icon="location-outline"
              label="Location"
              value={booking.userLocation.address || 'Location not specified'}
            />
          </View>

          {/* Enhanced Action Buttons */}
          {renderActionButtons()}

          {/* Enhanced Rating Section */}
          {booking.rating && (
            <View style={styles.ratingSection}>
              <Text style={styles.ratingTitle}>Your Rating</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= booking.rating! ? "star" : "star-outline"}
                    size={24}
                    color={colors.secondary}
                    style={styles.star}
                  />
                ))}
              </View>
              {booking.review && (
                <View style={styles.reviewContainer}>
                  <Text style={styles.reviewText}>"{booking.review}"</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  moreButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flex: 1,
    marginTop: 120,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  statusIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusContent: {
    flex: 1,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  statusSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  paymentCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  paymentHeader: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  detailsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 12,
    letterSpacing: -0.4,
  },
  sectionDivider: {
    height: 3,
    backgroundColor: '#F97316',
    borderRadius: 2,
    width: 40,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 17,
    color: '#1F2937',
    lineHeight: 24,
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 8,
  },
  ratingSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
  },
  star: {
    marginRight: 4,
  },
  reviewContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  reviewText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 24,
  },
});

export default BookingDetailScreen;