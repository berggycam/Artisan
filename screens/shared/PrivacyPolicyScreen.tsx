import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

// Warm, earthy color palette (matching app theme)
const COLORS = {
  primary: '#D2691E',
  primaryLight: '#E6965C',
  primaryDark: '#A0522D',
  secondary: '#CD853F',
  accent: '#8B4513',
  warm: '#F4A460',
  text: {
    primary: '#2F1B14',
    secondary: '#5D4037',
    tertiary: '#8D6E63',
    white: '#FFFFFF'
  },
  background: {
    primary: '#FFFEF7',
    secondary: '#FBF8F3',
    tertiary: '#F5F1EA'
  },
  border: '#E8DDD4',
  success: '#8FBC8F',
  warning: '#DAA520',
  error: '#CD5C5C'
};

const PrivacyPolicyScreen: React.FC = ({ navigation }: any) => {
  const renderSection = (title: string, content: string[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {content.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>
          {paragraph}
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      {/* Header */}
      <LinearGradient
        colors={[COLORS.background.primary, COLORS.background.secondary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Privacy Policy</Text>
            <Text style={styles.headerSubtitle}>Last updated: January 2024</Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introSection}>
          <Text style={styles.introText}>
            At ArtisanApp, we respect your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
          </Text>
        </View>

        {renderSection(
          '1. Information We Collect',
          [
            'We collect information you provide directly to us, including:',
            '• Account information (name, email, phone number)\n• Profile information (location, preferences)\n• Communication data (messages, reviews)\n• Payment information (processed securely by third parties)\n• Device information (IP address, device type, operating system)',
            'We also collect information automatically when you use our service, such as usage patterns and app interactions.'
          ]
        )}

        {renderSection(
          '2. How We Use Your Information',
          [
            'We use the information we collect to:',
            '• Provide and maintain our service\n• Connect you with artisans and customers\n• Process payments and transactions\n• Send notifications and updates\n• Improve our service and user experience\n• Ensure platform security and prevent fraud\n• Comply with legal obligations',
            'We will not sell, rent, or trade your personal information to third parties for marketing purposes.'
          ]
        )}

        {renderSection(
          '3. Information Sharing',
          [
            'We may share your information in the following circumstances:',
            '• With artisans/customers to facilitate services\n• With service providers who assist in our operations\n• When required by law or legal process\n• To protect our rights and safety\n• With your explicit consent',
            'We require all third parties to maintain appropriate security measures and use your information only for specified purposes.'
          ]
        )}

        {renderSection(
          '4. Data Security',
          [
            'We implement appropriate technical and organizational measures to protect your personal information, including:',
            '• Encryption of data in transit and at rest\n• Regular security assessments and updates\n• Access controls and authentication\n• Secure data storage practices\n• Employee training on data protection',
            'However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.'
          ]
        )}

        {renderSection(
          '5. Data Retention',
          [
            'We retain your personal information for as long as necessary to:',
            '• Provide our services to you\n• Comply with legal obligations\n• Resolve disputes and enforce agreements\n• Maintain business records',
            'You may request deletion of your account and associated data at any time, subject to legal requirements.'
          ]
        )}

        {renderSection(
          '6. Your Rights',
          [
            'You have the following rights regarding your personal information:',
            '• Access: Request a copy of your personal data\n• Correction: Update or correct inaccurate information\n• Deletion: Request deletion of your personal data\n• Portability: Receive your data in a portable format\n• Objection: Object to certain processing activities\n• Restriction: Limit how we process your data',
            'To exercise these rights, please contact us using the information provided below.'
          ]
        )}

        {renderSection(
          '7. Cookies and Tracking',
          [
            'We use cookies and similar technologies to:',
            '• Remember your preferences and settings\n• Analyze app usage and performance\n• Provide personalized content\n• Ensure security and prevent fraud',
            'You can control cookie settings through your device or browser settings, though this may affect app functionality.'
          ]
        )}

        {renderSection(
          '8. Third-Party Services',
          [
            'Our service may integrate with third-party services, including:',
            '• Payment processors (for secure transactions)\n• Analytics providers (to improve our service)\n• Communication services (for messaging)\n• Cloud storage providers (for data backup)',
            'These services have their own privacy policies, and we encourage you to review them.'
          ]
        )}

        {renderSection(
          '9. Children\'s Privacy',
          [
            'Our service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.',
            'If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly.',
            'If you believe we have collected information from a child under 18, please contact us immediately.'
          ]
        )}

        {renderSection(
          '10. International Data Transfers',
          [
            'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.',
            'By using our service, you consent to the transfer of your information to countries that may have different data protection laws than your country of residence.',
            'We will take reasonable steps to ensure your information receives adequate protection.'
          ]
        )}

        {renderSection(
          '11. Changes to This Policy',
          [
            'We may update this Privacy Policy from time to time. We will notify you of any material changes by:',
            '• Posting the new policy in our app\n• Sending you an email notification\n• Displaying an in-app notification',
            'Your continued use of our service after changes constitutes acceptance of the updated policy.'
          ]
        )}

        {renderSection(
          '12. Contact Us',
          [
            'If you have any questions about this Privacy Policy or our data practices, please contact us:',
            'Email: privacy@artisanapp.com\nPhone: +233 20 123 4567\nAddress: Accra, Ghana\nData Protection Officer: dpo@artisanapp.com',
            'We will respond to your inquiry within 48 hours and work to resolve any concerns you may have.'
          ]
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using ArtisanApp, you acknowledge that you have read and understood this Privacy Policy and consent to our collection and use of your information as described herein.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  introSection: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  introText: {
    fontSize: 16,
    color: COLORS.text.primary,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    color: COLORS.text.primary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PrivacyPolicyScreen; 