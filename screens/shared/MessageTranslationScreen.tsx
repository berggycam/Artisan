import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface MessageType {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: string;
}

const MessageTranslationScreen: React.FC = ({ navigation }: any) => {
  const [autoTranslateMessages, setAutoTranslateMessages] = useState(true);
  const [translateIncoming, setTranslateIncoming] = useState(true);
  const [translateOutgoing, setTranslateOutgoing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);
  const [translationLanguage, setTranslationLanguage] = useState('en');
  const [translationQuality, setTranslationQuality] = useState('balanced');
  
  const insets = useSafeAreaInsets();

  const messageTypes: MessageType[] = [
    {
      id: 'text_messages',
      title: 'Text Messages',
      description: 'Translate regular text messages',
      enabled: true,
      icon: 'chatbubble-outline'
    },
    {
      id: 'voice_messages',
      title: 'Voice Messages',
      description: 'Translate voice message transcripts',
      enabled: false,
      icon: 'mic-outline'
    },
    {
      id: 'file_names',
      title: 'File Names',
      description: 'Translate file and document names',
      enabled: true,
      icon: 'document-outline'
    },
    {
      id: 'links',
      title: 'Links & URLs',
      description: 'Translate link descriptions',
      enabled: false,
      icon: 'link-outline'
    },
    {
      id: 'emojis',
      title: 'Emoji Descriptions',
      description: 'Add descriptions for emojis',
      enabled: true,
      icon: 'happy-outline'
    }
  ];

  const qualityOptions = [
    { id: 'fast', label: 'Fast', description: 'Quick translations for real-time chat' },
    { id: 'balanced', label: 'Balanced', description: 'Good balance for most conversations' },
    { id: 'accurate', label: 'Accurate', description: 'High accuracy for important messages' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'sw', name: 'Swahili', flag: '🇹🇿' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    // Ghanaian Languages
    { code: 'tw', name: 'Twi', flag: '🇬🇭' },
    { code: 'ga', name: 'Ga', flag: '🇬🇭' },
    { code: 'ew', name: 'Ewe', flag: '🇬🇭' },
    { code: 'da', name: 'Dagbani', flag: '🇬🇭' },
    { code: 'fa', name: 'Fante', flag: '🇬🇭' },
    { code: 'nu', name: 'Nzema', flag: '🇬🇭' },
    { code: 'ka', name: 'Kasem', flag: '🇬🇭' },
    { code: 'wa', name: 'Wali', flag: '🇬🇭' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    setTranslationLanguage(languageCode);
    Alert.alert(
      'Language Changed',
      `Messages will now be translated to ${languages.find(l => l.code === languageCode)?.name}.`
    );
  };

  const handleQualityChange = (quality: string) => {
    setTranslationQuality(quality);
    Alert.alert(
      'Quality Changed',
      `Translation quality set to ${quality}. This affects speed and accuracy.`
    );
  };

  const renderMessageType = (messageType: MessageType) => (
    <View key={messageType.id} style={styles.messageTypeCard}>
      <View style={styles.messageTypeHeader}>
        <View style={styles.messageTypeInfo}>
          <Ionicons name={messageType.icon as any} size={20} color={colors.bronze} />
          <View style={styles.messageTypeText}>
            <Text style={styles.messageTypeTitle}>{messageType.title}</Text>
            <Text style={styles.messageTypeDescription}>{messageType.description}</Text>
          </View>
        </View>
        <Switch
          value={messageType.enabled}
          onValueChange={(value) => {
            messageType.enabled = value;
          }}
          trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
          thumbColor={messageType.enabled ? '#8B4513' : '#FFFFFF'}
          ios_backgroundColor="#E0E0E0"
        />
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.tanLight, colors.tan, colors.tanDark]}
      style={styles.gradientBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: responsiveSize(120) + insets.bottom }]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.brownDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Message Translation</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Main Toggle */}
        <View style={styles.mainToggleCard}>
          <View style={styles.mainToggleHeader}>
            <Ionicons name="chatbubbles" size={28} color={colors.bronze} />
            <Text style={styles.mainToggleTitle}>Message Translation</Text>
          </View>
          <Text style={styles.mainToggleDescription}>
            Automatically translate messages in your conversations
          </Text>
          <View style={styles.mainToggleRow}>
            <Text style={styles.mainToggleLabel}>Enable Message Translation</Text>
            <Switch
              value={autoTranslateMessages}
              onValueChange={setAutoTranslateMessages}
              trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
              thumbColor={autoTranslateMessages ? '#8B4513' : '#FFFFFF'}
              ios_backgroundColor="#E0E0E0"
            />
          </View>
        </View>

        {/* Translation Direction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Translation Direction</Text>
          <View style={styles.sectionContent}>
            <View style={styles.directionItem}>
              <View style={styles.directionInfo}>
                <Ionicons name="arrow-down" size={20} color={colors.bronze} />
                <View style={styles.directionText}>
                  <Text style={styles.directionTitle}>Incoming Messages</Text>
                  <Text style={styles.directionDescription}>Translate messages you receive</Text>
                </View>
              </View>
              <Switch
                value={translateIncoming}
                onValueChange={setTranslateIncoming}
                trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
                thumbColor={translateIncoming ? '#8B4513' : '#FFFFFF'}
                ios_backgroundColor="#E0E0E0"
              />
            </View>
            
            <View style={styles.directionItem}>
              <View style={styles.directionInfo}>
                <Ionicons name="arrow-up" size={20} color={colors.bronze} />
                <View style={styles.directionText}>
                  <Text style={styles.directionTitle}>Outgoing Messages</Text>
                  <Text style={styles.directionDescription}>Translate messages you send</Text>
                </View>
              </View>
              <Switch
                value={translateOutgoing}
                onValueChange={setTranslateOutgoing}
                trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
                thumbColor={translateOutgoing ? '#8B4513' : '#FFFFFF'}
                ios_backgroundColor="#E0E0E0"
              />
            </View>
          </View>
        </View>

        {/* Target Language */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Language</Text>
          <View style={styles.sectionContent}>
            {languages.map(language => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageItem,
                  translationLanguage === language.code && styles.selectedLanguageItem
                ]}
                onPress={() => handleLanguageChange(language.code)}
              >
                <View style={styles.languageLeft}>
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <Text style={[styles.languageName, translationLanguage === language.code && styles.selectedLanguageName]}>
                    {language.name}
                  </Text>
                </View>
                {translationLanguage === language.code && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark" size={16} color={colors.text.white} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Message Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Message Types</Text>
          <View style={styles.sectionContent}>
            {messageTypes.map(renderMessageType)}
          </View>
        </View>

        {/* Translation Quality */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Translation Quality</Text>
          <View style={styles.sectionContent}>
            {qualityOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.qualityItem,
                  translationQuality === option.id && styles.selectedQualityItem
                ]}
                onPress={() => handleQualityChange(option.id)}
              >
                <View style={styles.qualityInfo}>
                  <Text style={[styles.qualityTitle, translationQuality === option.id && styles.selectedQualityTitle]}>
                    {option.label}
                  </Text>
                  <Text style={[styles.qualityDescription, translationQuality === option.id && styles.selectedQualityDescription]}>
                    {option.description}
                  </Text>
                </View>
                {translationQuality === option.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark" size={16} color={colors.text.white} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Display Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display Options</Text>
          <View style={styles.sectionContent}>
            <View style={styles.displayItem}>
              <View style={styles.displayInfo}>
                <Text style={styles.displayTitle}>Show Original Text</Text>
                <Text style={styles.displayDescription}>Display original message alongside translation</Text>
              </View>
              <Switch
                value={showOriginal}
                onValueChange={setShowOriginal}
                trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
                thumbColor={showOriginal ? '#8B4513' : '#FFFFFF'}
                ios_backgroundColor="#E0E0E0"
              />
            </View>
          </View>
        </View>

        {/* Translation Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Translation Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>847</Text>
              <Text style={styles.statLabel}>Messages Translated</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>92%</Text>
              <Text style={styles.statLabel}>Accuracy Rate</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.8s</Text>
              <Text style={styles.statLabel}>Avg. Response Time</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Languages Used</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBg: { flex: 1 },
  scrollContent: { paddingTop: responsiveSize(20) },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(24),
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: responsiveSize(24),
    fontWeight: '700',
    color: colors.brownDark,
    textAlign: 'center',
  },
  mainToggleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(24),
    elevation: 3,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  mainToggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(12),
  },
  mainToggleTitle: {
    fontSize: responsiveSize(20),
    fontWeight: '700',
    color: colors.brownDark,
    marginLeft: responsiveSize(12),
  },
  mainToggleDescription: {
    fontSize: responsiveSize(14),
    color: colors.brownDark,
    marginBottom: responsiveSize(16),
    lineHeight: responsiveSize(20),
  },
  mainToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainToggleLabel: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
  },
  section: {
    marginBottom: responsiveSize(24),
  },
  sectionTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(12),
    paddingHorizontal: responsiveSize(20),
  },
  sectionContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    marginHorizontal: responsiveSize(20),
    elevation: 2,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  directionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  directionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  directionText: {
    marginLeft: responsiveSize(12),
    flex: 1,
  },
  directionTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(2),
  },
  directionDescription: {
    fontSize: responsiveSize(13),
    color: colors.brownDark,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedLanguageItem: {
    backgroundColor: colors.bronze + '10',
    borderLeftWidth: 4,
    borderLeftColor: colors.bronze,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageFlag: {
    fontSize: responsiveSize(24),
    marginRight: responsiveSize(12),
  },
  languageName: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
  },
  selectedLanguageName: {
    color: colors.bronze,
  },
  selectedIndicator: {
    width: responsiveSize(24),
    height: responsiveSize(24),
    borderRadius: responsiveSize(12),
    backgroundColor: colors.bronze,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageTypeCard: {
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  messageTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  messageTypeText: {
    marginLeft: responsiveSize(12),
    flex: 1,
  },
  messageTypeTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(2),
  },
  messageTypeDescription: {
    fontSize: responsiveSize(13),
    color: colors.brownDark,
  },
  qualityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedQualityItem: {
    backgroundColor: colors.bronze + '10',
    borderLeftWidth: 4,
    borderLeftColor: colors.bronze,
  },
  qualityInfo: {
    flex: 1,
  },
  qualityTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(2),
  },
  selectedQualityTitle: {
    color: colors.bronze,
  },
  qualityDescription: {
    fontSize: responsiveSize(13),
    color: colors.brownDark,
  },
  selectedQualityDescription: {
    color: colors.bronze,
  },
  displayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
  },
  displayInfo: {
    flex: 1,
    marginRight: responsiveSize(12),
  },
  displayTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(4),
  },
  displayDescription: {
    fontSize: responsiveSize(13),
    color: colors.brownDark,
    lineHeight: responsiveSize(18),
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(24),
    elevation: 3,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statsTitle: {
    fontSize: responsiveSize(18),
    fontWeight: '700',
    color: colors.brownDark,
    marginBottom: responsiveSize(16),
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: responsiveSize(16),
  },
  statValue: {
    fontSize: responsiveSize(24),
    fontWeight: '700',
    color: colors.bronze,
    marginBottom: responsiveSize(4),
  },
  statLabel: {
    fontSize: responsiveSize(12),
    color: colors.brownDark,
    textAlign: 'center',
  },
});

export default MessageTranslationScreen; 