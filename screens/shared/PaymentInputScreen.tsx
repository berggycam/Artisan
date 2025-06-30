import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
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
  success: '#10B981',
  error: '#EF4444',
};

const PaymentInputScreen = ({ navigation, route }) => {
  const paymentData = route.params?.paymentData;
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form states for different payment methods
  const [mobileMoneyData, setMobileMoneyData] = useState({
    phoneNumber: '',
    provider: 'MTN',
  });
  
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [bankData, setBankData] = useState({
    accountNumber: '',
    accountName: '',
    bankName: '',
  });

  if (!paymentData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Payment data not found</Text>
      </SafeAreaView>
    );
  }

  const handleConfirmPayment = async () => {
    // Validate form data based on payment method
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigation.navigate('BookingSuccess', { paymentData });
    }, 2000);
  };

  const validateForm = () => {
    switch (paymentData.method) {
      case 'mobile_money':
        if (!mobileMoneyData.phoneNumber) {
          Alert.alert('Error', 'Please enter your phone number');
          return false;
        }
        if (mobileMoneyData.phoneNumber.length < 10) {
          Alert.alert('Error', 'Please enter a valid phone number');
          return false;
        }
        break;
        
      case 'card':
        if (!cardData.cardNumber || !cardData.cardHolder || !cardData.expiryDate || !cardData.cvv) {
          Alert.alert('Error', 'Please fill in all card details');
          return false;
        }
        if (cardData.cardNumber.length < 16) {
          Alert.alert('Error', 'Please enter a valid card number');
          return false;
        }
        if (cardData.cvv.length < 3) {
          Alert.alert('Error', 'Please enter a valid CVV');
          return false;
        }
        break;
        
      case 'bank_transfer':
        if (!bankData.accountNumber || !bankData.accountName || !bankData.bankName) {
          Alert.alert('Error', 'Please fill in all bank details');
          return false;
        }
        break;
    }
    return true;
  };

  const renderMobileMoneyForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Mobile Money Details</Text>
      <Text style={styles.formSubtitle}>Enter your mobile money information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., +233 24 123 4567"
          value={mobileMoneyData.phoneNumber}
          onChangeText={(text) => setMobileMoneyData({...mobileMoneyData, phoneNumber: text})}
          keyboardType="phone-pad"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Mobile Money Provider</Text>
        <View style={styles.providerContainer}>
          {['MTN', 'Vodafone', 'AirtelTigo'].map((provider) => (
            <TouchableOpacity
              key={provider}
              style={[
                styles.providerOption,
                mobileMoneyData.provider === provider && styles.providerOptionSelected
              ]}
              onPress={() => setMobileMoneyData({...mobileMoneyData, provider})}
            >
              <Text style={[
                styles.providerText,
                mobileMoneyData.provider === provider && styles.providerTextSelected
              ]}>
                {provider}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color={COLORS.primary} />
        <Text style={styles.infoText}>
          You will receive a payment prompt on your phone. Please follow the instructions to complete the payment.
        </Text>
      </View>
    </View>
  );

  const renderCardForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Card Details</Text>
      <Text style={styles.formSubtitle}>Enter your card information securely</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          value={cardData.cardNumber}
          onChangeText={(text) => setCardData({...cardData, cardNumber: text})}
          keyboardType="numeric"
          maxLength={19}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Cardholder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={cardData.cardHolder}
          onChangeText={(text) => setCardData({...cardData, cardHolder: text})}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.cardRow}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={cardData.expiryDate}
            onChangeText={(text) => setCardData({...cardData, expiryDate: text})}
            maxLength={5}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="123"
            value={cardData.cvv}
            onChangeText={(text) => setCardData({...cardData, cvv: text})}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="shield-checkmark" size={20} color={COLORS.success} />
        <Text style={styles.infoText}>
          Your card information is encrypted and secure. We never store your card details.
        </Text>
      </View>
    </View>
  );

  const renderBankTransferForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Bank Transfer Details</Text>
      <Text style={styles.formSubtitle}>Enter your bank account information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Ghana Commercial Bank"
          value={bankData.bankName}
          onChangeText={(text) => setBankData({...bankData, bankName: text})}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your account number"
          value={bankData.accountNumber}
          onChangeText={(text) => setBankData({...bankData, accountNumber: text})}
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Account Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Account holder name"
          value={bankData.accountName}
          onChangeText={(text) => setBankData({...bankData, accountName: text})}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color={COLORS.primary} />
        <Text style={styles.infoText}>
          You will receive transfer instructions via SMS. Please follow the steps to complete the payment.
        </Text>
      </View>
    </View>
  );

  const renderCashForm = () => (
    <View style={styles.cashContainer}>
      <View style={styles.cashIconContainer}>
        <Ionicons name="cash-outline" size={64} color={COLORS.success} />
      </View>
      <Text style={styles.cashTitle}>Cash Payment</Text>
      <Text style={styles.cashDescription}>
        No payment required at this time. You will pay the artisan directly when the service is completed.
      </Text>
      
      <View style={styles.cashInstructions}>
        <Text style={styles.instructionTitle}>What happens next?</Text>
        <View style={styles.instructionItem}>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
          <Text style={styles.instructionText}>Your booking will be confirmed immediately</Text>
        </View>
        <View style={styles.instructionItem}>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
          <Text style={styles.instructionText}>The artisan will contact you to schedule the service</Text>
        </View>
        <View style={styles.instructionItem}>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
          <Text style={styles.instructionText}>Pay the artisan in cash when the work is done</Text>
        </View>
      </View>
    </View>
  );

  const renderPaymentForm = () => {
    switch (paymentData.method) {
      case 'cash':
        return renderCashForm();
      case 'mobile_money':
        return renderMobileMoneyForm();
      case 'card':
        return renderCardForm();
      case 'bank_transfer':
        return renderBankTransferForm();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Details</Text>
        </View>

        {/* Payment Summary */}
        <View style={styles.summaryContainer}>
          <LinearGradient
            colors={[COLORS.gradient.start, COLORS.gradient.end]}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryHeader}>
              <Ionicons 
                name={
                  paymentData.method === 'cash' ? 'cash-outline' :
                  paymentData.method === 'card' ? 'card-outline' :
                  paymentData.method === 'mobile_money' ? 'phone-portrait-outline' :
                  'business-outline'
                } 
                size={24} 
                color={COLORS.text.white} 
              />
              <Text style={styles.summaryTitle}>
                {paymentData.method === 'cash' ? 'Cash Payment' :
                 paymentData.method === 'card' ? 'Card Payment' :
                 paymentData.method === 'mobile_money' ? 'Mobile Money' :
                 'Bank Transfer'}
              </Text>
            </View>
            
            <Text style={styles.summaryAmount}>
              {paymentData.currency}{paymentData.amount.toFixed(2)}
            </Text>
            
            <Text style={styles.summaryTiming}>
              {paymentData.timing === 'before_delivery' ? 'Pay Now' : 'Pay After Service'}
            </Text>
          </LinearGradient>
        </View>

        {/* Payment Form */}
        {renderPaymentForm()}
      </ScrollView>

      {/* Confirm Button */}
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
    </SafeAreaView>
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
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.white,
    marginLeft: 8,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.white,
    marginBottom: 8,
  },
  summaryTiming: {
    fontSize: 16,
    color: COLORS.text.white,
    opacity: 0.9,
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardRow: {
    flexDirection: 'row',
  },
  providerContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  providerOption: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  providerOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  providerText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  providerTextSelected: {
    color: COLORS.text.white,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  cashContainer: {
    padding: 20,
    alignItems: 'center',
  },
  cashIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cashTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  cashDescription: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  cashInstructions: {
    width: '100%',
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginLeft: 8,
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: COLORS.background.primary,
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

export default PaymentInputScreen; 