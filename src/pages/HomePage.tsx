import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  BookOpen,
  Brain,
  TrendingUp,
  Users,
  ArrowRight,
  Globe,
  Sparkles,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/constants/languages';

/* ============================================
   动画变体定义
   ============================================ */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/* ============================================
   语言卡片配置
   ============================================ */
const languageCards = [
  {
    ...SUPPORTED_LANGUAGES[0],
    borderColor: 'border-[#FF6B35]',
    glowColor: 'hover:shadow-[0_0_40px_rgba(255,107,53,0.25)]',
    btnColor: 'from-[#FF6B35] to-[#E55525]',
    path: '/courses?lang=en',
  },
  {
    ...SUPPORTED_LANGUAGES[1],
    borderColor: 'border-[#7C3AED]',
    glowColor: 'hover:shadow-[0_0_40px_rgba(124,58,237,0.25)]',
    btnColor: 'from-[#7C3AED] to-[#5B21B6]',
    path: '/courses?lang=ja',
  },
  {
    ...SUPPORTED_LANGUAGES[2],
    borderColor: 'border-[#F59E0B]',
    glowColor: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]',
    btnColor: 'from-[#F59E0B] to-[#D97706]',
    path: '/courses?lang=ko',
  },
];

/* ============================================
   特色展示数据
   ============================================ */
const features = [
  {
    icon: BookOpen,
    title: '智能课程体系',
    description: '分级课程从零基础到高级，科学规划学习路径',
    color: '#FF6B35',
  },
  {
    icon: Brain,
    title: '沉浸式学习',
    description: '单词/语法/口语/听力全方位训练，真实场景模拟',
    color: '#00D9C0',
  },
  {
    icon: TrendingUp,
    title: '进度追踪',
    description: '可视化学习路径与数据分析，掌握每一步成长',
    color: '#7C3AED',
  },
  {
    icon: Users,
    title: '社区交流',
    description: '与全球学习者一起成长，分享经验互相激励',
    color: '#F59E0B',
  },
];

/* ============================================
   统计数据
   ============================================ */
const statsData = [
  { value: 12000, suffix: '+', label: '在线学习者', prefix: '' },
  { value: 50, suffix: '+', label: '精品课程', prefix: '' },
  { value: 98, suffix: '%', label: '学员满意度', prefix: '' },
];

/* ============================================
   AnimatedNumber - 数字滚动组件
   ============================================ */
function AnimatedNumber({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="stat-number text-4xl md:text-5xl font-extrabold tabular-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

/* ============================================
   HeroSection 英雄区域
   ============================================ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 径向渐变背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,39,68,0.8)_0%,_rgba(10,22,40,1)_70%)]" />

      {/* CSS 装饰圆球 */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B35]/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-3xl animate-float delay-300" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D9C0]/3 rounded-full blur-3xl" />

      {/* 粒子装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* 内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* 品牌标题 */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border-white/10">
            <Globe className="w-4 h-4 text-success" />
            <span className="text-sm text-gray-300 font-body">多语种沉浸式学习平台</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
        >
          <span className="gradient-text">LinguaFlow</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-16 max-w-2xl mx-auto font-body"
        >
          沉浸式多语种学习体验
        </motion.p>

        {/* 语言选择卡片 */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {languageCards.map((lang) => (
            <motion.div key={lang.code} variants={scaleIn}>
              <Link to={lang.path}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative group glass-card ${lang.borderColor} ${lang.glowColor} p-8 cursor-pointer text-left`}
                >
                  {/* 语言标识 */}
                  <div className="text-4xl mb-4">{lang.flag}</div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    {lang.name}
                    <span className="block text-sm font-normal text-gray-400 mt-1">{lang.nativeName}</span>
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{lang.description}</p>

                  {/* CTA按钮 */}
                  <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${lang.btnColor} text-white text-sm font-semibold group-hover:shadow-lg transition-shadow`}>
                    开始学习
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 底部渐隐 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent" />
    </section>
  );
}

/* ============================================
   FeatureShowcase 特色展示
   ============================================ */
function FeatureShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            为什么选择 <span className="gradient-text">LinguaFlow</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            我们为每一位语言学习者打造最专业的学习体验
          </p>
        </motion.div>

        {/* 四宫格卡片 */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass-card group p-8 text-center"
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   LiveStats 实时统计
   ============================================ */
function LiveStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A2744]/30 to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12"
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center"
            >
              <AnimatedNumber {...stat} />
              <p className="text-gray-400 mt-3 text-base font-body">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   CTASection 底部行动召唤区域
   ============================================ */
function CTASection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* 玻璃态卡片容器 */}
        <div className="glass-card p-12 md:p-16 relative overflow-hidden">
          {/* 背景光晕 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              立即开启你的语言学习之旅
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              加入全球 12,000+ 学习者，开启沉浸式多语种学习体验
            </p>
            <motion.button
              onClick={() => navigate('/register')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="animate-pulse-glow inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E55525] text-white font-heading font-bold text-lg shadow-[0_0_30px_rgba(255,107,53,0.3)] hover:shadow-[0_0_45px_rgba(255,107,53,0.5)] transition-shadow"
            >
              免费注册
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================
   HomePage 主页面组件
   ============================================ */
export default function HomePage() {
  return (
    <div className="page-transition-container">
      <HeroSection />
      <FeatureShowcase />
      <LiveStats />
      <CTASection />
    </div>
  );
}
