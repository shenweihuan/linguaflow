import { create } from 'zustand';
import type { Post, Comment, CheckIn } from '@/types/community';
import { MOCK_POSTS, MOCK_CHECK_INS } from '@/assets/data/community';

/**
 * 社区状态管理接口
 */
interface CommunityState {
  /** 帖子列表 */
  posts: Post[];
  /** 当前查看的帖子详情 */
  currentPost: Post | null;
  /** 评论列表（全局或某帖子的） */
  comments: Comment[];
  /** 打卡记录列表 */
  checkIns: CheckIn[];

  /**
   * 从 mock 数据加载帖子
   */
  loadPosts: () => void;

  /**
   * 创建一篇新帖子
   * @param post - 新帖子数据（不含 id、createdAt 等自动生成字段）
   */
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'views' | 'comments'>) => void;

  /**
   * 给指定帖子点赞
   * @param postId - 帖子 ID
   */
  likePost: (postId: string) => void;

  /**
   * 为指定帖子添加评论
   * @param postId - 帖子 ID
   * @param content - 评论内容
   * @param authorInfo - 评论者信息
   */
  addComment: (
    postId: string,
    content: string,
    authorInfo: {
      authorId: string;
      authorNickname: string;
      authorAvatar: string;
    }
  ) => void;

  /**
   * 添加一条打卡记录
   * @param checkIn - 打卡数据（不含 id、createdAt）
   */
  addCheckIn: (checkIn: Omit<CheckIn, 'id' | 'createdAt'>) => void;

  /**
   * 获取今日所有用户的打卡记录
   * @returns 今日打卡数组
   */
  getTodayCheckins: () => CheckIn[];
}

/**
 * 社区状态管理 Store
 *
 * 管理社区帖子的加载、创建、点赞、评论功能，
 * 以及用户每日学习打卡记录的添加与查询。
 */
const useCommunityStore = create<CommunityState>()((set, get) => ({
  // 初始状态
  posts: [],
  currentPost: null,
  comments: [],
  checkIns: [],

  /**
   * 从 community.ts 加载 mock 帖子和打卡数据
   */
  loadPosts: () => {
    set({
      posts: MOCK_POSTS,
      checkIns: MOCK_CHECK_INS,
    });
  },

  /**
   * 发布新帖子（前端模拟）
   */
  createPost: (
    post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'views' | 'comments'>
  ) => {
    const now = new Date().toISOString();
    const newPost: Post = {
      ...post,
      id: `post_${Date.now()}`,
      likes: 0,
      views: 0,
      comments: [],
      isPinned: false,
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      posts: [newPost, ...state.posts],
    }));
  },

  /**
   * 帖子点赞：likes +1
   */
  likePost: (postId: string) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      ),
    }));
  },

  /**
   * 添加评论到指定帖子
   */
  addComment: (
    postId: string,
    content: string,
    authorInfo: {
      authorId: string;
      authorNickname: string;
      authorAvatar: string;
    }
  ) => {
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      postId,
      ...authorInfo,
      content,
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      // 将评论追加到对应帖子的 comments 数组中
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ),
      // 同时维护全局 comments 列表
      comments: [...state.comments, newComment],
    }));
  },

  /**
   * 新增一条学习打卡记录
   */
  addCheckIn: (
    checkIn: Omit<CheckIn, 'id' | 'createdAt'>
  ) => {
    const newCheckIn: CheckIn = {
      ...checkIn,
      id: `checkin_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      checkIns: [newCheckIn, ...state.checkIns],
    }));
  },

  /**
   * 筛选出日期为今天的所有打卡记录
   */
  getTodayCheckins: (): CheckIn[] => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    return get().checkIns.filter((ci) => ci.date === today);
  },
}));

export default useCommunityStore;
