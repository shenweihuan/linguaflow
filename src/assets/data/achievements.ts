export type AchievementCategory = 'streak' | 'vocabulary' | 'grammar' | 'speaking' | 'listening' | 'social';
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type AchievementConditionType = 'days' | 'count' | 'score' | 'minutes';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  condition: {
    type: AchievementConditionType;
    value: number;
  };
  points: number;
  unlockedAt?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  // 连续学习成就 (Streak)
  {
    id: 'ach_streak_001',
    name: '初出茅庐',
    description: '连续学习1天，开启你的语言之旅',
    icon: '🌱',
    category: 'streak',
    rarity: 'common',
    condition: { type: 'days', value: 1 },
    points: 10
  },
  {
    id: 'ach_streak_002',
    name: '持之以恒',
    description: '连续学习7天，养成学习好习惯',
    icon: '🔥',
    category: 'streak',
    rarity: 'common',
    condition: { type: 'days', value: 7 },
    points: 50
  },
  {
    id: 'ach_streak_003',
    name: '月度达人',
    description: '连续学习30天，坚持不懈的精神值得赞赏',
    icon: '📅',
    category: 'streak',
    rarity: 'rare',
    condition: { type: 'days', value: 30 },
    points: 200
  },
  {
    id: 'ach_streak_004',
    name: '百日筑基',
    description: '连续学习100天，你已经超越了大多数人',
    icon: '💯',
    category: 'streak',
    rarity: 'epic',
    condition: { type: 'days', value: 100 },
    points: 500
  },
  {
    id: 'ach_streak_005',
    name: '年度传奇',
    description: '连续学习365天，你是真正的语言大师',
    icon: '👑',
    category: 'streak',
    rarity: 'legendary',
    condition: { type: 'days', value: 365 },
    points: 2000
  },

  // 单词成就 (Vocabulary)
  {
    id: 'ach_vocab_001',
    name: '词汇新手',
    description: '学会你的前10个单词',
    icon: '📝',
    category: 'vocabulary',
    rarity: 'common',
    condition: { type: 'count', value: 10 },
    points: 15
  },
  {
    id: 'ach_vocab_002',
    name: '词汇积累者',
    description: '累计掌握50个单词',
    icon: '📚',
    category: 'vocabulary',
    rarity: 'common',
    condition: { type: 'count', value: 50 },
    points: 75
  },
  {
    id: 'ach_vocab_003',
    name: '词汇达人',
    description: '累计掌握200个单词',
    icon: '🎓',
    category: 'vocabulary',
    rarity: 'rare',
    condition: { type: 'count', value: 200 },
    points: 250
  },
  {
    id: 'ach_vocab_004',
    name: '词汇大师',
    description: '累计掌握500个单词',
    icon: '🏆',
    category: 'vocabulary',
    rarity: 'epic',
    condition: { type: 'count', value: 500 },
    points: 600
  },
  {
    id: 'ach_vocab_005',
    name: '活字典',
    description: '累计掌握1000个单词',
    icon: '📖',
    category: 'vocabulary',
    rarity: 'legendary',
    condition: { type: 'count', value: 1000 },
    points: 1500
  },

  // 语法成就 (Grammar)
  {
    id: 'ach_grammar_001',
    name: '语法入门',
    description: '完成10道语法练习题',
    icon: '✏️',
    category: 'grammar',
    rarity: 'common',
    condition: { type: 'count', value: 10 },
    points: 20
  },
  {
    id: 'ach_grammar_002',
    name: '语法能手',
    description: '语法练习正确率达到80%',
    icon: '✅',
    category: 'grammar',
    rarity: 'rare',
    condition: { type: 'score', value: 80 },
    points: 150
  },
  {
    id: 'ach_grammar_003',
    name: '语法专家',
    description: '完成100道语法题且正确率90%以上',
    icon: '🎯',
    category: 'grammar',
    rarity: 'epic',
    condition: { type: 'score', value: 90 },
    points: 400
  },

  // 口语成就 (Speaking)
  {
    id: 'ach_speaking_001',
    name: '开口说话',
    description: '完成第一次口语练习',
    icon: '🗣️',
    category: 'speaking',
    rarity: 'common',
    condition: { type: 'count', value: 1 },
    points: 25
  },
  {
    id: 'ach_speaking_002',
    name: '流利表达',
    description: '累计完成20次口语练习',
    icon: '💬',
    category: 'speaking',
    rarity: 'rare',
    condition: { type: 'count', value: 20 },
    points: 180
  },
  {
    id: 'ach_speaking_003',
    name: '演讲家',
    description: '口语练习时长累计达到300分钟',
    icon: '🎤',
    category: 'speaking',
    rarity: 'epic',
    condition: { type: 'minutes', value: 300 },
    points: 450
  },

  // 听力成就 (Listening)
  {
    id: 'ach_listening_001',
    name: '倾听者',
    description: '完成第一段听力练习',
    icon: '👂',
    category: 'listening',
    rarity: 'common',
    condition: { type: 'count', value: 1 },
    points: 20
  },
  {
    id: 'ach_listening_002',
    name: '听力达人',
    description: '听力练习正确率达到85%',
    icon: '🎧',
    category: 'listening',
    rarity: 'rare',
    condition: { type: 'score', value: 85 },
    points: 160
  },
  {
    id: 'ach_listening_003',
    name: '听力大师',
    description: '完成50段听力材料且正确率90%',
    icon: '🔊',
    category: 'listening',
    rarity: 'epic',
    condition: { type: 'score', value: 90 },
    points: 420
  },

  // 社交成就 (Social)
  {
    id: 'ach_social_001',
    name: '社区新人',
    description: '发布第一篇帖子或评论',
    icon: '👋',
    category: 'social',
    rarity: 'common',
    condition: { type: 'count', value: 1 },
    points: 15
  },
  {
    id: 'ach_social_002',
    name: '热心助人',
    description: '帮助其他学习者回答10个问题',
    icon: '🤝',
    category: 'social',
    rarity: 'rare',
    condition: { type: 'count', value: 10 },
    points: 120
  },
  {
    id: 'ach_social_003',
    name: '人气之星',
    description: '获得100个点赞',
    icon: '⭐',
    category: 'social',
    rarity: 'rare',
    condition: { type: 'count', value: 100 },
    points: 200
  },
  {
    id: 'ach_social_004',
    name: '社区领袖',
    description: '发布20篇优质内容并获得广泛认可',
    icon: '🌟',
    category: 'social',
    rarity: 'epic',
    condition: { type: 'count', value: 20 },
    points: 480
  }
];

export const getAchievementsByCategory = (category: AchievementCategory): Achievement[] => {
  return ACHIEVEMENTS.filter(achievement => achievement.category === category);
};

export const getAchievementsByRarity = (rarity: AchievementRarity): Achievement[] => {
  return ACHIEVEMENTS.filter(achievement => achievement.rarity === rarity);
};

export const getAchievementById = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS.find(achievement => achievement.id === id);
};

export const RARITY_COLORS: Record<AchievementRarity, string> = {
  common: '#9E9E9E',
  rare: '#2196F3',
  epic: '#9C27B0',
  legendary: '#FF9800'
};

export const RARITY_LABELS: Record<AchievementRarity, string> = {
  common: '普通',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说'
};
