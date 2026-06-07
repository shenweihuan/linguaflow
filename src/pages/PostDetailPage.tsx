import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Bookmark, Share2, Send, Clock } from 'lucide-react';
import useCommunityStore from '@/stores/useCommunityStore';
import useAuthStore from '@/stores/useAuthStore';
import { formatDate } from '@/utils/formatters';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Avatar from '@/components/common/Avatar';
import type { PostCategory } from '@/types/community';

const CAT_MAP: Record<PostCategory, { label: string; variant: 'success' | 'warning' | 'info' | 'purple' | 'yellow' }> = {
  experience: { label: '经验分享', variant: 'success' },
  question: { label: '问题求助', variant: 'warning' },
  discussion: { label: '讨论交流', variant: 'purple' },
  resource: { label: '资源推荐', variant: 'info' },
  showcase: { label: '学习打卡', variant: 'yellow' },
};

export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { posts, likePost, addComment } = useCommunityStore();
  const { user, isAuthenticated } = useAuthStore();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [postId]);

  const post = posts.find((p) => p.id === postId);

  if (!post) return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
      <Card glass padding="xl" className="text-center space-y-4">
        <EmptyIcon className="w-16 h-16 mx-auto text-gray-500 opacity-40" />
        <p className="text-gray-400">帖子不存在或已被删除</p>
        <Button onClick={() => navigate('/community')}>返回社区</Button>
      </Card>
    </div>
  );

  const catInfo = CAT_MAP[post.category];

  const handleLike = () => { if (postId) { likePost(postId); setLiked(true); } };
  const handleComment = () => {
    if (!commentInput.trim() || !user || !postId) return;
    addComment(postId, commentInput.trim(), { authorId: user.id, authorNickname: user.nickname, authorAvatar: user.avatar });
    setCommentInput('');
  };

  return (
    <div className="min-h-screen bg-[#0A1628] pb-12">
      {/* 面包屑 */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-[#0A1628]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate('/community')} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-500">/</span>
          <button onClick={() => navigate('/community')} className="text-sm text-gray-400 hover:text-white transition-colors">社区</button>
          <span className="text-sm text-gray-600">/</span>
          <span className="text-sm text-white font-medium truncate max-w-[200px]">帖子详情</span>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 mt-6 space-y-6">
        {/* 帖子详情 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Card glass padding="xl" className="space-y-5">
            {/* 作者信息 */}
            <div className="flex items-center gap-3">
              <Avatar src={post.authorAvatar} size="lg" name={post.authorNickname} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{post.authorNickname}</span>
                  <Badge text="楼主" variant="warning" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                  <Clock className="w-3 h-3" />{formatDate(post.createdAt)}
                </div>
              </div>
              <Badge text={catInfo.label} variant={catInfo.variant} />
            </div>
            <h1 className="text-2xl font-bold text-white leading-tight">{post.title}</h1>
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">{post.content}</div>
            {post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap pt-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-400 border border-white/10">#{tag}</span>
                ))}
              </div>
            )}
            {/* 操作栏 */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button onClick={handleLike} disabled={liked}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${liked ? 'bg-red-500/15 text-red-400' : 'bg-white/5 text-gray-400 hover:bg-red-500/10 hover:text-red-400'}`}>
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} /><span>{post.likes + (liked ? 1 : 0)}</span>
              </button>
              <button onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${bookmarked ? 'bg-[#FF6B35]/15 text-[#FF6B35]' : 'bg-white/5 text-gray-400 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35]'}`}>
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />收藏
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                <Share2 className="w-4 h-4" />分享
              </button>
            </div>
          </Card>
        </motion.div>

        {/* 评论区 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
          <Card glass padding="lg" className="space-y-5">
            <h2 className="text-lg font-semibold text-white">{post.comments.length} 条评论</h2>

            {/* 评论输入框 */}
            <div className="flex gap-3">
              {isAuthenticated && user ? <Avatar src={user.avatar} size="md" name={user.nickname} /> :
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35]/50 to-[#7C3AED]/50 flex items-center justify-center text-white text-sm font-bold">?</div>}
              <div className="flex-1 flex gap-2">
                <input type="text" placeholder={isAuthenticated ? '写下你的评论... (Ctrl+Enter 发送)' : '登录后可发表评论'}
                  value={commentInput} onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.ctrlKey || e.metaKey) && handleComment()}
                  maxLength={500} disabled={!isAuthenticated}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50 disabled:opacity-50" />
                <Button size="sm" onClick={handleComment} disabled={!commentInput.trim() || !isAuthenticated} rightIcon={<Send className="w-4 h-4" />}>发送</Button>
              </div>
            </div>

            {/* 评论列表 */}
            <div className="space-y-4 divide-y divide-white/5">
              <AnimatePresence>
                {post.comments.map((c, i) => {
                  const isAuthor = c.authorId === post.authorId;
                  return (
                    <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className={`pt-4 first:pt-0 ${isAuthor ? 'pl-3 border-l-2 border-[#FF6B35]' : ''}`}>
                      <div className="flex gap-3">
                        <Avatar src={c.authorAvatar} size="md" name={c.authorNickname} />
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white">{c.authorNickname}</span>
                            {isAuthor && <Badge text="楼主" variant="warning" />}
                            <span className="text-xs text-gray-500">{formatDate(c.createdAt)}</span>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">{c.content}</p>
                          <div className="flex items-center gap-4 pt-1">
                            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors"><Heart className="w-3.5 h-3.5" />{c.likes}</button>
                            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-cyan-400 transition-colors"><MsgIcon className="w-3.5 h-3.5" />回复</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {post.comments.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  <EmptyIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">暂无评论，快来发表第一条吧~</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
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

function MsgIcon(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...props} className={props.className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
