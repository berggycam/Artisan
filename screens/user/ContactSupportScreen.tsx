import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ContactSupportScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');
      Alert.alert('Support Request Sent', 'Our team will get back to you soon!');
    }, 1200);
  };

  return (
    <LinearGradient
      colors={['#FFF8DC', '#FFEFD5', '#F5DEB3']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Ionicons name="chatbubbles-outline" size={48} color="#8B4513" style={{ marginBottom: 12 }} />
          <Text style={styles.header}>Contact Support</Text>
          <Text style={styles.subtext}>Have a question or need help? Send us a message below and our team will respond as soon as possible.</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor="#8D6E63"
              value={name}
              onChangeText={setName}
              editable={!submitting}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor="#8D6E63"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!submitting}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="How can we help you?"
              placeholderTextColor="#8D6E63"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={5}
              editable={!submitting}
            />
            <TouchableOpacity
              style={[styles.button, submitting && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={submitting}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>{submitting ? 'Sending...' : 'Send Message'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  form: {
    width: '100%',
    marginTop: 8,
  },
  input: {
    backgroundColor: '#FFFEF7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#2F1B14',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E8DDD4',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#8B4513',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#CD853F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF8DC',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default ContactSupportScreen; 