import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity,
  Animated,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { 
  Circle, 
  Path, 
  Defs, 
  RadialGradient, 
  Stop, 
  G,
  Ellipse,
  Polygon,
  Rect
} from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Responsive helpers
const isTablet = width >= 768;
const isSmallScreen = width < 375;
const screenScale = width / 375; // Base scale factor

const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.8);
const responsiveWidth = (percentage: number) => width * (percentage / 100);
const responsiveHeight = (percentage: number) => height * (percentage / 100);

type AuthStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

// Custom illustrations for each slide
const WelcomeIllustration = () => {
  const illustrationSize = responsiveSize(isTablet ? 350 : 280);
  return (
  <Svg width={illustrationSize} height={illustrationSize} viewBox="0 0 280 280">
    <Defs>
      <RadialGradient id="warmGrad1" cx="50%" cy="30%">
        <Stop offset="0%" stopColor="#FFE5B4" />
        <Stop offset="100%" stopColor="#DEB887" />
      </RadialGradient>
      <RadialGradient id="warmGrad2" cx="50%" cy="50%">
        <Stop offset="0%" stopColor="#F4A460" />
        <Stop offset="100%" stopColor="#CD853F" />
      </RadialGradient>
    </Defs>
    {/* Background circle */}
    <Circle cx={140} cy={140} r={120} fill="url(#warmGrad1)" opacity={0.3} />
    {/* Artisan tools */}
    <G transform="translate(140, 140)">
      {/* Hammer */}
      <G transform="rotate(-15)">
        <Path d="M-20,-40 L20,-40 L25,-35 L25,-25 L20,-20 L-20,-20 L-25,-25 L-25,-35 Z" fill="#8B4513" />
        <Path d="M-5,-20 L5,-20 L5,40 L-5,40 Z" fill="#DEB887" />
      </G>
      {/* Wrench */}
      <G transform="rotate(45) translate(30, -30)">
        <Path d="M-3,-25 L3,-25 L3,25 L-3,25 Z" fill="#B8860B" />
        <Circle cx={0} cy={-25} r={8} fill="none" stroke="#B8860B" strokeWidth="3" />
      </G>
      {/* Screwdriver */}
      <G transform="rotate(-45) translate(-30, -30)">
        <Path d="M-2,-25 L2,-25 L2,15 L-2,15 Z" fill="#CD853F" />
        <Path d="M-4,15 L4,15 L4,25 L-4,25 Z" fill="#8B4513" />
      </G>
    </G>
    {/* Decorative elements */}
    <Circle cx={60} cy={80} r={8} fill="#F4A460" opacity={0.6} />
    <Circle cx={220} cy={100} r={12} fill="#DEB887" opacity={0.4} />
    <Circle cx={80} cy={200} r={6} fill="#CD853F" opacity={0.7} />
  </Svg>
  );
};

const PortfolioIllustration = () => {
  const illustrationSize = responsiveSize(isTablet ? 350 : 280);
  return (
  <Svg width={illustrationSize} height={illustrationSize} viewBox="0 0 280 280">
    <Defs>
      <RadialGradient id="portfolioGrad" cx="50%" cy="50%">
        <Stop offset="0%" stopColor="#FFDAB9" />
        <Stop offset="100%" stopColor="#F4A460" />
      </RadialGradient>
    </Defs>
    {/* Background */}
    <Ellipse cx={140} cy={140} rx={100} ry={80} fill="url(#portfolioGrad)" opacity={0.3} />
    {/* Portfolio cards */}
    <G transform="translate(140, 140)">
      {/* Card 1 */}
      <G transform="rotate(-10) translate(-40, -30)">
        <Rect x="0" y="0" width="60" height="80" fill="#FFF8DC" stroke="#DEB887" strokeWidth="2" rx={8} />
        <Path d="M8,8 L52,8 L52,40 L8,40 Z" fill="#F4A460" opacity={0.6} />
        <Path d="M8,48 L35,48" stroke="#CD853F" strokeWidth="2" strokeLinecap="round" />
        <Path d="M8,56 L45,56" stroke="#CD853F" strokeWidth="2" strokeLinecap="round" />
        <Path d="M8,64 L30,64" stroke="#CD853F" strokeWidth="2" strokeLinecap="round" />
      </G>
      {/* Card 2 */}
      <G transform="rotate(5) translate(20, -20)">
        <Rect x="0" y="0" width="60" height="80" fill="#FFF8DC" stroke="#DEB887" strokeWidth="2" rx={8} />
        <Path d="M8,8 L52,8 L52,40 L8,40 Z" fill="#DEB887" opacity={0.6} />
        <Path d="M8,48 L40,48" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
        <Path d="M8,56 L35,56" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
      </G>
      {/* Card 3 */}
      <G transform="rotate(15) translate(-10, 10)">
        <Rect x="0" y="0" width="60" height="80" fill="#FFF8DC" stroke="#DEB887" strokeWidth="2" rx={8} />
        <Path d="M8,8 L52,8 L52,40 L8,40 Z" fill="#CD853F" opacity={0.6} />
        <Path d="M8,48 L38,48" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
        <Path d="M8,56 L42,56" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
        <Path d="M8,64 L25,64" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
      </G>
    </G>
    {/* Stars for ratings */}
    <Polygon points="200,60 205,70 215,70 207,77 210,87 200,80 190,87 193,77 185,70 195,70" fill="#FFD700" />
    <Polygon points="220,90 223,96 230,96 225,100 227,107 220,103 213,107 215,100 210,96 217,96" fill="#FFD700" />
  </Svg>
  );
};

const BookingIllustration = () => {
  const illustrationSize = responsiveSize(isTablet ? 350 : 280);
  return (
  <Svg width={illustrationSize} height={illustrationSize} viewBox="0 0 280 280">
    <Defs>
      <RadialGradient id="bookingGrad" cx="50%" cy="50%">
        <Stop offset="0%" stopColor="#FFEFD5" />
        <Stop offset="100%" stopColor="#DEB887" />
      </RadialGradient>
    </Defs>
    {/* Background */}
    <Circle cx={140} cy={140} r={110} fill="url(#bookingGrad)" opacity={0.3} />
    {/* Calendar/booking interface */}
    <G transform="translate(140, 140)">
      {/* Phone outline */}
      <Path d="M-50,-80 L50,-80 L50,80 L-50,80 Z" fill="#FFF8DC" stroke="#CD853F" strokeWidth="3" />
      {/* Screen */}
      <Path d="M-40,-60 L40,-60 L40,60 L-40,60 Z" fill="#F5F5DC" />
      {/* Chat bubbles */}
      <G transform="translate(0, -30)">
        {/* Incoming message */}
        <Path d="M-30,-10 L10,-10 L10,5 L-25,5 L-30,0 Z" fill="#DEB887" />
        <Path d="M-25,-5 L5,-5" stroke="#8B4513" strokeWidth="1" strokeLinecap="round" />
        <Path d="M-25,0 L-5,0" stroke="#8B4513" strokeWidth="1" strokeLinecap="round" />
        
        {/* Outgoing message */}
        <Path d="M-10,15 L30,15 L30,30 L25,30 L30,25 L-10,25 Z" fill="#F4A460" />
        <Path d="M-5,20 L25,20" stroke="#8B4513" strokeWidth="1" strokeLinecap="round" />
      </G>
      
      {/* Calendar icon */}
      <G transform="translate(0, 20)">
        <Path d="M-20,-15 L20,-15 L20,15 L-20,15 Z" fill="#FFF8DC" stroke="#CD853F" strokeWidth="2" />
        <Path d="M-15,-20 L-15,-10" stroke="#CD853F" strokeWidth="2" strokeLinecap="round" />
        <Path d="M15,-20 L15,-10" stroke="#CD853F" strokeWidth="2" strokeLinecap="round" />
        <Path d="M-15,-5 L15,-5" stroke="#DEB887" strokeWidth="1" />
        <Path d="M-15,0 L15,0" stroke="#DEB887" strokeWidth="1" />
        <Path d="M-15,5 L15,5" stroke="#DEB887" strokeWidth="1" />
        <Circle cx={-8} cy={8} r={3} fill="#F4A460" />
      </G>
    </G>
    {/* Floating hearts */}
    <Path d="M70,80 C70,75 75,70 80,70 C85,70 90,75 90,80 C90,85 80,95 80,95 C80,95 70,85 70,80 Z" fill="#FFB6C1" opacity={0.7} />
    <Path d="M190,200 C190,197 192,195 195,195 C198,195 200,197 200,200 C200,203 195,208 195,208 C195,208 190,203 190,200 Z" fill="#FFB6C1" opacity={0.5} />
  </Svg>
);
};

const slides = [
  { 
    title: 'Welcome to Artisan', 
    description: 'Discover skilled craftspeople and artisans in your neighborhood. Quality work, trusted professionals.',
    illustration: WelcomeIllustration
  },
  { 
    title: 'Browse Portfolios', 
    description: 'Explore detailed profiles, authentic reviews, and stunning portfolios of work from verified artisans.',
    illustration: PortfolioIllustration
  },
  { 
    title: 'Book with Confidence', 
    description: 'Schedule appointments, chat directly, and manage projects seamlessly. Your perfect artisan awaits.',
    illustration: BookingIllustration
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
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
  }, [currentIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slideIndex !== currentIndex) {
      setCurrentIndex(slideIndex);
      // Reset and trigger animations for new slide
      fadeAnim.setValue(0);
      slideAnim.setValue(30);
      scaleAnim.setValue(0.95);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.replace('Welcome');
  };

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    }
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

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {slides.map((slide, idx) => {
            const IllustrationComponent = slide.illustration;
            return (
              <View key={idx} style={styles.slide}>
                <Animated.View 
                  style={[
                    styles.illustrationContainer,
                    {
                      opacity: fadeAnim,
                      transform: [
                        { translateY: slideAnim },
                        { scale: scaleAnim }
                      ]
                    }
                  ]}
                >
                  <IllustrationComponent />
                </Animated.View>
                
                <Animated.View 
                  style={[
                    styles.textContainer,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }]
                    }
                  ]}
                >
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.description}>{slide.description}</Text>
                </Animated.View>
              </View>
            );
          })}
        </ScrollView>

        {/* Enhanced dot indicator */}
        <View style={styles.dotsContainer}>
          {slides.map((_, idx) => (
            <Animated.View 
              key={idx} 
              style={[
                styles.dot, 
                currentIndex === idx && styles.activeDot,
                { 
                  transform: [{ 
                    scale: currentIndex === idx ? 1.2 : 1 
                  }] 
                }
              ]} 
            />
          ))}
        </View>

        {/* Navigation buttons */}
        <View style={styles.buttonContainer}>
          {currentIndex < slides.length - 1 ? (
            <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
              <LinearGradient
                colors={['#DEB887', '#CD853F']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
              <LinearGradient
                colors={['#F4A460', '#CD853F', '#8B4513']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.getStartedButtonText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        {/* Skip button */}
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleGetStarted}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
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
    opacity: 0.1,
  },
  decorCircle1: {
    width: 200,
    height: 200,
    backgroundColor: '#DEB887',
    top: -50,
    right: -50,
  },
  decorCircle2: {
    width: 150,
    height: 150,
    backgroundColor: '#F4A460',
    bottom: 100,
    left: -30,
  },
  decorCircle3: {
    width: 100,
    height: 100,
    backgroundColor: '#CD853F',
    top: '40%',
    right: 20,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  illustrationContainer: {
    marginBottom: 40,
    shadowColor: '#CD853F',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.5,
    fontFamily: 'System',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#A0522D',
    lineHeight: 26,
    fontWeight: '400',
    maxWidth: 300,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    zIndex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DEB887',
    marginHorizontal: 8,
    opacity: 0.4,
  },
  activeDot: {
    backgroundColor: '#8B4513',
    opacity: 1,
    width: 24,
    borderRadius: 12,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    zIndex: 1,
  },
  nextButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#CD853F',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  getStartedButton: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#8B4513',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF8DC',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  getStartedButtonText: {
    color: '#FFF8DC',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  skipButtonText: {
    color: '#A0522D',
    fontSize: 16,
    fontWeight: '500',
  },
});
export default OnboardingScreen;