import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import PaymentOptions from '../../components/shared/PaymentOptions';

const COLORS = {
  primary: '#F97316',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
  },
  background: {
    primary: '#FEF7ED',
  },
};

const PaymentDemoScreen = ({ navigation }) => {
  const [selectedPaymentTiming, setSelectedPaymentTiming] = useState<'before_delivery' | 'after_delivery'>('before_delivery');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash' | 'card' | 'mobile_money' | 'bank_transfer'>('cash');
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = (paymentData) => {
    console.log('Payment data:', paymentData);
    
    // Navigate to payment input screen for detailed form
    navigation.navigate('PaymentInput', { paymentData });
  };

  const handleConfirmPayment = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      const paymentData = {
        timing: selectedPaymentTiming,
        method: selectedPaymentMethod,
        amount: 150.00,
        currency: '₵',
      };
      navigation.navigate('BookingSuccess', { paymentData });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payment Demo</Text>
        <Text style={styles.headerSubtitle}>
          Select your payment options and click "Continue to Payment"
        </Text>
      </View>

      <PaymentOptions
        selectedPaymentTiming={selectedPaymentTiming}
        selectedPaymentMethod={selectedPaymentMethod}
        onPaymentTimingChange={setSelectedPaymentTiming}
        onPaymentMethodChange={setSelectedPaymentMethod}
        price={150.00}
        currency="₵"
        onNextStep={handleNextStep}
        onConfirmPayment={handleConfirmPayment}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
});

export default PaymentDemoScreen; 