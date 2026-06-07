export type PostCategory = 'question' | 'experience' | 'resource' | 'discussion' | 'showcase';

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorNickname: string;
  authorAvatar: string;
  content: string;
  likes: number;
  createdAt: string;
  replies?: Comment[];
}

export interface Post {
  id: string;
  authorId: string;
  authorNickname: string;
  authorAvatar: string;
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
  likes: number;
  views: number;
  comments: Comment[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CheckIn {
  id: string;
  userId: string;
  date: string;
  studyTime: number; // 分钟
  wordsLearned: number;
  lessonsCompleted: number;
  note?: string;
  streakDay: number;
  createdAt: string;
}
