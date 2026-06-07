import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Heart,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  FileText,
  Headphones,
  Mic,
  MessageSquare,
} from 'lucide-react';

import useCourseStore from '@/stores/useCourseStore';
import useProgressStore from '@/stores/useProgressStore';
import { getCourseById } from '@/assets/data/courses';
import type { Chapter } from '@/types/course';
import { LANGUAGE_LEVELS, getLevelByNumber } from '@/constants/levels';
import Badge from '@/components/common/Badge';
import ProgressBar from '@/components/common/ProgressBar';

type TabKey = 'intro' | 'chapters' | 'reviews';

const CATEGORY_LABELS: Record<string, string> = {
  vocabulary: '词汇',
  grammar: '语法',
  conversation: '口语',
  listening: '听力',
  reading: '阅读',
  writing: '写作',
};

const LESSON_ICONS: Record<string, React.ReactNode> = {
  vocabulary: <FileText className="w-4 h-4" />,
  grammar: <FileText className="w-4 h-4" />,
  conversation: <Mic className="w-4 h-4" />,
  listening: <Headphones className="w-4 h-4" />,
};

const MOCK_REVIEWS = [
  { id: '1', user: '学习者A', avatar: '', rating: 5, comment: '课程内容非常系统，讲解清晰易懂！', date: '2025-12-01' },
  { id: '2', user: '语言爱好者B', avatar: '', rating: 4, comment: '适合入门，希望能增加更多实战练习。', date: '2025-11-28' },
  { id: '3', user: '学生C', avatar: '', rating: 5, comment: '老师发音标准，跟着学进步很快。', date: '2025-11-20' },
];

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentCourse, setCurrentCourse } = useCourseStore();
  const { getCourseProgress } = useProgressStore();

  const [activeTab, setActiveTab] = useState<TabKey>('intro');
  const [isFavorited, setIsFavorited] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (id) {
      const course = getCourseById(id);
      if (course) {
        setCurrentCourse(course);
        // 默认展开第一章
        if (course.chapters.length > 0) {
          setExpandedChapters(new Set([course.chapters[0].id]));
        }
      }
    }
  }, [id, setCurrentCourse]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      return next;
    });
  };

  const course = currentCourse;
  const levelConfig = course ? getLevelByNumber(course.level) : null;
  const progress = course ? getCourseProgress(course.id) : 0;

  // 章节进度计算
  const chapterStats = useMemo(() => {
    if (!course) return { completed: 0, total: 0 };
    let completed = 0;
    let total = 0;
    course.chapters.forEach((ch) => {
      ch.lessons.forEach((l) => {
        total++;
        if (l.isCompleted) completed++;
      });
    });
    return { completed, total };
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <p className="text-gray-400">课程未找到</p>
      </div>
    );
  }

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'intro', label: '课程介绍' },
    { key: 'chapters', label: `章节目录 (${course.chapters.length})` },
    { key: 'reviews', label: `学习者评价` },
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] pb-24">
      {/* ─── Hero 区域 ─── */}
      <section className="relative h-[320px] md:h-[400px] overflow-hidden">
        <img
          src={course.coverImage}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/70 to-[#0A1628]/30" />

        <div className="relative h-full max-w-6xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col justify-end pb-8">
          {/* 返回按钮 */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/courses')}
            className="absolute top-6 left-4 md:left-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </motion.button>

          {/* 标签组 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center gap-2 mb-4"
          >
            <Badge
              text={`${course.language.flag} ${course.language.name}`}
              variant={course.language.code === 'ja' ? 'purple' : course.language.code === 'ko' ? 'yellow' : 'default'}
            />
            {levelConfig && (
              <Badge
                text={levelConfig.code}
                variant={(course.level <= 2 ? 'success' : course.level <= 4 ? 'warning' : undefined) as any}
              />
            )}
            <Badge
              text={CATEGORY_LABELS[course.category] || course.category}
              variant="info"
            />
          </motion.div>

          {/* 标题 + 描述 */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
            {course.title}
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-2 mb-5">
            {course.description}
          </p>

          {/* 统计行 */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#FF6B35]" />
              {course.enrolledCount.toLocaleString()} 人已报名
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              {course.rating} 分
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#00D9C0]" />
              共 {course.totalLessons} 课时
            </span>
          </div>

          {/* 主按钮 */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <button
              onClick={() => navigate(`/learn/${course.id}`)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E55525] text-white font-semibold shadow-[0_0_24px_rgba(255,107,53,0.35)] hover:shadow-[0_0_36px_rgba(255,107,53,0.5)] transition-shadow duration-300"
            >
              <Play className="w-5 h-5" />
              开始学习
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── Tab 区 ─── */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 mt-10">
        {/* Tab 导航 */}
        <div className="flex border-b border-white/10 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.key ? 'text-[#FF6B35]' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab 内容 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'intro' && <IntroTab course={course} />}
            {activeTab === 'chapters' && (
              <ChaptersTab
                chapters={course.chapters}
                expandedChapters={expandedChapters}
                onToggleChapter={toggleChapter}
                stats={chapterStats}
                category={course.category}
              />
            )}
            {activeTab === 'reviews' && <ReviewsTab reviews={MOCK_REVIEWS} rating={course.rating} />}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ─── 底部操作栏（粘性） ─── */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A1628]/90 backdrop-blur-xl border-t border-white/10 px-4 py-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setIsFavorited((v) => !v)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
              isFavorited
                ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            {isFavorited ? '已收藏' : '收藏'}
          </button>

          {progress > 0 && (
            <div className="hidden sm:flex items-center gap-3 mr-4">
              <span className="text-sm text-gray-400">总进度</span>
              <div className="w-32">
                <ProgressBar progress={progress} size="sm" color="success" showLabel={false} />
              </div>
              <span className="text-sm font-semibold text-[#00D9C0]">{progress}%</span>
            </div>
          )}

          <button
            onClick={() => navigate(`/learn/${course.id}`)}
            className="inline-flex items-center gap-2 px-8 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E55525] text-white font-semibold shadow-lg hover:shadow-[0_0_24px_rgba(255,107,53,0.4)] transition-shadow"
          >
            <Play className="w-4 h-4" />
            开始学习
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── 课程介绍 Tab ─── */
function IntroTab({ course }: { course: import('@/types/course').Course }) {
  const goals = [
    `掌握 ${course.language.name} ${LANGUAGE_LEVELS.find(l => l.level === course.level)?.name || ''} 核心知识点`,
    `完成 ${course.totalLessons} 节系统化课程，建立完整的知识体系`,
    `通过 ${course.chapters.length} 大章节的循序渐进式学习，提升实际应用能力`,
  ];
  const audience = [
    `${course.language.name} 零基础或有一定基础的学习者`,
    `希望系统性提升 ${course.language.name} 水平的人群`,
    `对 ${CATEGORY_LABELS[course.category] || course.category} 方向有专项需求的学员`,
  ];

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h3 className="text-lg font-bold text-white mb-3">课程简介</h3>
        <p className="text-gray-300 leading-relaxed">{course.description}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-3">📌 学习目标</h3>
        <ul className="space-y-2.5">
          {goals.map((g, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-3">👥 适合人群</h3>
        <ul className="space-y-2.5">
          {audience.map((a, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300">
              <ChevronRight className="w-5 h-5 text-[#7C3AED] mt-0.5 flex-shrink-0" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── 章节目录 Tab ─── */
interface ChaptersTabProps {
  chapters: Chapter[];
  expandedChapters: Set<string>;
  onToggleChapter: (id: string) => void;
  stats: { completed: number; total: number };
  category: string;
}

function ChaptersTab({ chapters, expandedChapters, onToggleChapter, stats, category }: ChaptersTabProps) {
  return (
    <div className="max-w-3xl space-y-4">
      {/* 进度概览 */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
        <span className="text-sm text-gray-400">已完成</span>
        <ProgressBar progress={stats.total > 0 ? (stats.completed / stats.total) * 100 : 0} size="sm" color="success" />
        <span className="text-sm font-medium text-white">
          {stats.completed}/{stats.total} 课
        </span>
      </div>

      {/* 章节列表 */}
      {chapters.map((chapter, idx) => {
        const isExpanded = expandedChapters.has(chapter.id);
        const completedInChapter = chapter.lessons.filter((l) => l.isCompleted).length;

        return (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="rounded-xl bg-white/[0.04] border border-white/10 overflow-hidden"
          >
            {/* 章节头部 */}
            <button
              onClick={() => onToggleChapter(chapter.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FF6B35]/15 text-[#FF6B35] text-sm font-bold">
                  {idx + 1}
                </span>
                <div className="text-left">
                  <h4 className="font-semibold text-white">{chapter.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {chapter.lessons.length} 节课 · 已完成 {completedInChapter}/{chapter.lessons.length}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </motion.div>
            </button>

            {/* 小节列表 */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-1 border-t border-white/5 pt-3">
                    {chapter.lessons.map((lesson, lIdx) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                          lesson.isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5 cursor-pointer'
                        }`}
                      >
                        {lesson.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-[#00D9C0] flex-shrink-0" />
                        ) : lesson.isLocked ? (
                          <Circle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}

                        <span className="text-xs text-gray-500 w-6">{lIdx + 1}</span>

                        <span className={`flex-1 text-sm ${lesson.isCompleted ? 'text-gray-300' : lesson.isLocked ? 'text-gray-600' : 'text-gray-200'}`}>
                          {lesson.title}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          {LESSON_ICONS[category] || <FileText className="w-3.5 h-3.5" />}
                          {lesson.duration}分钟
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── 评价 Tab ─── */
function ReviewsTab({
  reviews,
  rating,
}: {
  reviews: typeof MOCK_REVIEWS;
  rating: number;
}) {
  const distribution = [
    { stars: 5, count: Math.round(reviews.filter(r => r.rating === 5).length / reviews.length * 100), width: '80%' },
    { stars: 4, count: Math.round(reviews.filter(r => r.rating === 4).length / reviews.length * 100), width: '15%' },
    { stars: 3, count: Math.round(reviews.filter(r => r.rating === 3).length / reviews.length * 100), width: '5%' },
    { stars: 2, count: 0, width: '0%' },
    { stars: 1, count: 0, width: '0%' },
  ];

  return (
    <div className="max-w-3xl space-y-8">
      {/* 评分概览 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 p-6 rounded-xl bg-white/[0.04] border border-white/10">
        <div className="text-center">
          <div className="text-5xl font-bold text-white">{rating}</div>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-gray-600'}`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">{reviews.length} 条评价</p>
        </div>

        <div className="flex-1 w-full space-y-2">
          {distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-8">{d.stars} 星</span>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: d.width }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FF6B35]"
                />
              </div>
              <span className="text-xs text-gray-500 w-10 text-right">{d.count}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 评价列表 */}
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="p-5 rounded-xl bg-white/[0.04] border border-white/10"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#7C3AED] flex items-center justify-center text-white text-sm font-bold">
                  {review.user[0]}
                </div>
                <span className="font-medium text-white text-sm">{review.user}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{review.comment}</p>
            <p className="text-xs text-gray-600 mt-2">{review.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
