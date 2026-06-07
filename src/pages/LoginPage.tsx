import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Globe,
  ArrowRight,
  Github,
} from 'lucide-react';
import useAuthStore from '@/stores/useAuthStore';
import { validateEmail, validatePassword } from '@/utils/validators';

/* ============================================
   动画变体
   ============================================ */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

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
          id={`${label}-input`}
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
        htmlFor={`${label}-input`}
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
   LoginPage 登录页面
   ============================================ */
export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);

  const from = (location.state as { from?: string })?.from || '/dashboard';

  // 表单状态
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  // 验证表单
  const validateForm = () => {
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);
    const newErrors: typeof errors = {};

    if (!emailResult.valid) newErrors.email = emailResult.message;
    if (!passwordResult.valid) newErrors.password = passwordResult.message;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交登录
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setErrors({ general: '邮箱或密码错误，请重试' });
      }
    } catch {
      setErrors({ general: '登录失败，请稍后重试' });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* 左侧品牌展示区域（桌面端） */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
      >
        {/* 渐变背景 */}
        <div className="absolute inset-0 gradient-bg-ocean" />

        {/* 装饰圆球 */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#00D9C0]/10 rounded-full blur-3xl animate-float delay-300" />

        {/* 品牌内容 */}
        <div className="relative z-10 text-center max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          >
            <Globe className="w-16 h-16 mx-auto mb-6 text-success" />
            <h1 className="font-heading text-5xl font-black mb-4">
              <span className="gradient-text">LinguaFlow</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              沉浸式多语种学习体验，让语言学习如呼吸般自然
            </p>

            {/* 引用装饰 */}
            <div className="glass-card p-6 text-left mt-8">
              <p className="text-gray-300 italic text-sm leading-relaxed">
                "语言是通往世界的桥梁。在 LinguaFlow，每一堂课都是一次新的冒险。"
              </p>
              <p className="text-accent text-xs mt-3 font-semibold">— LinguaFlow 创始团队</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 右侧登录表单区域 */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-[#0A1628]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* 移动端 Logo */}
          <motion.div variants={fadeInUp} className="lg:hidden text-center mb-8">
            <h1 className="font-heading text-3xl font-black gradient-text">LinguaFlow</h1>
            <p className="text-gray-400 text-sm mt-2">沉浸式多语种学习平台</p>
          </motion.div>

          {/* 表单卡片 */}
          <motion.div
            variants={fadeInUp}
            className="glass-card p-8 sm:p-10"
          >
            <div className="mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">欢迎回来</h2>
              <p className="text-gray-400 mt-2 text-sm">请输入您的账号信息登录</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* 通用错误提示 */}
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                >
                  {errors.general}
                </motion.div>
              )}

              {/* 邮箱输入 */}
              <FloatingInput
                type="email"
                label="邮箱地址"
                value={email}
                onChange={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: undefined })); }}
                error={errors.email}
                icon={Mail}
                autoComplete="email"
              />

              {/* 密码输入 */}
              <FloatingInput
                type="password"
                label="密码"
                value={password}
                onChange={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: undefined })); }}
                error={errors.password}
                icon={Lock}
                showToggle
                onToggle={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
                autoComplete="current-password"
              />

              {/* 记住我 & 忘记密码 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">记住我</span>
                </label>
                <button type="button" className="text-sm text-accent hover:text-accent-light transition-colors">
                  忘记密码？
                </button>
              </div>

              {/* 登录按钮 */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E55525] text-white font-heading font-bold text-base shadow-[0_0_25px_rgba(255,107,53,0.3)] hover:shadow-[0_0_35px_rgba(255,107,53,0.5)] transition-shadow disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    登录
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* 分隔线 */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#0A1628]/60 px-4 text-sm text-gray-500">或</span>
              </div>
            </div>

            {/* 社交登录按钮 */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => alert('Google 登录功能演示')}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-gray-300 hover:text-white transition-all text-sm font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => alert('GitHub 登录功能演示')}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-gray-300 hover:text-white transition-all text-sm font-medium"
              >
                <Github className="w-5 h-5" />
                GitHub
              </motion.button>
            </div>
          </motion.div>

          {/* 底部注册链接 */}
          <motion.p
            variants={fadeInUp}
            className="text-center mt-6 text-sm text-gray-400"
          >
            还没有账号？{' '}
            <Link to="/register" className="text-accent hover:text-accent-light font-semibold transition-colors">
              立即注册
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
