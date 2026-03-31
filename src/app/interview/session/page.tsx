'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options?: string[];
}

const mockQuestions: Record<string, Question[]> = {
  technical: [
    {
      id: 1,
      question: 'What is the time complexity of binary search?',
      category: 'Data Structures & Algorithms',
      difficulty: 'Easy',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    },
    {
      id: 2,
      question: 'Explain the difference between var, let, and const in JavaScript.',
      category: 'Programming Fundamentals',
      difficulty: 'Medium',
    },
    {
      id: 3,
      question: 'Design a URL shortening service like bit.ly. What are the key considerations?',
      category: 'System Design',
      difficulty: 'Hard',
    },
    {
      id: 4,
      question: 'How would you implement a LRU (Least Recently Used) cache?',
      category: 'Data Structures & Algorithms',
      difficulty: 'Hard',
    },
    {
      id: 5,
      question: 'What are React Hooks and why were they introduced?',
      category: 'Frontend Development',
      difficulty: 'Medium',
    },
  ],
  hr: [
    {
      id: 1,
      question: 'Tell me about yourself and your professional background.',
      category: 'Introduction',
      difficulty: 'Easy',
    },
    {
      id: 2,
      question: 'Why do you want to work for our company?',
      category: 'Motivation',
      difficulty: 'Medium',
    },
    {
      id: 3,
      question: 'What are your salary expectations?',
      category: 'Compensation',
      difficulty: 'Medium',
    },
    {
      id: 4,
      question: 'Where do you see yourself in 5 years?',
      category: 'Career Goals',
      difficulty: 'Easy',
    },
    {
      id: 5,
      question: 'Do you have any questions for us?',
      category: 'Closing',
      difficulty: 'Easy',
    },
  ],
  behavioral: [
    {
      id: 1,
      question: 'Tell me about a time when you had to work with a difficult team member. How did you handle it?',
      category: 'Teamwork',
      difficulty: 'Medium',
    },
    {
      id: 2,
      question: 'Describe a situation where you had to meet a tight deadline. What did you do?',
      category: 'Time Management',
      difficulty: 'Medium',
    },
    {
      id: 3,
      question: 'Give me an example of a time when you showed leadership.',
      category: 'Leadership',
      difficulty: 'Hard',
    },
    {
      id: 4,
      question: 'Tell me about a mistake you made and how you handled it.',
      category: 'Problem Solving',
      difficulty: 'Medium',
    },
    {
      id: 5,
      question: 'Describe a time when you had to adapt to a significant change at work.',
      category: 'Adaptability',
      difficulty: 'Medium',
    },
  ],
};

function InterviewSessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const interviewType = searchParams.get('type') || 'technical';

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = mockQuestions[interviewType] || mockQuestions.technical;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (!isCompleted) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishInterview = () => {
    router.push('/reports');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-12">
          <Card>
            <CardBody className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Interview Completed!</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Great job! You&apos;ve completed all {questions.length} questions.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time Taken</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{formatTime(timeElapsed)}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Questions</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{questions.length}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" size="lg" onClick={handleFinishInterview}>
                  View Reports
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push('/dashboard')}>
                  Back to Dashboard
                </Button>
              </div>
            </CardBody>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.push('/interview')} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Exit Interview
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">
                  {currentQuestion.category}
                </span>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  currentQuestion.difficulty === 'Easy'
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                    : currentQuestion.difficulty === 'Medium'
                    ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'text-red-600 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                {currentQuestion.difficulty}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{currentQuestion.question}</h2>

            {/* Multiple Choice Options */}
            {currentQuestion.options && (
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <span className="text-gray-900 dark:text-white">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Text Answer */}
            {!currentQuestion.options && (
              <div className="mb-6">
                <textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Type your answer here..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex items-start gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Tip: Use the STAR method (Situation, Task, Action, Result) to structure your answer effectively.
                  </p>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            className="flex items-center gap-2"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Question Navigator */}
        <Card className="mt-6">
          <CardBody>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Question Navigator</h3>
            <div className="flex flex-wrap gap-2">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-indigo-600 text-white'
                      : answers[q.id]
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}

export default function InterviewSessionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <InterviewSessionContent />
    </Suspense>
  );
}
