import React, { useState } from 'react';
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
  ActivityIndicator,
  Switch
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface ExportOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isSelected: boolean;
  size: string;
  includes: string[];
}

interface ExportFormat {
  id: string;
  name: string;
  description: string;
  icon: string;
  extension: string;
  isSelected: boolean;
}

interface ExportHistory {
  id: string;
  date: string;
  type: string;
  format: string;
  size: string;
  status: 'completed' | 'failed' | 'in_progress';
}

const DataExportScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();

  // Export options
  const [exportOptions, setExportOptions] = useState<ExportOption[]>([
    {
      id: 'profile',
      name: 'Profile Data',
      description: 'Personal information and preferences',
      icon: 'person-outline',
      color: '#4ECDC4',
      isSelected: true,
      size: '2.3 MB',
      includes: ['Personal info', 'Profile picture', 'Settings', 'Preferences']
    },
    {
      id: 'bookings',
      name: 'Booking History',
      description: 'All your past and current bookings',
      icon: 'calendar-outline',
      color: '#45B7D1',
      isSelected: true,
      size: '1.8 MB',
      includes: ['Booking details', 'Payment history', 'Reviews', 'Cancellations']
    },
    {
      id: 'messages',
      name: 'Chat Messages',
      description: 'All your conversations and messages',
      icon: 'chatbubble-outline',
      color: '#96CEB4',
      isSelected: false,
      size: '4.2 MB',
      includes: ['Chat history', 'Media files', 'Voice messages', 'Attachments']
    },
    {
      id: 'favorites',
      name: 'Favorites & Lists',
      description: 'Saved artisans and favorite services',
      icon: 'heart-outline',
      color: '#FF6B6B',
      isSelected: true,
      size: '0.8 MB',
      includes: ['Favorite artisans', 'Saved services', 'Custom lists', 'Notes']
    },
    {
      id: 'activity',
      name: 'Activity History',
      description: 'Your app usage and activity logs',
      icon: 'analytics-outline',
      color: '#F39C12',
      isSelected: false,
      size: '1.5 MB',
      includes: ['Login history', 'Search history', 'App usage', 'Analytics']
    },
    {
      id: 'media',
      name: 'Media Files',
      description: 'Images and files you\'ve uploaded',
      icon: 'images-outline',
      color: '#9B59B6',
      isSelected: false,
      size: '12.7 MB',
      includes: ['Profile pictures', 'Chat images', 'Documents', 'Videos']
    }
  ]);

  // Export formats
  const [exportFormats, setExportFormats] = useState<ExportFormat[]>([
    {
      id: 'json',
      name: 'JSON',
      description: 'Machine-readable format, best for data analysis',
      icon: 'code-outline',
      extension: '.json',
      isSelected: true
    },
    {
      id: 'csv',
      name: 'CSV',
      description: 'Spreadsheet format, easy to open in Excel',
      icon: 'grid-outline',
      extension: '.csv',
      isSelected: false
    },
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Printable format, good for documentation',
      icon: 'document-text-outline',
      extension: '.pdf',
      isSelected: false
    },
    {
      id: 'zip',
      name: 'ZIP Archive',
      description: 'Compressed format, includes all files',
      icon: 'archive-outline',
      extension: '.zip',
      isSelected: false
    }
  ]);

  // Export history
  const [exportHistory, setExportHistory] = useState<ExportHistory[]>([
    {
      id: '1',
      date: '2024-01-15',
      type: 'Profile & Bookings',
      format: 'JSON',
      size: '4.1 MB',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-10',
      type: 'All Data',
      format: 'ZIP',
      size: '18.2 MB',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-01-05',
      type: 'Messages',
      format: 'PDF',
      size: '4.2 MB',
      status: 'failed'
    }
  ]);

  // UI state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  const toggleExportOption = (id: string) => {
    setExportOptions(prev => 
      prev.map(option => 
        option.id === id ? { ...option, isSelected: !option.isSelected } : option
      )
    );
  };

  const toggleExportFormat = (id: string) => {
    setExportFormats(prev => 
      prev.map(format => 
        format.id === id ? { ...format, isSelected: !format.isSelected } : format
      )
    );
  };

  const getSelectedOptions = () => {
    return exportOptions.filter(option => option.isSelected);
  };

  const getSelectedFormats = () => {
    return exportFormats.filter(format => format.isSelected);
  };

  const getTotalSize = () => {
    const selectedOptions = getSelectedOptions();
    return selectedOptions.reduce((total, option) => {
      const size = parseFloat(option.size.replace(' MB', ''));
      return total + size;
    }, 0);
  };

  const handleExport = () => {
    const selectedOptions = getSelectedOptions();
    const selectedFormats = getSelectedFormats();

    if (selectedOptions.length === 0) {
      Alert.alert('No Data Selected', 'Please select at least one data type to export.');
      return;
    }

    if (selectedFormats.length === 0) {
      Alert.alert('No Format Selected', 'Please select at least one export format.');
      return;
    }

    Alert.alert(
      'Export Data',
      `Export ${selectedOptions.length} data type(s) in ${selectedFormats.length} format(s)?\n\nTotal size: ${getTotalSize().toFixed(1)} MB`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Export',
          onPress: () => {
            setIsExporting(true);
            setExportProgress(0);
            
            // Simulate export process
            const interval = setInterval(() => {
              setExportProgress(prev => {
                if (prev >= 100) {
                  clearInterval(interval);
                  setIsExporting(false);
                  
                  // Add to history
                  const newExport: ExportHistory = {
                    id: Date.now().toString(),
                    date: new Date().toISOString().split('T')[0],
                    type: selectedOptions.map(opt => opt.name).join(', '),
                    format: selectedFormats.map(fmt => fmt.name).join(', '),
                    size: `${getTotalSize().toFixed(1)} MB`,
                    status: 'completed'
                  };
                  
                  setExportHistory(prev => [newExport, ...prev]);
                  
                  Alert.alert(
                    'Export Complete',
                    'Your data has been exported successfully. You can find it in your downloads folder.',
                    [{ text: 'OK' }]
                  );
                  return 100;
                }
                return prev + 10;
              });
            }, 200);
          }
        }
      ]
    );
  };

  const renderExportOption = (option: ExportOption) => (
    <TouchableOpacity
      key={option.id}
      style={[styles.exportOptionCard, { backgroundColor: colors.surface }]}
      onPress={() => toggleExportOption(option.id)}
      activeOpacity={0.7}
    >
      <View style={styles.exportOptionHeader}>
        <View style={styles.exportOptionInfo}>
          <View style={[styles.exportOptionIcon, { backgroundColor: option.color + '20' }]}>
            <Ionicons name={option.icon as any} size={24} color={option.color} />
          </View>
          <View style={styles.exportOptionText}>
            <Text style={[styles.exportOptionName, { color: colors.text.primary }]}>
              {option.name}
            </Text>
            <Text style={[styles.exportOptionDescription, { color: colors.text.secondary }]}>
              {option.description}
            </Text>
            <Text style={[styles.exportOptionSize, { color: colors.text.secondary }]}>
              Size: {option.size}
            </Text>
          </View>
        </View>
        <Switch
          value={option.isSelected}
          onValueChange={() => toggleExportOption(option.id)}
          trackColor={{ false: colors.border, true: option.color + '40' }}
          thumbColor={option.isSelected ? option.color : '#FFFFFF'}
          ios_backgroundColor={colors.border}
        />
      </View>
      
      {option.isSelected && (
        <View style={styles.includesContainer}>
          <Text style={[styles.includesTitle, { color: colors.text.secondary }]}>
            Includes:
          </Text>
          <View style={styles.includesList}>
            {option.includes.map((item, index) => (
              <View key={index} style={styles.includesItem}>
                <Ionicons name="checkmark-circle" size={16} color={option.color} />
                <Text style={[styles.includesText, { color: colors.text.secondary }]}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderExportFormat = (format: ExportFormat) => (
    <TouchableOpacity
      key={format.id}
      style={[
        styles.formatCard, 
        { 
          backgroundColor: format.isSelected ? colors.primary + '20' : colors.surface,
          borderColor: format.isSelected ? colors.primary : colors.border
        }
      ]}
      onPress={() => toggleExportFormat(format.id)}
      activeOpacity={0.7}
    >
      <View style={styles.formatHeader}>
        <View style={styles.formatInfo}>
          <Ionicons 
            name={format.icon as any} 
            size={24} 
            color={format.isSelected ? colors.primary : colors.text.secondary} 
          />
          <View style={styles.formatText}>
            <Text style={[
              styles.formatName, 
              { color: format.isSelected ? colors.primary : colors.text.primary }
            ]}>
              {format.name}
            </Text>
            <Text style={[styles.formatDescription, { color: colors.text.secondary }]}>
              {format.description}
            </Text>
          </View>
        </View>
        {format.isSelected && (
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderExportHistory = (item: ExportHistory) => (
    <View key={item.id} style={[styles.historyCard, { backgroundColor: colors.surface }]}>
      <View style={styles.historyHeader}>
        <View style={styles.historyInfo}>
          <Text style={[styles.historyType, { color: colors.text.primary }]}>
            {item.type}
          </Text>
          <Text style={[styles.historyDate, { color: colors.text.secondary }]}>
            {item.date}
          </Text>
        </View>
        <View style={styles.historyDetails}>
          <Text style={[styles.historyFormat, { color: colors.text.secondary }]}>
            {item.format}
          </Text>
          <Text style={[styles.historySize, { color: colors.text.secondary }]}>
            {item.size}
          </Text>
        </View>
      </View>
      <View style={[
        styles.statusBadge,
        { 
          backgroundColor: 
            item.status === 'completed' ? colors.success + '20' :
            item.status === 'failed' ? colors.error + '20' :
            colors.warning + '20'
        }
      ]}>
        <Text style={[
          styles.statusText,
          { 
            color: 
              item.status === 'completed' ? colors.success :
              item.status === 'failed' ? colors.error :
              colors.warning
          }
        ]}>
          {item.status.replace('_', ' ').toUpperCase()}
        </Text>
      </View>
    </View>
  );

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
              Export Data
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              Download your information
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.historyButton}
            onPress={() => setShowHistory(!showHistory)}
          >
            <Ionicons name="time-outline" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {showHistory ? (
          // Export History View
          <View style={styles.historyContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Export History
            </Text>
            {exportHistory.map(renderExportHistory)}
          </View>
        ) : (
          // Export Options View
          <>
            {/* Data Selection */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                Select Data to Export
              </Text>
              <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
                Choose what information you want to include in your export
              </Text>
              
              <View style={styles.optionsContainer}>
                {exportOptions.map(renderExportOption)}
              </View>
            </View>

            {/* Export Format */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                Export Format
              </Text>
              <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
                Choose how you want your data formatted
              </Text>
              
              <View style={styles.formatsContainer}>
                {exportFormats.map(renderExportFormat)}
              </View>
            </View>

            {/* Export Summary */}
            <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.summaryTitle, { color: colors.text.primary }]}>
                Export Summary
              </Text>
              <View style={styles.summaryDetails}>
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>
                    Selected Data:
                  </Text>
                  <Text style={[styles.summaryValue, { color: colors.text.primary }]}>
                    {getSelectedOptions().length} types
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>
                    Format:
                  </Text>
                  <Text style={[styles.summaryValue, { color: colors.text.primary }]}>
                    {getSelectedFormats().map(f => f.name).join(', ')}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>
                    Total Size:
                  </Text>
                  <Text style={[styles.summaryValue, { color: colors.text.primary }]}>
                    {getTotalSize().toFixed(1)} MB
                  </Text>
                </View>
              </View>
            </View>

            {/* Export Progress */}
            {isExporting && (
              <View style={[styles.progressCard, { backgroundColor: colors.surface }]}>
                <View style={styles.progressHeader}>
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={[styles.progressText, { color: colors.text.primary }]}>
                    Exporting your data...
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${exportProgress}%`, backgroundColor: colors.primary }]} />
                </View>
                <Text style={[styles.progressPercentage, { color: colors.text.secondary }]}>
                  {exportProgress}%
                </Text>
              </View>
            )}

            {/* Export Button */}
            <TouchableOpacity
              style={[
                styles.exportButton,
                { 
                  backgroundColor: colors.primary,
                  opacity: isExporting ? 0.6 : 1
                }
              ]}
              onPress={handleExport}
              disabled={isExporting}
            >
              <Ionicons name="download-outline" size={24} color={colors.background.primary} />
              <Text style={[styles.exportButtonText, { color: colors.background.primary }]}>
                {isExporting ? 'Exporting...' : 'Export Data'}
              </Text>
            </TouchableOpacity>
          </>
        )}
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
  historyButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  exportOptionCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  exportOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exportOptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exportOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exportOptionText: {
    flex: 1,
  },
  exportOptionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  exportOptionDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  exportOptionSize: {
    fontSize: 12,
    fontWeight: '500',
  },
  includesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  includesTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  includesList: {
    gap: 4,
  },
  includesItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  includesText: {
    fontSize: 12,
    marginLeft: 6,
  },
  formatsContainer: {
    gap: 8,
  },
  formatCard: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  formatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  formatText: {
    marginLeft: 12,
    flex: 1,
  },
  formatName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  formatDescription: {
    fontSize: 12,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryDetails: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressPercentage: {
    fontSize: 12,
    textAlign: 'center',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  historyContainer: {
    gap: 12,
  },
  historyCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  historyInfo: {
    flex: 1,
  },
  historyType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
  },
  historyDetails: {
    alignItems: 'flex-end',
  },
  historyFormat: {
    fontSize: 12,
    marginBottom: 2,
  },
  historySize: {
    fontSize: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default DataExportScreen; 