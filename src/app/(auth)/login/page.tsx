'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardBody } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsLoading(true);
    setError('');
    const success = await login(form.email, form.password);
    setIsLoading(false);
    if (success) router.push('/dashboard');
    else setError('Invalid email or password');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 mb-6">
            <Brain className="w-8 h-8" />
            <span className="text-2xl font-bold">Swayam AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Sign in to continue your interview prep</p>
        </div>
        <Card>
          <CardBody>
            {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email" id="email" type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))} error={errors.email} />
              <div className="relative">
                <Input label="Password" id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                  value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} error={errors.password} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input type="checkbox" className="rounded" /> Remember me
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
              </div>
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-indigo-600 hover:underline font-medium">Sign up</Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
