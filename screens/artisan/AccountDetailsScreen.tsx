import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const mockArtisan = {
  name: 'Jane Doe',
  email: 'jane.doe@email.com',
  phone: '+233 24 123 4567',
  specialty: 'Master Carpenter',
  location: 'Accra, Ghana',
};

const AccountDetailsScreen: React.FC = () => {
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
          <Text style={styles.headerTitle}>Account Details</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={22} color={colors.bronze} style={styles.detailIcon} />
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailValue}>{mockArtisan.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={22} color={colors.bronze} style={styles.detailIcon} />
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{mockArtisan.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={22} color={colors.bronze} style={styles.detailIcon} />
            <Text style={styles.detailLabel}>Phone:</Text>
            <Text style={styles.detailValue}>{mockArtisan.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="briefcase-outline" size={22} color={colors.bronze} style={styles.detailIcon} />
            <Text style={styles.detailLabel}>Specialty:</Text>
            <Text style={styles.detailValue}>{mockArtisan.specialty}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={22} color={colors.bronze} style={styles.detailIcon} />
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{mockArtisan.location}</Text>
          </View>
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
  detailsCard: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailLabel: {
    fontSize: 15,
    color: colors.brownDark,
    fontWeight: '600',
    marginRight: 6,
    minWidth: 80,
  },
  detailValue: {
    fontSize: 15,
    color: colors.bronze,
    fontWeight: '500',
    flexShrink: 1,
  },
});

export default AccountDetailsScreen; 