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

const bubbleStyles = [
  { 
    id: 'rounded', 
    name: 'Rounded', 
    description: 'Classic rounded corners',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  { 
    id: 'square', 
    name: 'Square', 
    description: 'Modern square design',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  { 
    id: 'pill', 
    name: 'Pill', 
    description: 'Oval pill shape',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  { 
    id: 'minimal', 
    name: 'Minimal', 
    description: 'Clean and simple',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10
  }
];

const BubbleStyleScreen: React.FC = ({ navigation }: any) => {
  const [selectedStyle, setSelectedStyle] = useState('rounded');

  const renderBubbleStyleOption = (style: typeof bubbleStyles[0]) => (
    <TouchableOpacity
      key={style.id}
      style={[
        styles.styleOption,
        selectedStyle === style.id && styles.styleOptionSelected
      ]}
      onPress={() => setSelectedStyle(style.id)}
      activeOpacity={0.8}
    >
      <View style={styles.styleOptionHeader}>
        <View style={styles.styleOptionInfo}>
          <Text style={[
            styles.styleOptionName,
            selectedStyle === style.id && styles.styleOptionNameSelected
          ]}>
            {style.name}
          </Text>
          <Text style={styles.styleOptionDescription}>{style.description}</Text>
        </View>
        
        {selectedStyle === style.id && (
          <View style={styles.selectedIndicator}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
          </View>
        )}
      </View>
      
      <View style={styles.previewContainer}>
        <View style={styles.previewRow}>
          {/* Incoming message */}
          <View style={styles.incomingContainer}>
            <View style={[
              styles.messageBubble,
              styles.incomingBubble,
              {
                borderRadius: style.borderRadius,
                paddingHorizontal: style.paddingHorizontal,
                paddingVertical: style.paddingVertical
              }
            ]}>
              <Text style={styles.messageText}>Hello! How can I help you today?</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.previewRow}>
          {/* Outgoing message */}
          <View style={styles.outgoingContainer}>
            <View style={[
              styles.messageBubble,
              styles.outgoingBubble,
              {
                borderRadius: style.borderRadius,
                paddingHorizontal: style.paddingHorizontal,
                paddingVertical: style.paddingVertical
              }
            ]}>
              <Text style={[styles.messageText, styles.outgoingText]}>
                I need help with a project
              </Text>
            </View>
          </View>
        </View>
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
            <Text style={styles.headerTitle}>Bubble Style</Text>
            <Text style={styles.headerSubtitle}>Choose your message appearance</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              Alert.alert('Success', `Bubble style changed to ${bubbleStyles.find(s => s.id === selectedStyle)?.name}`);
              navigation.goBack();
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Bubble Style Options */}
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Bubble Style</Text>
          <Text style={styles.sectionSubtitle}>
            Preview how your messages will look with different bubble styles
          </Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {bubbleStyles.map(renderBubbleStyleOption)}
        </View>
        
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="chatbubbles-outline" size={24} color={COLORS.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Message Bubbles</Text>
              <Text style={styles.infoText}>
                Choose the visual style for your chat messages. This affects both incoming and outgoing messages.
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
  styleOption: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  styleOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  styleOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  styleOptionInfo: {
    flex: 1,
  },
  styleOptionName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  styleOptionNameSelected: {
    color: COLORS.primary,
  },
  styleOptionDescription: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  selectedIndicator: {
    marginLeft: 12,
  },
  previewContainer: {
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  previewRow: {
    marginBottom: 12,
  },
  incomingContainer: {
    alignItems: 'flex-start',
  },
  outgoingContainer: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
  },
  incomingBubble: {
    backgroundColor: COLORS.background.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  outgoingBubble: {
    backgroundColor: COLORS.primary,
  },
  messageText: {
    fontSize: 14,
    color: COLORS.text.primary,
    lineHeight: 18,
  },
  outgoingText: {
    color: COLORS.text.white,
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

export default BubbleStyleScreen; 