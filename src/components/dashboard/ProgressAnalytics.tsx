import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { TrendingUp } from 'lucide-react';

const scores = [65, 70, 72, 76, 78, 82];
const skills = [
  { name: 'Problem Solving', score: 82 },
  { name: 'Communication', score: 76 },
  { name: 'Technical Knowledge', score: 88 },
  { name: 'Behavioral Responses', score: 74 },
  { name: 'Time Management', score: 70 },
];

export function ProgressAnalytics() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Progress Analytics</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your improvement over time</p>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Score Trend (Last 6 Interviews)
            </h3>
            <div className="flex items-end gap-2 h-24">
              {scores.map((score, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-500">{score}</span>
                  <div
                    className="w-full bg-indigo-500 rounded-t"
                    style={{ height: `${(score / 100) * 80}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Interview 1</span>
              <span>Interview 6</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Skills Breakdown</h3>
            <div className="space-y-3">
              {skills.map(skill => (
                <Progress key={skill.name} label={skill.name} value={skill.score} color="indigo" />
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
