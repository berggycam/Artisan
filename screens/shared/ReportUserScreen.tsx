import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

const ReportUserScreen: React.FC = ({ navigation, route }: any) => {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [includeEvidence, setIncludeEvidence] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportCategories = [
    {
      id: 'harassment',
      title: 'Harassment or Bullying',
      description: 'Unwanted, offensive, or threatening behavior',
      icon: 'warning-outline',
      color: colors.error
    },
    {
      id: 'spam',
      title: 'Spam or Scam',
      description: 'Unsolicited messages or fraudulent activity',
      icon: 'mail-unread-outline',
      color: colors.warning
    },
    {
      id: 'inappropriate',
      title: 'Inappropriate Content',
      description: 'Offensive, explicit, or unsuitable material',
      icon: 'eye-off-outline',
      color: colors.error
    },
    {
      id: 'fake',
      title: 'Fake Profile',
      description: 'Impersonation or false identity',
      icon: 'person-remove-outline',
      color: colors.warning
    },
    {
      id: 'violence',
      title: 'Violence or Threats',
      description: 'Physical threats or violent content',
      icon: 'shield-outline',
      color: colors.error
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Other violations not listed above',
      icon: 'ellipsis-horizontal-outline',
      color: colors.textSecondary
    }
  ];

  const renderCategoryOption = (category: typeof reportCategories[0]) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryOption,
        { backgroundColor: colors.surface },
        selectedCategory === category.id && [
          styles.selectedCategoryOption,
          { 
            borderColor: colors.bronze,
            backgroundColor: colors.bronze + '10'
          }
        ]
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
          <Ionicons name={category.icon as any} size={24} color={category.color} />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={[styles.categoryTitle, { color: colors.text }]}>{category.title}</Text>
          <Text style={[styles.categoryDescription, { color: colors.textSecondary }]}>{category.description}</Text>
        </View>
        {selectedCategory === category.id && (
          <Ionicons name="checkmark-circle" size={24} color={colors.bronze} />
        )}
      </View>
    </TouchableOpacity>
  );

  const handleSubmit = () => {
    if (!selectedCategory) {
      Alert.alert('Missing Information', 'Please select a report category.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Missing Information', 'Please provide a description of the issue.');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Report Submitted',
        'Thank you for your report. We will review it and take appropriate action. You will be notified of any updates.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }, 2000);
  };

  const canSubmit = selectedCategory && description.trim().length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { color: colors.text }]}>Report User</Text>
          
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={[styles.userInfoCard, { backgroundColor: colors.surface }]}>
          <View style={styles.userInfo}>
            <View style={[styles.userAvatar, { backgroundColor: colors.tanLight }]}>
              <Ionicons name="person" size={24} color={colors.textSecondary} />
            </View>
            <View style={styles.userDetailsRow}>
              <Ionicons name="flag" size={22} color={colors.error} style={{ marginRight: 8 }} />
              <View style={styles.userDetails}>
                <Text style={[styles.userName, { color: colors.text }]}>Sarah Johnson</Text>
                <Text style={[styles.userType, { color: colors.textSecondary }]}>Hair Stylist</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Report Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>What's the issue?</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Select the category that best describes the problem</Text>
          
          <View style={styles.categoriesContainer}>
            {reportCategories.map(renderCategoryOption)}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Additional Details</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Please provide specific details about the incident</Text>
          
          <View style={[styles.descriptionContainer, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.descriptionInput, { color: colors.text }]}
              placeholder="Describe what happened, when it occurred, and any other relevant details..."
              placeholderTextColor={colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            <Text style={[styles.characterCount, { color: colors.textSecondary }]}>
              {description.length}/1000 characters
            </Text>
          </View>
        </View>

        {/* Evidence */}
        <View style={styles.section}>
          <View style={[styles.evidenceCard, { backgroundColor: colors.surface }]}>
            <View style={styles.evidenceHeader}>
              <Ionicons name="camera-outline" size={20} color={colors.bronze} />
              <Text style={[styles.evidenceTitle, { color: colors.text }]}>Include Evidence</Text>
            </View>
            <Text style={[styles.evidenceDescription, { color: colors.textSecondary }]}>
              Add screenshots or other evidence to help us investigate
            </Text>
            <TouchableOpacity style={[styles.addEvidenceButton, { borderColor: colors.bronze }]}>
              <Ionicons name="add" size={20} color={colors.bronze} />
              <Text style={[styles.addEvidenceButtonText, { color: colors.bronze }]}>Add Screenshots</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Important Notice */}
        <View style={styles.section}>
          <View style={[styles.noticeCard, { backgroundColor: colors.warning + '10' }]}>
            <Ionicons name="information-circle-outline" size={20} color={colors.warning} />
            <View style={styles.noticeContent}>
              <Text style={[styles.noticeTitle, { color: colors.warning }]}>Important</Text>
              <Text style={[styles.noticeText, { color: colors.textSecondary }]}>
                False reports may result in account suspension. Please ensure your report is accurate and truthful.
              </Text>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: colors.error },
              !canSubmit && [styles.submitButtonDisabled, { backgroundColor: colors.textSecondary }],
              isSubmitting && [styles.submitButtonSubmitting, { backgroundColor: colors.textSecondary }]
            ]}
            onPress={handleSubmit}
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Ionicons name="hourglass-outline" size={20} color={colors.background} />
                <Text style={[styles.submitButtonText, { color: colors.background }]}>Submitting...</Text>
              </>
            ) : (
              <>
                <Ionicons name="send-outline" size={20} color={colors.background} />
                <Text style={[styles.submitButtonText, { color: colors.background }]}>Submit Report</Text>
              </>
            )}
          </TouchableOpacity>
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
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userType: {
    fontSize: 14,
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
    marginBottom: 16,
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryOption: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategoryOption: {
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  descriptionContainer: {
    borderRadius: 12,
    padding: 16,
  },
  descriptionInput: {
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 8,
  },
  evidenceCard: {
    borderRadius: 12,
    padding: 16,
  },
  evidenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  evidenceTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  evidenceDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 18,
  },
  addEvidenceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  addEvidenceButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  noticeCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 18,
  },
  submitButtonContainer: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonDisabled: {
  },
  submitButtonSubmitting: {
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportUserScreen; 