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
  </Stack.Navigator>
);

export default ArtisanNavigator; 