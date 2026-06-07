import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Trophy, Sparkles } from 'lucide-react';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import useAchievementStore from '@/stores/useAchievementStore';
import { ACHIEVEMENTS, RARITY_COLORS } from '@/assets/data/achievements';
import type { AchievementRarity } from '@/types/achievement';

const rarityBorderColors: Record<AchievementRarity, string> = {
  common: 'border-gray-500/40',
  rare: 'border-blue-400/50',
  epic: 'border-purple-400/50',
  legendary: 'border-yellow-400/60',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

/** 庆祝动画粒子 */
const ConfettiEffect = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          backgroundColor: ['#FF6B35', '#00D9C0', '#7C3AED', '#F59E0B'][i % 4],
          left: `${10 + (i * 7)}%`,
          top: '-10px',
        }}
        initial={{ y: 0, opacity: 1, rotate: 0 }}
        animate={{
          y: [0, 100 + Math.random() * 80],
          opacity: [1, 0],
          rotate: [0, 360],
          x: [(Math.random() - 0.5) * 80],
        }}
        transition={{
          duration: 1.2 + Math.random() * 0.8,
          delay: i * 0.06,
          ease: 'easeOut',
        }}
      />
    ))}
  </div>
);

const AchievementWall: React.FC = () => {
  const achievements = useAchievementStore((s) => s.achievements);
  const userAchievements = useAchievementStore((s) => s.userAchievements);
  const pendingNotifications = useAchievementStore((s) => s.pendingNotifications);
  const dismissNotification = useAchievementStore((s) => s.dismissNotification);
  const loadAchievements = useAchievementStore((s) => s.loadAchievements);

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!achievements.length) loadAchievements();
  }, [achievements.length, loadAchievements]);

  // 如果有待通知的成就，自动显示弹窗
  useEffect(() => {
    if (pendingNotifications.length > 0 && !showNotification) {
      setShowNotification(true);
    }
  }, [pendingNotifications.length, showNotification]);

  const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <Card glass>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-lg font-semibold text-white">成就墙</h3>
            <span className="text-sm text-gray-400">
              ({unlockedIds.size} / {ACHIEVEMENTS.length})
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {ACHIEVEMENTS.map((ach) => {
              const isUnlocked = unlockedIds.has(ach.id);
              return (
                <motion.div
                  key={ach.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className={`relative p-3 rounded-xl border transition-all duration-300 ${
                    isUnlocked
                      ? `${rarityBorderColors[ach.rarity]} bg-white/[0.04] hover:bg-white/[0.08]`
                      : 'border-white/5 bg-white/[0.02] opacity-50'
                  }`}
                >
                  {/* 稀有度光效 */}
                  {isUnlocked && ach.rarity === 'legendary' && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/10 to-transparent pointer-events-none" />
                  )}

                  <div className="flex flex-col items-center text-center">
                    <span className="text-2xl mb-1.5">{ach.icon}</span>
                    <h4 className={`text-sm font-medium truncate w-full ${
                      isUnlocked ? 'text-white' : 'text-gray-500'
                    }`}>
                      {ach.name}
                    </h4>
                    <p className={`text-[11px] mt-0.5 line-clamp-2 leading-tight ${
                      isUnlocked ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {isUnlocked ? ach.description : `条件：${ach.condition.value}${getConditionLabel(ach.condition.type)}`}
                    </p>

                    {!isUnlocked && (
                      <Lock className="w-3.5 h-3.5 text-gray-600 mt-1" />
                    )}
                  </div>

                  {/* 稀有度指示条 */}
                  <div
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                    style={{ backgroundColor: RARITY_COLORS[ach.rarity], opacity: isUnlocked ? 0.8 : 0.25 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </Card>
      </motion.div>

      {/* 成就解锁通知弹窗 */}
      <AnimatePresence>
        {showNotification && pendingNotifications.length > 0 && (
          <Modal
            isOpen={showNotification}
            onClose={() => setShowNotification(false)}
            size="md"
          >
            <div className="relative text-center overflow-hidden">
              <ConfettiEffect />
              <Sparkles className="w-12 h-12 mx-auto text-[#F59E0B] mb-3 relative z-10" />
              <h3 className="text-xl font-bold text-white mb-1 relative z-10">🎉 成就解锁！</h3>
              <p className="text-gray-400 mb-4 relative z-10">
                恭喜你获得了新成就
              </p>

              <div className="space-y-3 relative z-10">
                {pendingNotifications.map((ach) => (
                  <div
                    key={ach.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-[#F59E0B]/30"
                  >
                    <span className="text-3xl">{ach.icon}</span>
                    <div className="text-left">
                      <p className="font-semibold text-white">{ach.name}</p>
                      <p className="text-sm text-gray-400">{ach.description}</p>
                      <p className="text-xs text-[#F59E0B] mt-0.5">+{ach.points} 积分</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  pendingNotifications.forEach((a) => dismissNotification(a.id));
                  setShowNotification(false);
                }}
                className="mt-5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E55525] text-white font-semibold hover:shadow-[0_0_20px_rgba(255,107,53,0.4)] transition-shadow relative z-10"
              >
                太棒了！
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

function getConditionLabel(type: string): string {
  switch (type) {
    case 'days': return '天连续';
    case 'count': return '次';
    case 'score': return '分';
    case 'minutes': return '分钟';
    default: return '';
  }
}

export default AchievementWall;
