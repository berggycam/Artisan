import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

// Mock user data
const user = {
  name: 'Kwame Mensah',
  email: 'kwame.mensah@email.com',
  phone: '+233 24 123 4567',
  location: 'Accra, Ghana',
  bio: 'Passionate about quality services and connecting with skilled artisans.',
  avatar: null, // Placeholder, use icon
};

const ProfileScreen: React.FC = ({ navigation }: any) => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const { logout } = useAuth();
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();

  const actions = [
    { 
      label: 'My Bookings', 
      icon: 'calendar-outline', 
      screen: 'Bookings',
      description: 'View your upcoming and past bookings'
    },
    { 
      label: 'Favorites', 
      icon: 'heart-outline', 
      screen: 'Favorites',
      description: 'Your saved artisans and services'
    },
    { 
      label: 'Settings', 
      icon: 'settings-outline', 
      screen: 'Settings',
      description: 'App preferences and account settings'
    },
    { 
      label: 'Help & Support', 
      icon: 'help-circle-outline', 
      screen: 'Help',
      description: 'Get help and contact support'
    },
    { 
      label: 'Logout', 
      icon: 'log-out-outline', 
      screen: 'Logout', 
      color: colors.error,
      description: 'Sign out of your account'
    },
  ];

  const handleLogout = () => {
    setLogoutVisible(false);
    logout();
  };

  const handleActionPress = (action: any) => {
    if (action.screen === 'Logout') {
      setLogoutVisible(true);
    } else {
      navigation && navigation.navigate && navigation.navigate(action.screen);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background.primary} 
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={currentTheme.gradient as [string, string, string]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarCircle, { backgroundColor: colors.primary + '20', borderColor: colors.background.primary }]}>
              <Ionicons name="person" size={48} color={colors.primary} />
            </View>
            <TouchableOpacity style={[styles.editAvatarBtn, { backgroundColor: colors.background.primary, borderColor: colors.border }]}>
              <Ionicons name="camera" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.userName, { color: colors.text.primary }]}>{user.name}</Text>
          <Text style={[styles.userContact, { color: colors.text.secondary }]}>{user.email}</Text>
          <Text style={[styles.userContact, { color: colors.text.secondary }]}>{user.phone}</Text>
          <TouchableOpacity 
            style={[styles.editProfileBtn, { backgroundColor: colors.background.primary + '20' }]} 
            onPress={() => navigation && navigation.navigate && navigation.navigate('EditProfile')}
          >
            <Ionicons name="create-outline" size={16} color={colors.primary} />
            <Text style={[styles.editProfileText, { color: colors.primary }]}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* User Bio */}
        <View style={[styles.bioCard, { backgroundColor: colors.surface }]}>
          <View style={styles.bioHeader}>
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
            <Text style={[styles.bioTitle, { color: colors.text.primary }]}>About</Text>
          </View>
          <Text style={[styles.bioText, { color: colors.text.secondary }]}>{user.bio}</Text>
        </View>

        {/* Contact Details Card */}
        <View style={[styles.detailsCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Contact Information</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={[styles.detailIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="call-outline" size={18} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: colors.text.secondary }]}>Phone</Text>
                <Text style={[styles.detailText, { color: colors.text.primary }]}>{user.phone}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={[styles.detailIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="mail-outline" size={18} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: colors.text.secondary }]}>Email</Text>
                <Text style={[styles.detailText, { color: colors.text.primary }]}>{user.email}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={[styles.detailIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="location-outline" size={18} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: colors.text.secondary }]}>Location</Text>
                <Text style={[styles.detailText, { color: colors.text.primary }]}>{user.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Quick Actions</Text>
          {actions.map((action, idx) => (
            <TouchableOpacity
              key={action.label}
              style={[styles.actionCard, { backgroundColor: colors.surface }]}
              onPress={() => handleActionPress(action)}
            >
              <View style={styles.actionContent}>
                <View style={[styles.actionIcon, { backgroundColor: (action.color || colors.primary) + '20' }]}>
                  <Ionicons name={action.icon as any} size={22} color={action.color || colors.primary} />
                </View>
                <View style={styles.actionText}>
                  <Text style={[styles.actionLabel, { color: colors.text.primary }]}>{action.label}</Text>
                  <Text style={[styles.actionDescription, { color: colors.text.secondary }]}>{action.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.text.secondary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.background.primary }]}>
            <View style={[styles.modalIcon, { backgroundColor: colors.error + '20' }]}>
              <Ionicons name="log-out-outline" size={40} color={colors.error} />
            </View>
            <Text style={[styles.modalTitle, { color: colors.text.primary }]}>Logout</Text>
            <Text style={[styles.modalMessage, { color: colors.text.secondary }]}>
              Are you sure you want to logout? You'll need to sign in again to access your account.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.background.secondary, borderColor: colors.border }]}
                onPress={() => setLogoutVisible(false)}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text.secondary }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutButton, { backgroundColor: colors.error }]}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    elevation: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userContact: {
    fontSize: 14,
    marginBottom: 2,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    gap: 6,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bioCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  bioTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
  },
  detailsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionsSection: {
    marginHorizontal: 20,
  },
  actionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    flex: 1,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    marginHorizontal: 40,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default ProfileScreen; 