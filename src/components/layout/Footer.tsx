import React from 'react';
import Link from 'next/link';
import { Brain, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-7 h-7 text-indigo-400" />
              <span className="text-xl font-bold text-white">Swayam AI</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              AI-powered mock interview platform helping students ace their job interviews with personalized feedback and real-time analysis.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="hover:text-white">Features</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-sm text-center">
          © {new Date().getFullYear()} Swayam AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
