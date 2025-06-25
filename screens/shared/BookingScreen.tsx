import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#D2691E',
  primaryLight: '#E6965C',
  primaryDark: '#A0522D',
  secondary: '#CD853F',
  accent: '#8B4513',
  warm: '#F4A460',
  text: {
    primary: '#2F1B14',
    secondary: '#5D4037',
    tertiary: '#8D6E63',
    white: '#FFFFFF',
  },
  background: {
    primary: '#FFFEF7',
    secondary: '#FBF8F3',
    tertiary: '#F5F1EA',
  },
  border: '#E8DDD4',
  success: '#8FBC8F',
  warning: '#DAA520',
  error: '#CD5C5C',
};

const BookingScreen: React.FC = () => (
  <>
    <StatusBar barStyle="dark-content" backgroundColor="#FFF8DC" />
    <LinearGradient
      colors={['#FFF8DC', '#FFEFD5', '#F5DEB3']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Decorative background elements */}
      <View style={styles.backgroundDecor} pointerEvents="none">
        <View style={[styles.decorCircle, styles.decorCircle1]} />
        <View style={[styles.decorCircle, styles.decorCircle2]} />
        <View style={[styles.decorCircle, styles.decorCircle3]} />
      </View>
      <View style={styles.content}>
        <Ionicons name="calendar-outline" size={48} color={COLORS.accent} style={{ marginBottom: 16 }} />
        <Text style={styles.header}>My Bookings</Text>
        <Text style={styles.placeholder}>You have no bookings yet.</Text>
      </View>
    </LinearGradient>
  </>
);

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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 32,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.accent,
    marginBottom: 12,
    letterSpacing: -1,
    textAlign: 'center',
    textShadowColor: 'rgba(139, 69, 19, 0.08)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  placeholder: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '400',
  },
});

export default BookingScreen; 