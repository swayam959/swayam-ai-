'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Brain, Clock, Target, ArrowLeft, Loader2 } from 'lucide-react';

const interviewTypes = [
  { id: 'technical', title: 'Technical Interview', desc: 'Data structures, algorithms, system design, and coding problems.', duration: '45-60 min', difficulty: 'Hard', badge: 'info' as const },
  { id: 'hr', title: 'HR Interview', desc: 'Company culture, role expectations, background, and general questions.', duration: '20-30 min', difficulty: 'Easy', badge: 'success' as const },
  { id: 'behavioral', title: 'Behavioral Interview', desc: 'STAR method questions about past experiences and soft skills.', duration: '30-45 min', difficulty: 'Medium', badge: 'warning' as const },
];

export default function InterviewPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectInterview = async (type: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Call the API to generate questions
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interviewType: type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate questions');
      }

      const data = await response.json();

      // Store the generated questions in sessionStorage
      sessionStorage.setItem('aiGeneratedQuestions', JSON.stringify(data.questions));
      sessionStorage.setItem('interviewType', type);

      // Navigate to session page
      router.push(`/interview/session?type=${type}`);
    } catch (err) {
      console.error('Error generating questions:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate questions. Please try again.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 text-sm mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Start New Interview</h1>
          <p className="text-gray-500 dark:text-gray-400">Choose the type of mock interview you want to practice.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {interviewTypes.map(({ id, title, desc, duration, difficulty, badge }) => (
            <Card key={id} className="hover:shadow-md transition-shadow">
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <Brain className="w-6 h-6 text-indigo-600" />
                  </div>
                  <Badge variant={badge}>{difficulty}</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{desc}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{duration}</span>
                  <span className="flex items-center gap-1"><Target className="w-3 h-3" />AI-powered</span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleSelectInterview(id)}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    'Select'
                  )}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
        <Card>
          <CardBody className="text-center py-8">
            <Brain className="w-12 h-12 text-indigo-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Interview Questions</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
              Each interview is now powered by AI, generating unique, relevant questions tailored to your selected interview type. Get ready for a realistic practice experience!
            </p>
          </CardBody>
        </Card>
      </main>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardBody className="text-center py-8">
              <div className="flex justify-center mb-4">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Preparing AI Interview...
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Our AI is generating personalized interview questions for you. This may take a few moments.
              </p>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
