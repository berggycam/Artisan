import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Switch,
  Dimensions,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

const ChatSettingsScreen: React.FC = ({ navigation }: any) => {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();
  
  // Notification Settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [messagePreview, setMessagePreview] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [quietHours, setQuietHours] = useState(false);
  const [quietStartTime, setQuietStartTime] = useState('22:00');
  const [quietEndTime, setQuietEndTime] = useState('08:00');

  // Privacy Settings
  const [readReceipts, setReadReceipts] = useState(true);
  const [typingIndicator, setTypingIndicator] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [lastSeen, setLastSeen] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState(3);

  // Appearance Settings
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('Medium');
  const [bubbleStyle, setBubbleStyle] = useState('Rounded');
  const [chatBackground, setChatBackground] = useState('Default');

  // Data & Storage
  const [autoDownload, setAutoDownload] = useState(true);
  const [saveMedia, setSaveMedia] = useState(true);
  const [chatBackup, setChatBackup] = useState(true);
  const [storageUsed, setStorageUsed] = useState('156 MB');

  const renderSectionHeader = (title: string, icon: string) => (
    <View style={[styles.sectionHeader, { 
      backgroundColor: colors.surface,
      borderBottomColor: colors.border 
    }]}>
      <View style={[styles.sectionIcon, { backgroundColor: colors.bronze + '20' }]}>
        <Ionicons name={icon as any} size={20} color={colors.bronze} />
      </View>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
    </View>
  );

  const renderSettingItem = (
    title: string, 
    subtitle?: string, 
    type: 'switch' | 'chevron' | 'value' = 'switch',
    value?: any,
    onPress?: () => void,
    onValueChange?: (value: boolean) => void
  ) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={type === 'chevron' ? 0.7 : 1}
    >
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        {subtitle && <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
      </View>
      
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.border, true: colors.bronze + '40' }}
          thumbColor={value ? colors.bronze : colors.textSecondary}
          ios_backgroundColor={colors.border}
        />
      )}
      
      {type === 'chevron' && (
        <View style={styles.chevronContainer}>
          {value && <Text style={[styles.settingValue, { color: colors.textSecondary }]}>{value}</Text>}
          <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
        </View>
      )}
      
      {type === 'value' && (
        <Text style={[styles.settingValue, { color: colors.textSecondary }]}>{value}</Text>
      )}
    </TouchableOpacity>
  );

  const clearChatHistory = () => {
    Alert.alert(
      'Clear Chat History',
      'This will delete all your chat messages. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Chat history has been cleared.');
          }
        }
      ]
    );
  };

  const exportChatData = () => {
    Alert.alert(
      'Export Chat Data',
      'Your chat data will be exported and saved to your device.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Export', 
          onPress: () => {
            Alert.alert('Success', 'Chat data has been exported successfully.');
          }
        }
      ]
    );
  };

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
          
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Chat Settings</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Customize your messaging experience</Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notifications Section */}
        <View style={styles.section}>
          {renderSectionHeader('Notifications', 'notifications-outline')}
          
          <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
            {renderSettingItem(
              'Push Notifications',
              'Receive notifications for new messages',
              'switch',
              pushNotifications,
              undefined,
              setPushNotifications
            )}
            
            {renderSettingItem(
              'Message Preview',
              'Show message content in notifications',
              'switch',
              messagePreview,
              undefined,
              setMessagePreview
            )}
            
            {renderSettingItem(
              'Sound',
              'Play sound for new messages',
              'switch',
              soundEnabled,
              undefined,
              setSoundEnabled
            )}
            
            {renderSettingItem(
              'Vibration',
              'Vibrate for new messages',
              'switch',
              vibrationEnabled,
              undefined,
              setVibrationEnabled
            )}
            
            {renderSettingItem(
              'Quiet Hours',
              'Silence notifications during specific hours',
              'switch',
              quietHours,
              undefined,
              setQuietHours
            )}
            
            {quietHours && (
              <>
                {renderSettingItem(
                  'Start Time',
                  'When quiet hours begin',
                  'chevron',
                  quietStartTime,
                  () => navigation.navigate('TimePicker', { type: 'start', currentTime: quietStartTime })
                )}
                
                {renderSettingItem(
                  'End Time',
                  'When quiet hours end',
                  'chevron',
                  quietEndTime,
                  () => navigation.navigate('TimePicker', { type: 'end', currentTime: quietEndTime })
                )}
              </>
            )}
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          {renderSectionHeader('Privacy', 'shield-outline')}
          
          <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
            {renderSettingItem(
              'Read Receipts',
              'Show when you\'ve read messages',
              'switch',
              readReceipts,
              undefined,
              setReadReceipts
            )}
            
            {renderSettingItem(
              'Typing Indicator',
              'Show when you\'re typing',
              'switch',
              typingIndicator,
              undefined,
              setTypingIndicator
            )}
            
            {renderSettingItem(
              'Online Status',
              'Show when you\'re online',
              'switch',
              onlineStatus,
              undefined,
              setOnlineStatus
            )}
            
            {renderSettingItem(
              'Last Seen',
              'Show when you were last active',
              'switch',
              lastSeen,
              undefined,
              setLastSeen
            )}
            
            {renderSettingItem(
              'Blocked Users',
              'Manage blocked contacts',
              'chevron',
              `${blockedUsers} users`,
              () => navigation.navigate('BlockedUsers')
            )}
          </View>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          {renderSectionHeader('Appearance', 'color-palette-outline')}
          
          <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
            {renderSettingItem(
              'Dark Mode',
              'Use dark theme for chats',
              'switch',
              darkMode,
              undefined,
              setDarkMode
            )}
            
            {renderSettingItem(
              'Font Size',
              'Adjust text size in messages',
              'chevron',
              fontSize,
              () => navigation.navigate('FontSize')
            )}
            
            {renderSettingItem(
              'Bubble Style',
              'Choose message bubble appearance',
              'chevron',
              bubbleStyle,
              () => navigation.navigate('BubbleStyle')
            )}
            
            {renderSettingItem(
              'Chat Background',
              'Customize chat background',
              'chevron',
              chatBackground,
              () => navigation.navigate('ChatBackground')
            )}
          </View>
        </View>

        {/* Data & Storage Section */}
        <View style={styles.section}>
          {renderSectionHeader('Data & Storage', 'folder-outline')}
          
          <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
            {renderSettingItem(
              'Auto-download Media',
              'Automatically download images and videos',
              'switch',
              autoDownload,
              undefined,
              setAutoDownload
            )}
            
            {renderSettingItem(
              'Save Media to Gallery',
              'Save received media to your device',
              'switch',
              saveMedia,
              undefined,
              setSaveMedia
            )}
            
            {renderSettingItem(
              'Chat Backup',
              'Automatically backup chat data',
              'switch',
              chatBackup,
              undefined,
              setChatBackup
            )}
            
            {renderSettingItem(
              'Storage Used',
              'Space taken by chat data',
              'value',
              storageUsed
            )}
            
            {renderSettingItem(
              'Export Chat Data',
              'Download your chat history',
              'chevron',
              undefined,
              exportChatData
            )}
            
            {renderSettingItem(
              'Clear Chat History',
              'Delete all messages permanently',
              'chevron',
              undefined,
              clearChatHistory
            )}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          {renderSectionHeader('About', 'information-circle-outline')}
          
          <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
            {renderSettingItem(
              'Chat Version',
              'Current version of chat system',
              'value',
              'v2.1.0'
            )}
            
            {renderSettingItem(
              'Terms of Service',
              'Read our terms and conditions',
              'chevron',
              undefined,
              () => navigation.navigate('TermsOfService')
            )}
            
            {renderSettingItem(
              'Privacy Policy',
              'How we handle your data',
              'chevron',
              undefined,
              () => navigation.navigate('PrivacyPolicy')
            )}
          </View>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  sectionContent: {
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  settingValue: {
    fontSize: 14,
    marginRight: 8,
  },
  chevronContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatSettingsScreen; 