import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ReportBugScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!email || !description) {
      Alert.alert('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setEmail('');
      setDescription('');
      Alert.alert('Bug Report Sent', 'Thank you for helping us improve!');
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
          <Ionicons name="bug-outline" size={48} color="#8B4513" style={{ marginBottom: 12 }} />
          <Text style={styles.header}>Report a Bug</Text>
          <Text style={styles.subtext}>Found a bug or issue? Please let us know below so we can fix it as soon as possible.</Text>
          <View style={styles.form}>
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
              placeholder="Describe the bug or issue..."
              placeholderTextColor="#8D6E63"
              value={description}
              onChangeText={setDescription}
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
              <Text style={styles.buttonText}>{submitting ? 'Sending...' : 'Submit Bug'}</Text>
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

export default ReportBugScreen; 