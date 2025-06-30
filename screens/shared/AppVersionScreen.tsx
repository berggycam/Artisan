import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  Alert,
  Dimensions,
  Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface VersionInfo {
  version: string;
  build: string;
  releaseDate: string;
  size: string;
  changes: string[];
  isLatest: boolean;
}

interface AppDetail {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const AppVersionScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();

  // Current version info
  const currentVersion: VersionInfo = {
    version: '2.1.0',
    build: '421',
    releaseDate: 'December 15, 2024',
    size: '45.2 MB',
    changes: [
      'Enhanced booking system with real-time availability',
      'Improved chat interface with message reactions',
      'Added dark mode and theme customization',
      'Fixed payment processing issues',
      'Performance optimizations and bug fixes',
      'New artisan verification system',
      'Enhanced search and filtering options'
    ],
    isLatest: true
  };

  // Previous versions
  const previousVersions: VersionInfo[] = [
    {
      version: '2.0.5',
      build: '418',
      releaseDate: 'November 28, 2024',
      size: '43.8 MB',
      changes: [
        'Bug fixes and performance improvements',
        'Updated payment gateway integration',
        'Enhanced notification system'
      ],
      isLatest: false
    },
    {
      version: '2.0.0',
      build: '410',
      releaseDate: 'November 10, 2024',
      size: '42.1 MB',
      changes: [
        'Major UI redesign and improved user experience',
        'New booking management system',
        'Enhanced artisan profiles and portfolios',
        'Improved search and discovery features',
        'Added customer reviews and ratings'
      ],
      isLatest: false
    },
    {
      version: '1.5.2',
      build: '395',
      releaseDate: 'October 20, 2024',
      size: '38.9 MB',
      changes: [
        'Security updates and bug fixes',
        'Performance optimizations',
        'Minor UI improvements'
      ],
      isLatest: false
    }
  ];

  // App details
  const appDetails: AppDetail[] = [
    {
      label: 'App Name',
      value: 'Artisan App',
      icon: 'apps-outline',
      color: '#4ECDC4'
    },
    {
      label: 'Version',
      value: `${currentVersion.version} (Build ${currentVersion.build})`,
      icon: 'information-circle-outline',
      color: '#45B7D1'
    },
    {
      label: 'Release Date',
      value: currentVersion.releaseDate,
      icon: 'calendar-outline',
      color: '#96CEB4'
    },
    {
      label: 'App Size',
      value: currentVersion.size,
      icon: 'hardware-chip-outline',
      color: '#FF6B6B'
    },
    {
      label: 'Developer',
      value: 'Artisan Technologies Ltd.',
      icon: 'business-outline',
      color: '#F39C12'
    },
    {
      label: 'Platform',
      value: 'iOS & Android',
      icon: 'phone-portrait-outline',
      color: '#9B59B6'
    }
  ];

  const handleCheckForUpdates = () => {
    Alert.alert(
      'Check for Updates',
      'Checking for available updates...',
      [
        {
          text: 'OK',
          onPress: () => {
            // Simulate update check
            setTimeout(() => {
              Alert.alert(
                'Up to Date',
                'You are using the latest version of Artisan App!',
                [{ text: 'OK' }]
              );
            }, 1500);
          }
        }
      ]
    );
  };

  const handleViewChangelog = () => {
    // In a real app, this would open a web page or detailed changelog
    Alert.alert(
      'Changelog',
      'This would open a detailed changelog page in a real app.',
      [{ text: 'OK' }]
    );
  };

  const handleContactDeveloper = () => {
    Alert.alert(
      'Contact Developer',
      'Would you like to contact the development team?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Email',
          onPress: () => {
            Linking.openURL('mailto:dev@artisanapp.com?subject=App Feedback');
          }
        }
      ]
    );
  };

  const renderAppDetail = (detail: AppDetail) => (
    <View key={detail.label} style={[styles.detailCard, { backgroundColor: colors.surface }]}>
      <View style={styles.detailContent}>
        <View style={[styles.detailIcon, { backgroundColor: detail.color + '20' }]}>
          <Ionicons name={detail.icon as any} size={20} color={detail.color} />
        </View>
        <View style={styles.detailText}>
          <Text style={[styles.detailLabel, { color: colors.text.secondary }]}>
            {detail.label}
          </Text>
          <Text style={[styles.detailValue, { color: colors.text.primary }]}>
            {detail.value}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderVersionCard = (version: VersionInfo, index: number) => (
    <View key={version.version} style={[styles.versionCard, { backgroundColor: colors.surface }]}>
      <View style={styles.versionHeader}>
        <View style={styles.versionInfo}>
          <Text style={[styles.versionNumber, { color: colors.text.primary }]}>
            Version {version.version}
          </Text>
          <Text style={[styles.buildNumber, { color: colors.text.secondary }]}>
            Build {version.build}
          </Text>
        </View>
        <View style={styles.versionMeta}>
          {version.isLatest && (
            <View style={[styles.latestBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.latestText, { color: colors.background.primary }]}>
                Latest
              </Text>
            </View>
          )}
          <Text style={[styles.releaseDate, { color: colors.text.secondary }]}>
            {version.releaseDate}
          </Text>
        </View>
      </View>
      
      <View style={styles.versionDetails}>
        <View style={styles.versionDetail}>
          <Ionicons name="hardware-chip-outline" size={16} color={colors.text.secondary} />
          <Text style={[styles.versionDetailText, { color: colors.text.secondary }]}>
            {version.size}
          </Text>
        </View>
        <View style={styles.versionDetail}>
          <Ionicons name="document-text-outline" size={16} color={colors.text.secondary} />
          <Text style={[styles.versionDetailText, { color: colors.text.secondary }]}>
            {version.changes.length} changes
          </Text>
        </View>
      </View>

      <View style={styles.changesContainer}>
        <Text style={[styles.changesTitle, { color: colors.text.primary }]}>
          What's New:
        </Text>
        {version.changes.map((change, changeIndex) => (
          <View key={changeIndex} style={styles.changeItem}>
            <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
            <Text style={[styles.changeText, { color: colors.text.secondary }]}>
              {change}
            </Text>
          </View>
        ))}
      </View>
    </View>
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
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
              App Version
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              Version information and updates
            </Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* App Icon and Current Version */}
        <View style={[styles.currentVersionCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.appIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="hammer-outline" size={48} color={colors.background.primary} />
          </View>
          <Text style={[styles.appName, { color: colors.text.primary }]}>
            Artisan App
          </Text>
          <Text style={[styles.currentVersion, { color: colors.text.secondary }]}>
            Version {currentVersion.version} (Build {currentVersion.build})
          </Text>
          <View style={[styles.latestBadge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.latestText, { color: colors.background.primary }]}>
              Latest Version
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Quick Actions
          </Text>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: colors.surface }]}
              onPress={handleCheckForUpdates}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="refresh-outline" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.actionTitle, { color: colors.text.primary }]}>
                Check for Updates
              </Text>
              <Text style={[styles.actionSubtitle, { color: colors.text.secondary }]}>
                Look for newer versions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: colors.surface }]}
              onPress={handleViewChangelog}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#4ECDC4' + '20' }]}>
                <Ionicons name="document-text-outline" size={24} color="#4ECDC4" />
              </View>
              <Text style={[styles.actionTitle, { color: colors.text.primary }]}>
                View Changelog
              </Text>
              <Text style={[styles.actionSubtitle, { color: colors.text.secondary }]}>
                See all version history
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: colors.surface }]}
              onPress={handleContactDeveloper}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#F39C12' + '20' }]}>
                <Ionicons name="mail-outline" size={24} color="#F39C12" />
              </View>
              <Text style={[styles.actionTitle, { color: colors.text.primary }]}>
                Contact Developer
              </Text>
              <Text style={[styles.actionSubtitle, { color: colors.text.secondary }]}>
                Send feedback or questions
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Details */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            App Information
          </Text>
          
          <View style={styles.detailsContainer}>
            {appDetails.map(renderAppDetail)}
          </View>
        </View>

        {/* Version History */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Version History
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Recent updates and changes
          </Text>
          
          <View style={styles.versionsContainer}>
            {[currentVersion, ...previousVersions].map(renderVersionCard)}
          </View>
        </View>

        {/* Legal Information */}
        <View style={[styles.legalCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.legalTitle, { color: colors.text.primary }]}>
            Legal Information
          </Text>
          <Text style={[styles.legalText, { color: colors.text.secondary }]}>
            This app is developed and maintained by Artisan Technologies Ltd. 
            All rights reserved. For support, please contact our development team.
          </Text>
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
    borderBottomColor: 'rgba(0,0,0,0.1)',
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  currentVersionCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  currentVersion: {
    fontSize: 16,
    marginBottom: 12,
  },
  latestBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  latestText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  actionsContainer: {
    gap: 12,
  },
  actionCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
  },
  detailsContainer: {
    gap: 8,
  },
  detailCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  detailContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  versionsContainer: {
    gap: 16,
  },
  versionCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  versionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  versionInfo: {
    flex: 1,
  },
  versionNumber: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  buildNumber: {
    fontSize: 14,
  },
  versionMeta: {
    alignItems: 'flex-end',
  },
  releaseDate: {
    fontSize: 12,
    marginTop: 4,
  },
  versionDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  versionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  versionDetailText: {
    fontSize: 12,
  },
  changesContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 12,
  },
  changesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  changeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  changeText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  legalCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  legalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  legalText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AppVersionScreen; 