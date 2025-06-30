import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Booking, RealTimeLocation } from '../../types/booking';
import { useBookingStore } from '../../store/bookingStore';
import locationService from '../../services/location';

const { width } = Dimensions.get('window');

interface BookingCardProps {
  booking: Booking;
  onPress: (booking: Booking) => void;
  showLocation?: boolean;
}

const COLORS = {
  primary: '#F97316', // Warm orange
  primaryLight: '#FB923C',
  primaryDark: '#EA580C',
  secondary: '#F59E0B', // Amber
  accent: '#EF4444', // Red
  warm: '#DC2626', // Warm red
  text: {
    primary: '#1F2937', // Dark gray
    secondary: '#6B7280', // Medium gray
    tertiary: '#9CA3AF', // Light gray
    white: '#FFFFFF',
  },
  background: {
    primary: '#FEF7ED', // Warm cream
    secondary: '#FDF2F8', // Warm pink tint
    tertiary: '#FEF3C7', // Warm yellow tint
  },
  border: '#FDE68A', // Warm yellow border
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red
  status: {
    pending: '#F59E0B',
    confirmed: '#10B981',
    in_progress: '#F97316',
    completed: '#059669',
    cancelled: '#EF4444',
  },
  gradient: {
    start: '#FEF7ED',
    end: '#FDF2F8',
  },
};

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onPress,
  showLocation = true,
}) => {
  const [realTimeLocation, setRealTimeLocation] = useState<RealTimeLocation | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [estimatedArrival, setEstimatedArrival] = useState<number | null>(null);
  const { getRealTimeLocation, startLocationTracking } = useBookingStore();

  useEffect(() => {
    if (showLocation && booking.currentStatus === 'confirmed' || booking.currentStatus === 'in_progress') {
      // Start tracking location for this artisan
      startLocationTracking(booking.artisanId);
      
      // Get initial location
      const location = getRealTimeLocation(booking.artisanId);
      if (location) {
        setRealTimeLocation(location);
        updateLocationInfo(location);
      }

      // Set up interval to check for location updates
      const interval = setInterval(() => {
        const updatedLocation = getRealTimeLocation(booking.artisanId);
        if (updatedLocation && updatedLocation !== realTimeLocation) {
          setRealTimeLocation(updatedLocation);
          updateLocationInfo(updatedLocation);
        }
      }, 10000); // Check every 10 seconds

      return () => clearInterval(interval);
    }
  }, [booking.artisanId, booking.currentStatus, showLocation]);

  const updateLocationInfo = (location: RealTimeLocation) => {
    const distance = locationService.calculateDistance(
      location.location,
      booking.userLocation
    );
    setDistance(distance);

    const arrival = locationService.calculateEstimatedArrival(
      location.location,
      booking.userLocation
    );
    setEstimatedArrival(arrival);
  };

  const getStatusColor = (status: string) => {
    return COLORS.status[status as keyof typeof COLORS.status] || COLORS.status.pending;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(booking)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[COLORS.gradient.start, COLORS.gradient.end]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.artisanInfo}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  booking.artisanAvatar
                    ? { uri: booking.artisanAvatar }
                    : { uri: 'https://via.placeholder.com/48x48/F97316/FFFFFF?text=' + booking.artisanName.charAt(0) }
                }
                style={styles.avatar}
              />
              <View style={[styles.onlineIndicator, { backgroundColor: realTimeLocation?.isOnline ? COLORS.success : COLORS.text.tertiary }]} />
            </View>
            <View style={styles.artisanDetails}>
              <Text style={styles.artisanName}>{booking.artisanName}</Text>
              <Text style={styles.serviceName}>{booking.serviceName}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.currentStatus) }]}>
            <Text style={styles.statusText}>{getStatusText(booking.currentStatus)}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.detailText}>
              {formatDate(booking.scheduledDate)} at {formatTime(booking.scheduledTime)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="time-outline" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.detailText}>{booking.duration} minutes</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="cash-outline" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.detailText}>{formatPrice(booking.price)}</Text>
          </View>

          {booking.paymentTiming && (
            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="card-outline" size={16} color={COLORS.primary} />
              </View>
              <Text style={styles.detailText}>
                Pay {booking.paymentTiming === 'before_delivery' ? 'Before' : 'After'} Service
              </Text>
            </View>
          )}

          {booking.paymentMethod && (
            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={
                    booking.paymentMethod === 'cash' ? 'cash-outline' :
                    booking.paymentMethod === 'card' ? 'card-outline' :
                    booking.paymentMethod === 'mobile_money' ? 'phone-portrait-outline' :
                    'business-outline'
                  } 
                  size={16} 
                  color={COLORS.primary} 
                />
              </View>
              <Text style={styles.detailText}>
                {booking.paymentMethod === 'cash' ? 'Cash' :
                 booking.paymentMethod === 'card' ? 'Card' :
                 booking.paymentMethod === 'mobile_money' ? 'Mobile Money' :
                 'Bank Transfer'}
              </Text>
            </View>
          )}

          {showLocation && realTimeLocation && (booking.currentStatus === 'confirmed' || booking.currentStatus === 'in_progress') && (
            <>
              <View style={styles.locationInfo}>
                <View style={styles.iconContainer}>
                  <Ionicons name="location-outline" size={16} color={COLORS.success} />
                </View>
                <Text style={styles.locationText}>
                  {distance ? `${distance.toFixed(1)} km away` : 'Location updating...'}
                </Text>
              </View>
              
              {estimatedArrival && (
                <View style={styles.arrivalInfo}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="car-outline" size={16} color={COLORS.warning} />
                  </View>
                  <Text style={styles.arrivalText}>
                    ETA: {estimatedArrival} minutes
                  </Text>
                </View>
              )}
            </>
          )}
        </View>

        {booking.specialRequests && (
          <View style={styles.specialRequests}>
            <Text style={styles.specialRequestsLabel}>Special Requests:</Text>
            <Text style={styles.specialRequestsText}>{booking.specialRequests}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  gradient: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  artisanInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.background.primary,
  },
  artisanDetails: {
    flex: 1,
  },
  artisanName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailText: {
    fontSize: 15,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  locationText: {
    fontSize: 15,
    color: COLORS.success,
    fontWeight: '600',
  },
  arrivalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  arrivalText: {
    fontSize: 15,
    color: COLORS.warning,
    fontWeight: '600',
  },
  specialRequests: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  specialRequestsLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  specialRequestsText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default BookingCard; 