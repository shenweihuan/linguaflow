import { Course, LanguageLevel, Language } from '../../types/course';

const ENGLISH: Language = { code: 'en', name: '英语', nativeName: 'English', flag: '🇺🇸' };
const JAPANESE: Language = { code: 'ja', name: '日语', nativeName: '日本語', flag: '🇯🇵' };
const KOREAN: Language = { code: 'ko', name: '韩语', nativeName: '한국어', flag: '🇰🇷' };

export const MOCK_COURSES: Course[] = [
  // 英语课程
  {
    id: 'course_en_001',
    title: '英语日常会话入门',
    description: '从零开始学习英语基础会话，掌握问候、自我介绍、购物等日常场景表达',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=English%20conversation%20learning%20beginner%20friendly%20illustration&image_size=landscape_16_9',
    language: ENGLISH,
    level: LanguageLevel.A1,
    category: 'conversation',
    totalLessons: 24,
    chapters: [
      {
        id: 'ch_en_001_1',
        title: '问候与自我介绍',
        description: '学习基本的问候语和自我介绍方式',
        order: 1,
        lessons: [
          { id: 'lesson_en_001_1_1', title: 'Hello 和 Hi 的使用场景', description: '了解不同场合的问候方式', order: 1, duration: 15, isLocked: false, isCompleted: true },
          { id: 'lesson_en_001_1_2', title: '自我介绍模板', description: '掌握姓名、年龄、职业等基本信息的表达', order: 2, duration: 20, isLocked: false, isCompleted: true },
          { id: 'lesson_en_001_1_3', title: '询问对方信息', description: '学习如何礼貌地询问他人信息', order: 3, duration: 18, isLocked: false, isCompleted: false },
          { id: 'lesson_en_001_1_4', title: '实战练习：初次见面对话', description: '综合运用所学内容进行模拟对话', order: 4, duration: 25, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_en_001_2',
        title: '数字与时间',
        description: '学习数字、日期、时间的英文表达',
        order: 2,
        lessons: [
          { id: 'lesson_en_001_2_1', title: '基数词与序数词', description: '掌握1-100的数字表达', order: 1, duration: 20, isLocked: true, isCompleted: false },
          { id: 'lesson_en_001_2_2', title: '星期和月份', description: '学习星期的名称和12个月份的发音', order: 2, duration: 18, isLocked: true, isCompleted: false },
          { id: 'lesson_en_001_2_3', title: '时间的表达', description: '学会用英语表达具体时间和时间段', order: 3, duration: 22, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_en_001_3',
        title: '家庭与朋友',
        description: '学习家庭成员称呼和朋友相关的词汇',
        order: 3,
        lessons: [
          { id: 'lesson_en_001_3_1', title: '家庭成员称谓', description: 'father, mother, brother 等家庭成员词汇', order: 1, duration: 15, isLocked: true, isCompleted: false },
          { id: 'lesson_en_001_3_2', title: '描述家人特征', description: '使用形容词描述家人的外貌和性格', order: 2, duration: 20, isLocked: true, isCompleted: false },
          { id: 'lesson_en_001_3_3', title: '谈论朋友', description: '如何介绍朋友并描述友谊', order: 3, duration: 18, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.8,
    enrolledCount: 1520,
    createdAt: '2025-10-01T00:00:00Z'
  },
  {
    id: 'course_en_002',
    title: '英语语法精讲 A2-B1',
    description: '系统学习英语核心语法点，包括时态、从句、虚拟语气等',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=English%20grammar%20book%20study%20education%20illustration&image_size=landscape_16_9',
    language: ENGLISH,
    level: LanguageLevel.A2,
    category: 'grammar',
    totalLessons: 32,
    chapters: [
      {
        id: 'ch_en_002_1',
        title: '时态系统（一）',
        description: '一般现在时、一般过去时、一般将来时',
        order: 1,
        lessons: [
          { id: 'lesson_en_002_1_1', title: '一般现在时的用法', description: '习惯性动作、客观事实、状态动词', order: 1, duration: 25, isLocked: false, isCompleted: true },
          { id: 'lesson_en_002_1_2', title: '一般过去时的构成与用法', description: '规则动词和不规则动词的变化', order: 2, duration: 28, isLocked: false, isCompleted: false },
          { id: 'lesson_en_002_1_3', title: '一般将来时的多种表达', description: 'will, be going to, present continuous', order: 3, duration: 30, isLocked: true, isCompleted: false },
          { id: 'lesson_en_002_1_4', title: '时态综合练习', description: '在语境中正确选择时态', order: 4, duration: 35, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_en_002_2',
        title: '时态系统（二）',
        description: '进行时、完成时、完成进行时',
        order: 2,
        lessons: [
          { id: 'lesson_en_002_2_1', title: '现在进行时与过去进行时', description: '正在进行的动作和背景描写', order: 1, duration: 25, isLocked: true, isCompleted: false },
          { id: 'lesson_en_002_2_2', title: '现在完成时的重点难点', description: 'have/has + done 的各种用法', order: 2, duration: 30, isLocked: true, isCompleted: false },
          { id: 'lesson_en_002_2_3', title: '过去完成时与将来完成时', description: '过去的过去和将来的完成', order: 3, duration: 28, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_en_002_3',
        title: '从句与复合句',
        description: '定语从句、名词性从句、状语从句',
        order: 3,
        lessons: [
          { id: 'lesson_en_002_3_1', title: '定语从句的关系词', description: 'who, which, that, where, when', order: 1, duration: 28, isLocked: true, isCompleted: false },
          { id: 'lesson_en_002_3_2', title: '名词性从句的种类', description: '主语从句、宾语从句、表语从句、同位语从句', order: 2, duration: 32, isLocked: true, isCompleted: false },
          { id: 'lesson_en_002_3_3', title: '状语从句的引导词', description: '时间、地点、原因、条件、让步状语从句', order: 3, duration: 30, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.6,
    enrolledCount: 980,
    createdAt: '2025-10-15T00:00:00Z'
  },
  {
    id: 'course_en_003',
    title: '商务英语进阶 B2',
    description: '职场必备商务英语技能：邮件写作、会议沟通、谈判技巧',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20English%20meeting%20professional%20office&image_size=landscape_16_9',
    language: ENGLISH,
    level: LanguageLevel.B2,
    category: 'writing',
    totalLessons: 28,
    chapters: [
      {
        id: 'ch_en_003_1',
        title: '商务邮件写作',
        description: '掌握正式邮件的结构和常用表达',
        order: 1,
        lessons: [
          { id: 'lesson_en_003_1_1', title: '邮件格式与礼仪', description: '主题行、称呼、正文结构、结尾敬语', order: 1, duration: 22, isLocked: false, isCompleted: false },
          { id: 'lesson_en_003_1_2', title: '请求与确认类邮件', description: '如何礼貌地提出请求和确认事项', order: 2, duration: 25, isLocked: true, isCompleted: false },
          { id: 'lesson_en_003_1_3', title: '道歉与投诉处理', description: '专业地处理负面情况的邮件写作', order: 3, duration: 25, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_en_003_2',
        title: '会议与演示',
        description: '会议主持、参与讨论、做演示报告',
        order: 2,
        lessons: [
          { id: 'lesson_en_003_2_1', title: '会议开场与议程设置', description: '专业地开始一场会议', order: 1, duration: 20, isLocked: true, isCompleted: false },
          { id: 'lesson_en_003_2_2', title: '表达意见与提出建议', description: 'I think..., I suggest..., What if...?', order: 2, duration: 25, isLocked: true, isCompleted: false },
          { id: 'lesson_en_003_2_3', title: 'PPT演示演讲技巧', description: '开场白、过渡语、总结语的运用', order: 3, duration: 30, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.7,
    enrolledCount: 650,
    createdAt: '2025-11-01T00:00:00Z'
  },
  {
    id: 'course_en_004',
    title: '英语听力突破 C1',
    description: '通过新闻、播客、电影对白提升高级听力理解能力',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=English%20listening%20headphones%20podcast%20audio&image_size=landscape_16_9',
    language: ENGLISH,
    level: LanguageLevel.C1,
    category: 'listening',
    totalLessons: 36,
    chapters: [
      {
        id: 'ch_en_004_1',
        title: '新闻听力训练',
        description: 'BBC、CNN 新闻报道听力练习',
        order: 1,
        lessons: [
          { id: 'lesson_en_004_1_1', title: '新闻报道的结构特点', description: '倒金字塔结构和关键信息抓取', order: 1, duration: 30, isLocked: false, isCompleted: false },
          { id: 'lesson_en_004_1_2', title: '政治经济新闻', description: '选举、政策、市场等专业词汇', order: 2, duration: 32, isLocked: true, isCompleted: false },
          { id: 'lesson_en_004_1_3', title: '科技文化新闻', description: '科技创新、文化活动相关报道', order: 3, duration: 28, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_en_004_2',
        title: '学术讲座听力',
        description: 'TED演讲、大学公开课听力训练',
        order: 2,
        lessons: [
          { id: 'lesson_en_004_2_1', title: '学术演讲的语言特点', description: '正式用语、逻辑连接词、修辞手法', order: 1, duration: 35, isLocked: true, isCompleted: false },
          { id: 'lesson_en_004_2_2', title: '笔记技巧训练', description: '边听边记的关键信息捕捉方法', order: 2, duration: 30, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.9,
    enrolledCount: 420,
    createdAt: '2025-11-15T00:00:00Z'
  },

  // 日语课程
  {
    id: 'course_ja_001',
    title: '日语五十音图速成',
    description: '快速掌握平假名、片假名的读写，为日语学习打下坚实基础',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20hiragana%20katakana%20alphabet%20learning&image_size=landscape_16_9',
    language: JAPANESE,
    level: LanguageLevel.A1,
    category: 'vocabulary',
    totalLessons: 20,
    chapters: [
      {
        id: 'ch_ja_001_1',
        title: '平假名（上）',
        description: 'あ行到な行的平假名',
        order: 1,
        lessons: [
          { id: 'lesson_ja_001_1_1', title: 'あ行：基本元音', description: 'あいうえお的书写和发音', order: 1, duration: 20, isLocked: false, isCompleted: true },
          { id: 'lesson_ja_001_1_2', title: 'か行：清音k', description: 'かきくけこ的发音要点', order: 2, duration: 18, isLocked: false, isCompleted: true },
          { id: 'lesson_ja_001_1_3', title: 'さ行：清音s', description: 'さしすせそ，注意し的特殊发音', order: 3, duration: 22, isLocked: false, isCompleted: false },
          { id: 'lesson_ja_001_1_4', title: 'た行・な行', description: 'たちつてと・なにぬねの', order: 4, duration: 25, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_ja_001_2',
        title: '平假名（下）+ 片假名',
        description: 'は行到わ行及片假名学习',
        order: 2,
        lessons: [
          { id: 'lesson_ja_001_2_1', title: 'は行到わ行', description: 'はひふへほ・まみむめも等', order: 1, duration: 25, isLocked: true, isCompleted: false },
          { id: 'lesson_ja_001_2_2', title: '片假名入门', description: 'アイウエオ等片假名对应关系', order: 2, duration: 28, isLocked: true, isCompleted: false },
          { id: 'lesson_ja_001_2_3', title: '综合测试：假名认读', description: '混合假名的快速识别练习', order: 3, duration: 20, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.9,
    enrolledCount: 2100,
    createdAt: '2025-09-20T00:00:00Z'
  },
  {
    id: 'course_ja_002',
    title: '日语基础语法 N5-N4',
    description: '涵盖JLPT N5和N4级别的核心语法点，助词、动词变形、敬语基础',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20grammar%20textbook%20particles%20verbs&image_size=landscape_16_9',
    language: JAPANESE,
    level: LanguageLevel.A2,
    category: 'grammar',
    totalLessons: 30,
    chapters: [
      {
        id: 'ch_ja_002_1',
        title: '助词系统',
        description: 'は、が、を、に、で、へ等基础助词',
        order: 1,
        lessons: [
          { id: 'lesson_ja_002_1_1', title: '主题提示「は」vs 主格标记「が」', description: '两者的区别和使用场景', order: 1, duration: 25, isLocked: false, isCompleted: true },
          { id: 'lesson_ja_002_1_2', title: '宾格「を」与场所助词', description: '动作对象和位置关系的表达', order: 2, duration: 22, isLocked: false, isCompleted: false },
          { id: 'lesson_ja_002_1_3', title: '方向助词「に」「へ」「で」', description: '目的地、方向、手段场所的区别', order: 3, duration: 28, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_ja_002_2',
        title: '动词变形',
        description: 'ます形、て形、た形、ない形的规则与例外',
        order: 2,
        lessons: [
          { id: 'lesson_ja_002_2_1', title: '一类动词（五段动词）变形', description: '词尾变化规律和音便规则', order: 1, duration: 30, isLocked: true, isCompleted: false },
          { id: 'lesson_ja_002_2_2', title: '二类动词（一段动词）变形', description: '规则的词尾变化', order: 2, duration: 22, isLocked: true, isCompleted: false },
          { id: 'lesson_ja_002_2_3', title: '三类动词（不规则动词）', description: 'する、くる的特殊变化', order: 3, duration: 18, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.7,
    enrolledCount: 1350,
    createdAt: '2025-10-05T00:00:00Z'
  },
  {
    id: 'course_ja_003',
    title: '日语口语实战 B1',
    description: '提升日常交流能力，学习自然地道的日语表达方式',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20daily%20conversation%20speaking%20practice&image_size=landscape_16_9',
    language: JAPANESE,
    level: LanguageLevel.B1,
    category: 'conversation',
    totalLessons: 26,
    chapters: [
      {
        id: 'ch_ja_003_1',
        title: '日常生活场景',
        description: '餐厅、购物、交通、医院等场景会话',
        order: 1,
        lessons: [
          { id: 'lesson_ja_003_1_1', title: '在餐厅点餐', description: 'メニューを見せてください等实用表达', order: 1, duration: 22, isLocked: false, isCompleted: false },
          { id: 'lesson_ja_003_1_2', title: '便利店与超市购物', description: '价格询问、结账、退换货', order: 2, duration: 20, isLocked: true, isCompleted: false },
          { id: 'lesson_ja_003_1_3', title: '问路与乘坐交通工具', description: '駅はどこですか？等出行必备', order: 3, duration: 25, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_ja_003_2',
        title: '社交与文化话题',
        description: '日本文化相关的深度交流',
        order: 2,
        lessons: [
          { id: 'lesson_ja_003_2_1', title: '谈论天气与季节', description: '日本人最爱的闲聊话题', order: 1, duration: 18, isLocked: true, isCompleted: false },
          { id: 'lesson_ja_003_2_2', title: '兴趣爱好与推荐', description: '～をおすすめします的表达', order: 2, duration: 22, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.8,
    enrolledCount: 890,
    createdAt: '2025-11-10T00:00:00Z'
  },
  {
    id: 'course_ja_004',
    title: '日语阅读理解 N2',
    description: '通过新闻、小说、说明文提升N2级阅读能力',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20reading%20newspaper%20book%20literature&image_size=landscape_16_9',
    language: JAPANESE,
    level: LanguageLevel.B2,
    category: 'reading',
    totalLessons: 34,
    chapters: [
      {
        id: 'ch_ja_004_1',
        title: '说明文阅读',
        description: '产品说明、操作指南、公告通知',
        order: 1,
        lessons: [
          { id: 'lesson_ja_004_1_1', title: '产品说明书阅读技巧', description: '抓住关键信息和注意事项', order: 1, duration: 28, isLocked: false, isCompleted: false },
          { id: 'lesson_ja_004_1_2', title: '公告与通知的理解', description: '公司内部通知、公共告示', order: 2, duration: 25, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_ja_004_2',
        title: '议论文与评论',
        description: '社论、书评、影评的逻辑分析',
        order: 2,
        lessons: [
          { id: 'lesson_ja_004_2_1', title: '论点的识别与论证分析', description: '作者的立场和支持理由', order: 1, duration: 30, isLocked: true, isCompleted: false },
          { id: 'lesson_ja_004_2_2', title: '长难句拆解技巧', description: '嵌套修饰语的处理方法', order: 2, duration: 32, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.6,
    enrolledCount: 520,
    createdAt: '2025-12-01T00:00:00Z'
  },

  // 韩语课程
  {
    id: 'course_ko_001',
    title: '韩语字母与发音',
    description: '掌握韩文字母（한글）的构造原理和发音规则',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Korean%20hangul%20alphabet%20letters%20learning&image_size=landscape_16_9',
    language: KOREAN,
    level: LanguageLevel.A1,
    category: 'vocabulary',
    totalLessons: 18,
    chapters: [
      {
        id: 'ch_ko_001_1',
        title: '元音（모음）',
        description: '韩语10个基本元音和11个复合元音',
        order: 1,
        lessons: [
          { id: 'lesson_ko_001_1_1', title: '基本元音 ㅏㅓㅗㅜㅡㅣ', description: '6个基础元音的口型和发音', order: 1, duration: 18, isLocked: false, isCompleted: true },
          { id: 'lesson_ko_001_1_2', title: '基本元音 ㅐㅔㅚㅟ', description: '其他基本元音的学习', order: 2, duration: 15, isLocked: false, isCompleted: true },
          { id: 'lesson_ko_001_1_3', title: '复合元音', description: 'ㅑㅕㅛㅠㅒㅖ等双元音', order: 3, duration: 22, isLocked: false, isCompleted: false }
        ]
      },
      {
        id: 'ch_ko_001_2',
        title: '辅音（자음）与收音（받침）',
        description: '19个辅音和7个代表收音',
        order: 2,
        lessons: [
          { id: 'lesson_ko_001_2_1', title: '基本辅音 ㄱㄴㄷㄹㅁㅂㅅㅇ', description: '核心辅音的发音部位和方法', order: 1, duration: 25, isLocked: true, isCompleted: false },
          { id: 'lesson_ko_001_2_2', title: '激音与浓音', description: 'ㅋㅌㅍㅎ和ㄲㄸㅃㅆㅉ', order: 2, duration: 20, isLocked: true, isCompleted: false },
          { id: 'lesson_ko_001_2_3', title: '收音的发音规则', description: '单收音和双收音的发音变化', order: 3, duration: 28, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.9,
    enrolledCount: 1850,
    createdAt: '2025-09-25T00:00:00Z'
  },
  {
    id: 'course_ko_002',
    title: '韩语初级语法 TOPIK I',
    description: 'TOPIK 1-2级必备语法：基本句型、时态、敬语',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Korean%20grammar%20textbook%20sentence%20patterns&image_size=landscape_16_9',
    language: KOREAN,
    level: LanguageLevel.A2,
    category: 'grammar',
    totalLessons: 28,
    chapters: [
      {
        id: 'ch_ko_002_1',
        title: '基本句型',
        description: '陈述句、疑问句、命令句、共动句',
        order: 1,
        lessons: [
          { id: 'lesson_ko_002_1_1', title: '입니다/입니다吗？', description: '名词谓语句的基本形式', order: 1, duration: 20, isLocked: false, isCompleted: true },
          { id: 'lesson_ko_002_1_2', title: '아요/어요 终结词尾', description: '动词和形容词的非正式敬语形式', order: 2, duration: 25, isLocked: false, isCompleted: false },
          { id: 'lesson_ko_002_1_3', title: '십시다/십니까？', description: '正式敬语的使用场合', order: 3, duration: 22, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_ko_002_2',
        title: '时态与连接词尾',
        description: '过去时、将来时、连接两个句子',
        order: 2,
        lessons: [
          { id: 'lesson_ko_002_2_1', title: '았/었/였 过去时', description: '表示已经完成的动作或状态', order: 1, duration: 25, isLocked: true, isCompleted: false },
          { id: 'lesson_ko_002_2_2', title: '(으)ㄹ 거예요 将来时', description: '意图、推测、计划的表达', order: 2, duration: 23, isLocked: true, isCompleted: false },
          { id: 'lesson_ko_002_2_3', title: '고/지만/어서 连接词尾', description: '并列、转折、因果关系的连接', order: 3, duration: 28, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.7,
    enrolledCount: 1120,
    createdAt: '2025-10-10T00:00:00Z'
  },
  {
    id: 'course_ko_003',
    title: '韩语生活会话 B1',
    description: '韩国生活必备场景对话：租房、看病、办理业务',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Korean%20daily%20life%20conversation%20Seoul%20street&image_size=landscape_16_9',
    language: KOREAN,
    level: LanguageLevel.B1,
    category: 'conversation',
    totalLessons: 24,
    chapters: [
      {
        id: 'ch_ko_003_1',
        title: '居住与生活服务',
        description: '租房、水电费、网络申请等',
        order: 1,
        lessons: [
          { id: 'lesson_ko_003_1_1', title: '找房与签约', description: '방을 구하고 계약하는 방법', order: 1, duration: 25, isLocked: false, isCompleted: false },
          { id: 'lesson_ko_003_1_2', title: '报修与投诉', description: '수리 요청과 불만 제기', order: 2, duration: 22, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_ko_003_2',
        title: '医疗与健康',
        description: '医院就诊、药店买药、健康咨询',
        order: 2,
        lessons: [
          { id: 'lesson_ko_003_2_1', title: '描述症状', description: '머리가 아파요, 열이 나요等', order: 1, duration: 20, isLocked: true, isCompleted: false },
          { id: 'lesson_ko_003_2_2', title: '在医院就诊流程', description: '挂号、问诊、取药全流程', order: 2, duration: 28, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.8,
    enrolledCount: 760,
    createdAt: '2025-11-20T00:00:00Z'
  },
  {
    id: 'course_ko_004',
    title: 'TOPIK II 高级备考 C1',
    description: 'TOPIK 5-6级备考：高级阅读、写作、听力策略',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=TOPIK%20exam%20preparation%20advanced%20Korean&image_size=landscape_16_9',
    language: KOREAN,
    level: LanguageLevel.C1,
    category: 'reading',
    totalLessons: 40,
    chapters: [
      {
        id: 'ch_ko_004_1',
        title: '高级阅读策略',
        description: '长篇文章的快速阅读和信息提取',
        order: 1,
        lessons: [
          { id: 'lesson_ko_004_1_1', title: '社论与专栏文章', description: '사설과 칼럼의 논리 구조 파악', order: 1, duration: 32, isLocked: false, isCompleted: false },
          { id: 'lesson_ko_004_1_2', title: '学术文章阅读', description: '학술 논문의 개요와 세부 내용 이해', order: 2, duration: 35, isLocked: true, isCompleted: false }
        ]
      },
      {
        id: 'ch_ko_004_2',
        title: '高级写作技巧',
        description: '议论文、说明文的框架与表达',
        order: 2,
        lessons: [
          { id: 'lesson_ko_004_2_1', title: '议论文写作框架', description: '서론-본론-결론의 구성', order: 1, duration: 38, isLocked: true, isCompleted: false },
          { id: 'lesson_ko_004_2_2', title: '高级语法与惯用语', description: '~(ㄴ/는)다는, ~ㄹ 뿐더러 등', order: 2, duration: 35, isLocked: true, isCompleted: false }
        ]
      }
    ],
    rating: 4.9,
    enrolledCount: 380,
    createdAt: '2025-12-10T00:00:00Z'
  }
];

export const getCoursesByLanguage = (languageCode: string): Course[] => {
  return MOCK_COURSES.filter(course => course.language.code === languageCode);
};

export const getCoursesByLevel = (level: LanguageLevel): Course[] => {
  return MOCK_COURSES.filter(course => course.level === level);
};

export const getCourseById = (id: string): Course | undefined => {
  return MOCK_COURSES.find(course => course.id === id);
};
