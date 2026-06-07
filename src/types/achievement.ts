export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type AchievementCategory = 'study' | 'social' | 'streak' | 'mastery' | 'special';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  condition: string;
  points: number;
  rarity: AchievementRarity;
  isHidden: boolean;
  unlockedAt?: string;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: string;
  progress: number; // 0-100 完成进度百分比
  isNotified: boolean;
}
