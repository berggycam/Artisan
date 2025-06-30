import { Booking } from '../types/booking';

export type RootStackParamList = {
  // Main tabs
  MainTabs: { initialRoute?: string } | undefined;
  
  // Auth screens
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  
  // Main screens
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  ArtisanProfile: { artisanId: string };
  
  // Booking screens
  Booking: { bookingId: string };
  BookingDetail: { booking: Booking };
  CreateBooking: { bookingId: string };
  
  // Payment screens
  PaymentConfirmation: { paymentData: PaymentData };
  PaymentInput: { paymentData: PaymentData; bookingData?: BookingData };
  BookingSuccess: { paymentData: PaymentData };
  PaymentDemo: undefined;
  
  // Service screens
  ServiceRequest: { service: { name: string; icon: string; urgent: boolean } };
  
  // Chat screens
  Messages: undefined;
  ChatDetail: { chatId: string };
  NewChat: undefined;
  ChatSettings: undefined;
  
  // Artisan screens
  ArtisanDashboard: undefined;
  ManagePortfolio: undefined;
  JobRequests: undefined;
  ReviewClients: undefined;
  
  // User screens
  Favorites: undefined;
  EditProfile: undefined;
  AccountSettings: undefined;
  Help: undefined;
  FAQs: undefined;
  ContactSupport: undefined;
  ReportBug: undefined;
  Emergency: undefined;
  ActivityDetails: undefined;
  CategoryServices: undefined;
  AllCategories: undefined;
  AllArtisans: undefined;
  ActivityHistory: undefined;
  
  // Shared screens
  Notifications: undefined;
  Settings: undefined;
  ThemeCustomization: undefined;
  NotificationSchedule: undefined;
  StorageManagement: undefined;
  DataExport: undefined;
  ContactSupport: undefined;
  ReportBug: undefined;
  RateApp: undefined;
  AppVersion: undefined;
  PrivacySecurity: undefined;
  LanguageSettings: undefined;
  AutoTranslate: undefined;
  MessageTranslation: undefined;
  NativeNames: undefined;
  DownloadedLanguages: undefined;
  BlockedUsers: undefined;
  FontSize: undefined;
  BubbleStyle: undefined;
  ChatBackground: undefined;
  TimePicker: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  SearchMessages: undefined;
  ExportChat: undefined;
  ReportUser: undefined;
  MuteNotifications: undefined;
};

export interface PaymentData {
  timing: 'before_delivery' | 'after_delivery';
  method: 'cash' | 'card' | 'mobile_money' | 'bank_transfer';
  amount: number;
  currency: string;
}

export interface BookingData {
  artisanId?: string;
  serviceId?: string;
  serviceName?: string;
  artisanName?: string;
  scheduledDate?: Date;
  scheduledTime?: string;
  description?: string;
  specialRequests?: string;
  price?: number;
} 