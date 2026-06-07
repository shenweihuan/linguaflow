import { User, TargetLanguage } from '../../types/user';

export const MOCK_USERS: User[] = [
  {
    id: 'user_001',
    email: 'demo@linguaflow.com',
    password: 'demo123',
    nickname: '语言探索者',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cartoon%20avatar%20of%20a%20young%20language%20learner&image_size=square_1_1',
    targetLanguage: 'en' as TargetLanguage,
    level: 2,
    totalStudyTime: 1250,
    createdAt: '2025-09-15T08:00:00Z',
    preferences: {
      dailyGoal: 30,
      reminderEnabled: true,
      soundEnabled: true
    }
  },
  {
    id: 'user_002',
    email: 'sakura@linguaflow.com',
    password: 'demo123',
    nickname: '樱花日语',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20avatar%20of%20a%20Japanese%20language%20learner&image_size=square_1_1',
    targetLanguage: 'ja' as TargetLanguage,
    level: 3,
    totalStudyTime: 2340,
    createdAt: '2025-08-01T10:30:00Z',
    preferences: {
      dailyGoal: 45,
      reminderEnabled: true,
      soundEnabled: false
    }
  },
  {
    id: 'user_003',
    email: 'hanguk@linguaflow.com',
    password: 'demo123',
    nickname: '韩语达人',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20illustration%20avatar%20of%20a%20Korean%20language%20learner&image_size=square_1_1',
    targetLanguage: 'ko' as TargetLanguage,
    level: 4,
    totalStudyTime: 3680,
    createdAt: '2025-06-20T14:15:00Z',
    preferences: {
      dailyGoal: 60,
      reminderEnabled: false,
      soundEnabled: true
    }
  },
  {
    id: 'user_004',
    email: 'polyglot@linguaflow.com',
    password: 'demo123',
    nickname: '多语种爱好者',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diverse%20avatar%20of%20a%20polyglot%20language%20learner&image_size=square_1_1',
    targetLanguage: 'ja' as TargetLanguage,
    level: 1,
    totalStudyTime: 520,
    createdAt: '2026-01-10T09:45:00Z',
    preferences: {
      dailyGoal: 20,
      reminderEnabled: true,
      soundEnabled: true
    }
  },
  {
    id: 'user_005',
    email: 'beginner@linguaflow.com',
    password: 'demo123',
    nickname: '英语新手',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20avatar%20of%20a%20beginning%20English%20learner&image_size=square_1_1',
    targetLanguage: 'en' as TargetLanguage,
    level: 1,
    totalStudyTime: 180,
    createdAt: '2026-02-01T16:20:00Z',
    preferences: {
      dailyGoal: 15,
      reminderEnabled: true,
      soundEnabled: true
    }
  }
];

export const getDefaultUser = (): User => {
  return MOCK_USERS[0];
};

export const getUserById = (id: string): User | undefined => {
  return MOCK_USERS.find(user => user.id === id);
};

export const getUsersByLanguage = (language: TargetLanguage): User[] => {
  return MOCK_USERS.filter(user => user.targetLanguage === language);
};
