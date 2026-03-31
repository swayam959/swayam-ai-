'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BarChart2, TrendingUp, Award, Clock, ArrowLeft } from 'lucide-react';
import { Interview } from '@/types';

const mockReports: Interview[] = [
  { id: '1', date: 'Feb 20, 2026', type: 'Technical', duration: 45, score: 82, status: 'Completed' },
  { id: '2', date: 'Feb 17, 2026', type: 'HR', duration: 30, score: 76, status: 'Completed' },
  { id: '3', date: 'Feb 14, 2026', type: 'Behavioral', duration: 35, score: 88, status: 'Completed' },
  { id: '4', date: 'Feb 10, 2026', type: 'Technical', duration: 50, score: 91, status: 'Completed' },
  { id: '5', date: 'Feb 5, 2026', type: 'HR', duration: 25, score: 73, status: 'Completed' },
];

const typeVariant: Record<string, 'info' | 'success' | 'warning'> = {
  Technical: 'info',
  HR: 'success',
  Behavioral: 'warning',
};

export default function ReportsPage() {
  const router = useRouter();
  const avgScore = Math.round(mockReports.reduce((acc, r) => acc + r.score, 0) / mockReports.length);
  const totalInterviews = mockReports.length;
  const totalDuration = mockReports.reduce((acc, r) => acc + r.duration, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="hidden lg:flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-8">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="mb-4 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Performance Reports</h1>
              <p className="text-gray-500 dark:text-gray-400">Track your interview performance and progress over time.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                      <BarChart2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Interviews</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalInterviews}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Average Score</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgScore}%</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Time</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalDuration} min</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Interview History */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Interview History</h2>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockReports.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <div className="flex items-center gap-4">
                        <Badge variant={typeVariant[interview.type]}>{interview.type}</Badge>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{interview.date}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {interview.duration} min
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{interview.score}%</p>
                          <p className="text-xs text-gray-500">Score</p>
                        </div>
                        <Badge variant="success">{interview.status}</Badge>
                        {interview.score >= 80 && <Award className="w-5 h-5 text-yellow-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <Navbar />
        <main className="p-4">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Performance Reports</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Track your interview performance.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <Card>
              <CardBody>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                    <BarChart2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Interviews</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalInterviews}</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Average Score</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgScore}%</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Time</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalDuration} min</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Interview History */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Interview History</h2>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockReports.map((interview) => (
                  <div key={interview.id} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={typeVariant[interview.type]}>{interview.type}</Badge>
                      {interview.score >= 80 && <Award className="w-5 h-5 text-yellow-500" />}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{interview.date}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {interview.duration} min
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">{interview.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
}
