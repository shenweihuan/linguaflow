import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, CheckCircle } from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Avatar from '@/components/common/Avatar';
import useAuthStore from '@/stores/useAuthStore';
import type { TargetLanguage } from '@/types/user';

const LANGUAGE_OPTIONS: { value: TargetLanguage; label: string; flag: string }[] = [
  { value: 'en', label: '英语', flag: '🇺🇸' },
  { value: 'ja', label: '日语', flag: '🇯🇵' },
  { value: 'ko', label: '韩语', flag: '🇰🇷' },
];

const ProfileEditSection: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [nickname, setNickname] = useState(user?.nickname || '');
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>(user?.targetLanguage || 'en');
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!nickname.trim()) newErrors.nickname = '昵称不能为空';
    else if (nickname.length > 20) newErrors.nickname = '昵称不能超过20个字符';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    updateProfile({
      nickname: nickname.trim(),
      targetLanguage,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card glass>
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#FF6B35]" />
          个人信息
        </h3>

        {/* 头像区域 */}
        <div className="flex justify-center mb-6">
          <div className="relative group cursor-pointer">
            <Avatar src={user.avatar} size="xl" name={user.nickname} />
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center w-full absolute">点击更换头像</p>
        </div>

        {/* 表单字段 */}
        <div className="space-y-4 max-w-md mx-auto">
          {/* 昵称 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">昵称</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                if (errors.nickname) setErrors((prev) => ({ ...prev, nickname: '' }));
              }}
              placeholder="输入你的昵称"
              maxLength={20}
              className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border ${
                errors.nickname ? 'border-red-400' : 'border-white/10'
              } text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 transition-colors`}
            />
            {errors.nickname && (
              <p className="text-red-400 text-xs mt-1">{errors.nickname}</p>
            )}
          </div>

          {/* 邮箱（只读） */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">邮箱</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* 目标语言选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">目标语言</label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value as TargetLanguage)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B35]/50 focus:ring-1 focus:ring-[#FF6B35]/30 transition-colors appearance-none cursor-pointer"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#1A2744]">
                  {opt.flag} {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 保存按钮 */}
          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" leftIcon={<Save className="w-4 h-4" />} onClick={handleSave}>
              保存修改
            </Button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 text-sm text-[#00D9C0]"
              >
                <CheckCircle className="w-4 h-4" /> 已保存
              </motion.span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileEditSection;
