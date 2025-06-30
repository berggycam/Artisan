import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import fonts from '../../constants/fonts';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

// Mock activity data
const activityHistory = [
  {
    id: '1',
    type: 'booking',
    service: 'Plumbing Repair',
    artisan: 'John Smith',
    status: 'completed',
    time: '2 hours ago',
    date: '2024-01-15',
    amount: 120,
    rating: 5,
  },
  {
    id: '2',
    type: 'chat',
    service: 'Electrical Work',
    artisan: 'Sarah Johnson',
    status: 'pending',
    time: '1 day ago',
    date: '2024-01-14',
    amount: null,
    rating: null,
  },
  {
    id: '3',
    type: 'booking',
    service: 'House Cleaning',
    artisan: 'Lisa Wilson',
    status: 'completed',
    time: '3 days ago',
    date: '2024-01-12',
    amount: 80,
    rating: 4,
  },
  {
    id: '4',
    type: 'booking',
    service: 'Carpentry Work',
    artisan: 'Mike Davis',
    status: 'cancelled',
    time: '1 week ago',
    date: '2024-01-08',
    amount: 150,
    rating: null,
  },
  {
    id: '5',
    type: 'chat',
    service: 'Painting Service',
    artisan: 'David Brown',
    status: 'pending',
    time: '1 week ago',
    date: '2024-01-07',
    amount: null,
    rating: null,
  },
];

const ActivityHistoryScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredActivities = activityHistory.filter(activity => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'bookings') return activity.type === 'booking';
    if (selectedFilter === 'chats') return activity.type === 'chat';
    if (selectedFilter === 'completed') return activity.status === 'completed';
    if (selectedFilter === 'pending') return activity.status === 'pending';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return currentTheme.colors.success;
      case 'pending':
        return currentTheme.colors.warning;
      case 'cancelled':
        return currentTheme.colors.error;
      default:
        return currentTheme.colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const handleActivityPress = (activity: typeof activityHistory[0]) => {
    navigation.navigate('ActivityDetails', { activity });
  };

  const renderActivityItem = ({ item }: { item: typeof activityHistory[0] }) => (
    <TouchableOpacity
      style={styles.activityItem}
      onPress={() => handleActivityPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.activityIcon}>
        <Ionicons 
          name={item.type === 'booking' ? 'checkmark-circle' : 'chatbubble-ellipses'} 
          size={24} 
          color={item.status === 'completed' ? currentTheme.colors.success : currentTheme.colors.warning} 
        />
      </View>
      
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>
            {item.service} with {item.artisan}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.activityTime}>{item.time}</Text>
        
        {item.amount && (
          <Text style={styles.activityAmount}>${item.amount}</Text>
        )}
        
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={currentTheme.colors.warning} />
            <Text style={styles.ratingText}>{item.rating}/5</Text>
          </View>
        )}
      </View>
      
      <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderFilterButton = (filter: string, label: string, icon: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.filterButtonActive
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Ionicons 
        name={icon as any} 
        size={16} 
        color={selectedFilter === filter ? currentTheme.colors.primary : currentTheme.colors.textSecondary} 
      />
      <Text style={[
        styles.filterButtonText,
        selectedFilter === filter && styles.filterButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={currentTheme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activity History</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <FlatList
          data={[
            { filter: 'all', label: 'All', icon: 'list' },
            { filter: 'bookings', label: 'Bookings', icon: 'calendar' },
            { filter: 'chats', label: 'Chats', icon: 'chatbubbles' },
            { filter: 'completed', label: 'Completed', icon: 'checkmark-circle' },
            { filter: 'pending', label: 'Pending', icon: 'time' },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => renderFilterButton(item.filter, item.label, item.icon)}
          keyExtractor={item => item.filter}
        />
      </View>

      {/* Results Summary */}
      <View style={styles.resultsContainer}>
        <Text style={[styles.resultsText, { color: currentTheme.colors.textSecondary }]}>
          {filteredActivities.length} activity{filteredActivities.length !== 1 ? 'ies' : ''} found
        </Text>
      </View>

      {/* Activity List */}
      <FlatList
        data={filteredActivities}
        keyExtractor={item => item.id}
        renderItem={renderActivityItem}
        contentContainerStyle={styles.activitiesContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={64} color={currentTheme.colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: currentTheme.colors.text }]}>No activities found</Text>
            <Text style={[styles.emptySubtitle, { color: currentTheme.colors.textSecondary }]}>
              Try adjusting your filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  filterContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  filterList: {
    paddingHorizontal: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterButtonActive: {
    // Will be applied inline
  },
  filterButtonText: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: fonts.medium,
  },
  filterButtonTextActive: {
    // Will be applied inline
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  resultsText: {
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  activitiesContainer: {
    paddingHorizontal: 20,
    paddingBottom: isSmallScreen ? 100 : 120,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
    fontFamily: fonts.medium,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: fonts.medium,
  },
  activityTime: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: fonts.regular,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: fonts.bold,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: fonts.regular,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: fonts.medium,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },
});

export default ActivityHistoryScreen; 