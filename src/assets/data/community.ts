import { Post, Comment, CheckIn, PostCategory } from '../../types/community';

export const MOCK_POSTS: Post[] = [
  {
    id: 'post_001',
    authorId: 'user_001',
    authorNickname: '语言探索者',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cartoon%20avatar%20of%20a%20young%20language%20learner&image_size=square_1_1',
    title: '英语学习心得：如何有效记忆单词？',
    content: '大家好！我想分享一下我的单词记忆方法。我发现使用间隔重复法（Spaced Repetition）效果特别好。每天学习新单词的同时复习之前的，这样记忆效果比死记硬背好很多。另外，把单词放在句子中记忆也很重要，这样能理解用法和语境。大家有什么好的方法吗？欢迎交流！',
    category: 'experience' as PostCategory,
    tags: ['英语', '单词记忆', '学习方法'],
    likes: 45,
    views: 320,
    comments: [
      {
        id: 'comment_001_1',
        postId: 'post_001',
        authorId: 'user_005',
        authorNickname: '英语新手',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20avatar%20of%20a%20beginning%20English%20learner&image_size=square_1_1',
        content: '感谢分享！我也在尝试间隔重复法，确实比之前效果好多了。请问你用什么APP做复习呢？',
        likes: 12,
        createdAt: '2026-01-28T14:30:00Z'
      },
      {
        id: 'comment_001_2',
        postId: 'post_001',
        authorId: 'user_002',
        authorNickname: '樱花日语',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20avatar%20of%20a%20Japanese%20language%20learner&image_size=square_1_1',
        content: '这个方法学日语也适用！我背五十音图的时候就是用这个方法，效果很好。推荐给大家！',
        likes: 8,
        createdAt: '2026-01-28T15:45:00Z'
      }
    ],
    isPinned: true,
    createdAt: '2026-01-27T10:00:00Z',
    updatedAt: '2026-01-27T10:00:00Z'
  },
  {
    id: 'post_002',
    authorId: 'user_002',
    authorNickname: '樱花日语',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20avatar%20of%20a%20Japanese%20language%20learner&image_size=square_1_1',
    title: '日语N3备考经验帖',
    content: '准备参加7月的JLPT N3考试，想和大家交流一下备考策略。目前我在做的有：\n1. 每天背诵20个新单词\n2. 做2篇阅读理解\n3. 听30分钟听力材料\n\n感觉语法部分比较薄弱，特别是授受动词和被动语态的用法。有没有考过N3的前辈能分享一下经验？\n\n另外推荐几本参考书：《新完全掌握》系列、《大家的日语》中级。这两本都很不错！',
    category: 'discussion' as PostCategory,
    tags: ['日语', 'JLPT', 'N3', '备考'],
    likes: 67,
    views: 580,
    comments: [
      {
        id: 'comment_002_1',
        postId: 'post_002',
        authorId: 'user_004',
        authorNickname: '多语种爱好者',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diverse%20avatar%20of%20a%20polyglot%20language%20learner&image_size=square_1_1',
        content: '加油！我去年过了N3，语法的话建议多做真题，特别是近5年的。授受动词确实容易混淆，建议做个对比表格。',
        likes: 23,
        createdAt: '2026-01-28T09:15:00Z'
      }
    ],
    isPinned: false,
    createdAt: '2026-01-28T08:00:00Z',
    updatedAt: '2026-01-28T08:00:00Z'
  },
  {
    id: 'post_003',
    authorId: 'user_003',
    authorNickname: '韩语达人',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20illustration%20avatar%20of%20a%20Korean%20language%20learner&image_size=square_1_1',
    title: '韩语TOPIK II 写作技巧分享',
    content: '刚拿到TOPIK II 5级证书，想分享一下写作部分的备考经验。\n\n【小作文（200-300字）】\n- 图表描述题要注意数据对比\n- 使用连接词让逻辑清晰\n- 常用句型：~에 따라, ~것으로 나타나다\n\n【大作文（600-700字）】\n- 议论文结构：서론-본론-결론\n- 每段要有明确的主题句\n- 使用高级语法：(ㄴ/는)다는, ~ㄹ 뿐더러 등\n\n关键是要多写多练，最好找老师或母语者帮忙批改。祝大家考试顺利！',
    category: 'resource' as PostCategory,
    tags: ['韩语', 'TOPIK', '写作', '备考经验'],
    likes: 89,
    views: 720,
    comments: [
      {
        id: 'comment_003_1',
        postId: 'post_003',
        authorId: 'user_001',
        authorNickname: '语言探索者',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cartoon%20avatar%20of%20a%20young%20language%20learner&image_size=square_1_1',
        content: '太棒了！收藏了！请问大作文一般需要准备几个模板？',
        likes: 15,
        createdAt: '2026-01-28T11:20:00Z'
      },
      {
        id: 'comment_003_2',
        postId: 'post_003',
        authorId: 'user_002',
        authorNickname: '樱花日语',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20avatar%20of%20a%20Japanese%20language%20learner&image_size=square_1_1',
        content: '虽然我学的是日语，但语言学习方法都是相通的。这种结构化的方法很值得借鉴！',
        likes: 9,
        createdAt: '2026-01-28T13:40:00Z'
      }
    ],
    isPinned: true,
    createdAt: '2026-01-26T16:00:00Z',
    updatedAt: '2026-01-26T16:00:00Z'
  },
  {
    id: 'post_004',
    authorId: 'user_005',
    authorNickname: '英语新手',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20avatar%20of%20a%20beginning%20English%20learner&image_size=square_1_1',
    title: '求助：英语发音总是不标准怎么办？',
    content: '我是英语初学者，发现发音一直是个大问题。特别是th音（如think、this）和r/l的区别，总是发不好。\n\n试过跟读模仿，但感觉进步不大。想问问大家有什么好的练习方法？或者推荐的发音课程？\n\n谢谢大家！🙏',
    category: 'question' as PostCategory,
    tags: ['英语', '发音', '求助', '口语'],
    likes: 34,
    views: 290,
    comments: [
      {
        id: 'comment_004_1',
        postId: 'post_004',
        authorId: 'user_001',
        authorNickname: '语言探索者',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cartoon%20avatar%20of%20a%20young%20language%20learner&image_size=square_1_1',
        content: 'th音的秘诀是轻轻咬住舌尖然后送气。可以对着镜子练习。r音要卷舌但不要太过。推荐Rachel\'s English频道的视频，讲得很清楚！',
        likes: 28,
        createdAt: '2026-01-28T10:00:00Z'
      },
      {
        id: 'comment_004_2',
        postId: 'post_004',
        authorId: 'user_003',
        authorNickname: '韩语达人',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20illustration%20avatar%20of%20a%20Korean%20language%20learner&image_size=square_1_1',
        content: '录音对比法很有用！录下自己的发音再和原声对比，很容易发现问题所在。坚持练习一个月会有明显改善的！',
        likes: 19,
        createdAt: '2026-01-28T12:30:00Z'
      }
    ],
    isPinned: false,
    createdAt: '2026-01-29T07:30:00Z',
    updatedAt: '2026-01-29T07:30:00Z'
  },
  {
    id: 'post_005',
    authorId: 'user_004',
    authorNickname: '多语种爱好者',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diverse%20avatar%20of%20a%20polyglot%20language%20learner&image_size=square_1_1',
    title: '第15天打卡！日语学习进度报告',
    content: '【今日学习内容】\n✅ 单词：新学25个，复习50个\n✅ 语法：学习了～て form的变形规则\n✅ 听力：NHK新闻慢速版15分钟\n✅ 口语：影子跟读练习20分钟\n\n【学习时长】90分钟\n\n【感悟】\n今天开始尝试用日语写日记，虽然只能写简单的句子，但感觉很有成就感！语法中的て形变形有点复杂，需要多练习。明天计划重点复习动词变形。\n\n一起加油！💪',
    category: 'showcase' as PostCategory,
    tags: ['打卡', '日语', '学习记录', '第15天'],
    likes: 56,
    views: 420,
    comments: [
      {
        id: 'comment_005_1',
        postId: 'post_005',
        authorId: 'user_002',
        authorNickname: '樱花日语',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20avatar%20of%20a%20Japanese%20language%20learner&image_size=square_1_1',
        content: '太厉害了！坚持15天真的很棒。て形确实是难点，建议做个动词分类表会更清楚。',
        likes: 11,
        createdAt: '2026-01-29T08:45:00Z'
      }
    ],
    isPinned: false,
    createdAt: '2026-01-29T22:00:00Z',
    updatedAt: '2026-01-29T22:00:00Z'
  },
  {
    id: 'post_006',
    authorId: 'user_001',
    authorNickname: '语言探索者',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cartoon%20avatar%20of%20a%20young%20language%20learner&image_size=square_1_1',
    title: '推荐几个免费英语学习资源',
    content: '整理了一些我觉得特别有用的免费资源，分享给各位同学：\n\n【听力】\n1. BBC Learning English - 各级别都有，更新及时\n2. VOA Learning News - 新闻类听力材料\n3. TED Talks - 有字幕可选\n\n【阅读】\n1. News in Levels - 分级新闻阅读\n2. Project Gutenberg - 免费英文电子书\n3. Medium - 英文博客文章\n\n【词汇】\n1. Quizlet - 闪卡制作和复习\n2. Anki - 间隔重复软件\n3. Memrise - 游戏化记单词\n\n这些资源都是免费的，质量很高，强烈推荐！',
    category: 'resource' as PostCategory,
    tags: ['英语', '学习资源', '推荐', '免费'],
    likes: 128,
    views: 960,
    comments: [
      {
        id: 'comment_006_1',
        postId: 'post_006',
        authorId: 'user_005',
        authorNickname: '英语新手',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20avatar%20of%20a%20beginning%20English%20learner&image_size=square_1_1',
        content: '太感谢了！正好不知道用什么资源，这下有方向了！',
        likes: 18,
        createdAt: '2026-01-28T16:20:00Z'
      },
      {
        id: 'comment_006_2',
        postId: 'post_006',
        authorId: 'user_003',
        authorNickname: '韩语达人',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20illustration%20avatar%20of%20a%20Korean%20language%20learner&image_size=square_1_1',
        content: 'Anki真的好用！我用它背韩语单词效率很高。Quizlet用来做小组学习也不错。',
        likes: 14,
        createdAt: '2026-01-28T17:50:00Z'
      },
      {
        id: 'comment_006_3',
        postId: 'post_006',
        authorId: 'user_004',
        authorNickname: '多语种爱好者',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diverse%20avatar%20of%20a%20polyglot%20language%20learner&image_size=square_1_1',
        content: '已收藏！TED Talks我一直在看，确实对提升听力和拓展视野都很有帮助。',
        likes: 9,
        createdAt: '2026-01-28T19:10:00Z'
      }
    ],
    isPinned: true,
    createdAt: '2026-01-25T14:00:00Z',
    updatedAt: '2026-01-25T14:00:00Z'
  },
  {
    id: 'post_007',
    authorId: 'user_003',
    authorNickname: '韩语达人',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20illustration%20avatar%20of%20a%20Korean%20language%20learner&image_size=square_1_1',
    title: '韩剧《黑暗荣耀》里的地道表达',
    content: '最近重刷《黑暗荣耀》，记录了一些地道的韩语表达，分享给大家：\n\n1. "어쩔 수 없지" - 没办法/无可奈何\n   场景：当遇到无法改变的情况时使用\n\n2. "그럭저럭" - 马马虎虎/还过得去\n   场景：回答"最近怎么样"时的常用表达\n\n3. "기가 막혀" - 气死了/无语了\n   场景：表示无奈或愤怒的情绪\n\n4. "눈치 없네" - 真没眼力见\n   场景：吐槽别人不懂察言观色\n\n通过看韩剧学韩语是个很好的方法，既能娱乐又能学习，一举两得！',
    category: 'discussion' as PostCategory,
    tags: ['韩语', '韩剧', '地道表达', '学习趣事'],
    likes: 92,
    views: 750,
    comments: [
      {
        id: 'comment_007_1',
        postId: 'post_007',
        authorId: 'user_002',
        authorNickname: '樱花日语',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20avatar%20of%20a%20Japanese%20language%20learner&image_size=square_1_1',
        content: '哈哈我也喜欢通过日剧学日语！这种方法学到的表达最自然最地道。',
        likes: 16,
        createdAt: '2026-01-28T20:30:00Z'
      }
    ],
    isPinned: false,
    createdAt: '2026-01-28T21:00:00Z',
    updatedAt: '2026-01-28T21:00:00Z'
  },
  {
    id: 'post_008',
    authorId: 'user_002',
    authorNickname: '樱花日语',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20avatar%20of%20a%20Japanese%20language%20learner&image_size=square_1_1',
    title: '日语敬语太难了😭',
    content: '学了一段时间日语，发现敬语真的是个大坑...\n\n尊敬語、謙譲語、丁寧語，每种都有不同的用法。而且同一个意思有好几种表达方式，根据场合和对象还要选择不同的等级。\n\n比如"吃饭"：\n- 食べる（普通）\n- 召し上がる（尊敬）\n- いただく（謙譲）\n\n有没有什么好的学习方法？或者大家是怎么攻克敬语的？求指点！',
    category: 'question' as PostCategory,
    tags: ['日语', '敬语', '困难', '求助'],
    likes: 73,
    views: 610,
    comments: [
      {
        id: 'comment_008_1',
        postId: 'post_008',
        authorId: 'user_004',
        authorNickname: '多语种爱好者',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diverse%20avatar%20of%20a%20polyglot%20language%20learner&image_size=square_1_1',
        content: '敬语确实是日语最难的部分之一！我的方法是先从丁寧語开始（です/ます），然后再慢慢加入尊敬語和謙譲語。不要一次性全学，会崩溃的😂',
        likes: 31,
        createdAt: '2026-01-28T23:00:00Z'
      },
      {
        id: 'comment_008_2',
        postId: 'post_008',
        authorId: 'user_001',
        authorNickname: '语言探索者',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cartoon%20avatar%20of%20a%20young%20language%20learner&image_size=square_1_1',
        content: '推荐《日本語の敬語》这本书，讲解得很系统。另外多看职场日剧也能帮助理解敬语的使用场景。',
        likes: 24,
        createdAt: '2026-01-29T01:30:00Z'
      }
    ],
    isPinned: false,
    createdAt: '2026-01-29T06:00:00Z',
    updatedAt: '2026-01-29T06:00:00Z'
  },
  {
    id: 'post_009',
    authorId: 'user_005',
    authorNickname: '英语新手',
    authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20avatar%20of%20a%20beginning%20English%20learner&image_size=square_1_1',
    title: 'Day 7 打卡！一周总结',
    content: '【本周学习成果】\n✅ 学习天数：7天（连续！）\n✅ 新学单词：70个\n✅ 完成课程：3节基础课\n✅ 学习总时长：350分钟\n\n【下周目标】\n- 继续保持每日学习习惯\n- 开始学习简单的英语对话\n- 尝试用英语写日记\n\n感谢LinguaFlow平台让我养成了学习的习惯！看到自己的进步真的很有动力继续下去。一起努力的小伙伴们加油！🎉',
    category: 'checkin' as PostCategory,
    tags: ['打卡', '第7天', '一周总结', '英语'],
    likes: 41,
    views: 340,
    comments: [
      {
        id: 'comment_009_1',
        postId: 'post_009',
        authorId: 'user_001',
        authorNickname: '语言探索者',
        authorAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cartoon%20avatar%20of%20a%20young%20language%20learner&image_size=square_1_1',
        content: '连续7天打卡太棒了！已经养成习惯了，继续保持！',
        likes: 12,
        createdAt: '2026-01-29T08:00:00Z'
      }
    ],
    isPinned: false,
    createdAt: '2026-01-29T23:00:00Z',
    updatedAt: '2026-01-29T23:00:00Z'
  }
];

export const MOCK_CHECK_INS: CheckIn[] = [
  {
    id: 'checkin_001',
    userId: 'user_001',
    date: '2026-01-29',
    studyTime: 45,
    wordsLearned: 15,
    lessonsCompleted: 2,
    note: '今天完成了语法课程的第三章，感觉对时态的理解更深入了。明天计划做些练习题巩固一下。',
    streakDay: 12,
    createdAt: '2026-01-29T23:30:00Z'
  },
  {
    id: 'checkin_002',
    userId: 'user_001',
    date: '2026-01-28',
    studyTime: 38,
    wordsLearned: 12,
    lessonsCompleted: 1,
    note: '工作比较忙但还是坚持学了半小时，听了两段听力材料。',
    streakDay: 11,
    createdAt: '2026-01-28T22:15:00Z'
  },
  {
    id: 'checkin_003',
    userId: 'user_002',
    date: '2026-01-29',
    studyTime: 65,
    wordsLearned: 25,
    lessonsCompleted: 3,
    note: '今天效率很高！背完了新的动词变形规则，做了5道语法题全对了。感觉N3更有信心了！',
    streakDay: 28,
    createdAt: '2026-01-29T23:45:00Z'
  },
  {
    id: 'checkin_004',
    userId: 'user_002',
    date: '2026-01-28',
    studyTime: 52,
    wordsLearned: 20,
    lessonsCompleted: 2,
    note: '复习了之前学的助词用法，有些地方还是容易混淆，需要加强练习。',
    streakDay: 27,
    createdAt: '2026-01-28T23:00:00Z'
  },
  {
    id: 'checkin_005',
    userId: 'user_003',
    date: '2026-01-29',
    studyTime: 78,
    wordsLearned: 30,
    lessonsCompleted: 4,
    note: '今天挑战了一下高级阅读材料，虽然有些难但收获很大。TOPIK II备考中，加油！',
    streakDay: 45,
    createdAt: '2026-01-29T23:55:00Z'
  },
  {
    id: 'checkin_006',
    userId: 'user_003',
    date: '2026-01-28',
    studyTime: 60,
    wordsLearned: 22,
    lessonsCompleted: 3,
    note: '写作练习完成了一篇议论文，用了几个高级语法点。希望考试时能发挥出来。',
    streakDay: 44,
    createdAt: '2026-01-28T23:20:00Z'
  },
  {
    id: 'checkin_007',
    userId: 'user_005',
    date: '2026-01-29',
    studyTime: 32,
    wordsLearned: 10,
    lessonsCompleted: 1,
    note: '第七天打卡成功！连续一周学习，感觉自己进步了很多。继续加油！',
    streakDay: 7,
    createdAt: '2026-01-29T22:00:00Z'
  },
  {
    id: 'checkin_008',
    userId: 'user_004',
    date: '2026-01-29',
    studyTime: 55,
    wordsLearned: 18,
    lessonsCompleted: 2,
    note: '日语学习第15天！开始尝试用日语写简单日记，虽然只有几句话但是很有成就感。',
    streakDay: 15,
    createdAt: '2026-01-29T23:10:00Z'
  }
];

export const getPostsByCategory = (category: PostCategory): Post[] => {
  return MOCK_POSTS.filter(post => post.category === category);
};

export const getPostsByAuthor = (authorId: string): Post[] => {
  return MOCK_POSTS.filter(post => post.authorId === authorId);
};

export const getCheckInsByUser = (userId: string): CheckIn[] => {
  return MOCK_CHECK_INS.filter(checkin => checkin.userId === userId);
};

export const getPinnedPosts = (): Post[] => {
  return MOCK_POSTS.filter(post => post.isPinned);
};
