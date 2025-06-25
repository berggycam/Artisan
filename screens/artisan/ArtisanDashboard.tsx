import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from '../../components/shared/Avatar';
import StarRating from '../../components/shared/StarRating';
import { useNavigation } from '@react-navigation/native';

const ArtisanDashboard: React.FC = () => {
  const navigation = useNavigation();

  // Placeholder artisan data
  const artisan = {
    name: 'Jane Doe',
    specialty: 'Carpentry',
    avatarUri: undefined, // or a real image URL
    rating: 4,
  };

  return (
    <View style={styles.container}>
      {/* Profile Summary */}
      <View style={styles.profileSection}>
        <Avatar uri={artisan.avatarUri} size={80} />
        <Text style={styles.name}>{artisan.name}</Text>
        <Text style={styles.specialty}>{artisan.specialty}</Text>
        <StarRating rating={artisan.rating} />
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ManagePortfolio')}>
          <Text style={styles.actionText}>Manage Portfolio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('JobRequests')}>
          <Text style={styles.actionText}>Job Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ReviewClients')}>
          <Text style={styles.actionText}>Review Clients</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingTop: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    width: '90%',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
  },
  specialty: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  actionsSection: {
    width: '90%',
    marginTop: 16,
  },
  actionButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ArtisanDashboard; 