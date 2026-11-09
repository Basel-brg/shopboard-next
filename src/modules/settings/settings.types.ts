export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  streetAddress: string;
  postalCode: string;
}

export type AtelierAmbiance = 'washi-ivory' | 'charcoal-ink' | 'bamboo-warm';

export interface AtelierPreferences {
  ambiance: AtelierAmbiance;
  soundEffects: boolean;
  highQuality3D: boolean;
  currency: 'SAR' | 'USD';
  autoRotateStudio: boolean;
}

export interface NotificationSettings {
  orderUpdatesEmail: boolean;
  orderUpdatesSMS: boolean;
  promotionsAndDiscounts: boolean;
  atelierNewsletter: boolean;
}

export interface AppSettings {
  profile: UserProfile;
  preferences: AtelierPreferences;
  notifications: NotificationSettings;
}

