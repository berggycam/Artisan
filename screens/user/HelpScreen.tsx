import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen: React.FC = ({ navigation }: any) => {
  const helpTopics = [
    {
      icon: 'help-circle-outline',
      title: 'FAQs',
      description: 'Find answers to common questions.',
      onPress: () => navigation.navigate('FAQs'),
    },
    {
      icon: 'chatbubbles-outline',
      title: 'Contact Support',
      description: 'Reach out to our support team for help.',
      onPress: () => navigation.navigate('ContactSupport'),
    },
    {
      icon: 'bug-outline',
      title: 'Report a Problem',
      description: 'Let us know if you encounter any issues.',
      onPress: () => navigation.navigate('ReportBug'),
    },
  ];

  return (
    <LinearGradient
      colors={['#FFF8DC', '#FFEFD5', '#F5DEB3']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Help & Support</Text>
        <Text style={styles.subtext}>
          How can we assist you? Browse topics below or contact our team for help.
        </Text>
        <View style={styles.topicsContainer}>
          {helpTopics.map((topic, idx) => (
            <TouchableOpacity key={topic.title} style={styles.topicCard} onPress={topic.onPress} activeOpacity={0.85}>
              <Ionicons name={topic.icon as any} size={32} color="#8B4513" style={styles.topicIcon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDesc}>{topic.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CD853F" />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.contactPlaceholder}>
          <Ionicons name="mail-open-outline" size={40} color="#CD853F" style={{ marginBottom: 8 }} />
          <Text style={styles.contactText}>Support chat and contact options coming soon!</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#8B4513',
    marginBottom: 8,
    letterSpacing: -1,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#CD853F',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '500',
    letterSpacing: 1,
  },
  topicsContainer: {
    width: '100%',
    marginBottom: 36,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFEF7',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#CD853F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  topicIcon: {
    marginRight: 18,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 2,
  },
  topicDesc: {
    fontSize: 14,
    color: '#5D4037',
    opacity: 0.85,
  },
  contactPlaceholder: {
    alignItems: 'center',
    marginTop: 24,
    padding: 18,
    backgroundColor: '#FBF8F3',
    borderRadius: 16,
    width: '100%',
    shadowColor: '#CD853F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  contactText: {
    fontSize: 15,
    color: '#8B4513',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default HelpScreen; 