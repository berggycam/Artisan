import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface StorageItem {
  id: string;
  name: string;
  size: number;
  type: 'cache' | 'downloads' | 'images' | 'videos' | 'documents' | 'other';
  icon: string;
  color: string;
  canDelete: boolean;
  lastAccessed?: string;
}

interface StorageCategory {
  id: string;
  name: string;
  totalSize: number;
  items: StorageItem[];
  color: string;
  icon: string;
}

const StorageManagementScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();

  // Storage state
  const [totalStorage, setTotalStorage] = useState(5 * 1024 * 1024 * 1024); // 5GB
  const [usedStorage, setUsedStorage] = useState(2.4 * 1024 * 1024 * 1024); // 2.4GB
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);

  // Storage categories
  const [storageCategories, setStorageCategories] = useState<StorageCategory[]>([
    {
      id: 'cache',
      name: 'App Cache',
      totalSize: 850 * 1024 * 1024, // 850MB
      color: '#FF6B6B',
      icon: 'refresh-outline',
      items: [
        {
          id: 'image-cache',
          name: 'Image Cache',
          size: 450 * 1024 * 1024,
          type: 'cache',
          icon: 'image-outline',
          color: '#FF6B6B',
          canDelete: true,
          lastAccessed: '2 hours ago'
        },
        {
          id: 'data-cache',
          name: 'Data Cache',
          size: 300 * 1024 * 1024,
          type: 'cache',
          icon: 'document-outline',
          color: '#FF6B6B',
          canDelete: true,
          lastAccessed: '1 day ago'
        },
        {
          id: 'temp-cache',
          name: 'Temporary Files',
          size: 100 * 1024 * 1024,
          type: 'cache',
          icon: 'trash-outline',
          color: '#FF6B6B',
          canDelete: true,
          lastAccessed: '3 hours ago'
        }
      ]
    },
    {
      id: 'downloads',
      name: 'Downloads',
      totalSize: 650 * 1024 * 1024, // 650MB
      color: '#4ECDC4',
      icon: 'download-outline',
      items: [
        {
          id: 'downloaded-images',
          name: 'Downloaded Images',
          size: 400 * 1024 * 1024,
          type: 'downloads',
          icon: 'images-outline',
          color: '#4ECDC4',
          canDelete: true,
          lastAccessed: '1 week ago'
        },
        {
          id: 'downloaded-docs',
          name: 'Downloaded Documents',
          size: 250 * 1024 * 1024,
          type: 'downloads',
          icon: 'document-text-outline',
          color: '#4ECDC4',
          canDelete: true,
          lastAccessed: '3 days ago'
        }
      ]
    },
    {
      id: 'media',
      name: 'Media Files',
      totalSize: 750 * 1024 * 1024, // 750MB
      color: '#45B7D1',
      icon: 'camera-outline',
      items: [
        {
          id: 'profile-images',
          name: 'Profile Images',
          size: 300 * 1024 * 1024,
          type: 'images',
          icon: 'person-outline',
          color: '#45B7D1',
          canDelete: false,
          lastAccessed: '2 days ago'
        },
        {
          id: 'chat-media',
          name: 'Chat Media',
          size: 250 * 1024 * 1024,
          type: 'images',
          icon: 'chatbubble-outline',
          color: '#45B7D1',
          canDelete: true,
          lastAccessed: '1 day ago'
        },
        {
          id: 'portfolio-images',
          name: 'Portfolio Images',
          size: 200 * 1024 * 1024,
          type: 'images',
          icon: 'images-outline',
          color: '#45B7D1',
          canDelete: false,
          lastAccessed: '1 week ago'
        }
      ]
    },
    {
      id: 'data',
      name: 'App Data',
      totalSize: 150 * 1024 * 1024, // 150MB
      color: '#96CEB4',
      icon: 'folder-outline',
      items: [
        {
          id: 'user-data',
          name: 'User Data',
          size: 80 * 1024 * 1024,
          type: 'documents',
          icon: 'person-circle-outline',
          color: '#96CEB4',
          canDelete: false,
          lastAccessed: 'Today'
        },
        {
          id: 'settings-data',
          name: 'Settings & Preferences',
          size: 40 * 1024 * 1024,
          type: 'documents',
          icon: 'settings-outline',
          color: '#96CEB4',
          canDelete: false,
          lastAccessed: 'Today'
        },
        {
          id: 'logs',
          name: 'App Logs',
          size: 30 * 1024 * 1024,
          type: 'other',
          icon: 'document-text-outline',
          color: '#96CEB4',
          canDelete: true,
          lastAccessed: '2 days ago'
        }
      ]
    }
  ]);

  useEffect(() => {
    // Simulate loading storage data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getStoragePercentage = (): number => {
    return (usedStorage / totalStorage) * 100;
  };

  const getStorageColor = (): string => {
    const percentage = getStoragePercentage();
    if (percentage > 90) return colors.error;
    if (percentage > 75) return colors.warning;
    return colors.success;
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. The app may need to re-download some content. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Cache',
          style: 'destructive',
          onPress: () => {
            setIsClearing(true);
            // Simulate clearing cache
            setTimeout(() => {
              const updatedCategories = storageCategories.map(category => {
                if (category.id === 'cache') {
                  return {
                    ...category,
                    totalSize: 0,
                    items: category.items.map(item => ({ ...item, size: 0 }))
                  };
                }
                return category;
              });
              setStorageCategories(updatedCategories);
              setUsedStorage(prev => prev - 850 * 1024 * 1024);
              setIsClearing(false);
              Alert.alert('Success', 'Cache cleared successfully!');
            }, 2000);
          }
        }
      ]
    );
  };

  const handleClearDownloads = () => {
    Alert.alert(
      'Clear Downloads',
      'This will delete all downloaded files. This action cannot be undone. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Downloads',
          style: 'destructive',
          onPress: () => {
            setIsClearing(true);
            // Simulate clearing downloads
            setTimeout(() => {
              const updatedCategories = storageCategories.map(category => {
                if (category.id === 'downloads') {
                  return {
                    ...category,
                    totalSize: 0,
                    items: category.items.map(item => ({ ...item, size: 0 }))
                  };
                }
                return category;
              });
              setStorageCategories(updatedCategories);
              setUsedStorage(prev => prev - 650 * 1024 * 1024);
              setIsClearing(false);
              Alert.alert('Success', 'Downloads cleared successfully!');
            }, 2000);
          }
        }
      ]
    );
  };

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    const category = storageCategories.find(cat => cat.id === categoryId);
    const item = category?.items.find(item => item.id === itemId);
    
    if (!item || !item.canDelete) return;

    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedCategories = storageCategories.map(cat => {
              if (cat.id === categoryId) {
                const updatedItems = cat.items.filter(item => item.id !== itemId);
                const newTotalSize = updatedItems.reduce((sum, item) => sum + item.size, 0);
                return {
                  ...cat,
                  totalSize: newTotalSize,
                  items: updatedItems
                };
              }
              return cat;
            });
            setStorageCategories(updatedCategories);
            setUsedStorage(prev => prev - item.size);
          }
        }
      ]
    );
  };

  const renderStorageOverview = () => (
    <View style={[styles.overviewCard, { backgroundColor: colors.surface }]}>
      <View style={styles.overviewHeader}>
        <Text style={[styles.overviewTitle, { color: colors.text.primary }]}>
          Storage Overview
        </Text>
        <Text style={[styles.overviewSubtitle, { color: colors.text.secondary }]}>
          {formatBytes(usedStorage)} of {formatBytes(totalStorage)} used
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${getStoragePercentage()}%`,
                backgroundColor: getStorageColor()
              }
            ]} 
          />
        </View>
        <Text style={[styles.progressText, { color: colors.text.secondary }]}>
          {getStoragePercentage().toFixed(1)}% used
        </Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={[styles.quickActionButton, { backgroundColor: colors.primary }]}
          onPress={handleClearCache}
          disabled={isClearing}
        >
          {isClearing ? (
            <ActivityIndicator size="small" color={colors.background.primary} />
          ) : (
            <Ionicons name="refresh-outline" size={20} color={colors.background.primary} />
          )}
          <Text style={[styles.quickActionText, { color: colors.background.primary }]}>
            Clear Cache
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickActionButton, { backgroundColor: colors.secondary }]}
          onPress={handleClearDownloads}
          disabled={isClearing}
        >
          {isClearing ? (
            <ActivityIndicator size="small" color={colors.background.primary} />
          ) : (
            <Ionicons name="download-outline" size={20} color={colors.background.primary} />
          )}
          <Text style={[styles.quickActionText, { color: colors.background.primary }]}>
            Clear Downloads
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStorageCategory = (category: StorageCategory) => (
    <View key={category.id} style={[styles.categoryCard, { backgroundColor: colors.surface }]}>
      <View style={styles.categoryHeader}>
        <View style={styles.categoryInfo}>
          <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
            <Ionicons name={category.icon as any} size={24} color={category.color} />
          </View>
          <View style={styles.categoryText}>
            <Text style={[styles.categoryName, { color: colors.text.primary }]}>
              {category.name}
            </Text>
            <Text style={[styles.categorySize, { color: colors.text.secondary }]}>
              {formatBytes(category.totalSize)}
            </Text>
          </View>
        </View>
        <View style={[styles.categoryPercentage, { backgroundColor: category.color + '20' }]}>
          <Text style={[styles.percentageText, { color: category.color }]}>
            {((category.totalSize / usedStorage) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        {category.items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Ionicons name={item.icon as any} size={20} color={item.color} />
              <View style={styles.itemText}>
                <Text style={[styles.itemName, { color: colors.text.primary }]}>
                  {item.name}
                </Text>
                <Text style={[styles.itemDetails, { color: colors.text.secondary }]}>
                  {formatBytes(item.size)} • {item.lastAccessed}
                </Text>
              </View>
            </View>
            {item.canDelete && (
              <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: colors.error + '20' }]}
                onPress={() => handleDeleteItem(category.id, item.id)}
              >
                <Ionicons name="trash-outline" size={16} color={colors.error} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <StatusBar 
          barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
          backgroundColor={colors.background.primary} 
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
            Analyzing storage...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar 
        barStyle={currentTheme.id === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background.primary} 
      />
      
      {/* Header */}
      <LinearGradient
        colors={currentTheme.gradient as [string, string, string]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
              Storage Management
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              Manage your app storage and data
            </Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {renderStorageOverview()}
        
        <View style={styles.categoriesContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Storage Breakdown
          </Text>
          {storageCategories.map(renderStorageCategory)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  overviewCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  overviewHeader: {
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  overviewSubtitle: {
    fontSize: 14,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryText: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  categorySize: {
    fontSize: 14,
  },
  categoryPercentage: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemsContainer: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  itemDetails: {
    fontSize: 12,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StorageManagementScreen; 