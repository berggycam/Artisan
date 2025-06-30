import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal,
  Alert,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

// Mock messages data
const mockMessages = [
  {
    id: '1',
    text: 'Hi! I need help with a flat tire',
    sender: 'user',
    timestamp: '10:30 AM',
    status: 'sent'
  },
  {
    id: '2',
    text: 'Hello! I can help you with that. Where are you located?',
    sender: 'artisan',
    timestamp: '10:32 AM',
    status: 'read'
  },
  {
    id: '3',
    text: 'I\'m at Tema Station, near the main entrance',
    sender: 'user',
    timestamp: '10:33 AM',
    status: 'sent'
  },
  {
    id: '4',
    text: 'Perfect! I\'ll be there in 10 minutes. What type of vehicle?',
    sender: 'artisan',
    timestamp: '10:34 AM',
    status: 'read'
  },
  {
    id: '5',
    text: 'Toyota Corolla, white color',
    sender: 'user',
    timestamp: '10:35 AM',
    status: 'sent'
  },
  {
    id: '6',
    text: 'Got it! I\'ll bring the right tools. See you soon! 👍',
    sender: 'artisan',
    timestamp: '10:36 AM',
    status: 'read'
  },
  {
    id: '7',
    text: 'Great, thanks! I\'ll wait here',
    sender: 'user',
    timestamp: '10:37 AM',
    status: 'sent'
  }
];

const ChatDetailScreen: React.FC = ({ navigation, route }: any) => {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();
  
  const { conversation } = route.params;
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sending'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate artisan response after 2 seconds
      setTimeout(() => {
        const responses = [
          'I\'ll be there soon!',
          'Got it, thanks!',
          'Perfect! 👍',
          'On my way!',
          'I\'ll check and get back to you'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const artisanMessage = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'artisan',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        };
        
        setMessages(prev => [...prev, artisanMessage]);
      }, 2000);
    }
  };

  const viewArtisanProfile = () => {
    setShowMenu(false);
    navigation.navigate('ArtisanProfile');
  };

  const searchMessages = () => {
    setShowMenu(false);
    navigation.navigate('SearchMessages');
  };

  const clearChat = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            setMessages([]);
            setShowMenu(false);
            Alert.alert('Success', 'Chat has been cleared.');
          }
        }
      ]
    );
  };

  const blockUser = () => {
    Alert.alert(
      'Block User',
      `Are you sure you want to block ${conversation.artisanName}? You won't be able to receive messages from them.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Block', 
          style: 'destructive',
          onPress: () => {
            setShowMenu(false);
            navigation.goBack();
            Alert.alert('User Blocked', `${conversation.artisanName} has been blocked.`);
          }
        }
      ]
    );
  };

  const reportUser = () => {
    setShowMenu(false);
    navigation.navigate('ReportUser');
  };

  const exportChat = () => {
    setShowMenu(false);
    navigation.navigate('ExportChat');
  };

  const muteNotifications = () => {
    setShowMenu(false);
    navigation.navigate('MuteNotifications');
  };

  const menuOptions = [
    {
      id: 'profile',
      title: 'View Profile',
      subtitle: 'See artisan details and reviews',
      icon: 'person-outline',
      action: viewArtisanProfile,
      color: colors.bronze
    },
    {
      id: 'search',
      title: 'Search Messages',
      subtitle: 'Find specific messages',
      icon: 'search-outline',
      action: searchMessages,
      color: colors.text
    },
    {
      id: 'export',
      title: 'Export Chat',
      subtitle: 'Save chat history',
      icon: 'download-outline',
      action: exportChat,
      color: colors.success
    },
    {
      id: 'mute',
      title: 'Mute Notifications',
      subtitle: 'Stop receiving notifications',
      icon: 'notifications-off-outline',
      action: muteNotifications,
      color: colors.warning
    },
    {
      id: 'clear',
      title: 'Clear Chat',
      subtitle: 'Delete all messages',
      icon: 'trash-outline',
      action: clearChat,
      color: colors.error
    },
    {
      id: 'block',
      title: 'Block User',
      subtitle: 'Block this artisan',
      icon: 'ban-outline',
      action: blockUser,
      color: colors.error
    },
    {
      id: 'report',
      title: 'Report User',
      subtitle: 'Report inappropriate behavior',
      icon: 'flag-outline',
      action: reportUser,
      color: colors.error
    }
  ];

  const renderMenuOption = (option: typeof menuOptions[0], index: number) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles.menuOption,
        { borderBottomColor: colors.border },
        index === menuOptions.length - 1 && styles.menuOptionLast
      ]}
      onPress={option.action}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIcon, { backgroundColor: option.color + '20' }]}>
        <Ionicons name={option.icon as any} size={20} color={option.color} />
      </View>
      <View style={styles.menuInfo}>
        <Text style={[styles.menuTitle, { color: colors.text }]}>{option.title}</Text>
        <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>{option.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: typeof mockMessages[0] }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.artisanMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? 
          [styles.userBubble, { backgroundColor: colors.bronze }] : 
          [styles.artisanBubble, { 
            backgroundColor: colors.surface,
            borderColor: colors.border 
          }]
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'user' ? 
            [styles.userMessageText, { color: colors.background }] : 
            [styles.artisanMessageText, { color: colors.text }]
        ]}>
          {item.text}
        </Text>
        <View style={styles.messageFooter}>
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{item.timestamp}</Text>
          {item.sender === 'user' && (
            <Ionicons 
              name={item.status === 'read' ? 'checkmark-done' : 'checkmark'} 
              size={16} 
              color={item.status === 'read' ? colors.bronze : colors.textSecondary} 
            />
          )}
        </View>
      </View>
    </View>
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
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.artisanInfo}>
            <View style={styles.artisanAvatar}>
              <Ionicons name="person" size={24} color={colors.textSecondary} />
              {conversation.online && <View style={[styles.onlineIndicator, { 
                backgroundColor: colors.success,
                borderColor: colors.background 
              }]} />}
            </View>
            <View style={styles.artisanDetails}>
              <Text style={[styles.artisanName, { color: colors.text }]}>{conversation.artisanName}</Text>
              <Text style={[styles.artisanSpecialty, { color: colors.bronze }]}>{conversation.artisanSpecialty}</Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.headerButton, { 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }]}>
              <Ionicons name="call-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }]}>
              <Ionicons name="videocam-outline" size={24} color={colors.text} />
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
      </LinearGradient>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.messagesContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        {isTyping && (
          <View style={styles.typingIndicator}>
            <Text style={[styles.typingText, { color: colors.textSecondary }]}>{conversation.artisanName} is typing...</Text>
          </View>
        )}
      </KeyboardAvoidingView>

      {/* Message Input */}
      <View style={[styles.inputContainer, { 
        borderTopColor: colors.border,
        backgroundColor: colors.background 
      }]}>
        <View style={[styles.inputWrapper, { 
          backgroundColor: colors.surface,
          borderColor: colors.border 
        }]}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TextInput
            style={[styles.messageInput, { color: colors.text }]}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              newMessage.trim() ? 
                [styles.sendButtonActive, { backgroundColor: colors.bronze }] : 
                [styles.sendButtonInactive, { backgroundColor: colors.surface }]
            ]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={newMessage.trim() ? colors.background : colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </View>

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
          <View style={[styles.menuContainer, { 
            backgroundColor: colors.surface,
            shadowColor: colors.text 
          }]}>
            <View style={[styles.menuHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.menuHeaderTitle, { color: colors.text }]}>Chat Options</Text>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.menuContent} showsVerticalScrollIndicator={false}>
              {menuOptions.map((option, index) => renderMenuOption(option, index))}
            </ScrollView>
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
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  artisanInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  artisanAvatar: {
    position: 'relative',
    marginRight: 12,
  },
  artisanDetails: {
    flex: 1,
  },
  artisanName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  artisanSpecialty: {
    fontSize: 14,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  artisanMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: width * 0.75,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  artisanBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  userMessageText: {
  },
  artisanMessageText: {
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
  },
  typingIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  sendButtonActive: {
  },
  sendButtonInactive: {
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuContainer: {
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  menuHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  menuContent: {
    maxHeight: 400,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  menuOptionLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuInfo: {
    flex: 1,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
});

export default ChatDetailScreen; 