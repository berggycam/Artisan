import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Dimensions,
  Animated,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { 
  Circle, 
  Path, 
  Defs, 
  RadialGradient, 
  Stop, 
  G,
  Polygon
} from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Responsive helpers
const isTablet = width >= 768;
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.8);

// Define your stack param list
type AuthStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

// Enhanced Logo/Brand Illustration
const BrandIllustration = () => {
  const illustrationSize = responsiveSize(isTablet ? 200 : 160);
  
  return (
    <Svg width={illustrationSize} height={illustrationSize} viewBox="0 0 160 160">
      <Defs>
        <RadialGradient id="brandGrad1" cx="50%" cy="30%">
          <Stop offset="0%" stopColor="#FFE5B4" />
          <Stop offset="100%" stopColor="#DEB887" />
        </RadialGradient>
        <RadialGradient id="brandGrad2" cx="50%" cy="50%">
          <Stop offset="0%" stopColor="#F4A460" />
          <Stop offset="100%" stopColor="#CD853F" />
        </RadialGradient>
        <RadialGradient id="toolGrad" cx="50%" cy="50%">
          <Stop offset="0%" stopColor="#DEB887" />
          <Stop offset="100%" stopColor="#8B4513" />
        </RadialGradient>
      </Defs>
      
      {/* Outer decorative circle */}
      <Circle cx={80} cy={80} r={70} fill="url(#brandGrad1)" opacity={0.2} />
      <Circle cx={80} cy={80} r={55} fill="url(#brandGrad2)" opacity={0.3} />
      
      {/* Central artisan symbol */}
      <G transform="translate(80, 80)">
        {/* Crossed tools forming an 'A' for Artisan */}
        {/* Hammer */}
        <G transform="rotate(-30)">
          <Path d="M-3,-35 L3,-35 L3,25 L-3,25 Z" fill="url(#toolGrad)" />
          <Path d="M-12,-35 L12,-35 L15,-30 L15,-25 L12,-20 L-12,-20 L-15,-25 L-15,-30 Z" fill="#8B4513" />
        </G>
        
        {/* Chisel */}
        <G transform="rotate(30)">
          <Path d="M-2,-35 L2,-35 L2,25 L-2,25 Z" fill="url(#toolGrad)" />
          <Path d="M-4,20 L4,20 L6,25 L-6,25 Z" fill="#8B4513" />
        </G>
        
        {/* Center connection point */}
        <Circle cx={0} cy={0} r={6} fill="#8B4513" />
        
        {/* Decorative gear/craft symbol */}
        <G opacity={0.7}>
          {Array.from({ length: 8 }, (_, i) => (
            <G key={i} transform={`rotate(${i * 45})`}>
              <Path d="M0,-40 L2,-42 L0,-44 L-2,-42 Z" fill="#CD853F" />
            </G>
          ))}
        </G>
      </G>
      
      {/* Floating craft elements */}
      <Circle cx={25} cy={35} r={4} fill="#F4A460" opacity={0.6} />
      <Polygon points="135,45 140,50 135,55 130,50" fill="#DEB887" opacity={0.5} />
      <Circle cx={30} cy={125} r={3} fill="#CD853F" opacity={0.7} />
      <Polygon points="125,120 130,125 125,130 120,125" fill="#F4A460" opacity={0.6} />
    </Svg>
  );
};

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      if (!completed) {
        navigation.replace('Onboarding');
      } else {
        setLoading(false);
        setShowContent(true);
        
        // Start entrance animations
        Animated.sequence([
          // Logo entrance
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(logoRotateAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          // Text slide up
          Animated.timing(slideUpAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start();

        // Continuous pulse animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.05,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        ).start();

        // Navigate to Login after animations
        setTimeout(() => {
          navigation.replace('Login');
        }, 3000);
      }
    };
    
    checkOnboarding();
  }, [navigation]);

  const logoRotation = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (loading || !showContent) {
    return (
      <LinearGradient
        colors={['#FFF8DC', '#FFEFD5', '#F5DEB3']}
        style={styles.loadingContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFF8DC" />
        <ActivityIndicator size="large" color="#8B4513" />
      </LinearGradient>
    );
  }

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
          <View style={[styles.decorRing, styles.decorRing1]} />
          <View style={[styles.decorRing, styles.decorRing2]} />
        </View>

        {/* Main content */}
        <View style={styles.content}>
          {/* Animated logo */}
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { rotate: logoRotation },
                  { scale: pulseAnim }
                ]
              }
            ]}
          >
            <BrandIllustration />
          </Animated.View>

          {/* Welcome text */}
          <Animated.View 
            style={[
              styles.textContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }]
              }
            ]}
          >
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.brandName}>Artisan</Text>
            <Text style={styles.tagline}>Crafting Connections</Text>
          </Animated.View>

          {/* Loading indicator */}
          <Animated.View 
            style={[
              styles.loadingIndicator,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }]
              }
            ]}
          >
            <View style={styles.loadingDots}>
              <View style={[styles.dot, styles.dot1]} />
              <View style={[styles.dot, styles.dot2]} />
              <View style={[styles.dot, styles.dot3]} />
            </View>
            <Text style={styles.loadingText}>Setting up your experience...</Text>
          </Animated.View>
        </View>

        {/* Floating elements */}
        <Animated.View 
          style={[
            styles.floatingElement1,
            {
              opacity: fadeAnim,
              transform: [{ scale: pulseAnim }]
            }
          ]}
        />
        <Animated.View 
          style={[
            styles.floatingElement2,
            {
              opacity: fadeAnim,
              transform: [{ scale: pulseAnim }]
            }
          ]}
        />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 300,
    height: 300,
    backgroundColor: '#DEB887',
    top: -100,
    right: -100,
  },
  decorCircle2: {
    width: 200,
    height: 200,
    backgroundColor: '#F4A460',
    bottom: -50,
    left: -50,
  },
  decorCircle3: {
    width: 120,
    height: 120,
    backgroundColor: '#CD853F',
    top: '30%',
    right: 30,
  },
  decorRing: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
    opacity: 0.1,
  },
  decorRing1: {
    width: 150,
    height: 150,
    borderColor: '#8B4513',
    top: '20%',
    left: 20,
  },
  decorRing2: {
    width: 100,
    height: 100,
    borderColor: '#CD853F',
    bottom: '25%',
    right: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 40,
    shadowColor: '#CD853F',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 15,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#A0522D',
    textAlign: 'center',
    marginBottom: 5,
    letterSpacing: 1,
  },
  brandName: {
    fontSize: 48,
    fontWeight: '800',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -1,
    textShadowColor: 'rgba(139, 69, 19, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '400',
    color: '#CD853F',
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  loadingIndicator: {
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DEB887',
    marginHorizontal: 4,
  },
  dot1: {},
  dot2: {},
  dot3: {},
  loadingText: {
    fontSize: 14,
    color: '#A0522D',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  floatingElement1: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: 20,
    height: 20,
    backgroundColor: '#F4A460',
    borderRadius: 10,
    opacity: 0.3,
  },
  floatingElement2: {
    position: 'absolute',
    bottom: '20%',
    right: '15%',
    width: 15,
    height: 15,
    backgroundColor: '#DEB887',
    borderRadius: 7.5,
    opacity: 0.4,
  },
});

export default WelcomeScreen;