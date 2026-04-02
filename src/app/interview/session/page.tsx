'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, AlertCircle, Download, Loader2 } from 'lucide-react';
import { Question, InterviewSession, InterviewReport } from '@/types';

// Fallback mock questions in case AI generation fails or for testing
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
  ],
  hr: [
    {
      id: 1,
      question: 'Tell me about yourself and your professional background.',
      category: 'Introduction',
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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState<InterviewReport | null>(null);

  // Initialize session and load AI-generated questions
  useEffect(() => {
    try {
      // Generate a unique session ID
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);

      // Record start time
      const sessionStartTime = new Date().toISOString();
      setStartTime(sessionStartTime);

      // Load AI-generated questions from sessionStorage or use fallback
      const storedQuestions = sessionStorage.getItem('aiGeneratedQuestions');
      const storedType = sessionStorage.getItem('interviewType');

      let loadedQuestions: Question[] = [];

      if (storedQuestions && storedType === interviewType) {
        loadedQuestions = JSON.parse(storedQuestions);
      } else {
        // Use fallback mock questions if no AI questions available
        loadedQuestions = mockQuestions[interviewType] || mockQuestions.technical;
      }

      setQuestions(loadedQuestions);

      // Initialize session in localStorage
      const sessionData: InterviewSession = {
        id: newSessionId,
        interviewType,
        questions: loadedQuestions,
        answers: {},
        startTime: sessionStartTime,
        status: 'in-progress',
      };

      localStorage.setItem(`interview_session_${newSessionId}`, JSON.stringify(sessionData));
      localStorage.setItem('current_session_id', newSessionId);
    } catch (error) {
      console.error('Error initializing session:', error);
      setQuestions(mockQuestions[interviewType] || mockQuestions.technical);
    } finally {
      setIsLoading(false);
    }
  }, [interviewType]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  // Timer effect
  useEffect(() => {
    if (!isCompleted && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCompleted, questions.length]);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (sessionId && Object.keys(answers).length > 0) {
      try {
        const sessionKey = `interview_session_${sessionId}`;
        const sessionData = localStorage.getItem(sessionKey);

        if (sessionData) {
          const session: InterviewSession = JSON.parse(sessionData);
          session.answers = answers;
          localStorage.setItem(sessionKey, JSON.stringify(session));
        }
      } catch (error) {
        console.error('Error saving answers:', error);
      }
    }
  }, [answers, sessionId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: string) => {
    if (currentQuestion) {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Complete the interview
      completeInterview();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const completeInterview = async () => {
    try {
      setIsGeneratingReport(true);
      const endTime = new Date().toISOString();
      const duration = timeElapsed;

      // Generate AI report
      let generatedReport: InterviewReport | null = null;
      try {
        const reportResponse = await fetch('/api/generate-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questions,
            answers,
            interviewType,
          }),
        });

        if (reportResponse.ok) {
          generatedReport = await reportResponse.json();
          setReport(generatedReport);
        } else {
          console.error('Failed to generate report');
        }
      } catch (reportError) {
        console.error('Error generating report:', reportError);
      }

      // Update session in localStorage
      const sessionKey = `interview_session_${sessionId}`;
      const sessionData = localStorage.getItem(sessionKey);

      if (sessionData) {
        const session: InterviewSession = JSON.parse(sessionData);
        session.endTime = endTime;
        session.duration = duration;
        session.status = 'completed';
        session.answers = answers;
        if (generatedReport) {
          session.report = generatedReport;
        }

        localStorage.setItem(sessionKey, JSON.stringify(session));

        // Add to completed sessions list
        const completedSessions = JSON.parse(localStorage.getItem('completed_sessions') || '[]');
        completedSessions.push(sessionId);
        localStorage.setItem('completed_sessions', JSON.stringify(completedSessions));
      }

      // Clear current session and AI questions from sessionStorage
      sessionStorage.removeItem('aiGeneratedQuestions');
      sessionStorage.removeItem('interviewType');
      localStorage.removeItem('current_session_id');

      setIsCompleted(true);
    } catch (error) {
      console.error('Error completing interview:', error);
      setIsCompleted(true);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleFinishInterview = () => {
    router.push('/reports');
  };

  const downloadReport = () => {
    if (!report) return;

    const reportContent = `
AI INTERVIEW REPORT
==================

Interview Type: ${interviewType.toUpperCase()}
Session ID: ${sessionId}
Date: ${new Date(startTime).toLocaleString()}
Duration: ${formatTime(timeElapsed)}

OVERALL SCORE: ${report.score}/100

STRENGTHS:
${report.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

WEAKNESSES:
${report.weaknesses.map((w, i) => `${i + 1}. ${w}`).join('\n')}

SUGGESTIONS FOR IMPROVEMENT:
${report.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

DETAILED ANALYSIS:
${report.detailedAnalysis}

---
Generated by Swayam AI Interview Platform
${new Date().toLocaleString()}
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `interview-report-${sessionId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isLoading || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <Card>
            <CardBody className="py-12">
              <div className="text-center mb-8">
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
              </div>

              {isGeneratingReport && (
                <div className="mb-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generating your AI-powered performance report...
                  </p>
                </div>
              )}

              {report && !isGeneratingReport && (
                <div className="mb-8 space-y-6">
                  {/* Score */}
                  <div className="text-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
                    <p className="text-sm font-medium mb-2">Your Score</p>
                    <p className="text-5xl font-bold">{report.score}/100</p>
                  </div>

                  {/* Strengths */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
                      💪 Strengths
                    </h3>
                    <ul className="space-y-2">
                      {report.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-green-800 dark:text-green-200 flex gap-2">
                          <span className="font-medium">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-300 mb-3">
                      📊 Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {report.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-sm text-orange-800 dark:text-orange-200 flex gap-2">
                          <span className="font-medium">•</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
                      💡 Recommendations
                    </h3>
                    <ul className="space-y-2">
                      {report.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-blue-800 dark:text-blue-200 flex gap-2">
                          <span className="font-medium">{index + 1}.</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      📝 Detailed Analysis
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {report.detailedAnalysis}
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Session ID: <span className="font-mono text-xs">{sessionId}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Your interview data has been saved and can be reviewed in reports.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {report && (
                  <Button variant="outline" size="lg" onClick={downloadReport} className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                  </Button>
                )}
                <Button variant="primary" size="lg" onClick={handleFinishInterview}>
                  View All Reports
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
