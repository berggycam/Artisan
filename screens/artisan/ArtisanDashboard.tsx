import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  Dimensions, 
  ScrollView,
  Animated,
  Image,
  Modal,
  Pressable,
  SafeAreaView
} from 'react-native';
import Avatar from '../../components/shared/Avatar';
import StarRating from '../../components/shared/StarRating';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { 
  Circle, 
  Path, 
  Defs, 
  LinearGradient as SvgLinearGradient, 
  Stop, 
  G, 
  Polygon,
  Rect,
  ClipPath
} from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');
const responsiveSize = (size: number) => Math.max(size * (width / 375), size * 0.8);

// Modern Dashboard Illustration with tools and creative elements
const ModernDashboardIllustration = () => {
  const size = responsiveSize(200);
  
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <SvgLinearGradient id="modernGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FF6B6B" />
          <Stop offset="50%" stopColor="#4ECDC4" />
          <Stop offset="100%" stopColor="#45B7D1" />
        </SvgLinearGradient>
        <SvgLinearGradient id="modernGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#96CEB4" />
          <Stop offset="100%" stopColor="#FFEAA7" />
        </SvgLinearGradient>
        <SvgLinearGradient id="toolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FD79A8" />
          <Stop offset="100%" stopColor="#FDCB6E" />
        </SvgLinearGradient>
        <ClipPath id="circleClip">
          <Circle cx="100" cy="100" r="90" />
        </ClipPath>
      </Defs>
      
      {/* Background circles with glassmorphism effect */}
      <Circle cx="100" cy="100" r="95" fill="url(#modernGrad1)" opacity="0.1" />
      <Circle cx="100" cy="100" r="75" fill="url(#modernGrad2)" opacity="0.15" />
      <Circle cx="100" cy="100" r="55" fill="url(#toolGrad)" opacity="0.2" />
      
      {/* Central tool hub */}
      <G transform="translate(100, 100)">
        {/* Hammer */}
        <G transform="rotate(-20)">
          <Rect x="-2" y="-40" width="4" height="60" fill="#8B4513" rx="2" />
          <Rect x="-15" y="-45" width="30" height="12" fill="#606060" rx="3" />
          <Rect x="-12" y="-42" width="24" height="6" fill="#808080" rx="2" />
        </G>
        
        {/* Screwdriver */}
        <G transform="rotate(45)">
          <Rect x="-1.5" y="-35" width="3" height="50" fill="#FF6B6B" rx="1.5" />
          <Rect x="-3" y="-40" width="6" height="8" fill="#4ECDC4" rx="3" />
        </G>
        
        {/* Wrench */}
        <G transform="rotate(160)">
          <Path d="M-2,-30 L2,-30 L2,20 L-2,20 Z" fill="#45B7D1" />
          <Circle cx="0" cy="-25" r="8" fill="none" stroke="#45B7D1" strokeWidth="3" />
          <Circle cx="0" cy="15" r="5" fill="#45B7D1" />
        </G>
        
        {/* Central hub */}
        <Circle cx="0" cy="0" r="12" fill="url(#modernGrad1)" />
        <Circle cx="0" cy="0" r="8" fill="#FFFFFF" opacity="0.9" />
        <Circle cx="0" cy="0" r="4" fill="url(#toolGrad)" />
      </G>
      
      {/* Floating elements for dynamism */}
      <Circle cx="40" cy="60" r="6" fill="#FF6B6B" opacity="0.6" />
      <Polygon points="160,40 170,50 160,60 150,50" fill="#4ECDC4" opacity="0.7" />
      <Circle cx="50" cy="150" r="4" fill="#45B7D1" opacity="0.8" />
      <Rect x="140" y="140" width="8" height="8" fill="#96CEB4" opacity="0.6" rx="2" />
      <Circle cx="170" cy="80" r="5" fill="#FFEAA7" opacity="0.7" />
    </Svg>
  );
};

// Stats card component
const StatsCard = ({ title, value, icon, color }: any) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.statsCard, { transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient
        colors={color}
        style={styles.statsGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {icon}
        <Text style={styles.statsValue}>{value}</Text>
        <Text style={styles.statsTitle}>{title}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

// Action button with modern design
const ModernActionButton = ({ title, subtitle, icon, onPress, colors, delay = 0 }: any) => {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.actionButtonContainer,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        }
      ]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={colors}
          style={styles.modernActionButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.actionButtonContent}>
            <View style={styles.actionIconContainer}>
              {icon}
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>{title}</Text>
              <Text style={styles.actionSubtitle}>{subtitle}</Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const ArtisanDashboard: React.FC = () => {
  const { currentTheme } = useTheme();
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const [menuVisible, setMenuVisible] = React.useState(false);
  
  const artisan = {
    name: 'Kwame Mensah',
    specialty: 'Master Mason',
    avatarUri: undefined,
    rating: 4.8,
    totalJobs: 127,
    totalEarnings: 15420,
    completedJobs: 89,
    pendingJobs: 12,
    cancelledJobs: 3,
    averageRating: 4.8,
    totalReviews: 67,
    responseRate: 98,
    responseTime: '2.3 min',
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const statsData = [
    {
      title: 'Total Jobs',
      value: artisan.totalJobs.toString(),
      icon: <Ionicons name="briefcase" size={24} color="#FFFFFF" />,
      color: [currentTheme.colors.primary, currentTheme.colors.secondary],
    },
    {
      title: 'Earnings',
      value: `₵${artisan.totalEarnings.toLocaleString()}`,
      icon: <Ionicons name="cash" size={24} color="#FFFFFF" />,
      color: [currentTheme.colors.success, currentTheme.colors.warning],
    },
    {
      title: 'Rating',
      value: artisan.averageRating.toString(),
      icon: <Ionicons name="star" size={24} color="#FFFFFF" />,
      color: [currentTheme.colors.warning, currentTheme.colors.accent],
    },
  ];

  const actionButtons = [
    {
      title: 'Job Requests',
      subtitle: 'View and respond to new requests',
      icon: <Ionicons name="notifications" size={24} color="#FFFFFF" />,
      onPress: () => navigation.navigate('JobRequests'),
      colors: [currentTheme.colors.primary, currentTheme.colors.secondary],
      delay: 100,
    },
    {
      title: 'Manage Portfolio',
      subtitle: 'Update your work and services',
      icon: <Ionicons name="images" size={24} color="#FFFFFF" />,
      onPress: () => navigation.navigate('ManagePortfolio'),
      colors: [currentTheme.colors.accent, currentTheme.colors.primary],
      delay: 200,
    },
    {
      title: 'Earnings Analytics',
      subtitle: 'Track your income and performance',
      icon: <Ionicons name="analytics" size={24} color="#FFFFFF" />,
      onPress: () => navigation.navigate('EarningsAnalytics'),
      colors: [currentTheme.colors.success, currentTheme.colors.warning],
      delay: 300,
    },
    {
      title: 'Review Clients',
      subtitle: 'Rate and review your clients',
      icon: <Ionicons name="people" size={24} color="#FFFFFF" />,
      onPress: () => navigation.navigate('ReviewClients'),
      colors: [currentTheme.colors.warning, currentTheme.colors.accent],
      delay: 400,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={currentTheme.colors.background} 
      />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.greeting, { color: currentTheme.colors.text }]}>Good morning,</Text>
            <Text style={[styles.artisanName, { color: currentTheme.colors.text }]}>{artisan.name}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.menuButton, { backgroundColor: currentTheme.colors.surface }]}
            onPress={() => setMenuVisible(true)}
          >
            <Ionicons name="menu" size={24} color={currentTheme.colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Dashboard Illustration */}
          <View style={styles.illustrationContainer}>
            <ModernDashboardIllustration />
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {statsData.map((stat, index) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Quick Actions</Text>
            {actionButtons.map((action, index) => (
              <ModernActionButton
                key={action.title}
                title={action.title}
                subtitle={action.subtitle}
                icon={action.icon}
                onPress={action.onPress}
                colors={action.colors}
                delay={action.delay}
              />
            ))}
          </View>

          {/* Recent Activity */}
          <View style={styles.recentActivityContainer}>
            <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Recent Activity</Text>
            <View style={[styles.activityCard, { backgroundColor: currentTheme.colors.surface }]}>
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: currentTheme.colors.primary + '20' }]}>
                  <Ionicons name="checkmark-circle" size={20} color={currentTheme.colors.success} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityTitle, { color: currentTheme.colors.text }]}>Job Completed</Text>
                  <Text style={[styles.activitySubtitle, { color: currentTheme.colors.textSecondary }]}>
                    House painting project - ₵1,200 earned
                  </Text>
                  <Text style={[styles.activityTime, { color: currentTheme.colors.textSecondary }]}>2 hours ago</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: currentTheme.colors.warning + '20' }]}>
                  <Ionicons name="star" size={20} color={currentTheme.colors.warning} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityTitle, { color: currentTheme.colors.text }]}>New Review</Text>
                  <Text style={[styles.activitySubtitle, { color: currentTheme.colors.textSecondary }]}>
                    5-star rating from Sarah M.
                  </Text>
                  <Text style={[styles.activityTime, { color: currentTheme.colors.textSecondary }]}>1 day ago</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.menuModal, { backgroundColor: currentTheme.colors.background }]}>
            <View style={styles.menuHeader}>
              <Text style={[styles.menuTitle, { color: currentTheme.colors.text }]}>Menu</Text>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <Ionicons name="close" size={24} color={currentTheme.colors.text} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[styles.menuItem, { borderBottomColor: currentTheme.colors.border }]}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Settings');
              }}
            >
              <Ionicons name="settings" size={20} color={currentTheme.colors.text} />
              <Text style={[styles.menuItemText, { color: currentTheme.colors.text }]}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.menuItem, { borderBottomColor: currentTheme.colors.border }]}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Notifications');
              }}
            >
              <Ionicons name="notifications" size={20} color={currentTheme.colors.text} />
              <Text style={[styles.menuItemText, { color: currentTheme.colors.text }]}>Notifications</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.menuItem, { borderBottomColor: currentTheme.colors.border }]}
              onPress={() => {
                setMenuVisible(false);
                logout();
              }}
            >
              <Ionicons name="log-out" size={20} color={currentTheme.colors.error} />
              <Text style={[styles.menuItemText, { color: currentTheme.colors.error }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artisanName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recentActivityContainer: {
    paddingHorizontal: 20,
  },
  activityCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  menuModal: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  statsGradient: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    opacity: 0.9,
  },
  actionButtonContainer: {
    marginBottom: 16,
  },
  modernActionButton: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  actionArrow: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ArtisanDashboard;