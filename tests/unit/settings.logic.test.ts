import { describe, it, expect } from 'vitest';
import {
  DEFAULT_SETTINGS,
  validateProfile,
  formatAddressSummary,
  sanitizeSettings,
} from '../../src/modules/settings/settings.logic';

describe('settings.logic', () => {
  it('validates a complete valid profile without errors', () => {
    const errors = validateProfile({
      name: 'عبدالله السعد',
      email: 'abdullah@example.com',
      phone: '0551234567',
      city: 'الرياض',
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('detects invalid email and short name in profile', () => {
    const errors = validateProfile({
      name: 'ع',
      email: 'invalid-email',
      phone: '0501234567',
      city: 'جدة',
    });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeUndefined();
  });

  it('formats address summary correctly', () => {
    const summary = formatAddressSummary({
      name: 'سارة',
      email: 'sara@example.com',
      phone: '0501234567',
      city: 'الدمام',
      district: 'الشاطئ',
      streetAddress: 'شارع الخليج',
      postalCode: '32412',
    });
    expect(summary).toBe('شارع الخليج، الشاطئ، الدمام');
  });

  it('sanitizes unknown settings safely back to default values', () => {
    const sanitized = sanitizeSettings(null);
    expect(sanitized).toEqual(DEFAULT_SETTINGS);

    const partial = sanitizeSettings({
      preferences: { soundEffects: false },
    });
    expect(partial.preferences.soundEffects).toBe(false);
    expect(partial.profile.name).toBe(DEFAULT_SETTINGS.profile.name);
  });
});
