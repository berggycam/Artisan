import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Theme color palettes
export const themePalettes = [
  {
    id: 'warm',
    name: 'Warm Earth',
    description: 'Cozy brown and tan tones',
    colors: {
      primary: '#D2691E',
      secondary: '#CD853F',
      accent: '#8B4513',
      background: '#FFFEF7',
      surface: '#FBF8F3',
      text: '#2F1B14',
      textSecondary: '#5D4037',
      border: '#E8DDD4',
      success: '#8FBC8F',
      warning: '#DAA520',
      error: '#CD5C5C',
      tanLight: '#FFF8DC',
      tan: '#FFEFD5',
      tanDark: '#F5DEB3',
      brownDark: '#8B4513',
      bronze: '#CD853F'
    },
    gradient: ['#FFF8DC', '#FFEFD5', '#F5DEB3'],
    preview: '#D2691E'
  },
  {
    id: 'nature',
    name: 'Nature Green',
    description: 'Fresh forest and earth tones',
    colors: {
      primary: '#2E8B57',
      secondary: '#3CB371',
      accent: '#228B22',
      background: '#F0F8F0',
      surface: '#E8F5E8',
      text: '#1B3D1B',
      textSecondary: '#2F5A2F',
      border: '#C8E6C8',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      tanLight: '#F0F8F0',
      tan: '#E8F5E8',
      tanDark: '#D4EDD4',
      brownDark: '#1B3D1B',
      bronze: '#2E8B57'
    },
    gradient: ['#F0F8F0', '#E8F5E8', '#D4EDD4'],
    preview: '#2E8B57'
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    description: 'Calm blue and teal tones',
    colors: {
      primary: '#4682B4',
      secondary: '#5F9EA0',
      accent: '#2F4F4F',
      background: '#F0F8FF',
      surface: '#E6F3FF',
      text: '#1B2F3F',
      textSecondary: '#2F4F6F',
      border: '#B8D4E6',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      tanLight: '#F0F8FF',
      tan: '#E6F3FF',
      tanDark: '#D1E7FF',
      brownDark: '#1B2F3F',
      bronze: '#4682B4'
    },
    gradient: ['#F0F8FF', '#E6F3FF', '#D1E7FF'],
    preview: '#4682B4'
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    description: 'Warm orange and red tones',
    colors: {
      primary: '#FF6347',
      secondary: '#FF7F50',
      accent: '#DC143C',
      background: '#FFF8F0',
      surface: '#FFE8D6',
      text: '#3F1F1F',
      textSecondary: '#5F2F2F',
      border: '#FFD4C4',
      success: '#8FBC8F',
      warning: '#DAA520',
      error: '#CD5C5C',
      tanLight: '#FFF8F0',
      tan: '#FFE8D6',
      tanDark: '#FFD4C4',
      brownDark: '#3F1F1F',
      bronze: '#FF6347'
    },
    gradient: ['#FFF8F0', '#FFE8D6', '#FFD4C4'],
    preview: '#FF6347'
  },
  {
    id: 'lavender',
    name: 'Lavender Purple',
    description: 'Soft purple and violet tones',
    colors: {
      primary: '#9370DB',
      secondary: '#BA55D3',
      accent: '#8A2BE2',
      background: '#F8F4FF',
      surface: '#F0E8FF',
      text: '#2F1F3F',
      textSecondary: '#4F2F5F',
      border: '#E0D4F0',
      success: '#8FBC8F',
      warning: '#DAA520',
      error: '#CD5C5C',
      tanLight: '#F8F4FF',
      tan: '#F0E8FF',
      tanDark: '#E8D4F8',
      brownDark: '#2F1F3F',
      bronze: '#9370DB'
    },
    gradient: ['#F8F4FF', '#F0E8FF', '#E8D4F8'],
    preview: '#9370DB'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Dark theme for night use',
    colors: {
      primary: '#FFD700',
      secondary: '#FFA500',
      accent: '#FF6347',
      background: '#1A1A1A',
      surface: '#2C2C2C',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
      border: '#404040',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      tanLight: '#1A1A1A',
      tan: '#2C2C2C',
      tanDark: '#404040',
      brownDark: '#FFFFFF',
      bronze: '#FFD700'
    },
    gradient: ['#1A1A1A', '#2C2C2C', '#404040'],
    preview: '#FFD700'
  }
];

// Accent color options
export const accentColors = [
  { id: 'gold', name: 'Gold', color: '#FFD700', description: 'Classic gold accent' },
  { id: 'copper', name: 'Copper', color: '#CD853F', description: 'Warm copper tone' },
  { id: 'bronze', name: 'Bronze', color: '#CD7F32', description: 'Rich bronze accent' },
  { id: 'silver', name: 'Silver', color: '#C0C0C0', description: 'Elegant silver' },
  { id: 'emerald', name: 'Emerald', color: '#50C878', description: 'Vibrant emerald' },
  { id: 'sapphire', name: 'Sapphire', color: '#0F52BA', description: 'Deep sapphire blue' },
  { id: 'ruby', name: 'Ruby', color: '#E0115F', description: 'Bold ruby red' },
  { id: 'amethyst', name: 'Amethyst', color: '#9966CC', description: 'Royal purple' }
];

export interface ThemeSettings {
  themeId: string;
  accentId: string;
  autoTheme: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  boldText: boolean;
}

interface ThemeContextType {
  currentTheme: typeof themePalettes[0];
  currentAccent: typeof accentColors[0];
  settings: ThemeSettings;
  updateTheme: (themeId: string) => void;
  updateAccent: (accentId: string) => void;
  updateSettings: (settings: Partial<ThemeSettings>) => void;
  getThemeColors: () => any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>({
    themeId: 'warm',
    accentId: 'gold',
    autoTheme: false,
    highContrast: false,
    reducedMotion: false,
    boldText: false,
  });

  const currentTheme = themePalettes.find(theme => theme.id === settings.themeId) || themePalettes[0];
  const currentAccent = accentColors.find(accent => accent.id === settings.accentId) || accentColors[0];

  // Load saved theme settings on app start
  useEffect(() => {
    loadThemeSettings();
  }, []);

  const loadThemeSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('themeSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      }
    } catch (error) {
      console.error('Error loading theme settings:', error);
    }
  };

  const saveThemeSettings = async (newSettings: ThemeSettings) => {
    try {
      await AsyncStorage.setItem('themeSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving theme settings:', error);
    }
  };

  const updateTheme = (themeId: string) => {
    const newSettings = { ...settings, themeId };
    setSettings(newSettings);
    saveThemeSettings(newSettings);
  };

  const updateAccent = (accentId: string) => {
    const newSettings = { ...settings, accentId };
    setSettings(newSettings);
    saveThemeSettings(newSettings);
  };

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    saveThemeSettings(updatedSettings);
  };

  const getThemeColors = () => {
    const colors = { ...currentTheme.colors };
    
    // Apply accent color to primary elements
    if (currentAccent) {
      colors.accent = currentAccent.color;
      // You can add more accent color applications here
    }

    // Apply high contrast if enabled
    if (settings.highContrast) {
      colors.text = '#000000';
      colors.textSecondary = '#333333';
      colors.border = '#000000';
    }

    return colors;
  };

  const value: ThemeContextType = {
    currentTheme,
    currentAccent,
    settings,
    updateTheme,
    updateAccent,
    updateSettings,
    getThemeColors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 