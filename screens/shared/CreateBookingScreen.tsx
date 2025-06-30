import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Artisan, ArtisanService } from '../../types/artisan';
import { Booking } from '../../types/booking';
import { useTheme } from '../../context/ThemeContext';
import PaymentOptions from '../../components/shared/PaymentOptions';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useBookingStore } from '../../store/bookingStore';

type CreateBookingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Booking'>;
type CreateBookingScreenRouteProp = RouteProp<RootStackParamList, 'Booking'>;

const { width, height } = Dimensions.get('window');

const CreateBookingScreen: React.FC = () => {
  const { currentTheme } = useTheme();
  const navigation = useNavigation<CreateBookingScreenNavigationProp>();
  const route = useRoute<CreateBookingScreenRouteProp>();
  const { bookingId } = route.params;

  // Extract artisan and service info from bookingId (format: booking_artisanId_serviceId)
  // If bookingId is 'new', use default values
  const [artisanId, serviceId] = bookingId === 'new' 
    ? ['artisan1', 'service1'] 
    : bookingId.replace('booking_', '').split('_');
  
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [selectedService, setSelectedService] = useState<ArtisanService | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Booking form state
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date());
  const [scheduledTime, setScheduledTime] = useState<string>('10:00');
  const [description, setDescription] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [userLocation, setUserLocation] = useState({
    latitude: 40.7589,
    longitude: -73.9851,
    address: 'New York, NY',
  });
  
  // Payment options
  const [paymentTiming, setPaymentTiming] = useState<'before_delivery' | 'after_delivery'>('after_delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'mobile_money' | 'bank_transfer'>('cash');
  
  const { addBooking } = useBookingStore();

  const handleNextStep = (paymentData: any) => {
    console.log('Payment data from CreateBookingScreen:', paymentData);
    
    // Navigate to payment input screen for detailed form
    navigation.navigate('PaymentInput', { 
      paymentData,
      bookingData: {
        artisanId: artisan?.id,
        serviceId: selectedService?.id,
        serviceName: selectedService?.name,
        artisanName: artisan?.name,
        scheduledDate,
        scheduledTime,
        description,
        specialRequests,
        price: selectedService?.price,
      }
    });
  };

  useEffect(() => {
    // Load artisan and service data
    loadArtisanAndService();
  }, [artisanId, serviceId]);

  const loadArtisanAndService = async () => {
    try {
      setLoading(true);
      
      // Mock API call - replace with actual API
      setTimeout(() => {
        const mockArtisan: Artisan = {
          id: artisanId,
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '+1234567890',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          bio: 'Experienced carpenter with over 10 years of expertise in custom furniture making, home renovations, and woodworking projects.',
          location: {
            latitude: 40.7128,
            longitude: -74.0060,
            address: 'New York, NY',
          },
          currentLocation: {
            latitude: 40.7128,
            longitude: -74.0060,
            address: 'New York, NY',
          },
          isOnline: true,
          lastSeen: new Date(),
          services: [
            {
              id: 'service1',
              name: 'Custom Furniture Making',
              description: 'Handcrafted wooden furniture tailored to your specifications',
              price: 150,
              duration: 480,
              category: 'Carpentry',
              isAvailable: true,
            },
            {
              id: 'service2',
              name: 'Home Renovation',
              description: 'Complete home renovation and remodeling services',
              price: 200,
              duration: 600,
              category: 'Construction',
              isAvailable: true,
            },
            {
              id: 'service3',
              name: 'Deck Building',
              description: 'Custom deck design and construction',
              price: 120,
              duration: 360,
              category: 'Outdoor',
              isAvailable: false,
            },
          ],
          rating: 4.8,
          totalReviews: 127,
          reviews: [],
          experience: 12,
          certifications: ['Certified Carpenter', 'Safety Training', 'Green Building'],
          languages: ['English', 'Spanish'],
          availability: {
            monday: { start: '08:00', end: '18:00', available: true },
            tuesday: { start: '08:00', end: '18:00', available: true },
            wednesday: { start: '08:00', end: '18:00', available: true },
            thursday: { start: '08:00', end: '18:00', available: true },
            friday: { start: '08:00', end: '18:00', available: true },
            saturday: { start: '09:00', end: '16:00', available: true },
            sunday: { start: '10:00', end: '14:00', available: false },
          },
          portfolio: [],
          isVerified: true,
          isBlocked: false,
          createdAt: new Date('2020-01-01'),
          updatedAt: new Date(),
        };
        
        setArtisan(mockArtisan);
        
        // Find the selected service
        const service = mockArtisan.services.find(s => s.id === serviceId);
        if (service) {
          setSelectedService(service);
        } else {
          Alert.alert('Error', 'Service not found');
          navigation.goBack();
        }
        
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading artisan and service:', error);
      Alert.alert('Error', 'Failed to load service information');
      navigation.goBack();
    }
  };

  const handleCreateBooking = async () => {
    if (!artisan || !selectedService) {
      Alert.alert('Error', 'Missing service information');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a description of the work needed');
      return;
    }

    try {
      setSubmitting(true);

      // Create booking object
      const booking: Booking = {
        id: Date.now().toString(),
        userId: 'user1', // Replace with actual user ID
        artisanId: artisan.id,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        artisanName: artisan.name,
        artisanAvatar: artisan.avatar,
        artisanLocation: artisan.location,
        userLocation,
        scheduledDate,
        scheduledTime,
        duration: selectedService.duration,
        price: selectedService.price,
        status: [
          {
            id: '1',
            status: 'pending',
            timestamp: new Date(),
            message: 'Booking request sent',
          },
        ],
        currentStatus: 'pending',
        description: description.trim(),
        specialRequests: specialRequests.trim() || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        paymentStatus: 'pending',
        paymentMethod,
        paymentTiming,
      };

      // Add to store
      addBooking(booking);

      // Show success message
      Alert.alert(
        'Booking Created',
        'Your booking request has been sent to the artisan. You will be notified when they respond.',
        [
          {
            text: 'View Bookings',
            onPress: () => navigation.navigate('Booking', { bookingId: 'new' }),
          },
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error creating booking:', error);
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading service information...</Text>
      </View>
    );
  }

  if (!artisan || !selectedService) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Service not found</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={currentTheme.colors.background} />
      <LinearGradient
        colors={[currentTheme.colors.background, currentTheme.colors.surface]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Create Booking</Text>
              <Text style={styles.headerSubtitle}>Schedule your service</Text>
            </View>
          </View>

          {/* Service Summary */}
          <View style={styles.serviceSummary}>
            <View style={styles.artisanInfo}>
              <View style={styles.artisanAvatar}>
                <Ionicons name="person" size={24} color={currentTheme.colors.primary} />
              </View>
              <View style={styles.artisanDetails}>
                <Text style={styles.artisanName}>{artisan?.name}</Text>
                <Text style={styles.artisanRating}>⭐ {artisan?.rating} ({artisan?.totalReviews} reviews)</Text>
              </View>
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{selectedService?.name}</Text>
              <Text style={styles.serviceDescription}>{selectedService?.description}</Text>
              <View style={styles.serviceMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={16} color={currentTheme.colors.textSecondary} />
                  <Text style={styles.metaText}>{selectedService?.duration} min</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="pricetag-outline" size={16} color={currentTheme.colors.textSecondary} />
                  <Text style={styles.metaText}>{formatPrice(selectedService?.price || 0)}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Booking Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Details</Text>
            
            <Text style={styles.inputLabel}>Date</Text>
            <TouchableOpacity style={styles.dateInput}>
              <Ionicons name="calendar-outline" size={20} color={currentTheme.colors.primary} />
              <Text style={styles.dateText}>{formatDate(scheduledDate)}</Text>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Time</Text>
            <TouchableOpacity style={styles.timeInput}>
              <Ionicons name="time-outline" size={20} color={currentTheme.colors.primary} />
              <Text style={styles.timeText}>{scheduledTime}</Text>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Describe the work you need..."
              placeholderTextColor={currentTheme.colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <Text style={styles.inputLabel}>Special Requests (Optional)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Any special requirements or notes..."
              placeholderTextColor={currentTheme.colors.textSecondary}
              value={specialRequests}
              onChangeText={setSpecialRequests}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Payment Options */}
          <PaymentOptions
            paymentTiming={paymentTiming}
            paymentMethod={paymentMethod}
            onPaymentTimingChange={setPaymentTiming}
            onPaymentMethodChange={setPaymentMethod}
            onNextStep={handleNextStep}
          />

          {/* Summary */}
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service</Text>
              <Text style={styles.summaryValue}>{selectedService?.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date & Time</Text>
              <Text style={styles.summaryValue}>{formatDate(scheduledDate)} at {scheduledTime}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>{formatPrice(selectedService?.price || 0)}</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: currentTheme.colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: currentTheme.colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: currentTheme.colors.background,
  },
  errorText: {
    fontSize: 16,
    color: currentTheme.colors.error,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: currentTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: currentTheme.colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: currentTheme.colors.textSecondary,
    fontWeight: '500',
  },
  serviceSummary: {
    backgroundColor: currentTheme.colors.surface,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  artisanInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  artisanAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: currentTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  artisanDetails: {
    flex: 1,
  },
  artisanName: {
    fontSize: 18,
    fontWeight: '600',
    color: currentTheme.colors.text,
    marginBottom: 4,
  },
  artisanRating: {
    fontSize: 14,
    color: currentTheme.colors.textSecondary,
  },
  serviceInfo: {
    borderTopWidth: 1,
    borderTopColor: currentTheme.colors.border,
    paddingTop: 16,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: '700',
    color: currentTheme.colors.text,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: currentTheme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  serviceMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: currentTheme.colors.textSecondary,
    marginLeft: 4,
  },
  section: {
    backgroundColor: currentTheme.colors.background,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: currentTheme.colors.text,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: currentTheme.colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: currentTheme.colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: currentTheme.colors.border,
  },
  dateText: {
    fontSize: 16,
    color: currentTheme.colors.text,
    marginLeft: 12,
    fontWeight: '500',
  },
  timeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: currentTheme.colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: currentTheme.colors.border,
  },
  timeText: {
    fontSize: 16,
    color: currentTheme.colors.text,
    marginLeft: 12,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: currentTheme.colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: currentTheme.colors.border,
    fontSize: 16,
    color: currentTheme.colors.text,
    minHeight: 80,
  },
  summarySection: {
    backgroundColor: currentTheme.colors.background,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: currentTheme.colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: currentTheme.colors.text,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: currentTheme.colors.border,
    marginVertical: 16,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: currentTheme.colors.text,
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: currentTheme.colors.primary,
  },
});

export default CreateBookingScreen; 