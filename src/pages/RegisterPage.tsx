import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import useAuthStore from '@/stores/useAuthStore';
import { validateEmail, validatePassword, validateNickname } from '@/utils/validators';
import { SUPPORTED_LANGUAGES } from '@/constants/languages';
import type { TargetLanguage } from '@/types/user';

/* ============================================
   动画变体
   ============================================ */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ============================================
   密码强度计算
   ============================================ */
function getPasswordStrength(password: string): { level: number; label: string; color: string; width: string } {
  if (!password) return { level: 0, label: '', color: 'bg-gray-600', width: '0%' };

  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { level: 1, label: '弱', color: 'bg-red-500', width: '33%' },
    { level: 2, label: '中', color: 'bg-yellow-500', width: '66%' },
    { level: 3, label: '强', color: 'bg-success', width: '100%' },
  ];

  if (score <= 2) return levels[0];
  if (score <= 3) return levels[1];
  return levels[2];
}

/* ============================================
   浮动标签输入框组件
   ============================================ */
function FloatingInput({
  type,
  label,
  value,
  onChange,
  error,
  icon: Icon,
  showToggle,
  onToggle,
  showPassword,
  autoComplete,
}: {
  type: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  icon: React.ComponentType<{ className?: string }>;
  showToggle?: boolean;
  onToggle?: () => void;
  showPassword?: boolean;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className={`relative flex items-center rounded-xl border transition-all duration-250 ${
          error
            ? 'border-red-500 bg-red-500/5'
            : isActive
            ? 'border-[#FF6B35]/50 bg-white/5'
            : 'border-white/10 bg-white/[0.03]'
        }`}
      >
        <Icon className={`w-5 h-5 ml-4 transition-colors ${error ? 'text-red-400' : isActive ? 'text-accent' : 'text-gray-500'}`} />
        <input
          type={showToggle && showPassword ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={autoComplete}
          className="flex-1 px-3 py-4 bg-transparent text-white text-base outline-none placeholder-transparent font-body"
          placeholder={label}
          id={`reg-${label}`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="mr-4 p-1 text-gray-400 hover:text-white transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {/* 浮动标签 */}
      <label
        htmlFor={`reg-${label}`}
        className={`absolute left-11 transition-all duration-250 pointer-events-none font-body text-sm ${
          isActive
            ? '-top-2.5 text-xs px-1 bg-[#0A1628] text-accent'
            : 'top-4 text-gray-500'
        } ${error ? '!text-red-400' : ''}`}
      >
        {label}
      </label>
      {error && <p className="mt-2 text-sm text-red-400 ml-1">{error}</p>}
    </div>
  );
}

/* ============================================
   RegisterPage 注册页面
   ============================================ */
export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);

  // 表单状态
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>('en');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');

  // 密码强度
  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

  // 验证表单
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const nicknameResult = validateNickname(nickname);
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);

    if (!nicknameResult.valid) newErrors.nickname = nicknameResult.message;
    if (!emailResult.valid) newErrors.email = emailResult.message;
    if (!passwordResult.valid) newErrors.password = passwordResult.message;
    if (password !== confirmPassword) newErrors.confirmPassword = '两次输入的密码不一致';
    if (!agreeTerms) newErrors.terms = '请阅读并同意服务条款';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交注册
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    if (!validateForm()) return;

    try {
      await register({
        email,
        password,
        nickname: nickname.trim(),
        avatar: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=avatar%20of%20${encodeURIComponent(nickname)}&image_size=square_1_1`,
        targetLanguage,
        level: 1,
      });
      navigate('/courses', { replace: true });
    } catch {
      setGeneralError('注册失败，请稍后重试');
    }
  };

  // 实时清除错误
  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-12 bg-[#0A1628] relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#7C3AED]/8 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00D9C0]/6 rounded-full blur-3xl animate-float delay-300" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg"
      >
        {/* 头部 */}
        <motion.div variants={fadeInUp} custom={0} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-success/20 border border-white/10 mb-5">
            <Globe className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-white">创建账号</h1>
          <p className="text-gray-400 mt-2 text-sm">加入 LinguaFlow，开启语言学习之旅</p>
        </motion.div>

        {/* 表单卡片 */}
        <motion.form
          variants={fadeInUp}
          custom={1}
          onSubmit={handleSubmit}
          noValidate
          className="glass-card p-7 sm:p-9 space-y-4"
        >
          {/* 通用错误 */}
          <AnimatePresence>
            {generalError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
              >
                {generalError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* 昵称 */}
          <FloatingInput
            type="text"
            label="昵称"
            value={nickname}
            onChange={(v) => { setNickname(v); clearError('nickname'); }}
            error={errors.nickname}
            icon={User}
            autoComplete="username"
          />

          {/* 邮箱 */}
          <FloatingInput
            type="email"
            label="邮箱地址"
            value={email}
            onChange={(v) => { setEmail(v); clearError('email'); }}
            error={errors.email}
            icon={Mail}
            autoComplete="email"
          />

          {/* 密码 + 强度指示条 */}
          <div>
            <FloatingInput
              type="password"
              label="密码"
              value={password}
              onChange={(v) => { setPassword(v); clearError('password'); }}
              error={errors.password}
              icon={Lock}
              showToggle
              onToggle={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
              autoComplete="new-password"
            />
            {/* 密码强度条 */}
            <AnimatePresence mode="wait">
              {password && passwordStrength.level > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-1 mt-2 space-y-1"
                >
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: passwordStrength.width }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className={`h-full rounded-full ${passwordStrength.color}`}
                    />
                  </div>
                  <p className={`text-xs ${
                    passwordStrength.level === 1 ? 'text-red-400' :
                    passwordStrength.level === 2 ? 'text-yellow-400' : 'text-success'
                  }`}>
                    密码强度：{passwordStrength.label}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 确认密码 */}
          <FloatingInput
            type="password"
            label="确认密码"
            value={confirmPassword}
            onChange={(v) => { setConfirmPassword(v); clearError('confirmPassword'); }}
            error={errors.confirmPassword}
            icon={Lock}
            showToggle
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            showPassword={showConfirmPassword}
            autoComplete="new-password"
          />

          {/* 目标语言选择 */}
          <div className="relative">
            <div className="relative flex items-center rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#FF6B35]/30 focus-within:border-[#FF6B35]/50 transition-all">
              <Globe className="w-5 h-5 ml-4 text-gray-500" />
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value as TargetLanguage)}
                className="flex-1 px-3 py-4 bg-transparent text-white text-base outline-none appearance-none cursor-pointer font-body"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#1A2744] text-white">
                    {lang.flag} {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>
            <span className="absolute left-11 -top-2.5 text-xs px-1 bg-[#0A1628] text-gray-500 pointer-events-none font-body">
              目标语言
            </span>
          </div>

          {/* 同意条款 */}
          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => { setAgreeTerms(e.target.checked); clearError('terms'); }}
                className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
              />
              <span className={`text-sm leading-relaxed group-hover:text-gray-200 transition-colors ${errors.terms ? 'text-red-400' : 'text-gray-400'}`}>
                我已阅读并同意{' '}
                <a href="#" className="text-accent hover:text-accent-light" onClick={(e) => e.preventDefault()}>
                  服务条款
                </a>{' '}
                和{' '}
                <a href="#" className="text-accent hover:text-accent-light" onClick={(e) => e.preventDefault()}>
                  隐私政策
                </a>
              </span>
            </label>
            {errors.terms && <p className="mt-1 ml-7 text-sm text-red-400">{errors.terms}</p>}
          </div>

          {/* 注册按钮 */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E55525] text-white font-heading font-bold text-base shadow-[0_0_25px_rgba(255,107,53,0.3)] hover:shadow-[0_0_35px_rgba(255,107,53,0.5)] transition-shadow disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                注册账号
              </>
            )}
          </motion.button>
        </motion.form>

        {/* 底部登录链接 */}
        <motion.p
          variants={fadeInUp}
          custom={2}
          className="text-center mt-6 text-sm text-gray-400"
        >
          已有账号？{' '}
          <Link to="/login" className="text-accent hover:text-accent-light font-semibold transition-colors inline-flex items-center gap-1">
            立即登录
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
