// types/booking.ts
// Placeholder for booking type definitions 

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface BookingStatus {
  id: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  timestamp: Date;
  message?: string;
}

export interface Booking {
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
  duration: number; // in minutes
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
  paymentStatus?: 'pending' | 'paid' | 'refunded' | 'failed';
  paymentMethod?: 'cash' | 'card' | 'mobile_money' | 'bank_transfer';
  paymentTiming?: 'before_delivery' | 'after_delivery';
  paymentId?: string;
}

export interface BookingFilters {
  status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  dateRange?: {
    start: Date;
    end: Date;
  };
  serviceType?: string;
}

export interface RealTimeLocation {
  artisanId: string;
  location: Location;
  lastUpdated: Date;
  isOnline: boolean;
  estimatedArrival?: number; // in minutes
} 