import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();

  return (
    <LinearGradient
      colors={[colors.tanLight, colors.tan, colors.tanDark]}
      style={styles.gradientBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.brownDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Notification Preferences Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Ionicons name="notifications-outline" size={22} color={colors.bronze} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Notification Preferences</Text>
          </View>
          <Text style={styles.sectionDesc}>Manage how you receive notifications.</Text>
          <TouchableOpacity style={styles.sectionAction} onPress={() => navigation.navigate('NotificationSchedule')}>
            <Text style={styles.sectionActionText}>Manage</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.bronze} />
          </TouchableOpacity>
        </View>

        {/* App Theme Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Ionicons name="color-palette-outline" size={22} color={colors.bronze} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>App Theme</Text>
          </View>
          <Text style={styles.sectionDesc}>Customize your app appearance and colors.</Text>
          <TouchableOpacity style={styles.sectionAction} onPress={() => navigation.navigate('ThemeCustomization')}>
            <Text style={styles.sectionActionText}>Customize</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.bronze} />
          </TouchableOpacity>
        </View>

        {/* Data Export Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Ionicons name="download-outline" size={22} color={colors.bronze} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Export Data</Text>
          </View>
          <Text style={styles.sectionDesc}>Download your information and data.</Text>
          <TouchableOpacity style={styles.sectionAction} onPress={() => navigation.navigate('DataExport')}>
            <Text style={styles.sectionActionText}>Export</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.bronze} />
          </TouchableOpacity>
        </View>

        {/* Storage Management Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Ionicons name="folder-outline" size={22} color={colors.bronze} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Storage Management</Text>
          </View>
          <Text style={styles.sectionDesc}>Manage your app storage and data usage.</Text>
          <TouchableOpacity style={styles.sectionAction} onPress={() => navigation.navigate('StorageManagement')}>
            <Text style={styles.sectionActionText}>Manage</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.bronze} />
          </TouchableOpacity>
        </View>

        {/* Contact Support Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Ionicons name="chatbubble-outline" size={22} color={colors.bronze} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Contact Support</Text>
          </View>
          <Text style={styles.sectionDesc}>Get help from our support team.</Text>
          <TouchableOpacity style={styles.sectionAction} onPress={() => navigation.navigate('ContactSupport')}>
            <Text style={styles.sectionActionText}>Contact</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.bronze} />
          </TouchableOpacity>
        </View>

        {/* Rate App Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Ionicons name="star-outline" size={22} color={colors.bronze} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Rate the App</Text>
          </View>
          <Text style={styles.sectionDesc}>Share your feedback and help us improve.</Text>
          <TouchableOpacity style={styles.sectionAction} onPress={() => navigation.navigate('RateApp')}>
            <Text style={styles.sectionActionText}>Rate</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.bronze} />
          </TouchableOpacity>
        </View>

        {/* Report Bug Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Ionicons name="bug-outline" size={22} color={colors.bronze} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Report a Bug</Text>
          </View>
          <Text style={styles.sectionDesc}>Help us identify and fix issues.</Text>
          <TouchableOpacity style={styles.sectionAction} onPress={() => navigation.navigate('ReportBug')}>
            <Text style={styles.sectionActionText}>Report</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.bronze} />
          </TouchableOpacity>
        </View>

        {/* App Version Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Ionicons name="information-circle-outline" size={22} color={colors.bronze} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>App Version</Text>
          </View>
          <Text style={styles.sectionDesc}>Version 2.1.0 (Build 421)</Text>
          <TouchableOpacity style={styles.sectionAction} onPress={() => navigation.navigate('AppVersion')}>
            <Text style={styles.sectionActionText}>Details</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.bronze} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#E57373" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    justifyContent: 'space-between',
  },
  headerIconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.brownDark,
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.brownDark,
  },
  sectionDesc: {
    fontSize: 13,
    color: colors.bronze,
    marginBottom: 8,
    opacity: 0.85,
  },
  sectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  sectionActionText: {
    color: colors.bronze,
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: 'rgba(229,115,115,0.08)',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 22,
  },
  logoutText: {
    color: '#E57373',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
});

export default SettingsScreen; 