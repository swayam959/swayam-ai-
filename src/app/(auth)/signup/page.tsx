'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardBody } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const pwStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsLoading(true);
    setError('');
    const success = await signup(form.name, form.email, form.password);
    setIsLoading(false);
    if (success) router.push('/dashboard');
    else setError('An account with this email already exists.');
  };

  const strength = pwStrength(form.password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-gray-200', 'bg-red-500', 'bg-amber-500', 'bg-yellow-500', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 mb-6">
            <Brain className="w-8 h-8" />
            <span className="text-2xl font-bold">Swayam AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Start your AI-powered interview prep journey</p>
        </div>
        <Card>
          <CardBody>
            {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Full Name" id="name" type="text" placeholder="John Doe" value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))} error={errors.name} />
              <Input label="Email" id="email" type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))} error={errors.email} />
              <div>
                <div className="relative">
                  <Input label="Password" id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} error={errors.password} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded ${i <= strength ? strengthColors[strength] : 'bg-gray-200 dark:bg-gray-700'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{strengthLabels[strength]} password</p>
                  </div>
                )}
              </div>
              <Input label="Confirm Password" id="confirm" type="password" placeholder="••••••••" value={form.confirm}
                onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} error={errors.confirm} />
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 hover:underline font-medium">Sign in</Link>
            </p>
          </CardBody>
        </Card>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-500 dark:text-gray-400">
          {['Free to use', 'No credit card', 'Secure & Private', 'Instant access'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
