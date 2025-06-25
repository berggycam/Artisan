import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
  {
    question: 'How do I book an artisan?',
    answer: 'Browse or search for the service you need, select an artisan, and tap the "Book Now" button to make a booking.',
  },
  {
    question: 'How do I contact support?',
    answer: 'Go to Help & Support and select "Contact Support" to reach our team via chat or email.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'On the login screen, tap "Forgot Password?" and follow the instructions to reset your password.',
  },
  {
    question: 'How do I become an artisan on the platform?',
    answer: 'Tap Register, select "Join as Artisan", and complete the registration form. Our team will review your application.',
  },
  {
    question: 'Is my information safe?',
    answer: 'Yes, we use secure technology to protect your data and privacy at all times.',
  },
];

const FAQsScreen: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <LinearGradient
      colors={['#FFF8DC', '#FFEFD5', '#F5DEB3']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>FAQs</Text>
        <Text style={styles.subtext}>Frequently Asked Questions</Text>
        <View style={styles.faqsContainer}>
          {faqs.map((faq, idx) => (
            <View key={faq.question} style={styles.faqCard}>
              <TouchableOpacity style={styles.faqHeader} onPress={() => handleToggle(idx)} activeOpacity={0.8}>
                <Ionicons name={openIndex === idx ? 'remove-circle' : 'add-circle'} size={24} color="#8B4513" style={{ marginRight: 12 }} />
                <Text style={styles.faqQuestion}>{faq.question}</Text>
              </TouchableOpacity>
              {openIndex === idx && (
                <View style={styles.faqAnswerContainer}>
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
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
  faqsContainer: {
    width: '100%',
  },
  faqCard: {
    backgroundColor: '#FFFEF7',
    borderRadius: 16,
    marginBottom: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#CD853F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B4513',
    flex: 1,
  },
  faqAnswerContainer: {
    marginTop: 8,
    paddingLeft: 36,
  },
  faqAnswer: {
    fontSize: 15,
    color: '#5D4037',
    opacity: 0.95,
    fontWeight: '500',
  },
});

export default FAQsScreen; 