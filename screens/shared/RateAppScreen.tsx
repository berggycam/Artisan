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

interface RatingCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const RateAppScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();

  // State
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState<{[key: string]: number}>({});
  const [feedback, setFeedback] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rating categories
  const ratingCategories: RatingCategory[] = [
    {
      id: 'usability',
      name: 'Ease of Use',
      icon: 'hand-left-outline',
      color: '#4ECDC4'
    },
    {
      id: 'design',
      name: 'Design & UI',
      icon: 'color-palette-outline',
      color: '#45B7D1'
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: 'speedometer-outline',
      color: '#96CEB4'
    },
    {
      id: 'features',
      name: 'Features',
      icon: 'grid-outline',
      color: '#FF6B6B'
    },
    {
      id: 'support',
      name: 'Customer Support',
      icon: 'headset-outline',
      color: '#F39C12'
    },
    {
      id: 'value',
      name: 'Value for Money',
      icon: 'wallet-outline',
      color: '#9B59B6'
    }
  ];

  // Feedback categories
  const feedbackCategories = [
    { id: 'bug', label: 'Bug Report', icon: 'bug-outline' },
    { id: 'feature', label: 'Feature Request', icon: 'add-circle-outline' },
    { id: 'improvement', label: 'Improvement', icon: 'trending-up-outline' },
    { id: 'praise', label: 'Praise', icon: 'heart-outline' },
    { id: 'complaint', label: 'Complaint', icon: 'alert-circle-outline' },
    { id: 'other', label: 'Other', icon: 'ellipsis-horizontal-outline' }
  ];

  const handleStarPress = (rating: number) => {
    setOverallRating(rating);
  };

  const handleCategoryRating = (categoryId: string, rating: number) => {
    setCategoryRatings(prev => ({
      ...prev,
      [categoryId]: rating
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmitRating = () => {
    if (overallRating === 0) {
      Alert.alert('Rating Required', 'Please provide an overall rating for the app.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (overallRating >= 4) {
        // High rating - prompt for app store review
        Alert.alert(
          'Thank You! 🎉',
          'We\'re glad you love our app! Would you like to leave a review on the App Store?',
          [
            { text: 'Not Now', style: 'cancel' },
            {
              text: 'Rate on App Store',
              onPress: () => {
                // In a real app, this would open the app store
                Alert.alert('App Store', 'This would open the App Store rating page in a real app.');
              }
            }
          ]
        );
      } else {
        // Lower rating - thank for feedback
        Alert.alert(
          'Thank You for Your Feedback',
          'We appreciate your honest feedback. We\'ll use it to improve our app.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    }, 1500);
  };

  const renderStars = (rating: number, onPress: (rating: number) => void, size: number = 24) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress(star)}
            style={styles.starButton}
          >
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={size}
              color={star <= rating ? '#FFD700' : colors.text.secondary}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderRatingCategory = (category: RatingCategory) => {
    const rating = categoryRatings[category.id] || 0;
    
    return (
      <View key={category.id} style={[styles.categoryCard, { backgroundColor: colors.surface }]}>
        <View style={styles.categoryHeader}>
          <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
            <Ionicons name={category.icon as any} size={20} color={category.color} />
          </View>
          <Text style={[styles.categoryName, { color: colors.text.primary }]}>
            {category.name}
          </Text>
        </View>
        {renderStars(rating, (r) => handleCategoryRating(category.id, r), 20)}
      </View>
    );
  };

  const renderFeedbackCategory = (category: any) => {
    const isSelected = selectedCategories.includes(category.id);
    
    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.feedbackCategory,
          { 
            backgroundColor: isSelected ? colors.primary + '20' : colors.surface,
            borderColor: isSelected ? colors.primary : colors.border
          }
        ]}
        onPress={() => handleCategoryToggle(category.id)}
      >
        <Ionicons 
          name={category.icon as any} 
          size={16} 
          color={isSelected ? colors.primary : colors.text.secondary} 
        />
        <Text style={[
          styles.feedbackCategoryText, 
          { color: isSelected ? colors.primary : colors.text.secondary }
        ]}>
          {category.label}
        </Text>
      </TouchableOpacity>
    );
  };

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
              Rate Our App
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              Help us improve your experience
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
        {/* Overall Rating */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Overall Rating
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            How would you rate your overall experience with our app?
          </Text>
          
          <View style={[styles.overallRatingCard, { backgroundColor: colors.surface }]}>
            <View style={styles.ratingContainer}>
              {renderStars(overallRating, handleStarPress, 32)}
              <Text style={[styles.ratingText, { color: colors.text.primary }]}>
                {overallRating > 0 ? `${overallRating}/5 stars` : 'Tap to rate'}
              </Text>
            </View>
          </View>
        </View>

        {/* Category Ratings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Rate by Category
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Rate specific aspects of the app (optional)
          </Text>
          
          <View style={styles.categoriesContainer}>
            {ratingCategories.map(renderRatingCategory)}
          </View>
        </View>

        {/* Feedback Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            What's this about?
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Select categories that apply to your feedback
          </Text>
          
          <View style={styles.feedbackCategoriesContainer}>
            {feedbackCategories.map(renderFeedbackCategory)}
          </View>
        </View>

        {/* Detailed Feedback */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Additional Feedback
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Tell us more about your experience (optional)
          </Text>
          
          <View style={[styles.feedbackCard, { backgroundColor: colors.surface }]}>
            <TextInput
              style={[styles.feedbackInput, { 
                backgroundColor: colors.background.secondary,
                borderColor: colors.border,
                color: colors.text.primary
              }]}
              value={feedback}
              onChangeText={setFeedback}
              placeholder="Share your thoughts, suggestions, or report issues..."
              placeholderTextColor={colors.text.secondary}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={500}
            />
            <Text style={[styles.charCount, { color: colors.text.secondary }]}>
              {feedback.length}/500 characters
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton, 
            { 
              backgroundColor: overallRating > 0 ? colors.primary : colors.border,
              opacity: isSubmitting ? 0.7 : 1
            }
          ]}
          onPress={handleSubmitRating}
          disabled={overallRating === 0 || isSubmitting}
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
              <Ionicons name="star-outline" size={20} color={colors.background.primary} />
              <Text style={[styles.submitButtonText, { color: colors.background.primary }]}>
                Submit Rating
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* App Info */}
        <View style={[styles.appInfoCard, { backgroundColor: colors.surface }]}>
          <View style={styles.appInfoHeader}>
            <View style={[styles.appIcon, { backgroundColor: colors.primary }]}>
              <Ionicons name="hammer-outline" size={24} color={colors.background.primary} />
            </View>
            <View style={styles.appInfo}>
              <Text style={[styles.appName, { color: colors.text.primary }]}>
                Artisan App
              </Text>
              <Text style={[styles.appVersion, { color: colors.text.secondary }]}>
                Version 2.1.0 (Build 421)
              </Text>
            </View>
          </View>
          <Text style={[styles.appDescription, { color: colors.text.secondary }]}>
            Connect with skilled artisans and get quality services delivered to your doorstep.
          </Text>
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
  overallRatingCard: {
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  feedbackCategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  feedbackCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  feedbackCategoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  feedbackCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  feedbackInput: {
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
    marginTop: 8,
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
  appInfoCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  appInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  appVersion: {
    fontSize: 12,
  },
  appDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default RateAppScreen; 