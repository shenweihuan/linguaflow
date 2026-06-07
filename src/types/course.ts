export enum LanguageLevel {
  A1 = 1,
  A2 = 2,
  B1 = 3,
  B2 = 4,
  C1 = 5,
  C2 = 6,
}

export type CourseCategory = 'conversation' | 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'writing';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number; // 分钟
  isLocked: boolean;
  isCompleted: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  language: Language;
  level: LanguageLevel;
  category: CourseCategory;
  totalLessons: number;
  chapters: Chapter[];
  rating: number;
  enrolledCount: number;
  createdAt: string;
}
