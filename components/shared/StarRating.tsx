import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <Text key={i} style={styles.star}>
          {i < rating ? '★' : '☆'}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 18,
    color: '#FFD700',
    marginHorizontal: 1,
  },
});

export default StarRating; 