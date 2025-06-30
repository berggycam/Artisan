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
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface BugCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface BugPriority {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

const ReportBugScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [bugTitle, setBugTitle] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [expectedBehavior, setExpectedBehavior] = useState('');
  const [actualBehavior, setActualBehavior] = useState('');
  const [deviceInfo, setDeviceInfo] = useState('iPhone 14 Pro, iOS 17.1');
  const [appVersion, setAppVersion] = useState('2.1.0 (Build 421)');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bug categories
  const bugCategories: BugCategory[] = [
    {
      id: 'crash',
      name: 'App Crash',
      description: 'App closes unexpectedly or freezes',
      icon: 'warning-outline',
      color: '#FF6B6B'
    },
    {
      id: 'ui',
      name: 'UI/Display Issue',
      description: 'Visual problems, layout issues, or display bugs',
      icon: 'eye-outline',
      color: '#4ECDC4'
    },
    {
      id: 'functionality',
      name: 'Functionality Bug',
      description: 'Features not working as expected',
      icon: 'settings-outline',
      color: '#45B7D1'
    },
    {
      id: 'performance',
      name: 'Performance Issue',
      description: 'Slow loading, lag, or performance problems',
      icon: 'speedometer-outline',
      color: '#96CEB4'
    },
    {
      id: 'network',
      name: 'Network/Connection',
      description: 'Connection issues, API errors, or network problems',
      icon: 'wifi-outline',
      color: '#F39C12'
    },
    {
      id: 'data',
      name: 'Data Issue',
      description: 'Data loss, sync problems, or incorrect information',
      icon: 'document-outline',
      color: '#9B59B6'
    }
  ];

  // Bug priorities
  const bugPriorities: BugPriority[] = [
    {
      id: 'critical',
      name: 'Critical',
      description: 'App crashes or major functionality broken',
      color: '#FF6B6B',
      icon: 'alert-circle'
    },
    {
      id: 'high',
      name: 'High',
      description: 'Important feature not working',
      color: '#FF8E53',
      icon: 'warning'
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Minor issue affecting usability',
      color: '#FFD93D',
      icon: 'information-circle'
    },
    {
      id: 'low',
      name: 'Low',
      description: 'Cosmetic issue or minor annoyance',
      color: '#6BCF7F',
      icon: 'checkmark-circle'
    }
  ];

  const handleAddScreenshot = () => {
    // In a real app, this would open camera/gallery
    Alert.alert(
      'Add Screenshot',
      'This would open camera/gallery to add a screenshot in a real app.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Simulate Add',
          onPress: () => {
            // Simulate adding a screenshot
            setScreenshots(prev => [...prev, 'screenshot_' + (prev.length + 1)]);
            Alert.alert('Screenshot Added', 'Screenshot added successfully!');
          }
        }
      ]
    );
  };

  const handleRemoveScreenshot = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitBug = () => {
    if (!selectedCategory) {
      Alert.alert('Category Required', 'Please select a bug category.');
      return;
    }
    if (!selectedPriority) {
      Alert.alert('Priority Required', 'Please select a bug priority.');
      return;
    }
    if (!bugTitle.trim()) {
      Alert.alert('Title Required', 'Please enter a title for the bug report.');
      return;
    }
    if (!bugDescription.trim()) {
      Alert.alert('Description Required', 'Please describe the bug.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      Alert.alert(
        'Bug Report Submitted',
        'Thank you for reporting this bug! Our development team will investigate and get back to you soon.',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    }, 2000);
  };

  const renderBugCategory = (category: BugCategory) => {
    const isSelected = selectedCategory === category.id;
    
    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryCard,
          { 
            backgroundColor: isSelected ? category.color + '20' : colors.surface,
            borderColor: isSelected ? category.color : colors.border
          }
        ]}
        onPress={() => setSelectedCategory(category.id)}
      >
        <View style={styles.categoryContent}>
          <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
            <Ionicons name={category.icon as any} size={24} color={category.color} />
          </View>
          <View style={styles.categoryText}>
            <Text style={[
              styles.categoryName, 
              { color: isSelected ? category.color : colors.text.primary }
            ]}>
              {category.name}
            </Text>
            <Text style={[styles.categoryDescription, { color: colors.text.secondary }]}>
              {category.description}
            </Text>
          </View>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={24} color={category.color} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderBugPriority = (priority: BugPriority) => {
    const isSelected = selectedPriority === priority.id;
    
    return (
      <TouchableOpacity
        key={priority.id}
        style={[
          styles.priorityCard,
          { 
            backgroundColor: isSelected ? priority.color + '20' : colors.surface,
            borderColor: isSelected ? priority.color : colors.border
          }
        ]}
        onPress={() => setSelectedPriority(priority.id)}
      >
        <View style={styles.priorityContent}>
          <Ionicons 
            name={priority.icon as any} 
            size={20} 
            color={isSelected ? priority.color : colors.text.secondary} 
          />
          <View style={styles.priorityText}>
            <Text style={[
              styles.priorityName, 
              { color: isSelected ? priority.color : colors.text.primary }
            ]}>
              {priority.name}
            </Text>
            <Text style={[styles.priorityDescription, { color: colors.text.secondary }]}>
              {priority.description}
            </Text>
          </View>
          {isSelected && (
            <View style={[styles.priorityIndicator, { backgroundColor: priority.color }]} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderScreenshot = (screenshot: string, index: number) => (
    <View key={index} style={styles.screenshotContainer}>
      <View style={[styles.screenshotPreview, { backgroundColor: colors.background.secondary }]}>
        <Ionicons name="image-outline" size={32} color={colors.text.secondary} />
        <Text style={[styles.screenshotText, { color: colors.text.secondary }]}>
          Screenshot {index + 1}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.removeScreenshot, { backgroundColor: colors.error }]}
        onPress={() => handleRemoveScreenshot(index)}
      >
        <Ionicons name="close" size={16} color={colors.background.primary} />
      </TouchableOpacity>
    </View>
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
              Report a Bug
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              Help us fix issues and improve the app
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
        {/* Bug Category */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Bug Category *
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            What type of issue are you experiencing?
          </Text>
          
          <View style={styles.categoriesContainer}>
            {bugCategories.map(renderBugCategory)}
          </View>
        </View>

        {/* Bug Priority */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Priority Level *
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            How critical is this issue?
          </Text>
          
          <View style={styles.prioritiesContainer}>
            {bugPriorities.map(renderBugPriority)}
          </View>
        </View>

        {/* Bug Title */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Bug Title *
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            A brief, descriptive title for the issue
          </Text>
          
          <View style={[styles.inputCard, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: colors.background.secondary,
                borderColor: colors.border,
                color: colors.text.primary
              }]}
              value={bugTitle}
              onChangeText={setBugTitle}
              placeholder="e.g., App crashes when opening profile"
              placeholderTextColor={colors.text.secondary}
              maxLength={100}
            />
            <Text style={[styles.charCount, { color: colors.text.secondary }]}>
              {bugTitle.length}/100 characters
            </Text>
          </View>
        </View>

        {/* Bug Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Bug Description *
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Describe what happened and what you expected
          </Text>
          
          <View style={[styles.inputCard, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.textArea, { 
                backgroundColor: colors.background.secondary,
                borderColor: colors.border,
                color: colors.text.primary
              }]}
              value={bugDescription}
              onChangeText={setBugDescription}
              placeholder="Describe the bug in detail..."
              placeholderTextColor={colors.text.secondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={500}
            />
            <Text style={[styles.charCount, { color: colors.text.secondary }]}>
              {bugDescription.length}/500 characters
            </Text>
          </View>
        </View>

        {/* Steps to Reproduce */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Steps to Reproduce
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Help us recreate the issue (optional)
          </Text>
          
          <View style={[styles.inputCard, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.textArea, { 
                backgroundColor: colors.background.secondary,
                borderColor: colors.border,
                color: colors.text.primary
              }]}
              value={stepsToReproduce}
              onChangeText={setStepsToReproduce}
              placeholder="1. Open the app\n2. Go to profile\n3. Tap settings\n4. App crashes"
              placeholderTextColor={colors.text.secondary}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={1000}
            />
            <Text style={[styles.charCount, { color: colors.text.secondary }]}>
              {stepsToReproduce.length}/1000 characters
            </Text>
          </View>
        </View>

        {/* Expected vs Actual Behavior */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Expected vs Actual Behavior
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            What should happen vs what actually happened
          </Text>
          
          <View style={styles.behaviorContainer}>
            <View style={[styles.behaviorCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.behaviorTitle, { color: colors.text.primary }]}>
                Expected Behavior
              </Text>
              <TextInput
                style={[styles.textArea, { 
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.border,
                  color: colors.text.primary
                }]}
                value={expectedBehavior}
                onChangeText={setExpectedBehavior}
                placeholder="What should happen?"
                placeholderTextColor={colors.text.secondary}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                maxLength={300}
              />
            </View>
            
            <View style={[styles.behaviorCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.behaviorTitle, { color: colors.text.primary }]}>
                Actual Behavior
              </Text>
              <TextInput
                style={[styles.textArea, { 
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.border,
                  color: colors.text.primary
                }]}
                value={actualBehavior}
                onChangeText={setActualBehavior}
                placeholder="What actually happened?"
                placeholderTextColor={colors.text.secondary}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                maxLength={300}
              />
            </View>
          </View>
        </View>

        {/* Screenshots */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Screenshots
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Add screenshots to help us understand the issue
          </Text>
          
          <View style={styles.screenshotsContainer}>
            {screenshots.map(renderScreenshot)}
            
            {screenshots.length < 3 && (
              <TouchableOpacity
                style={[styles.addScreenshot, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={handleAddScreenshot}
              >
                <Ionicons name="add" size={32} color={colors.text.secondary} />
                <Text style={[styles.addScreenshotText, { color: colors.text.secondary }]}>
                  Add Screenshot
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Device Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Device Information
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            This helps us identify device-specific issues
          </Text>
          
          <View style={[styles.deviceInfoCard, { backgroundColor: colors.surface }]}>
            <View style={styles.deviceInfoRow}>
              <Ionicons name="phone-portrait-outline" size={16} color={colors.text.secondary} />
              <Text style={[styles.deviceInfoText, { color: colors.text.secondary }]}>
                {deviceInfo}
              </Text>
            </View>
            <View style={styles.deviceInfoRow}>
              <Ionicons name="apps-outline" size={16} color={colors.text.secondary} />
              <Text style={[styles.deviceInfoText, { color: colors.text.secondary }]}>
                {appVersion}
              </Text>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton, 
            { 
              backgroundColor: (selectedCategory && selectedPriority && bugTitle.trim() && bugDescription.trim()) 
                ? colors.primary 
                : colors.border,
              opacity: isSubmitting ? 0.7 : 1
            }
          ]}
          onPress={handleSubmitBug}
          disabled={!selectedCategory || !selectedPriority || !bugTitle.trim() || !bugDescription.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <View style={styles.loadingContainer}>
              <Ionicons name="hourglass-outline" size={20} color={colors.background.primary} />
              <Text style={[styles.submitButtonText, { color: colors.background.primary }]}>
                Submitting...
              </Text>
            </View>
          ) : (
            <>
              <Ionicons name="bug-outline" size={20} color={colors.background.primary} />
              <Text style={[styles.submitButtonText, { color: colors.background.primary }]}>
                Submit Bug Report
              </Text>
            </>
          )}
        </TouchableOpacity>
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
  categoriesContainer: {
    gap: 12,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryText: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  prioritiesContainer: {
    gap: 8,
  },
  priorityCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  priorityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    marginLeft: 12,
    flex: 1,
  },
  priorityName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  priorityDescription: {
    fontSize: 12,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  inputCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
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
    minHeight: 80,
  },
  charCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 8,
  },
  behaviorContainer: {
    gap: 12,
  },
  behaviorCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  behaviorTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  screenshotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  screenshotContainer: {
    position: 'relative',
  },
  screenshotPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  screenshotText: {
    fontSize: 10,
    marginTop: 4,
  },
  removeScreenshot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addScreenshot: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addScreenshotText: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  deviceInfoCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  deviceInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deviceInfoText: {
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
    marginBottom: 24,
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default ReportBugScreen; 