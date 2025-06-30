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

interface TranslationOption {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: 'content' | 'interface' | 'notifications';
}

const AutoTranslateScreen: React.FC = ({ navigation }: any) => {
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState(true);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translateOnDemand, setTranslateOnDemand] = useState(false);
  const [saveTranslations, setSaveTranslations] = useState(true);
  const [showOriginal, setShowOriginal] = useState(false);
  const [translationQuality, setTranslationQuality] = useState('balanced');
  
  const insets = useSafeAreaInsets();

  const translationOptions: TranslationOption[] = [
    {
      id: 'app_content',
      title: 'App Content',
      description: 'Translate app descriptions, categories, and general content',
      enabled: true,
      category: 'content'
    },
    {
      id: 'artisan_profiles',
      title: 'Artisan Profiles',
      description: 'Translate artisan descriptions and service details',
      enabled: true,
      category: 'content'
    },
    {
      id: 'reviews',
      title: 'Reviews & Comments',
      description: 'Translate user reviews and comments',
      enabled: false,
      category: 'content'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Translate push notifications and alerts',
      enabled: true,
      category: 'notifications'
    },
    {
      id: 'interface',
      title: 'Interface Elements',
      description: 'Translate buttons, labels, and UI text',
      enabled: true,
      category: 'interface'
    },
    {
      id: 'help_content',
      title: 'Help & Support',
      description: 'Translate help articles and support content',
      enabled: false,
      category: 'content'
    }
  ];

  const qualityOptions = [
    { id: 'fast', label: 'Fast', description: 'Quick translations, lower accuracy' },
    { id: 'balanced', label: 'Balanced', description: 'Good balance of speed and accuracy' },
    { id: 'accurate', label: 'Accurate', description: 'High accuracy, slower translations' }
  ];

  const targetLanguages = [
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

  const handleQualityChange = (quality: string) => {
    setTranslationQuality(quality);
    Alert.alert(
      'Translation Quality Changed',
      `Translation quality set to ${quality}. This may affect translation speed and accuracy.`
    );
  };

  const handleTargetLanguageChange = (languageCode: string) => {
    setTargetLanguage(languageCode);
    Alert.alert(
      'Target Language Changed',
      `Content will now be translated to ${targetLanguages.find(l => l.code === languageCode)?.name}.`
    );
  };

  const renderTranslationOption = (option: TranslationOption) => (
    <View key={option.id} style={styles.optionCard}>
      <View style={styles.optionHeader}>
        <View style={styles.optionInfo}>
          <Text style={styles.optionTitle}>{option.title}</Text>
          <Text style={styles.optionDescription}>{option.description}</Text>
        </View>
        <Switch
          value={option.enabled}
          onValueChange={(value) => {
            // Update the option enabled state
            option.enabled = value;
          }}
          trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
          thumbColor={option.enabled ? '#8B4513' : '#FFFFFF'}
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
          <Text style={styles.headerTitle}>Auto-Translate</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Main Toggle */}
        <View style={styles.mainToggleCard}>
          <View style={styles.mainToggleHeader}>
            <Ionicons name="translate" size={28} color={colors.bronze} />
            <Text style={styles.mainToggleTitle}>Auto-Translate</Text>
          </View>
          <Text style={styles.mainToggleDescription}>
            Automatically translate content to your preferred language
          </Text>
          <View style={styles.mainToggleRow}>
            <Text style={styles.mainToggleLabel}>Enable Auto-Translate</Text>
            <Switch
              value={autoTranslateEnabled}
              onValueChange={setAutoTranslateEnabled}
              trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
              thumbColor={autoTranslateEnabled ? '#8B4513' : '#FFFFFF'}
              ios_backgroundColor="#E0E0E0"
            />
          </View>
        </View>

        {/* Target Language */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Language</Text>
          <View style={styles.sectionContent}>
            {targetLanguages.map(language => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageItem,
                  targetLanguage === language.code && styles.selectedLanguageItem
                ]}
                onPress={() => handleTargetLanguageChange(language.code)}
              >
                <View style={styles.languageLeft}>
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <Text style={[styles.languageName, targetLanguage === language.code && styles.selectedLanguageName]}>
                    {language.name}
                  </Text>
                </View>
                {targetLanguage === language.code && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark" size={16} color={colors.text.white} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
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

        {/* Translation Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What to Translate</Text>
          <View style={styles.sectionContent}>
            {translationOptions.map(renderTranslationOption)}
          </View>
        </View>

        {/* Additional Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Settings</Text>
          <View style={styles.sectionContent}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Translate on Demand</Text>
                <Text style={styles.settingDescription}>Only translate when you tap the translate button</Text>
              </View>
              <Switch
                value={translateOnDemand}
                onValueChange={setTranslateOnDemand}
                trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
                thumbColor={translateOnDemand ? '#8B4513' : '#FFFFFF'}
                ios_backgroundColor="#E0E0E0"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Save Translations</Text>
                <Text style={styles.settingDescription}>Remember translations to avoid re-translating</Text>
              </View>
              <Switch
                value={saveTranslations}
                onValueChange={setSaveTranslations}
                trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
                thumbColor={saveTranslations ? '#8B4513' : '#FFFFFF'}
                ios_backgroundColor="#E0E0E0"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Show Original Text</Text>
                <Text style={styles.settingDescription}>Display original text alongside translations</Text>
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

        {/* Usage Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Translation Usage</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,247</Text>
              <Text style={styles.statLabel}>Words Translated</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>89%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2.3s</Text>
              <Text style={styles.statLabel}>Avg. Speed</Text>
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
  optionCard: {
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionInfo: {
    flex: 1,
    marginRight: responsiveSize(12),
  },
  optionTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(4),
  },
  optionDescription: {
    fontSize: responsiveSize(13),
    color: colors.brownDark,
    lineHeight: responsiveSize(18),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: responsiveSize(12),
  },
  settingTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(4),
  },
  settingDescription: {
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
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
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
  statDivider: {
    width: 1,
    height: responsiveSize(40),
    backgroundColor: colors.border,
  },
});

export default AutoTranslateScreen; 