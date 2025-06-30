import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Switch,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

const ExportChatScreen: React.FC = ({ navigation, route }: any) => {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();
  
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'txt' | 'json'>('pdf');
  const [includeMedia, setIncludeMedia] = useState(false);
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [includeUserInfo, setIncludeUserInfo] = useState(true);
  const [dateRange, setDateRange] = useState<'all' | 'last30' | 'last7' | 'custom'>('all');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    {
      key: 'pdf',
      label: 'PDF Document',
      description: 'Professional format with formatting preserved',
      icon: 'document-text-outline',
      color: colors.error
    },
    {
      key: 'txt',
      label: 'Text File',
      description: 'Simple text format, smaller file size',
      icon: 'document-outline',
      color: colors.bronze
    },
    {
      key: 'json',
      label: 'JSON Data',
      description: 'Structured data format for developers',
      icon: 'code-outline',
      color: colors.warning
    }
  ];

  const dateRangeOptions = [
    { key: 'all', label: 'All Messages' },
    { key: 'last30', label: 'Last 30 Days' },
    { key: 'last7', label: 'Last 7 Days' },
    { key: 'custom', label: 'Custom Range' }
  ];

  const exportOptions = [
    {
      key: 'includeMedia',
      label: 'Include Media Files',
      description: 'Export images, videos, and documents',
      value: includeMedia,
      onValueChange: setIncludeMedia
    },
    {
      key: 'includeTimestamps',
      label: 'Include Timestamps',
      description: 'Show message dates and times',
      value: includeTimestamps,
      onValueChange: setIncludeTimestamps
    },
    {
      key: 'includeUserInfo',
      label: 'Include User Information',
      description: 'Add user profile details',
      value: includeUserInfo,
      onValueChange: setIncludeUserInfo
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      Alert.alert(
        'Export Complete',
        `Your chat has been exported as ${selectedFormat.toUpperCase()} and saved to your device.`,
        [
          {
            text: 'View File',
            onPress: () => {
              // Navigate to file viewer or share
              Alert.alert('File Viewer', 'File viewer would open here');
            }
          },
          {
            text: 'Share',
            onPress: () => {
              Alert.alert('Share', 'Share functionality would open here');
            }
          },
          { text: 'OK' }
        ]
      );
    }, 2000);
  };

  const renderFormatOption = (option: typeof formatOptions[0]) => (
    <TouchableOpacity
      key={option.key}
      style={[
        styles.formatOption,
        { backgroundColor: colors.surface },
        selectedFormat === option.key && [
          styles.selectedFormatOption,
          { 
            borderColor: colors.bronze,
            backgroundColor: colors.bronze + '10'
          }
        ]
      ]}
      onPress={() => setSelectedFormat(option.key as any)}
    >
      <View style={styles.formatHeader}>
        <View style={[styles.formatIcon, { backgroundColor: option.color + '20' }]}>
          <Ionicons name={option.icon as any} size={24} color={option.color} />
        </View>
        <View style={styles.formatInfo}>
          <Text style={[styles.formatLabel, { color: colors.text }]}>{option.label}</Text>
          <Text style={[styles.formatDescription, { color: colors.textSecondary }]}>{option.description}</Text>
        </View>
        {selectedFormat === option.key && (
          <Ionicons name="checkmark-circle" size={24} color={colors.bronze} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderDateRangeOption = (option: typeof dateRangeOptions[0]) => (
    <TouchableOpacity
      key={option.key}
      style={[
        styles.dateRangeOption,
        { 
          backgroundColor: colors.surface,
          borderColor: colors.border 
        },
        dateRange === option.key && [
          styles.selectedDateRangeOption,
          { 
            backgroundColor: colors.bronze,
            borderColor: colors.bronze 
          }
        ]
      ]}
      onPress={() => setDateRange(option.key as any)}
    >
      <Text style={[
        styles.dateRangeText,
        { color: colors.textSecondary },
        dateRange === option.key && [
          styles.selectedDateRangeText,
          { color: colors.background }
        ]
      ]}>
        {option.label}
      </Text>
      {dateRange === option.key && (
        <Ionicons name="checkmark" size={16} color={colors.background} />
      )}
    </TouchableOpacity>
  );

  const renderExportOption = (option: typeof exportOptions[0]) => (
    <View key={option.key} style={styles.exportOption}>
      <View style={styles.exportOptionInfo}>
        <Text style={[styles.exportOptionLabel, { color: colors.text }]}>{option.label}</Text>
        <Text style={[styles.exportOptionDescription, { color: colors.textSecondary }]}>{option.description}</Text>
      </View>
      <Switch
        value={option.value}
        onValueChange={option.onValueChange}
        trackColor={{ false: colors.border, true: colors.bronze + '40' }}
        thumbColor={option.value ? colors.bronze : colors.textSecondary}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { color: colors.text }]}>Export Chat</Text>
          
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Format Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Export Format</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Choose how you want to export your chat</Text>
          
          <View style={styles.formatOptions}>
            {formatOptions.map(renderFormatOption)}
          </View>
        </View>

        {/* Date Range */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Date Range</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Select which messages to include</Text>
          
          <View style={styles.dateRangeOptions}>
            {dateRangeOptions.map(renderDateRangeOption)}
          </View>
        </View>

        {/* Export Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Export Options</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Customize what gets included</Text>
          
          <View style={styles.exportOptions}>
            {exportOptions.map(renderExportOption)}
          </View>
        </View>

        {/* File Size Estimate */}
        <View style={styles.section}>
          <View style={[styles.fileSizeCard, { backgroundColor: colors.surface }]}>
            <View style={styles.fileSizeInfo}>
              <Ionicons name="information-circle-outline" size={20} color={colors.bronze} />
              <Text style={[styles.fileSizeTitle, { color: colors.text }]}>Estimated File Size</Text>
            </View>
            <Text style={[styles.fileSizeText, { color: colors.bronze }]}>~2.4 MB</Text>
          </View>
        </View>

        {/* Export Button */}
        <View style={styles.exportButtonContainer}>
          <TouchableOpacity
            style={[
              styles.exportButton,
              { backgroundColor: colors.bronze },
              isExporting && [
                styles.exportButtonDisabled,
                { backgroundColor: colors.textSecondary }
              ]
            ]}
            onPress={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Ionicons name="hourglass-outline" size={20} color={colors.background} />
                <Text style={[styles.exportButtonText, { color: colors.background }]}>Exporting...</Text>
              </>
            ) : (
              <>
                <Ionicons name="download-outline" size={20} color={colors.background} />
                <Text style={[styles.exportButtonText, { color: colors.background }]}>Export Chat</Text>
              </>
            )}
          </TouchableOpacity>
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
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
    marginBottom: 16,
  },
  formatOptions: {
    gap: 12,
  },
  formatOption: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedFormatOption: {
  },
  formatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formatIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  formatInfo: {
    flex: 1,
  },
  formatLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  formatDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  dateRangeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dateRangeOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectedDateRangeOption: {
  },
  dateRangeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedDateRangeText: {
  },
  exportOptions: {
    gap: 16,
  },
  exportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  exportOptionInfo: {
    flex: 1,
    marginRight: 16,
  },
  exportOptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exportOptionDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  fileSizeCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileSizeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fileSizeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  fileSizeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  exportButtonContainer: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  exportButton: {
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  exportButtonDisabled: {
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExportChatScreen; 