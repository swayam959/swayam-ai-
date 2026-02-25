'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Brain, Target, Mic, Video, FileText, BarChart2, CheckCircle, Star, ArrowRight, Zap, Users, Award } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI-Powered Questions', desc: 'Adaptive questions tailored to your experience level and target role.' },
  { icon: Video, title: 'Posture Analysis', desc: 'Real-time body language and eye contact feedback during interviews.' },
  { icon: Mic, title: 'Voice Analysis', desc: 'Analyze speech clarity, pace, tone, and confidence levels.' },
  { icon: FileText, title: 'Resume Integration', desc: 'Personalized interviews based on your resume and job description.' },
  { icon: BarChart2, title: 'Detailed Analytics', desc: 'Track progress with comprehensive performance reports and insights.' },
  { icon: Target, title: 'Mock Interviews', desc: 'Practice Technical, HR, and Behavioral interviews in realistic scenarios.' },
];

const steps = [
  { num: '01', title: 'Create Account', desc: 'Sign up and set up your profile with skills, experience, and target roles.' },
  { num: '02', title: 'Choose Interview Type', desc: 'Select Technical, HR, or Behavioral interview based on your needs.' },
  { num: '03', title: 'Practice with AI', desc: 'Complete the interview with real-time AI guidance and adaptive questions.' },
  { num: '04', title: 'Review & Improve', desc: 'Get detailed feedback, scores, and improvement suggestions.' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Software Engineer @ Google', text: 'Swayam AI helped me prepare for my Google interview. The AI questions were spot-on!', rating: 5 },
  { name: 'Rahul Verma', role: 'Product Manager @ Flipkart', text: 'The behavioral interview practice was incredible. Got my dream job thanks to this platform!', rating: 5 },
  { name: 'Ananya Singh', role: 'Data Scientist @ Microsoft', text: 'The detailed analytics showed me exactly where I needed to improve. Highly recommended!', rating: 5 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI-Powered Interview Preparation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Ace Your Next Interview<br />
            <span className="text-indigo-600">with AI</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Practice with our AI interviewer, get real-time feedback on your answers, body language, and communication skills. Land your dream job with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button variant="primary" size="lg" className="flex items-center gap-2 w-full sm:w-auto">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-indigo-500" /><span>10,000+ Students</span></div>
            <div className="flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" /><span>95% Success Rate</span></div>
            <div className="flex items-center gap-2"><Star className="w-4 h-4 text-green-500" /><span>4.9/5 Rating</span></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Comprehensive AI-powered tools to help you prepare, practice, and perfect your interview skills.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:shadow-md transition-shadow">
                <CardBody>
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl w-fit mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400">Get started in minutes and begin improving your interview skills today.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{num}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Students Say</h2>
            <p className="text-gray-600 dark:text-gray-400">Join thousands of students who landed their dream jobs with Swayam AI.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating }) => (
              <Card key={name} className="hover:shadow-md transition-shadow">
                <CardBody>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">&quot;{text}&quot;</p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ace Your Interview?</h2>
          <p className="text-indigo-200 mb-8 text-lg">Join 10,000+ students who are already preparing smarter with Swayam AI.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 text-base font-semibold rounded-lg w-full sm:w-auto">
                Start Free Today
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-indigo-200 text-sm">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />Free to get started</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />Cancel anytime</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
