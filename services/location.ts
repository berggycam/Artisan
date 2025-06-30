import * as Location from 'expo-location';
import { Location as LocationType, RealTimeLocation } from '../types/booking';

class LocationService {
  private locationSubscription: Location.LocationSubscription | null = null;
  private realTimeLocations: Map<string, RealTimeLocation> = new Map();

  // Request location permissions
  async requestPermissions(): Promise<boolean> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  }

  // Get current location
  async getCurrentLocation(): Promise<LocationType | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        console.log('Location permission denied');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  // Start real-time location tracking
  async startLocationTracking(
    artisanId: string,
    onLocationUpdate: (location: RealTimeLocation) => void
  ): Promise<void> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        console.log('Location permission denied');
        return;
      }

      // Stop any existing subscription
      if (this.locationSubscription) {
        this.locationSubscription.remove();
      }

      this.locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000, // Update every 10 seconds
          distanceInterval: 50, // Update every 50 meters
        },
        (location) => {
          const realTimeLocation: RealTimeLocation = {
            artisanId,
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            lastUpdated: new Date(),
            isOnline: true,
          };

          this.realTimeLocations.set(artisanId, realTimeLocation);
          onLocationUpdate(realTimeLocation);
        }
      );
    } catch (error) {
      console.error('Error starting location tracking:', error);
    }
  }

  // Stop location tracking
  stopLocationTracking(): void {
    if (this.locationSubscription) {
      this.locationSubscription.remove();
      this.locationSubscription = null;
    }
  }

  // Get real-time location for an artisan
  getRealTimeLocation(artisanId: string): RealTimeLocation | null {
    return this.realTimeLocations.get(artisanId) || null;
  }

  // Calculate distance between two locations
  calculateDistance(
    location1: LocationType,
    location2: LocationType
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(location2.latitude - location1.latitude);
    const dLon = this.deg2rad(location2.longitude - location1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(location1.latitude)) *
        Math.cos(this.deg2rad(location2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  // Calculate estimated arrival time
  calculateEstimatedArrival(
    artisanLocation: LocationType,
    userLocation: LocationType,
    averageSpeed: number = 30 // km/h
  ): number {
    const distance = this.calculateDistance(artisanLocation, userLocation);
    const timeInHours = distance / averageSpeed;
    return Math.round(timeInHours * 60); // Return in minutes
  }

  // Convert degrees to radians
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Get address from coordinates
  async getAddressFromCoordinates(
    latitude: number,
    longitude: number
  ): Promise<string> {
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        return `${address.street || ''} ${address.city || ''} ${address.region || ''} ${address.country || ''}`.trim();
      }
      return 'Unknown location';
    } catch (error) {
      console.error('Error getting address:', error);
      return 'Unknown location';
    }
  }
}

export default new LocationService(); 