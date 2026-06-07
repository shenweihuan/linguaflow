export type TargetLanguage = 'en' | 'ja' | 'ko';

export interface UserPreferences {
  dailyGoal: number;
  reminderEnabled: boolean;
  soundEnabled: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;
  nickname: string;
  avatar: string;
  targetLanguage: TargetLanguage;
  level: number; // 1-6 对应 A1-C2
  totalStudyTime: number; // 分钟
  createdAt: string;
  preferences: UserPreferences;
}
