import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ProgressBarAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface DownloadedLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  size: string;
  downloadDate: string;
  lastUsed: string;
  isDownloaded: boolean;
  isDownloading?: boolean;
  downloadProgress?: number;
  isUpdating?: boolean;
}

const DownloadedLanguagesScreen: React.FC = ({ navigation }: any) => {
  const [downloadedLanguages, setDownloadedLanguages] = useState<DownloadedLanguage[]>([
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      region: 'United States',
      size: '15.2 MB',
      downloadDate: '2024-01-15',
      lastUsed: '2 hours ago',
      isDownloaded: true
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      region: 'Spain',
      size: '12.8 MB',
      downloadDate: '2024-01-10',
      lastUsed: '1 day ago',
      isDownloaded: true
    },
    {
      code: 'tw',
      name: 'Twi',
      nativeName: 'Twi',
      flag: '🇬🇭',
      region: 'Ghana',
      size: '8.5 MB',
      downloadDate: '2024-01-08',
      lastUsed: '3 days ago',
      isDownloaded: true
    },
    {
      code: 'ga',
      name: 'Ga',
      nativeName: 'Ga',
      flag: '🇬🇭',
      region: 'Ghana',
      size: '7.2 MB',
      downloadDate: '2024-01-05',
      lastUsed: '1 week ago',
      isDownloaded: true
    },
    {
      code: 'ew',
      name: 'Ewe',
      nativeName: 'Eʋegbe',
      flag: '🇬🇭',
      region: 'Ghana',
      size: '9.1 MB',
      downloadDate: '2024-01-03',
      lastUsed: '2 weeks ago',
      isDownloaded: true
    }
  ]);

  const [totalStorage, setTotalStorage] = useState('52.8 MB');
  const [availableStorage, setAvailableStorage] = useState('2.4 GB');
  
  const insets = useSafeAreaInsets();

  const handleRemoveLanguage = (language: DownloadedLanguage) => {
    Alert.alert(
      'Remove Language Pack',
      `Remove ${language.name} language pack (${language.size})? You can download it again later.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            const updatedLanguages = downloadedLanguages.filter(l => l.code !== language.code);
            setDownloadedLanguages(updatedLanguages);
            
            // Recalculate total storage
            const newTotal = updatedLanguages.reduce((total, lang) => {
              const size = parseFloat(lang.size.replace(' MB', ''));
              return total + size;
            }, 0);
            setTotalStorage(`${newTotal.toFixed(1)} MB`);
            
            Alert.alert('Success', `${language.name} language pack has been removed.`);
          }
        }
      ]
    );
  };

  const handleUpdateLanguage = (language: DownloadedLanguage) => {
    Alert.alert(
      'Update Language Pack',
      `Update ${language.name} language pack to the latest version?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Update', 
          onPress: () => {
            // Simulate update process
            const updatedLanguages = downloadedLanguages.map(l => 
              l.code === language.code 
                ? { ...l, isUpdating: true, downloadProgress: 0 }
                : l
            );
            setDownloadedLanguages(updatedLanguages);
            
            // Simulate progress
            let progress = 0;
            const interval = setInterval(() => {
              progress += 10;
              const updatedLanguages = downloadedLanguages.map(l => 
                l.code === language.code 
                  ? { ...l, downloadProgress: progress }
                  : l
              );
              setDownloadedLanguages(updatedLanguages);
              
              if (progress >= 100) {
                clearInterval(interval);
                const finalUpdate = downloadedLanguages.map(l => 
                  l.code === language.code 
                    ? { ...l, isUpdating: false, downloadProgress: undefined }
                    : l
                );
                setDownloadedLanguages(finalUpdate);
                Alert.alert('Success', `${language.name} language pack has been updated.`);
              }
            }, 200);
          }
        }
      ]
    );
  };

  const handleDownloadAll = () => {
    Alert.alert(
      'Download All Languages',
      'Download all available language packs? This will use significant storage space.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Download All', 
          onPress: () => Alert.alert('Coming Soon', 'Bulk download feature will be available soon.')
        }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Downloads',
      'Remove all downloaded language packs? This will free up storage space.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            setDownloadedLanguages([]);
            setTotalStorage('0.0 MB');
            Alert.alert('Success', 'All language packs have been removed.');
          }
        }
      ]
    );
  };

  const renderLanguageItem = (language: DownloadedLanguage) => (
    <View key={language.code} style={styles.languageCard}>
      <View style={styles.languageHeader}>
        <View style={styles.languageInfo}>
          <Text style={styles.languageFlag}>{language.flag}</Text>
          <View style={styles.languageDetails}>
            <Text style={styles.languageName}>{language.name}</Text>
            <Text style={styles.languageNative}>{language.nativeName}</Text>
            <Text style={styles.languageRegion}>{language.region}</Text>
          </View>
        </View>
        <View style={styles.languageSize}>
          <Text style={styles.sizeText}>{language.size}</Text>
        </View>
      </View>
      
      <View style={styles.languageMeta}>
        <Text style={styles.metaText}>Downloaded: {language.downloadDate}</Text>
        <Text style={styles.metaText}>Last used: {language.lastUsed}</Text>
      </View>
      
      {language.isUpdating && (
        <View style={styles.updateProgress}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${language.downloadProgress || 0}%` }]} />
          </View>
          <Text style={styles.progressText}>Updating... {language.downloadProgress || 0}%</Text>
        </View>
      )}
      
      <View style={styles.languageActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleUpdateLanguage(language)}
          disabled={language.isUpdating}
        >
          <Ionicons name="refresh-outline" size={16} color={colors.bronze} />
          <Text style={styles.actionText}>Update</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.removeButton]}
          onPress={() => handleRemoveLanguage(language)}
          disabled={language.isUpdating}
        >
          <Ionicons name="trash-outline" size={16} color={colors.error} />
          <Text style={[styles.actionText, styles.removeText]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.tanLight, colors.tan, colors.tanDark]}
      style={styles.gradientBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: responsiveSize(120) + insets.bottom }]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.brownDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Downloaded Languages</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Storage Overview */}
        <View style={styles.storageCard}>
          <View style={styles.storageHeader}>
            <Ionicons name="cloud-download" size={28} color={colors.bronze} />
            <Text style={styles.storageTitle}>Storage Overview</Text>
          </View>
          
          <View style={styles.storageStats}>
            <View style={styles.storageItem}>
              <Text style={styles.storageValue}>{totalStorage}</Text>
              <Text style={styles.storageLabel}>Total Downloaded</Text>
            </View>
            <View style={styles.storageDivider} />
            <View style={styles.storageItem}>
              <Text style={styles.storageValue}>{availableStorage}</Text>
              <Text style={styles.storageLabel}>Available Space</Text>
            </View>
            <View style={styles.storageDivider} />
            <View style={styles.storageItem}>
              <Text style={styles.storageValue}>{downloadedLanguages.length}</Text>
              <Text style={styles.storageLabel}>Languages</Text>
            </View>
          </View>
        </View>

        {/* Bulk Actions */}
        <View style={styles.bulkActionsCard}>
          <Text style={styles.bulkActionsTitle}>Bulk Actions</Text>
          <View style={styles.bulkActionsRow}>
            <TouchableOpacity style={styles.bulkActionButton} onPress={handleDownloadAll}>
              <Ionicons name="download-outline" size={20} color={colors.bronze} />
              <Text style={styles.bulkActionText}>Download All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.bulkActionButton, styles.clearButton]} onPress={handleClearAll}>
              <Ionicons name="trash-outline" size={20} color={colors.error} />
              <Text style={[styles.bulkActionText, styles.clearText]}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Downloaded Languages */}
        <View style={styles.languagesSection}>
          <Text style={styles.languagesTitle}>
            Downloaded Languages ({downloadedLanguages.length})
          </Text>
          
          {downloadedLanguages.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="cloud-download-outline" size={48} color={colors.brownDark} />
              <Text style={styles.emptyTitle}>No Downloaded Languages</Text>
              <Text style={styles.emptyDescription}>
                Download language packs to use them offline and improve translation speed.
              </Text>
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => navigation.navigate('LanguageSettings')}
              >
                <Text style={styles.emptyButtonText}>Browse Languages</Text>
              </TouchableOpacity>
            </View>
          ) : (
            downloadedLanguages.map(renderLanguageItem)
          )}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tips</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• Downloaded languages work offline</Text>
            <Text style={styles.tipText}>• Updates improve translation accuracy</Text>
            <Text style={styles.tipText}>• Remove unused languages to save space</Text>
            <Text style={styles.tipText}>• Frequently used languages are cached</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBg: { flex: 1 },
  scrollContent: { paddingTop: responsiveSize(20) },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(24),
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: responsiveSize(24),
    fontWeight: '700',
    color: colors.brownDark,
    textAlign: 'center',
  },
  storageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(24),
    elevation: 3,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(16),
  },
  storageTitle: {
    fontSize: responsiveSize(20),
    fontWeight: '700',
    color: colors.brownDark,
    marginLeft: responsiveSize(12),
  },
  storageStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  storageItem: {
    alignItems: 'center',
    flex: 1,
  },
  storageValue: {
    fontSize: responsiveSize(20),
    fontWeight: '700',
    color: colors.bronze,
    marginBottom: responsiveSize(4),
  },
  storageLabel: {
    fontSize: responsiveSize(12),
    color: colors.brownDark,
    textAlign: 'center',
  },
  storageDivider: {
    width: 1,
    height: responsiveSize(40),
    backgroundColor: colors.border,
  },
  bulkActionsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(24),
    elevation: 2,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  bulkActionsTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(12),
  },
  bulkActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bulkActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bronze + '20',
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(12),
    borderRadius: responsiveSize(12),
    flex: 1,
    marginHorizontal: responsiveSize(4),
  },
  bulkActionText: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: colors.bronze,
    marginLeft: responsiveSize(8),
  },
  clearButton: {
    backgroundColor: colors.error + '20',
  },
  clearText: {
    color: colors.error,
  },
  languagesSection: {
    marginBottom: responsiveSize(24),
  },
  languagesTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
  },
  emptyState: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(40),
    marginHorizontal: responsiveSize(20),
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  emptyTitle: {
    fontSize: responsiveSize(18),
    fontWeight: '600',
    color: colors.brownDark,
    marginTop: responsiveSize(16),
    marginBottom: responsiveSize(8),
  },
  emptyDescription: {
    fontSize: responsiveSize(14),
    color: colors.brownDark,
    textAlign: 'center',
    lineHeight: responsiveSize(20),
    marginBottom: responsiveSize(24),
  },
  emptyButton: {
    backgroundColor: colors.bronze,
    paddingHorizontal: responsiveSize(24),
    paddingVertical: responsiveSize(12),
    borderRadius: responsiveSize(12),
  },
  emptyButtonText: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: colors.text.white,
  },
  languageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(16),
    marginHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(12),
    elevation: 2,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(12),
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageFlag: {
    fontSize: responsiveSize(24),
    marginRight: responsiveSize(12),
  },
  languageDetails: {
    flex: 1,
  },
  languageName: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(2),
  },
  languageNative: {
    fontSize: responsiveSize(13),
    color: colors.bronze,
    marginBottom: responsiveSize(2),
  },
  languageRegion: {
    fontSize: responsiveSize(11),
    color: colors.brownDark,
  },
  languageSize: {
    alignItems: 'flex-end',
  },
  sizeText: {
    fontSize: responsiveSize(14),
    fontWeight: '600',
    color: colors.bronze,
  },
  languageMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(12),
  },
  metaText: {
    fontSize: responsiveSize(11),
    color: colors.brownDark,
  },
  updateProgress: {
    marginBottom: responsiveSize(12),
  },
  progressBar: {
    height: responsiveSize(4),
    backgroundColor: colors.border,
    borderRadius: responsiveSize(2),
    marginBottom: responsiveSize(4),
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.bronze,
    borderRadius: responsiveSize(2),
  },
  progressText: {
    fontSize: responsiveSize(11),
    color: colors.bronze,
    textAlign: 'center',
  },
  languageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bronze + '20',
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(8),
    borderRadius: responsiveSize(8),
    flex: 1,
    marginHorizontal: responsiveSize(4),
    justifyContent: 'center',
  },
  actionText: {
    fontSize: responsiveSize(12),
    fontWeight: '500',
    color: colors.bronze,
    marginLeft: responsiveSize(4),
  },
  removeButton: {
    backgroundColor: colors.error + '20',
  },
  removeText: {
    color: colors.error,
  },
  tipsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(24),
    elevation: 2,
    shadowColor: colors.brownDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tipsTitle: {
    fontSize: responsiveSize(16),
    fontWeight: '600',
    color: colors.brownDark,
    marginBottom: responsiveSize(12),
  },
  tipsList: {
    gap: responsiveSize(4),
  },
  tipText: {
    fontSize: responsiveSize(13),
    color: colors.brownDark,
    lineHeight: responsiveSize(18),
  },
});

export default DownloadedLanguagesScreen; 