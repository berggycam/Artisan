import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ArtisanDashboard from '../screens/artisan/ArtisanDashboard';
import ManagePortfolio from '../screens/artisan/ManagePortfolio';
import JobRequests from '../screens/artisan/JobRequests';
import ReviewClients from '../screens/artisan/ReviewClients';

const Stack = createStackNavigator();

const ArtisanNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="ArtisanDashboard">
    <Stack.Screen name="ArtisanDashboard" component={ArtisanDashboard} />
    <Stack.Screen name="ManagePortfolio" component={ManagePortfolio} />
    <Stack.Screen name="JobRequests" component={JobRequests} />
    <Stack.Screen name="ReviewClients" component={ReviewClients} />
  </Stack.Navigator>
);

export default ArtisanNavigator; 