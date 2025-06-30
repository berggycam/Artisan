import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { COLORS } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationMapProps {
  // Single location to display
  location?: Location;
  
  // Multiple locations to display (for search results, etc.)
  locations?: Location[];
  
  // User's current location
  userLocation?: Location;
  
  // Map configuration
  showUserLocation?: boolean;
  showLocationButton?: boolean;
  showDirectionsButton?: boolean;
  showLocationDetails?: boolean;
  
  // Map style and behavior
  mapType?: 'standard' | 'satellite' | 'hybrid';
  zoomLevel?: number;
  scrollEnabled?: boolean;
  zoomEnabled?: boolean;
  
  // Callbacks
  onLocationPress?: (location: Location) => void;
  onMapPress?: (coordinate: { latitude: number; longitude: number }) => void;
  onRegionChange?: (region: Region) => void;
  
  // UI customization
  height?: number | string;
  width?: number | string;
  borderRadius?: number;
  
  // Loading and error states
  loading?: boolean;
  error?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  location,
  locations = [],
  userLocation,
  showUserLocation = true,
  showLocationButton = true,
  showDirectionsButton = true,
  showLocationDetails = true,
  mapType = 'standard',
  zoomLevel = 15,
  scrollEnabled = true,
  zoomEnabled = true,
  onLocationPress,
  onMapPress,
  onRegionChange,
  height = 300,
  width = '100%',
  borderRadius = 12,
  loading = false,
  error,
}) => {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [region, setRegion] = useState<Region | null>(null);

  // Get user's current location
  useEffect(() => {
    if (showUserLocation) {
      getCurrentLocation();
    }
  }, [showUserLocation]);

  // Set initial region when location data changes
  useEffect(() => {
    if (location) {
      setInitialRegion([location]);
    } else if (locations.length > 0) {
      setInitialRegion(locations);
    } else if (userLocation) {
      setInitialRegion([userLocation]);
    } else if (currentLocation) {
      setInitialRegion([currentLocation]);
    }
  }, [location, locations, userLocation, currentLocation]);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Permission to access location was denied. Please enable location services in your device settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      setPermissionGranted(true);
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const newLocation: Location = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setCurrentLocation(newLocation);
    } catch (error) {
      console.error('Error getting current location:', error);
      Alert.alert('Error', 'Unable to get your current location.');
    }
  };

  const setInitialRegion = (locationList: Location[]) => {
    if (locationList.length === 0) return;

    if (locationList.length === 1) {
      // Single location - center on it
      const loc = locationList[0];
      const newRegion: Region = {
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.01 * (20 / zoomLevel),
        longitudeDelta: 0.01 * (20 / zoomLevel),
      };
      setRegion(newRegion);
    } else {
      // Multiple locations - fit all markers
      const latitudes = locationList.map(loc => loc.latitude);
      const longitudes = locationList.map(loc => loc.longitude);
      
      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);
      
      const newRegion: Region = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: (maxLat - minLat) * 1.5,
        longitudeDelta: (maxLng - minLng) * 1.5,
      };
      setRegion(newRegion);
    }
  };

  const handleLocationPress = (location: Location) => {
    if (onLocationPress) {
      onLocationPress(location);
    }
  };

  const handleMapPress = (event: any) => {
    if (onMapPress) {
      onMapPress(event.nativeEvent.coordinate);
    }
  };

  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
    if (onRegionChange) {
      onRegionChange(newRegion);
    }
  };

  const centerOnUserLocation = () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const openDirections = () => {
    if (!location && locations.length === 0) {
      Alert.alert('No Location', 'No location available for directions.');
      return;
    }

    const targetLocation = location || locations[0];
    const url = Platform.select({
      ios: `maps://app?daddr=${targetLocation.latitude},${targetLocation.longitude}`,
      android: `geo:${targetLocation.latitude},${targetLocation.longitude}?q=${targetLocation.latitude},${targetLocation.longitude}`,
    });

    if (url) {
      // In a real app, you would use Linking.openURL(url)
      Alert.alert(
        'Open Directions',
        `Would you like to open directions to this location?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open', onPress: () => console.log('Opening directions:', url) }
        ]
      );
    }
  };

  const renderMarker = (loc: Location, index: number) => (
    <Marker
      key={`${loc.latitude}-${loc.longitude}-${index}`}
      coordinate={{
        latitude: loc.latitude,
        longitude: loc.longitude,
      }}
      title={loc.address || `Location ${index + 1}`}
      description={loc.address || 'Tap for details'}
      onPress={() => handleLocationPress(loc)}
    >
      <View style={styles.markerContainer}>
        <View style={styles.marker}>
          <Ionicons name="location" size={20} color={COLORS.white} />
        </View>
      </View>
    </Marker>
  );

  const renderUserLocationMarker = () => {
    if (!currentLocation || !showUserLocation) return null;

    return (
      <Marker
        coordinate={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }}
        title="Your Location"
        description="You are here"
        pinColor={COLORS.primary}
      >
        <View style={styles.userMarkerContainer}>
          <View style={styles.userMarker}>
            <Ionicons name="person" size={16} color={COLORS.white} />
          </View>
        </View>
      </Marker>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { height, width, borderRadius }]}>
        <View style={styles.loadingContainer}>
          <Ionicons name="map-outline" size={48} color={COLORS.text.secondary} />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { height, width, borderRadius }]}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { height, width, borderRadius }]}>
      {region && (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          mapType={mapType}
          scrollEnabled={scrollEnabled}
          zoomEnabled={zoomEnabled}
          showsUserLocation={showUserLocation && permissionGranted}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          onPress={handleMapPress}
          onRegionChangeComplete={handleRegionChange}
        >
          {/* Render user location marker */}
          {renderUserLocationMarker()}
          
          {/* Render single location */}
          {location && renderMarker(location, 0)}
          
          {/* Render multiple locations */}
          {locations.map((loc, index) => renderMarker(loc, index))}
        </MapView>
      )}

      {/* Location details overlay */}
      {showLocationDetails && location && (
        <View style={styles.locationDetails}>
          <View style={styles.locationInfo}>
            <Ionicons name="location" size={16} color={COLORS.primary} />
            <Text style={styles.locationText} numberOfLines={2}>
              {location.address || `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`}
            </Text>
          </View>
        </View>
      )}

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        {showLocationButton && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={centerOnUserLocation}
            disabled={!currentLocation}
          >
            <Ionicons 
              name="locate" 
              size={20} 
              color={currentLocation ? COLORS.primary : COLORS.text.tertiary} 
            />
          </TouchableOpacity>
        )}
        
        {showDirectionsButton && (location || locations.length > 0) && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={openDirections}
          >
            <Ionicons name="navigate" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  userMarkerContainer: {
    alignItems: 'center',
  },
  userMarker: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  locationDetails: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text.primary,
    flex: 1,
  },
  actionButtons: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    gap: 8,
  },
  actionButton: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default LocationMap; 