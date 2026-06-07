import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Filter,
} from 'lucide-react';

import useCourseStore from '@/stores/useCourseStore';
import useAuthStore from '@/stores/useAuthStore';
import useProgressStore from '@/stores/useProgressStore';
import { SUPPORTED_LANGUAGES } from '@/constants/languages';
import { LANGUAGE_LEVELS } from '@/constants/levels';
import type { CourseCategory } from '@/types/course';
import Badge from '@/components/common/Badge';
import ProgressBar from '@/components/common/ProgressBar';

const CATEGORIES: { value: CourseCategory | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'vocabulary', label: '词汇' },
  { value: 'grammar', label: '语法' },
  { value: 'conversation', label: '口语' },
  { value: 'listening', label: '听力' },
  { value: 'reading', label: '阅读' },
  { value: 'writing', label: '写作' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Courses() {
  const navigate = useNavigate();
  const { loadCourses, getFilteredCourses, filterByLanguage, filterByLevel, setSearchQuery } =
    useCourseStore();
  const { isAuthenticated } = useAuthStore();
  const { getCourseProgress } = useProgressStore();

  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const filteredCourses = useMemo(() => {
    let courses = getFilteredCourses();
    if (selectedCategory !== 'all') {
      courses = courses.filter((c) => c.category === selectedCategory);
    }
    return courses;
  }, [getFilteredCourses, selectedCategory]);

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    setSearchQuery(value);
  };

  const handleLanguageFilter = (code: string | null) => {
    filterByLanguage(code);
  };

  const handleLevelFilter = (level: number | null) => {
    filterByLevel(level);
  };

  return (
    <div className="min-h-screen bg-[#0A1628] pb-20">
      {/* Hero 标题区 */}
      <section className="relative overflow-hidden px-4 pt-12 pb-10 md:px-8 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 via-transparent to-[#7C3AED]/10" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            探索课程
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl">
            在知识海洋中遨游，发现适合你的多语种学习之旅
          </p>

          {/* 搜索框 */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索课程名称或描述..."
              value={localSearch}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50 focus:bg-white/8 transition-all duration-300"
            />
          </div>
        </motion.div>
      </section>

      {/* 筛选栏 */}
      <section className="px-4 md:px-8 lg:px-16 mb-8">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* 语言筛选 */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500 mr-2">语言:</span>
            <button
              onClick={() => handleLanguageFilter(null)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-[#FF6B35] text-white"
            >
              全部
            </button>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageFilter(lang.code)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-white/5 text-gray-300 border border-white/10 hover:border-white/30 hover:bg-white/10"
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>

          {/* 级别筛选 + 分类筛选 + 计数 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 mr-1">级别:</span>
              <button
                onClick={() => handleLevelFilter(null)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all bg-[#00D9C0]/20 text-[#00D9C0] border border-[#00D9C0]/30"
              >
                全部
              </button>
              {LANGUAGE_LEVELS.map((lvl) => (
                <button
                  key={lvl.code}
                  onClick={() => handleLevelFilter(lvl.level)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all bg-white/5 text-gray-300 border border-white/10 hover:border-white/30"
                  style={{ borderColor: `${lvl.color}30`, color: lvl.color }}
                >
                  {lvl.code}
                </button>
              ))}
            </div>

            <div className="sm:ml-auto flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as CourseCategory | 'all')
                }
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-[#FF6B35]/50 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              <span className="text-sm text-gray-400 whitespace-nowrap">
                共 <span className="font-semibold text-[#FF6B35]">{filteredCourses.length}</span> 门课程
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 课程网格 */}
      <section className="px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredCourses.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <BookOpen className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">没有找到匹配的课程</h3>
                <p className="text-gray-500">尝试调整筛选条件或搜索关键词</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    progress={isAuthenticated ? getCourseProgress(course.id) : 0}
                    isAuthenticated={isAuthenticated}
                    onClick={() => navigate(`/courses/${course.id}`)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

/* ─── 课程卡片子组件 ─── */
interface CourseCardProps {
  course: import('@/types/course').Course;
  progress: number;
  isAuthenticated: boolean;
  onClick: () => void;
}

function CourseCard({ course, progress, isAuthenticated, onClick }: CourseCardProps) {
  const levelConfig = LANGUAGE_LEVELS.find((l) => l.level === course.level);
  const hasProgress = progress > 0;

  const languageVariantMap: Record<string, 'default' | 'purple' | 'yellow'> = {
    en: 'default',
    ja: 'purple',
    ko: 'yellow',
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
    >
      {/* 封面图 */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />

        {/* Badge 组 */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            text={levelConfig?.code || `L${course.level}`}
            variant={
              (course.level <= 2 ? 'success' : course.level <= 4 ? 'warning' : undefined) as any
            }
          />
          <Badge
            text={`${course.language.flag} ${course.language.name}`}
            variant={languageVariantMap[course.language.code] || 'default'}
          />
        </div>

        {/* 进度覆盖层 */}
        {hasProgress && (
          <div className="absolute bottom-3 left-3 right-3">
            <ProgressBar progress={progress} size="sm" color="success" />
          </div>
        )}
      </div>

      {/* 内容区 */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-[#FF6B35] transition-colors duration-200">
          {course.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* 元信息行 */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.chapters.length} 章节
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {course.enrolledCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.totalLessons} 课时
          </span>
        </div>

        {/* 评分 + 操作按钮 */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
            <span className="text-sm font-semibold text-white">{course.rating}</span>
          </div>

          {hasProgress ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00D9C0]">
              <Play className="w-4 h-4" />
              继续学习
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#FF6B35]">
              <Play className="w-4 h-4" />
              开始学习
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
