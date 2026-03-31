import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Swayam AI - AI-Powered Mock Interview Platform',
  description: 'Ace your next interview with AI-powered mock interviews, real-time feedback, and personalized coaching.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
