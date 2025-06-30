import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
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

const fontSizes = [
  { id: 'small', name: 'Small', size: 14, description: 'Compact text for more content' },
  { id: 'medium', name: 'Medium', size: 16, description: 'Standard size for most users' },
  { id: 'large', name: 'Large', size: 18, description: 'Easier to read for accessibility' },
  { id: 'extra-large', name: 'Extra Large', size: 20, description: 'Maximum readability' }
];

const FontSizeScreen: React.FC = ({ navigation }: any) => {
  const [selectedSize, setSelectedSize] = useState('medium');

  const renderFontSizeOption = (option: typeof fontSizes[0]) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles.fontOption,
        selectedSize === option.id && styles.fontOptionSelected
      ]}
      onPress={() => setSelectedSize(option.id)}
      activeOpacity={0.8}
    >
      <View style={styles.fontOptionHeader}>
        <View style={styles.fontOptionInfo}>
          <Text style={[
            styles.fontOptionName,
            { fontSize: option.size },
            selectedSize === option.id && styles.fontOptionNameSelected
          ]}>
            {option.name}
          </Text>
          <Text style={styles.fontOptionDescription}>{option.description}</Text>
        </View>
        
        {selectedSize === option.id && (
          <View style={styles.selectedIndicator}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
          </View>
        )}
      </View>
      
      <View style={styles.previewContainer}>
        <Text style={[
          styles.previewText,
          { fontSize: option.size }
        ]}>
          "Hello! I'm available for your project. When would you like me to start?"
        </Text>
      </View>
    </TouchableOpacity>
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
            <Text style={styles.headerTitle}>Font Size</Text>
            <Text style={styles.headerSubtitle}>Choose your preferred text size</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              // Save the selected font size
              Alert.alert('Success', `Font size changed to ${fontSizes.find(f => f.id === selectedSize)?.name}`);
              navigation.goBack();
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Font Size Options */}
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Font Size</Text>
          <Text style={styles.sectionSubtitle}>
            Preview how your messages will appear with different font sizes
          </Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {fontSizes.map(renderFontSizeOption)}
        </View>
        
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Accessibility</Text>
              <Text style={styles.infoText}>
                Larger font sizes improve readability for users with visual impairments or those who prefer bigger text.
              </Text>
            </View>
          </View>
        </View>
      </View>
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
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  fontOption: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  fontOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  fontOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fontOptionInfo: {
    flex: 1,
  },
  fontOptionName: {
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  fontOptionNameSelected: {
    color: COLORS.primary,
  },
  fontOptionDescription: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  selectedIndicator: {
    marginLeft: 12,
  },
  previewContainer: {
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  previewText: {
    color: COLORS.text.primary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  infoSection: {
    marginTop: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 16,
  },
});

export default FontSizeScreen; 