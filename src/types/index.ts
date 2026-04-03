export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Interview {
  id: string;
  date: string;
  type: 'Technical' | 'HR' | 'Behavioral';
  duration: number;
  score: number;
  status: 'Completed' | 'In Progress';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface Question {
  id: number;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options?: string[];
}

export interface GenerateQuestionsResponse {
  questions: Question[];
  interviewType: string;
}

export interface InterviewSession {
  id: string;
  interviewType: string;
  questions: Question[];
  answers: Record<number, string>;
  startTime: string;
  endTime?: string;
  duration?: number; // in seconds
  status: 'in-progress' | 'completed';
  report?: InterviewReport;
}

export interface InterviewReport {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  detailedAnalysis: string;
  generatedAt: string;
}
