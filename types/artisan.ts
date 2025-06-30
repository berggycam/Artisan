// types/artisan.ts
// Placeholder for artisan type definitions 

import { Location } from './booking';

export interface ArtisanService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  isAvailable: boolean;
}

export interface ArtisanReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  bookingId: string;
}

export interface Artisan {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  bio: string;
  location: Location;
  currentLocation?: Location;
  isOnline: boolean;
  lastSeen: Date;
  services: ArtisanService[];
  rating: number;
  totalReviews: number;
  reviews: ArtisanReview[];
  experience: number; // years of experience
  certifications: string[];
  languages: string[];
  availability: {
    monday: { start: string; end: string; available: boolean };
    tuesday: { start: string; end: string; available: boolean };
    wednesday: { start: string; end: string; available: boolean };
    thursday: { start: string; end: string; available: boolean };
    friday: { start: string; end: string; available: boolean };
    saturday: { start: string; end: string; available: boolean };
    sunday: { start: string; end: string; available: boolean };
  };
  portfolio: {
    id: string;
    title: string;
    description: string;
    images: string[];
    category: string;
    date: Date;
  }[];
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArtisanFilters {
  serviceType?: string;
  location?: Location;
  radius?: number; // in kilometers
  rating?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: {
    day: string;
    time: string;
  };
  isOnline?: boolean;
  isVerified?: boolean;
} 