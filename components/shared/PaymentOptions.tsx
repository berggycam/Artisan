import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface PaymentOptionsProps {
  selectedPaymentTiming: 'before_delivery' | 'after_delivery';
  selectedPaymentMethod: 'cash' | 'card' | 'mobile_money' | 'bank_transfer';
  onPaymentTimingChange: (timing: 'before_delivery' | 'after_delivery') => void;
  onPaymentMethodChange: (method: 'cash' | 'card' | 'mobile_money' | 'bank_transfer') => void;
  price: number;
  currency?: string;
  onConfirmPayment?: () => void;
  onNextStep?: (paymentData: PaymentData) => void;
  isLoading?: boolean;
}

interface PaymentData {
  timing: 'before_delivery' | 'after_delivery';
  method: 'cash' | 'card' | 'mobile_money' | 'bank_transfer';
  amount: number;
  currency: string;
}

const COLORS = {
  primary: '#F97316',
  primaryLight: '#FB923C',
  primaryDark: '#EA580C',
  secondary: '#F59E0B',
  accent: '#EF4444',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    white: '#FFFFFF',
  },
  background: {
    primary: '#FEF7ED',
    secondary: '#FDF2F8',
    tertiary: '#FEF3C7',
  },
  border: '#FDE68A',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  white: '#FFFFFF',
  gradient: {
    start: '#F97316',
    end: '#EA580C',
  },
};

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  selectedPaymentTiming,
  selectedPaymentMethod,
  onPaymentTimingChange,
  onPaymentMethodChange,
  price,
  currency = '$',
  onConfirmPayment,
  onNextStep,
  isLoading = false,
}) => {
  const paymentTimingOptions = [
    {
      id: 'before_delivery',
      title: 'Pay Before Service',
      subtitle: 'Pay now to secure your booking',
      icon: 'card-outline',
      description: 'Payment is processed immediately when booking is confirmed',
      benefits: ['Secure booking', 'No payment worries', 'Faster service start'],
    },
    {
      id: 'after_delivery',
      title: 'Pay After Service',
      subtitle: 'Pay when work is completed',
      icon: 'time-outline',
      description: 'Payment is due after the service is completed and you\'re satisfied',
      benefits: ['Pay only when satisfied', 'No upfront payment', 'Service quality guarantee'],
    },
  ];

  const paymentMethodOptions = [
    {
      id: 'cash',
      title: 'Cash',
      icon: 'cash-outline',
      description: 'Pay with cash on site',
      available: true,
    },
    {
      id: 'card',
      title: 'Card',
      icon: 'card-outline',
      description: 'Credit or debit card',
      available: true,
    },
    {
      id: 'mobile_money',
      title: 'Mobile Money',
      icon: 'phone-portrait-outline',
      description: 'Mobile money transfer (MTN, Vodafone, AirtelTigo)',
      available: true,
    },
    {
      id: 'bank_transfer',
      title: 'Bank Transfer',
      icon: 'business-outline',
      description: 'Direct bank transfer',
      available: true,
    },
  ];

  const handlePaymentMethodChange = (method: any) => {
    if (!paymentMethodOptions.find(option => option.id === method)?.available) {
      Alert.alert(
        'Payment Method Unavailable',
        'This payment method is currently not available. Please select another option.',
        [{ text: 'OK' }]
      );
      return;
    }
    onPaymentMethodChange(method);
  };

  const handleConfirmPayment = () => {
    if (onConfirmPayment) {
      onConfirmPayment();
    } else {
      Alert.alert(
        'Payment Confirmation',
        `Confirm payment of ${currency}${price.toFixed(2)} via ${paymentMethodOptions.find(m => m.id === selectedPaymentMethod)?.title}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Confirm', onPress: () => console.log('Payment confirmed') }
        ]
      );
    }
  };

  const handleNextStep = () => {
    const paymentData: PaymentData = {
      timing: selectedPaymentTiming,
      method: selectedPaymentMethod,
      amount: price,
      currency: currency,
    };

    if (onNextStep) {
      onNextStep(paymentData);
    } else {
      Alert.alert(
        'Continue to Payment',
        `Proceed with ${selectedPaymentTiming === 'before_delivery' ? 'immediate' : 'deferred'} payment via ${paymentMethodOptions.find(m => m.id === selectedPaymentMethod)?.title}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue', onPress: () => console.log('Proceeding to payment:', paymentData) }
        ]
      );
    }
  };

  const renderPaymentTimingOption = (option: any) => {
    const isSelected = selectedPaymentTiming === option.id;
    
    return (
      <TouchableOpacity
        key={option.id}
        style={[styles.timingOption, isSelected && styles.timingOptionSelected]}
        onPress={() => onPaymentTimingChange(option.id)}
        activeOpacity={0.8}
      >
        <View style={styles.timingHeader}>
          <View style={[styles.timingIconContainer, isSelected && styles.timingIconContainerSelected]}>
            <Ionicons
              name={option.icon as any}
              size={24}
              color={isSelected ? COLORS.white : COLORS.primary}
            />
          </View>
          <View style={styles.timingTextContainer}>
            <Text style={[styles.timingTitle, isSelected && styles.timingTitleSelected]}>
              {option.title}
            </Text>
            <Text style={[styles.timingSubtitle, isSelected && styles.timingSubtitleSelected]}>
              {option.subtitle}
            </Text>
          </View>
          <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
            {isSelected && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </View>
        
        <Text style={[styles.timingDescription, isSelected && styles.timingDescriptionSelected]}>
          {option.description}
        </Text>
        
        <View style={styles.benefitsContainer}>
          {option.benefits.map((benefit: string, index: number) => (
            <View key={index} style={styles.benefitItem}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={isSelected ? COLORS.white : COLORS.success}
              />
              <Text style={[styles.benefitText, isSelected && styles.benefitTextSelected]}>
                {benefit}
              </Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  const renderPaymentMethodOption = (option: any) => {
    const isSelected = selectedPaymentMethod === option.id;
    const isAvailable = option.available;
    
    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.methodOption, 
          isSelected && styles.methodOptionSelected,
          !isAvailable && styles.methodOptionDisabled
        ]}
        onPress={() => isAvailable && handlePaymentMethodChange(option.id)}
        activeOpacity={isAvailable ? 0.8 : 1}
        disabled={!isAvailable}
      >
        <View style={[styles.methodIconContainer, !isAvailable && styles.methodIconContainerDisabled]}>
          <Ionicons
            name={option.icon as any}
            size={20}
            color={isSelected ? COLORS.white : isAvailable ? COLORS.primary : COLORS.text.tertiary}
          />
        </View>
        <View style={styles.methodTextContainer}>
          <Text style={[
            styles.methodTitle, 
            isSelected && styles.methodTitleSelected,
            !isAvailable && styles.methodTitleDisabled
          ]}>
            {option.title}
            {!isAvailable && ' (Coming Soon)'}
          </Text>
          <Text style={[
            styles.methodDescription, 
            isSelected && styles.methodDescriptionSelected,
            !isAvailable && styles.methodDescriptionDisabled
          ]}>
            {option.description}
          </Text>
        </View>
        <View style={[styles.radioButton, isSelected && styles.radioButtonSelected, !isAvailable && styles.radioButtonDisabled]}>
          {isSelected && isAvailable && (
            <View style={styles.radioButtonInner} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payment Options</Text>
        <Text style={styles.headerSubtitle}>
          Choose how and when you'd like to pay
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Timing</Text>
        <Text style={styles.sectionSubtitle}>
          When would you like to make the payment?
        </Text>
        
        <View style={styles.timingOptionsContainer}>
          {paymentTimingOptions.map(renderPaymentTimingOption)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Text style={styles.sectionSubtitle}>
          How would you like to pay?
        </Text>
        
        <View style={styles.methodOptionsContainer}>
          {paymentMethodOptions.map(renderPaymentMethodOption)}
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <LinearGradient
          colors={[COLORS.gradient.start, COLORS.gradient.end]}
          style={styles.summaryGradient}
        >
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Price:</Text>
              <Text style={styles.summaryValue}>{currency}{price.toFixed(2)}</Text>
          </View>
          
          {selectedPaymentTiming === 'before_delivery' && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Payment Due:</Text>
              <Text style={styles.summaryValue}>Now</Text>
            </View>
          )}
          
          {selectedPaymentTiming === 'after_delivery' && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Payment Due:</Text>
              <Text style={styles.summaryValue}>After Service</Text>
            </View>
          )}
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total Amount:</Text>
              <Text style={styles.summaryTotalValue}>{currency}{price.toFixed(2)}</Text>
          </View>

            {onConfirmPayment && (
              <TouchableOpacity
                style={[styles.confirmButton, isLoading && styles.confirmButtonDisabled]}
                onPress={handleConfirmPayment}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmButtonText}>
                  {isLoading ? 'Processing...' : 'Confirm Payment'}
                </Text>
                {!isLoading && (
                  <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            )}
        </LinearGradient>
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={[styles.nextButton, isLoading && styles.nextButtonDisabled]}
          onPress={handleNextStep}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {isLoading ? 'Processing...' : 'Continue to Payment'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 16,
  },
  timingOptionsContainer: {
    gap: 12,
  },
  timingOption: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  timingOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  timingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timingIconContainerSelected: {
    backgroundColor: COLORS.primaryLight,
  },
  timingTextContainer: {
    flex: 1,
  },
  timingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  timingTitleSelected: {
    color: COLORS.white,
  },
  timingSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  timingSubtitleSelected: {
    color: COLORS.white,
  },
  timingDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  timingDescriptionSelected: {
    color: COLORS.white,
  },
  benefitsContainer: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 13,
    color: COLORS.text.secondary,
    marginLeft: 8,
  },
  benefitTextSelected: {
    color: COLORS.white,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: COLORS.white,
  },
  radioButtonDisabled: {
    borderColor: COLORS.text.tertiary,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  methodOptionsContainer: {
    gap: 8,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  methodOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  methodOptionDisabled: {
    opacity: 0.6,
    borderColor: COLORS.text.tertiary,
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodIconContainerDisabled: {
    backgroundColor: COLORS.background.secondary,
  },
  methodTextContainer: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  methodTitleSelected: {
    color: COLORS.white,
  },
  methodTitleDisabled: {
    color: COLORS.text.tertiary,
  },
  methodDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  methodDescriptionSelected: {
    color: COLORS.white,
  },
  methodDescriptionDisabled: {
    color: COLORS.text.tertiary,
  },
  summaryContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },
  summaryGradient: {
    borderRadius: 16,
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.white,
    opacity: 0.2,
    marginVertical: 12,
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    gap: 8,
  },
  confirmButtonDisabled: {
    opacity: 0.7,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  nextButtonContainer: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: COLORS.background.primary,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  nextButtonDisabled: {
    opacity: 0.7,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default PaymentOptions; 