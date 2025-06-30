import { useTheme } from '../context/ThemeContext';

// Default colors (fallback)
const DEFAULT_COLORS = {
  primary: '#CD853F',
  secondary: '#6c757d',
  error: '#ff4d4f',
  warning: '#F4A460',
  success: '#4BB543',
  accent: '#A0522D',
  warm: '#F5DEB3',
  background: {
    primary: '#fff',
    secondary: '#F8F8F8',
    tertiary: '#F2F2F2',
  },
  text: {
    primary: '#222',
    secondary: '#6c757d',
    tertiary: '#B0B0B0',
    white: '#fff',
  },
  border: '#e0e0e0',
  surface: '#F8F8F8',
  // Earthy artisan theme - warm colors
  tanLight: '#FFF8DC',
  tan: '#FFEFD5',
  tanDark: '#F5DEB3',
  brown: '#8B4513',
  brownLight: '#DEB887',
  brownDark: '#A0522D',
  gold: '#F4A460',
  bronze: '#CD853F',
  // Additional warm colors for search theme
  warmOrange: '#FF8C42',
  warmRed: '#E74C3C',
  warmYellow: '#F39C12',
  warmPink: '#E91E63',
  warmPurple: '#9C27B0',
};

// Hook to get themed colors
export const useThemedColors = () => {
  try {
    const { currentTheme, currentAccent } = useTheme();
    
    return {
      primary: currentTheme.colors.primary,
      secondary: currentTheme.colors.secondary,
      error: currentTheme.colors.error,
      warning: currentTheme.colors.warning,
      success: currentTheme.colors.success,
      accent: currentAccent.color,
      warm: currentTheme.colors.tan,
      background: {
        primary: currentTheme.colors.background,
        secondary: currentTheme.colors.surface,
        tertiary: currentTheme.colors.border,
      },
      text: {
        primary: currentTheme.colors.text,
        secondary: currentTheme.colors.textSecondary,
        tertiary: currentTheme.colors.textSecondary,
        white: currentTheme.colors.background,
      },
      border: currentTheme.colors.border,
      surface: currentTheme.colors.surface,
      // Earthy artisan theme - warm colors
      tanLight: currentTheme.colors.tanLight,
      tan: currentTheme.colors.tan,
      tanDark: currentTheme.colors.tanDark,
      brown: currentTheme.colors.brownDark,
      brownLight: currentTheme.colors.secondary,
      brownDark: currentTheme.colors.brownDark,
      gold: currentTheme.colors.warning,
      bronze: currentTheme.colors.bronze,
      // Additional warm colors for search theme
      warmOrange: currentTheme.colors.primary,
      warmRed: currentTheme.colors.error,
      warmYellow: currentTheme.colors.warning,
      warmPink: currentTheme.colors.accent,
      warmPurple: currentTheme.colors.secondary,
    };
  } catch (error) {
    // Fallback to default colors if theme context is not available
    return DEFAULT_COLORS;
  }
};

// Legacy export for backward compatibility
export const COLORS = DEFAULT_COLORS;
export default DEFAULT_COLORS; 