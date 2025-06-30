import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LocationMap from '../../components/shared/LocationMap';
import { COLORS } from '../../constants/colors';

interface LocationMapDemoScreenProps {
  navigation: any;
}

const LocationMapDemoScreen: React.FC<LocationMapDemoScreenProps> = ({ navigation }) => {
  const [selectedDemo, setSelectedDemo] = useState('single');

  // Sample locations
  const singleLocation = {
    latitude: 40.7589,
    longitude: -73.9851,
    address: 'Times Square, New York, NY',
  };

  const multipleLocations = [
    {
      latitude: 40.7589,
      longitude: -73.9851,
      address: 'Times Square, New York, NY',
    },
    {
      latitude: 40.7505,
      longitude: -73.9934,
      address: 'Madison Square Garden, New York, NY',
    },
    {
      latitude: 40.7484,
      longitude: -73.9857,
      address: 'Empire State Building, New York, NY',
    },
  ];

  const userLocation = {
    latitude: 40.7128,
    longitude: -74.0060,
    address: 'Your Current Location',
  };

  const demos = [
    {
      id: 'single',
      title: 'Single Location',
      description: 'Display a single location with details',
      icon: 'location',
    },
    {
      id: 'multiple',
      title: 'Multiple Locations',
      description: 'Show multiple locations with custom markers',
      icon: 'map',
    },
    {
      id: 'user',
      title: 'User Location',
      description: 'Show user location with location button',
      icon: 'person',
    },
    {
      id: 'interactive',
      title: 'Interactive Map',
      description: 'Map with tap interactions and callbacks',
      icon: 'hand-left',
    },
  ];

  const renderDemo = () => {
    switch (selectedDemo) {
      case 'single':
        return (
          <LocationMap
            location={singleLocation}
            height={300}
            showLocationDetails={true}
            showDirectionsButton={true}
            onLocationPress={(location) => {
              console.log('Location pressed:', location);
            }}
          />
        );
      
      case 'multiple':
        return (
          <LocationMap
            locations={multipleLocations}
            height={300}
            showLocationDetails={false}
            showDirectionsButton={true}
            onLocationPress={(location) => {
              console.log('Location pressed:', location);
            }}
          />
        );
      
      case 'user':
        return (
          <LocationMap
            userLocation={userLocation}
            height={300}
            showUserLocation={true}
            showLocationButton={true}
            showDirectionsButton={false}
          />
        );
      
      case 'interactive':
        return (
          <LocationMap
            location={singleLocation}
            height={300}
            showLocationDetails={true}
            showDirectionsButton={true}
            onLocationPress={(location) => {
              console.log('Location pressed:', location);
            }}
            onMapPress={(coordinate) => {
              console.log('Map pressed at:', coordinate);
            }}
            onRegionChange={(region) => {
              console.log('Region changed:', region);
            }}
          />
        );
      
      default:
        return null;
    }
  };

  const renderDemoButton = (demo: { id: string | number | bigint | ((prevState: string) => string) | null | undefined; icon: any; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
    const isSelected = selectedDemo === demo.id;
    
    return (
      <TouchableOpacity
        key={String(demo.id)}
        style={[styles.demoButton, isSelected && styles.demoButtonSelected]}
        onPress={() => setSelectedDemo(String(demo.id))}
      >
        <View style={styles.demoButtonContent}>
          <View style={[styles.demoIcon, isSelected && styles.demoIconSelected]}>
            <Ionicons 
              name={demo.icon as any} 
              size={20} 
              color={isSelected ? COLORS.text.white : COLORS.primary} 
            />
          </View>
          <View style={styles.demoText}>
            <Text style={[styles.demoTitle, isSelected && styles.demoTitleSelected]}>
              {demo.title}
            </Text>
            <Text style={[styles.demoDescription, isSelected && styles.demoDescriptionSelected]}>
              {demo.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Location Map Demo</Text>
          <Text style={styles.headerSubtitle}>
            Explore different map configurations
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Demo Selection */}
        <View style={styles.demoSection}>
          <Text style={styles.sectionTitle}>Choose Demo</Text>
          <View style={styles.demoButtons}>
            {demos.map(renderDemoButton)}
          </View>
        </View>

        {/* Map Display */}
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>Map Preview</Text>
          <View style={styles.mapContainer}>
            {renderDemo()}
          </View>
        </View>

        {/* Usage Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Usage Instructions</Text>
          <View style={styles.instructionCard}>
            <Text style={styles.instructionText}>
              • <Text style={styles.instructionBold}>Single Location:</Text> Shows one location with details overlay
            </Text>
            <Text style={styles.instructionText}>
              • <Text style={styles.instructionBold}>Multiple Locations:</Text> Displays multiple markers for search results
            </Text>
            <Text style={styles.instructionText}>
              • <Text style={styles.instructionBold}>User Location:</Text> Shows current location with location button
            </Text>
            <Text style={styles.instructionText}>
              • <Text style={styles.instructionBold}>Interactive:</Text> Map with tap callbacks and region changes
            </Text>
          </View>
        </View>

        {/* Props Documentation */}
        <View style={styles.propsSection}>
          <Text style={styles.sectionTitle}>Key Props</Text>
          <View style={styles.propsCard}>
            <Text style={styles.propItem}>
              <Text style={styles.propName}>location:</Text> Single location to display
            </Text>
            <Text style={styles.propItem}>
              <Text style={styles.propName}>locations:</Text> Array of multiple locations
            </Text>
            <Text style={styles.propItem}>
              <Text style={styles.propName}>userLocation:</Text> User's current location
            </Text>
            <Text style={styles.propItem}>
              <Text style={styles.propName}>showUserLocation:</Text> Show user location marker
            </Text>
            <Text style={styles.propItem}>
              <Text style={styles.propName}>showLocationButton:</Text> Show locate button
            </Text>
            <Text style={styles.propItem}>
              <Text style={styles.propName}>showDirectionsButton:</Text> Show directions button
            </Text>
            <Text style={styles.propItem}>
              <Text style={styles.propName}>onLocationPress:</Text> Callback when location is pressed
            </Text>
            <Text style={styles.propItem}>
              <Text style={styles.propName}>onMapPress:</Text> Callback when map is tapped
            </Text>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  scrollContainer: {
    flex: 1,
  },
  demoSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  demoButtons: {
    gap: 12,
  },
  demoButton: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  demoButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  demoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  demoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  demoIconSelected: {
    backgroundColor: COLORS.primary,
  },
  demoText: {
    flex: 1,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  demoTitleSelected: {
    color: COLORS.text.white,
  },
  demoDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  demoDescriptionSelected: {
    color: COLORS.text.white,
    opacity: 0.8,
  },
  mapSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.background.secondary,
  },
  instructionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  instructionCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  instructionText: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 8,
    lineHeight: 20,
  },
  instructionBold: {
    fontWeight: '600',
  },
  propsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  propsCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  propItem: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 8,
    lineHeight: 20,
  },
  propName: {
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default LocationMapDemoScreen; 