'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSettings } from '../context/useSettings';
import { useAuth } from '../../auth/context/useAuth';
import { IconCheck, IconSettings } from '../../../shared/components/Icons/Icons';
import type { AtelierAmbiance } from '../settings.types';

export const SettingsContainer: React.FC = () => {
  const { settings, isLoaded, updateProfile, updatePreferences, updateNotifications, resetSettings } =
    useSettings();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'atelier' | 'notifications' | 'system'>('profile');

  // Local form state for Profile
  const [profileForm, setProfileForm] = useState(settings.profile);
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Synchronize when settings load
  React.useEffect(() => {
    if (isLoaded) {
      setProfileForm(settings.profile);
    }
  }, [isLoaded, settings.profile]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    const res = updateProfile(profileForm);
    if (!res.success && res.errors) {
      setProfileErrors(res.errors);
    } else {
      setProfileErrors({});
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  if (!isLoaded) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse" aria-busy="true">
        <div className="h-8 bg-black/10 rounded-md w-48 mb-6" />
        <div className="h-64 bg-black/5 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] shadow-xs">
            <IconSettings size={20} />
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
            إعدادات الحساب والأتيليه
          </h1>
        </div>
        <p className="text-sm text-[var(--muted-umeboshi)] font-[family-name:var(--font-ibm-plex)]">
          إدارة الملف الشخصي، عنوان التوصيل الافتراضي، تفضيلات الاستوديو ثلاثي الأبعاد، والتنبيهات.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--bamboo-border)] pb-3 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] shadow-xs'
              : 'text-[var(--charcoal-ink)]/70 hover:bg-black/5'
          }`}
        >
          الملف الشخصي والعنوان
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('atelier')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'atelier'
              ? 'bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] shadow-xs'
              : 'text-[var(--charcoal-ink)]/70 hover:bg-black/5'
          }`}
        >
          تفضيلات استوديو أكاري 3D
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] shadow-xs'
              : 'text-[var(--charcoal-ink)]/70 hover:bg-black/5'
          }`}
        >
          الإشعارات والتنبيهات
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'system'
              ? 'bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] shadow-xs'
              : 'text-[var(--charcoal-ink)]/70 hover:bg-black/5'
          }`}
        >
          إدارة الحساب والنظام
        </button>
      </div>

      {/* Tab 1: Profile & Delivery Address */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--washi-cream)] border border-[var(--bamboo-border)] shadow-xs space-y-5">
            <h2 className="text-lg font-bold text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
              بيانات المستلم والتواصل
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="settings-name" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                  الاسم الكامل:
                </label>
                <input
                  type="text"
                  id="settings-name"
                  value={profileForm.name}
                  onChange={(e) => {
                    setProfileForm((p) => ({ ...p, name: e.target.value }));
                    if (profileErrors.name) setProfileErrors((p) => ({ ...p, name: '' }));
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                />
                {profileErrors.name && (
                  <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{profileErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="settings-email" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                  البريد الإلكتروني:
                </label>
                <input
                  type="email"
                  id="settings-email"
                  dir="ltr"
                  value={profileForm.email}
                  onChange={(e) => {
                    setProfileForm((p) => ({ ...p, email: e.target.value }));
                    if (profileErrors.email) setProfileErrors((p) => ({ ...p, email: '' }));
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                />
                {profileErrors.email && (
                  <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{profileErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="settings-phone" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                  رقم الجوال:
                </label>
                <input
                  type="tel"
                  id="settings-phone"
                  dir="ltr"
                  placeholder="0501234567"
                  value={profileForm.phone}
                  onChange={(e) => {
                    setProfileForm((p) => ({ ...p, phone: e.target.value }));
                    if (profileErrors.phone) setProfileErrors((p) => ({ ...p, phone: '' }));
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                />
                {profileErrors.phone && (
                  <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{profileErrors.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--washi-cream)] border border-[var(--bamboo-border)] shadow-xs space-y-5">
            <h2 className="text-lg font-bold text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
              عنوان التوصيل الافتراضي في المملكة
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="settings-city" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                  المدينة:
                </label>
                <input
                  type="text"
                  id="settings-city"
                  value={profileForm.city}
                  onChange={(e) => {
                    setProfileForm((p) => ({ ...p, city: e.target.value }));
                    if (profileErrors.city) setProfileErrors((p) => ({ ...p, city: '' }));
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                />
                {profileErrors.city && (
                  <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{profileErrors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="settings-district" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                  الحي:
                </label>
                <input
                  type="text"
                  id="settings-district"
                  value={profileForm.district}
                  onChange={(e) => setProfileForm((p) => ({ ...p, district: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="settings-street" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                  الشارع والعمارة / الرمز البريدي:
                </label>
                <input
                  type="text"
                  id="settings-street"
                  value={profileForm.streetAddress}
                  onChange={(e) => setProfileForm((p) => ({ ...p, streetAddress: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                  placeholder="مثال: طريق الملك فهد، مبنى 14"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] font-semibold text-sm hover:bg-[var(--charcoal-deep)] transition-all shadow-xs cursor-pointer"
            >
              <IconCheck size={18} />
              <span>حفظ تعديلات الملف الشخصي</span>
            </button>

            {saveSuccess && (
              <span className="text-xs text-[var(--bamboo-green)] font-semibold animate-fade-in">
                ✓ تم حفظ التغييرات بنجاح
              </span>
            )}
          </div>
        </form>
      )}

      {/* Tab 2: Atelier 3D Preferences */}
      {activeTab === 'atelier' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--washi-cream)] border border-[var(--bamboo-border)] shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)] mb-1">
                طابع وإضاءة الاستوديو (Atelier Ambiance)
              </h2>
              <p className="text-xs text-[var(--muted-umeboshi)]">
                اختر الجو المعماري واللوني المفضل لديك داخل الاستوديو ثلاثي الأبعاد.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'washi-ivory' as AtelierAmbiance,
                  title: 'ورق الواشي العاجي (Washi)',
                  desc: 'إضاءة طبيعية دافئة هادئة',
                  color: 'bg-[#f2eada] border-[#ccb693]',
                },
                {
                  id: 'charcoal-ink' as AtelierAmbiance,
                  title: 'حبر الشاركول الليلي (Ink)',
                  desc: 'طابع معماري داكن وتركيز عالٍ',
                  color: 'bg-[#252522] text-white border-[#444]',
                },
                {
                  id: 'bamboo-warm' as AtelierAmbiance,
                  title: 'خشب البامبو الدافئ (Bamboo)',
                  desc: 'درجات الخشب الطبيعي الذهبي',
                  color: 'bg-[#e5d8be] border-[#a88a5e]',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => updatePreferences({ ambiance: opt.id })}
                  className={`p-4 rounded-xl border text-right transition-all cursor-pointer ${opt.color} ${
                    settings.preferences.ambiance === opt.id
                      ? 'ring-2 ring-[var(--charcoal-ink)] font-bold shadow-md scale-[1.02]'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="text-sm font-semibold">{opt.title}</div>
                  <div className="text-xs opacity-75 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="border-t border-[var(--bamboo-border)]/50 pt-5 space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="block text-sm font-semibold text-[var(--charcoal-ink)]">
                    المؤثرات الصوتية للأتيليه
                  </span>
                  <span className="block text-xs text-[var(--muted-umeboshi)]">
                    تشغيل نقرات المفاتيح وتفاعل الأدوات ثلاثية الأبعاد.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.preferences.soundEffects}
                  onChange={(e) => updatePreferences({ soundEffects: e.target.checked })}
                  className="h-5 w-5 rounded border-[var(--bamboo-border)] text-[var(--charcoal-ink)] focus:ring-[var(--charcoal-ink)] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="block text-sm font-semibold text-[var(--charcoal-ink)]">
                    الدقة الرسومية الفائقة (High Quality 3D)
                  </span>
                  <span className="block text-xs text-[var(--muted-umeboshi)]">
                    تفعيل الظلال الناعمة وانعكاسات المواد في المشهد ثلاثي الأبعاد.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.preferences.highQuality3D}
                  onChange={(e) => updatePreferences({ highQuality3D: e.target.checked })}
                  className="h-5 w-5 rounded border-[var(--bamboo-border)] text-[var(--charcoal-ink)] focus:ring-[var(--charcoal-ink)] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="block text-sm font-semibold text-[var(--charcoal-ink)]">
                    الدوران التلقائي للمكتب (Auto-Rotate)
                  </span>
                  <span className="block text-xs text-[var(--muted-umeboshi)]">
                    دوران المشهد بسلاسة عند عدم التفاعل لاستعراض المكونات.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.preferences.autoRotateStudio}
                  onChange={(e) => updatePreferences({ autoRotateStudio: e.target.checked })}
                  className="h-5 w-5 rounded border-[var(--bamboo-border)] text-[var(--charcoal-ink)] focus:ring-[var(--charcoal-ink)] cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--washi-cream)] border border-[var(--bamboo-border)] shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
              قنوات الإشعارات وتتبع الطلبات
            </h2>

            <label className="flex items-center justify-between cursor-pointer border-b border-[var(--bamboo-border)]/40 pb-4">
              <div>
                <span className="block text-sm font-semibold text-[var(--charcoal-ink)]">
                  تحديثات حالة الطلب عبر البريد الإلكتروني
                </span>
                <span className="block text-xs text-[var(--muted-umeboshi)]">
                  إرسال رقم الشحنة ورابط التتبع لحظياً فور خروج الشحنة.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.orderUpdatesEmail}
                onChange={(e) => updateNotifications({ orderUpdatesEmail: e.target.checked })}
                className="h-5 w-5 rounded border-[var(--bamboo-border)] text-[var(--charcoal-ink)] focus:ring-[var(--charcoal-ink)] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer border-b border-[var(--bamboo-border)]/40 pb-4">
              <div>
                <span className="block text-sm font-semibold text-[var(--charcoal-ink)]">
                  رسائل التتبع النصية (SMS)
                </span>
                <span className="block text-xs text-[var(--muted-umeboshi)]">
                  تنبيهات فورية عند وصول المندوب لموقعك.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.orderUpdatesSMS}
                onChange={(e) => updateNotifications({ orderUpdatesSMS: e.target.checked })}
                className="h-5 w-5 rounded border-[var(--bamboo-border)] text-[var(--charcoal-ink)] focus:ring-[var(--charcoal-ink)] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="block text-sm font-semibold text-[var(--charcoal-ink)]">
                  النشرة البريدية ومجموعات الإصدار المحدود
                </span>
                <span className="block text-xs text-[var(--muted-umeboshi)]">
                  الحصول على دعوات حصرية لإصدارات المكاتب والمعدات الجديدة.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.atelierNewsletter}
                onChange={(e) => updateNotifications({ atelierNewsletter: e.target.checked })}
                className="h-5 w-5 rounded border-[var(--bamboo-border)] text-[var(--charcoal-ink)] focus:ring-[var(--charcoal-ink)] cursor-pointer"
              />
            </label>
          </div>
        </div>
      )}

      {/* Tab 4: System & Account Management */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--washi-cream)] border border-[var(--bamboo-border)] shadow-xs space-y-5">
            <h2 className="text-lg font-bold text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
              إدارة الحساب والبيانات المخزنة
            </h2>

            <div className="p-4 rounded-xl bg-white border border-[var(--bamboo-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="block text-sm font-semibold text-[var(--charcoal-ink)]">
                  سجل الطلبات الحالي
                </span>
                <span className="block text-xs text-[var(--muted-umeboshi)]">
                  يمكنك مراجعة جميع فواتيرك وتتبع شحناتك في صفحة الطلبات المخصصة.
                </span>
              </div>
              <Link
                href="/orders"
                className="px-4 py-2 rounded-lg bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] text-xs font-semibold hover:bg-[var(--charcoal-deep)] transition-all"
              >
                الانتقال لصفحة طلباتي ←
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[var(--bamboo-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="block text-sm font-semibold text-[var(--charcoal-ink)]">
                  استعادة الإعدادات الافتراضية
                </span>
                <span className="block text-xs text-[var(--muted-umeboshi)]">
                  إعادة ضبط جميع خيارات الاستوديو والإشعارات إلى قيمها الأصلية.
                </span>
              </div>
              <button
                type="button"
                onClick={resetSettings}
                className="px-4 py-2 rounded-lg border border-[var(--bamboo-border)] text-xs font-semibold text-[var(--charcoal-ink)] hover:bg-black/5 transition-all cursor-pointer"
              >
                استعادة الضبط الافتراضي
              </button>
            </div>

            {user && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="block text-sm font-semibold text-[var(--vermilion-seal)]">
                    تسجيل الخروج من الحساب
                  </span>
                  <span className="block text-xs text-red-700/80">
                    أنت مسجل الدخول حالياً بحساب: {user.name} ({user.email})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-[var(--vermilion-seal)] text-white text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

