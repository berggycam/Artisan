import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Dimensions, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const responsiveSize = (size: number) => Math.max(size * (width / 375), size * 0.8);

const mockPortfolio = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Custom Bookshelf',
    description: 'Handcrafted oak bookshelf for a modern living room.'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    title: 'Kitchen Renovation',
    description: 'Complete kitchen remodel with rustic wood finishes.'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    title: 'Outdoor Deck',
    description: 'Spacious backyard deck for summer gatherings.'
  },
];

const ManagePortfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
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

  const handleAddPortfolio = () => {
    if (!newTitle || !newDesc) return;
    setPortfolio([
      {
        id: Date.now().toString(),
        image: newImage || 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        title: newTitle,
        description: newDesc,
      },
      ...portfolio,
    ]);
    setModalVisible(false);
    setNewTitle('');
    setNewDesc('');
    setNewImage('');
  };

  const handleDelete = (id: string) => {
    setPortfolio(portfolio.filter(item => item.id !== id));
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
        data={portfolio}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.header}>Manage Portfolio</Text>
            <Text style={styles.subHeader}>Showcase your best work to attract more clients</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle" size={28} color="#8B4513" />
              <Text style={styles.addButtonText}>Add Portfolio Item</Text>
            </TouchableOpacity>
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
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash" size={22} color="#A0522D" />
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No portfolio items yet. Add your first project!</Text>}
        style={{ flex: 1 }}
      />
      {/* Add Portfolio Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Portfolio Item</Text>
            <TextInput
              placeholder="Title"
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholderTextColor="#A0522D"
            />
            <TextInput
              placeholder="Description"
              style={[styles.input, { height: 70 }]}
              value={newDesc}
              onChangeText={setNewDesc}
              placeholderTextColor="#A0522D"
              multiline
            />
            {/* Placeholder for image picker */}
            <TouchableOpacity style={styles.imagePicker} onPress={() => {}}>
              <Ionicons name="image" size={24} color="#DEB887" />
              <Text style={styles.imagePickerText}>Pick Image (placeholder)</Text>
            </TouchableOpacity>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonAdd]} onPress={handleAddPortfolio}>
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginBottom: 10,
    shadowColor: '#DEB887',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '600',
    marginLeft: 8,
  },
  cardWrapper: {
    marginBottom: 18,
  },
  cardGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#CD853F',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginHorizontal: 2,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: '#F5DEB3',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 14,
    color: '#A0522D',
    opacity: 0.85,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(210,180,140,0.13)',
  },
  emptyText: {
    textAlign: 'center',
    color: '#A0522D',
    fontSize: 16,
    marginTop: 40,
    opacity: 0.7,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '88%',
    backgroundColor: '#FFF8DC',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#CD853F',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#8B4513',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DEB887',
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(210,180,140,0.13)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 18,
  },
  imagePickerText: {
    color: '#A0522D',
    fontSize: 15,
    marginLeft: 8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#FFEFD5',
    marginLeft: 10,
  },
  modalButtonAdd: {
    backgroundColor: '#8B4513',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: 'bold',
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

export default ManagePortfolio; 