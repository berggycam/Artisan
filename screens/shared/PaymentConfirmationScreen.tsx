import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  primary: '#F97316',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    white: '#FFFFFF',
  },
  background: {
    primary: '#FEF7ED',
  },
  gradient: {
    start: '#F97316',
    end: '#EA580C',
  },
};

const PaymentConfirmationScreen = ({ navigation, route }) => {
  const paymentData = route.params?.paymentData;
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!paymentData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Payment data not found</Text>
      </View>
    );
  }

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      navigation.navigate('BookingSuccess', { paymentData });
    }, 2000);
  };

  const renderPaymentForm = () => {
    switch (paymentData.method) {
      case 'cash':
        return (
          <View style={styles.cashContainer}>
            <Ionicons name="cash-outline" size={48} color="#10B981" />
            <Text style={styles.cashTitle}>Cash Payment</Text>
            <Text style={styles.cashDescription}>
              No payment required now. Pay the artisan when service is completed.
            </Text>
          </View>
        );

      case 'mobile_money':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Mobile Money</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        );

      default:
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Payment Details</Text>
            <Text style={styles.formDescription}>
              Payment method: {paymentData.method}
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Confirmation</Text>
        </View>

        <View style={styles.summaryContainer}>
          <LinearGradient
            colors={[COLORS.gradient.start, COLORS.gradient.end]}
            style={styles.summaryGradient}
          >
            <Text style={styles.summaryTitle}>Payment Summary</Text>
            <Text style={styles.summaryAmount}>
              {paymentData.currency}{paymentData.amount.toFixed(2)}
            </Text>
            <Text style={styles.summaryMethod}>
              {paymentData.method === 'cash' ? 'Cash Payment' : 'Online Payment'}
            </Text>
          </LinearGradient>
        </View>

        {renderPaymentForm()}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.confirmButton, isProcessing && styles.confirmButtonDisabled]}
            onPress={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color={COLORS.text.white} />
            ) : (
              <>
                <Text style={styles.confirmButtonText}>
                  {paymentData.method === 'cash' ? 'Confirm Booking' : 'Confirm Payment'}
                </Text>
                <Ionicons name="checkmark" size={20} color={COLORS.text.white} />
              </>
            )}
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
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  summaryContainer: {
    padding: 20,
  },
  summaryGradient: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    color: COLORS.text.white,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.white,
    marginBottom: 8,
  },
  summaryMethod: {
    fontSize: 16,
    color: COLORS.text.white,
    opacity: 0.9,
  },
  cashContainer: {
    padding: 20,
    alignItems: 'center',
  },
  cashTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  cashDescription: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  formDescription: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonContainer: {
    padding: 20,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  confirmButtonDisabled: {
    opacity: 0.7,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.white,
  },
});

export default PaymentConfirmationScreen; 