import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ArtisanDashboard from '../screens/artisan/ArtisanDashboard';
import ManagePortfolio from '../screens/artisan/ManagePortfolio';
import JobRequests from '../screens/artisan/JobRequests';
import ReviewClients from '../screens/artisan/ReviewClients';
import AnimationScreen from '../screens/auth/AnimationScreen';
import EarningsAnalytics from '../screens/artisan/EarningsAnalytics';
import AccountSettingsScreen from '../screens/user/AccountSettingsScreen';
import NotificationsScreen from '../screens/artisan/NotificationsScreen';
import AccountDetailsScreen from '../screens/artisan/AccountDetailsScreen';
import SettingsScreen from '../screens/artisan/SettingsScreen';
import SearchScreen from '../screens/artisan/SearchScreen';
import PrivacySecurityScreen from '../screens/shared/PrivacySecurityScreen';
import LanguageSettingsScreen from '../screens/shared/LanguageSettingsScreen';
import ThemeCustomizationScreen from '../screens/shared/ThemeCustomizationScreen';
import AutoTranslateScreen from '../screens/shared/AutoTranslateScreen';
import MessageTranslationScreen from '../screens/shared/MessageTranslationScreen';
import NativeNamesScreen from '../screens/shared/NativeNamesScreen';
import DownloadedLanguagesScreen from '../screens/shared/DownloadedLanguagesScreen';
import NotificationScheduleScreen from '../screens/shared/NotificationScheduleScreen';
import StorageManagementScreen from '../screens/shared/StorageManagementScreen';
import DataExportScreen from '../screens/shared/DataExportScreen';
import ContactSupportScreen from '../screens/shared/ContactSupportScreen';
import RateAppScreen from '../screens/shared/RateAppScreen';
import ReportBugScreen from '../screens/shared/ReportBugScreen';
import AppVersionScreen from '../screens/shared/AppVersionScreen';
import CreateBookingScreen from '../screens/shared/CreateBookingScreen';
import BookingDetailScreen from '../screens/shared/BookingDetailScreen';

const Stack = createStackNavigator();

const ArtisanNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Animation">
    <Stack.Screen name="Animation" component={AnimationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ArtisanDashboard" component={ArtisanDashboard} options={{ headerShown: false }} />
    <Stack.Screen name="ManagePortfolio" component={ManagePortfolio} options={{ headerShown: false }} />
    <Stack.Screen name="JobRequests" component={JobRequests} options={{ headerShown: false }} />
    <Stack.Screen name="ReviewClients" component={ReviewClients} options={{ headerShown: false }} />
    <Stack.Screen name="Analytics" component={EarningsAnalytics} options={{ headerShown: false }} />
    <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    <Stack.Screen name="JobDetail" component={JobRequests} options={{ headerShown: false }} />
    <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} options={{ headerShown: false }} />
    <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ThemeCustomization" component={ThemeCustomizationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AutoTranslate" component={AutoTranslateScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MessageTranslation" component={MessageTranslationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="NativeNames" component={NativeNamesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="DownloadedLanguages" component={DownloadedLanguagesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="NotificationSchedule" component={NotificationScheduleScreen} options={{ headerShown: false }} />
    <Stack.Screen name="StorageManagement" component={StorageManagementScreen} options={{ headerShown: false }} />
    <Stack.Screen name="DataExport" component={DataExportScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ContactSupport" component={ContactSupportScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RateApp" component={RateAppScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ReportBug" component={ReportBugScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AppVersion" component={AppVersionScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Booking" component={CreateBookingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="BookingDetail" component={BookingDetailScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default ArtisanNavigator; 