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

interface LanguageDisplay {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  showNative: boolean;
  showEnglish: boolean;
  showBoth: boolean;
}

const NativeNamesScreen: React.FC = ({ navigation }: any) => {
  const [globalNativeNames, setGlobalNativeNames] = useState(true);
  const [showBothNames, setShowBothNames] = useState(false);
  const [preferNative, setPreferNative] = useState(true);
  const [showRegion, setShowRegion] = useState(true);
  
  const insets = useSafeAreaInsets();

  const languages: LanguageDisplay[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'United States', showNative: true, showEnglish: true, showBoth: false },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Spain', showNative: true, showEnglish: true, showBoth: false },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'France', showNative: true, showEnglish: true, showBoth: false },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Germany', showNative: true, showEnglish: true, showBoth: false },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿', region: 'Tanzania', showNative: true, showEnglish: true, showBoth: false },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬', region: 'Nigeria', showNative: true, showEnglish: true, showBoth: false },
    { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬', region: 'Nigeria', showNative: true, showEnglish: true, showBoth: false },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬', region: 'Nigeria', showNative: true, showEnglish: true, showBoth: false },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', region: 'Ethiopia', showNative: true, showEnglish: true, showBoth: false },
    { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦', region: 'South Africa', showNative: true, showEnglish: true, showBoth: false },
    { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', flag: '🇿🇦', region: 'South Africa', showNative: true, showEnglish: true, showBoth: false },
    { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳', region: 'China', showNative: true, showEnglish: true, showBoth: false },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Japan', showNative: true, showEnglish: true, showBoth: false },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', region: 'South Korea', showNative: true, showEnglish: true, showBoth: false },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'India', showNative: true, showEnglish: true, showBoth: false },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'Saudi Arabia', showNative: true, showEnglish: true, showBoth: false },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'Russia', showNative: true, showEnglish: true, showBoth: false },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', region: 'Thailand', showNative: true, showEnglish: true, showBoth: false },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', region: 'Vietnam', showNative: true, showEnglish: true, showBoth: false },
    // Ghanaian Languages
    { code: 'tw', name: 'Twi', nativeName: 'Twi', flag: '🇬🇭', region: 'Ghana', showNative: true, showEnglish: true, showBoth: false },
    { code: 'ga', name: 'Ga', nativeName: 'Ga', flag: '🇬🇭', region: 'Ghana', showNative: true, showEnglish: true, showBoth: false },
    { code: 'ew', name: 'Ewe', nativeName: 'Eʋegbe', flag: '🇬🇭', region: 'Ghana', showNative: true, showEnglish: true, showBoth: false },
    { code: 'da', name: 'Dagbani', nativeName: 'Dagbani', flag: '🇬🇭', region: 'Ghana', showNative: true, showEnglish: true, showBoth: false },
    { code: 'fa', name: 'Fante', nativeName: 'Fante', flag: '🇬🇭', region: 'Ghana', showNative: true, showEnglish: true, showBoth: false },
    { code: 'nu', name: 'Nzema', nativeName: 'Nzema', flag: '🇬🇭', region: 'Ghana', showNative: true, showEnglish: true, showBoth: false },
    { code: 'ka', name: 'Kasem', nativeName: 'Kasem', flag: '🇬🇭', region: 'Ghana', showNative: true, showEnglish: true, showBoth: false },
    { code: 'wa', name: 'Wali', nativeName: 'Wali', flag: '🇬🇭', region: 'Ghana', showNative: true, showEnglish: true, showBoth: false },
  ];

  const handleLanguageDisplayChange = (languageCode: string, displayType: 'native' | 'english' | 'both') => {
    const language = languages.find(l => l.code === languageCode);
    if (language) {
      language.showNative = displayType === 'native' || displayType === 'both';
      language.showEnglish = displayType === 'english' || displayType === 'both';
      language.showBoth = displayType === 'both';
    }
  };

  const renderLanguageItem = (language: LanguageDisplay) => (
    <View key={language.code} style={styles.languageCard}>
      <View style={styles.languageHeader}>
        <View style={styles.languageInfo}>
          <Text style={styles.languageFlag}>{language.flag}</Text>
          <View style={styles.languageNames}>
            <Text style={styles.languageName}>{language.name}</Text>
            <Text style={styles.languageNative}>{language.nativeName}</Text>
            {showRegion && (
              <Text style={styles.languageRegion}>{language.region}</Text>
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.displayOptions}>
        <TouchableOpacity
          style={[
            styles.displayOption,
            language.showNative && !language.showBoth && styles.selectedOption
          ]}
          onPress={() => handleLanguageDisplayChange(language.code, 'native')}
        >
          <Text style={[
            styles.displayOptionText,
            language.showNative && !language.showBoth && styles.selectedOptionText
          ]}>
            Native Only
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.displayOption,
            language.showEnglish && !language.showBoth && styles.selectedOption
          ]}
          onPress={() => handleLanguageDisplayChange(language.code, 'english')}
        >
          <Text style={[
            styles.displayOptionText,
            language.showEnglish && !language.showBoth && styles.selectedOptionText
          ]}>
            English Only
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.displayOption,
            language.showBoth && styles.selectedOption
          ]}
          onPress={() => handleLanguageDisplayChange(language.code, 'both')}
        >
          <Text style={[
            styles.displayOptionText,
            language.showBoth && styles.selectedOptionText
          ]}>
            Both
          </Text>
        </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Native Names</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Main Settings */}
        <View style={styles.mainSettingsCard}>
          <View style={styles.mainSettingsHeader}>
            <Ionicons name="text" size={28} color={colors.bronze} />
            <Text style={styles.mainSettingsTitle}>Display Preferences</Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Show Native Names</Text>
              <Text style={styles.settingDescription}>Display language names in their native script</Text>
            </View>
            <Switch
              value={globalNativeNames}
              onValueChange={setGlobalNativeNames}
              trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
              thumbColor={globalNativeNames ? '#8B4513' : '#FFFFFF'}
              ios_backgroundColor="#E0E0E0"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Show Both Names</Text>
              <Text style={styles.settingDescription}>Display both native and English names</Text>
            </View>
            <Switch
              value={showBothNames}
              onValueChange={setShowBothNames}
              trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
              thumbColor={showBothNames ? '#8B4513' : '#FFFFFF'}
              ios_backgroundColor="#E0E0E0"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Prefer Native Names</Text>
              <Text style={styles.settingDescription}>Show native names first when both are displayed</Text>
            </View>
            <Switch
              value={preferNative}
              onValueChange={setPreferNative}
              trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
              thumbColor={preferNative ? '#8B4513' : '#FFFFFF'}
              ios_backgroundColor="#E0E0E0"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Show Region</Text>
              <Text style={styles.settingDescription}>Display country/region information</Text>
            </View>
            <Switch
              value={showRegion}
              onValueChange={setShowRegion}
              trackColor={{ false: '#E0E0E0', true: '#DEB887' }}
              thumbColor={showRegion ? '#8B4513' : '#FFFFFF'}
              ios_backgroundColor="#E0E0E0"
            />
          </View>
        </View>

        {/* Preview Section */}
        <View style={styles.previewSection}>
          <Text style={styles.previewTitle}>Preview</Text>
          <View style={styles.previewCard}>
            <Text style={styles.previewText}>
              {globalNativeNames ? 'Language names will be displayed in their native script' : 'Language names will be displayed in English'}
            </Text>
            <View style={styles.previewExample}>
              <Text style={styles.previewExampleText}>
                Example: {preferNative ? 'Español (Spanish)' : 'Spanish (Español)'}
              </Text>
            </View>
          </View>
        </View>

        {/* Language Settings */}
        <View style={styles.languagesSection}>
          <Text style={styles.languagesTitle}>Language Display Settings</Text>
          <Text style={styles.languagesSubtitle}>
            Customize how each language name is displayed
          </Text>
          {languages.map(renderLanguageItem)}
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={20} color={colors.bronze} />
            <Text style={styles.helpText}>Learn more about native language names</Text>
          </TouchableOpacity>
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
  mainSettingsCard: {
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
  mainSettingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(16),
  },
  mainSettingsTitle: {
    fontSize: responsiveSize(20),
    fontWeight: '700',
    color: colors.brownDark,
    marginLeft: responsiveSize(12),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveSize(12),
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
    marginBottom: responsiveSize(2),
  },
  settingDescription: {
    fontSize: responsiveSize(13),
    color: colors.brownDark,
    lineHeight: responsiveSize(18),
  },
  previewSection: {
    marginBottom: responsiveSize(24),
  },
  previewTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(12),
    paddingHorizontal: responsiveSize(20),
  },
  previewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    elevation: 2,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  previewText: {
    fontSize: responsiveSize(14),
    color: colors.brownDark,
    marginBottom: responsiveSize(12),
    lineHeight: responsiveSize(20),
  },
  previewExample: {
    backgroundColor: colors.bronze + '10',
    padding: responsiveSize(12),
    borderRadius: responsiveSize(8),
  },
  previewExampleText: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: colors.bronze,
    textAlign: 'center',
  },
  languagesSection: {
    marginBottom: responsiveSize(24),
  },
  languagesTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(4),
    paddingHorizontal: responsiveSize(20),
  },
  languagesSubtitle: {
    fontSize: responsiveSize(13),
    color: colors.brownDark,
    marginBottom: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
  },
  languageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(16),
    marginHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(12),
    elevation: 2,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  languageHeader: {
    marginBottom: responsiveSize(12),
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: responsiveSize(24),
    marginRight: responsiveSize(12),
  },
  languageNames: {
    flex: 1,
  },
  languageName: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(2),
  },
  languageNative: {
    fontSize: responsiveSize(14),
    color: colors.bronze,
    marginBottom: responsiveSize(2),
  },
  languageRegion: {
    fontSize: responsiveSize(12),
    color: colors.brownDark,
  },
  displayOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayOption: {
    flex: 1,
    paddingVertical: responsiveSize(8),
    paddingHorizontal: responsiveSize(12),
    borderRadius: responsiveSize(8),
    backgroundColor: colors.border,
    marginHorizontal: responsiveSize(2),
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: colors.bronze,
  },
  displayOptionText: {
    fontSize: responsiveSize(12),
    fontWeight: '500',
    color: colors.brownDark,
  },
  selectedOptionText: {
    color: colors.text.white,
  },
  helpSection: {
    marginTop: responsiveSize(24),
    marginBottom: responsiveSize(24),
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: responsiveSize(16),
    marginHorizontal: responsiveSize(20),
    borderRadius: responsiveSize(16),
    elevation: 2,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  helpText: {
    fontSize: responsiveSize(16),
    fontWeight: '500',
    color: colors.bronze,
    marginLeft: responsiveSize(8),
  },
});

export default NativeNamesScreen; 