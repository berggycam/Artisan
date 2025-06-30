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
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

const TermsOfServiceScreen: React.FC = ({ navigation }: any) => {
  const { theme } = useTheme();
  
  const renderSection = (title: string, content: string[]) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
      {content.map((paragraph, index) => (
        <Text key={index} style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
          {paragraph}
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Terms of Service</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>Last updated: January 2024</Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introSection}>
          <Text style={[styles.introText, { color: theme.colors.textSecondary }]}>
            Welcome to ArtisanApp. By using our service, you agree to these terms and conditions.
          </Text>
        </View>

        {renderSection(
          '1. Acceptance of Terms',
          [
            'By accessing and using ArtisanApp, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
            'These terms apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.'
          ]
        )}

        {renderSection(
          '2. Description of Service',
          [
            'ArtisanApp is a platform that connects users with skilled artisans and service providers. Our service includes but is not limited to:',
            '• Connecting users with verified artisans\n• Facilitating communication between users and artisans\n• Processing payments for services\n• Providing customer support and dispute resolution',
            'We reserve the right to modify, suspend, or discontinue any part of our service at any time.'
          ]
        )}

        {renderSection(
          '3. User Accounts',
          [
            'To use certain features of our service, you must create an account. You are responsible for:',
            '• Providing accurate and complete information\n• Maintaining the security of your account credentials\n• All activities that occur under your account\n• Notifying us immediately of any unauthorized use',
            'You must be at least 18 years old to create an account and use our service.'
          ]
        )}

        {renderSection(
          '4. User Conduct',
          [
            'You agree not to use the service to:',
            '• Violate any applicable laws or regulations\n• Infringe upon the rights of others\n• Post false, misleading, or fraudulent information\n• Harass, abuse, or harm other users\n• Attempt to gain unauthorized access to our systems\n• Use the service for any illegal or unauthorized purpose',
            'We reserve the right to terminate accounts that violate these terms.'
          ]
        )}

        {renderSection(
          '5. Artisan Verification',
          [
            'While we strive to verify all artisans on our platform, we cannot guarantee the quality, safety, or legality of services provided by artisans.',
            'Users are responsible for:',
            '• Conducting their own due diligence\n• Verifying artisan credentials and references\n• Ensuring services meet their requirements\n• Complying with local laws and regulations',
            'We are not liable for any damages resulting from services provided by artisans.'
          ]
        )}

        {renderSection(
          '6. Payment and Fees',
          [
            'Our service may include fees for certain transactions. All fees are clearly disclosed before you complete a transaction.',
            'You agree to:',
            '• Pay all applicable fees\n• Provide accurate payment information\n• Not attempt to circumvent payment systems\n• Accept our refund and cancellation policies',
            'Fees are non-refundable unless otherwise stated in our refund policy.'
          ]
        )}

        {renderSection(
          '7. Privacy and Data',
          [
            'Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service.',
            'By using our service, you consent to:',
            '• The collection and use of your information as described in our Privacy Policy\n• Receiving communications from us regarding your account and services\n• The use of cookies and similar technologies',
            'We implement appropriate security measures to protect your data.'
          ]
        )}

        {renderSection(
          '8. Intellectual Property',
          [
            'The service and its original content, features, and functionality are owned by ArtisanApp and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.',
            'You may not:',
            '• Copy, modify, or distribute our content without permission\n• Use our trademarks or logos without authorization\n• Reverse engineer or attempt to extract source code',
            'You retain ownership of content you submit, but grant us a license to use it.'
          ]
        )}

        {renderSection(
          '9. Limitation of Liability',
          [
            'To the maximum extent permitted by law, ArtisanApp shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
            'Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.',
            'This limitation applies to all claims, whether based on contract, tort, or any other legal theory.'
          ]
        )}

        {renderSection(
          '10. Termination',
          [
            'We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these terms.',
            'Upon termination:',
            '• Your right to use the service will cease immediately\n• We may delete your account and data\n• Any outstanding payments remain due',
            'You may terminate your account at any time by contacting our support team.'
          ]
        )}

        {renderSection(
          '11. Changes to Terms',
          [
            'We reserve the right to modify these terms at any time. We will notify users of significant changes via email or in-app notification.',
            'Your continued use of the service after changes constitutes acceptance of the new terms.',
            'It is your responsibility to review these terms periodically for changes.'
          ]
        )}

        {renderSection(
          '12. Contact Information',
          [
            'If you have any questions about these Terms of Service, please contact us:',
            'Email: legal@artisanapp.com\nPhone: +233 20 123 4567\nAddress: Accra, Ghana',
            'We will respond to your inquiry within 48 hours.'
          ]
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using ArtisanApp, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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

export default TermsOfServiceScreen; 