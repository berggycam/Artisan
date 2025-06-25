import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ArtisanCard: React.FC = () => (
  <View style={styles.card}>
    <Text style={styles.title}>Artisan Name</Text>
    <Text>Specialty</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
});

export default ArtisanCard; 