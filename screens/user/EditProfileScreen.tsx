import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useThemedColors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const screenScale = width / 375;
const responsiveSize = (size: number) => Math.max(size * screenScale, size * 0.85);

const mockUser = {
  name: 'Kwame Mensah',
  email: 'kwame.mensah@email.com',
  phone: '+233 24 123 4567',
  location: 'Accra, Ghana',
  bio: 'Passionate about quality services and connecting with skilled artisans.',
};

const EditProfileScreen: React.FC = ({ navigation }: any) => {
  const { currentTheme } = useTheme();
  const colors = useThemedColors();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [phone, setPhone] = useState(mockUser.phone);
  const [location, setLocation] = useState(mockUser.location);
  const [bio, setBio] = useState(mockUser.bio);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('Profile Updated', 'Your profile has been updated successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }, 1200);
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() }
      ]
    );
  };

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
            onPress={handleCancel}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
              Edit Profile
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              Update your personal information
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={[styles.saveButtonText, { color: colors.primary }]}>
              {isSaving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={styles.content}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Picture Section */}
          <View style={styles.section}>
            <View style={[styles.profilePictureCard, { backgroundColor: colors.surface }]}>
              <View style={[styles.profilePicture, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="person" size={48} color={colors.primary} />
              </View>
              <TouchableOpacity style={[styles.changePhotoButton, { backgroundColor: colors.primary }]}>
                <Ionicons name="camera-outline" size={20} color={colors.background.primary} />
                <Text style={[styles.changePhotoText, { color: colors.background.primary }]}>
                  Change Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Personal Information
            </Text>
            
            <View style={styles.formContainer}>
              {/* Name Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text.primary }]}>
                  Full Name *
                </Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.background.secondary, borderColor: colors.border }]}>
                  <Ionicons name="person-outline" size={20} color={colors.text.secondary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text.primary }]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.text.secondary}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              {/* Email Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text.primary }]}>
                  Email Address *
                </Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.background.secondary, borderColor: colors.border }]}>
                  <Ionicons name="mail-outline" size={20} color={colors.text.secondary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text.primary }]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email address"
                    placeholderTextColor={colors.text.secondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Phone Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text.primary }]}>
                  Phone Number
                </Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.background.secondary, borderColor: colors.border }]}>
                  <Ionicons name="call-outline" size={20} color={colors.text.secondary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text.primary }]}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter your phone number"
                    placeholderTextColor={colors.text.secondary}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Location Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text.primary }]}>
                  Location
                </Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.background.secondary, borderColor: colors.border }]}>
                  <Ionicons name="location-outline" size={20} color={colors.text.secondary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text.primary }]}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter your location"
                    placeholderTextColor={colors.text.secondary}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              {/* Bio Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text.primary }]}>
                  Bio
                </Text>
                <View style={[styles.textAreaContainer, { backgroundColor: colors.background.secondary, borderColor: colors.border }]}>
                  <TextInput
                    style={[styles.textArea, { color: colors.text.primary }]}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Tell us about yourself..."
                    placeholderTextColor={colors.text.secondary}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    maxLength={200}
                  />
                  <Text style={[styles.charCount, { color: colors.text.secondary }]}>
                    {bio.length}/200
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.section}>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.cancelButton, { backgroundColor: colors.background.secondary, borderColor: colors.border }]}
                onPress={handleCancel}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text.secondary }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.saveChangesButton, 
                  { 
                    backgroundColor: isSaving ? colors.border : colors.primary,
                    opacity: isSaving ? 0.7 : 1
                  }
                ]}
                onPress={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Ionicons name="hourglass-outline" size={20} color={colors.background.primary} />
                ) : (
                  <Ionicons name="checkmark-outline" size={20} color={colors.background.primary} />
                )}
                <Text style={[styles.saveChangesButtonText, { color: colors.background.primary }]}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16,
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
    marginBottom: 16,
  },
  profilePictureCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
  },
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '500',
  },
  textAreaContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  textArea: {
    fontSize: 16,
    fontWeight: '500',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveChangesButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  saveChangesButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EditProfileScreen; 