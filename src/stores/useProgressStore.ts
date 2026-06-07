import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Progress, LearningSession } from '@/types/learning';

/**
 * 本周学习数据条目
 */
export interface WeeklyDataItem {
  /** 星期标签（如 "周一"） */
  day: string;
  /** 当天学习分钟数 */
  minutes: number;
}

/**
 * 学习进度状态管理接口
 */
interface ProgressState {
  /** 当前用户的所有课程进度记录 */
  progressList: Progress[];
  /** 正在进行的学习会话 */
  currentSession: LearningSession | null;
  /** 今日累计学习时间（秒） */
  todayStudyTime: number;
  /** 连续学习天数 */
  streakDays: number;
  /** 本周每日学习统计 */
  weeklyData: WeeklyDataItem[];

  /**
   * 为指定用户初始化默认进度数据
   * @param userId - 用户 ID
   */
  initProgress: (userId: string) => void;

  /**
   * 更新某门课程的进度
   * @param courseId - 课程 ID
   * @param data - 需要更新的进度字段
   */
  updateProgress: (
    courseId: string,
    data: Partial<Omit<Progress, 'userId' | 'courseId'>>
  ) => void;

  /**
   * 开始一个新的学习会话
   * @param courseId - 课程 ID
   * @param lessonId - 课时 ID
   * @param type - 学习类型
   */
  startSession: (
    courseId: string,
    lessonId: string,
    type: string
  ) => void;

  /**
   * 结束当前学习会话并记录结果
   * @param sessionData - 会话结束时的统计数据
   */
  endSession: (sessionData?: {
    exercisesCompleted?: number;
    correctCount?: number;
    vocabularyLearned?: string[];
  }) => void;

  /**
   * 获取某门课程的总体进度百分比
   * @param courseId - 课程 ID
   * @returns 完成百分比（0-100），无记录时返回 0
   */
  getCourseProgress: (courseId: string) => number;

  /**
   * 获取本周学习统计摘要
   * @returns 本周学习数据数组
   */
  getWeeklyStats: () => WeeklyDataItem[];
}

/** 生成本周星期标签的辅助函数 */
function generateWeekDays(): WeeklyDataItem[] {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return days.map((day) => ({ day, minutes: 0 }));
}

/**
 * 学习进度状态管理 Store
 *
 * 追踪用户在各课程中的学习进度、学习会话、连续天数和周报数据。
 * 使用 persist 中间件将进度数据持久化到 LocalStorage。
 */
const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      // 初始状态
      progressList: [],
      currentSession: null,
      todayStudyTime: 0,
      streakDays: 0,
      weeklyData: generateWeekDays(),

      /**
       * 为新用户初始化空进度列表
       */
      initProgress: (userId: string) => {
        set({
          progressList: [],
          streakDays: 1,
          todayStudyTime: 0,
          weeklyData: generateWeekDays(),
        });
      },

      /**
       * 更新指定课程的进度记录
       * 若不存在则新建一条记录
       */
      updateProgress: (
        courseId: string,
        data: Partial<Omit<Progress, 'userId' | 'courseId'>>
      ) => {
        set((state) => {
          const existingIndex = state.progressList.findIndex(
            (p) => p.courseId === courseId
          );

          if (existingIndex >= 0) {
            // 更新已有记录
            const updated = [...state.progressList];
            updated[existingIndex] = {
              ...updated[existingIndex],
              ...data,
              lastStudyAt: new Date().toISOString(),
            };
            return { progressList: updated };
          }

          // 创建新记录
          const newProgress: Progress = {
            userId: '',
            courseId,
            completionPercent: 0,
            score: 0,
            studyTime: 0,
            vocabularyMastered: [],
            mistakes: [],
            lastStudyAt: new Date().toISOString(),
            streakDays: 1,
            ...data,
          };

          return {
            progressList: [...state.progressList, newProgress],
          };
        });
      },

      /**
       * 启动一个学习会话，记录开始时间
       */
      startSession: (
        courseId: string,
        _lessonId: string,
        _type: string
      ) => {
        const session: LearningSession = {
          id: `session_${Date.now()}`,
          userId: '',
          courseId,
          startTime: new Date().toISOString(),
          endTime: null,
          duration: 0,
          exercisesCompleted: 0,
          correctCount: 0,
          vocabularyLearned: [],
          progressBefore: 0,
          progressAfter: 0,
        };

        // 获取该课程之前的进度作为 baseline
        const prevProgress = get().progressList.find(
          (p) => p.courseId === courseId
        );
        session.progressBefore = prevProgress?.completionPercent ?? 0;

        set({ currentSession: session });
      },

      /**
       * 结束当前会话：计算时长、更新今日学习时间与周数据
       */
      endSession: (sessionData) => {
        const { currentSession } = get();
        if (!currentSession) return;

        const endTime = new Date().toISOString();
        const startTime = new Date(currentSession.startTime).getTime();
        const endMs = new Date(endTime).getTime();
        const durationMinutes = Math.round((endMs - startTime) / 60000);

        const completedSession: LearningSession = {
          ...currentSession,
          endTime,
          duration: durationMinutes,
          exercisesCompleted:
            sessionData?.exercisesCompleted ??
            currentSession.exercisesCompleted,
          correctCount:
            sessionData?.correctCount ?? currentSession.correctCount,
          vocabularyLearned:
            sessionData?.vocabularyLearned ??
            currentSession.vocabularyLearned,
        };

        // 更新今日学习时间（转为秒）
        const addedSeconds = durationMinutes * 60;

        set((state) => {
          // 更新周数据：在当天对应的索引上累加分钟数
          const todayIndex = new Date().getDay(); // 0=周日
          const adjustedIndex = todayIndex === 0 ? 6 : todayIndex - 1; // 转为周一=0

          const updatedWeekly = [...state.weeklyData];
          if (adjustedIndex >= 0 && adjustedIndex < updatedWeekly.length) {
            updatedWeekly[adjustedIndex] = {
              ...updatedWeekly[adjustedIndex],
              minutes: updatedWeekly[adjustedIndex].minutes + durationMinutes,
            };
          }

          return {
            currentSession: null,
            todayStudyTime: state.todayStudyTime + addedSeconds,
            weeklyData: updatedWeekly,
          };
        });
      },

      /**
       * 查询某门课程的完成百分比
       */
      getCourseProgress: (courseId: string): number => {
        const progress = get().progressList.find(
          (p) => p.courseId === courseId
        );
        return progress?.completionPercent ?? 0;
      },

      /**
       * 返回本周每天的学习时长统计
       */
      getWeeklyStats: (): WeeklyDataItem[] => {
        return get().weeklyData;
      },
    }),
    {
      name: 'linguaflow-progress',
      partialize: (state) => ({
        progressList: state.progressList,
        todayStudyTime: state.todayStudyTime,
        streakDays: state.streakDays,
        weeklyData: state.weeklyData,
      }),
    }
  )
);

export default useProgressStore;
