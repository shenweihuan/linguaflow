import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { useNavigate } from 'react-router-dom';
import useCourseStore from '@/stores/useCourseStore';
import useAuthStore from '@/stores/useAuthStore';

interface Recommendation {
  course: ReturnType<typeof useCourseStore.getState>['courses'][0];
  reason: string;
  reasonVariant: 'success' | 'info' | 'warning' | 'purple';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const RecommendedPaths: React.FC = () => {
  const courses = useCourseStore((s) => s.courses);
  const loadCourses = useCourseStore((s) => s.loadCourses);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!courses.length) loadCourses();
  }, [courses.length, loadCourses]);

  // 根据用户等级和语言生成推荐
  const recommendations: Recommendation[] = (() => {
    // 筛选同语言的课程，排除用户当前水平以下的
    const relevantCourses = courses.filter(
      (c) =>
        (!user || c.language.code === user.targetLanguage) &&
        (!user || c.level >= (user.level > 1 ? user.level - 1 : 1))
    );

    const recs: Recommendation[] = [];

    // 推荐1：基于当前水平的课程
    const levelMatch = relevantCourses.find(
      (c) => user && c.level === user.level && c.category !== 'reading'
    );
    if (levelMatch) {
      recs.push({
        course: levelMatch,
        reason: `基于你的${levelMatch.language.nativeName}${getLevelLabel(levelMatch.level)}水平推荐`,
        reasonVariant: 'success',
      });
    }

    // 推荐2：语法薄弱环节
    const grammarCourse = relevantCourses.find((c) => c.category === 'grammar');
    if (grammarCourse) {
      recs.push({
        course: grammarCourse,
        reason: '你的语法薄弱环节建议加强',
        reasonVariant: 'warning',
      });
    }

    // 推荐3：热门课程推荐
    const popularCourse = [...relevantCourses]
      .sort((a, b) => b.enrolledCount - a.enrolledCount)
      .find((c) => !recs.some((r) => r.course.id === c.id));
    if (popularCourse) {
      recs.push({
        course: popularCourse,
        reason: `热门课程 · ${popularCourse.enrolledCount.toLocaleString()}人在学`,
        reasonVariant: 'info',
      });
    }

    // 推荐4：进阶课程
    const advancedCourse = relevantCourses.find(
      (c) => user && c.level === Math.min(user.level + 1, 6)
    );
    if (advancedCourse && !recs.some((r) => r.course.id === advancedCourse.id)) {
      recs.push({
        course: advancedCourse,
        reason: '挑战更高难度，突破自我',
        reasonVariant: 'purple',
      });
    }

    return recs.slice(0, 4);
  })();

  const handleStartLearning = (courseId: string) => {
    navigate(`/learn/${courseId}/vocabulary`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card glass padding="xl">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#7C3AED]" />
          <h3 className="text-lg font-semibold text-white">个性化学习路径推荐</h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {recommendations.map(({ course, reason, reasonVariant }) => (
            <motion.div key={course.id} variants={itemVariants}>
              <div className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/8 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300">
                {/* 课程封面 */}
                <div className="relative shrink-0 overflow-hidden rounded-xl sm:w-36 h-24">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge
                      text={`${course.language.flag} ${course.language.name}`}
                      variant={
                        course.language.code === 'ja'
                          ? 'purple'
                          : course.language.code === 'ko'
                          ? 'yellow'
                          : 'info'
                      }
                    />
                  </div>
                </div>

                {/* 课程信息 */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="font-semibold text-white text-sm line-clamp-1 group-hover:text-[#FF6B35] transition-colors">
                      {course.title}
                    </h4>
                    <div className="mt-1.5">
                      <Badge text={reason} variant={reasonVariant} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 line-clamp-1">{course.description}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {course.totalLessons}课时 · ⭐ {course.rating}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      onClick={() => handleStartLearning(course.id)}
                    >
                      开始学习
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {recommendations.length === 0 && (
          <p className="text-center text-gray-500 py-8">暂无推荐课程，请先选择目标语言</p>
        )}
      </Card>
    </motion.div>
  );
};

function getLevelLabel(level: number): string {
  const labels: Record<number, string> = {
    1: 'A1', 2: 'A2', 3: 'B1', 4: 'B2', 5: 'C1', 6: 'C2',
  };
  return labels[level] || '';
}

export default RecommendedPaths;
