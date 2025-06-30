import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
// Remove usage of layout.width and layout.height since they do not exist
// If you need responsive sizing, use Dimensions from react-native instead
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  isAvailable: boolean;
  isDownloaded?: boolean;
  size?: string;
}

interface LanguageSection {
  title: string;
  languages: Language[];
}

const LanguageSettingsScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [translateMessages, setTranslateMessages] = useState(false);
  const [showNativeNames, setShowNativeNames] = useState(true);
  const [downloadLanguages, setDownloadLanguages] = useState(false);
  
  const insets = useSafeAreaInsets();

  const showComingSoon = (feature: string) => {
    Alert.alert(
      'Coming Soon',
      `${feature} feature will be available in a future update.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleLanguageChange = (languageCode: string) => {
    Alert.alert(
      'Change Language',
      'This will change the app language. Some content may remain in the original language.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Change', 
          onPress: () => {
            setSelectedLanguage(languageCode);
            showComingSoon('Language Change');
          }
        }
      ]
    );
  };

  const handleDownloadLanguage = (language: Language) => {
    Alert.alert(
      'Download Language Pack',
      `Download ${language.name} language pack (${language.size || '15 MB'}) for offline translation?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Download', 
          onPress: () => showComingSoon('Language Pack Download')
        }
      ]
    );
  };

  const handleRemoveLanguage = (language: Language) => {
    Alert.alert(
      'Remove Language Pack',
      `Remove ${language.name} language pack? You can download it again later.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => showComingSoon('Language Pack Removal')
        }
      ]
    );
  };

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'United States', isAvailable: true, isDownloaded: true },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Spain', isAvailable: true, isDownloaded: true },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'France', isAvailable: true, isDownloaded: false, size: '12 MB' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Germany', isAvailable: true, isDownloaded: false, size: '14 MB' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿', region: 'Tanzania', isAvailable: true, isDownloaded: false, size: '11 MB' },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬', region: 'Nigeria', isAvailable: true, isDownloaded: false, size: '10 MB' },
    { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳', region: 'China', isAvailable: true, isDownloaded: false, size: '18 MB' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'Saudi Arabia', isAvailable: true, isDownloaded: false, size: '14 MB' },
    // Ghanaian Languages
    { code: 'tw', name: 'Twi', nativeName: 'Twi', flag: '🇬🇭', region: 'Ghana', isAvailable: true, isDownloaded: false, size: '8.5 MB' },
    { code: 'ga', name: 'Ga', nativeName: 'Ga', flag: '🇬🇭', region: 'Ghana', isAvailable: true, isDownloaded: false, size: '7.2 MB' },
    { code: 'ew', name: 'Ewe', nativeName: 'Eʋegbe', flag: '🇬🇭', region: 'Ghana', isAvailable: true, isDownloaded: false, size: '9.1 MB' },
    { code: 'da', name: 'Dagbani', nativeName: 'Dagbani', flag: '🇬🇭', region: 'Ghana', isAvailable: true, isDownloaded: false, size: '8.8 MB' },
    { code: 'fa', name: 'Fante', nativeName: 'Fante', flag: '🇬🇭', region: 'Ghana', isAvailable: true, isDownloaded: false, size: '7.5 MB' },
    { code: 'nu', name: 'Nzema', nativeName: 'Nzema', flag: '🇬🇭', region: 'Ghana', isAvailable: true, isDownloaded: false, size: '6.9 MB' },
    { code: 'ka', name: 'Kasem', nativeName: 'Kasem', flag: '🇬🇭', region: 'Ghana', isAvailable: true, isDownloaded: false, size: '7.1 MB' },
    { code: 'wa', name: 'Wali', nativeName: 'Wali', flag: '🇬🇭', region: 'Ghana', isAvailable: true, isDownloaded: false, size: '6.5 MB' },
  ];

  const languageData: LanguageSection[] = [
    {
      title: 'Popular Languages',
      languages: [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'United States', isAvailable: true, isDownloaded: true },
        { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Spain', isAvailable: true, isDownloaded: true },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'France', isAvailable: true, isDownloaded: false, size: '12 MB' },
        { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Germany', isAvailable: true, isDownloaded: false, size: '14 MB' },
        { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', region: 'Portugal', isAvailable: true, isDownloaded: false, size: '13 MB' },
      ]
    },
    {
      title: 'African Languages',
      languages: [
        { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿', region: 'Tanzania', isAvailable: true, isDownloaded: false, size: '11 MB' },
        { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬', region: 'Nigeria', isAvailable: true, isDownloaded: false, size: '10 MB' },
        { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬', region: 'Nigeria', isAvailable: true, isDownloaded: false, size: '9 MB' },
        { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬', region: 'Nigeria', isAvailable: true, isDownloaded: false, size: '8 MB' },
        { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', region: 'Ethiopia', isAvailable: true, isDownloaded: false, size: '12 MB' },
        { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦', region: 'South Africa', isAvailable: true, isDownloaded: false, size: '10 MB' },
        { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', flag: '🇿🇦', region: 'South Africa', isAvailable: true, isDownloaded: false, size: '9 MB' },
      ]
    },
    {
      title: 'Asian Languages',
      languages: [
        { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', region: 'China', isAvailable: true, isDownloaded: false, size: '18 MB' },
        { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Japan', isAvailable: true, isDownloaded: false, size: '16 MB' },
        { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', region: 'South Korea', isAvailable: true, isDownloaded: false, size: '15 MB' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'India', isAvailable: true, isDownloaded: false, size: '13 MB' },
        { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', region: 'Thailand', isAvailable: true, isDownloaded: false, size: '11 MB' },
        { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', region: 'Vietnam', isAvailable: true, isDownloaded: false, size: '12 MB' },
      ]
    },
    {
      title: 'Other Languages',
      languages: [
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'Saudi Arabia', isAvailable: true, isDownloaded: false, size: '14 MB' },
        { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'Russia', isAvailable: true, isDownloaded: false, size: '16 MB' },
        { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'Italy', isAvailable: true, isDownloaded: false, size: '13 MB' },
        { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', region: 'Netherlands', isAvailable: true, isDownloaded: false, size: '12 MB' },
        { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', region: 'Poland', isAvailable: true, isDownloaded: false, size: '11 MB' },
        { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', region: 'Turkey', isAvailable: true, isDownloaded: false, size: '10 MB' },
      ]
    }
  ];

  const renderLanguageItem = (language: Language, isSelected: boolean) => (
    <TouchableOpacity
      key={language.code}
      style={[
        styles.languageItem,
        isSelected && styles.selectedLanguageItem
      ]}
      onPress={() => handleLanguageChange(language.code)}
      disabled={!language.isAvailable}
    >
      <View style={styles.languageLeft}>
        <Text style={styles.languageFlag}>{language.flag}</Text>
        <View style={styles.languageInfo}>
          <Text style={[styles.languageName, isSelected && styles.selectedLanguageName]}>
            {language.name}
          </Text>
          {showNativeNames && (
            <Text style={[styles.languageNative, isSelected && styles.selectedLanguageNative]}>
              {language.nativeName}
            </Text>
          )}
          <Text style={[styles.languageRegion, isSelected && styles.selectedLanguageRegion]}>
            {language.region}
          </Text>
        </View>
      </View>
      
      <View style={styles.languageRight}>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Ionicons name="checkmark" size={16} color={currentTheme.colors.background} />
          </View>
        )}
        
        {language.isDownloaded ? (
          <TouchableOpacity
            style={styles.downloadedButton}
            onPress={() => handleRemoveLanguage(language)}
          >
            <Ionicons name="trash-outline" size={16} color={currentTheme.colors.error} />
            <Text style={styles.downloadedText}>Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => handleDownloadLanguage(language)}
          >
            <Ionicons name="download-outline" size={16} color={currentTheme.colors.bronze} />
            <Text style={styles.downloadText}>{language.size}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSection = (section: LanguageSection) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.languages.map(language => 
          renderLanguageItem(language, selectedLanguage === language.code)
        )}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[currentTheme.colors.tanLight, currentTheme.colors.tan, currentTheme.colors.tanDark]}
      style={styles.gradientBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView 
        style={[styles.container, { paddingTop: insets.top }]}
        contentContainerStyle={{ paddingBottom: responsiveSize(120) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={[
              styles.headerIconBtn, 
              { 
                shadowColor: currentTheme.colors.brownDark,
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={currentTheme.colors.brownDark} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: currentTheme.colors.brownDark }]}>Language Settings</Text>
        </View>

        {/* Current Language Card */}
        <View style={[
          styles.currentLanguageCard, 
          { 
            shadowColor: currentTheme.colors.brownDark,
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }
        ]}>
          <View style={styles.currentLanguageHeader}>
            <Ionicons name="language" size={28} color={currentTheme.colors.bronze} />
            <Text style={[styles.currentLanguageTitle, { color: currentTheme.colors.brownDark }]}>Current Language</Text>
          </View>
          <View style={styles.currentLanguageInfo}>
            <Text style={[styles.currentLanguageName, { color: currentTheme.colors.brownDark }]}>
              {languages.find(l => l.code === selectedLanguage)?.name || 'English'}
            </Text>
            {showNativeNames && (
              <Text style={[styles.currentLanguageNative, { color: currentTheme.colors.bronze }]}>
                {languages.find(l => l.code === selectedLanguage)?.nativeName || 'English'}
              </Text>
            )}
            <Text style={[styles.currentLanguageRegion, { color: currentTheme.colors.brownDark }]}>
              {languages.find(l => l.code === selectedLanguage)?.region || 'United States'}
            </Text>
          </View>
        </View>

        {/* Language Preferences */}
        <View style={styles.preferencesSection}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.brownDark }]}>Translation Preferences</Text>
          <View style={[
            styles.preferencesContent, 
            { 
              shadowColor: currentTheme.colors.brownDark,
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
            }
          ]}>
            <TouchableOpacity style={[styles.preferenceItem, { borderBottomColor: currentTheme.colors.border }]} onPress={() => navigation.navigate('AutoTranslate')}>
              <View style={styles.preferenceLeft}>
                <Ionicons name="triangle-outline" size={20} color={currentTheme.colors.bronze} />
                <Text style={[styles.preferenceLabel, { color: currentTheme.colors.brownDark }]}>Auto-translate content</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.bronze} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.preferenceItem, { borderBottomColor: currentTheme.colors.border }]} onPress={() => navigation.navigate('MessageTranslation')}>
              <View style={styles.preferenceLeft}>
                <Ionicons name="chatbubble-outline" size={20} color={currentTheme.colors.bronze} />
                <Text style={[styles.preferenceLabel, { color: currentTheme.colors.brownDark }]}>Translate messages</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.bronze} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.preferenceItem, { borderBottomColor: currentTheme.colors.border }]} onPress={() => navigation.navigate('NativeNames')}>
              <View style={styles.preferenceLeft}>
                <Ionicons name="text-outline" size={20} color={currentTheme.colors.bronze} />
                <Text style={[styles.preferenceLabel, { color: currentTheme.colors.brownDark }]}>Show native names</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.bronze} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.preferenceItem} onPress={() => navigation.navigate('DownloadedLanguages')}>
              <View style={styles.preferenceLeft}>
                <Ionicons name="cloud-download-outline" size={20} color={currentTheme.colors.bronze} />
                <Text style={[styles.preferenceLabel, { color: currentTheme.colors.brownDark }]}>Downloaded languages</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={currentTheme.colors.bronze} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Language Sections */}
        {languageData.map(renderSection)}

        {/* Help Section */}
        <View style={styles.helpSection}>
          <TouchableOpacity style={[
            styles.helpButton, 
            { 
              shadowColor: currentTheme.colors.brownDark,
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
            }
          ]} onPress={() => showComingSoon('Language Help')}>
            <Ionicons name="help-circle-outline" size={20} color={currentTheme.colors.bronze} />
            <Text style={[styles.helpText, { color: currentTheme.colors.bronze }]}>Need help with languages?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  container: {
    paddingTop: responsiveSize(20),
  },
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
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: responsiveSize(24),
    fontWeight: '700',
    textAlign: 'center',
  },
  currentLanguageCard: {
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(24),
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  currentLanguageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
  },
  currentLanguageTitle: {
    fontSize: responsiveSize(18),
    fontWeight: '700',
    marginLeft: responsiveSize(12),
  },
  currentLanguageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLanguageName: {
    fontSize: responsiveSize(18),
    fontWeight: '600',
    marginBottom: responsiveSize(2),
  },
  currentLanguageNative: {
    fontSize: responsiveSize(14),
    marginBottom: responsiveSize(2),
  },
  currentLanguageRegion: {
    fontSize: responsiveSize(12),
  },
  preferencesSection: {
    marginBottom: responsiveSize(24),
  },
  sectionTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    marginBottom: responsiveSize(12),
    paddingHorizontal: responsiveSize(20),
  },
  preferencesContent: {
    borderRadius: responsiveSize(16),
    marginHorizontal: responsiveSize(20),
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    borderBottomWidth: 1,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  preferenceLabel: {
    fontSize: responsiveSize(16),
    fontWeight: '500',
    marginLeft: responsiveSize(12),
  },
  section: {
    marginBottom: responsiveSize(24),
  },
  sectionContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    marginHorizontal: responsiveSize(20),
    elevation: 2,
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
  },
  selectedLanguageItem: {
    borderLeftWidth: 4,
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
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    marginBottom: responsiveSize(2),
  },
  selectedLanguageName: {
  },
  languageNative: {
    fontSize: responsiveSize(13),
    marginBottom: responsiveSize(2),
  },
  selectedLanguageNative: {
  },
  languageRegion: {
    fontSize: responsiveSize(11),
  },
  selectedLanguageRegion: {
  },
  languageRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedIndicator: {
    width: responsiveSize(24),
    height: responsiveSize(24),
    borderRadius: responsiveSize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(12),
  },
  downloadText: {
    fontSize: responsiveSize(12),
    fontWeight: '500',
    marginLeft: responsiveSize(4),
  },
  downloadedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(12),
  },
  downloadedText: {
    fontSize: responsiveSize(12),
    fontWeight: '500',
    marginLeft: responsiveSize(4),
  },
  helpSection: {
    marginBottom: responsiveSize(24),
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    borderRadius: responsiveSize(16),
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  helpText: {
    fontSize: responsiveSize(16),
    fontWeight: '500',
    marginLeft: responsiveSize(8),
  },
});

export default LanguageSettingsScreen; 