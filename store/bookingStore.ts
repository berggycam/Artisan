import { create } from 'zustand';
import { Booking, RealTimeLocation, BookingFilters } from '../types/booking';
import { Artisan } from '../types/artisan';
import locationService from '../services/location';

interface BookingState {
  bookings: Booking[];
  activeBookings: Booking[];
  realTimeLocations: Map<string, RealTimeLocation>;
  selectedBooking: Booking | null;
  filters: BookingFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (bookingId: string, updates: Partial<Booking>) => void;
  removeBooking: (bookingId: string) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  setFilters: (filters: BookingFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Real-time location actions
  startLocationTracking: (artisanId: string) => void;
  stopLocationTracking: () => void;
  updateRealTimeLocation: (artisanId: string, location: RealTimeLocation) => void;
  getRealTimeLocation: (artisanId: string) => RealTimeLocation | null;
  
  // Computed values
  getFilteredBookings: () => Booking[];
  getBookingById: (bookingId: string) => Booking | undefined;
  getActiveBookings: () => Booking[];
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  activeBookings: [],
  realTimeLocations: new Map(),
  selectedBooking: null,
  filters: {},
  isLoading: false,
  error: null,

  setBookings: (bookings) => set({ bookings }),
  
  addBooking: (booking) => set((state) => ({
    bookings: [...state.bookings, booking],
    activeBookings: booking.currentStatus !== 'completed' && booking.currentStatus !== 'cancelled' 
      ? [...state.activeBookings, booking]
      : state.activeBookings
  })),
  
  updateBooking: (bookingId, updates) => set((state) => ({
    bookings: state.bookings.map(booking =>
      booking.id === bookingId ? { ...booking, ...updates } : booking
    ),
    activeBookings: state.activeBookings.map(booking =>
      booking.id === bookingId ? { ...booking, ...updates } : booking
    ),
    selectedBooking: state.selectedBooking?.id === bookingId 
      ? { ...state.selectedBooking, ...updates }
      : state.selectedBooking
  })),
  
  removeBooking: (bookingId) => set((state) => ({
    bookings: state.bookings.filter(booking => booking.id !== bookingId),
    activeBookings: state.activeBookings.filter(booking => booking.id !== bookingId),
    selectedBooking: state.selectedBooking?.id === bookingId ? null : state.selectedBooking
  })),
  
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),
  
  setFilters: (filters) => set({ filters }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),

  startLocationTracking: async (artisanId) => {
    const { updateRealTimeLocation } = get();
    
    await locationService.startLocationTracking(artisanId, (location) => {
      updateRealTimeLocation(artisanId, location);
    });
  },

  stopLocationTracking: () => {
    locationService.stopLocationTracking();
  },

  updateRealTimeLocation: (artisanId, location) => set((state) => {
    const newRealTimeLocations = new Map(state.realTimeLocations);
    newRealTimeLocations.set(artisanId, location);
    return { realTimeLocations: newRealTimeLocations };
  }),

  getRealTimeLocation: (artisanId) => {
    const { realTimeLocations } = get();
    return realTimeLocations.get(artisanId) || null;
  },

  getFilteredBookings: () => {
    const { bookings, filters } = get();
    let filtered = [...bookings];

    if (filters.status) {
      filtered = filtered.filter(booking => booking.currentStatus === filters.status);
    }

    if (filters.dateRange) {
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.scheduledDate);
        return bookingDate >= filters.dateRange!.start && bookingDate <= filters.dateRange!.end;
      });
    }

    if (filters.serviceType) {
      filtered = filtered.filter(booking => booking.serviceName.toLowerCase().includes(filters.serviceType!.toLowerCase()));
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getBookingById: (bookingId) => {
    const { bookings } = get();
    return bookings.find(booking => booking.id === bookingId);
  },

  getActiveBookings: () => {
    const { bookings } = get();
    return bookings.filter(booking => 
      booking.currentStatus !== 'completed' && booking.currentStatus !== 'cancelled'
    );
  },
})); 