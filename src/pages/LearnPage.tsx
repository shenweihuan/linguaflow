import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  PenTool,
  Mic,
  Headphones,
  ArrowLeft,
  Clock,
  Trophy,
  Sparkles,
} from 'lucide-react';
import useProgressStore from '@/stores/useProgressStore';
import useCourseStore from '@/stores/useCourseStore';
import { getVocabularyByLanguage } from '@/assets/data/vocabulary';
import { getGrammarByLanguage } from '@/assets/data/grammar';
import { getListeningByLanguage } from '@/assets/data/listening';

const modules = [
  {
    id: 'vocabulary',
    title: '单词记忆',
    icon: BookOpen,
    description: '闪卡式记忆，高效掌握核心词汇',
    path: 'vocabulary',
    color: '#FF6B35',
    bgGradient: 'from-[#FF6B35]/20 to-[#FF6B35]/5',
    borderGlow: 'hover:border-[#FF6B35]/50 hover:shadow-[0_0_30px_rgba(255,107,53,0.15)]',
    iconBg: 'bg-[#FF6B35]/15 text-[#FF6B35]',
  },
  {
    id: 'grammar',
    title: '语法练习',
    icon: PenTool,
    description: '互动式题目，巩固语法知识体系',
    path: 'grammar',
    color: '#00D9C0',
    bgGradient: 'from-[#00D9C0]/20 to-[#00D9C0]/5',
    borderGlow: 'hover:border-[#00D9C0]/50 hover:shadow-[0_0_30px_rgba(0,217,192,0.15)]',
    iconBg: 'bg-[#00D9C0]/15 text-[#00D9C0]',
  },
  {
    id: 'speaking',
    title: '口语跟读',
    icon: Mic,
    description: 'AI发音评分，提升口语表达能力',
    path: 'speaking',
    color: '#A78BFA',
    bgGradient: 'from-[#A78BFA]/20 to-[#A78BFA]/5',
    borderGlow: 'hover:border-[#A78BFA]/50 hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]',
    iconBg: 'bg-[#A78BFA]/15 text-[#A78BFA]',
  },
  {
    id: 'listening',
    title: '听力训练',
    icon: Headphones,
    description: '真实场景音频，锻炼听力理解能力',
    path: 'listening',
    color: '#FBBF24',
    bgGradient: 'from-[#FBBF24]/20 to-[#FBBF24]/5',
    borderGlow: 'hover:border-[#FBBF24]/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]',
    iconBg: 'bg-[#FBBF24]/15 text-[#FBBF24]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function CircularProgress({ percentage, size = 80 }: { percentage: number; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#00D9C0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-white">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}

export default function LearnPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { currentCourse } = useCourseStore();
  const { todayStudyTime, getCourseProgress } = useProgressStore();

  const course = currentCourse;
  const progress = courseId ? getCourseProgress(courseId) : 0;
  const studyMinutes = Math.floor(todayStudyTime / 60);

  const vocabularyList = course ? getVocabularyByLanguage(course.language.code) : [];
  const grammarList = course ? getGrammarByLanguage(course.language.code) : [];
  const listeningList = course ? getListeningByLanguage(course.language.code) : [];

  const vocabMastered = vocabularyList.filter((v) => v.mastery === 'mastered').length;
  const weakModule = modules.find((m) => {
    if (m.id === 'vocabulary') return vocabMastered < vocabularyList.length * 0.5;
    if (m.id === 'grammar') return true;
    return false;
  }) || modules[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-20 backdrop-blur-xl bg-[#0A1628]/80 border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">返回课程</span>
          </button>

          <h1 className="font-heading text-lg sm:text-xl font-bold text-white truncate max-w-[200px] sm:max-w-none">
            {course?.title || '学习中心'}
          </h1>

          <div className="flex items-center gap-4">
            <CircularProgress percentage={progress} size={56} />
            <div className="hidden sm:flex items-center gap-1.5 text-gray-400">
              <Clock className="w-4 h-4 text-[#00D9C0]" />
              <span className="text-sm">{studyMinutes}分钟</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-20">
        {/* Module Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10"
        >
          {modules.map((module) => {
            const Icon = module.icon;
            let stats = '';
            if (module.id === 'vocabulary') stats = `${vocabMastered}/${vocabularyList.length} 已学`;
            else if (module.id === 'grammar') stats = `${Math.floor(grammarList.length * 0.3)} 题完成`;
            else if (module.id === 'speaking') stats = `${Math.floor(Math.random() * 10)} 次练习`;
            else if (module.id === 'listening') stats = `${Math.floor(listeningList.length * 0.4)} 段完成`;

            return (
              <motion.div key={module.id} variants={itemVariants}>
                <Link
                  to={module.path}
                  className={`block rounded-2xl bg-gradient-to-br ${module.bgGradient} border border-white/10 ${module.borderGlow} p-6 transition-all duration-300 group`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl ${module.iconBg} flex items-center justify-center`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs text-gray-500">{stats}</span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-opacity-90 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{module.description}</p>

                  <div className="mt-4 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: module.color }}>
                    <span>开始学习</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Today's Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-2xl bg-gradient-to-r from-[#FF6B35]/10 via-purple-500/10 to-[#00D9C0]/10 border border-white/10 p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#E55525] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-[#FF6B35]" />
                <h3 className="font-heading font-bold text-white">今日推荐</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                根据你的学习进度，建议优先完成「{weakModule.title}」模块，这是当前最需要加强的部分。
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#00D9C0]"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, progress + 15)}%` }}
                    transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">每日任务</span>
              </div>
            </div>
            <Link
              to={weakModule.path}
              className="px-4 py-2 rounded-full bg-[#FF6B35] text-white text-sm font-semibold hover:bg-[#E55525] transition-colors flex-shrink-0"
            >
              去练习
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
