import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');

interface ActivityDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      activity: {
        type: string;
        artisan: string;
        service: string;
        status: string;
        time: string;
        // Additional fields that might be passed
        price?: string;
        location?: string;
        description?: string;
        rating?: number;
        review?: string;
        images?: string[];
        contactInfo?: {
          phone?: string;
          email?: string;
        };
      };
    };
  };
}

const ActivityDetailsScreen: React.FC<ActivityDetailsScreenProps> = ({ navigation, route }) => {
  const { activity } = route.params;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return COLORS.success;
      case 'in progress':
      case 'ongoing':
        return COLORS.warning;
      case 'cancelled':
        return COLORS.error;
      case 'pending':
        return COLORS.text.secondary;
      default:
        return COLORS.text.secondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'checkmark-circle';
      case 'in progress':
      case 'ongoing':
        return 'time';
      case 'cancelled':
        return 'close-circle';
      case 'pending':
        return 'hourglass-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const renderTimelineItem = (title: string, time: string, description: string, isActive: boolean = false) => (
    <View style={styles.timelineItem}>
      <View style={[styles.timelineDot, isActive && styles.activeTimelineDot]}>
        {isActive && <Ionicons name="checkmark" size={12} color={COLORS.text.white} />}
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineTitle}>{title}</Text>
        <Text style={styles.timelineTime}>{time}</Text>
        <Text style={styles.timelineDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      {/* Header */}
      <LinearGradient
        colors={[COLORS.bronze, COLORS.brownDark]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text.white} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Activity Details</Text>
            <Text style={styles.headerSubtitle}>{activity.type}</Text>
          </View>
          
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color={COLORS.text.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusInfo}>
              <Ionicons 
                name={getStatusIcon(activity.status) as any} 
                size={24} 
                color={getStatusColor(activity.status)} 
              />
              <View style={styles.statusTextContainer}>
                <Text style={styles.statusText}>{activity.status}</Text>
                <Text style={styles.statusTime}>{activity.time}</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(activity.status) + '20' }]}>
              <Text style={[styles.statusBadgeText, { color: getStatusColor(activity.status) }]}>
                {activity.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Artisan Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-circle-outline" size={20} color={COLORS.bronze} />
            <Text style={styles.cardTitle}>Artisan Information</Text>
          </View>
          
          <View style={styles.artisanInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color={COLORS.text.secondary} />
              </View>
            </View>
            
            <View style={styles.artisanDetails}>
              <Text style={styles.artisanName}>{activity.artisan}</Text>
              <Text style={styles.artisanService}>{activity.service}</Text>
              {activity.location && (
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color={COLORS.text.secondary} />
                  <Text style={styles.locationText}>{activity.location}</Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => navigation.navigate('ChatDetail', { 
                conversation: {
                  id: Date.now().toString(),
                  artisanName: activity.artisan,
                  artisanSpecialty: activity.service,
                  lastMessage: '',
                  timestamp: 'Now',
                  unreadCount: 0,
                  avatar: null,
                  online: true,
                  lastMessageType: 'text'
                }
              })}
            >
              <Ionicons name="chatbubble-outline" size={16} color={COLORS.bronze} />
              <Text style={styles.contactButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="construct-outline" size={20} color={COLORS.bronze} />
            <Text style={styles.cardTitle}>Service Details</Text>
          </View>
          
          <View style={styles.serviceDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Service Type:</Text>
              <Text style={styles.detailValue}>{activity.service}</Text>
            </View>
            
            {activity.price && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Price:</Text>
                <Text style={styles.detailValue}>{activity.price}</Text>
              </View>
            )}
            
            {activity.description && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Description:</Text>
                <Text style={styles.detailValue}>{activity.description}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Timeline Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="time-outline" size={20} color={COLORS.bronze} />
            <Text style={styles.cardTitle}>Activity Timeline</Text>
          </View>
          
          <View style={styles.timeline}>
            {renderTimelineItem(
              'Booking Confirmed',
              '2 hours ago',
              'Your booking has been confirmed by the artisan',
              true
            )}
            {renderTimelineItem(
              'Artisan En Route',
              '1 hour ago',
              'The artisan is on their way to your location',
              activity.status === 'completed' || activity.status === 'in progress'
            )}
            {renderTimelineItem(
              'Service Started',
              '30 minutes ago',
              'The artisan has started working on your service',
              activity.status === 'completed'
            )}
            {renderTimelineItem(
              'Service Completed',
              'Just now',
              'The service has been completed successfully',
              activity.status === 'completed'
            )}
          </View>
        </View>

        {/* Review Section (if completed) */}
        {activity.status === 'completed' && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="star-outline" size={20} color={COLORS.bronze} />
              <Text style={styles.cardTitle}>Rate Your Experience</Text>
            </View>
            
            <View style={styles.reviewSection}>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} style={styles.starButton}>
                    <Ionicons 
                      name={star <= (activity.rating || 0) ? "star" : "star-outline"} 
                      size={24} 
                      color={COLORS.warning} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
              
              <TouchableOpacity style={styles.reviewButton}>
                <Text style={styles.reviewButtonText}>Write a Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {activity.status === 'completed' && (
            <TouchableOpacity style={styles.primaryButton}>
              <Ionicons name="calendar-outline" size={16} color={COLORS.text.white} />
              <Text style={styles.primaryButtonText}>Book Again</Text>
            </TouchableOpacity>
          )}
          
          {activity.status === 'in progress' && (
            <TouchableOpacity style={styles.primaryButton}>
              <Ionicons name="call-outline" size={16} color={COLORS.text.white} />
              <Text style={styles.primaryButtonText}>Call Artisan</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="document-text-outline" size={16} color={COLORS.bronze} />
            <Text style={styles.secondaryButtonText}>Download Receipt</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.white,
    opacity: 0.9,
  },
  shareButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  statusTime: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginLeft: 8,
  },
  artisanInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artisanDetails: {
    flex: 1,
  },
  artisanName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  artisanService: {
    fontSize: 14,
    color: COLORS.bronze,
    fontWeight: '500',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.background.tertiary,
    borderWidth: 1,
    borderColor: COLORS.bronze,
    gap: 6,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.bronze,
  },
  serviceDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.secondary,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    flex: 2,
    textAlign: 'right',
  },
  timeline: {
    gap: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.background.tertiary,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  activeTimelineDot: {
    backgroundColor: COLORS.bronze,
    borderColor: COLORS.bronze,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  timelineTime: {
    fontSize: 12,
    color: COLORS.bronze,
    fontWeight: '500',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 16,
  },
  reviewSection: {
    alignItems: 'center',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  reviewButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.background.tertiary,
    borderWidth: 1,
    borderColor: COLORS.bronze,
  },
  reviewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.bronze,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.bronze,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.white,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.background.tertiary,
    borderWidth: 1,
    borderColor: COLORS.bronze,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.bronze,
  },
});

export default ActivityDetailsScreen; 