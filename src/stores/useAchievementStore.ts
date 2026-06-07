import { create } from 'zustand';
import type { Achievement, AchievementConditionType } from '@/assets/data/achievements';
import { ACHIEVEMENTS } from '@/assets/data/achievements';

/**
 * 用户已解锁成就记录
 */
export interface UserAchievementRecord {
  userId: string;
  achievementId: string;
  unlockedAt: string;
  isNotified: boolean;
}

/**
 * 成就检查所需的进度数据结构
 */
export interface ProgressDataForAchievement {
  /** 连续学习天数 */
  streakDays: number;
  /** 已掌握单词总数 */
  totalWords: number;
  /** 语法练习正确率（百分制） */
  grammarScore: number;
  /** 口语练习次数 */
  speakingCount: number;
  /** 口语累计时长（分钟） */
  speakingMinutes: number;
  /** 听力练习正确率 */
  listeningScore: number;
  /** 社区发帖/评论数 */
  socialCount: number;
  /** 获得的点赞数 */
  likeCount: number;
}

/**
 * 成就系统状态管理接口
 */
interface AchievementState {
  /** 成就定义列表（只读） */
  achievements: Achievement[];
  /** 用户已解锁的成就 */
  userAchievements: UserAchievementRecord[];
  /** 总积分 */
  totalPoints: number;
  /** 待通知的新解锁成就队列 */
  pendingNotifications: Achievement[];

  /**
   * 加载成就定义数据
   */
  loadAchievements: () => void;

  /**
   * 根据传入的进度数据检查是否满足新成就条件
   * 匹配成功的成就将加入 userAchievements 和 pendingNotifications
   * @param progressData - 当前进度数据
   * @param userId - 当前用户 ID（用于关联 userAchievements）
   */
  checkAchievements: (progressData: ProgressDataForAchievement, userId: string) => void;

  /**
   * 领取/确认某个成就（标记为已通知）
   * @param achievementId - 成就 ID
   */
  claimAchievement: (achievementId: string) => void;

  /**
   * 关闭某个成就的通知弹窗
   * @param achievementId - 成就 ID
   */
  dismissNotification: (achievementId: string) => void;

  /**
   * 根据已解锁成就重新计算总积分
   * @returns 总积分值
   */
  getTotalPoints: () => number;
}

/**
 * 成就系统状态管理 Store
 *
 * 维护成就定义、用户已解锁成就、待通知队列和总积分。
 * 提供 checkAchievements 方法根据学习进度自动检测并解锁新成就。
 */
const useAchievementStore = create<AchievementState>()((set, get) => ({
  // 初始状态
  achievements: [],
  userAchievements: [],
  totalPoints: 0,
  pendingNotifications: [],

  /**
   * 从 achievements.ts 加载成就定义
   */
  loadAchievements: () => {
    set({ achievements: ACHIEVEMENTS });
  },

  /**
   * 核心逻辑：将 progressData 与每个未解锁成就的条件逐一比对
   *
   * 条件类型映射：
   * - days     -> streakDays
   * - count    -> 根据 category 映射到不同字段
   * - score    -> grammarScore / listeningScore
   * - minutes  -> speakingMinutes
   */
  checkAchievements: (
    progressData: ProgressDataForAchievement,
    userId: string
  ) => {
    const { achievements, userAchievements } = get();
    const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId));

    const newlyUnlocked: Achievement[] = [];
    const newRecords: UserAchievementRecord[] = [];

    for (const ach of achievements) {
      // 跳过已解锁的
      if (unlockedIds.has(ach.id)) continue;

      const conditionMet = evaluateCondition(ach.category, ach.condition.type, ach.condition.value, progressData);

      if (conditionMet) {
        newlyUnlocked.push(ach);
        newRecords.push({
          userId,
          achievementId: ach.id,
          unlockedAt: new Date().toISOString(),
          isNotified: false,
        });
      }
    }

    if (newlyUnlocked.length > 0 || newRecords.length > 0) {
      set((state) => ({
        userAchievements: [...state.userAchievements, ...newRecords],
        pendingNotifications: [...state.pendingNotifications, ...newlyUnlocked],
        totalPoints: calculateTotalPoints([
          ...state.userAchievements,
          ...newRecords,
        ], state.achievements),
      }));
    }
  },

  /**
   * 将指定成就标记为"已领取/已通知"
   */
  claimAchievement: (achievementId: string) => {
    set((state) => ({
      userAchievements: state.userAchievements.map((ua) =>
        ua.achievementId === achievementId
          ? { ...ua, isNotified: true }
          : ua
      ),
    }));
  },

  /**
   * 从待通知队列中移除指定成就
   */
  dismissNotification: (achievementId: string) => {
    set((state) => ({
      pendingNotifications: state.pendingNotifications.filter(
        (a) => a.id !== achievementId
      ),
    }));
  },

  /**
   * 遍历已解锁成就，求和 points 得到总积分
   */
  getTotalPoints: (): number => {
    const { userAchievements, achievements } = get();
    return calculateTotalPoints(userAchievements, achievements);
  },
}));

/**
 * 判断单个成就是否满足条件
 *
 * @param category - 成就类别
 * @param conditionType - 条件类型
 * @param threshold - 目标阈值
 * @param data - 进度数据
 * @returns 是否达成
 */
function evaluateCondition(
  category: string,
  conditionType: AchievementConditionType,
  threshold: number,
  data: ProgressDataForAchievement
): boolean {
  let actualValue: number;

  switch (conditionType) {
    case 'days':
      actualValue = data.streakDays;
      break;

    case 'minutes':
      actualValue = data.speakingMinutes;
      break;

    case 'score':
      // 语法类成就用 grammarScore，听力类用 listeningScore
      if (category === 'grammar') {
        actualValue = data.grammarScore;
      } else if (category === 'listening') {
        actualValue = data.listeningScore;
      } else {
        // 其他类别没有 score 字段，默认不满足
        return false;
      }
      break;

    case 'count':
      // count 类型根据成就类别映射到不同的进度字段
      switch (category) {
        case 'vocabulary':
          actualValue = data.totalWords;
          break;
        case 'grammar':
          // 语法 count 用口语次数近似代替（或可扩展为 exerciseCount）
          actualValue = data.speakingCount;
          break;
        case 'speaking':
          actualValue = data.speakingCount;
          break;
        case 'listening':
          actualValue = data.speakingCount; // 可替换为 listeningCount
          break;
        case 'social':
          actualValue = data.socialCount;
          break;
        case 'streak':
          actualValue = data.streakDays;
          break;
        default:
          return false;
      }
      break;

    default:
      return false;
  }

  return actualValue >= threshold;
}

/**
 * 计算总积分
 *
 * @param records - 用户已解锁成就记录
 * @param allAchievements - 全部成就定义（用于查找 points）
 * @returns 总积分
 */
function calculateTotalPoints(
  records: UserAchievementRecord[],
  allAchievements: Achievement[]
): number {
  const pointsMap = new Map(allAchievements.map((a) => [a.id, a.points]));

  return records.reduce((sum, record) => {
    return sum + (pointsMap.get(record.achievementId) ?? 0);
  }, 0);
}

export default useAchievementStore;
