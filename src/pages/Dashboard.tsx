import { useEffect } from 'react';
import WelcomeSection from './dashboard/WelcomeSection';
import StatsCards from './dashboard/StatsCards';
import StudyHeatmap from './dashboard/StudyHeatmap';
import AchievementWall from './dashboard/AchievementWall';
import ActivityTimeline from './dashboard/ActivityTimeline';
import useCourseStore from '@/stores/useCourseStore';

const Dashboard: React.FC = () => {
  const loadCourses = useCourseStore((s) => s.loadCourses);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      {/* 顶部欢迎区 */}
      <WelcomeSection />

      {/* Bento Grid 统计卡片 */}
      <StatsCards />

      {/* 学习日历热力图 + 成就墙（双列） */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <StudyHeatmap />
        <AchievementWall />
      </div>

      {/* 最近学习活动时间线 */}
      <ActivityTimeline />
    </div>
  );
};

export default Dashboard;
