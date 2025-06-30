import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';
import fonts from '../../constants/fonts';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

// Service categories data
const allCategories = [
  { id: '1', name: 'Plumbing', icon: 'water-outline', color: '#3498db', description: 'Pipe repairs, installations, maintenance' },
  { id: '2', name: 'Electrical', icon: 'flash-outline', color: '#f39c12', description: 'Wiring, installations, repairs' },
  { id: '3', name: 'Cleaning', icon: 'sparkles-outline', color: '#2ecc71', description: 'House cleaning, deep cleaning' },
  { id: '4', name: 'Carpentry', icon: 'hammer-outline', color: '#8e44ad', description: 'Furniture, repairs, installations' },
  { id: '5', name: 'Painting', icon: 'color-palette-outline', color: '#e74c3c', description: 'Interior, exterior painting' },
  { id: '6', name: 'Gardening', icon: 'leaf-outline', color: '#27ae60', description: 'Landscaping, maintenance' },
  { id: '7', name: 'HVAC', icon: 'thermometer-outline', color: '#e67e22', description: 'Heating, ventilation, AC' },
  { id: '8', name: 'Roofing', icon: 'home-outline', color: '#34495e', description: 'Roof repairs, installations' },
  { id: '9', name: 'Moving', icon: 'car-outline', color: '#9b59b6', description: 'Moving services, packing' },
  { id: '10', name: 'Security', icon: 'shield-outline', color: '#c0392b', description: 'Security systems, locksmith' },
  { id: '11', name: 'Pet Care', icon: 'paw-outline', color: '#16a085', description: 'Pet sitting, grooming, walking' },
  { id: '12', name: 'Tutoring', icon: 'school-outline', color: '#2980b9', description: 'Academic tutoring, lessons' },
  { id: '13', name: 'Photography', icon: 'camera-outline', color: '#8e44ad', description: 'Events, portraits, commercial' },
  { id: '14', name: 'Catering', icon: 'restaurant-outline', color: '#e67e22', description: 'Events, parties, corporate' },
  { id: '15', name: 'Beauty', icon: 'cut-outline', color: '#e91e63', description: 'Hair, makeup, spa services' },
  { id: '16', name: 'Fitness', icon: 'fitness-outline', color: '#00bcd4', description: 'Personal training, yoga' },
];

const AllCategoriesScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = allCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (category: typeof allCategories[0]) => {
    setSelectedCategory(category.id);
    // Navigate to category services screen
    navigation.navigate('CategoryServices', { 
      category: {
        name: category.name,
        icon: category.icon,
        urgent: false
      }
    });
  };

  const renderCategoryItem = ({ item }: { item: typeof allCategories[0] }) => (
    <TouchableOpacity
      style={[styles.categoryItem, { 
        backgroundColor: colors.background.secondary,
        borderColor: colors.border,
        shadowColor: colors.text.primary
      }]}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[item.color, `${item.color}80`]}
        style={styles.categoryIcon}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={item.icon as any} size={32} color="#FFFFFF" />
      </LinearGradient>
      <Text style={[styles.categoryName, { color: colors.text.primary }]}>{item.name}</Text>
      <Text style={[styles.categoryDescription, { color: colors.text.secondary }]} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background.primary} 
      />
      
      {/* Header */}
      <View style={[styles.header, { 
        borderBottomColor: colors.border,
        backgroundColor: colors.background.primary
      }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.background.tertiary }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>All Categories</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { 
          backgroundColor: colors.background.tertiary,
          borderColor: colors.border
        }]}>
          <Ionicons name="search" size={20} color={colors.text.tertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text.primary }]}
            placeholder="Search categories..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories Grid */}
      <FlatList
        data={filteredCategories}
        keyExtractor={item => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
        columnWrapperStyle={styles.categoryRow}
        contentContainerStyle={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.resultsText, { color: colors.text.secondary }]}>
            {filteredCategories.length} category{filteredCategories.length !== 1 ? 'ies' : ''} found
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color={colors.text.tertiary} />
            <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>No categories found</Text>
            <Text style={[styles.emptySubtitle, { color: colors.text.secondary }]}>
              Try adjusting your search terms
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  resultsText: {
    fontSize: 14,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: isSmallScreen ? 100 : 120,
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryItem: {
    width: (width - 60) / 2,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: fonts.medium,
  },
  categoryDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: fonts.regular,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: fonts.medium,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },
});

export default AllCategoriesScreen; 