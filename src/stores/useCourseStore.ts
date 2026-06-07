import { create } from 'zustand';
import type { Course, LanguageLevel } from '@/types/course';
import { MOCK_COURSES } from '@/assets/data/courses';

/**
 * 课程状态管理接口
 */
interface CourseState {
  /** 所有课程列表 */
  courses: Course[];
  /** 当前选中的课程 */
  currentCourse: Course | null;
  /** 当前筛选的语言代码 */
  selectedLanguage: string | null;
  /** 当前筛选的等级 */
  selectedLevel: number | null;
  /** 搜索关键词 */
  searchQuery: string;

  /**
   * 从 mock 数据加载课程列表
   */
  loadCourses: () => void;

  /**
   * 设置当前选中课程
   * @param course - 课程对象或 null
   */
  setCurrentCourse: (course: Course | null) => void;

  /**
   * 按语言筛选课程
   * @param language - 语言代码（如 'en', 'ja', 'ko'），传 null 清除筛选
   */
  filterByLanguage: (language: string | null) => void;

  /**
   * 按等级筛选课程
   * @param level - 语言等级（1-6），传 null 清除筛选
   */
  filterByLevel: (level: number | null) => void;

  /**
   * 设置搜索关键词
   * @param query - 搜索文本
   */
  setSearchQuery: (query: string) => void;

  /**
   * 获取经过语言、等级、搜索词筛选后的课程列表
   * @returns 筛选后的课程数组
   */
  getFilteredCourses: () => Course[];
}

/**
 * 课程状态管理 Store
 *
 * 管理课程的加载、选择、筛选（按语言/等级）和搜索功能。
 * 提供组合筛选方法返回符合条件的课程列表。
 */
const useCourseStore = create<CourseState>()((set, get) => ({
  // 初始状态
  courses: [],
  currentCourse: null,
  selectedLanguage: null,
  selectedLevel: null,
  searchQuery: '',

  /**
   * 从 courses.ts 的 mock 数据加载全部课程
   */
  loadCourses: () => {
    set({ courses: MOCK_COURSES });
  },

  /**
   * 设置当前查看的课程详情
   */
  setCurrentCourse: (course: Course | null) => {
    set({ currentCourse: course });
  },

  /**
   * 按目标语言代码筛选
   */
  filterByLanguage: (language: string | null) => {
    set({ selectedLanguage: language });
  },

  /**
   * 按 CEFR 等级筛选（A1=1 ... C2=6）
   */
  filterByLevel: (level: number | null) => {
    set({ selectedLevel: level });
  },

  /**
   * 更新搜索关键词（用于标题/描述模糊匹配）
   */
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  /**
   * 组合所有筛选条件，返回最终课程列表
   *
   * 筛选优先级：
   * 1. 语言筛选 → 2. 等级筛选 → 3. 关键词搜索
   */
  getFilteredCourses: (): Course[] => {
    const { courses, selectedLanguage, selectedLevel, searchQuery } = get();

    let result = [...courses];

    // 按语言筛选
    if (selectedLanguage) {
      result = result.filter(
        (course) => course.language.code === selectedLanguage
      );
    }

    // 按等级筛选
    if (selectedLevel !== null) {
      result = result.filter(
        (course) => course.level === (selectedLevel as LanguageLevel)
      );
    }

    // 按关键词搜索（匹配标题和描述）
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
      );
    }

    return result;
  },
}));

export default useCourseStore;
