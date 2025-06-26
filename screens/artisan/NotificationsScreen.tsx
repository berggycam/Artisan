import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

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
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Placeholder for notifications */}
        <View style={styles.emptyState}>
          <Ionicons name="notifications-outline" size={64} color={colors.bronze} style={{ marginBottom: 18 }} />
          <Text style={styles.emptyText}>No notifications yet!</Text>
        </View>
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: colors.bronze,
    opacity: 0.85,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default NotificationsScreen; 