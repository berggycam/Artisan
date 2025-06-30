import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  Dimensions,
  Alert,
  Switch
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, themePalettes, accentColors } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

const ThemeCustomizationScreen: React.FC = ({ navigation }: any) => {
  const { 
    currentTheme, 
    currentAccent, 
    settings, 
    updateTheme, 
    updateAccent, 
    updateSettings 
  } = useTheme();
  const insets = useSafeAreaInsets();

  const handleSaveTheme = () => {
    Alert.alert(
      'Theme Saved',
      `Your theme has been updated to ${currentTheme.name} with ${currentAccent.name} accent.`,
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  const renderThemePreview = (theme: any) => {
    const isSelected = theme.id === currentTheme.id;
    return (
      <TouchableOpacity
        key={theme.id}
        style={[styles.themeOption, isSelected && styles.themeOptionSelected]}
        onPress={() => updateTheme(theme.id)}
        activeOpacity={0.8}
      >
        <View style={styles.themePreview}>
          <LinearGradient
            colors={theme.gradient}
            style={styles.themeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.themePreviewContent}>
              <View style={[styles.themePreviewHeader, { backgroundColor: theme.colors.surface }]}>
                <View style={[styles.themePreviewDot, { backgroundColor: theme.colors.primary }]} />
                <View style={[styles.themePreviewDot, { backgroundColor: theme.colors.secondary }]} />
                <View style={[styles.themePreviewDot, { backgroundColor: theme.colors.accent }]} />
              </View>
              <View style={styles.themePreviewBody}>
                <View style={[styles.themePreviewBar, { backgroundColor: theme.colors.primary, width: '60%' }]} />
                <View style={[styles.themePreviewBar, { backgroundColor: theme.colors.secondary, width: '40%' }]} />
                <View style={[styles.themePreviewBar, { backgroundColor: theme.colors.accent, width: '80%' }]} />
              </View>
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.themeInfo}>
          <Text style={[styles.themeName, { color: currentTheme.colors.text }]}>
            {theme.name}
          </Text>
          <Text style={[styles.themeDescription, { color: currentTheme.colors.textSecondary }]}>
            {theme.description}
          </Text>
        </View>
        
        {isSelected && (
          <View style={[styles.selectedIndicator, { backgroundColor: currentTheme.colors.primary }]}>
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderAccentColor = (accent: any) => {
    const isSelected = accent.id === currentAccent.id;
    return (
      <TouchableOpacity
        key={accent.id}
        style={[styles.accentOption, isSelected && styles.accentOptionSelected]}
        onPress={() => updateAccent(accent.id)}
        activeOpacity={0.8}
      >
        <View style={[styles.accentPreview, { backgroundColor: accent.color }]}>
          {isSelected && (
            <View style={styles.accentSelectedIndicator}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
          )}
        </View>
        <View style={styles.accentInfo}>
          <Text style={[styles.accentName, { color: currentTheme.colors.text }]}>
            {accent.name}
          </Text>
          <Text style={[styles.accentDescription, { color: currentTheme.colors.textSecondary }]}>
            {accent.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSettingItem = (
    title: string,
    subtitle: string,
    type: 'switch' | 'chevron',
    value?: boolean,
    onPress?: () => void,
    onToggle?: (value: boolean) => void
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={type === 'switch'}
    >
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color: currentTheme.colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.settingSubtitle, { color: currentTheme.colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
      
      {type === 'switch' && onToggle && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#E0E0E0', true: currentTheme.colors.primary + '40' }}
          thumbColor={value ? currentTheme.colors.primary : '#FFFFFF'}
          ios_backgroundColor="#E0E0E0"
        />
      )}
      
      {type === 'chevron' && (
        <Ionicons 
          name="chevron-forward" 
          size={18} 
          color={currentTheme.colors.textSecondary} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={currentTheme.colors.background} 
      />
      
      {/* Header */}
      <LinearGradient
        colors={currentTheme.gradient}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>
              Theme Customization
            </Text>
            <Text style={[styles.headerSubtitle, { color: currentTheme.colors.textSecondary }]}>
              Personalize your app appearance
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: currentTheme.colors.primary }]}
            onPress={handleSaveTheme}
          >
            <Text style={[styles.saveButtonText, { color: currentTheme.colors.background }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>
            Choose Theme
          </Text>
          <Text style={[styles.sectionSubtitle, { color: currentTheme.colors.textSecondary }]}>
            Select a color palette that matches your style
          </Text>
          
          <View style={styles.themesContainer}>
            {themePalettes.map(renderThemePreview)}
          </View>
        </View>

        {/* Accent Color Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>
            Accent Color
          </Text>
          <Text style={[styles.sectionSubtitle, { color: currentTheme.colors.textSecondary }]}>
            Choose an accent color for highlights and buttons
          </Text>
          
          <View style={styles.accentsContainer}>
            {accentColors.map(renderAccentColor)}
          </View>
        </View>

        {/* Accessibility Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>
            Accessibility
          </Text>
          <Text style={[styles.sectionSubtitle, { color: currentTheme.colors.textSecondary }]}>
            Customize for better accessibility
          </Text>
          
          <View style={[styles.settingsContainer, { backgroundColor: currentTheme.colors.surface }]}>
            {renderSettingItem(
              'Auto Theme',
              'Automatically switch between light and dark themes',
              'switch',
              settings.autoTheme,
              undefined,
              (value) => updateSettings({ autoTheme: value })
            )}
            
            {renderSettingItem(
              'High Contrast',
              'Increase contrast for better visibility',
              'switch',
              settings.highContrast,
              undefined,
              (value) => updateSettings({ highContrast: value })
            )}
            
            {renderSettingItem(
              'Reduced Motion',
              'Minimize animations and transitions',
              'switch',
              settings.reducedMotion,
              undefined,
              (value) => updateSettings({ reducedMotion: value })
            )}
            
            {renderSettingItem(
              'Bold Text',
              'Make text bolder for easier reading',
              'switch',
              settings.boldText,
              undefined,
              (value) => updateSettings({ boldText: value })
            )}
          </View>
        </View>

        {/* Preview Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>
            Preview
          </Text>
          <Text style={[styles.sectionSubtitle, { color: currentTheme.colors.textSecondary }]}>
            See how your theme will look
          </Text>
          
          <View style={[styles.previewContainer, { backgroundColor: currentTheme.colors.surface }]}>
            <LinearGradient
              colors={currentTheme.gradient}
              style={styles.previewGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.previewContent}>
                <View style={[styles.previewHeader, { backgroundColor: currentTheme.colors.surface }]}>
                  <View style={styles.previewHeaderLeft}>
                    <View style={[styles.previewAvatar, { backgroundColor: currentTheme.colors.primary }]}>
                      <Ionicons name="person" size={20} color="#FFFFFF" />
                    </View>
                    <View>
                      <Text style={[styles.previewTitle, { color: currentTheme.colors.text }]}>
                        Sample Card
                      </Text>
                      <Text style={[styles.previewSubtitle, { color: currentTheme.colors.textSecondary }]}>
                        This is how your theme will look
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.previewButton, { backgroundColor: currentAccent.color }]}>
                    <Text style={styles.previewButtonText}>Action</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.previewBody}>
                  <View style={[styles.previewBar, { backgroundColor: currentTheme.colors.primary, width: '70%' }]} />
                  <View style={[styles.previewBar, { backgroundColor: currentTheme.colors.secondary, width: '50%' }]} />
                  <View style={[styles.previewBar, { backgroundColor: currentTheme.colors.accent, width: '30%' }]} />
                </View>
              </View>
            </LinearGradient>
          </View>
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
  themesContainer: {
    gap: 12,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeOptionSelected: {
    borderColor: '#D2691E',
    backgroundColor: 'rgba(210,105,30,0.1)',
  },
  themePreview: {
    width: 80,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
  },
  themeGradient: {
    flex: 1,
  },
  themePreviewContent: {
    flex: 1,
    padding: 8,
  },
  themePreviewHeader: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  themePreviewDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  themePreviewBody: {
    gap: 4,
  },
  themePreviewBar: {
    height: 3,
    borderRadius: 2,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  accentOption: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    width: '30%',
  },
  accentOptionSelected: {
    borderColor: '#D2691E',
    backgroundColor: 'rgba(210,105,30,0.1)',
  },
  accentPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accentSelectedIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accentInfo: {
    alignItems: 'center',
  },
  accentName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  accentDescription: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
  settingsContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  previewContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewGradient: {
    padding: 20,
  },
  previewContent: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 16,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  previewHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  previewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  previewSubtitle: {
    fontSize: 13,
  },
  previewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  previewButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  previewBody: {
    gap: 8,
  },
  previewBar: {
    height: 4,
    borderRadius: 2,
  },
});

export default ThemeCustomizationScreen; 