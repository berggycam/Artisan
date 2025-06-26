import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const mockRequests = [
  {
    id: '1',
    client: 'Alice Johnson',
    title: 'Custom Coffee Table',
    description: 'Looking for a modern, handcrafted coffee table for my living room.',
    date: '2024-06-01',
    status: 'pending',
  },
  {
    id: '2',
    client: 'Bob Smith',
    title: 'Deck Repair',
    description: 'Need repairs on my backyard deck before summer.',
    date: '2024-06-03',
    status: 'pending',
  },
  {
    id: '3',
    client: 'Carla Gomez',
    title: 'Kitchen Cabinets',
    description: 'Install new cabinets and update kitchen layout.',
    date: '2024-06-05',
    status: 'pending',
  },
];

const JobRequests: React.FC = () => {
  const [requests, setRequests] = useState(mockRequests);
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

  const handleAction = (id: string, action: 'accept' | 'decline') => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: action === 'accept' ? 'accepted' : 'declined' } : req
      )
    );
  };

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
        data={requests}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.header}>Job Requests</Text>
            <Text style={styles.subHeader}>Review and respond to new opportunities</Text>
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
              <View style={styles.cardContent}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="person-circle" size={32} color="#CD853F" style={{ marginRight: 8 }} />
                  <Text style={styles.clientName}>{item.client}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
                <Text style={styles.cardDate}>Requested: {item.date}</Text>
                <View style={styles.cardActionsRow}>
                  {item.status === 'pending' ? (
                    <>
                      <TouchableOpacity style={[styles.actionButton, styles.acceptButton]} onPress={() => handleAction(item.id, 'accept')}>
                        <Ionicons name="checkmark-circle" size={20} color="#fff" />
                        <Text style={styles.actionButtonText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.actionButton, styles.declineButton]} onPress={() => handleAction(item.id, 'decline')}>
                        <Ionicons name="close-circle" size={20} color="#fff" />
                        <Text style={styles.actionButtonText}>Decline</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text style={[styles.statusText, item.status === 'accepted' ? styles.accepted : styles.declined]}>
                      {item.status === 'accepted' ? 'Accepted' : 'Declined'}
                    </Text>
                  )}
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No job requests at the moment.</Text>}
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
  cardContent: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A0522D',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 14,
    color: '#A0522D',
    opacity: 0.85,
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#CD853F',
    marginBottom: 8,
  },
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#DEB887',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  declineButton: {
    backgroundColor: '#E57373',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 15,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  accepted: {
    color: '#4CAF50',
  },
  declined: {
    color: '#E57373',
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

export default JobRequests; 