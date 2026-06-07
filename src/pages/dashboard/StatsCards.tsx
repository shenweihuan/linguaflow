import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { BarChart3, BookOpen, Target, TrendingUp } from 'lucide-react';
import Card from '@/components/common/Card';
import ProgressBar from '@/components/common/ProgressBar';
import AnimatedNumber from './AnimatedNumber';
import CircularProgress from './CircularProgress';
import useProgressStore from '@/stores/useProgressStore';
import useCourseStore from '@/stores/useCourseStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/** 本周学习时长柱状图 */
const WeeklyStudyCard: React.FC = () => {
  const weeklyData = useProgressStore((s) => s.weeklyData);
  const todayIndex = new Date().getDay();
  const adjustedToday = todayIndex === 0 ? 6 : todayIndex - 1;

  return (
    <motion.div variants={itemVariants} className="lg:col-span-2">
      <Card className="h-full" glass>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#FF6B35]" />
            <h3 className="text-lg font-semibold text-white">本周学习时长</h3>
          </div>
          <span className="text-sm text-gray-400">分钟</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="day"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: '#1A2744',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
              }}
              formatter={(value: number) => [`${value}分钟`, '学习时长']}
            />
            <Bar dataKey="minutes" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {weeklyData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === adjustedToday ? '#FF6B35' : 'rgba(0, 217, 192, 0.7)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
};

/** 课程总进度卡片 */
const CourseProgressCard: React.FC = () => {
  const courses = useCourseStore((s) => s.courses);
  const getCourseProgress = useProgressStore((s) => s.getCourseProgress);

  const totalCourses = courses.length;
  // 计算平均进度
  const avgProgress =
    totalCourses > 0
      ? Math.round(
          courses.reduce((sum, c) => sum + getCourseProgress(c.id), 0) / totalCourses
        )
      : 0;

  return (
    <motion.div variants={itemVariants}>
      <Card className="h-full" glass>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-[#00D9C0]" />
          <h3 className="text-lg font-semibold text-white">课程总进度</h3>
        </div>

        <div className="flex items-center gap-6">
          <CircularProgress progress={avgProgress} size={110} strokeWidth={8} color="#00D9C0">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">{avgProgress}%</span>
            </div>
          </CircularProgress>

          <div className="flex-1 space-y-2 min-w-0">
            <p className="text-sm text-gray-400">
              已学 <span className="text-white font-medium">{courses.filter(c => getCourseProgress(c.id) > 0).length}</span> / {totalCourses} 门课程
            </p>
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 truncate">{course.title}</span>
                  <span className="text-gray-400 shrink-0 ml-2">{getCourseProgress(course.id)}%</span>
                </div>
                <ProgressBar
                  progress={getCourseProgress(course.id)}
                  color="success"
                  size="sm"
                  animated={false}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

/** 单词掌握量卡片 */
const VocabularyCard: React.FC = () => {
  const learned = 347; // 模拟数据
  const goal = 1000;

  return (
    <motion.div variants={itemVariants}>
      <Card className="h-full" glass>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#7C3AED]" />
          <h3 className="text-lg font-semibold text-white">单词掌握量</h3>
        </div>

        <div className="space-y-4">
          <div>
            <AnimatedNumber value={learned} className="text-4xl font-bold text-white" />
            <span className="text-lg text-gray-400 ml-1">/ {goal.toLocaleString()}</span>
          </div>
          <ProgressBar progress={(learned / goal) * 100} color="accent" size="lg" showLabel={false} />
          <p className="text-sm text-gray-400">
            再学 <span className="text-[#FF6B35] font-medium">{goal - learned}</span> 个单词达成目标
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

/** 平均得分卡片 */
const AverageScoreCard: React.FC = () => {
  const score = 87; // 模拟数据
  const trend = 'up' as const;

  return (
    <motion.div variants={itemVariants}>
      <Card className="h-full" glass>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#F59E0B]" />
          <h3 className="text-lg font-semibold text-white">平均得分</h3>
        </div>

        <div className="flex items-center gap-5">
          <CircularProgress
            progress={score}
            size={100}
            strokeWidth={8}
            color="#F59E0B"
          >
            <div className="text-center">
              <span className="text-xl font-bold text-white">{score}</span>
            </div>
          </CircularProgress>

          <div>
            <p className="text-sm text-gray-400 mb-1">最近10次练习</p>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              trend === 'up' ? 'text-[#00D9C0]' : 'text-red-400'
            }`}>
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingUp className="w-4 h-4 rotate-180" />
              )}
              较上周 +3%
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

/** Bento Grid 统计卡片区主组件 */
const StatsCards: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
    >
      <WeeklyStudyCard />
      <CourseProgressCard />
      <VocabularyCard />
      <AverageScoreCard />
    </motion.div>
  );
};

export default StatsCards;
