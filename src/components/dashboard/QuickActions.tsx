'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PlayCircle, Upload, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';

export function QuickActions() {
  const router = useRouter();

  return (
    <Card className="mb-8">
      <CardBody>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
            onClick={() => router.push('/interview')}
          >
            <PlayCircle className="w-5 h-5" />
            Start New Interview
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
            onClick={() => router.push('/resume')}
          >
            <Upload className="w-5 h-5" />
            Upload Resume
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="flex items-center gap-2"
            onClick={() => router.push('/reports')}
          >
            <BarChart2 className="w-5 h-5" />
            View Reports
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
