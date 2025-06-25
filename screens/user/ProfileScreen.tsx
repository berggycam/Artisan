import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

// Warm, earthy color palette (copied from HomeScreen)
const COLORS = {
  primary: '#D2691E',
  primaryLight: '#E6965C',
  primaryDark: '#A0522D',
  secondary: '#CD853F',
  accent: '#8B4513',
  warm: '#F4A460',
  text: {
    primary: '#2F1B14',
    secondary: '#5D4037',
    tertiary: '#8D6E63',
    white: '#FFFFFF',
  },
  background: {
    primary: '#FFFEF7',
    secondary: '#FBF8F3',
    tertiary: '#F5F1EA',
  },
  border: '#E8DDD4',
  success: '#8FBC8F',
  warning: '#DAA520',
  error: '#CD5C5C',
};

// Mock user data
const user = {
  name: 'Ama Serwaa',
  email: 'ama.serwaa@email.com',
  phone: '+233 24 123 4567',
  location: 'Accra, Ghana',
  avatar: null, // Placeholder, use icon
};

const actions = [
  { label: 'My Bookings', icon: 'calendar-outline', screen: 'Bookings' },
  { label: 'Favorites', icon: 'heart-outline', screen: 'Favorites' },
  { label: 'Settings', icon: 'settings-outline', screen: 'Settings' },
  { label: 'Help & Support', icon: 'help-circle-outline', screen: 'Help' },
  { label: 'Logout', icon: 'log-out-outline', screen: 'Logout', color: COLORS.error },
];

const ProfileScreen: React.FC = ({ navigation }: any) => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    setLogoutVisible(false);
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={48} color={COLORS.text.white} />
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userContact}>{user.email}</Text>
          <Text style={styles.userContact}>{user.phone}</Text>
          <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation && navigation.navigate && navigation.navigate('EditProfile')}>
            <Ionicons name="create-outline" size={16} color={COLORS.primary} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={18} color={COLORS.primary} style={styles.detailIcon} />
            <Text style={styles.detailText}>{user.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={18} color={COLORS.primary} style={styles.detailIcon} />
            <Text style={styles.detailText}>{user.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={18} color={COLORS.primary} style={styles.detailIcon} />
            <Text style={styles.detailText}>{user.location}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          {actions.map((action, idx) => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionRow}
              onPress={
                action.screen === 'Logout'
                  ? () => setLogoutVisible(true)
                  : () => navigation && navigation.navigate && navigation.navigate(action.screen)
              }
            >
              <Ionicons name={action.icon as any} size={22} color={action.color || COLORS.primary} style={styles.actionIcon} />
              <Text style={[styles.actionLabel, action.color && { color: action.color }]}>{action.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.text.tertiary} style={{ marginLeft: 'auto' }} />
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="log-out-outline" size={40} color={COLORS.error} style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutButton]}
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
    backgroundColor: COLORS.background.primary,
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
    shadowColor: COLORS.primary,
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
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.background.primary,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: COLORS.background.primary,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    elevation: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text.white,
    marginBottom: 2,
  },
  userContact: {
    fontSize: 14,
    color: COLORS.text.white,
    opacity: 0.9,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 14,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  editProfileText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 6,
  },
  detailsCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
    marginBottom: 28,
    elevation: 2,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailText: {
    fontSize: 15,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  actionsSection: {
    marginHorizontal: 10,
    marginTop: 8,
    backgroundColor: COLORS.background.primary,
    borderRadius: 18,
    paddingVertical: 8,
    elevation: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionIcon: {
    marginRight: 16,
  },
  actionLabel: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    width: '80%',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 6,
  },
  modalMessage: {
    fontSize: 15,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 18,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: COLORS.background.secondary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
  },
  cancelButtonText: {
    color: COLORS.text.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  logoutButtonText: {
    color: COLORS.text.white,
    fontWeight: '700',
    fontSize: 15,
  },
});

export default ProfileScreen; 