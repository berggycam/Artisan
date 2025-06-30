import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

const TimePickerScreen: React.FC = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { type, currentTime } = route.params || { type: 'start', currentTime: '22:00' };
  const [selectedHour, setSelectedHour] = useState(parseInt(currentTime.split(':')[0]));
  const [selectedMinute, setSelectedMinute] = useState(parseInt(currentTime.split(':')[1]));

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const renderTimeOption = (value: number, type: 'hour' | 'minute') => {
    const isSelected = type === 'hour' ? selectedHour === value : selectedMinute === value;
    const displayValue = type === 'hour' ? value : value.toString().padStart(2, '0');
    
    return (
      <TouchableOpacity
        key={value}
        style={[
          styles.timeOption,
          { backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface },
          { borderColor: isSelected ? theme.colors.primary : theme.colors.border }
        ]}
        onPress={() => {
          if (type === 'hour') {
            setSelectedHour(value);
          } else {
            setSelectedMinute(value);
          }
        }}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.timeOptionText,
          { color: isSelected ? theme.colors.background : theme.colors.textSecondary }
        ]}>
          {displayValue}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              {type === 'start' ? 'Start Time' : 'End Time'}
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>Set quiet hours {type} time</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              const newTime = formatTime(selectedHour, selectedMinute);
              navigation.navigate('ChatSettings', { 
                updatedTime: { type, time: newTime }
              });
            }}
          >
            <Text style={[styles.saveButtonText, { color: theme.colors.background }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Time Display */}
      <View style={styles.timeDisplay}>
        <Text style={[styles.timeDisplayLabel, { color: theme.colors.text }]}>Selected Time</Text>
        <Text style={[styles.timeDisplayValue, { color: theme.colors.textSecondary }]}>
          {formatTime(selectedHour, selectedMinute)}
        </Text>
      </View>

      {/* Time Picker */}
      <View style={styles.pickerContainer}>
        <View style={styles.pickerSection}>
          <Text style={[styles.pickerLabel, { color: theme.colors.text }]}>Hour</Text>
          <ScrollView 
            style={styles.pickerScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.pickerContent}
          >
            {hours.map(hour => renderTimeOption(hour, 'hour'))}
          </ScrollView>
        </View>
        
        <View style={styles.pickerSeparator}>
          <Text style={[styles.separatorText, { color: theme.colors.text }]}>:</Text>
        </View>
        
        <View style={styles.pickerSection}>
          <Text style={[styles.pickerLabel, { color: theme.colors.text }]}>Minute</Text>
          <ScrollView 
            style={styles.pickerScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.pickerContent}
          >
            {minutes.map(minute => renderTimeOption(minute, 'minute'))}
          </ScrollView>
        </View>
      </View>

      {/* Quick Presets */}
      <View style={styles.presetsSection}>
        <Text style={[styles.presetsTitle, { color: theme.colors.text }]}>Quick Presets</Text>
        <View style={styles.presetsContainer}>
          {[
            { label: '9:00 PM', hour: 21, minute: 0 },
            { label: '10:00 PM', hour: 22, minute: 0 },
            { label: '11:00 PM', hour: 23, minute: 0 },
            { label: '12:00 AM', hour: 0, minute: 0 },
          ].map(preset => (
            <TouchableOpacity
              key={preset.label}
              style={[styles.presetButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
              onPress={() => {
                setSelectedHour(preset.hour);
                setSelectedMinute(preset.minute);
              }}
            >
              <Text style={[styles.presetText, { color: theme.colors.textSecondary }]}>{preset.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <View style={[styles.infoCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Ionicons name="moon-outline" size={24} color={theme.colors.primary} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: theme.colors.text }]}>Quiet Hours</Text>
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              During quiet hours, you won't receive push notifications for new messages. 
              This helps you maintain a peaceful sleep schedule.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.white,
  },
  timeDisplay: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: COLORS.background.secondary,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeDisplayLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  timeDisplayValue: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.primary,
  },
  pickerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  pickerSection: {
    flex: 1,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  pickerScroll: {
    height: 200,
    width: '100%',
  },
  pickerContent: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  timeOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: COLORS.background.tertiary,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 60,
    alignItems: 'center',
  },
  timeOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  timeOptionTextSelected: {
    color: COLORS.text.white,
  },
  pickerSeparator: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  separatorText: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  presetsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  presetsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  presetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetButton: {
    backgroundColor: COLORS.background.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  presetText: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 16,
  },
});

export default TimePickerScreen; 