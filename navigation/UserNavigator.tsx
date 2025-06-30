import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import HomeScreen from '../screens/user/HomeScreen';
import SearchScreen from '../screens/user/SearchScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import NotificationsScreen from '../screens/shared/NotificationsScreen';
import HelpScreen from '../screens/user/HelpScreen';
import FAQsScreen from '../screens/user/FAQsScreen';
import ContactSupportScreen from '../screens/shared/ContactSupportScreen';
import ReportBugScreen from '../screens/shared/ReportBugScreen';
import SettingsScreen from '../screens/shared/SettingsScreen';
import ThemeCustomizationScreen from '../screens/shared/ThemeCustomizationScreen';
import BookingScreen from '../screens/shared/BookingScreen';
import BookingDetailScreen from '../screens/shared/BookingDetailScreen';
import CreateBookingScreen from '../screens/shared/CreateBookingScreen';
import PaymentConfirmationScreen from '../screens/shared/PaymentConfirmationScreen';
import PaymentInputScreen from '../screens/shared/PaymentInputScreen';
import BookingSuccessScreen from '../screens/shared/BookingSuccessScreen';
import PaymentDemoScreen from '../screens/shared/PaymentDemoScreen';
import FavoritesScreen from '../screens/user/FavoritesScreen';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import AccountSettingsScreen from '../screens/user/AccountSettingsScreen';
import ChatScreen from '../screens/shared/ChatScreen';
import ChatDetailScreen from '../screens/shared/ChatDetailScreen';
import NewChatScreen from '../screens/shared/NewChatScreen';
import ChatSettingsScreen from '../screens/shared/ChatSettingsScreen';
import BlockedUsersScreen from '../screens/shared/BlockedUsersScreen';
import FontSizeScreen from '../screens/shared/FontSizeScreen';
import BubbleStyleScreen from '../screens/shared/BubbleStyleScreen';
import ChatBackgroundScreen from '../screens/shared/ChatBackgroundScreen';
import TimePickerScreen from '../screens/shared/TimePickerScreen';
import TermsOfServiceScreen from '../screens/shared/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../screens/shared/PrivacyPolicyScreen';
import PrivacySecurityScreen from '../screens/shared/PrivacySecurityScreen';
import LanguageSettingsScreen from '../screens/shared/LanguageSettingsScreen';
import AutoTranslateScreen from '../screens/shared/AutoTranslateScreen';
import MessageTranslationScreen from '../screens/shared/MessageTranslationScreen';
import NativeNamesScreen from '../screens/shared/NativeNamesScreen';
import ArtisanProfileScreen from '../screens/shared/ArtisanProfileScreen';
import SearchMessagesScreen from '../screens/shared/SearchMessagesScreen';
import ExportChatScreen from '../screens/shared/ExportChatScreen';
import ReportUserScreen from '../screens/shared/ReportUserScreen';
import CategoryServicesScreen from '../screens/user/CategoryServicesScreen';
import AllCategoriesScreen from '../screens/user/AllCategoriesScreen';
import AllArtisansScreen from '../screens/user/AllArtisansScreen';
import ActivityHistoryScreen from '../screens/user/ActivityHistoryScreen';
import MuteNotificationsScreen from '../screens/shared/MuteNotificationsScreen';
import EmergencyScreen from '../screens/user/EmergencyScreen';
import ActivityDetailsScreen from '../screens/user/ActivityDetailsScreen';
import ServiceRequestScreen from '../screens/user/ServiceRequestScreen';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from './types';
import DownloadedLanguagesScreen from '../screens/shared/DownloadedLanguagesScreen';
import NotificationScheduleScreen from '../screens/shared/NotificationScheduleScreen';
import StorageManagementScreen from '../screens/shared/StorageManagementScreen';
import DataExportScreen from '../screens/shared/DataExportScreen';
import RateAppScreen from '../screens/shared/RateAppScreen';
import AppVersionScreen from '../screens/shared/AppVersionScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700; // Threshold for smaller screens

function MainTabs({ route }: { route: any }) {
  const initialRoute = route?.params?.initialRoute;
  
  return (
    <Tab.Navigator
      initialRouteName={initialRoute || 'Home'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2C3E50',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarStyle: { 
          backgroundColor: '#fff', 
          borderTopWidth: 0.5, 
          borderTopColor: '#eee', 
          height: isSmallScreen ? 70 : 80,
          paddingTop: isSmallScreen ? 8 : 12,
          paddingBottom: isSmallScreen ? 8 : 12,
          elevation: isSmallScreen ? 8 : 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: isSmallScreen ? -2 : -3 },
          shadowOpacity: isSmallScreen ? 0.1 : 0.15,
          shadowRadius: isSmallScreen ? 4 : 6,
          position: 'absolute',
          bottom: isSmallScreen ? 0 : 10,
          left: isSmallScreen ? 0 : 10,
          right: isSmallScreen ? 0 : 10,
          borderRadius: isSmallScreen ? 0 : 20,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home-outline';
          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Search') iconName = 'search-outline';
          if (route.name === 'Bookings') iconName = 'calendar-outline';
          if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginBottom: isSmallScreen ? 4 : 4 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const UserNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="ArtisanProfile" component={ArtisanProfileScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="Messages" component={ChatScreen} />
    <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
    <Stack.Screen name="NewChat" component={NewChatScreen} />
    <Stack.Screen name="ChatSettings" component={ChatSettingsScreen} />
    <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
    <Stack.Screen name="FontSize" component={FontSizeScreen} />
    <Stack.Screen name="BubbleStyle" component={BubbleStyleScreen} />
    <Stack.Screen name="ChatBackground" component={ChatBackgroundScreen} />
    <Stack.Screen name="TimePicker" component={TimePickerScreen} />
    <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
    <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
    <Stack.Screen name="FAQs" component={FAQsScreen} />
    <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
    <Stack.Screen name="ReportBug" component={ReportBugScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    <Stack.Screen name="SearchMessages" component={SearchMessagesScreen} />
    <Stack.Screen name="ExportChat" component={ExportChatScreen} />
    <Stack.Screen name="ReportUser" component={ReportUserScreen} />
    <Stack.Screen name="CategoryServices" component={CategoryServicesScreen} />
    <Stack.Screen name="AllCategories" component={AllCategoriesScreen} />
    <Stack.Screen name="AllArtisans" component={AllArtisansScreen} />
    <Stack.Screen name="ActivityHistory" component={ActivityHistoryScreen} />
    <Stack.Screen name="MuteNotifications" component={MuteNotificationsScreen} />
    <Stack.Screen name="Emergency" component={EmergencyScreen} />
    <Stack.Screen name="Booking" component={CreateBookingScreen} />
    <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
    <Stack.Screen name="ServiceRequest" component={ServiceRequestScreen} />
    <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
    <Stack.Screen name="PaymentInput" component={PaymentInputScreen} />
    <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
    <Stack.Screen name="PaymentDemo" component={PaymentDemoScreen} />
    <Stack.Screen
      name="ActivityDetails"
      // @ts-expect-error: ActivityDetailsScreen expects navigation and route props, which are provided by React Navigation at runtime
      component={ActivityDetailsScreen}
    />
    <Stack.Screen name="AutoTranslate" component={AutoTranslateScreen} />
    <Stack.Screen name="MessageTranslation" component={MessageTranslationScreen} />
    <Stack.Screen name="NativeNames" component={NativeNamesScreen} />
    <Stack.Screen name="DownloadedLanguages" component={DownloadedLanguagesScreen} />
    <Stack.Screen name="ThemeCustomization" component={ThemeCustomizationScreen} />
    <Stack.Screen name="NotificationSchedule" component={NotificationScheduleScreen} />
    <Stack.Screen name="StorageManagement" component={StorageManagementScreen} />
    <Stack.Screen name="DataExport" component={DataExportScreen} />
    <Stack.Screen name="RateApp" component={RateAppScreen} />
    <Stack.Screen name="AppVersion" component={AppVersionScreen} />
  </Stack.Navigator>
);

export default UserNavigator; 