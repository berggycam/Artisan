import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface SupportChannel {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  action: 'call' | 'email' | 'chat' | 'ticket';
  value: string;
  responseTime: string;
  available: boolean;
}

interface SupportCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const ContactSupportScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();

  // Form state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('kwame.mensah@example.com');
  const [userName, setUserName] = useState('Kwame Mensah');

  // Support channels
  const supportChannels: SupportChannel[] = [
    {
      id: 'live-chat',
      name: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: 'chatbubble-ellipses-outline',
      color: '#4ECDC4',
      action: 'chat',
      value: 'Start Chat',
      responseTime: 'Instant',
      available: true
    },
    {
      id: 'phone',
      name: 'Phone Support',
      description: 'Speak directly with our support team',
      icon: 'call-outline',
      color: '#45B7D1',
      action: 'call',
      value: '+1 (555) 123-4567',
      responseTime: '5-10 min',
      available: true
    },
    {
      id: 'email',
      name: 'Email Support',
      description: 'Send us a detailed message',
      icon: 'mail-outline',
      color: '#96CEB4',
      action: 'email',
      value: 'support@artisanapp.com',
      responseTime: '2-4 hours',
      available: true
    },
    {
      id: 'ticket',
      name: 'Support Ticket',
      description: 'Create a detailed support ticket',
      icon: 'document-text-outline',
      color: '#FF6B6B',
      action: 'ticket',
      value: 'Create Ticket',
      responseTime: '24 hours',
      available: true
    }
  ];

  // Support categories
  const supportCategories: SupportCategory[] = [
    {
      id: 'technical',
      name: 'Technical Issues',
      description: 'App crashes, bugs, or technical problems',
      icon: 'bug-outline',
      color: '#FF6B6B'
    },
    {
      id: 'account',
      name: 'Account & Billing',
      description: 'Login issues, payments, or account settings',
      icon: 'person-circle-outline',
      color: '#4ECDC4'
    },
    {
      id: 'booking',
      name: 'Booking Problems',
      description: 'Issues with reservations or appointments',
      icon: 'calendar-outline',
      color: '#45B7D1'
    },
    {
      id: 'payment',
      name: 'Payment Issues',
      description: 'Problems with transactions or refunds',
      icon: 'card-outline',
      color: '#96CEB4'
    },
    {
      id: 'general',
      name: 'General Inquiry',
      description: 'Questions about features or services',
      icon: 'help-circle-outline',
      color: '#F39C12'
    },
    {
      id: 'feedback',
      name: 'Feedback & Suggestions',
      description: 'Share your thoughts and ideas',
      icon: 'star-outline',
      color: '#9B59B6'
    }
  ];

  const handleChannelAction = (channel: SupportChannel) => {
    switch (channel.action) {
      case 'call':
        Alert.alert(
          'Call Support',
          `Call ${channel.value}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Call',
              onPress: () => {
                Linking.openURL(`tel:${channel.value}`);
              }
            }
          ]
        );
        break;
      
      case 'email':
        Alert.alert(
          'Email Support',
          `Send email to ${channel.value}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Send Email',
              onPress: () => {
                Linking.openURL(`mailto:${channel.value}?subject=Support Request`);
              }
            }
          ]
        );
        break;
      
      case 'chat':
        Alert.alert(
          'Live Chat',
          'Start a live chat session?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Start Chat',
              onPress: () => {
                // In a real app, this would open a chat interface
                Alert.alert('Chat Started', 'Connecting you to a support agent...');
              }
            }
          ]
        );
        break;
      
      case 'ticket':
        // Show ticket form
        break;
    }
  };

  const handleSubmitTicket = () => {
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category for your issue.');
      return;
    }
    if (!subject.trim()) {
      Alert.alert('Error', 'Please enter a subject for your ticket.');
      return;
    }
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message describing your issue.');
      return;
    }

    Alert.alert(
      'Submit Ticket',
      'Are you sure you want to submit this support ticket?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            // In a real app, this would submit to backend
            Alert.alert(
              'Ticket Submitted',
              'Your support ticket has been submitted successfully. We\'ll get back to you within 24 hours.',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          }
        }
      ]
    );
  };

  const renderSupportChannel = (channel: SupportChannel) => (
    <TouchableOpacity
      key={channel.id}
      style={[styles.channelCard, { backgroundColor: colors.surface }]}
      onPress={() => handleChannelAction(channel)}
      activeOpacity={0.7}
    >
      <View style={styles.channelHeader}>
        <View style={styles.channelInfo}>
          <View style={[styles.channelIcon, { backgroundColor: channel.color + '20' }]}>
            <Ionicons name={channel.icon as any} size={24} color={channel.color} />
          </View>
          <View style={styles.channelText}>
            <Text style={[styles.channelName, { color: colors.text.primary }]}>
              {channel.name}
            </Text>
            <Text style={[styles.channelDescription, { color: colors.text.secondary }]}>
              {channel.description}
            </Text>
            <Text style={[styles.responseTime, { color: colors.text.secondary }]}>
              Response time: {channel.responseTime}
            </Text>
          </View>
        </View>
        <View style={styles.channelAction}>
          <Text style={[styles.actionText, { color: channel.color }]}>
            {channel.value}
          </Text>
          <Ionicons name="chevron-forward" size={18} color={channel.color} />
        </View>
      </View>
      {!channel.available && (
        <View style={[styles.unavailableBadge, { backgroundColor: colors.error + '20' }]}>
          <Text style={[styles.unavailableText, { color: colors.error }]}>
            Currently Unavailable
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderSupportCategory = (category: SupportCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        { 
          backgroundColor: selectedCategory === category.id 
            ? category.color + '20' 
            : colors.surface,
          borderColor: selectedCategory === category.id 
            ? category.color 
            : colors.border
        }
      ]}
      onPress={() => setSelectedCategory(category.id)}
      activeOpacity={0.7}
    >
      <View style={styles.categoryContent}>
        <Ionicons 
          name={category.icon as any} 
          size={24} 
          color={selectedCategory === category.id ? category.color : colors.text.secondary} 
        />
        <View style={styles.categoryText}>
          <Text style={[
            styles.categoryName, 
            { color: selectedCategory === category.id ? category.color : colors.text.primary }
          ]}>
            {category.name}
          </Text>
          <Text style={[styles.categoryDescription, { color: colors.text.secondary }]}>
            {category.description}
          </Text>
        </View>
        {selectedCategory === category.id && (
          <Ionicons name="checkmark-circle" size={24} color={category.color} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background.primary} 
      />
      
      {/* Header */}
      <LinearGradient
        colors={currentTheme.gradient as [string, string, string]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
              Contact Support
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              We're here to help you
            </Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Contact Channels */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Quick Contact
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Choose the best way to reach our support team
          </Text>
          
          <View style={styles.channelsContainer}>
            {supportChannels.map(renderSupportChannel)}
          </View>
        </View>

        {/* Support Ticket Form */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Create Support Ticket
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Submit a detailed ticket for complex issues
          </Text>
          
          <View style={[styles.ticketForm, { backgroundColor: colors.surface }]}>
            {/* Category Selection */}
            <View style={styles.formSection}>
              <Text style={[styles.formLabel, { color: colors.text.primary }]}>
                Issue Category *
              </Text>
              <View style={styles.categoriesContainer}>
                {supportCategories.map(renderSupportCategory)}
              </View>
            </View>

            {/* Subject */}
            <View style={styles.formSection}>
              <Text style={[styles.formLabel, { color: colors.text.primary }]}>
                Subject *
              </Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.border,
                  color: colors.text.primary
                }]}
                value={subject}
                onChangeText={setSubject}
                placeholder="Brief description of your issue"
                placeholderTextColor={colors.text.secondary}
                maxLength={100}
              />
            </View>

            {/* Message */}
            <View style={styles.formSection}>
              <Text style={[styles.formLabel, { color: colors.text.primary }]}>
                Message *
              </Text>
              <TextInput
                style={[styles.textArea, { 
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.border,
                  color: colors.text.primary
                }]}
                value={message}
                onChangeText={setMessage}
                placeholder="Please describe your issue in detail..."
                placeholderTextColor={colors.text.secondary}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                maxLength={1000}
              />
              <Text style={[styles.charCount, { color: colors.text.secondary }]}>
                {message.length}/1000 characters
              </Text>
            </View>

            {/* User Info */}
            <View style={styles.formSection}>
              <Text style={[styles.formLabel, { color: colors.text.primary }]}>
                Contact Information
              </Text>
              <View style={styles.userInfo}>
                <View style={styles.userInfoItem}>
                  <Ionicons name="person-outline" size={16} color={colors.text.secondary} />
                  <Text style={[styles.userInfoText, { color: colors.text.secondary }]}>
                    {userName}
                  </Text>
                </View>
                <View style={styles.userInfoItem}>
                  <Ionicons name="mail-outline" size={16} color={colors.text.secondary} />
                  <Text style={[styles.userInfoText, { color: colors.text.secondary }]}>
                    {userEmail}
                  </Text>
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSubmitTicket}
            >
              <Ionicons name="send-outline" size={20} color={colors.background.primary} />
              <Text style={[styles.submitButtonText, { color: colors.background.primary }]}>
                Submit Ticket
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Hours */}
        <View style={[styles.supportHoursCard, { backgroundColor: colors.surface }]}>
          <View style={styles.supportHoursHeader}>
            <Ionicons name="time-outline" size={24} color={colors.primary} />
            <Text style={[styles.supportHoursTitle, { color: colors.text.primary }]}>
              Support Hours
            </Text>
          </View>
          <View style={styles.supportHoursContent}>
            <View style={styles.hoursRow}>
              <Text style={[styles.days, { color: colors.text.primary }]}>
                Monday - Friday
              </Text>
              <Text style={[styles.hours, { color: colors.text.secondary }]}>
                9:00 AM - 6:00 PM EST
              </Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={[styles.days, { color: colors.text.primary }]}>
                Saturday
              </Text>
              <Text style={[styles.hours, { color: colors.text.secondary }]}>
                10:00 AM - 4:00 PM EST
              </Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={[styles.days, { color: colors.text.primary }]}>
                Sunday
              </Text>
              <Text style={[styles.hours, { color: colors.text.secondary }]}>
                Emergency Support Only
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  channelsContainer: {
    gap: 12,
  },
  channelCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  channelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  channelText: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  channelDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  responseTime: {
    fontSize: 12,
    fontWeight: '500',
  },
  channelAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  unavailableBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  unavailableText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ticketForm: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoriesContainer: {
    gap: 8,
  },
  categoryCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 12,
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 12,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  userInfo: {
    gap: 8,
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 14,
    marginLeft: 8,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  supportHoursCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  supportHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  supportHoursTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  supportHoursContent: {
    gap: 8,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  days: {
    fontSize: 14,
    fontWeight: '500',
  },
  hours: {
    fontSize: 14,
  },
});

export default ContactSupportScreen; 