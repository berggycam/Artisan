import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AvatarProps {
  uri?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ uri, size = 40 }) => (
  <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }] }>
    {uri ? (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    ) : (
      <Ionicons name="person" size={size * 0.7} color="#bbb" />
    )}
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