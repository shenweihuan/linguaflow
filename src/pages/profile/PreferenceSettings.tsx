import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings2, Bell, Volume2, Save, CheckCircle } from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import useAuthStore from '@/stores/useAuthStore';

const DAILY_GOALS = [15, 30, 45, 60, 90];

const PreferenceSettings: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [dailyGoal, setDailyGoal] = useState(user?.preferences?.dailyGoal ?? 30);
  const [reminderEnabled, setReminderEnabled] = useState(user?.preferences?.reminderEnabled ?? true);
  const [soundEnabled, setSoundEnabled] = useState(user?.preferences?.soundEnabled ?? true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({
      preferences: {
        dailyGoal,
        reminderEnabled,
        soundEnabled,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Toggle 开关组件
  const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (v: boolean) => void }> = ({
    enabled,
    onChange,
  }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
        enabled ? 'bg-[#FF6B35]' : 'bg-white/15'
      }`}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
        animate={{ left: enabled ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card glass>
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-[#00D9C0]" />
          学习偏好设置
        </h3>

        <div className="space-y-6 max-w-md">
          {/* 每日学习目标滑块 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-gray-400" />
                每日学习目标
              </label>
              <span className="text-sm font-semibold text-[#FF6B35]">{dailyGoal} 分钟</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={15}
                max={90}
                step={15}
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-[#FF6B35]"
              />
              <div className="flex justify-between mt-1.5">
                {DAILY_GOALS.map((goal) => (
                  <span
                    key={goal}
                    className={`text-xs ${dailyGoal === goal ? 'text-[#FF6B35] font-medium' : 'text-gray-500'}`}
                  >
                    {goal >= 60 ? `${goal / 60}h` : `${goal}m`}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 学习提醒开关 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-white">学习提醒</p>
                <p className="text-xs text-gray-500">每日定时提醒你开始学习</p>
              </div>
            </div>
            <ToggleSwitch enabled={reminderEnabled} onChange={setReminderEnabled} />
          </div>

          {/* 音效开关 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-white">音效</p>
                <p className="text-xs text-gray-500">答题正确/错误的音效反馈</p>
              </div>
            </div>
            <ToggleSwitch enabled={soundEnabled} onChange={setSoundEnabled} />
          </div>

          {/* 保存按钮 */}
          <div className="flex items-center gap-3 pt-2">
            <Button variant="secondary" leftIcon={<Save className="w-4 h-4" />} onClick={handleSave}>
              保存偏好
            </Button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 text-sm text-[#00D9C0]"
              >
                <CheckCircle className="w-4 h-4" /> 偏好已保存
              </motion.span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PreferenceSettings;
