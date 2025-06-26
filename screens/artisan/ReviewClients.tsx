// screens/artisan/ReviewClients.tsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import StarRating from '../../components/shared/StarRating';

const mockReviews = [
  {
    id: '1',
    client: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    review: 'Fantastic craftsmanship and attention to detail. Highly recommended!',
    rating: 5,
    date: '2024-05-28',
  },
  {
    id: '2',
    client: 'Bob Smith',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    review: 'Very professional and finished the job on time.',
    rating: 4,
    date: '2024-05-20',
  },
  {
    id: '3',
    client: 'Carla Gomez',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    review: 'Great communication and beautiful results. Will hire again!',
    rating: 5,
    date: '2024-05-15',
  },
];

const ReviewClients: React.FC = () => {
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
      <FlatList
        data={mockReviews}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.header}>Client Reviews</Text>
            <Text style={styles.subHeader}>See what your clients are saying about your work</Text>
          </Animated.View>
        }
        renderItem={({ item }) => (
          <Animated.View style={styles.cardWrapper}>
            <LinearGradient
              colors={["rgba(255,255,255,0.85)", "rgba(255,255,255,0.5)"]}
              style={styles.cardGlass}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeaderRow}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.clientName}>{item.client}</Text>
                  <Text style={styles.reviewDate}>{item.date}</Text>
                </View>
                <StarRating rating={item.rating} />
              </View>
              <Text style={styles.reviewText}>{item.review}</Text>
            </LinearGradient>
          </Animated.View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No client reviews yet.</Text>}
        style={{ flex: 1 }}
      />
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
  cardWrapper: {
    marginBottom: 18,
  },
  cardGlass: {
    borderRadius: 24,
    padding: 18,
    shadowColor: '#CD853F',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginHorizontal: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#F5DEB3',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  reviewDate: {
    fontSize: 12,
    color: '#CD853F',
    marginTop: 2,
  },
  reviewText: {
    fontSize: 15,
    color: '#A0522D',
    opacity: 0.9,
    marginTop: 2,
    marginBottom: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#A0522D',
    fontSize: 16,
    marginTop: 40,
    opacity: 0.7,
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

export default ReviewClients; 