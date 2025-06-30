import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type BookingSuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookingSuccess'>;
type BookingSuccessScreenRouteProp = RouteProp<RootStackParamList, 'BookingSuccess'>;

interface BookingSuccessScreenProps {
  navigation: BookingSuccessScreenNavigationProp;
  route: BookingSuccessScreenRouteProp;
}

const COLORS = {
  primary: '#F97316',
  success: '#10B981',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    white: '#FFFFFF',
  },
  background: {
    primary: '#FEF7ED',
  },
  gradient: {
    start: '#10B981',
    end: '#059669',
  },
};

const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({ navigation, route }) => {
  const paymentData = route.params?.paymentData;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.successHeader}>
          <LinearGradient
            colors={[COLORS.gradient.start, COLORS.gradient.end]}
            style={styles.successGradient}
          >
            <Ionicons name="checkmark-circle" size={64} color={COLORS.white} />
            <Text style={styles.successTitle}>
              {paymentData?.method === 'cash' ? 'Booking Confirmed!' : 'Payment Successful!'}
            </Text>
            <Text style={styles.successMessage}>
              {paymentData?.method === 'cash' 
                ? 'Your service has been scheduled successfully.'
                : `Payment of ${paymentData?.currency}${paymentData?.amount.toFixed(2)} processed.`
              }
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Booking Details</Text>
          <View style={styles.detailCard}>
            <Text style={styles.detailText}>
              Payment Method: {paymentData?.method === 'cash' ? 'Cash' : 'Online Payment'}
            </Text>
            <Text style={styles.detailText}>
              Amount: {paymentData?.currency}{paymentData?.amount.toFixed(2)}
            </Text>
            <Text style={styles.detailText}>
              Date: {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Text style={styles.primaryButtonText}>Go to Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('MainTabs', { initialRoute: 'Bookings' })}
          >
            <Text style={styles.secondaryButtonText}>View Bookings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
  successHeader: {
    padding: 20,
  },
  successGradient: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 16,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
  detailsContainer: {
    padding: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default BookingSuccessScreen; 