import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface AvatarProps {
  uri?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ uri, size = 40 }) => (
  <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }] }>
    <Image
      source={uri ? { uri } : require('../../assets/icons/default-avatar.png')}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Avatar; 