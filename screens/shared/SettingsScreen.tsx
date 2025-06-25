import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import layout from '../../constants/layout';
import { useAuth } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

const SettingsScreen: React.FC = ({ navigation }: any) => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    setLogoutVisible(false);
    logout();
  };

  const settings = [
    {
      group: 'Account',
      options: [
        {
          icon: 'person-outline',
          label: 'Profile',
          onPress: () => navigation.navigate('Profile'),
          color: undefined,
        },
      ],
    },
    {
      group: 'Preferences',
      options: [
        {
          icon: 'notifications-outline',
          label: 'Notifications',
          onPress: () => navigation.navigate('Notifications'),
          color: undefined,
        },
      ],
    },
    {
      group: 'Support',
      options: [
        {
          icon: 'help-circle-outline',
          label: 'Help & Support',
          onPress: () => navigation.navigate('Help'),
          color: undefined,
        },
      ],
    },
    {
      group: ' ',
      options: [
        {
          icon: 'log-out-outline',
          label: 'Logout',
          color: colors.error,
          onPress: () => setLogoutVisible(true),
        },
      ],
    },
  ];

  return (
    <LinearGradient
      colors={['#FFF8DC', '#FFEFD5', '#F5DEB3']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Decorative background elements */}
      <View style={styles.backgroundDecor} pointerEvents="none">
        <View style={[styles.decorCircle, styles.decorCircle1]} />
        <View style={[styles.decorCircle, styles.decorCircle2]} />
        <View style={[styles.decorCircle, styles.decorCircle3]} />
        <View style={[styles.decorRing, styles.decorRing1]} />
        <View style={[styles.decorRing, styles.decorRing2]} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Settings</Text>
        {settings.map((section) => (
          <View key={section.group} style={styles.section}>
            {section.group.trim() !== '' && <Text style={styles.sectionTitle}>{section.group}</Text>}
            {section.options.map((option) => (
              <TouchableOpacity
                key={option.label}
                style={styles.optionRow}
                onPress={option.onPress}
                activeOpacity={0.8}
              >
                <Ionicons name={option.icon as any} size={responsiveSize(24)} color={option.color || '#8B4513'} style={styles.optionIcon} />
                <Text style={[styles.optionLabel, option.color && { color: option.color }]}>{option.label}</Text>
                <Ionicons name="chevron-forward" size={responsiveSize(18)} color={colors.secondary} style={{ marginLeft: 'auto' }} />
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
            <Ionicons name="log-out-outline" size={responsiveSize(40)} color={colors.error} style={{ marginBottom: 12 }} />
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingTop: responsiveSize(60),
    paddingHorizontal: responsiveSize(24),
    paddingBottom: responsiveSize(40),
    alignItems: 'center',
    minHeight: height,
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
    opacity: 0.08,
  },
  decorCircle1: {
    width: responsiveSize(220),
    height: responsiveSize(220),
    backgroundColor: '#DEB887',
    top: -responsiveSize(60),
    right: -responsiveSize(60),
  },
  decorCircle2: {
    width: responsiveSize(140),
    height: responsiveSize(140),
    backgroundColor: '#F4A460',
    bottom: -responsiveSize(30),
    left: -responsiveSize(30),
  },
  decorCircle3: {
    width: responsiveSize(90),
    height: responsiveSize(90),
    backgroundColor: '#CD853F',
    top: '30%',
    right: responsiveSize(30),
  },
  decorRing: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
    opacity: 0.1,
  },
  decorRing1: {
    width: responsiveSize(90),
    height: responsiveSize(90),
    borderColor: '#8B4513',
    top: '20%',
    left: responsiveSize(20),
  },
  decorRing2: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderColor: '#CD853F',
    bottom: '25%',
    right: responsiveSize(40),
  },
  header: {
    fontSize: responsiveSize(32),
    fontWeight: '800',
    color: '#8B4513',
    marginBottom: responsiveSize(24),
    letterSpacing: -1,
    textAlign: 'center',
    textShadowColor: 'rgba(139, 69, 19, 0.08)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  section: {
    width: '100%',
    marginBottom: responsiveSize(32),
  },
  sectionTitle: {
    fontSize: responsiveSize(16),
    color: '#B8860B',
    fontWeight: '700',
    marginBottom: responsiveSize(10),
    marginLeft: responsiveSize(4),
    letterSpacing: 1,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFEF7',
    borderRadius: responsiveSize(18),
    padding: responsiveSize(18),
    marginBottom: responsiveSize(14),
    shadowColor: '#CD853F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  optionIcon: {
    marginRight: responsiveSize(18),
  },
  optionLabel: {
    fontSize: responsiveSize(18),
    color: '#8B4513',
    fontWeight: '700',
    marginBottom: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF8DC',
    borderRadius: responsiveSize(18),
    padding: responsiveSize(28),
    alignItems: 'center',
    width: '80%',
    shadowColor: '#8B4513',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  modalTitle: {
    fontSize: responsiveSize(22),
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 6,
  },
  modalMessage: {
    fontSize: responsiveSize(15),
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 18,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: responsiveSize(10),
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#B8860B',
  },
  cancelButtonText: {
    color: '#FFF8DC',
    fontWeight: '700',
    fontSize: responsiveSize(15),
  },
  logoutButton: {
    backgroundColor: '#CD853F',
  },
  logoutButtonText: {
    color: '#FFF8DC',
    fontWeight: '700',
    fontSize: responsiveSize(15),
  },
});

export default SettingsScreen; 