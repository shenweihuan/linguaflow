import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flame, Clock, Play } from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import { formatTime } from '@/utils/formatters';
import useAuthStore from '@/stores/useAuthStore';
import useProgressStore from '@/stores/useProgressStore';
import useCourseStore from '@/stores/useCourseStore';

const WelcomeSection: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const streakDays = useProgressStore((s) => s.streakDays);
  const todayStudyTime = useProgressStore((s) => s.todayStudyTime);
  const courses = useCourseStore((s) => s.courses);
  const navigate = useNavigate();

  // 找到最近学习的课程（取进度列表中最近学习的）
  const progressList = useProgressStore((s) => s.progressList);
  const lastStudied = progressList.length > 0
    ? [...progressList].sort((a, b) =>
        new Date(b.lastStudyAt).getTime() - new Date(a.lastStudyAt).getTime()
      )[0]
    : null;
  const recentCourse = lastStudied
    ? courses.find((c) => c.id === lastStudied.courseId)
    : courses[0];

  const handleContinueLearning = () => {
    if (recentCourse) {
      navigate(`/learn/${recentCourse.id}/vocabulary`);
    }
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0A1628] via-[#1A2744] to-[#0A1628] border border-white/10 relative overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B35]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-32 w-48 h-48 bg-[#00D9C0]/5 rounded-full blur-3xl" />

      <div className="flex items-center gap-4 relative z-10">
        <Avatar src={user.avatar} size="xl" name={user.nickname} />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-heading">
            欢迎回来，<span className="gradient-text">{user.nickname}</span>！
          </h1>
          <p className="text-gray-400 mt-1">继续你的语言学习之旅</p>

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {/* 连续学习天数 */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF6B35]/15 border border-[#FF6B35]/30">
              <Flame className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm font-semibold text-[#FF6B35]">{streakDays}天连续</span>
            </div>

            {/* 今日学习时间 */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00D9C0]/15 border border-[#00D9C0]/30">
              <Clock className="w-4 h-4 text-[#00D9C0]" />
              <span className="text-sm font-semibold text-[#00D9C0]">
                今日 {formatTime(Math.round(todayStudyTime / 60))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 继续学习按钮 */}
      {recentCourse && (
        <Button
          variant="primary"
          size="lg"
          leftIcon={<Play className="w-5 h-5" />}
          onClick={handleContinueLearning}
          className="relative z-10 shrink-0"
        >
          继续学习
        </Button>
      )}
    </motion.div>
  );
};

export default WelcomeSection;
