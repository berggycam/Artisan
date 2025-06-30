import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Dimensions,
  ScrollView
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

const backgroundOptions = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean white background',
    colors: ['#FFFEF7', '#FBF8F3'],
    preview: COLORS.background.primary
  },
  {
    id: 'warm',
    name: 'Warm',
    description: 'Cozy warm tones',
    colors: ['#FDF6E3', '#F5E6D3'],
    preview: '#FDF6E3'
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Earthy green tones',
    colors: ['#F0F7F0', '#E8F5E8'],
    preview: '#F0F7F0'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange gradient',
    colors: ['#FFF8F0', '#FFE8D6'],
    preview: '#FFF8F0'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Calm blue tones',
    colors: ['#F0F8FF', '#E6F3FF'],
    preview: '#F0F8FF'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    description: 'Soft purple tones',
    colors: ['#F8F4FF', '#F0E8FF'],
    preview: '#F8F4FF'
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Dark theme',
    colors: ['#2C2C2C', '#1A1A1A'],
    preview: '#2C2C2C'
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Choose your own color',
    colors: ['#FFFEF7', '#FBF8F3'],
    preview: '#FFFEF7'
  }
];

const ChatBackgroundScreen: React.FC = ({ navigation }: any) => {
  const [selectedBackground, setSelectedBackground] = useState('default');

  const renderBackgroundOption = (option: typeof backgroundOptions[0]) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles.backgroundOption,
        selectedBackground === option.id && styles.backgroundOptionSelected
      ]}
      onPress={() => setSelectedBackground(option.id)}
      activeOpacity={0.8}
    >
      <View style={styles.backgroundPreview}>
        <LinearGradient
          colors={option.colors}
          style={styles.previewGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.previewContent}>
            <View style={styles.previewBubble}>
              <Text style={styles.previewText}>Hello!</Text>
            </View>
            <View style={styles.previewBubble2}>
              <Text style={styles.previewText2}>Hi there!</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      
      <View style={styles.backgroundInfo}>
        <Text style={[
          styles.backgroundName,
          selectedBackground === option.id && styles.backgroundNameSelected
        ]}>
          {option.name}
        </Text>
        <Text style={styles.backgroundDescription}>{option.description}</Text>
      </View>
      
      {selectedBackground === option.id && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
        </View>
      )}
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
            <Text style={styles.headerTitle}>Chat Background</Text>
            <Text style={styles.headerSubtitle}>Choose your chat theme</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              Alert.alert('Success', `Background changed to ${backgroundOptions.find(b => b.id === selectedBackground)?.name}`);
              navigation.goBack();
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Background Options */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Background</Text>
          <Text style={styles.sectionSubtitle}>
            Choose a background theme for your chat conversations
          </Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {backgroundOptions.map(renderBackgroundOption)}
        </View>
        
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="color-palette-outline" size={24} color={COLORS.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Background Themes</Text>
              <Text style={styles.infoText}>
                Choose from various background themes to personalize your chat experience. Each theme is designed to be easy on the eyes.
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
  backgroundOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  backgroundOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  backgroundPreview: {
    width: 80,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
  },
  previewGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContent: {
    width: '100%',
    paddingHorizontal: 8,
  },
  previewBubble: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 4,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  previewBubble2: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-end',
    maxWidth: '70%',
  },
  previewText: {
    fontSize: 10,
    color: COLORS.text.primary,
  },
  previewText2: {
    fontSize: 10,
    color: COLORS.text.white,
  },
  backgroundInfo: {
    flex: 1,
  },
  backgroundName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  backgroundNameSelected: {
    color: COLORS.primary,
  },
  backgroundDescription: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  selectedIndicator: {
    marginLeft: 12,
  },
  infoSection: {
    marginTop: 20,
    marginBottom: 40,
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

export default ChatBackgroundScreen; 