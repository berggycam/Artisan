import React, { useEffect, useState } from 'react';
import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';
import ArtisanNavigator from './ArtisanNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

// TODO: Add logic to switch between navigators based on auth/user type
const RootNavigator: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const checkUserType = async () => {
      const storedType = await AsyncStorage.getItem('userType');
      setUserType(storedType);
      setIsLoading(false);
    };
    checkUserType();
  }, []);

  if (isLoading) return null;
  if (!isLoggedIn) return <AuthNavigator />;
  if (userType === 'artisan') return <ArtisanNavigator />;
  if (userType === 'customer') return <UserNavigator />;
  return <AuthNavigator />;
};

export default RootNavigator; 