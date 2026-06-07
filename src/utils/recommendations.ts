import type { Course } from '@/types/course';
import type { TargetLanguage } from '@/types/user';

interface ProgressData {
  completedCourseIds: string[];
  weakCategories: string[];
  lastStudyTimestamp?: number;
}

interface RecommendationResult {
  course: Course;
  reason: string;
  priority: number;
}

/**
 * 基于规则引擎的课程推荐算法
 * @param userLevel - 用户当前等级 (1-6)
 * @param progressData - 用户学习进度数据
 * @param targetLanguage - 目标语言
 * @param allCourses - 所有可用课程
 */
export function generateRecommendations(
  userLevel: number,
  progressData: ProgressData,
  targetLanguage: TargetLanguage,
  allCourses: Course[]
): RecommendationResult[] {
  const recommendations: RecommendationResult[] = [];

  // 过滤目标语言课程
  const languageCourses = allCourses.filter(
    (course) => course.language.code.toLowerCase() === targetLanguage
  );

  // 排除已完成课程
  const availableCourses = languageCourses.filter(
    (course) => !progressData.completedCourseIds.includes(course.id)
  );

  for (const course of availableCourses) {
    let score = 0;
    let reason = '';

    // 规则1: 等级匹配（±1级范围内优先）
    const levelDiff = Math.abs(course.level - userLevel);
    if (levelDiff === 0) {
      score += 50;
      reason = '完全匹配你的当前等级';
    } else if (levelDiff === 1) {
      score += 35;
      reason = `适合你当前水平的进阶课程 (${course.level > userLevel ? '略高' : '略低'})`;
    } else if (levelDiff === 2) {
      score += 15;
      reason = '挑战性课程，可以尝试';
    } else {
      continue; // 等级差距太大，跳过
    }

    // 规则2: 薄弱环节优先
    if (
      progressData.weakCategories.length > 0 &&
      progressData.weakCategories.includes(course.category)
    ) {
      score += 30;
      reason = `强化薄弱环节：${getCategoryName(course.category)}`;
    }

    // 规则3: 课程热度/评分加权
    score += Math.min(Math.floor(course.rating * 5), 25);

    // 规则4: 频率考虑 - 最近未学习的类别获得额外分数
    if (progressData.lastStudyTimestamp) {
      const daysSinceLastStudy =
        (Date.now() - progressData.lastStudyTimestamp) / (1000 * 60 * 60 * 24);
      if (daysSinceLastStudy > 7 && course.category === progressData.weakCategories[0]) {
        score += 10;
        reason += ' · 已有一段时间未练习此类型';
      }
    }

    recommendations.push({
      course,
      reason,
      priority: score,
    });
  }

  // 按优先级降序排序，取前6个
  return recommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 6);
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    conversation: '口语会话',
    grammar: '语法基础',
    vocabulary: '词汇积累',
    listening: '听力训练',
    reading: '阅读理解',
    writing: '写作表达',
  };
  return names[category] || category;
}
