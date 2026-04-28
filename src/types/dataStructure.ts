export interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  stack: 'javascript' | 'react' | 'typescript' | 'html' | 'css' | 'java' | 'go' | 'vue' | 'angular';
}

export interface TechStack {
  id: 'javascript' | 'react' | 'typescript' | 'html' | 'css' | 'java' | 'go' | 'vue' | 'angular';
  name: string;
  icon: string;
  description?: string;
  questionCount?: number;
}

export interface SessionState {
  currentStack: TechStack['id'];
  currentQuestion: Question | null;
  currentIndex: number;
  totalQuestions: number;
  askedQuestionIds: string[];
  allQuestions: Question[];
  showAnswer: boolean;
  sessionComplete: boolean;
}

export const STACK_METADATA: TechStack[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '📜',
    description: 'Core JavaScript fundamentals and ESNext features.',
    questionCount: 100
  },
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    description: 'Component patterns, hooks, and performance techniques.',
    questionCount: 100
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '🔷',
    description: 'Static typing, utility types, and compiler options.',
    questionCount: 100
  },
  {
    id: 'html',
    name: 'HTML',
    icon: '📄',
    description: 'Semantic markup, forms, and accessibility essentials.',
    questionCount: 100
  },
  {
    id: 'css',
    name: 'CSS',
    icon: '🎨',
    description: 'Layout, animations, and visual polish techniques.',
    questionCount: 100
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    description: 'Object-oriented programming, concurrency, and enterprise patterns.',
    questionCount: 120
  },
  {
    id: 'go',
    name: 'Go',
    icon: '🐹',
    description: 'Concurrency, goroutines, channels, and systems programming.',
    questionCount: 100
  },
  {
    id: 'vue',
    name: 'Vue',
    icon: '💚',
    description: 'Progressive framework, composition API, and reactive data binding.',
    questionCount: 100
  },
  {
    id: 'angular',
    name: 'Angular',
    icon: '🅰️',
    description: 'Full-featured framework, dependency injection, and RxJS integration.',
    questionCount: 100
  }
];
