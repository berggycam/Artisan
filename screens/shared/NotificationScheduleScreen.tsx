import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  Switch,
  Dimensions,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

interface TimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface NotificationType {
  id: string;
  label: string;
  description: string;
  icon: string;
  isEnabled: boolean;
  priority: 'high' | 'medium' | 'low';
}

const NotificationScheduleScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();

  // Quiet Hours Settings
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietStartTime, setQuietStartTime] = useState('22:00');
  const [quietEndTime, setQuietEndTime] = useState('08:00');
  const [quietDays, setQuietDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });

  // Time Slots
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: 'morning', label: 'Morning', startTime: '08:00', endTime: '12:00', isActive: true },
    { id: 'afternoon', label: 'Afternoon', startTime: '12:00', endTime: '17:00', isActive: true },
    { id: 'evening', label: 'Evening', startTime: '17:00', endTime: '22:00', isActive: true },
    { id: 'night', label: 'Night', startTime: '22:00', endTime: '08:00', isActive: false },
  ]);

  // Notification Types
  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>([
    {
      id: 'booking',
      label: 'Booking Updates',
      description: 'New bookings, confirmations, and changes',
      icon: 'calendar-outline',
      isEnabled: true,
      priority: 'high',
    },
    {
      id: 'messages',
      label: 'Messages',
      description: 'Chat messages and conversations',
      icon: 'chatbubble-outline',
      isEnabled: true,
      priority: 'high',
    },
    {
      id: 'reminders',
      label: 'Reminders',
      description: 'Appointment reminders and notifications',
      icon: 'alarm-outline',
      isEnabled: true,
      priority: 'medium',
    },
    {
      id: 'promotions',
      label: 'Promotions',
      description: 'Special offers and discounts',
      icon: 'pricetag-outline',
      isEnabled: false,
      priority: 'low',
    },
    {
      id: 'updates',
      label: 'App Updates',
      description: 'New features and app improvements',
      icon: 'refresh-outline',
      isEnabled: true,
      priority: 'low',
    },
  ]);

  // Advanced Settings
  const [urgentNotifications, setUrgentNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [ledEnabled, setLedEnabled] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const handleSaveSettings = () => {
    Alert.alert(
      'Settings Saved',
      'Your notification schedule has been updated successfully.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const toggleDay = (day: string) => {
    setQuietDays(prev => ({
      ...prev,
      [day]: !prev[day as keyof typeof prev],
    }));
  };

  const toggleTimeSlot = (id: string) => {
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.id === id ? { ...slot, isActive: !slot.isActive } : slot
      )
    );
  };

  const toggleNotificationType = (id: string) => {
    setNotificationTypes(prev => 
      prev.map(type => 
        type.id === id ? { ...type, isEnabled: !type.isEnabled } : type
      )
    );
  };

  const renderTimePicker = (time: string, onTimeChange: (time: string) => void, label: string) => (
    <TouchableOpacity
      style={[styles.timePicker, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => {
        // In a real app, you would open a time picker here
        Alert.alert('Time Picker', `Select ${label} time`, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => {} }
        ]);
      }}
    >
      <Text style={[styles.timeText, { color: colors.text.primary }]}>{time}</Text>
      <Ionicons name="time-outline" size={20} color={colors.text.secondary} />
    </TouchableOpacity>
  );

  const renderDayToggle = (day: string, label: string) => (
    <TouchableOpacity
      key={day}
      style={[
        styles.dayToggle,
        { 
          backgroundColor: quietDays[day as keyof typeof quietDays] 
            ? colors.primary 
            : colors.surface,
          borderColor: colors.border
        }
      ]}
      onPress={() => toggleDay(day)}
    >
      <Text style={[
        styles.dayText,
        { 
          color: quietDays[day as keyof typeof quietDays] 
            ? colors.background.primary 
            : colors.text.primary 
        }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderTimeSlot = (slot: TimeSlot) => (
    <View key={slot.id} style={[styles.timeSlotCard, { backgroundColor: colors.surface }]}>
      <View style={styles.timeSlotHeader}>
        <View style={styles.timeSlotInfo}>
          <Text style={[styles.timeSlotLabel, { color: colors.text.primary }]}>
            {slot.label}
          </Text>
          <Text style={[styles.timeSlotTime, { color: colors.text.secondary }]}>
            {slot.startTime} - {slot.endTime}
          </Text>
        </View>
        <Switch
          value={slot.isActive}
          onValueChange={() => toggleTimeSlot(slot.id)}
          trackColor={{ false: colors.border, true: colors.primary + '40' }}
          thumbColor={slot.isActive ? colors.primary : '#FFFFFF'}
          ios_backgroundColor={colors.border}
        />
      </View>
    </View>
  );

  const renderNotificationType = (type: NotificationType) => (
    <View key={type.id} style={[styles.notificationTypeCard, { backgroundColor: colors.surface }]}>
      <View style={styles.notificationTypeHeader}>
        <View style={styles.notificationTypeInfo}>
          <View style={styles.notificationTypeIcon}>
            <Ionicons name={type.icon as any} size={24} color={colors.primary} />
          </View>
          <View style={styles.notificationTypeText}>
            <Text style={[styles.notificationTypeLabel, { color: colors.text.primary }]}>
              {type.label}
            </Text>
            <Text style={[styles.notificationTypeDescription, { color: colors.text.secondary }]}>
              {type.description}
            </Text>
          </View>
        </View>
        <Switch
          value={type.isEnabled}
          onValueChange={() => toggleNotificationType(type.id)}
          trackColor={{ false: colors.border, true: colors.primary + '40' }}
          thumbColor={type.isEnabled ? colors.primary : '#FFFFFF'}
          ios_backgroundColor={colors.border}
        />
      </View>
      {type.isEnabled && (
        <View style={styles.priorityIndicator}>
          <View style={[
            styles.priorityDot,
            { 
              backgroundColor: 
                type.priority === 'high' ? colors.error :
                type.priority === 'medium' ? colors.warning :
                colors.success
            }
          ]} />
          <Text style={[styles.priorityText, { color: colors.text.secondary }]}>
            {type.priority.charAt(0).toUpperCase() + type.priority.slice(1)} Priority
          </Text>
        </View>
      )}
    </View>
  );

  const renderSettingItem = (
    title: string,
    subtitle: string,
    value: boolean,
    onToggle: (value: boolean) => void
  ) => (
    <View style={[styles.settingItem, { backgroundColor: colors.surface }]}>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color: colors.text.primary }]}>
          {title}
        </Text>
        <Text style={[styles.settingSubtitle, { color: colors.text.secondary }]}>
          {subtitle}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primary + '40' }}
        thumbColor={value ? colors.primary : '#FFFFFF'}
        ios_backgroundColor={colors.border}
      />
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
              Notification Schedule
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              Manage your notification preferences
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSaveSettings}
          >
            <Text style={[styles.saveButtonText, { color: colors.background.primary }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Quiet Hours Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Quiet Hours
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Set times when you don't want to be disturbed
          </Text>
          
          <View style={[styles.quietHoursCard, { backgroundColor: colors.surface }]}>
            <View style={styles.quietHoursHeader}>
              <View style={styles.quietHoursInfo}>
                <Ionicons name="moon-outline" size={24} color={colors.primary} />
                <View style={styles.quietHoursText}>
                  <Text style={[styles.quietHoursLabel, { color: colors.text.primary }]}>
                    Enable Quiet Hours
                  </Text>
                  <Text style={[styles.quietHoursDescription, { color: colors.text.secondary }]}>
                    Mute non-urgent notifications during specified times
                  </Text>
                </View>
              </View>
              <Switch
                value={quietHoursEnabled}
                onValueChange={setQuietHoursEnabled}
                trackColor={{ false: colors.border, true: colors.primary + '40' }}
                thumbColor={quietHoursEnabled ? colors.primary : '#FFFFFF'}
                ios_backgroundColor={colors.border}
              />
            </View>
            
            {quietHoursEnabled && (
              <View style={styles.quietHoursContent}>
                <View style={styles.timePickerRow}>
                  <View style={styles.timePickerContainer}>
                    <Text style={[styles.timePickerLabel, { color: colors.text.secondary }]}>
                      Start Time
                    </Text>
                    {renderTimePicker(quietStartTime, setQuietStartTime, 'start')}
                  </View>
                  <View style={styles.timePickerContainer}>
                    <Text style={[styles.timePickerLabel, { color: colors.text.secondary }]}>
                      End Time
                    </Text>
                    {renderTimePicker(quietEndTime, setQuietEndTime, 'end')}
                  </View>
                </View>
                
                <Text style={[styles.daysLabel, { color: colors.text.secondary }]}>
                  Active Days
                </Text>
                <View style={styles.daysContainer}>
                  {renderDayToggle('monday', 'M')}
                  {renderDayToggle('tuesday', 'T')}
                  {renderDayToggle('wednesday', 'W')}
                  {renderDayToggle('thursday', 'T')}
                  {renderDayToggle('friday', 'F')}
                  {renderDayToggle('saturday', 'S')}
                  {renderDayToggle('sunday', 'S')}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Time Slots Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Time Slots
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Configure notification preferences for different times of day
          </Text>
          
          <View style={styles.timeSlotsContainer}>
            {timeSlots.map(renderTimeSlot)}
          </View>
        </View>

        {/* Notification Types Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Notification Types
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Choose which types of notifications you want to receive
          </Text>
          
          <View style={styles.notificationTypesContainer}>
            {notificationTypes.map(renderNotificationType)}
          </View>
        </View>

        {/* Advanced Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Advanced Settings
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text.secondary }]}>
            Fine-tune your notification experience
          </Text>
          
          <View style={styles.advancedSettingsContainer}>
            {renderSettingItem(
              'Urgent Notifications',
              'Allow urgent notifications during quiet hours',
              urgentNotifications,
              setUrgentNotifications
            )}
            {renderSettingItem(
              'Sound',
              'Play sound for notifications',
              soundEnabled,
              setSoundEnabled
            )}
            {renderSettingItem(
              'Vibration',
              'Vibrate for notifications',
              vibrationEnabled,
              setVibrationEnabled
            )}
            {renderSettingItem(
              'LED Light',
              'Flash LED for notifications',
              ledEnabled,
              setLedEnabled
            )}
            {renderSettingItem(
              'Show Preview',
              'Show message content in notifications',
              showPreview,
              setShowPreview
            )}
          </View>
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
  quietHoursCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quietHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quietHoursInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quietHoursText: {
    marginLeft: 12,
    flex: 1,
  },
  quietHoursLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  quietHoursDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  quietHoursContent: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 16,
  },
  timePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timePickerContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  timePickerLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  daysLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeSlotsContainer: {
    gap: 12,
  },
  timeSlotCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  timeSlotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeSlotInfo: {
    flex: 1,
  },
  timeSlotLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  timeSlotTime: {
    fontSize: 14,
  },
  notificationTypesContainer: {
    gap: 12,
  },
  notificationTypeCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  notificationTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  notificationTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationTypeText: {
    flex: 1,
  },
  notificationTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  notificationTypeDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  priorityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  advancedSettingsContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
});

export default NotificationScheduleScreen; 