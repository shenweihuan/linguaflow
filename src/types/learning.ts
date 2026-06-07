export type MasteryLevel = 'new' | 'learning' | 'reviewing' | 'mastered';

export interface Vocabulary {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
  audioUrl: string;
  mastery: MasteryLevel;
  reviewCount: number;
  lastReviewAt: string | null;
}

export type GrammarExerciseType = 'multiple-choice' | 'fill-blank' | 'sentence-order';

export interface GrammarExercise {
  id: string;
  question: string;
  type: GrammarExerciseType;
  options?: string[];
  answer: string;
  explanation: string;
  difficulty: number; // 1-5
  relatedGrammarPoint: string;
}

export interface ListeningExercise {
  id: string;
  audioUrl: string;
  transcript: string;
  translation: string;
  question: string;
  options: string[];
  answer: number;
  speed: 'normal' | 'slow';
}

export interface MistakeRecord {
  exerciseId: string;
  exerciseType: 'vocabulary' | 'grammar' | 'listening';
  wrongAnswer: string;
  correctAnswer: string;
  timestamp: string;
  isResolved: boolean;
}

export interface Progress {
  userId: string;
  courseId: string;
  completionPercent: number;
  score: number;
  studyTime: number; // 分钟
  vocabularyMastered: string[]; // vocabulary IDs
  mistakes: MistakeRecord[];
  lastStudyAt: string;
  streakDays: number;
}

export interface LearningSession {
  id: string;
  userId: string;
  courseId: string;
  startTime: string;
  endTime: string | null;
  duration: number; // 分钟
  exercisesCompleted: number;
  correctCount: number;
  vocabularyLearned: string[];
  progressBefore: number;
  progressAfter: number;
}
