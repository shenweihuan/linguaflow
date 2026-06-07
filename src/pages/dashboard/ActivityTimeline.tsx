import { motion } from 'framer-motion';
import { BookOpen, Headphones, PenTool, MessageCircle, Clock, Target } from 'lucide-react';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { formatDate } from '@/utils/formatters';

interface ActivityItem {
  id: string;
  time: Date;
  courseName: string;
  moduleType: 'vocabulary' | 'grammar' | 'listening' | 'speaking';
  moduleName: string;
  duration: number; // 分钟
  score: number;
}

// 模拟最近学习活动数据
const mockActivities: ActivityItem[] = [
  {
    id: '1',
    time: new Date(Date.now() - 1000 * 60 * 30),
    courseName: '英语日常会话入门',
    moduleType: 'vocabulary',
    moduleName: '问候与自我介绍',
    duration: 18,
    score: 95,
  },
  {
    id: '2',
    time: new Date(Date.now() - 1000 * 60 * 60 * 3),
    courseName: '日语五十音图速成',
    moduleType: 'vocabulary',
    moduleName: '平假名（上）',
    duration: 25,
    score: 88,
  },
  {
    id: '3',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24),
    courseName: '英语语法精讲 A2-B1',
    moduleType: 'grammar',
    moduleName: '时态系统（一）',
    duration: 32,
    score: 82,
  },
  {
    id: '4',
    time: new Date(Date.now() - 1000 * 60 * 60 * 48),
    courseName: '韩语字母与发音',
    moduleType: 'listening',
    moduleName: '元音（모음）',
    duration: 15,
    score: 90,
  },
  {
    id: '5',
    time: new Date(Date.now() - 1000 * 60 * 60 * 72),
    courseName: '英语日常会话入门',
    moduleType: 'speaking',
    moduleName: '实战练习：初次见面对话',
    duration: 20,
    score: 78,
  },
];

const moduleIcons: Record<ActivityItem['moduleType'], React.ReactNode> = {
  vocabulary: <BookOpen className="w-4 h-4 text-[#00D9C0]" />,
  grammar: <PenTool className="w-4 h-4 text-[#7C3AED]" />,
  listening: <Headphones className="w-4 h-4 text-[#F59E0B]" />,
  speaking: <MessageCircle className="w-4 h-4 text-[#FF6B35]" />,
};

const moduleLabels: Record<ActivityItem['moduleType'], string> = {
  vocabulary: '词汇',
  grammar: '语法',
  listening: '听力',
  speaking: '口语',
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

const ActivityTimeline: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
    >
      <Card glass>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#9C27B0]" />
          <h3 className="text-lg font-semibold text-white">最近学习活动</h3>
        </div>

        <div className="relative">
          {/* 时间线竖线 */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#FF6B35]/40 via-[#00D9C0]/30 to-transparent" />

          <div className="space-y-4">
            {mockActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="relative flex gap-4 pl-2"
              >
                {/* 图标节点 */}
                <div className="relative z-10 w-10 h-10 rounded-full bg-[#1A2744] border border-white/10 flex items-center justify-center shrink-0">
                  {moduleIcons[activity.moduleType]}
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0 pb-2">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h4 className="text-sm font-medium text-white truncate">
                        {activity.courseName}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <Badge
                          text={moduleLabels[activity.moduleType]}
                          variant={
                            activity.moduleType === 'vocabulary'
                              ? 'success'
                              : activity.moduleType === 'grammar'
                              ? 'purple'
                              : activity.moduleType === 'listening'
                              ? 'yellow'
                              : 'default'
                          }
                        />
                        <span className="text-xs text-gray-500">{activity.moduleName}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(activity.time)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.duration}分钟
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      得分 {activity.score}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityTimeline;
