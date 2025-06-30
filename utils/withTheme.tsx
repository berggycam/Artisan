import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { createThemedStyles, createDynamicStyles } from './themeUtils';

export interface WithThemeProps {
  theme: {
    colors: any;
    styles: any;
    dynamicStyles: any;
    isDark: boolean;
    updateTheme: (themeId: string) => void;
    updateAccent: (accentId: string) => void;
    updateSettings: (settings: any) => void;
  };
}

export const withTheme = <P extends object>(
  Component: React.ComponentType<P & WithThemeProps>
) => {
  const ThemedComponent: React.FC<P> = (props) => {
    const { 
      currentTheme, 
      currentAccent, 
      settings, 
      updateTheme, 
      updateAccent, 
      updateSettings 
    } = useTheme();

    const colors = {
      ...currentTheme.colors,
      accent: currentAccent.color,
    };

    const themedStyles = createThemedStyles(colors);
    const dynamicStyles = createDynamicStyles(colors, currentTheme.id === 'dark');

    const themeProps: WithThemeProps = {
      theme: {
        colors,
        styles: themedStyles,
        dynamicStyles,
        isDark: currentTheme.id === 'dark',
        updateTheme,
        updateAccent,
        updateSettings,
      },
    };

    return <Component {...props} {...themeProps} />;
  };

  ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  return ThemedComponent;
};

// Hook version for functional components
export const useThemedComponent = () => {
  const { 
    currentTheme, 
    currentAccent, 
    settings, 
    updateTheme, 
    updateAccent, 
    updateSettings 
  } = useTheme();

  const colors = {
    ...currentTheme.colors,
    accent: currentAccent.color,
  };

  const themedStyles = createThemedStyles(colors);
  const dynamicStyles = createDynamicStyles(colors, currentTheme.id === 'dark');

  return {
    colors,
    styles: themedStyles,
    dynamicStyles,
    isDark: currentTheme.id === 'dark',
    updateTheme,
    updateAccent,
    updateSettings,
    settings,
  };
}; 