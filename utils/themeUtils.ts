import { StyleSheet } from 'react-native';
import { themePalettes, accentColors } from '../context/ThemeContext';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  tanLight: string;
  tan: string;
  tanDark: string;
  brownDark: string;
  bronze: string;
}

export const createThemedStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    // Common themed styles
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    surface: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: colors.background,
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondaryButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    input: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 16,
    },
    badge: {
      backgroundColor: colors.accent,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    badgeText: {
      color: colors.background,
      fontSize: 12,
      fontWeight: '600',
    },
    success: {
      backgroundColor: colors.success,
      color: colors.background,
    },
    warning: {
      backgroundColor: colors.warning,
      color: colors.background,
    },
    error: {
      backgroundColor: colors.error,
      color: colors.background,
    },
  });
};

export const getThemeGradient = (themeId: string) => {
  const theme = themePalettes.find(t => t.id === themeId);
  return theme ? theme.gradient : themePalettes[0].gradient;
};

export const getAccentColor = (accentId: string) => {
  const accent = accentColors.find(a => a.id === accentId);
  return accent ? accent.color : accentColors[0].color;
};

export const applyThemeToColors = (baseColors: any, themeId: string, accentId: string) => {
  const theme = themePalettes.find(t => t.id === themeId);
  const accent = accentColors.find(a => a.id === accentId);
  
  if (!theme) return baseColors;
  
  return {
    ...baseColors,
    ...theme.colors,
    accent: accent ? accent.color : theme.colors.accent,
  };
};

export const createDynamicStyles = (colors: ThemeColors, isDark: boolean = false) => {
  return StyleSheet.create({
    // Dynamic styles that change based on theme
    header: {
      backgroundColor: colors.background,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
    headerTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '700',
    },
    headerSubtitle: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    tabBar: {
      backgroundColor: colors.surface,
      borderTopColor: colors.border,
      borderTopWidth: 1,
    },
    tabBarActive: {
      color: colors.primary,
    },
    tabBarInactive: {
      color: colors.textSecondary,
    },
    modal: {
      backgroundColor: colors.background,
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
    },
    listItem: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    listItemText: {
      color: colors.text,
      fontSize: 16,
    },
    listItemSubtext: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    switchTrack: {
      false: colors.border,
      true: colors.primary + '40',
    },
    switchThumb: {
      false: '#FFFFFF',
      true: colors.primary,
    },
    // High contrast adjustments
    highContrast: isDark ? {
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
      border: '#FFFFFF',
      background: '#000000',
      surface: '#1A1A1A',
    } : {
      text: '#000000',
      textSecondary: '#333333',
      border: '#000000',
      background: '#FFFFFF',
      surface: '#F5F5F5',
    },
  });
};

export const getStatusBarStyle = (themeId: string) => {
  return themeId === 'dark' ? 'light-content' : 'dark-content';
};

export const getStatusBarBackground = (colors: ThemeColors) => {
  return colors.background;
}; 