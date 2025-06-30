# Theme System Documentation

## Overview

The Artisan App now includes a comprehensive theme system that allows users to customize the app's appearance with different color themes and accent colors. The theme system is built using React Context and provides a consistent way to apply themes across the entire application.

## Features

- **6 Pre-built Themes**: Warm Earth, Nature Green, Ocean Blue, Sunset Orange, Lavender Purple, and Dark Mode
- **8 Accent Colors**: Gold, Copper, Bronze, Silver, Emerald, Sapphire, Ruby, and Amethyst
- **Accessibility Options**: High contrast, reduced motion, bold text, and auto theme switching
- **Persistent Storage**: Theme preferences are saved and restored on app restart
- **Real-time Updates**: Theme changes apply immediately across the entire app

## Architecture

### Core Components

1. **ThemeContext** (`context/ThemeContext.tsx`)
   - Manages theme state and provides theme data to components
   - Handles theme persistence using AsyncStorage
   - Provides theme update functions

2. **ThemeCustomizationScreen** (`screens/shared/ThemeCustomizationScreen.tsx`)
   - UI for users to select themes and customize appearance
   - Live preview of theme changes
   - Accessibility settings

3. **Theme Utilities** (`utils/themeUtils.ts`)
   - Helper functions for creating themed styles
   - Dynamic style generation based on theme
   - Status bar and navigation bar theming

4. **Themed Components** (`components/buttons/ThemedButton.tsx`)
   - Example of how to create themed components
   - Demonstrates best practices for theme integration

## Usage

### Basic Theme Usage

```tsx
import { useTheme } from '../context/ThemeContext';
import { useThemedColors } from '../constants/colors';

const MyComponent = () => {
  const { currentTheme, currentAccent } = useTheme();
  const colors = useThemedColors();

  return (
    <View style={{ backgroundColor: colors.background.primary }}>
      <Text style={{ color: colors.text.primary }}>
        Hello World
      </Text>
    </View>
  );
};
```

### Using Themed Styles

```tsx
import { createThemedStyles } from '../utils/themeUtils';
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { currentTheme } = useTheme();
  const styles = createThemedStyles(currentTheme.colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Creating Themed Components

```tsx
import { useThemedComponent } from '../utils/withTheme';

const ThemedCard = ({ title, children }) => {
  const { colors, styles } = useThemedComponent();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.label, { color: colors.text }]}>{title}</Text>
      {children}
    </View>
  );
};
```

### Using the Higher-Order Component

```tsx
import { withTheme, WithThemeProps } from '../utils/withTheme';

interface MyComponentProps extends WithThemeProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, theme }) => {
  return (
    <View style={[theme.styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text }}>{title}</Text>
    </View>
  );
};

export default withTheme(MyComponent);
```

## Theme Structure

### Theme Colors

Each theme includes the following color properties:

```typescript
interface ThemeColors {
  primary: string;        // Main brand color
  secondary: string;      // Secondary brand color
  accent: string;         // Accent color (from accent selection)
  background: string;     // Main background color
  surface: string;        // Surface/card background color
  text: string;          // Primary text color
  textSecondary: string; // Secondary text color
  border: string;        // Border color
  success: string;       // Success state color
  warning: string;       // Warning state color
  error: string;         // Error state color
  tanLight: string;      // Light tan color
  tan: string;          // Medium tan color
  tanDark: string;      // Dark tan color
  brownDark: string;    // Dark brown color
  bronze: string;       // Bronze color
}
```

### Theme Settings

```typescript
interface ThemeSettings {
  themeId: string;        // Selected theme ID
  accentId: string;       // Selected accent color ID
  autoTheme: boolean;     // Auto-switch between light/dark
  highContrast: boolean;  // High contrast mode
  reducedMotion: boolean; // Reduced motion mode
  boldText: boolean;      // Bold text mode
}
```

## Available Themes

### 1. Warm Earth (Default)
- **Description**: Cozy brown and tan tones
- **Best for**: Traditional, warm, comfortable feel
- **Colors**: Browns, tans, warm oranges

### 2. Nature Green
- **Description**: Fresh forest and earth tones
- **Best for**: Natural, organic, eco-friendly feel
- **Colors**: Greens, earth tones, natural colors

### 3. Ocean Blue
- **Description**: Calm blue and teal tones
- **Best for**: Professional, calm, trustworthy feel
- **Colors**: Blues, teals, cool tones

### 4. Sunset Orange
- **Description**: Warm orange and red tones
- **Best for**: Energetic, creative, warm feel
- **Colors**: Oranges, reds, warm tones

### 5. Lavender Purple
- **Description**: Soft purple and violet tones
- **Best for**: Creative, luxurious, unique feel
- **Colors**: Purples, violets, soft tones

### 6. Dark Mode
- **Description**: Dark theme for night use
- **Best for**: Low-light environments, battery saving
- **Colors**: Dark backgrounds, light text

## Available Accent Colors

- **Gold**: Classic gold accent
- **Copper**: Warm copper tone
- **Bronze**: Rich bronze accent
- **Silver**: Elegant silver
- **Emerald**: Vibrant emerald
- **Sapphire**: Deep sapphire blue
- **Ruby**: Bold ruby red
- **Amethyst**: Royal purple

## Accessibility Features

### High Contrast Mode
- Increases contrast between text and background
- Improves readability for users with visual impairments
- Automatically adjusts all colors for maximum contrast

### Reduced Motion
- Minimizes animations and transitions
- Helps users with motion sensitivity
- Reduces cognitive load

### Bold Text
- Makes all text bolder
- Improves readability for users with visual impairments
- Increases text weight across the app

### Auto Theme
- Automatically switches between light and dark themes
- Based on system preferences
- Respects user's device settings

## Integration Guide

### 1. Update Existing Components

To update an existing component to use the theme system:

```tsx
// Before
import colors from '../constants/colors';

const MyComponent = () => (
  <View style={{ backgroundColor: colors.background.primary }}>
    <Text style={{ color: colors.text.primary }}>Hello</Text>
  </View>
);

// After
import { useThemedColors } from '../constants/colors';

const MyComponent = () => {
  const colors = useThemedColors();
  return (
    <View style={{ backgroundColor: colors.background.primary }}>
      <Text style={{ color: colors.text.primary }}>Hello</Text>
    </View>
  );
};
```

### 2. Create New Themed Components

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemedCard = ({ title, children }) => {
  const { currentTheme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: currentTheme.colors.surface,
      borderRadius: 12,
      padding: 16,
      margin: 8,
      shadowColor: currentTheme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: currentTheme.colors.text,
      marginBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default ThemedCard;
```

### 3. Update Navigation

The theme system automatically applies to navigation elements:

```tsx
// Tab navigator with themed colors
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { currentTheme } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarInactiveTintColor: currentTheme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: currentTheme.colors.surface,
          borderTopColor: currentTheme.colors.border,
        },
      }}
    >
      {/* Tab screens */}
    </Tab.Navigator>
  );
};
```

## Best Practices

### 1. Use Theme Context Consistently
- Always use `useTheme()` or `useThemedColors()` to access theme data
- Avoid hardcoding colors in components
- Use the provided utility functions for common styling patterns

### 2. Create Reusable Themed Components
- Build components that automatically adapt to theme changes
- Use the `withTheme` HOC or `useThemedComponent` hook for complex components
- Keep theme logic separate from business logic

### 3. Test Across Themes
- Test your components with different themes
- Ensure text remains readable in all themes
- Verify that interactive elements are clearly visible

### 4. Consider Accessibility
- Use high contrast mode to test readability
- Ensure sufficient color contrast ratios
- Test with reduced motion enabled

### 5. Performance Optimization
- Use `useMemo` for expensive theme calculations
- Avoid creating new style objects on every render
- Cache themed styles when possible

## Troubleshooting

### Common Issues

1. **Theme not updating**: Ensure the component is wrapped in `ThemeProvider`
2. **Colors not changing**: Check that you're using `useThemedColors()` instead of the static `COLORS` object
3. **TypeScript errors**: Make sure to import the correct types from the theme context

### Debug Tips

```tsx
// Debug current theme
const { currentTheme, currentAccent, settings } = useTheme();
console.log('Current theme:', currentTheme.id);
console.log('Current accent:', currentAccent.id);
console.log('Settings:', settings);
```

## Future Enhancements

- **Custom Themes**: Allow users to create their own themes
- **Theme Presets**: Pre-built theme combinations for different use cases
- **Animation Themes**: Different animation styles based on theme
- **Font Themes**: Different typography based on theme
- **Seasonal Themes**: Automatic theme switching based on seasons or events

## Support

For questions or issues with the theme system, please refer to:
- Theme system documentation
- Component examples in the codebase
- Theme utility functions for common patterns 