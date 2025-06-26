import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');
const responsiveSize = (size: number) => Math.max(size * (width / 375), size * 0.8);

// ModernDashboardIllustration copied from ArtisanDashboard
import Svg, { Circle, Path, Defs, LinearGradient as SvgLinearGradient, Stop, G, Polygon, Rect, ClipPath } from 'react-native-svg';

const ModernDashboardIllustration = () => {
  const size = responsiveSize(200);
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <SvgLinearGradient id="modernGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={colors.gold} />
          <Stop offset="50%" stopColor={colors.brownLight} />
          <Stop offset="100%" stopColor={colors.bronze} />
        </SvgLinearGradient>
        <SvgLinearGradient id="modernGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={colors.tan} />
          <Stop offset="100%" stopColor={colors.tanDark} />
        </SvgLinearGradient>
        <SvgLinearGradient id="toolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={colors.brown} />
          <Stop offset="100%" stopColor={colors.gold} />
        </SvgLinearGradient>
        <ClipPath id="circleClip">
          <Circle cx="100" cy="100" r="90" />
        </ClipPath>
      </Defs>
      <Circle cx="100" cy="100" r="95" fill="url(#modernGrad1)" opacity="0.1" />
      <Circle cx="100" cy="100" r="75" fill="url(#modernGrad2)" opacity="0.15" />
      <Circle cx="100" cy="100" r="55" fill="url(#toolGrad)" opacity="0.2" />
      <G transform="translate(100, 100)">
        <G transform="rotate(-20)">
          <Rect x="-2" y="-40" width="4" height="60" fill={colors.brown} rx="2" />
          <Rect x="-15" y="-45" width="30" height="12" fill={colors.bronze} rx="3" />
          <Rect x="-12" y="-42" width="24" height="6" fill={colors.gold} rx="2" />
        </G>
        <G transform="rotate(45)">
          <Rect x="-1.5" y="-35" width="3" height="50" fill={colors.gold} rx="1.5" />
          <Rect x="-3" y="-40" width="6" height="8" fill={colors.tanDark} rx="3" />
        </G>
        <G transform="rotate(160)">
          <Path d="M-2,-30 L2,-30 L2,20 L-2,20 Z" fill={colors.bronze} />
          <Circle cx="0" cy="-25" r="8" fill="none" stroke={colors.bronze} strokeWidth="3" />
          <Circle cx="0" cy="15" r="5" fill={colors.bronze} />
        </G>
        <Circle cx="0" cy="0" r="12" fill="url(#modernGrad1)" />
        <Circle cx="0" cy="0" r="8" fill="#FFFFFF" opacity="0.9" />
        <Circle cx="0" cy="0" r="4" fill="url(#toolGrad)" />
      </G>
      <Circle cx="40" cy="60" r="6" fill={colors.gold} opacity="0.6" />
      <Polygon points="160,40 170,50 160,60 150,50" fill={colors.brownLight} opacity="0.7" />
      <Circle cx="50" cy="150" r="4" fill={colors.bronze} opacity="0.8" />
      <Rect x="140" y="140" width="8" height="8" fill={colors.tan} opacity="0.6" rx="2" />
      <Circle cx="170" cy="80" r="5" fill={colors.tanDark} opacity="0.7" />
    </Svg>
  );
};

const AnimationScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
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
    ]).start();
    // Navigate to dashboard after 2 seconds
    const timeout = setTimeout(() => {
      navigation.reset({ index: 0, routes: [{ name: 'ArtisanDashboard' as never }] });
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <LinearGradient
      colors={[colors.tanLight, colors.tan, colors.tanDark]}
      style={styles.gradientBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.tanLight} />
      <Animated.View
        style={[
          styles.centered,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <ModernDashboardIllustration />
        <LinearGradient
          colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.9)"]}
          style={styles.welcomeCard}
        >
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={[styles.welcomeName, { color: colors.brown }]}>Artisan! 👋</Text>
        </LinearGradient>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeCard: {
    marginTop: -40,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  welcomeName: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default AnimationScreen; 