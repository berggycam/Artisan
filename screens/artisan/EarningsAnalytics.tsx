import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, Line } from 'react-native-svg';
import StarRating from '../../components/shared/StarRating';

const { width } = Dimensions.get('window');

const stats = [
  {
    label: 'Total Earnings',
    value: '$8,250',
    icon: 'cash-outline',
    color: ['#FFD700', '#DEB887'],
  },
  {
    label: 'Jobs Completed',
    value: '42',
    icon: 'checkmark-done-circle-outline',
    color: ['#CD853F', '#F4A460'],
  },
  {
    label: 'Avg. Rating',
    value: '4.9',
    icon: 'star-outline',
    color: ['#F4A460', '#FFD700'],
  },
];

const earningsData = [
  1200, 900, 1500, 800, 1100, 950, 1700
]; // Mock earnings for 7 months
const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

const EarningsAnalytics: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Chart dimensions
  const chartWidth = width - 60;
  const chartHeight = 120;
  const maxEarning = Math.max(...earningsData);

  return (
    <LinearGradient
      colors={['#FFF8DC', '#FFEFD5', '#F5DEB3']}
      style={styles.gradientBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8DC" />
      {/* Decorative background elements */}
      <View style={styles.backgroundDecor} pointerEvents="none">
        <View style={[styles.decorCircle, styles.decorCircle1]} />
        <View style={[styles.decorCircle, styles.decorCircle2]} />
        <View style={[styles.decorCircle, styles.decorCircle3]} />
        <View style={[styles.decorRing, styles.decorRing1]} />
        <View style={[styles.decorRing, styles.decorRing2]} />
      </View>
      <Animated.View style={[styles.scrollContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}> 
        <Text style={styles.header}>Earnings & Analytics</Text>
        <Text style={styles.subHeader}>Track your success and growth over time</Text>
        {/* Stats Cards */}
        <View style={styles.statsRow}>
          {stats.map((stat, idx) => (
            <LinearGradient
              key={stat.label}
              colors={stat.color}
              style={styles.statsCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name={stat.icon as any} size={28} color="#8B4513" style={{ marginBottom: 6 }} />
              <Text style={styles.statsValue}>{stat.value}</Text>
              <Text style={styles.statsLabel}>{stat.label}</Text>
              {stat.label === 'Avg. Rating' && <StarRating rating={4.9} size={16} />}
            </LinearGradient>
          ))}
        </View>
        {/* Earnings Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Earnings (last 7 months)</Text>
          <Svg width={chartWidth} height={chartHeight}>
            {/* Y axis grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
              <Line
                key={i}
                x1={0}
                y1={chartHeight * t}
                x2={chartWidth}
                y2={chartHeight * t}
                stroke="#DEB887"
                strokeDasharray="4 4"
                strokeWidth={1}
                opacity={0.25}
              />
            ))}
            {/* Bars */}
            {earningsData.map((val, i) => {
              const barWidth = (chartWidth - 40) / earningsData.length;
              const barHeight = (val / maxEarning) * (chartHeight - 20);
              return (
                <Rect
                  key={i}
                  x={20 + i * barWidth}
                  y={chartHeight - barHeight - 10}
                  width={barWidth * 0.7}
                  height={barHeight}
                  rx={6}
                  fill="#CD853F"
                  opacity={0.85}
                />
              );
            })}
          </Svg>
          <View style={styles.chartLabelsRow}>
            {months.map((m, i) => (
              <Text key={m} style={styles.chartLabel}>{m}</Text>
            ))}
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subHeader: {
    fontSize: 16,
    color: '#CD853F',
    textAlign: 'center',
    marginBottom: 18,
    fontStyle: 'italic',
    opacity: 0.85,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    marginTop: 10,
  },
  statsCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
    paddingVertical: 18,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    shadowColor: '#CD853F',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 4,
  },
  statsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 2,
  },
  statsLabel: {
    fontSize: 13,
    color: '#A0522D',
    marginBottom: 2,
    fontWeight: '600',
    textAlign: 'center',
  },
  chartCard: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 18,
    shadowColor: '#CD853F',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: '#A0522D',
    opacity: 0.8,
    width: 32,
    textAlign: 'center',
  },
  // Decorative background styles
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
});

export default EarningsAnalytics; 