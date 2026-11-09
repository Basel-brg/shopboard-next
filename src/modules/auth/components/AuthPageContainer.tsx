'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/useAuth';
import { validateInput } from '../../../shared/validation/validation';

export const AuthPageContainer: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, login, register, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRemember, setLoginRemember] = useState(true);
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    const emailErr = validateInput('email', loginEmail);
    if (emailErr) errors.email = emailErr;
    const passErr = validateInput('password', loginPassword);
    if (passErr) errors.password = passErr;

    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;

    login(loginEmail, loginPassword, loginRemember);
    router.push('/settings');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    const nameErr = validateInput('name', registerName);
    if (nameErr) errors.name = nameErr;
    const emailErr = validateInput('email', registerEmail);
    if (emailErr) errors.email = emailErr;
    const phoneErr = validateInput('phone', registerPhone);
    if (phoneErr) errors.phone = phoneErr;
    const passErr = validateInput('password', registerPassword);
    if (passErr) errors.password = passErr;

    setRegisterErrors(errors);
    if (Object.keys(errors).length > 0) return;

    register({
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      password: registerPassword,
    });
    router.push('/settings');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--washi-cream)] border border-[var(--bamboo-border)] shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block p-3 rounded-2xl bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] mb-4 text-xl">
            🏛️
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
            {isAuthenticated ? 'حسابك في ShopBoard' : 'بوابة أتيليه ShopBoard'}
          </h1>
          <p className="text-xs text-[var(--muted-umeboshi)] mt-1 font-[family-name:var(--font-ibm-plex)]">
            {isAuthenticated
              ? 'مرحباً بك في لوحة تحكم حسابك ومشترياتك المكتبية'
              : 'سجل دخولك لمتابعة طلباتك وحفظ تصاميم مكتبك في الاستوديو'}
          </p>
        </div>

        {!isAuthenticated ? (
          <div>
            {/* Tabs */}
            <div className="flex border-b border-[var(--bamboo-border)] mb-6">
              <button
                type="button"
                className={`flex-1 pb-3 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'border-b-2 border-[var(--charcoal-ink)] text-[var(--charcoal-ink)]'
                    : 'text-[var(--charcoal-ink)]/50 hover:text-[var(--charcoal-ink)]'
                }`}
                onClick={() => setActiveTab('login')}
              >
                تسجيل الدخول
              </button>
              <button
                type="button"
                className={`flex-1 pb-3 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'border-b-2 border-[var(--charcoal-ink)] text-[var(--charcoal-ink)]'
                    : 'text-[var(--charcoal-ink)]/50 hover:text-[var(--charcoal-ink)]'
                }`}
                onClick={() => setActiveTab('register')}
              >
                إنشاء حساب جديد
              </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="auth-page-login-email" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                    البريد الإلكتروني:
                  </label>
                  <input
                    type="email"
                    id="auth-page-login-email"
                    dir="ltr"
                    required
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (loginErrors.email) setLoginErrors((p) => ({ ...p, email: '' }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                  />
                  {loginErrors.email && (
                    <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{loginErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="auth-page-login-password" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                    كلمة المرور:
                  </label>
                  <input
                    type="password"
                    id="auth-page-login-password"
                    dir="ltr"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (loginErrors.password) setLoginErrors((p) => ({ ...p, password: '' }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                  />
                  {loginErrors.password && (
                    <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{loginErrors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={loginRemember}
                      onChange={(e) => setLoginRemember(e.target.checked)}
                      className="rounded border-[var(--bamboo-border)] text-[var(--charcoal-ink)] focus:ring-[var(--charcoal-ink)]"
                    />
                    <span className="text-[var(--charcoal-ink)]">تذكر بياناتي</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] font-semibold text-sm hover:bg-[var(--charcoal-deep)] transition-all shadow-xs cursor-pointer mt-4"
                >
                  تسجيل الدخول إلى حسابك
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label htmlFor="auth-page-register-name" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                    الاسم الكامل:
                  </label>
                  <input
                    type="text"
                    id="auth-page-register-name"
                    required
                    placeholder="عبدالله السعد"
                    value={registerName}
                    onChange={(e) => {
                      setRegisterName(e.target.value);
                      if (registerErrors.name) setRegisterErrors((p) => ({ ...p, name: '' }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                  />
                  {registerErrors.name && (
                    <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{registerErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="auth-page-register-email" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                    البريد الإلكتروني:
                  </label>
                  <input
                    type="email"
                    id="auth-page-register-email"
                    dir="ltr"
                    required
                    placeholder="name@example.com"
                    value={registerEmail}
                    onChange={(e) => {
                      setRegisterEmail(e.target.value);
                      if (registerErrors.email) setRegisterErrors((p) => ({ ...p, email: '' }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                  />
                  {registerErrors.email && (
                    <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{registerErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="auth-page-register-phone" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                    رقم الجوال:
                  </label>
                  <input
                    type="tel"
                    id="auth-page-register-phone"
                    dir="ltr"
                    placeholder="0501234567"
                    value={registerPhone}
                    onChange={(e) => {
                      setRegisterPhone(e.target.value);
                      if (registerErrors.phone) setRegisterErrors((p) => ({ ...p, phone: '' }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                  />
                  {registerErrors.phone && (
                    <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{registerErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="auth-page-register-password" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1">
                    كلمة المرور:
                  </label>
                  <input
                    type="password"
                    id="auth-page-register-password"
                    dir="ltr"
                    required
                    placeholder="6 خانات على الأقل"
                    value={registerPassword}
                    onChange={(e) => {
                      setRegisterPassword(e.target.value);
                      if (registerErrors.password) setRegisterErrors((p) => ({ ...p, password: '' }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--bamboo-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--charcoal-ink)]"
                  />
                  {registerErrors.password && (
                    <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{registerErrors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] font-semibold text-sm hover:bg-[var(--charcoal-deep)] transition-all shadow-xs cursor-pointer mt-4"
                >
                  إنشاء الحساب وبدء التجربة
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Authenticated User View */
          <div className="space-y-6 text-center">
            <div className="p-5 rounded-2xl bg-white border border-[var(--bamboo-border)]">
              <span className="text-3xl mb-2 block">👤</span>
              <h2 className="text-lg font-bold text-[var(--charcoal-ink)]">{user?.name}</h2>
              <p className="text-xs text-[var(--muted-umeboshi)] mt-1" dir="ltr">
                {user?.email}
              </p>
              {user?.phone && (
                <p className="text-xs text-[var(--muted-umeboshi)] mt-0.5" dir="ltr">
                  {user.phone}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Link
                href="/settings"
                className="w-full py-2.5 px-4 rounded-xl bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--charcoal-deep)] transition-all shadow-xs"
              >
                ⚙️ إدارة الملف الشخصي والإعدادات
              </Link>

              <Link
                href="/orders"
                className="w-full py-2.5 px-4 rounded-xl border border-[var(--bamboo-border)] bg-white text-[var(--charcoal-ink)] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-black/5 transition-all"
              >
                📦 استعراض سجل طلباتي
              </Link>

              <button
                type="button"
                onClick={logout}
                className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-[var(--vermilion-seal)] text-sm font-semibold hover:bg-red-50 transition-all cursor-pointer"
              >
                تسجيل الخروج من الحساب
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
