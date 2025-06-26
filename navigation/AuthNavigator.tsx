import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import AnimationScreen from '../screens/auth/AnimationScreen';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Animation" component={AnimationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AuthNavigator; 