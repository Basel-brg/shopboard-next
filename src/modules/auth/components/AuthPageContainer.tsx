'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, User, Settings, Package } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { validateInput } from '../../../shared/validation/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

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
    <div className="max-w-md w-full mx-auto px-4 py-12 sm:py-16">
      <Card className="rounded-3xl border-[var(--bamboo-border)] bg-[var(--washi-cream)] shadow-sm overflow-hidden">
        {/* Header */}
        <CardHeader className="text-center pt-8 pb-4">
          <div className="inline-flex self-center p-3 rounded-2xl bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] mb-3 shadow-xs">
            <Building2 className="w-6 h-6 text-[var(--accent-coral)]" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-[var(--charcoal-ink)]">
            {isAuthenticated ? 'حسابك في ShopBoard' : 'بوابة أتيليه ShopBoard'}
          </CardTitle>
          <CardDescription className="text-xs text-[var(--muted-umeboshi)] mt-1">
            {isAuthenticated
              ? 'مرحباً بك في لوحة تحكم حسابك ومشترياتك المكتبية'
              : 'سجل دخولك لمتابعة طلباتك وحفظ تصاميم مكتبك في الاستوديو'}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-2">
          {!isAuthenticated ? (
            <div>
              {/* Tab Switcher */}
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
                    <label htmlFor="auth-page-login-email" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                      البريد الإلكتروني:
                    </label>
                    <Input
                      type="email"
                      id="auth-page-login-email"
                      dir="ltr"
                      required
                      placeholder="name@example.com"
                      value={loginEmail}
                      hasError={Boolean(loginErrors.email)}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        if (loginErrors.email) setLoginErrors((p) => ({ ...p, email: '' }));
                      }}
                    />
                    {loginErrors.email && (
                      <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{loginErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="auth-page-login-password" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                      كلمة المرور:
                    </label>
                    <Input
                      type="password"
                      id="auth-page-login-password"
                      dir="ltr"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      hasError={Boolean(loginErrors.password)}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (loginErrors.password) setLoginErrors((p) => ({ ...p, password: '' }));
                      }}
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

                  <Button type="submit" size="lg" className="w-full mt-4">
                    تسجيل الدخول إلى حسابك
                  </Button>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="auth-page-register-name" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                      الاسم الكامل:
                    </label>
                    <Input
                      type="text"
                      id="auth-page-register-name"
                      required
                      placeholder="عبدالله السعد"
                      value={registerName}
                      hasError={Boolean(registerErrors.name)}
                      onChange={(e) => {
                        setRegisterName(e.target.value);
                        if (registerErrors.name) setRegisterErrors((p) => ({ ...p, name: '' }));
                      }}
                    />
                    {registerErrors.name && (
                      <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{registerErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="auth-page-register-email" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                      البريد الإلكتروني:
                    </label>
                    <Input
                      type="email"
                      id="auth-page-register-email"
                      dir="ltr"
                      required
                      placeholder="name@example.com"
                      value={registerEmail}
                      hasError={Boolean(registerErrors.email)}
                      onChange={(e) => {
                        setRegisterEmail(e.target.value);
                        if (registerErrors.email) setRegisterErrors((p) => ({ ...p, email: '' }));
                      }}
                    />
                    {registerErrors.email && (
                      <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{registerErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="auth-page-register-phone" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                      رقم الجوال:
                    </label>
                    <Input
                      type="tel"
                      id="auth-page-register-phone"
                      dir="ltr"
                      placeholder="0501234567"
                      value={registerPhone}
                      hasError={Boolean(registerErrors.phone)}
                      onChange={(e) => {
                        setRegisterPhone(e.target.value);
                        if (registerErrors.phone) setRegisterErrors((p) => ({ ...p, phone: '' }));
                      }}
                    />
                    {registerErrors.phone && (
                      <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{registerErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="auth-page-register-password" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
                      كلمة المرور:
                    </label>
                    <Input
                      type="password"
                      id="auth-page-register-password"
                      dir="ltr"
                      required
                      placeholder="6 خانات على الأقل"
                      value={registerPassword}
                      hasError={Boolean(registerErrors.password)}
                      onChange={(e) => {
                        setRegisterPassword(e.target.value);
                        if (registerErrors.password) setRegisterErrors((p) => ({ ...p, password: '' }));
                      }}
                    />
                    {registerErrors.password && (
                      <p className="text-xs text-[var(--vermilion-seal)] mt-1 font-medium">{registerErrors.password}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-4">
                    إنشاء الحساب وبدء التجربة
                  </Button>
                </form>
              )}
            </div>
          ) : (
            /* Authenticated User View */
            <div className="space-y-6 text-center">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1a1917] border border-[var(--border)]">
                <span className="flex justify-center mb-2">
                  <User className="w-10 h-10 text-[var(--accent-coral)]" />
                </span>
                <h2 className="text-lg font-bold text-[var(--foreground)]">{user?.name}</h2>
                <p className="text-xs text-[var(--muted-foreground)] mt-1" dir="ltr">
                  {user?.email}
                </p>
                {user?.phone && (
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5" dir="ltr">
                    {user.phone}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button asChild size="lg" className="w-full gap-2">
                  <Link href="/settings">
                    <Settings className="w-4 h-4" />
                    <span>إدارة الملف الشخصي والإعدادات</span>
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="w-full gap-2">
                  <Link href="/orders">
                    <Package className="w-4 h-4" />
                    <span>استعراض سجل طلباتي</span>
                  </Link>
                </Button>

                <Button
                  variant="destructive"
                  size="default"
                  className="w-full"
                  onClick={logout}
                >
                  تسجيل الخروج من الحساب
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
