'use client';

import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { AppSettings, UserProfile, AtelierPreferences, NotificationSettings } from '../settings.types';
import { DEFAULT_SETTINGS, sanitizeSettings, validateProfile } from '../settings.logic';
import { useToast } from '../../../shared/components/Toast/ToastContext';

const SETTINGS_STORAGE_KEY = 'shopboard_settings_v1';

interface SettingsContextValue {
  settings: AppSettings;
  isLoaded: boolean;
  updateProfile: (profile: Partial<UserProfile>) => { success: boolean; errors?: Record<string, string> };
  updatePreferences: (preferences: Partial<AtelierPreferences>) => void;
  updateNotifications: (notifications: Partial<NotificationSettings>) => void;
  resetSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load from localStorage on client mount to prevent hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings(sanitizeSettings(parsed));
      }
    } catch {
      // Fallback to default
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever settings change after initial load
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore quota errors
    }
  }, [settings, isLoaded]);

  const updateProfile = useCallback(
    (profileUpdates: Partial<UserProfile>) => {
      const merged = { ...settings.profile, ...profileUpdates };
      const errors = validateProfile(merged);

      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }

      setSettings((prev) => ({
        ...prev,
        profile: merged,
      }));
      showToast('تم حفظ وتحديث بيانات الملف الشخصي بنجاح');
      return { success: true };
    },
    [settings.profile, showToast],
  );

  const updatePreferences = useCallback(
    (preferencesUpdates: Partial<AtelierPreferences>) => {
      setSettings((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          ...preferencesUpdates,
        },
      }));
      showToast('تم تحديث تفضيلات استوديو أكاري');
    },
    [showToast],
  );

  const updateNotifications = useCallback(
    (notificationsUpdates: Partial<NotificationSettings>) => {
      setSettings((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          ...notificationsUpdates,
        },
      }));
      showToast('تم تحديث إعدادات التنبيهات والإشعارات');
    },
    [showToast],
  );

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
    } catch {
      // ignore
    }
    showToast('تمت استعادة الإعدادات الافتراضية للمتجر');
  }, [showToast]);

  const contextValue = useMemo(
    () => ({
      settings,
      isLoaded,
      updateProfile,
      updatePreferences,
      updateNotifications,
      resetSettings,
    }),
    [settings, isLoaded, updateProfile, updatePreferences, updateNotifications, resetSettings],
  );

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

