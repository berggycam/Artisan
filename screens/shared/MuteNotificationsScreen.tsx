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

const MuteNotificationsScreen: React.FC = ({ navigation }: any) => {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();
  
  const [globalMute, setGlobalMute] = useState(false);
  const [mutedConversations, setMutedConversations] = useState([
    { id: '1', name: 'Sarah Johnson', specialty: 'Hair Stylist', muted: true, until: 'Tomorrow' },
    { id: '2', name: 'Mike Davis', specialty: 'Phone Repair', muted: false, until: null },
    { id: '3', name: 'Emma Wilson', specialty: 'Seamstress', muted: true, until: 'Next Week' },
  ]);

  const toggleGlobalMute = () => {
    setGlobalMute(!globalMute);
    Alert.alert(
      globalMute ? 'Notifications Enabled' : 'Notifications Disabled',
      globalMute ? 'You will now receive all notifications.' : 'All notifications are now muted.'
    );
  };

  const toggleConversationMute = (id: string) => {
    setMutedConversations(prev =>
      prev.map(conv =>
        conv.id === id ? { ...conv, muted: !conv.muted } : conv
      )
    );
  };

  const unmuteAll = () => {
    Alert.alert(
      'Unmute All',
      'Are you sure you want to unmute all conversations?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unmute All',
          onPress: () => {
            setMutedConversations(prev =>
              prev.map(conv => ({ ...conv, muted: false }))
            );
            Alert.alert('Success', 'All conversations have been unmuted.');
          }
        }
      ]
    );
  };

  const renderConversationItem = (conversation: typeof mutedConversations[0]) => (
    <View key={conversation.id} style={[styles.conversationItem, { borderBottomColor: colors.border }]}>
      <View style={styles.conversationInfo}>
        <View style={[styles.avatarContainer, { 
          backgroundColor: colors.tanLight,
          borderColor: colors.border 
        }]}>
          <Ionicons name="person" size={24} color={colors.textSecondary} />
        </View>
        <View style={styles.conversationDetails}>
          <Text style={[styles.conversationName, { color: colors.text }]}>{conversation.name}</Text>
          <Text style={[styles.conversationSpecialty, { color: colors.textSecondary }]}>{conversation.specialty}</Text>
          {conversation.muted && conversation.until && (
            <Text style={[styles.muteUntil, { color: colors.bronze }]}>Muted until {conversation.until}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.conversationActions}>
        <Switch
          value={conversation.muted}
          onValueChange={() => toggleConversationMute(conversation.id)}
          trackColor={{ false: colors.border, true: colors.bronze + '40' }}
          thumbColor={conversation.muted ? colors.bronze : colors.textSecondary}
        />
      </View>
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
          
          <Text style={[styles.headerTitle, { color: colors.text }]}>Mute Notifications</Text>
          
          <TouchableOpacity 
            style={styles.unmuteAllButton}
            onPress={unmuteAll}
          >
            <Text style={[styles.unmuteAllText, { color: colors.bronze }]}>Unmute All</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Global Mute Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="notifications-off-outline" size={24} color={colors.bronze} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Global Settings</Text>
          </View>
          
          <View style={[styles.globalMuteCard, { 
            backgroundColor: colors.surface,
            borderColor: colors.border 
          }]}>
            <View style={styles.globalMuteInfo}>
              <Text style={[styles.globalMuteTitle, { color: colors.text }]}>Mute All Notifications</Text>
              <Text style={[styles.globalMuteDescription, { color: colors.textSecondary }]}>
                When enabled, you won't receive any push notifications from the app
              </Text>
            </View>
            <Switch
              value={globalMute}
              onValueChange={toggleGlobalMute}
              trackColor={{ false: colors.border, true: colors.bronze + '40' }}
              thumbColor={globalMute ? colors.bronze : colors.textSecondary}
            />
          </View>
        </View>

        {/* Individual Conversations Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles-outline" size={24} color={colors.bronze} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Individual Conversations</Text>
          </View>
          
          <View style={[styles.conversationsContainer, { 
            backgroundColor: colors.surface,
            borderColor: colors.border 
          }]}>
            {mutedConversations.map(renderConversationItem)}
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={[styles.infoCard, { 
            backgroundColor: colors.surface,
            borderColor: colors.border 
          }]}>
            <Ionicons name="information-circle-outline" size={24} color={colors.bronze} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>How Muting Works</Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                When you mute a conversation, you won't receive push notifications for new messages. 
                You can still view and send messages normally. Muted conversations will show a muted icon.
              </Text>
            </View>
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
  unmuteAllButton: {
    padding: 8,
  },
  unmuteAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  globalMuteCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  globalMuteInfo: {
    flex: 1,
    marginRight: 16,
  },
  globalMuteTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  globalMuteDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  conversationsContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  conversationInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
  },
  conversationDetails: {
    flex: 1,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  conversationSpecialty: {
    fontSize: 14,
    marginBottom: 2,
  },
  muteUntil: {
    fontSize: 12,
    fontWeight: '500',
  },
  conversationActions: {
    marginLeft: 12,
  },
  infoSection: {
    marginBottom: 32,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MuteNotificationsScreen; 