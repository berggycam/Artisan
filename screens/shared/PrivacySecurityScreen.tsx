import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import layout from '../../constants/layout';

const width = (layout as any).width ?? 375;
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface PrivacyOption {
  icon: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  color?: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  rightElement?: 'chevron' | 'toggle' | 'none';
}

interface PrivacySection {
  group: string;
  options: PrivacyOption[];
}

const PrivacySecurityScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const [locationSharing, setLocationSharing] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [contactSharing, setContactSharing] = useState(false);
  const [dataAnalytics, setDataAnalytics] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [dataRetention, setDataRetention] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  const insets = useSafeAreaInsets();

  const showComingSoon = (feature: string) => {
    Alert.alert(
      'Coming Soon',
      `${feature} feature will be available in a future update.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleTwoFactorAuth = () => {
    Alert.alert(
      'Two-Factor Authentication',
      'This will add an extra layer of security to your account. You\'ll need to enter a code from your phone when signing in.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Enable', 
          onPress: () => {
            setTwoFactorAuth(true);
            showComingSoon('Two-Factor Authentication Setup');
          }
        }
      ]
    );
  };

  const handleDataExport = () => {
    Alert.alert(
      'Export Your Data',
      'This will create a downloadable file containing all your personal data from the app.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Export', 
          onPress: () => showComingSoon('Data Export')
        }
      ]
    );
  };

  const handleAccountDeletion = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => showComingSoon('Account Deletion')
        }
      ]
    );
  };

  const privacySettings: PrivacySection[] = [
    {
      group: 'Data Sharing',
      options: [
        {
          icon: 'location-outline',
          label: 'Location Sharing',
          subtitle: 'Allow app to access your location',
          hasToggle: true,
          toggleValue: locationSharing,
          onToggle: setLocationSharing,
          rightElement: 'toggle',
        },
        {
          icon: 'eye-outline',
          label: 'Profile Visibility',
          subtitle: 'Make your profile visible to others',
          hasToggle: true,
          toggleValue: profileVisibility,
          onToggle: setProfileVisibility,
          rightElement: 'toggle',
        },
        {
          icon: 'people-outline',
          label: 'Contact Sharing',
          subtitle: 'Share contact info with artisans',
          hasToggle: true,
          toggleValue: contactSharing,
          onToggle: setContactSharing,
          rightElement: 'toggle',
        },
        {
          icon: 'analytics-outline',
          label: 'Data Analytics',
          subtitle: 'Help improve app with anonymous data',
          hasToggle: true,
          toggleValue: dataAnalytics,
          onToggle: setDataAnalytics,
          rightElement: 'toggle',
        },
      ],
    },
    {
      group: 'Account Security',
      options: [
        {
          icon: 'shield-checkmark-outline',
          label: 'Two-Factor Authentication',
          subtitle: 'Add extra security to your account',
          hasToggle: true,
          toggleValue: twoFactorAuth,
          onToggle: handleTwoFactorAuth,
          rightElement: 'toggle',
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
        {
          icon: 'time-outline',
          label: 'Session Timeout',
          subtitle: 'Auto-logout after inactivity',
          hasToggle: true,
          toggleValue: sessionTimeout,
          onToggle: setSessionTimeout,
          rightElement: 'toggle',
        },
        {
          icon: 'notifications-outline',
          label: 'Login Notifications',
          subtitle: 'Get notified of new sign-ins',
          hasToggle: true,
          toggleValue: loginNotifications,
          onToggle: setLoginNotifications,
          rightElement: 'toggle',
        },
      ],
    },
    {
      group: 'Data Management',
      options: [
        {
          icon: 'cloud-upload-outline',
          label: 'Data Retention',
          subtitle: 'Keep your data for 2 years',
          hasToggle: true,
          toggleValue: dataRetention,
          onToggle: setDataRetention,
          rightElement: 'toggle',
        },
        {
          icon: 'download-outline',
          label: 'Export My Data',
          subtitle: 'Download all your personal data',
          onPress: handleDataExport,
          rightElement: 'chevron',
        },
        {
          icon: 'trash-outline',
          label: 'Delete Account',
          subtitle: 'Permanently delete your account',
          color: currentTheme.colors.error,
          onPress: handleAccountDeletion,
          rightElement: 'chevron',
        },
      ],
    },
    {
      group: 'Communication Preferences',
      options: [
        {
          icon: 'mail-outline',
          label: 'Marketing Emails',
          subtitle: 'Receive promotional content',
          hasToggle: true,
          toggleValue: marketingEmails,
          onToggle: setMarketingEmails,
          rightElement: 'toggle',
        },
        {
          icon: 'notifications-outline',
          label: 'Push Notifications',
          subtitle: 'Receive app notifications',
          hasToggle: true,
          toggleValue: pushNotifications,
          onToggle: setPushNotifications,
          rightElement: 'toggle',
        },
        {
          icon: 'mail-unread-outline',
          label: 'Email Notifications',
          subtitle: 'Get updates via email',
          hasToggle: true,
          toggleValue: emailNotifications,
          onToggle: setEmailNotifications,
          rightElement: 'toggle',
        },
        {
          icon: 'chatbubble-outline',
          label: 'SMS Notifications',
          subtitle: 'Receive text messages',
          hasToggle: true,
          toggleValue: smsNotifications,
          onToggle: setSmsNotifications,
          rightElement: 'toggle',
        },
      ],
    },
    {
      group: 'Legal',
      options: [
        {
          icon: 'document-text-outline',
          label: 'Terms of Service',
          subtitle: 'Read our terms and conditions',
          onPress: () => navigation.navigate('TermsOfService'),
          rightElement: 'chevron',
        },
        {
          icon: 'shield-outline',
          label: 'Privacy Policy',
          subtitle: 'How we handle your data',
          onPress: () => navigation.navigate('PrivacyPolicy'),
          rightElement: 'chevron',
        },
        {
          icon: 'information-circle-outline',
          label: 'Data Processing',
          subtitle: 'Learn about data processing',
          onPress: () => showComingSoon('Data Processing Information'),
          rightElement: 'chevron',
        },
      ],
    },
  ];

  const renderRightElement = (option: PrivacyOption) => {
    switch (option.rightElement) {
      case 'toggle':
        return (
          <Switch
            value={option.toggleValue}
            onValueChange={option.onToggle}
            trackColor={{ false: '#E0E0E0', true: currentTheme.colors.primary + '40' }}
            thumbColor={option.toggleValue ? currentTheme.colors.primary : '#FFFFFF'}
          />
        );
      case 'chevron':
        return <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.bronze} />;
      default:
        return null;
    }
  };

  const renderSection = (section: PrivacySection) => (
    <View key={section.group} style={styles.section}>
      <Text style={[styles.sectionTitle, { color: currentTheme.colors.brownDark }]}>{section.group}</Text>
      <View style={[
        styles.sectionContent, 
        { 
          shadowColor: currentTheme.colors.brownDark,
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }
      ]}>
        {section.options.map((option, index) => (
          <TouchableOpacity
            key={option.label}
            style={[
              styles.option,
              { borderBottomColor: currentTheme.colors.border },
              index === section.options.length - 1 && styles.lastOption
            ]}
            onPress={option.onPress}
            disabled={!option.onPress}
          >
            <View style={styles.optionLeft}>
              <View style={[
                styles.iconContainer, 
                { backgroundColor: currentTheme.colors.bronze + '20' }
              ]}>
                <Ionicons 
                  name={option.icon as any} 
                  size={responsiveSize(20)} 
                  color={option.color || currentTheme.colors.bronze} 
                />
              </View>
              <View style={styles.optionText}>
                <Text style={[styles.optionLabel, { color: currentTheme.colors.brownDark }]}>{option.label}</Text>
                {option.subtitle && (
                  <Text style={[styles.optionSubtitle, { color: currentTheme.colors.brownDark }]}>{option.subtitle}</Text>
                )}
              </View>
            </View>
            {renderRightElement(option)}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[currentTheme.colors.tanLight, currentTheme.colors.tan, currentTheme.colors.tanDark]}
      style={styles.gradientBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView 
        style={[styles.container, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={[
              styles.headerIconBtn, 
              { 
                shadowColor: currentTheme.colors.brownDark,
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={currentTheme.colors.brownDark} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: currentTheme.colors.brownDark }]}>Privacy & Security</Text>
        </View>

        <View style={[
          styles.securityCard, 
          { 
            shadowColor: currentTheme.colors.brownDark,
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }
        ]}>
          <View style={styles.securityHeader}>
            <Ionicons name="shield-checkmark" size={28} color={currentTheme.colors.success} />
            <Text style={[styles.securityTitle, { color: currentTheme.colors.brownDark }]}>Security Status</Text>
          </View>
          <Text style={[styles.securitySubtitle, { color: currentTheme.colors.textSecondary }]}>
            Your account is well protected with current security settings
          </Text>
          <View style={styles.securityMetrics}>
            <View style={styles.metric}>
              <Text style={[styles.metricValue, { color: currentTheme.colors.success }]}>3</Text>
              <Text style={[styles.metricLabel, { color: currentTheme.colors.brownDark }]}>Active</Text>
            </View>
            <View style={[styles.metricDivider, { backgroundColor: currentTheme.colors.border }]} />
            <View style={styles.metric}>
              <Text style={[styles.metricValue, { color: currentTheme.colors.success }]}>1</Text>
              <Text style={[styles.metricLabel, { color: currentTheme.colors.brownDark }]}>Recommended</Text>
            </View>
          </View>
        </View>

        {privacySettings.map(renderSection)}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  container: {
    paddingTop: responsiveSize(20),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(24),
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: responsiveSize(24),
    fontWeight: '700',
    textAlign: 'center',
  },
  securityCard: {
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(24),
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
  },
  securityTitle: {
    fontSize: responsiveSize(18),
    fontWeight: '700',
    marginLeft: responsiveSize(12),
  },
  securitySubtitle: {
    fontSize: responsiveSize(14),
    marginBottom: responsiveSize(16),
    lineHeight: responsiveSize(20),
  },
  securityMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: responsiveSize(24),
    fontWeight: '700',
  },
  metricLabel: {
    fontSize: responsiveSize(12),
    marginTop: responsiveSize(4),
  },
  metricDivider: {
    width: 1,
    height: responsiveSize(30),
    marginHorizontal: responsiveSize(20),
  },
  section: {
    marginBottom: responsiveSize(24),
  },
  sectionTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    marginBottom: responsiveSize(12),
    paddingHorizontal: responsiveSize(20),
  },
  sectionContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    marginHorizontal: responsiveSize(20),
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    borderBottomWidth: 1,
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    borderRadius: responsiveSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveSize(12),
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    marginBottom: responsiveSize(2),
  },
  optionSubtitle: {
    fontSize: responsiveSize(13),
    lineHeight: responsiveSize(18),
  },
});

export default PrivacySecurityScreen; 