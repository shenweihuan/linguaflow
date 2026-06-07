import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Heart, MessageCircle, Eye,
  Calendar, Clock, Flame, Send,
} from 'lucide-react';
import useCommunityStore from '@/stores/useCommunityStore';
import useAuthStore from '@/stores/useAuthStore';
import { formatDate } from '@/utils/formatters';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Avatar from '@/components/common/Avatar';
import Modal from '@/components/common/Modal';
import type { PostCategory } from '@/types/community';

const CATEGORIES: { key: PostCategory | 'all'; label: string; variant: 'success' | 'warning' | 'info' | 'purple' | 'yellow' | '' }[] = [
  { key: 'all', label: '全部', variant: '' },
  { key: 'experience', label: '经验分享', variant: 'success' },
  { key: 'question', label: '问题求助', variant: 'warning' },
  { key: 'discussion', label: '讨论交流', variant: 'purple' },
  { key: 'resource', label: '资源推荐', variant: 'info' },
  { key: 'showcase', label: '学习打卡', variant: 'yellow' },
];

export default function CommunityPage() {
  const navigate = useNavigate();
  const { posts, checkIns, loadPosts, createPost, likePost, addCheckIn, getTodayCheckins } = useCommunityStore();
  const { user, isAuthenticated } = useAuthStore();
  const [category, setCategory] = useState<PostCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [showPost, setShowPost] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postCat, setPostCat] = useState<PostCategory>('experience');
  const [studyTime, setStudyTime] = useState(30);
  const [wordsLearned, setWordsLearned] = useState(10);
  const [lessonsCompleted, setLessonsCompleted] = useState(1);
  const [note, setNote] = useState('');
  const [liked, setLiked] = useState<Set<string>>(new Set());

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const todayCheckins = useMemo(() => getTodayCheckins(), [checkIns, getTodayCheckins]);
  const filtered = useMemo(() => {
    let result = posts;
    if (category !== 'all') result = result.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
    }
    return result;
  }, [posts, category, search]);

  const topStreak = useMemo(() =>
    todayCheckins.length > 0
      ? todayCheckins.reduce((max, ci) => (ci.streakDay > max.streakDay ? ci : max))
      : null, [todayCheckins]);

  const getUserInfo = (userId: string) => {
    const post = posts.find((p) => p.authorId === userId);
    return post ? { nickname: post.authorNickname, avatar: post.authorAvatar } : null;
  };

  const handleLike = (id: string) => { likePost(id); setLiked((s) => new Set([...s, id])); };
  const handleCreate = () => {
    if (!title.trim() || !content.trim() || !user) return;
    createPost({ authorId: user.id, authorNickname: user.nickname, authorAvatar: user.avatar, title, content, category: postCat, tags: [], isPinned: false });
    setTitle(''); setContent(''); setShowPost(false);
  };
  const handleCheckin = () => {
    if (!user) return;
    addCheckIn({ userId: user.id, date: new Date().toISOString().slice(0, 10), studyTime, wordsLearned, lessonsCompleted, note, streakDay: 1 });
    setStudyTime(30); setWordsLearned(10); setLessonsCompleted(1); setNote(''); setShowCheckin(false);
  };

  return (
    <div className="min-h-screen bg-[#0A1628] pb-12">
      {/* 顶部栏 */}
      <div className="sticky top-0 z-40 bg-[#0A1628]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">社区广场</h1>
          <div className="flex-1" />
          <Button leftIcon={<Plus className="w-4 h-4" />} size="sm" onClick={() => setShowPost(true)}>发布帖子</Button>
        </div>
        <div className="max-w-4xl mx-auto px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索帖子内容..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50 transition-all" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* 分类标签 */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setCategory(c.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${category === c.key ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/25' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* 今日打卡区 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card glass className="bg-gradient-to-br from-[#00D9C0]/10 to-[#FF6B35]/5 border-[#00D9C0]/20">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#00D9C0]" />
                  <span className="text-lg font-semibold text-white">今日打卡</span>
                  <Badge text={`${todayCheckins.length} 人`} variant="success" />
                </div>
                {topStreak && (() => {
                  const info = getUserInfo(topStreak.userId);
                  return info ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="text-gray-400">连续最高：</span>
                      {info.avatar && <Avatar src={info.avatar} size="sm" />}
                      <span className="text-white">{info.nickname}</span>
                      <Badge text={`${topStreak.streakDay}天`} variant="warning" />
                    </div>
                  ) : null;
                })()}
              </div>
              <Button variant="outline" size="sm" style={{ borderColor: '#00D9C0', color: '#00D9C0' }}
                onClick={() => setShowCheckin(true)} disabled={!isAuthenticated}>立即打卡</Button>
            </div>
            {todayCheckins.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {Array.from(new Set(todayCheckins.map((ci) => ci.userId))).map((uid) => {
                    const info = getUserInfo(uid);
                    return info?.avatar ? <Avatar key={uid} src={info.avatar} size="md" name={info.nickname} /> : null;
                  })}
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* 帖子列表 */}
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div key={post.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }} layout>
                <Link to={`/community/post/${post.id}`}>
                  <Card hoverable glass className="group cursor-pointer">
                    <div className="flex gap-4">
                      <Avatar src={post.authorAvatar} size="lg" name={post.authorNickname} />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-gray-200">{post.authorNickname}</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(post.createdAt)}</span>
                          <Badge text={CATEGORIES.find((c) => c.key === post.category)?.label || ''}
                            variant={(CATEGORIES.find((c) => c.key === post.category)?.variant as any) || 'default'} />
                          {post.isPinned && <span className="text-xs text-[#FF6B35] font-medium">置顶</span>}
                        </div>
                        <h3 className="text-base font-semibold text-white group-hover:text-[#FF6B35] transition-colors line-clamp-1">{post.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{post.content}</p>
                        {post.tags.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap pt-1">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-gray-400">#{tag}</span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-5 pt-2 text-sm text-gray-500">
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleLike(post.id); }}
                            className={`flex items-center gap-1.5 transition-colors ${liked.has(post.id) ? 'text-red-400' : 'hover:text-red-400'}`}>
                            <Heart className={`w-4 h-4 ${liked.has(post.id) ? 'fill-current' : ''}`} />
                            <span>{post.likes + (liked.has(post.id) ? 1 : 0)}</span>
                          </button>
                          <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" />{post.comments.length}</span>
                          <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500"><MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>暂无相关帖子</p></div>
          )}
        </motion.div>
      </div>

      {/* 发布Modal */}
      <Modal isOpen={showPost} onClose={() => setShowPost(false)} title="发布新帖" size="lg">
        <div className="space-y-4">
          <input type="text" placeholder="请输入帖子标题..." value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50" />
          <textarea placeholder="分享你的想法..." value={content} onChange={(e) => setContent(e.target.value)} rows={5} maxLength={2000}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50 resize-none" />
          <select value={postCat} onChange={(e) => setPostCat(e.target.value as PostCategory)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none appearance-none cursor-pointer">
            {CATEGORIES.filter((c) => c.key !== 'all').map((c) => (
              <option key={c.key} value={c.key} className="bg-[#1A2744]">{c.label}</option>
            ))}
          </select>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowPost(false)}>取消</Button>
            <Button onClick={handleCreate} disabled={!title.trim() || !content.trim()} rightIcon={<Send className="w-4 h-4" />}>发布</Button>
          </div>
        </div>
      </Modal>

      {/* 打卡Modal */}
      <Modal isOpen={showCheckin} onClose={() => setShowCheckin(false)} title="今日学习打卡">
        <div className="space-y-4">
          {[{ label: '学习时长（分钟）', val: studyTime, set: setStudyTime }, { label: '新学单词数', val: wordsLearned, set: setWordsLearned }, { label: '完成课程数', val: lessonsCompleted, set: setLessonsCompleted }].map((f) => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">{f.label}</label>
              <input type="number" min={0} value={f.val} onChange={(e) => f.set(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9C0]/50" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">学习感想（可选）</label>
            <textarea placeholder="记录今天的学习感悟..." value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={500}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9C0]/50 resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowCheckin(false)}>取消</Button>
            <Button onClick={handleCheckin} rightIcon={<Send className="w-4 h-4" />} style={{ background: 'linear-gradient(to right, #00D9C0, #00B39E)' }}>提交打卡</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function EmptyIcon(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...props} className={props.className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
