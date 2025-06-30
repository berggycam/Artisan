import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookingStore } from '../../store/bookingStore';
import { Booking } from '../../types/booking';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

interface ServiceRequestScreenProps {
  navigation: any;
  route: any;
}

interface ServiceRequestParams {
  service: {
    name: string;
    icon: string;
    urgent: boolean;
  };
}

const ServiceRequestScreen: React.FC<ServiceRequestScreenProps> = ({ navigation, route }) => {
  const { service } = route.params as ServiceRequestParams;
  const { addBooking } = useBookingStore();
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();
  
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'emergency'>(
    service.urgent ? 'urgent' : 'normal'
  );
  const [budget, setBudget] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Sample artisans for the service
  const availableArtisans = [
    {
      id: 'artisan1',
      name: 'Kwame Asante',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviews: 127,
      distance: '2.3 km',
      price: '₵50-₵150',
      isAvailable: true,
    },
    {
      id: 'artisan2',
      name: 'Akosua Mensah',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviews: 89,
      distance: '1.8 km',
      price: '₵60-₵180',
      isAvailable: true,
    },
    {
      id: 'artisan3',
      name: 'Kofi Addo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      reviews: 203,
      distance: '3.1 km',
      price: '₵45-₵120',
      isAvailable: false,
    },
  ];

  const handleSubmitRequest = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a description of the service needed');
      return;
    }

    if (!location.trim()) {
      Alert.alert('Error', 'Please provide your location');
      return;
    }

    if (!contactPhone.trim()) {
      Alert.alert('Error', 'Please provide your contact phone number');
      return;
    }

    try {
      setSubmitting(true);

      // Create a service request (this would typically go to a different endpoint)
      const serviceRequest = {
        id: Date.now().toString(),
        serviceName: service.name,
        description: description.trim(),
        location: location.trim(),
        urgency,
        budget: budget.trim() || 'Not specified',
        contactPhone: contactPhone.trim(),
        status: 'pending',
        createdAt: new Date(),
        availableArtisans: availableArtisans.filter(a => a.isAvailable),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Request Submitted!',
        `Your ${service.name} request has been submitted. We'll notify available artisans and get back to you soon.`,
        [
          {
            text: 'View Requests',
            onPress: () => navigation.navigate('Booking', { bookingId: 'new' }),
          },
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error submitting service request:', error);
      Alert.alert('Error', 'Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectArtisan = (artisan: any) => {
    if (!artisan.isAvailable) {
      Alert.alert('Unavailable', 'This artisan is currently unavailable');
      return;
    }

    // Navigate to booking screen with selected artisan
    navigation.navigate('Booking', { 
      bookingId: `booking_${artisan.id}_${service.name.toLowerCase().replace(' ', '_')}` 
    });
  };

  const renderUrgencyOption = (option: 'normal' | 'urgent' | 'emergency', label: string, icon: string) => (
    <TouchableOpacity
      style={[
        styles.urgencyOption,
        urgency === option && { backgroundColor: colors.primary, borderColor: colors.primary }
      ]}
      onPress={() => setUrgency(option)}
    >
      <Ionicons 
        name={icon as any} 
        size={20} 
        color={urgency === option ? colors.text.white : colors.text.secondary} 
      />
      <Text style={[
        styles.urgencyText,
        { color: colors.text.secondary },
        urgency === option && { color: colors.text.white }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderArtisanCard = (artisan: any) => (
    <TouchableOpacity
      key={artisan.id}
      style={[styles.artisanCard, !artisan.isAvailable && { opacity: 0.6 }]}
      onPress={() => handleSelectArtisan(artisan)}
      disabled={!artisan.isAvailable}
    >
      <View style={styles.artisanHeader}>
        <View style={[styles.artisanAvatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.artisanInitial}>
            {artisan.name.split(' ').map((n: string) => n[0]).join('')}
          </Text>
        </View>
        <View style={styles.artisanInfo}>
          <Text style={[styles.artisanName, { color: colors.text.primary }]}>{artisan.name}</Text>
          <View style={styles.artisanRating}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={[styles.ratingText, { color: colors.text.primary }]}>{artisan.rating}</Text>
            <Text style={[styles.reviewsText, { color: colors.text.secondary }]}>({artisan.reviews} reviews)</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.artisanDetails}>
        <View style={styles.artisanMeta}>
          <Text style={[styles.distanceText, { color: colors.text.secondary }]}>{artisan.distance}</Text>
          <Text style={[styles.priceText, { color: colors.primary }]}>{artisan.price}</Text>
        </View>
        
        {!artisan.isAvailable && (
          <View style={[styles.unavailableBadge, { backgroundColor: colors.error }]}>
            <Text style={styles.unavailableText}>Unavailable</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

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
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Service Request</Text>
            <Text style={styles.headerSubtitle}>Get help from skilled artisans</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Service Header */}
          <View style={styles.serviceHeader}>
            <View style={styles.serviceIconContainer}>
              <LinearGradient
                colors={service.urgent ? [colors.error, colors.warm] : [colors.primary, colors.bronze]}
                style={styles.serviceIconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name={service.icon as any} size={40} color={colors.text.white} />
              </LinearGradient>
            </View>

            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>
                Describe what you need and we'll connect you with the best artisans
              </Text>
            </View>
          </View>

          {/* Request Form */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Service Details</Text>
            
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Describe the service you need..."
              placeholderTextColor={colors.text.tertiary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your location..."
              placeholderTextColor={colors.text.tertiary}
              value={location}
              onChangeText={setLocation}
            />

            <Text style={styles.inputLabel}>Urgency Level</Text>
            <View style={styles.urgencyContainer}>
              {renderUrgencyOption('normal', 'Normal', 'time-outline')}
              {renderUrgencyOption('urgent', 'Urgent', 'flash-outline')}
              {renderUrgencyOption('emergency', 'Emergency', 'warning-outline')}
            </View>

            <Text style={styles.inputLabel}>Budget (Optional)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., ₵50-₵200"
              placeholderTextColor={colors.text.tertiary}
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Contact Phone</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your phone number..."
              placeholderTextColor={colors.text.tertiary}
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Available Artisans */}
          <View style={styles.artisansSection}>
            <Text style={styles.sectionTitle}>Available Artisans</Text>
            <Text style={styles.sectionSubtitle}>
              These artisans are available for your service
            </Text>
            
            {availableArtisans.map((artisan) => renderArtisanCard(artisan))}
          </View>

          {/* Submit Button */}
          <View style={styles.submitSection}>
            <TouchableOpacity
              style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
              onPress={handleSubmitRequest}
              disabled={submitting}
            >
              <LinearGradient
                colors={[colors.primary, colors.bronze]}
                style={styles.submitButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {submitting ? (
                  <Text style={styles.submitButtonText}>Submitting...</Text>
                ) : (
                  <>
                    <Ionicons name="send-outline" size={20} color={colors.text.white} />
                    <Text style={styles.submitButtonText}>Submit Request</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  serviceIconContainer: {
    marginRight: 16,
  },
  serviceIconGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  formSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 48,
    marginBottom: 16,
  },
  urgencyContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  urgencyOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  urgencyOptionActive: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  urgencyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  urgencyTextActive: {
    color: '#FFFFFF',
  },
  artisansSection: {
    marginBottom: 32,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  artisanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  artisanCardUnavailable: {
    opacity: 0.6,
  },
  artisanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  artisanAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  artisanInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  artisanInfo: {
    flex: 1,
  },
  artisanName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  artisanRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  artisanDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artisanMeta: {
    flex: 1,
  },
  distanceText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F97316',
  },
  unavailableBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  unavailableText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  submitSection: {
    marginTop: 20,
  },
  submitButton: {
    borderRadius: 16,
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
});

export default ServiceRequestScreen; 