import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Alert,
  FlatList,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

// Enhanced responsive breakpoints
const getResponsiveSize = () => {
  if (width < 350) return 'xs';
  if (width < 375) return 'sm';
  if (width < 414) return 'md';
  if (width < 480) return 'lg';
  return 'xl';
};

const deviceSize = getResponsiveSize();

// Responsive sizing system
const sizes = {
  xs: {
    padding: 12,
    fontSize: { xs: 11, sm: 12, md: 13, lg: 14, xl: 16 },
    iconSize: { xs: 14, sm: 16, md: 18, lg: 20 },
    spacing: { xs: 4, sm: 6, md: 8, lg: 10 }
  },
  sm: {
    padding: 14,
    fontSize: { xs: 12, sm: 13, md: 14, lg: 15, xl: 17 },
    iconSize: { xs: 16, sm: 18, md: 20, lg: 22 },
    spacing: { xs: 6, sm: 8, md: 10, lg: 12 }
  },
  md: {
    padding: 16,
    fontSize: { xs: 13, sm: 14, md: 15, lg: 16, xl: 18 },
    iconSize: { xs: 18, sm: 20, md: 22, lg: 24 },
    spacing: { xs: 8, sm: 10, md: 12, lg: 14 }
  },
  lg: {
    padding: 18,
    fontSize: { xs: 14, sm: 15, md: 16, lg: 17, xl: 19 },
    iconSize: { xs: 20, sm: 22, md: 24, lg: 26 },
    spacing: { xs: 10, sm: 12, md: 14, lg: 16 }
  },
  xl: {
    padding: 20,
    fontSize: { xs: 15, sm: 16, md: 17, lg: 18, xl: 20 },
    iconSize: { xs: 22, sm: 24, md: 26, lg: 28 },
    spacing: { xs: 12, sm: 14, md: 16, lg: 18 }
  }
};

const s = sizes[deviceSize];

interface EmergencyService {
  id: string;
  name: string;
  icon: string;
  phone: string;
  description: string;
  responseTime: string;
  isEmergency: boolean;
}

interface EmergencyTip {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Emergency services data
const emergencyServices: EmergencyService[] = [
  {
    id: 'police',
    name: 'Ghana Police Service',
    icon: 'shield-checkmark',
    phone: '191',
    description: 'Emergency police response',
    responseTime: '5-10 min',
    isEmergency: true,
  },
  {
    id: 'fire',
    name: 'Ghana Fire Service',
    icon: 'flame',
    phone: '192',
    description: 'Fire emergency response',
    responseTime: '5-15 min',
    isEmergency: true,
  },
  {
    id: 'ambulance',
    name: 'National Ambulance Service',
    icon: 'medical',
    phone: '193',
    description: 'Medical emergency response',
    responseTime: '8-12 min',
    isEmergency: true,
  },
  {
    id: 'road',
    name: 'Road Safety Commission',
    icon: 'car-sport',
    phone: '194',
    description: 'Road accident response',
    responseTime: '10-15 min',
    isEmergency: true,
  },
  {
    id: 'electric',
    name: 'Emergency Electrician',
    icon: 'flash',
    phone: '+233 24 123 4567',
    description: 'Electrical emergency repairs',
    responseTime: '15-30 min',
    isEmergency: false,
  },
  {
    id: 'plumber',
    name: 'Emergency Plumber',
    icon: 'water',
    phone: '+233 24 234 5678',
    description: 'Plumbing emergency repairs',
    responseTime: '20-45 min',
    isEmergency: false,
  },
  {
    id: 'locksmith',
    name: 'Emergency Locksmith',
    icon: 'key',
    phone: '+233 24 345 6789',
    description: 'Lockout and security services',
    responseTime: '15-25 min',
    isEmergency: false,
  },
  {
    id: 'mechanic',
    name: 'Emergency Mechanic',
    icon: 'construct',
    phone: '+233 24 456 7890',
    description: 'Vehicle breakdown assistance',
    responseTime: '20-40 min',
    isEmergency: false,
  },
  {
    id: 'generator',
    name: 'Generator Repair',
    icon: 'flash-outline',
    phone: '+233 24 567 8901',
    description: 'Power generator emergency repairs',
    responseTime: '25-45 min',
    isEmergency: false,
  },
  {
    id: 'security',
    name: 'Security Services',
    icon: 'shield-outline',
    phone: '+233 24 678 9012',
    description: 'Private security response',
    responseTime: '10-20 min',
    isEmergency: false,
  }
];

// Emergency tips
const emergencyTips: EmergencyTip[] = [
  {
    id: '1',
    title: 'Stay Calm',
    description: 'Remain calm and provide clear location details',
    icon: 'heart-outline',
  },
  {
    id: '2',
    title: 'Location Details',
    description: 'Provide specific landmarks and street names',
    icon: 'location-outline',
  },
  {
    id: '3',
    title: 'Emergency Numbers',
    description: 'Keep emergency numbers saved in your phone',
    icon: 'call-outline',
  },
  {
    id: '4',
    title: 'Non-Urgent Issues',
    description: 'For non-urgent issues, message artisans first',
    icon: 'chatbubble-outline',
  }
];

interface EmergencyScreenProps {
  navigation: any;
}

const EmergencyScreen: React.FC<EmergencyScreenProps> = ({ navigation }) => {
  const { currentTheme, currentAccent } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'official' | 'artisans'>('all');

  // Get themed colors with fallbacks
  const colors = {
    primary: currentTheme.colors.primary,
    secondary: currentTheme.colors.secondary,
    accent: currentAccent.color,
    error: currentTheme.colors.error,
    warning: currentTheme.colors.warning,
    success: currentTheme.colors.success,
    background: {
      primary: currentTheme.colors.background,
      secondary: currentTheme.colors.surface,
      tertiary: currentTheme.colors.border,
    },
    text: {
      primary: currentTheme.colors.text,
      secondary: currentTheme.colors.textSecondary,
      white: currentTheme.colors.background,
    },
    border: currentTheme.colors.border,
    bronze: currentTheme.colors.bronze || currentTheme.colors.secondary,
  };

  // Debug logging
  console.log('EmergencyScreen Theme Debug:', {
    themeId: currentTheme.id,
    accentId: currentAccent.id,
    primary: colors.primary,
    error: colors.error,
    background: colors.background.primary,
    text: colors.text.primary,
  });

  const categories = [
    { key: 'all', label: 'All Services', icon: 'grid-outline' },
    { key: 'official', label: 'Official', icon: 'shield-checkmark' },
    { key: 'artisans', label: 'Artisans', icon: 'construct' }
  ];

  // Function to get themed gradients for emergency services
  const getThemedGradient = (serviceId: string, isEmergency: boolean): [string, string] => {
    if (isEmergency) {
      // Official emergency services use error colors
      return [colors.error, `${colors.error}80`];
    } else {
      // Artisan services use different themed colors based on service type
      const serviceColors: Record<string, [string, string]> = {
        electric: [colors.warning, `${colors.warning}80`],
        plumber: [colors.primary, `${colors.primary}80`],
        locksmith: [colors.accent, `${colors.accent}80`],
        mechanic: [colors.bronze, `${colors.bronze}80`],
        generator: [colors.warning, `${colors.warning}80`],
        security: [colors.primary, `${colors.primary}80`],
      };
      return serviceColors[serviceId] || [colors.primary, `${colors.primary}80`];
    }
  };

  // Function to get themed colors for emergency tips
  const getThemedTipColor = (tipId: string): string => {
    const tipColors = {
      '1': colors.error, // Stay Calm - error color for urgency
      '2': colors.warning, // Location Details - warning color
      '3': colors.error, // Emergency Numbers - error color
      '4': colors.primary, // Non-Urgent Issues - primary color
    };
    return tipColors[tipId as keyof typeof tipColors] || colors.primary;
  };

  const filteredServices = emergencyServices.filter(service => {
    if (selectedCategory === 'official') return service.isEmergency;
    if (selectedCategory === 'artisans') return !service.isEmergency;
    return true;
  });

  const handleEmergencyCall = (service: EmergencyService) => {
    Alert.alert(
      'Emergency Call',
      `Call ${service.name}?\n\nPhone: ${service.phone}\nResponse Time: ${service.responseTime}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Now', 
          onPress: () => {
            console.log(`Calling ${service.phone}`);
            Alert.alert('Calling...', `Dialing ${service.phone}`);
          }
        }
      ]
    );
  };

  const handleMessageArtisan = (service: EmergencyService) => {
    const conversation = {
      id: Date.now().toString(),
      artisanName: service.name,
      artisanSpecialty: service.description,
      lastMessage: '',
      timestamp: 'Now',
      unreadCount: 0,
      avatar: null,
      online: true,
      lastMessageType: 'text'
    };
    navigation.navigate('ChatDetail', { conversation });
  };

  const renderEmergencyService = ({ item }: { item: EmergencyService }) => (
    <View style={[styles.serviceCard, { shadowColor: colors.text.primary }]}>
      <LinearGradient
        colors={getThemedGradient(item.id, item.isEmergency)}
        style={styles.serviceGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.serviceHeader}>
          <View style={[styles.serviceIconContainer, { backgroundColor: `${colors.text.white}20` }]}>
            <Ionicons name={item.icon as any} size={s.iconSize.lg} color={colors.text.white} />
          </View>
          <View style={styles.serviceInfo}>
            <Text style={[styles.serviceName, { color: colors.text.white }]}>{item.name}</Text>
            <Text style={[styles.serviceDescription, { color: colors.text.white }]}>{item.description}</Text>
            <View style={styles.serviceMeta}>
              <Ionicons name="time-outline" size={s.iconSize.xs} color={colors.text.white} />
              <Text style={[styles.serviceResponseTime, { color: colors.text.white }]}>{item.responseTime}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.serviceActions}>
          <TouchableOpacity 
            style={[styles.callButton, { backgroundColor: `${colors.text.white}20`, borderColor: `${colors.text.white}30` }]}
            onPress={() => handleEmergencyCall(item)}
          >
            <Ionicons name="call" size={s.iconSize.sm} color={colors.text.white} />
            <Text style={[styles.callButtonText, { color: colors.text.white }]}>Call {item.phone}</Text>
          </TouchableOpacity>
          
          {!item.isEmergency && (
            <TouchableOpacity 
              style={[styles.messageButton, { backgroundColor: `${colors.text.white}20`, borderColor: `${colors.text.white}30` }]}
              onPress={() => handleMessageArtisan(item)}
            >
              <Ionicons name="chatbubble-outline" size={s.iconSize.sm} color={colors.text.white} />
              <Text style={[styles.messageButtonText, { color: colors.text.white }]}>Message</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  const renderEmergencyTip = ({ item }: { item: EmergencyTip }) => (
    <View style={[styles.tipCard, { backgroundColor: colors.background.secondary, borderColor: colors.border, shadowColor: colors.text.primary }]}>
      <View style={[styles.tipIconContainer, { backgroundColor: colors.background.tertiary }]}>
        <Ionicons name={item.icon as any} size={s.iconSize.md} color={getThemedTipColor(item.id)} />
      </View>
      <View style={styles.tipContent}>
        <Text style={[styles.tipTitle, { color: colors.text.primary }]}>{item.title}</Text>
        <Text style={[styles.tipDescription, { color: colors.text.secondary }]}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.error, `${colors.error}80`]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: `${colors.text.white}20`, borderColor: `${colors.text.white}30` }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={s.iconSize.md} color={colors.text.white} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Ionicons name="warning" size={s.iconSize.lg} color={colors.text.white} />
            <Text style={[styles.headerTitle, { color: colors.text.white }]}>Emergency Services</Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.white }]}>Quick access to emergency help</Text>
            {/* Theme indicator for debugging */}
            <Text style={[styles.headerSubtitle, { color: colors.text.white, fontSize: 10, marginTop: 4 }]}>
              Theme: {currentTheme.id} | Accent: {currentAccent.id}
            </Text>
          </View>
          
          <TouchableOpacity style={[styles.sosButton, { backgroundColor: `${colors.text.white}20`, borderColor: `${colors.text.white}30` }]}>
            <Ionicons name="flash" size={s.iconSize.md} color={colors.text.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Category Filter */}
        <View style={styles.categoryFilter}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryChip,
                  { backgroundColor: colors.background.secondary, borderColor: colors.border },
                  selectedCategory === category.key && { backgroundColor: colors.error, borderColor: colors.error }
                ]}
                onPress={() => setSelectedCategory(category.key as any)}
              >
                <Ionicons 
                  name={category.icon as any} 
                  size={s.iconSize.sm} 
                  color={selectedCategory === category.key ? colors.text.white : colors.text.secondary} 
                />
                <Text style={[
                  styles.categoryChipText,
                  { color: colors.text.secondary },
                  selectedCategory === category.key && { color: colors.text.white }
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Emergency Services */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Emergency Services</Text>
          <FlatList
            data={filteredServices}
            renderItem={renderEmergencyService}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Emergency Tips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Emergency Tips</Text>
          <FlatList
            data={emergencyTips}
            renderItem={renderEmergencyTip}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('ChatScreen')}
            >
              <LinearGradient
                colors={[colors.error, `${colors.error}80`]}
                style={styles.quickActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="chatbubbles" size={s.iconSize.lg} color={colors.text.white} />
                <Text style={[styles.quickActionText, { color: colors.text.white }]}>Chat Support</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('ContactSupport')}
            >
              <LinearGradient
                colors={[colors.warning, `${colors.warning}80`]}
                style={styles.quickActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="help-circle" size={s.iconSize.lg} color={colors.text.white} />
                <Text style={[styles.quickActionText, { color: colors.text.white }]}>Get Help</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: s.spacing.lg,
    paddingHorizontal: s.padding,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: s.spacing.md,
    borderRadius: 24,
    borderWidth: 1,
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: s.fontSize.xl,
    fontWeight: '700',
    marginTop: s.spacing.sm,
  },
  headerSubtitle: {
    fontSize: s.fontSize.sm,
    opacity: 0.9,
    marginTop: s.spacing.xs,
  },
  sosButton: {
    padding: s.spacing.md,
    borderRadius: 24,
    borderWidth: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: s.padding,
    paddingBottom: 40,
  },
  categoryFilter: {
    marginVertical: s.spacing.lg,
  },
  categoryScrollContent: {
    gap: s.spacing.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s.spacing.sm,
    paddingHorizontal: s.spacing.lg,
    paddingVertical: s.spacing.md,
    borderRadius: 24,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: s.fontSize.sm,
    fontWeight: '600',
  },
  section: {
    marginBottom: s.spacing.lg,
  },
  sectionTitle: {
    fontSize: s.fontSize.lg,
    fontWeight: '700',
    marginBottom: s.spacing.lg,
  },
  serviceCard: {
    marginBottom: s.spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  serviceGradient: {
    padding: s.padding,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s.spacing.md,
    marginBottom: s.spacing.lg,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
    gap: s.spacing.xs,
  },
  serviceName: {
    fontSize: s.fontSize.lg,
    fontWeight: '700',
  },
  serviceDescription: {
    fontSize: s.fontSize.sm,
    opacity: 0.9,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s.spacing.xs,
  },
  serviceResponseTime: {
    fontSize: s.fontSize.sm,
    opacity: 0.9,
    fontWeight: '600',
  },
  serviceActions: {
    flexDirection: 'row',
    gap: s.spacing.md,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: s.spacing.md,
    gap: s.spacing.sm,
    borderWidth: 1,
  },
  callButtonText: {
    fontSize: s.fontSize.md,
    fontWeight: '700',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: s.spacing.md,
    gap: s.spacing.sm,
    borderWidth: 1,
  },
  messageButtonText: {
    fontSize: s.fontSize.md,
    fontWeight: '700',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: s.padding,
    marginBottom: s.spacing.md,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s.spacing.md,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: s.fontSize.md,
    fontWeight: '700',
    marginBottom: s.spacing.xs,
  },
  tipDescription: {
    fontSize: s.fontSize.sm,
    lineHeight: s.fontSize.sm * 1.4,
  },
  quickActions: {
    flexDirection: 'row',
    gap: s.spacing.md,
  },
  quickAction: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  quickActionGradient: {
    padding: s.padding,
    alignItems: 'center',
    gap: s.spacing.sm,
  },
  quickActionText: {
    fontSize: s.fontSize.md,
    fontWeight: '700',
  },
});

export default EmergencyScreen;
