import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Alert,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

// Mock blocked users data
const mockBlockedUsers = [
  {
    id: '1',
    name: 'John Doe',
    specialty: 'Plumber',
    blockedDate: '2024-01-15',
    reason: 'Spam messages',
    avatar: null
  },
  {
    id: '2',
    name: 'Jane Smith',
    specialty: 'Electrician',
    blockedDate: '2024-01-10',
    reason: 'Inappropriate behavior',
    avatar: null
  },
  {
    id: '3',
    name: 'Mike Johnson',
    specialty: 'Carpenter',
    blockedDate: '2024-01-05',
    reason: 'No-show for appointment',
    avatar: null
  }
];

const BlockedUsersScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const [blockedUsers, setBlockedUsers] = useState(mockBlockedUsers);

  const unblockUser = (userId: string, userName: string) => {
    Alert.alert(
      'Unblock User',
      `Are you sure you want to unblock ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Unblock', 
          onPress: () => {
            setBlockedUsers(prev => prev.filter(user => user.id !== userId));
            Alert.alert('Success', `${userName} has been unblocked.`);
          }
        }
      ]
    );
  };

  const renderBlockedUser = ({ item }: { item: typeof mockBlockedUsers[0] }) => (
    <View style={[styles.userCard, { backgroundColor: currentTheme.colors.surface, borderColor: currentTheme.colors.border }]}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: currentTheme.colors.surface }]}>
            <Ionicons name="person" size={24} color={currentTheme.colors.textSecondary} />
          </View>
          <View style={[styles.blockedIndicator, { backgroundColor: currentTheme.colors.error }]}>
            <Ionicons name="ban" size={12} color={currentTheme.colors.background} />
          </View>
        </View>
        
        <View style={styles.userDetails}>
          <Text style={[styles.userName, { color: currentTheme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.userSpecialty, { color: currentTheme.colors.primary }]}>{item.specialty}</Text>
          <Text style={[styles.blockReason, { color: currentTheme.colors.textSecondary }]}>Blocked: {item.reason}</Text>
          <Text style={[styles.blockDate, { color: currentTheme.colors.textSecondary }]}>Since {new Date(item.blockedDate).toLocaleDateString()}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.unblockButton, { backgroundColor: currentTheme.colors.success + '20', borderColor: currentTheme.colors.success }]}
        onPress={() => unblockUser(item.id, item.name)}
      >
        <Ionicons name="checkmark-circle-outline" size={20} color={currentTheme.colors.success} />
        <Text style={[styles.unblockText, { color: currentTheme.colors.success }]}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={currentTheme.colors.background} />
      
      {/* Header */}
      <LinearGradient
        colors={[currentTheme.colors.background, currentTheme.colors.surface]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={currentTheme.colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: currentTheme.colors.text }]}>Blocked Users</Text>
            <Text style={[styles.headerSubtitle, { color: currentTheme.colors.textSecondary }]}>{blockedUsers.length} blocked contacts</Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      {/* Blocked Users List */}
      <FlatList
        data={blockedUsers}
        keyExtractor={item => item.id}
        renderItem={renderBlockedUser}
        contentContainerStyle={styles.usersList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="shield-checkmark" size={64} color={currentTheme.colors.success} />
            <Text style={[styles.emptyTitle, { color: currentTheme.colors.text }]}>No Blocked Users</Text>
            <Text style={[styles.emptySubtitle, { color: currentTheme.colors.textSecondary }]}>You haven't blocked any users yet</Text>
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
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
    opacity: 0.7,
  },
  usersList: {
    padding: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockedIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userSpecialty: {
    fontSize: 14,
    marginBottom: 4,
  },
  blockReason: {
    fontSize: 12,
    marginBottom: 2,
  },
  blockDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  unblockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  unblockText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default BlockedUsersScreen; 