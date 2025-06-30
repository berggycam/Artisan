import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

// Mock messages data
const mockMessages = [
  {
    id: '1',
    text: 'Hi, I need a haircut appointment for this weekend',
    timestamp: '2024-01-15 10:30',
    sender: 'user',
    conversationId: '1',
    artisanName: 'Sarah Johnson'
  },
  {
    id: '2',
    text: 'Sure! I have availability on Saturday at 2 PM',
    timestamp: '2024-01-15 10:32',
    sender: 'artisan',
    conversationId: '1',
    artisanName: 'Sarah Johnson'
  },
  {
    id: '3',
    text: 'Perfect! I\'ll book that appointment',
    timestamp: '2024-01-15 10:35',
    sender: 'user',
    conversationId: '1',
    artisanName: 'Sarah Johnson'
  },
  {
    id: '4',
    text: 'What services do you offer for hair coloring?',
    timestamp: '2024-01-10 14:20',
    sender: 'user',
    conversationId: '2',
    artisanName: 'Mike Davis'
  },
  {
    id: '5',
    text: 'I offer highlights, balayage, and full color treatments',
    timestamp: '2024-01-10 14:25',
    sender: 'artisan',
    conversationId: '2',
    artisanName: 'Mike Davis'
  },
  {
    id: '6',
    text: 'Can you send me some examples of your work?',
    timestamp: '2024-01-10 14:30',
    sender: 'user',
    conversationId: '2',
    artisanName: 'Mike Davis'
  },
  {
    id: '7',
    text: 'I need to reschedule my appointment for next week',
    timestamp: '2024-01-08 09:15',
    sender: 'user',
    conversationId: '3',
    artisanName: 'Emma Wilson'
  },
  {
    id: '8',
    text: 'No problem! What day works better for you?',
    timestamp: '2024-01-08 09:20',
    sender: 'artisan',
    conversationId: '3',
    artisanName: 'Emma Wilson'
  }
];

const SearchMessagesScreen: React.FC = ({ navigation, route }: any) => {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'sent' | 'received'>('all');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const filters = [
    { key: 'all', label: 'All Messages' },
    { key: 'sent', label: 'Sent' },
    { key: 'received', label: 'Received' }
  ];

  const timeFilters = [
    { key: 'all', label: 'All Time' },
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' }
  ];

  const filteredMessages = useMemo(() => {
    let filtered = mockMessages;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(message =>
        message.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.artisanName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by message type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(message =>
        selectedFilter === 'sent' ? message.sender === 'user' : message.sender === 'artisan'
      );
    }

    // Filter by time (simplified for demo)
    if (selectedTimeFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      filtered = filtered.filter(message => {
        const messageDate = new Date(message.timestamp);
        switch (selectedTimeFilter) {
          case 'today':
            return messageDate >= today;
          case 'week':
            return messageDate >= weekAgo;
          case 'month':
            return messageDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchQuery, selectedFilter, selectedTimeFilter]);

  const renderMessageItem = ({ item }: { item: typeof mockMessages[0] }) => (
    <TouchableOpacity style={[styles.messageItem, { 
      backgroundColor: colors.surface,
      borderColor: colors.border 
    }]}>
      <View style={styles.messageHeader}>
        <Text style={[styles.artisanName, { color: colors.text }]}>{item.artisanName}</Text>
        <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{item.timestamp}</Text>
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.senderIndicator}>
          <Ionicons 
            name={item.sender === 'user' ? 'person' : 'business'} 
            size={16} 
            color={item.sender === 'user' ? colors.bronze : colors.success} 
          />
          <Text style={[styles.senderLabel, { color: colors.textSecondary }]}>
            {item.sender === 'user' ? 'You' : 'Artisan'}
          </Text>
        </View>
        
        <Text style={[styles.messageText, { color: colors.text }]} numberOfLines={2}>
          {item.text}
        </Text>
      </View>
      
      <TouchableOpacity style={[styles.viewButton, { borderTopColor: colors.border }]}>
        <Text style={[styles.viewButtonText, { color: colors.bronze }]}>View in Chat</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.bronze} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderFilterChip = (filter: typeof filters[0], isActive: boolean, onPress: () => void) => (
    <TouchableOpacity
      key={filter.key}
      style={[
        styles.filterChip, 
        { 
          backgroundColor: isActive ? colors.bronze : colors.surface,
          borderColor: isActive ? colors.bronze : colors.border 
        }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.filterChipText, 
        { color: isActive ? colors.background : colors.textSecondary }
      ]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { color: colors.text }]}>Search Messages</Text>
          
          <TouchableOpacity style={styles.clearButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { 
          backgroundColor: colors.surface,
          borderColor: colors.border 
        }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search messages..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <Text style={[styles.filtersTitle, { color: colors.text }]}>Message Type</Text>
        <View style={styles.filtersRow}>
          {filters.map(filter => 
            renderFilterChip(
              filter, 
              selectedFilter === filter.key, 
              () => setSelectedFilter(filter.key as any)
            )
          )}
        </View>
        
        <Text style={[styles.filtersTitle, { color: colors.text }]}>Time Period</Text>
        <View style={styles.filtersRow}>
          {timeFilters.map(filter => 
            renderFilterChip(
              filter, 
              selectedTimeFilter === filter.key, 
              () => setSelectedTimeFilter(filter.key as any)
            )
          )}
        </View>
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <Text style={[styles.resultsTitle, { color: colors.text }]}>
            {filteredMessages.length} {filteredMessages.length === 1 ? 'result' : 'results'} found
          </Text>
          {filteredMessages.length > 0 && (
            <TouchableOpacity style={styles.sortButton}>
              <Ionicons name="funnel-outline" size={16} color={colors.bronze} />
              <Text style={[styles.sortButtonText, { color: colors.bronze }]}>Sort</Text>
            </TouchableOpacity>
          )}
        </View>

        {filteredMessages.length > 0 ? (
          <FlatList
            data={filteredMessages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>No messages found</Text>
            <Text style={[styles.emptyStateSubtitle, { color: colors.textSecondary }]}>
              Try adjusting your search terms or filters
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  clearButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  messagesList: {
    paddingBottom: 20,
  },
  messageItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  artisanName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
  },
  messageContent: {
    marginBottom: 12,
  },
  senderIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  senderLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default SearchMessagesScreen; 