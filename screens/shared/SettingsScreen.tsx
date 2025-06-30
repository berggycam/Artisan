import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, ScrollView, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';
import layout from '../../constants/layout';
import { useAuth } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface SettingsOption {
  icon: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  color?: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  badge?: string;
  rightElement?: 'chevron' | 'toggle' | 'badge' | 'none';
}

interface SettingsSection {
  group: string;
  options: SettingsOption[];
}

const SettingsScreen: React.FC = ({ navigation }: any) => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const { logout } = useAuth();
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    setLogoutVisible(false);
    logout();
  };

  const showComingSoon = (feature: string) => {
    Alert.alert(
      'Coming Soon',
      `${feature} feature will be available in a future update.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  // Calculate bottom padding to account for tab bar
  const getBottomPadding = () => {
    const tabBarHeight = responsiveSize(120);
    const extraPadding = responsiveSize(100);
    return tabBarHeight + extraPadding + insets.bottom;
  };

  const settings: SettingsSection[] = [
    {
      group: 'Account',
      options: [
        {
          icon: 'person-circle-outline',
          label: 'Profile Settings',
          subtitle: 'Update your personal information',
          onPress: () => navigation.navigate('EditProfile'),
          rightElement: 'chevron',
        },
        {
          icon: 'shield-checkmark-outline',
          label: 'Privacy & Security',
          subtitle: 'Manage your account security',
          onPress: () => navigation.navigate('PrivacySecurity'),
          rightElement: 'chevron',
        },
        {
          icon: 'finger-print-outline',
          label: 'Biometric Authentication',
          subtitle: 'Use fingerprint or face unlock',
          hasToggle: true,
          toggleValue: biometricAuth,
          onToggle: setBiometricAuth,
          rightElement: 'toggle',
        },
      ],
    },
    {
      group: 'Notifications',
      options: [
        {
          icon: 'notifications-outline',
          label: 'Push Notifications',
          subtitle: 'Receive alerts and updates',
          hasToggle: true,
          toggleValue: pushNotifications,
          onToggle: setPushNotifications,
          rightElement: 'toggle',
        },
        {
          icon: 'mail-outline',
          label: 'Email Notifications',
          subtitle: 'Get updates via email',
          hasToggle: true,
          toggleValue: emailNotifications,
          onToggle: setEmailNotifications,
          rightElement: 'toggle',
        },
        {
          icon: 'time-outline',
          label: 'Notification Schedule',
          subtitle: 'Set quiet hours and preferences',
          onPress: () => navigation.navigate('NotificationSchedule'),
          rightElement: 'chevron',
        },
      ],
    },
    {
      group: 'Preferences',
      options: [
        {
          icon: 'moon-outline',
          label: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          hasToggle: true,
          toggleValue: darkMode,
          onToggle: setDarkMode,
          rightElement: 'toggle',
        },
        {
          icon: 'language-outline',
          label: 'Language',
          subtitle: 'English (US)',
          onPress: () => navigation.navigate('LanguageSettings'),
          rightElement: 'chevron',
        },
        {
          icon: 'color-palette-outline',
          label: 'Theme Customization',
          subtitle: 'Personalize your experience',
          onPress: () => navigation.navigate('ThemeCustomization'),
          rightElement: 'chevron',
        },
      ],
    },
    {
      group: 'Data & Storage',
      options: [
        {
          icon: 'cloud-upload-outline',
          label: 'Auto Backup',
          subtitle: 'Automatically backup your data',
          hasToggle: true,
          toggleValue: autoBackup,
          onToggle: setAutoBackup,
          rightElement: 'toggle',
        },
        {
          icon: 'folder-outline',
          label: 'Storage Management',
          subtitle: '2.4 GB used of 5 GB',
          onPress: () => navigation.navigate('StorageManagement'),
          rightElement: 'chevron',
        },
        {
          icon: 'download-outline',
          label: 'Export Data',
          subtitle: 'Download your information',
          onPress: () => navigation.navigate('DataExport'),
          rightElement: 'chevron',
        },
      ],
    },
    {
      group: 'Support & Feedback',
      options: [
        {
          icon: 'help-circle-outline',
          label: 'Help Center',
          subtitle: 'Get help and support',
          onPress: () => navigation.navigate('Help'),
          rightElement: 'chevron',
        },
        {
          icon: 'chatbubble-outline',
          label: 'Contact Support',
          subtitle: 'Reach out to our team',
          onPress: () => navigation.navigate('ContactSupport'),
          rightElement: 'chevron',
        },
        {
          icon: 'star-outline',
          label: 'Rate the App',
          subtitle: 'Share your feedback',
          onPress: () => navigation.navigate('RateApp'),
          rightElement: 'chevron',
        },
        {
          icon: 'bug-outline',
          label: 'Report a Bug',
          subtitle: 'Help us improve',
          onPress: () => navigation.navigate('ReportBug'),
          badge: 'New',
          rightElement: 'badge',
        },
      ],
    },
    {
      group: 'About',
      options: [
        {
          icon: 'information-circle-outline',
          label: 'App Version',
          subtitle: 'Version 2.1.0 (Build 421)',
          onPress: () => navigation.navigate('AppVersion'),
          rightElement: 'chevron',
        },
        {
          icon: 'document-text-outline',
          label: 'Terms of Service',
          subtitle: 'Read our terms',
          onPress: () => showComingSoon('Terms of Service'),
          rightElement: 'chevron',
        },
        {
          icon: 'shield-outline',
          label: 'Privacy Policy',
          subtitle: 'How we protect your data',
          onPress: () => showComingSoon('Privacy Policy'),
          rightElement: 'chevron',
        },
      ],
    },
    {
      group: ' ',
      options: [
        {
          icon: 'log-out-outline',
          label: 'Sign Out',
          subtitle: 'Sign out of your account',
          color: colors.error,
          onPress: () => setLogoutVisible(true),
          rightElement: 'none',
        },
      ],
    },
  ];

  const renderRightElement = (option: SettingsOption) => {
    switch (option.rightElement) {
      case 'toggle':
        return (
          <Switch
            value={option.toggleValue}
            onValueChange={option.onToggle}
            trackColor={{ false: '#E0E0E0', true: colors.primary + '40' }}
            thumbColor={option.toggleValue ? colors.primary : '#FFFFFF'}
            ios_backgroundColor="#E0E0E0"
          />
        );
      case 'badge':
        return option.badge ? (
          <View style={[styles.badge, { backgroundColor: colors.error }]}>
            <Text style={styles.badgeText}>{option.badge}</Text>
          </View>
        ) : null;
      case 'chevron':
        return (
          <Ionicons 
            name="chevron-forward" 
            size={responsiveSize(18)} 
            color={colors.primary} 
          />
        );
      case 'none':
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <LinearGradient
        colors={currentTheme.gradient as [string, string, string]}
        style={styles.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Enhanced decorative background elements */}
        <View style={styles.backgroundDecor} pointerEvents="none">
          <View style={[styles.decorCircle, styles.decorCircle1, { backgroundColor: colors.primary }]} />
          <View style={[styles.decorCircle, styles.decorCircle2, { backgroundColor: colors.secondary }]} />
          <View style={[styles.decorCircle, styles.decorCircle3, { backgroundColor: colors.bronze }]} />
          <View style={[styles.decorCircle, styles.decorCircle4, { backgroundColor: colors.gold }]} />
          <View style={[styles.decorRing, styles.decorRing1, { borderColor: colors.brownDark }]} />
          <View style={[styles.decorRing, styles.decorRing2, { borderColor: colors.bronze }]} />
          <View style={[styles.decorRing, styles.decorRing3, { borderColor: colors.gold }]} />
          {/* Floating dots */}
          <View style={[styles.decorDot, styles.decorDot1, { backgroundColor: colors.brownDark }]} />
          <View style={[styles.decorDot, styles.decorDot2, { backgroundColor: colors.bronze }]} />
          <View style={[styles.decorDot, styles.decorDot3, { backgroundColor: colors.gold }]} />
          <View style={[styles.decorDot, styles.decorDot4, { backgroundColor: colors.primary }]} />
        </View>

        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingBottom: getBottomPadding() }]} 
          showsVerticalScrollIndicator={false}
          bounces={true}
          style={styles.scrollView}
        >
          {/* Header with user info */}
          <View style={styles.headerContainer}>
            <View style={[styles.userAvatar, { backgroundColor: colors.background.primary }]}>
              <Ionicons name="person" size={responsiveSize(32)} color={colors.brownDark} />
            </View>
            <Text style={[styles.header, { color: colors.brownDark }]}>Settings</Text>
            <Text style={[styles.headerSubtitle, { color: colors.bronze }]}>Personalize your experience</Text>
          </View>

          {settings.map((section, sectionIndex) => (
            <View key={section.group} style={[
              styles.section, 
              sectionIndex === settings.length - 1 && { marginBottom: responsiveSize(100) }
            ]}>
              {section.group.trim() !== '' && (
                <Text style={[styles.sectionTitle, { color: colors.bronze }]}>{section.group}</Text>
              )}
              <View style={[styles.sectionContainer, { backgroundColor: colors.background.primary }]}>
                {section.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={option.label}
                    style={[
                      styles.optionRow,
                      optionIndex === 0 && styles.firstOption,
                      optionIndex === section.options.length - 1 && styles.lastOption,
                      optionIndex !== section.options.length - 1 && [styles.optionBorder, { borderBottomColor: colors.border }]
                    ]}
                    onPress={option.onPress}
                    activeOpacity={0.7}
                    disabled={option.hasToggle && !option.onPress}
                  >
                    <View style={[
                      styles.iconContainer, 
                      { backgroundColor: colors.background.secondary },
                      option.color && { backgroundColor: `${option.color}15` }
                    ]}>
                      <Ionicons 
                        name={option.icon as any} 
                        size={responsiveSize(22)} 
                        color={option.color || colors.brownDark} 
                      />
                    </View>
                    
                    <View style={styles.optionContent}>
                      <Text style={[styles.optionLabel, { color: colors.brownDark }, option.color && { color: option.color }]}>
                        {option.label}
                      </Text>
                      {option.subtitle && (
                        <Text style={[styles.optionSubtitle, { color: colors.bronze }]}>{option.subtitle}</Text>
                      )}
                    </View>
                    
                    <View style={styles.rightElementContainer}>
                      {renderRightElement(option)}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Enhanced Logout Confirmation Modal */}
        <Modal
          visible={logoutVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setLogoutVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.background.primary }]}>
              <View style={[styles.modalIconContainer, { backgroundColor: colors.error + '20' }]}>
                <Ionicons name="log-out-outline" size={responsiveSize(48)} color={colors.error} />
              </View>
              <Text style={[styles.modalTitle, { color: colors.brownDark }]}>Sign Out</Text>
              <Text style={[styles.modalMessage, { color: colors.brownDark }]}>
                Are you sure you want to sign out? You'll need to sign in again to access your account.
              </Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.background.secondary, borderColor: colors.border }]}
                  onPress={() => setLogoutVisible(false)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.cancelButtonText, { color: colors.text.secondary }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.logoutButton, { backgroundColor: '#CD5C5C' }]}
                  onPress={handleLogout}
                  activeOpacity={0.8}
                >
                  <Text style={styles.logoutButtonText}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: responsiveSize(40),
    paddingHorizontal: responsiveSize(20),
    alignItems: 'center',
    minHeight: height - responsiveSize(120),
  },
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
    opacity: 0.06,
  },
  decorCircle1: {
    width: responsiveSize(280),
    height: responsiveSize(280),
    backgroundColor: '#DEB887',
    top: -responsiveSize(80),
    right: -responsiveSize(80),
  },
  decorCircle2: {
    width: responsiveSize(180),
    height: responsiveSize(180),
    backgroundColor: '#F4A460',
    bottom: -responsiveSize(40),
    left: -responsiveSize(50),
  },
  decorCircle3: {
    width: responsiveSize(120),
    height: responsiveSize(120),
    backgroundColor: '#CD853F',
    top: '25%',
    right: responsiveSize(20),
  },
  decorCircle4: {
    width: responsiveSize(100),
    height: responsiveSize(100),
    backgroundColor: '#DAA520',
    bottom: '35%',
    left: responsiveSize(10),
  },
  decorRing: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
    opacity: 0.08,
  },
  decorRing1: {
    width: responsiveSize(120),
    height: responsiveSize(120),
    borderColor: '#8B4513',
    top: '15%',
    left: responsiveSize(15),
  },
  decorRing2: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    borderColor: '#CD853F',
    bottom: '20%',
    right: responsiveSize(30),
  },
  decorRing3: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderColor: '#DAA520',
    top: '45%',
    left: responsiveSize(50),
  },
  decorDot: {
    position: 'absolute',
    width: responsiveSize(8),
    height: responsiveSize(8),
    borderRadius: responsiveSize(4),
    opacity: 0.1,
  },
  decorDot1: {
    backgroundColor: '#8B4513',
    top: '35%',
    right: responsiveSize(100),
  },
  decorDot2: {
    backgroundColor: '#CD853F',
    top: '55%',
    right: responsiveSize(80),
  },
  decorDot3: {
    backgroundColor: '#DAA520',
    bottom: '40%',
    left: responsiveSize(70),
  },
  decorDot4: {
    backgroundColor: '#B8860B',
    bottom: '60%',
    right: responsiveSize(120),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: responsiveSize(32),
  },
  userAvatar: {
    width: responsiveSize(72),
    height: responsiveSize(72),
    borderRadius: responsiveSize(36),
    backgroundColor: '#FFFEF7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(16),
    shadowColor: '#CD853F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  header: {
    fontSize: responsiveSize(32),
    fontWeight: '800',
    color: '#8B4513',
    marginBottom: responsiveSize(4),
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: responsiveSize(16),
    color: '#B8860B',
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8,
  },
  section: {
    width: '100%',
    marginBottom: responsiveSize(28),
  },
  sectionTitle: {
    fontSize: responsiveSize(14),
    color: '#B8860B',
    fontWeight: '700',
    marginBottom: responsiveSize(12),
    marginLeft: responsiveSize(8),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  sectionContainer: {
    backgroundColor: '#FFFEF7',
    borderRadius: responsiveSize(16),
    shadowColor: '#CD853F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(16),
    minHeight: responsiveSize(64),
  },
  firstOption: {
    borderTopLeftRadius: responsiveSize(16),
    borderTopRightRadius: responsiveSize(16),
  },
  lastOption: {
    borderBottomLeftRadius: responsiveSize(16),
    borderBottomRightRadius: responsiveSize(16),
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  iconContainer: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    borderRadius: responsiveSize(20),
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(16),
  },
  optionContent: {
    flex: 1,
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: responsiveSize(16),
    color: '#8B4513',
    fontWeight: '600',
    marginBottom: responsiveSize(2),
  },
  optionSubtitle: {
    fontSize: responsiveSize(13),
    color: '#B8860B',
    fontWeight: '400',
    opacity: 0.8,
    lineHeight: responsiveSize(18),
  },
  rightElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: responsiveSize(24),
  },
  badge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: responsiveSize(8),
    paddingVertical: responsiveSize(4),
    borderRadius: responsiveSize(12),
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: responsiveSize(11),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF8DC',
    borderTopLeftRadius: responsiveSize(24),
    borderTopRightRadius: responsiveSize(24),
    padding: responsiveSize(32),
    alignItems: 'center',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalIconContainer: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    borderRadius: responsiveSize(40),
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(20),
  },
  modalTitle: {
    fontSize: responsiveSize(24),
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: responsiveSize(8),
  },
  modalMessage: {
    fontSize: responsiveSize(16),
    color: '#8B4513',
    textAlign: 'center',
    lineHeight: responsiveSize(24),
    marginBottom: responsiveSize(32),
    opacity: 0.8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: responsiveSize(16),
  },
  modalButton: {
    flex: 1,
    paddingVertical: responsiveSize(16),
    borderRadius: responsiveSize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#666666',
    fontWeight: '600',
    fontSize: responsiveSize(16),
  },
  logoutButton: {
    backgroundColor: '#CD5C5C',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: responsiveSize(16),
  },
});

export default SettingsScreen;