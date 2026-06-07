# LinguaFlow - 沉浸式多语种在线教育平台

<div align="center">

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-5-orange)

**支持英语、日语、韩语的沉浸式语言学习体验**

[功能介绍](#-核心功能) · [快速开始](#-快速开始) · [技术架构](#-技术架构) · [项目结构](#-项目结构) · [演示账号](#-演示账号)

</div>

---

## 项目简介

LinguaFlow 是一款面向全球语言学习者的沉浸式在线教育平台，融合 AI 驱动的个性化推荐、互动式学习模块、社区交流与成就激励系统，打造高效、有趣的语言学习体验。

### 设计理念

**「知识海洋」沉浸式体验** — 以深海蓝为基底，搭配珊瑚橙活力强调色，通过玻璃态效果和流畅动画营造沉浸式学习氛围。

---

## 核心功能

| 模块 | 功能说明 |
|------|----------|
| **分级课程体系** | 12 门精品课程覆盖英语/日语/韩语，A1-C1 六级难度，章节化课程结构 |
| **单词记忆** | 3D 翻转闪卡、Web Speech API 发音播放、学习/复习双模式 |
| **语法练习** | 选择题 / 填空题 / 排序题三种题型，即时反馈 + 连击特效 |
| **口语跟读** | Canvas 波形可视化、SpeechRecognition 录音评分、逐词对比 |
| **听力训练** | 模拟音频播放器（0.75x~1.25x 变速）、听写对照模式 |
| **进度追踪** | Bento Grid 数据仪表盘、GitHub 风格日历热力图、活动时间线 |
| **用户认证** | 注册/登录表单、Zustand persist 本地持久化、路由守卫 |
| **个性化推荐** | 基于等级/薄弱环节的规则引擎推荐算法，Top 6 课程推荐 |
| **社区交流** | 6 分类帖子流、评论系统、每日打卡、点赞收藏分享 |
| **成就激励** | 22 个成就（Common/Rare/Epic/Legendary 四级稀有度），事件驱动解锁 |

---

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/shenweihuan/linguaflow.git

# 进入项目目录
cd linguaflow

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

启动后访问 **http://localhost:5173**

### 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 (Vite HMR) |
| `npm run build` | TypeScript 类型检查 + 生产构建 |
| `npm run preview` | 预览生产构建结果 |
| `npm run lint` | ESLint 代码检查 |
| `npm run check` | TypeScript 类型检查 (`tsc --noEmit`) |

---

## 技术架构

### 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 前端框架 | React | 18.x |
| 开发语言 | TypeScript | 5.8 |
| 构建工具 | Vite | 6.x |
| 样式方案 | Tailwind CSS | 3.x |
| 状态管理 | Zustand | 5.x |
| 路由管理 | React Router | 7.x |
| 动画库 | Framer Motion | 11.x |
| 图表库 | Recharts | 2.x |
| 图标库 | Lucide React | latest |

### 架构分层

```
┌─────────────────────────────────────┐
│           前端应用层 (React SPA)      │
│  Router + Pages + Components         │
├─────────────────────────────────────┤
│           核心功能层                  │
│  认证 │ 课程 │ 学习引擎 │ 进度追踪    │
│  推荐 │ 社区 │ 成就系统               │
├─────────────────────────────────────┤
│           数据层                      │
│  LocalStorage 持久化                 │
│  Mock Data (JSON)                   │
│  Zustand Store 状态共享              │
└─────────────────────────────────────┘
```

### 数据模型

```
User ──1:N── Progress ──N:1── Course
User ──1:N── UserAchievement ──N:1── Achievement
User ──1:N── Post ──1:N── Comment
User ──1:N── CheckIn
Course ──1:N── Chapter ──1:N── Lesson
Lesson ──1:N── Vocabulary / GrammarExercise / ListeningExercise
Language ──1:N── Course
```

---

## 项目结构

```
src/
├── assets/
│   ├── data/                  # Mock 数据
│   │   ├── courses.ts         # 12 门课程数据
│   │   ├── vocabulary.ts      # 90 个单词（每语种 30）
│   │   ├── grammar.ts         # 45 道语法题
│   │   ├── listening.ts       # 24 段听力材料
│   │   ├── achievements.ts    # 22 个成就定义
│   │   ├── community.ts       # 社区帖子/评论/打卡
│   │   └── users.ts           # 用户数据
│   └── styles/
│       ├── globals.css        # 全局样式 + CSS 变量
│       └── animations.css     # 动画库
├── components/
│   ├── common/                # 通用 UI 组件
│   │   ├── Button, Card, Modal, ProgressBar, Badge
│   │   ├── Avatar, LoadingSpinner
│   ├── layout/                # 布局组件
│   │   ├── Header, Footer, MainLayout, MobileNav
│   └── ProtectedRoute.tsx     # 路由守卫
├── pages/                     # 页面组件
│   ├── HomePage.tsx           # 首页（Hero + 语言选择 + 特色展示）
│   ├── LoginPage.tsx          # 登录页
│   ├── RegisterPage.tsx       # 注册页
│   ├── Courses.tsx            # 课程列表（筛选 + 搜索）
│   ├── CourseDetail.tsx       # 课程详情（Tab 切换）
│   ├── LearnPage.tsx          # 学习模块入口
│   ├── VocabularyPage.tsx     # 单词闪卡（3D 翻转）
│   ├── GrammarPage.tsx        # 语法练习（即时反馈）
│   ├── SpeakingPage.tsx       # 口语跟读（录音评分）
│   ├── ListeningPage.tsx      # 听力训练（变速播放）
│   ├── Dashboard.tsx          # 学习仪表盘（Bento Grid）
│   ├── Profile.tsx            # 个人中心
│   ├── CommunityPage.tsx      # 社区广场
│   └── PostDetailPage.tsx     # 话题详情
├── stores/                    # Zustand 状态管理
│   ├── useAuthStore.ts        # 认证状态（persist）
│   ├── useCourseStore.ts      # 课程状态
│   ├── useProgressStore.ts    # 进度状态（persist）
│   ├── useCommunityStore.ts   # 社区状态
│   └── useAchievementStore.ts # 成就状态
├── types/                     # TypeScript 类型定义
├── utils/                     # 工具函数
│   ├── storage.ts             # 本地存储封装
│   ├── formatters.ts          # 格式化工具
│   ├── validators.ts          # 表单验证
│   └── recommendations.ts     # 推荐算法
├── constants/                 # 常量配置
│   ├── languages.ts           # 支持的语言
│   └── levels.ts              # CEFR 等级定义
├── router.tsx                 # 路由配置
├── App.tsx                    # 应用根组件
└── main.tsx                   # 入口文件
```

---

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 首页 - 语言选择入口 | 公开 |
| `/login` | 用户登录 | 公开 |
| `/register` | 用户注册 | 公开 |
| `/courses` | 课程中心（筛选/搜索） | 需登录 |
| `/courses/:id` | 课程详情 | 需登录 |
| `/learn/:courseId` | 学习模块选择 | 需登录 |
| `/learn/:courseId/vocabulary` | 单词记忆 | 需登录 |
| `/learn/:courseId/grammar` | 语法练习 | 需登录 |
| `/learn/:courseId/speaking` | 口语跟读 | 需登录 |
| `/learn/:courseId/listening` | 听力训练 | 需登录 |
| `/dashboard` | 学习仪表盘 | 需登录 |
| `/profile` | 个人中心 | 需登录 |
| `/community` | 社区广场 | 需登录 |
| `/community/post/:id` | 话题详情 | 需登录 |

---

## 演示账号

| 字段 | 值 |
|------|-----|
| 邮箱 | `demo@linguaflow.com` |
| 密码 | `demo123456` |
| 目标语言 | 英语 (A2 级别) |

> 登录后可体验全部功能：课程浏览、四大学习模块、进度追踪、社区交流、成就系统等。

---

## 设计规范

### 配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 主背景 | 深海蓝 | `#0A1628` |
| 强调色 | 珊瑚橙 | `#FF6B35` |
| 成功色 | 青绿 | `#00D9C0` |
| 日语主题 | 柔和紫 | `#7C3AED` |
| 韩语主题 | 暖黄 | `#F59E0B` |
| 文字主色 | 纯净白 | `#F8FAFC` |

### 字体

| 用途 | 字体 |
|------|------|
| 标题 | Outfit (几何感现代字体) |
| 正文 | Inter / Noto Sans SC / Noto Sans JP / Noto Sans KR |

### 动效规范

- 页面进入：400ms ease-out 淡入上浮
- 卡片悬浮：200ms 上浮 + 阴影加深
- 闪卡翻转：600ms 3D 翻转
- 数字滚动：1000ms 递增动画

---

## 浏览器兼容性

| 浏览器 | 支持版本 |
|--------|----------|
| Chrome | >= 90 |
| Firefox | >= 88 |
| Safari | >= 14 |
| Edge | >= 90 |

> 注：口语跟读功能需要浏览器支持 Web Speech API（Chrome/Safari/Edge 支持）

---

## License

MIT License © 2024 LinguaFlow
