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
  Pressable
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
import colors from '../../constants/colors';
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
    completedJobs: 127,
    activeProjects: 5,
    clientRating: 4.9,
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

  return (
    <LinearGradient
      colors={[colors.tanLight, colors.tan, colors.tanDark]}
      style={styles.gradientBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <Animated.View 
          style={[
            styles.profileSection,
            { paddingTop: 16 },
          ]}
        >
          {/* Top row: Three Dots Menu (left) and Notification Bell (right) */}
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 8, marginTop: 2, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ padding: 8 }}>
              <Ionicons name="ellipsis-vertical" size={24} color={colors.brownDark} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen')} style={{ padding: 8 }}>
              <Ionicons name="notifications-outline" size={26} color={colors.brownDark} />
            </TouchableOpacity>
          </View>
          {/* Avatar below icons row */}
          <View style={[styles.avatarSection, { marginTop: 12 }]}> 
            <View style={styles.avatarShadow}>
              <Avatar uri={artisan.avatarUri} size={110} />
              <View style={styles.onlineIndicatorNew} />
            </View>
          </View>
          {/* Account Settings Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('AccountSettings')}
            style={{
              marginTop: 16,
              marginBottom: 8,
              alignSelf: 'center',
              borderRadius: 24,
              overflow: 'hidden',
              elevation: 3,
              minWidth: 180,
              maxWidth: 240,
            }}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[colors.bronze, colors.gold]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24, alignItems: 'center' }}
            >
              <Text
                style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 0.5 }}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                Account Settings
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* Menu Modal */}
          <Modal
            visible={menuVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setMenuVisible(false)}
          >
            <Pressable style={{ flex: 1 }} onPress={() => setMenuVisible(false)}>
              <View style={{ position: 'absolute', top: 40, left: 24, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, elevation: 8, paddingVertical: 8, paddingHorizontal: 18, minWidth: 140 }}>
                <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('AccountSettings'); }} style={{ paddingVertical: 8 }}>
                  <Text style={{ color: colors.brownDark, fontWeight: '600', fontSize: 15, letterSpacing: 0.5 }}>Account Details</Text>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 4 }} />
                <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('SettingsScreen'); }} style={{ paddingVertical: 8 }}>
                  <Text style={{ color: colors.bronze, fontWeight: '600', fontSize: 15, letterSpacing: 0.5 }}>Settings</Text>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 4 }} />
                <TouchableOpacity onPress={() => { setMenuVisible(false); logout(); }} style={{ paddingVertical: 8 }}>
                  <Text style={{ color: '#E57373', fontWeight: '600', fontSize: 15, letterSpacing: 0.5 }}>Logout</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
          {/* Divider */}
          <View style={styles.profileDivider} />
          {/* Info */}
          <View style={styles.profileInfoModern}>
            <Text style={styles.profileNameModern}>{artisan.name}</Text>
            <Text style={styles.profileSpecialtyModern}>{artisan.specialty}</Text>
            <View style={styles.profileRatingModern}>
              <StarRating rating={artisan.rating} />
              <Text style={styles.profileRatingTextModern}>{artisan.rating}/5.0</Text>
            </View>
          </View>
        </Animated.View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <StatsCard 
            title="Completed Jobs" 
            value={artisan.completedJobs} 
            icon={<Ionicons name="checkmark-done-circle-outline" size={24} color="#fff" />} 
            color={[colors.gold, colors.bronze]}
          />
          <StatsCard 
            title="Active Projects" 
            value={artisan.activeProjects} 
            icon={<Ionicons name="construct-outline" size={24} color="#fff" />} 
            color={[colors.brownLight, colors.tanDark]}
          />
          <StatsCard 
            title="Client Rating" 
            value={artisan.clientRating} 
            icon={<Ionicons name="star-outline" size={24} color="#fff" />} 
            color={[colors.brown, colors.bronze]}
          />
        </View>

        {/* Actions Section */}
        <View style={styles.actionsSection}>
          <ModernActionButton
            title="Portfolio Manager"
            subtitle="Showcase your best work"
            icon={<Ionicons name="briefcase-outline" size={24} color="#fff" />}
            colors={[colors.gold, colors.bronze]}
            onPress={() => navigation.navigate('ManagePortfolio')}
            delay={100}
          />
          
          <ModernActionButton
            title="Job Requests"
            subtitle="New opportunities await"
            icon={<Ionicons name="document-text-outline" size={24} color="#fff" />}
            colors={[colors.brownLight, colors.tanDark]}
            onPress={() => navigation.navigate('JobRequests')}
            delay={200}
          />
          
          <ModernActionButton
            title="Client Reviews"
            subtitle="Manage feedback & ratings"
            icon={<Ionicons name="chatbubbles-outline" size={24} color="#fff" />}
            colors={[colors.brown, colors.bronze]}
            onPress={() => navigation.navigate('ReviewClients')}
            delay={300}
          />
          
          <ModernActionButton
            title="Earnings & Analytics"
            subtitle="Track your success"
            icon={<Ionicons name="bar-chart-outline" size={24} color="#fff" />}
            colors={[colors.brownLight, colors.tanDark]}
            onPress={() => navigation.navigate('Analytics')}
            delay={400}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  profileCardWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileCardGlass: {
    width: '100%',
    borderRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 32,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(210,180,140,0.18)',
    overflow: 'visible',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarShadow: {
    shadowColor: colors.bronze,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 6,
    position: 'relative',
  },
  onlineIndicatorNew: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#fff',
    zIndex: 2,
  },
  profileDivider: {
    width: 60,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(210,180,140,0.18)',
    marginVertical: 16,
  },
  profileInfoModern: {
    alignItems: 'center',
    width: '100%',
  },
  profileNameModern: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.brownDark,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  profileSpecialtyModern: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.bronze,
    marginBottom: 10,
    opacity: 0.85,
  },
  profileRatingModern: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileRatingTextModern: {
    fontSize: 16,
    color: colors.bronze,
    fontWeight: '600',
    marginLeft: 6,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
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
  statsIcon: {
    fontSize: 24,
    marginBottom: 8,
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
  actionsSection: {
    paddingHorizontal: 20,
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