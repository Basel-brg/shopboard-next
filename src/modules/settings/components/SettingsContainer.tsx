'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSettings } from '../context/useSettings';
import { IconCheck, IconSettings } from '../../../shared/components/Icons/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AtelierAmbiance } from '../settings.types';

export const SettingsContainer: React.FC = () => {
  const { settings, isLoaded, updateProfile, updatePreferences, updateNotifications, resetSettings } =
    useSettings();

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

      {/* Tabs Navigation (shadcn button variants) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--bamboo-border)] pb-3 mb-8">
        <Button
          type="button"
          variant={activeTab === 'profile' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('profile')}
        >
          الملف الشخصي والعنوان
        </Button>

        <Button
          type="button"
          variant={activeTab === 'atelier' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('atelier')}
        >
          تفضيلات استوديو أكاري 3D
        </Button>

        <Button
          type="button"
          variant={activeTab === 'notifications' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('notifications')}
        >
          الإشعارات والتنبيهات
        </Button>

        <Button
          type="button"
          variant={activeTab === 'system' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('system')}
        >
          إدارة الحساب والنظام
        </Button>
      </div>

      {/* Tab 1: Profile & Delivery Address */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>بيانات المستلم والتواصل</CardTitle>
              <CardDescription>البيانات المستخدمة في الفواتير وتسليم الطلبات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="settings-name" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                    الاسم الكامل:
                  </label>
                  <Input
                    type="text"
                    id="settings-name"
                    value={profileForm.name}
                    hasError={Boolean(profileErrors.name)}
                    onChange={(e) => {
                      setProfileForm((p) => ({ ...p, name: e.target.value }));
                      if (profileErrors.name) setProfileErrors((p) => ({ ...p, name: '' }));
                    }}
                  />
                  {profileErrors.name && (
                    <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{profileErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="settings-email" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                    البريد الإلكتروني:
                  </label>
                  <Input
                    type="email"
                    id="settings-email"
                    dir="ltr"
                    value={profileForm.email}
                    hasError={Boolean(profileErrors.email)}
                    onChange={(e) => {
                      setProfileForm((p) => ({ ...p, email: e.target.value }));
                      if (profileErrors.email) setProfileErrors((p) => ({ ...p, email: '' }));
                    }}
                  />
                  {profileErrors.email && (
                    <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{profileErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="settings-phone" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                    رقم الجوال:
                  </label>
                  <Input
                    type="tel"
                    id="settings-phone"
                    dir="ltr"
                    placeholder="0501234567"
                    value={profileForm.phone}
                    hasError={Boolean(profileErrors.phone)}
                    onChange={(e) => {
                      setProfileForm((p) => ({ ...p, phone: e.target.value }));
                      if (profileErrors.phone) setProfileErrors((p) => ({ ...p, phone: '' }));
                    }}
                  />
                  {profileErrors.phone && (
                    <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{profileErrors.phone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>عنوان التوصيل الافتراضي في المملكة</CardTitle>
              <CardDescription>العنوان الذي ستشحن إليه طلباتك تلقائياً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="settings-city" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                    المدينة:
                  </label>
                  <Input
                    type="text"
                    id="settings-city"
                    value={profileForm.city}
                    hasError={Boolean(profileErrors.city)}
                    onChange={(e) => {
                      setProfileForm((p) => ({ ...p, city: e.target.value }));
                      if (profileErrors.city) setProfileErrors((p) => ({ ...p, city: '' }));
                    }}
                  />
                  {profileErrors.city && (
                    <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{profileErrors.city}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="settings-district" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                    الحي:
                  </label>
                  <Input
                    type="text"
                    id="settings-district"
                    value={profileForm.district}
                    onChange={(e) => setProfileForm((p) => ({ ...p, district: e.target.value }))}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="settings-street" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                    الشارع والعمارة / الرمز البريدي:
                  </label>
                  <Input
                    type="text"
                    id="settings-street"
                    value={profileForm.streetAddress}
                    onChange={(e) => setProfileForm((p) => ({ ...p, streetAddress: e.target.value }))}
                    placeholder="مثال: طريق الملك فهد، مبنى 14"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between pt-2">
            <Button type="submit" size="lg" className="gap-2">
              <IconCheck size={18} />
              <span>حفظ تعديلات الملف الشخصي</span>
            </Button>

            {saveSuccess && (
              <Badge variant="green" className="text-xs font-semibold animate-fade-in">
                ✓ تم حفظ التغييرات بنجاح
              </Badge>
            )}
          </div>
        </form>
      )}

      {/* Tab 2: Atelier 3D Preferences */}
      {activeTab === 'atelier' && (
        <Card>
          <CardHeader>
            <CardTitle>طابع وإضاءة الاستوديو (Atelier Ambiance)</CardTitle>
            <CardDescription>
              اختر الجو المعماري واللوني المفضل لديك داخل الاستوديو ثلاثي الأبعاد.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle>قنوات الإشعارات وتتبع الطلبات</CardTitle>
            <CardDescription>التحكم في وصول التحديثات عبر البريد والرسائل القصيرة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      )}

      {/* Tab 4: System & Account Management */}
      {activeTab === 'system' && (
        <Card>
          <CardHeader>
            <CardTitle>إدارة الحساب والبيانات المخزنة</CardTitle>
            <CardDescription>الإجراءات المتقدمة وإعادة الضبط</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-[var(--bamboo-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="block text-sm font-semibold text-[var(--charcoal-ink)]">
                  سجل الطلبات الحالي
                </span>
                <span className="block text-xs text-[var(--muted-umeboshi)]">
                  يمكنك مراجعة جميع فواتيرك وتتبع شحناتك في صفحة الطلبات المخصصة.
                </span>
              </div>
              <Button asChild size="sm">
                <Link href="/orders">الانتقال لصفحة طلباتي ←</Link>
              </Button>
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetSettings}
              >
                استعادة الضبط الافتراضي
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
