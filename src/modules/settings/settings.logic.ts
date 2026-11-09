import type { AppSettings, UserProfile, AtelierPreferences, NotificationSettings } from './settings.types';

export const DEFAULT_SETTINGS: AppSettings = {
  profile: {
    name: 'حرفي أكاري',
    email: 'craftsman@shopboard.sa',
    phone: '0501234567',
    city: 'الرياض',
    district: 'حي النخيل',
    streetAddress: 'طريق الأمير تركي بن عبدالعزيز الأول',
    postalCode: '12381',
  },
  preferences: {
    ambiance: 'washi-ivory',
    soundEffects: true,
    highQuality3D: true,
    currency: 'SAR',
    autoRotateStudio: true,
  },
  notifications: {
    orderUpdatesEmail: true,
    orderUpdatesSMS: true,
    promotionsAndDiscounts: false,
    atelierNewsletter: true,
  },
};

export function validateProfile(profile: Partial<UserProfile>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!profile.name || profile.name.trim().length < 3) {
    errors.name = 'الاسم يجب أن يحتوي على 3 أحرف على الأقل';
  }

  if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    errors.email = 'يرجى إدخال بريد إلكتروني صالح';
  }

  if (!profile.phone || !/^(05|\+?9665)[0-9]{8}$/.test(profile.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'يرجى إدخال رقم جوال سعودي صالح (مثال: 0501234567)';
  }

  if (!profile.city || profile.city.trim().length < 2) {
    errors.city = 'يرجى تحديد المدينة';
  }

  return errors;
}

export function formatAddressSummary(profile: UserProfile): string {
  const parts = [profile.streetAddress, profile.district, profile.city].filter(Boolean);
  return parts.length > 0 ? parts.join('، ') : 'لم يتم تحديد عنوان التوصيل بعد';
}

export function sanitizeSettings(loaded: unknown): AppSettings {
  if (!loaded || typeof loaded !== 'object') {
    return { ...DEFAULT_SETTINGS };
  }

  const obj = loaded as Record<string, unknown>;

  const profile: UserProfile = {
    ...DEFAULT_SETTINGS.profile,
    ...(typeof obj.profile === 'object' && obj.profile !== null ? (obj.profile as Partial<UserProfile>) : {}),
  };

  const preferences: AtelierPreferences = {
    ...DEFAULT_SETTINGS.preferences,
    ...(typeof obj.preferences === 'object' && obj.preferences !== null
      ? (obj.preferences as Partial<AtelierPreferences>)
      : {}),
  };

  const notifications: NotificationSettings = {
    ...DEFAULT_SETTINGS.notifications,
    ...(typeof obj.notifications === 'object' && obj.notifications !== null
      ? (obj.notifications as Partial<NotificationSettings>)
      : {}),
  };

  return { profile, preferences, notifications };
}

