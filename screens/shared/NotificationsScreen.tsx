import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NotificationsScreen: React.FC = () => (
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
      <Ionicons name="notifications-outline" size={64} color="#8B4513" style={styles.icon} />
      <Text style={styles.header}>Notifications</Text>
      <Text style={styles.subtext}>No notifications yet!</Text>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 220,
    height: 220,
    backgroundColor: '#DEB887',
    top: -60,
    right: -60,
  },
  decorCircle2: {
    width: 140,
    height: 140,
    backgroundColor: '#F4A460',
    bottom: -30,
    left: -30,
  },
  decorCircle3: {
    width: 90,
    height: 90,
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
    width: 90,
    height: 90,
    borderColor: '#8B4513',
    top: '20%',
    left: 20,
  },
  decorRing2: {
    width: 60,
    height: 60,
    borderColor: '#CD853F',
    bottom: '25%',
    right: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: '100%',
  },
  icon: {
    marginBottom: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#8B4513',
    marginBottom: 8,
    letterSpacing: -1,
    textShadowColor: 'rgba(139, 69, 19, 0.08)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#CD853F',
    textAlign: 'center',
    letterSpacing: 1,
    fontWeight: '500',
  },
});

export default NotificationsScreen; 