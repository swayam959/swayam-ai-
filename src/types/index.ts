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
