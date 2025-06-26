import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Svg, { 
  Circle, 
  Path, 
  Defs, 
  RadialGradient, 
  Stop, 
  G,
  Rect
} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

type AuthStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

// Artisan-themed register illustration
const RegisterIllustration = () => {
  return (
    <Svg width={180} height={180} viewBox="0 0 180 180">
      <Defs>
        <RadialGradient id="registerGrad" cx="50%" cy="50%">
          <Stop offset="0%" stopColor="#FFE5B4" />
          <Stop offset="100%" stopColor="#DEB887" />
        </RadialGradient>
      </Defs>
      {/* Background circle */}
      <Circle cx={90} cy={90} r={70} fill="url(#registerGrad)" opacity={0.3} />
      {/* Artisan workshop scene */}
      <G transform="translate(90, 90)">
        {/* Workshop table */}
        <Path d="M-45,30 L45,30 L45,40 L-45,40 Z" fill="#8B4513" />
        <Path d="M-40,40 L-35,55 L-30,55 L-30,40 Z" fill="#CD853F" />
        <Path d="M30,40 L35,55 L40,55 L40,40 Z" fill="#CD853F" />
        
        {/* Artisan figure */}
        <Circle cx={0} cy={-10} r={12} fill="#DEB887" />
        <Path d="M-8,2 L8,2 L8,25 L-8,25 Z" fill="#F4A460" />
        <Path d="M-6,2 L6,2 L6,15 L-6,15 Z" fill="#CD853F" />
        
        {/* Tools on table */}
        <Path d="M-25,25 L-15,25 L-15,35 L-25,35 Z" fill="#B8860B" />
        <Circle cx={20} cy={30} r={4} fill="#DEB887" />
        <Path d="M15,25 L25,25 L25,28 L15,28 Z" fill="#8B4513" />
        
        {/* Craft items */}
        <Circle cx={-10} cy={25} r={3} fill="#F4A460" />
        <Path d="M5,22 L10,22 L12,27 L3,27 Z" fill="#CD853F" />
        
        {/* Sparkles/magic */}
        <Path d="M-35,-20 L-33,-25 L-31,-20 L-33,-15 Z" fill="#FFD700" />
        <Path d="M-33,-22 L-28,-22 L-33,-18 L-38,-22 Z" fill="#FFD700" />
        <Path d="M25,-25 L27,-30 L29,-25 L27,-20 Z" fill="#FFD700" />
        <Path d="M27,-27 L32,-27 L27,-23 L22,-27 Z" fill="#FFD700" />
      </G>
    </Svg>
  );
};

const RegisterScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer' as 'customer' | 'artisan'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    
    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the Terms of Service and Privacy Policy');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(async () => {
      setIsLoading(false);
      // Save userType to AsyncStorage
      await AsyncStorage.setItem('userType', formData.userType);
      // After registration, navigate to Login. Do NOT navigate directly to dashboards.
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
      ]);
    }, 2000);
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8DC" />
      <LinearGradient
        colors={['#FFF8DC', '#FFEFD5', '#F5DEB3']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Decorative background elements */}
        <View style={styles.backgroundDecor}>
          <View style={[styles.decorCircle, styles.decorCircle1]} />
          <View style={[styles.decorCircle, styles.decorCircle2]} />
          <View style={[styles.decorCircle, styles.decorCircle3]} />
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View 
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim }
                  ]
                }
              ]}
            >
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.illustrationContainer}>
                  <RegisterIllustration />
                </View>
                <Text style={styles.welcomeText}>Join Artisan</Text>
                <Text style={styles.subtitle}>Create your account to get started</Text>
              </View>

              {/* User Type Selection */}
              <View style={styles.userTypeContainer}>
                <Text style={styles.userTypeLabel}>I want to:</Text>
                <View style={styles.userTypeButtons}>
                  <TouchableOpacity
                    style={[
                      styles.userTypeButton,
                      formData.userType === 'customer' && styles.userTypeButtonActive
                    ]}
                    onPress={() => updateFormData('userType', 'customer')}
                  >
                    <Text style={[
                      styles.userTypeButtonText,
                      formData.userType === 'customer' && styles.userTypeButtonTextActive
                    ]}>
                      Find Artisans
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.userTypeButton,
                      formData.userType === 'artisan' && styles.userTypeButtonActive
                    ]}
                    onPress={() => updateFormData('userType', 'artisan')}
                  >
                    <Text style={[
                      styles.userTypeButtonText,
                      formData.userType === 'artisan' && styles.userTypeButtonTextActive
                    ]}>
                      Offer Services
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Form */}
              <View style={styles.form}>
                <View style={styles.nameRow}>
                  <View style={[styles.inputContainer, styles.nameInput]}>
                    <Text style={styles.inputLabel}>First Name</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="First name"
                        placeholderTextColor="#A0522D"
                        value={formData.firstName}
                        onChangeText={(value) => updateFormData('firstName', value)}
                        autoCapitalize="words"
                        autoComplete="given-name"
                      />
                    </View>
                  </View>

                  <View style={[styles.inputContainer, styles.nameInput]}>
                    <Text style={styles.inputLabel}>Last Name</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="Last name"
                        placeholderTextColor="#A0522D"
                        value={formData.lastName}
                        onChangeText={(value) => updateFormData('lastName', value)}
                        autoCapitalize="words"
                        autoComplete="family-name"
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="#A0522D"
                      value={formData.email}
                      onChangeText={(value) => updateFormData('email', value)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Create a password"
                      placeholderTextColor="#A0522D"
                      value={formData.password}
                      onChangeText={(value) => updateFormData('password', value)}
                      secureTextEntry
                      autoComplete="new-password"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm your password"
                      placeholderTextColor="#A0522D"
                      value={formData.confirmPassword}
                      onChangeText={(value) => updateFormData('confirmPassword', value)}
                      secureTextEntry
                      autoComplete="new-password"
                    />
                  </View>
                </View>

                {/* Terms and Conditions */}
                <TouchableOpacity 
                  style={styles.termsContainer}
                  onPress={() => setAgreedToTerms(!agreedToTerms)}
                >
                  <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                    {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.termsText}>
                    I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </TouchableOpacity>

                {/* Register Button */}
                <TouchableOpacity 
                  style={[styles.registerButton, isLoading && styles.registerButtonDisabled]} 
                  onPress={handleRegister}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={isLoading ? ['#DEB887', '#DEB887'] : ['#F4A460', '#CD853F', '#8B4513']}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.registerButtonText}>
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Social Registration Options */}
                <TouchableOpacity style={styles.socialButton}>
                  <View style={styles.socialButtonContent}>
                    <View style={styles.socialIcon}>
                      <Text style={styles.socialIconText}>G</Text>
                    </View>
                    <Text style={styles.socialButtonText}>Sign up with Google</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                  <View style={styles.socialButtonContent}>
                    <View style={[styles.socialIcon, { backgroundColor: '#1877F2' }]}>
                      <Text style={[styles.socialIconText, { color: 'white' }]}>f</Text>
                    </View>
                    <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={handleLogin}>
                  <Text style={styles.loginText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.08,
  },
  decorCircle1: {
    width: 160,
    height: 160,
    backgroundColor: '#DEB887',
    top: -30,
    right: -30,
  },
  decorCircle2: {
    width: 100,
    height: 100,
    backgroundColor: '#F4A460',
    bottom: 60,
    left: -15,
  },
  decorCircle3: {
    width: 70,
    height: 70,
    backgroundColor: '#CD853F',
    top: '50%',
    right: 5,
  },
  keyboardAvoid: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },
  content: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  illustrationContainer: {
    marginBottom: 15,
    shadowColor: '#CD853F',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0522D',
    textAlign: 'center',
    fontWeight: '400',
  },
  userTypeContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 25,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 12,
    textAlign: 'center',
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DEB887',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  userTypeButtonActive: {
    backgroundColor: '#F4A460',
    borderColor: '#CD853F',
  },
  userTypeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4513',
  },
  userTypeButtonTextActive: {
    color: '#FFF8DC',
  },
  form: {
    width: '100%',
    maxWidth: 320,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameInput: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: {
    backgroundColor: '#FFF8DC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DEB887',
    shadowColor: '#CD853F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '500',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
    marginTop: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#DEB887',
    backgroundColor: '#FFF8DC',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#F4A460',
    borderColor: '#CD853F',
  },
  checkmark: {
    color: '#FFF8DC',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#A0522D',
    lineHeight: 20,
  },
  termsLink: {
    color: '#CD853F',
    fontWeight: '600',
  },
  registerButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#8B4513',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 25,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: '#FFF8DC',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DEB887',
    opacity: 0.5,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#A0522D',
    fontWeight: '500',
  },
  socialButton: {
    backgroundColor: '#FFF8DC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DEB887',
    marginBottom: 12,
    shadowColor: '#CD853F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  socialIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DEB887',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  socialIconText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8B4513',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    flex: 1,
    textAlign: 'center',
    marginRight: 36,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  footerText: {
    fontSize: 16,
    color: '#A0522D',
    fontWeight: '400',
  },
  loginText: {
    fontSize: 16,
    color: '#CD853F',
    fontWeight: '700',
  },
});

export default RegisterScreen;