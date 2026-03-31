"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentInterviews } from '@/components/dashboard/RecentInterviews';
import { ProgressAnalytics } from '@/components/dashboard/ProgressAnalytics';
import { UpcomingFeatures } from '@/components/dashboard/UpcomingFeatures';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="hidden lg:flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-8">
            <WelcomeSection />
            <QuickActions />
            <RecentInterviews />
            <ProgressAnalytics />
            <UpcomingFeatures />
          </main>
        </div>
      </div>
      <div className="lg:hidden">
        <Navbar />
        <main className="p-4">
          <WelcomeSection />
          <QuickActions />
          <RecentInterviews />
          <ProgressAnalytics />
          <UpcomingFeatures />
        </main>
      </div>
    </div>
  );
}
