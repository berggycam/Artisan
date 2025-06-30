import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/types';
import { Booking, BookingFilters } from '../../types/booking';
import { useBookingStore } from '../../store/bookingStore';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';
import BookingCard from '../../components/cards/BookingCard';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);
const isSmallScreen = height < 700; // Threshold for smaller screens

type BookingScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const BookingScreen: React.FC = () => {
  const navigation = useNavigation<BookingScreenNavigationProp>();
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();
  
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  const {
    bookings,
    setFilters,
    setLoading,
    isLoading,
  } = useBookingStore();

  // Sample data for demonstration
  const sampleBookings: Booking[] = [
    {
      id: '1',
      userId: 'user1',
      artisanId: 'artisan1',
      serviceId: 'service1',
      serviceName: 'House Cleaning',
      artisanName: 'Abena Osei',
      artisanAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      artisanLocation: { latitude: 40.7128, longitude: -74.0060 },
      userLocation: { latitude: 40.7589, longitude: -73.9851 },
      scheduledDate: new Date('2024-01-15'),
      scheduledTime: '10:00 AM',
      duration: 120,
      price: 85.00,
      status: [
        {
          id: 'status1',
          status: 'confirmed',
          timestamp: new Date('2024-01-14T10:00:00'),
          message: 'Booking confirmed by artisan',
        },
      ],
      currentStatus: 'confirmed',
      description: 'Deep cleaning of 2-bedroom apartment',
      specialRequests: 'Please use eco-friendly cleaning products',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-14'),
    },
    {
      id: '2',
      userId: 'user1',
      artisanId: 'artisan2',
      serviceId: 'service2',
      serviceName: 'Plumbing Repair',
      artisanName: 'Kwame Mensah',
      artisanAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      artisanLocation: { latitude: 40.7505, longitude: -73.9934 },
      userLocation: { latitude: 40.7589, longitude: -73.9851 },
      scheduledDate: new Date('2024-01-16'),
      scheduledTime: '2:00 PM',
      duration: 90,
      price: 120.00,
      status: [
        {
          id: 'status2',
          status: 'in_progress',
          timestamp: new Date('2024-01-16T14:00:00'),
          message: 'Artisan is on the way',
        },
      ],
      currentStatus: 'in_progress',
      description: 'Fix leaking kitchen faucet',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-16'),
    },
    {
      id: '3',
      userId: 'user1',
      artisanId: 'artisan3',
      serviceId: 'service3',
      serviceName: 'Electrical Work',
      artisanName: 'Ama Kufuor',
      artisanAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      artisanLocation: { latitude: 40.7648, longitude: -73.9808 },
      userLocation: { latitude: 40.7589, longitude: -73.9851 },
      scheduledDate: new Date('2024-01-20'),
      scheduledTime: '9:00 AM',
      duration: 180,
      price: 150.00,
      status: [
        {
          id: 'status3',
          status: 'pending',
          timestamp: new Date('2024-01-13T15:30:00'),
          message: 'Booking request sent',
        },
      ],
      currentStatus: 'pending',
      description: 'Install new ceiling fan and wiring',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-13'),
    },
    {
      id: '4',
      userId: 'user1',
      artisanId: 'artisan4',
      serviceId: 'service4',
      serviceName: 'Carpentry',
      artisanName: 'Kofi Addo',
      artisanAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      artisanLocation: { latitude: 40.7589, longitude: -73.9851 },
      userLocation: { latitude: 40.7589, longitude: -73.9851 },
      scheduledDate: new Date('2024-01-18'),
      scheduledTime: '11:00 AM',
      duration: 240,
      price: 200.00,
      status: [
        {
          id: 'status4',
          status: 'completed',
          timestamp: new Date('2024-01-18T15:00:00'),
          message: 'Service completed successfully',
        },
      ],
      currentStatus: 'completed',
      description: 'Custom bookshelf installation',
      specialRequests: 'Use mahogany wood finish',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-18'),
    },
    {
      id: '5',
      userId: 'user1',
      artisanId: 'artisan5',
      serviceId: 'service5',
      serviceName: 'Painting',
      artisanName: 'Efua Sarpong',
      artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      artisanLocation: { latitude: 40.7128, longitude: -74.0060 },
      userLocation: { latitude: 40.7589, longitude: -73.9851 },
      scheduledDate: new Date('2024-01-22'),
      scheduledTime: '8:00 AM',
      duration: 300,
      price: 180.00,
      status: [
        {
          id: 'status5',
          status: 'cancelled',
          timestamp: new Date('2024-01-21T10:00:00'),
          message: 'Booking cancelled by user',
        },
      ],
      currentStatus: 'cancelled',
      description: 'Paint living room and kitchen',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-21'),
    },
  ];

  useEffect(() => {
    // Initialize with sample data
    if (bookings.length === 0) {
      // In a real app, this would be fetched from API
      setLoading(false);
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleBookingPress = (booking: Booking) => {
    navigation.navigate('BookingDetail', { booking });
  };

  const handleCreateBooking = () => {
    try {
      navigation.navigate('Search');
    } catch (error) {
      // Fallback if Search screen is not available
      console.log('Search screen not available, navigating to Home');
      navigation.navigate('Home');
    }
  };

  const getFilteredBookingsData = () => {
    if (selectedFilter === 'all') return sampleBookings;
    return sampleBookings.filter(booking => booking.currentStatus === selectedFilter);
  };

  const getStatusCount = (status: string) => {
    if (status === 'all') return sampleBookings.length;
    return sampleBookings.filter(booking => booking.currentStatus === status).length;
  };

  const renderFilterButton = (filter: string, label: string) => {
    const isSelected = selectedFilter === filter;
    const count = getStatusCount(filter);
    
    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          {
            backgroundColor: isSelected ? colors.primary : colors.background.secondary,
            borderColor: isSelected ? colors.primary : colors.border,
          }
        ]}
        onPress={() => setSelectedFilter(filter)}
      >
        <Text style={[
          styles.filterButtonText,
          { color: isSelected ? colors.background.primary : colors.text.secondary }
        ]}>
          {label}
        </Text>
        <View style={[
          styles.filterCount,
          { backgroundColor: isSelected ? colors.background.primary + '20' : colors.text.secondary + '20' }
        ]}>
          <Text style={[
            styles.filterCountText,
            { color: isSelected ? colors.background.primary : colors.text.secondary }
          ]}>
            {count}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIcon, { backgroundColor: colors.primary + '20' }]}>
        <Ionicons name="calendar-outline" size={48} color={colors.primary} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
        No Bookings Found
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.text.secondary }]}>
        {selectedFilter === 'all' 
          ? "You haven't made any bookings yet. Start by finding an artisan!"
          : `No ${selectedFilter} bookings found.`
        }
      </Text>
      <TouchableOpacity
        style={[styles.emptyActionButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="search-outline" size={20} color={colors.background.primary} />
        <Text style={[styles.emptyActionText, { color: colors.background.primary }]}>
          Find Artisans
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <BookingCard
      booking={item}
      onPress={() => handleBookingPress(item)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background.primary} 
      />
      
      {/* Header */}
      <LinearGradient
        colors={currentTheme.gradient as [string, string, string]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
              My Bookings
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              Manage your service appointments
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: colors.background.primary + '20' }]}
            onPress={handleCreateBooking}
          >
            <Ionicons name="add-outline" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filter Tabs */}
      <View style={[styles.filterContainer, { backgroundColor: colors.background.primary }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {renderFilterButton('all', 'All')}
          {renderFilterButton('pending', 'Pending')}
          {renderFilterButton('confirmed', 'Confirmed')}
          {renderFilterButton('in_progress', 'In Progress')}
          {renderFilterButton('completed', 'Completed')}
          {renderFilterButton('cancelled', 'Cancelled')}
        </ScrollView>
      </View>

      {/* Bookings List */}
      <FlatList
        data={getFilteredBookingsData()}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContainer,
          { paddingBottom: insets.bottom + 20 }
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  filterScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterCount: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  filterCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  separator: {
    height: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  emptyActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyActionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingScreen; 