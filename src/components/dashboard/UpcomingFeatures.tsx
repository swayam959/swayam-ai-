import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Video, Mic, Brain, FileText } from 'lucide-react';

const features = [
  { icon: Video, title: 'Posture & Eye Contact Analysis', desc: 'AI-powered real-time analysis of your body language and eye contact during interviews.' },
  { icon: Mic, title: 'Voice & Communication Analysis', desc: 'Analyze tone, pace, clarity, and confidence in your speech patterns.' },
  { icon: Brain, title: 'AI-Powered Adaptive Questions', desc: 'Dynamic questions that adapt to your responses and skill level in real-time.' },
  { icon: FileText, title: 'Resume-Based Personalization', desc: 'Interviews tailored to your resume, skills, and target job descriptions.' },
];

export function UpcomingFeatures() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Coming Soon</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="relative overflow-hidden">
            <CardBody>
              <div className="absolute top-3 right-3">
                <Badge variant="warning">Coming Soon</Badge>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg w-fit mb-3">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 pr-16">{title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
