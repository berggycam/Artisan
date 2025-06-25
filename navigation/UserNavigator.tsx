import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/user/HomeScreen';
import SearchScreen from '../screens/user/SearchScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import ViewArtisanScreen from '../screens/user/ViewArtisanScreen';
import NotificationsScreen from '../screens/shared/NotificationsScreen';
import HelpScreen from '../screens/user/HelpScreen';
import FAQsScreen from '../screens/user/FAQsScreen';
import ContactSupportScreen from '../screens/user/ContactSupportScreen';
import ReportBugScreen from '../screens/user/ReportBugScreen';
import SettingsScreen from '../screens/shared/SettingsScreen';
import BookingScreen from '../screens/shared/BookingScreen';
import FavoritesScreen from '../screens/user/FavoritesScreen';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2C3E50',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0.5, borderTopColor: '#eee', height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home-outline';
          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Search') iconName = 'search-outline';
          if (route.name === 'Bookings') iconName = 'calendar-outline';
          if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
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
    <Stack.Screen name="ViewArtisan" component={ViewArtisanScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
    <Stack.Screen name="FAQs" component={FAQsScreen} />
    <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
    <Stack.Screen name="ReportBug" component={ReportBugScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
  </Stack.Navigator>
);

export default UserNavigator; 