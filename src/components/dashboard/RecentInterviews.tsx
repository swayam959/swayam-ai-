import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Interview } from '@/types';
import { Clock, ExternalLink } from 'lucide-react';

const mockInterviews: Interview[] = [
  { id: '1', date: 'Feb 20, 2026', type: 'Technical', duration: 45, score: 82, status: 'Completed' },
  { id: '2', date: 'Feb 17, 2026', type: 'HR', duration: 30, score: 76, status: 'Completed' },
  { id: '3', date: 'Feb 14, 2026', type: 'Behavioral', duration: 35, score: 88, status: 'Completed' },
  { id: '4', date: 'Feb 10, 2026', type: 'Technical', duration: 20, score: 65, status: 'In Progress' },
];

const typeVariant: Record<string, 'info' | 'success' | 'warning'> = {
  Technical: 'info',
  HR: 'success',
  Behavioral: 'warning',
};

export function RecentInterviews() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Interviews</h2>
      </CardHeader>
      <CardBody className="p-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {mockInterviews.map(interview => (
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
                <Badge variant={interview.status === 'Completed' ? 'success' : 'warning'}>{interview.status}</Badge>
                <button className="text-indigo-600 hover:text-indigo-700"><ExternalLink className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
