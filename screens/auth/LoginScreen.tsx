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
  G 
} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');

type AuthStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  ArtisanDashboard: undefined;
};

// Artisan-themed login illustration
const LoginIllustration = () => {
  return (
    <Svg width={200} height={200} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id="loginGrad" cx="50%" cy="50%">
          <Stop offset="0%" stopColor="#FFE5B4" />
          <Stop offset="100%" stopColor="#DEB887" />
        </RadialGradient>
      </Defs>
      {/* Background circle */}
      <Circle cx={100} cy={100} r={80} fill="url(#loginGrad)" opacity={0.3} />
      {/* Artisan workshop door */}
      <G transform="translate(100, 100)">
        {/* Door frame */}
        <Path d="M-40,-60 L40,-60 L40,60 L-40,60 Z" fill="#8B4513" />
        <Path d="M-35,-55 L35,-55 L35,55 L-35,55 Z" fill="#DEB887" />
        {/* Door panels */}
        <Path d="M-30,-50 L30,-50 L30,-10 L-30,-10 Z" fill="#CD853F" opacity={0.7} />
        <Path d="M-30,10 L30,10 L30,50 L-30,50 Z" fill="#CD853F" opacity={0.7} />
        {/* Door handle */}
        <Circle cx={20} cy={0} r={4} fill="#B8860B" />
        {/* Welcome sign */}
        <Path d="M-25,-70 L25,-70 L25,-40 L-25,-40 Z" fill="#F4A460" />
        <Path d="M-20,-65 L-15,-65" stroke="#8B4513" strokeWidth="1" />
        <Path d="M-20,-60 L0,-60" stroke="#8B4513" strokeWidth="1" />
        <Path d="M-20,-55 L10,-55" stroke="#8B4513" strokeWidth="1" />
        <Path d="M-20,-50 L-5,-50" stroke="#8B4513" strokeWidth="1" />
      </G>
      {/* Decorative elements */}
      <Circle cx={40} cy={60} r={6} fill="#F4A460" opacity={0.6} />
      <Circle cx={160} cy={80} r={8} fill="#DEB887" opacity={0.4} />
      <Circle cx={50} cy={140} r={5} fill="#CD853F" opacity={0.7} />
    </Svg>
  );
};

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const { setIsLoggedIn } = useAuth();
  
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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(async () => {
      setIsLoading(false);
      // Get userType from AsyncStorage
      const userType = await AsyncStorage.getItem('userType');
      if (userType === 'artisan' || userType === 'customer') {
        // Ensure userType is set in AsyncStorage (simulate API response if needed)
        await AsyncStorage.setItem('userType', userType);
        // Only set isLoggedIn; RootNavigator will handle navigation
        setIsLoggedIn(true);
        navigation.navigate('Animation' as never);
      } else {
        Alert.alert('Error', 'User type not found.');
      }
    }, 2000);
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality coming soon!');
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
                  <LoginIllustration />
                </View>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue to Artisan</Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="#A0522D"
                      value={email}
                      onChangeText={setEmail}
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
                      placeholder="Enter your password"
                      placeholderTextColor="#A0522D"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoComplete="password"
                    />
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.forgotPasswordButton}
                  onPress={handleForgotPassword}
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity 
                  style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={isLoading ? ['#DEB887', '#DEB887'] : ['#F4A460', '#CD853F', '#8B4513']}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.loginButtonText}>
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Social Login Options */}
                <TouchableOpacity style={styles.socialButton}>
                  <View style={styles.socialButtonContent}>
                    <View style={styles.socialIcon}>
                      <Text style={styles.socialIconText}>G</Text>
                    </View>
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                  <View style={styles.socialButtonContent}>
                    <View style={[styles.socialIcon, { backgroundColor: '#1877F2' }]}>
                      <Text style={[styles.socialIconText, { color: 'white' }]}>f</Text>
                    </View>
                    <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={handleRegister}>
                  <Text style={styles.registerText}>Sign Up</Text>
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
    width: 180,
    height: 180,
    backgroundColor: '#DEB887',
    top: -40,
    right: -40,
  },
  decorCircle2: {
    width: 120,
    height: 120,
    backgroundColor: '#F4A460',
    bottom: 80,
    left: -20,
  },
  decorCircle3: {
    width: 80,
    height: 80,
    backgroundColor: '#CD853F',
    top: '45%',
    right: 10,
  },
  keyboardAvoid: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  content: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  illustrationContainer: {
    marginBottom: 20,
    shadowColor: '#CD853F',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0522D',
    textAlign: 'center',
    fontWeight: '400',
  },
  form: {
    width: '100%',
    maxWidth: 320,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 8,
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '500',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 30,
    paddingVertical: 5,
  },
  forgotPasswordText: {
    color: '#CD853F',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
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
    marginBottom: 30,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFF8DC',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
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
    marginRight: 36, // Offset for icon space
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 16,
    color: '#A0522D',
    fontWeight: '400',
  },
  registerText: {
    fontSize: 16,
    color: '#CD853F',
    fontWeight: '700',
  },
});

export default LoginScreen;