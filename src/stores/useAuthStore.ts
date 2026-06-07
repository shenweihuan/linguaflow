import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserPreferences, TargetLanguage } from '@/types/user';
import { MOCK_USERS } from '@/assets/data/users';

/**
 * 认证状态管理接口
 */
interface AuthState {
  /** 当前登录用户 */
  user: User | null;
  /** 是否已认证 */
  isAuthenticated: boolean;
  /** 加载状态 */
  isLoading: boolean;

  /**
   * 模拟登录验证
   * @param email - 用户邮箱
   * @param password - 用户密码
   * @returns 登录是否成功
   */
  login: (email: string, password: string) => Promise<boolean>;

  /**
   * 注册新用户
   * @param userData - 新用户数据（不含 id 和 createdAt）
   */
  register: (userData: {
    email: string;
    password: string;
    nickname: string;
    avatar: string;
    targetLanguage: TargetLanguage;
    level: number;
    preferences?: Partial<UserPreferences>;
  }) => Promise<User>;

  /**
   * 登出，清除用户状态
   */
  logout: () => void;

  /**
   * 更新用户信息
   * @param data - 需要更新的字段
   */
  updateProfile: (data: Partial<Pick<User, 'nickname' | 'avatar' | 'targetLanguage' | 'level' | 'preferences'>>) => void;
}

/**
 * 认证状态管理 Store
 *
 * 管理用户的登录、注册、登出和资料更新操作。
 * 使用 persist 中间件将认证状态持久化到 LocalStorage。
 */
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 初始状态
      user: null,
      isAuthenticated: false,
      isLoading: false,

      /**
       * 模拟登录：从 mock 数据中匹配邮箱和密码
       */
      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true });

        // 模拟网络延迟
        await new Promise((resolve) => setTimeout(resolve, 800));

        const matchedUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (matchedUser) {
          set({
            user: matchedUser,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      /**
       * 注册新用户（模拟）
       */
      register: async (
        userData: {
          email: string;
          password: string;
          nickname: string;
          avatar: string;
          targetLanguage: TargetLanguage;
          level: number;
          preferences?: Partial<UserPreferences>;
        }
      ): Promise<User> => {
        set({ isLoading: true });

        // 模拟网络延迟
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newUser: User = {
          id: `user_${Date.now()}`,
          email: userData.email,
          password: userData.password,
          nickname: userData.nickname,
          avatar: userData.avatar,
          targetLanguage: userData.targetLanguage,
          level: userData.level,
          totalStudyTime: 0,
          createdAt: new Date().toISOString(),
          preferences: {
            dailyGoal: userData.preferences?.dailyGoal ?? 30,
            reminderEnabled: userData.preferences?.reminderEnabled ?? true,
            soundEnabled: userData.preferences?.soundEnabled ?? true,
          },
        };

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });

        return newUser;
      },

      /**
       * 登出：清除所有认证状态
       */
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      /**
       * 更新当前用户信息
       */
      updateProfile: (data) => {
        set((state) => {
          if (!state.user) return state;

          return {
            user: {
              ...state.user,
              ...data,
              ...(data.preferences && {
                preferences: { ...state.user.preferences, ...data.preferences },
              }),
            },
          };
        });
      },
    }),
    {
      name: 'linguaflow-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
