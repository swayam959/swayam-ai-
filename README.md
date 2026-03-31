# Swayam AI - AI-Powered Mock Interview Platform

Swayam AI is a comprehensive AI-powered mock interview preparation platform for students. Practice Technical, HR, and Behavioral interviews with real-time feedback and personalized coaching.

## Features

- 🤖 **AI-Powered Questions** - Adaptive questions tailored to your experience level and target role
- �� **Progress Analytics** - Track improvement with detailed performance reports
- 🎯 **Mock Interviews** - Practice Technical, HR, and Behavioral interviews
- 🔒 **Secure Auth** - Client-side authentication with localStorage
- 🌙 **Dark Mode** - Full dark/light theme support
- 📱 **Responsive** - Works on desktop and mobile

## Coming Soon

- 🎥 Posture & Eye Contact Analysis
- 🎤 Voice & Communication Analysis
- 🧠 AI-Powered Adaptive Questions
- 📄 Resume-Based Personalization

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Theme**: next-themes
- **Utilities**: clsx, tailwind-merge

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/
│   ├── (auth)/login/      # Login page
│   ├── (auth)/signup/     # Sign up page
│   ├── dashboard/         # Dashboard page
│   ├── interview/         # Interview selection page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Navbar, Sidebar, Footer
│   └── dashboard/         # Dashboard-specific components
├── context/               # AuthContext
├── hooks/                 # useAuth hook
├── lib/                   # Utility functions
└── types/                 # TypeScript types
```

## Build

```bash
npm run build
```
