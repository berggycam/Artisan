import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  TextInput,
  Dimensions,
  Modal,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

// Mock conversations data
const mockConversations = [
  {
    id: '1',
    artisanName: 'Kwame Asante',
    artisanSpecialty: 'Vulcanizer',
    lastMessage: 'I\'ll be there in 10 minutes',
    timestamp: '2 min ago',
    unreadCount: 2,
    avatar: null,
    online: true,
    lastMessageType: 'text'
  },
  {
    id: '2',
    artisanName: 'Akosua Mensah',
    artisanSpecialty: 'Seamstress',
    lastMessage: 'The dress is ready for pickup',
    timestamp: '1 hour ago',
    unreadCount: 0,
    avatar: null,
    online: false,
    lastMessageType: 'text'
  },
  {
    id: '3',
    artisanName: 'Ibrahim Mohammed',
    artisanSpecialty: 'Phone Repair',
    lastMessage: '📱 Your phone is fixed',
    timestamp: '3 hours ago',
    unreadCount: 1,
    avatar: null,
    online: true,
    lastMessageType: 'text'
  },
  {
    id: '4',
    artisanName: 'Kofi Amponsah',
    artisanSpecialty: 'Welder',
    lastMessage: 'Can you send the location again?',
    timestamp: 'Yesterday',
    unreadCount: 0,
    avatar: null,
    online: false,
    lastMessageType: 'text'
  },
  {
    id: '5',
    artisanName: 'Ama Serwaa',
    artisanSpecialty: 'Hair Stylist',
    lastMessage: 'I\'m running 15 minutes late',
    timestamp: '2 days ago',
    unreadCount: 0,
    avatar: null,
    online: false,
    lastMessageType: 'text'
  }
];

const ChatScreen: React.FC = ({ navigation }: any) => {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [showMenu, setShowMenu] = useState(false);

  const filteredConversations = conversations.filter(conv =>
    conv.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.artisanSpecialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const markAllAsRead = () => {
    setConversations(prev => 
      prev.map(conv => ({ ...conv, unreadCount: 0 }))
    );
    setShowMenu(false);
  };

  const clearAllConversations = () => {
    Alert.alert(
      'Clear All Conversations',
      'Are you sure you want to clear all conversations? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            setConversations([]);
            setShowMenu(false);
          }
        }
      ]
    );
  };

  const exportConversations = () => {
    // This would typically export to a file or share
    Alert.alert(
      'Export Conversations',
      'Conversations would be exported here. This feature will be available in a future update.',
      [{ text: 'OK', onPress: () => setShowMenu(false) }]
    );
  };

  const openChatSettings = () => {
    setShowMenu(false);
    navigation.navigate('ChatSettings');
  };

  const menuOptions = [
    {
      id: 'mark-read',
      title: 'Mark All as Read',
      icon: 'checkmark-done-outline',
      action: markAllAsRead,
      color: colors.success
    },
    {
      id: 'clear-all',
      title: 'Clear All Conversations',
      icon: 'trash-outline',
      action: clearAllConversations,
      color: colors.error
    },
    {
      id: 'export',
      title: 'Export Conversations',
      icon: 'download-outline',
      action: exportConversations,
      color: colors.secondary
    },
    {
      id: 'settings',
      title: 'Chat Settings',
      icon: 'settings-outline',
      action: openChatSettings,
      color: colors.text
    }
  ];

  const renderMenuOption = (option: typeof menuOptions[0]) => (
    <TouchableOpacity
      key={option.id}
      style={[styles.menuOption, { borderBottomColor: colors.border }]}
      onPress={option.action}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIcon, { backgroundColor: option.color + '20' }]}>
        <Ionicons name={option.icon as any} size={20} color={option.color} />
      </View>
      <Text style={[styles.menuText, { color: colors.text }]}>{option.title}</Text>
      <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderConversation = ({ item }: { item: typeof mockConversations[0] }) => (
    <TouchableOpacity 
      style={[styles.conversationCard, { 
        backgroundColor: colors.surface,
        borderBottomColor: colors.border 
      }]}
      onPress={() => navigation.navigate('ChatDetail', { conversation: item })}
      activeOpacity={0.8}
    >
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { 
          backgroundColor: colors.tanLight,
          borderColor: colors.border 
        }]}>
          <Ionicons name="person" size={24} color={colors.textSecondary} />
        </View>
        {item.online && <View style={[styles.onlineIndicator, { 
          backgroundColor: colors.success,
          borderColor: colors.surface 
        }]} />}
      </View>
      
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text style={[styles.artisanName, { color: colors.text }]}>{item.artisanName}</Text>
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{item.timestamp}</Text>
        </View>
        
        <View style={styles.conversationFooter}>
          <Text style={[styles.artisanSpecialty, { color: colors.bronze }]}>{item.artisanSpecialty}</Text>
          {item.unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: colors.bronze }]}>
              <Text style={[styles.unreadCount, { color: colors.background }]}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
        
        <Text style={[styles.lastMessage, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={[styles.header, { borderBottomColor: colors.border }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Messages</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>{conversations.length} conversations</Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.headerButton, { 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }]}>
              <Ionicons name="search-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.headerButton, { 
                backgroundColor: colors.surface,
                borderColor: colors.border 
              }]}
              onPress={() => setShowMenu(true)}
            >
              <Ionicons name="ellipsis-vertical" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { 
            backgroundColor: colors.surface,
            borderColor: colors.border 
          }]}>
            <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search conversations..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>

      {/* Conversations List */}
      <FlatList
        data={filteredConversations}
        keyExtractor={item => item.id}
        renderItem={renderConversation}
        contentContainerStyle={styles.conversationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No conversations yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>Start chatting with artisans to see your messages here</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={[styles.fab, { 
        backgroundColor: colors.bronze,
        shadowColor: colors.bronze 
      }]} onPress={() => navigation.navigate('NewChat')}>
        <Ionicons name="add" size={24} color={colors.background} />
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={[styles.menuContainer, { backgroundColor: colors.surface }]}>
            <View style={[styles.menuHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.menuTitle, { color: colors.text }]}>Messages Options</Text>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.menuContent}>
              {menuOptions.map(renderMenuOption)}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchContainer: {
    marginTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  conversationsList: {
    paddingBottom: 100, // Space for FAB
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  artisanName: {
    fontSize: 16,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 12,
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  artisanSpecialty: {
    fontSize: 14,
    fontWeight: '600',
  },
  unreadBadge: {
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '700',
  },
  lastMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  menuContent: {
    gap: 16,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
});

export default ChatScreen; 