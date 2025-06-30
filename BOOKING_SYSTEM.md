# Booking System with Real-Time Location Tracking

## Overview

The booking system provides comprehensive booking management with real-time location tracking for artisans. Users can view their bookings, track artisan locations in real-time, and manage booking statuses.

## Features

### 🗓️ Booking Management
- View all bookings with filtering by status
- Detailed booking information
- Booking status tracking (Pending, Confirmed, In Progress, Completed, Cancelled)
- Special requests and descriptions
- Price and duration information

### 📍 Real-Time Location Tracking
- Live artisan location updates
- Distance calculation between user and artisan
- Estimated arrival time (ETA)
- Interactive map with markers
- Directions integration

### 🎨 User Interface
- Beautiful gradient backgrounds
- Status-based color coding
- Responsive design
- Pull-to-refresh functionality
- Empty state handling

## Components

### Core Components

#### 1. BookingCard (`components/cards/BookingCard.tsx`)
- Displays individual booking information
- Shows real-time location data when available
- Status badges with color coding
- Artisan information with avatar

#### 2. LocationMap (`components/shared/LocationMap.tsx`)
- Interactive map showing artisan and user locations
- Real-time location updates
- Distance and ETA calculations
- Directions button

#### 3. BookingDetailScreen (`screens/shared/BookingDetailScreen.tsx`)
- Comprehensive booking details
- Real-time location tracking
- Action buttons (Cancel, Contact, Rate)
- Booking history and status updates

### State Management

#### BookingStore (`store/bookingStore.ts`)
- Centralized booking state management
- Real-time location tracking
- Booking CRUD operations
- Filtering and sorting

#### LocationService (`services/location.ts`)
- Location permission handling
- Real-time location tracking
- Distance calculations
- Address geocoding

## Data Types

### Booking Interface
```typescript
interface Booking {
  id: string;
  userId: string;
  artisanId: string;
  serviceId: string;
  serviceName: string;
  artisanName: string;
  artisanAvatar?: string;
  artisanLocation: Location;
  userLocation: Location;
  scheduledDate: Date;
  scheduledTime: string;
  duration: number;
  price: number;
  status: BookingStatus[];
  currentStatus: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  description?: string;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedArrival?: Date;
  actualStartTime?: Date;
  actualEndTime?: Date;
  rating?: number;
  review?: string;
}
```

### Location Interface
```typescript
interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}
```

### Real-Time Location Interface
```typescript
interface RealTimeLocation {
  artisanId: string;
  location: Location;
  lastUpdated: Date;
  isOnline: boolean;
  estimatedArrival?: number;
}
```

## Usage

### Basic Booking List
```typescript
import { useBookingStore } from '../store/bookingStore';
import BookingCard from '../components/cards/BookingCard';

const MyBookings = () => {
  const { bookings, getFilteredBookings } = useBookingStore();
  
  return (
    <FlatList
      data={getFilteredBookings()}
      renderItem={({ item }) => (
        <BookingCard
          booking={item}
          onPress={(booking) => navigation.navigate('BookingDetail', { booking })}
          showLocation={true}
        />
      )}
    />
  );
};
```

### Real-Time Location Tracking
```typescript
import { useBookingStore } from '../store/bookingStore';

const BookingDetail = ({ booking }) => {
  const { startLocationTracking, getRealTimeLocation } = useBookingStore();
  
  useEffect(() => {
    if (booking.currentStatus === 'confirmed' || booking.currentStatus === 'in_progress') {
      startLocationTracking(booking.artisanId);
    }
  }, [booking.artisanId, booking.currentStatus]);
  
  const realTimeLocation = getRealTimeLocation(booking.artisanId);
  
  return (
    <LocationMap
      artisanLocation={booking.artisanLocation}
      userLocation={booking.userLocation}
      realTimeLocation={realTimeLocation}
      showUserLocation={true}
      showDirections={true}
    />
  );
};
```

## Dependencies

### Required Packages
- `expo-location`: Location services and permissions
- `react-native-maps`: Interactive maps
- `zustand`: State management
- `expo-linear-gradient`: Beautiful gradients
- `@expo/vector-icons`: Icons

### Installation
```bash
npm install expo-location react-native-maps zustand expo-linear-gradient @expo/vector-icons
```

## Permissions

### Location Permissions
The app requires location permissions for:
- Getting user's current location
- Tracking artisan locations
- Calculating distances and ETAs

### Android Permissions
Add to `app.json`:
```json
{
  "expo": {
    "android": {
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION"
      ]
    }
  }
}
```

### iOS Permissions
Add to `app.json`:
```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "This app needs location access to track artisan locations and provide real-time updates."
      }
    }
  }
}
```

## Features in Detail

### 1. Real-Time Location Tracking
- Updates every 10 seconds when booking is active
- Calculates distance between user and artisan
- Provides estimated arrival time
- Shows live tracking status

### 2. Interactive Map
- Displays both user and artisan locations
- Real-time marker updates
- Distance and ETA overlay
- Directions integration

### 3. Booking Status Management
- Visual status indicators
- Status-based filtering
- Action buttons based on status
- Booking history tracking

### 4. User Experience
- Pull-to-refresh for updates
- Empty states with helpful messages
- Loading states and error handling
- Smooth animations and transitions

## Future Enhancements

### Planned Features
- Push notifications for location updates
- Route optimization
- Traffic integration
- Offline support
- Multi-language support
- Advanced filtering options

### Technical Improvements
- WebSocket integration for real-time updates
- Background location tracking
- Caching for offline access
- Performance optimizations
- Unit and integration tests

## Troubleshooting

### Common Issues

#### Location Not Updating
1. Check location permissions
2. Ensure GPS is enabled
3. Verify internet connection
4. Check if artisan is online

#### Map Not Loading
1. Verify Google Maps API key
2. Check network connectivity
3. Ensure location permissions granted

#### Performance Issues
1. Reduce location update frequency
2. Implement location caching
3. Optimize map rendering
4. Use background tasks for updates

## Support

For technical support or feature requests, please refer to the main project documentation or contact the development team. 