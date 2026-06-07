import { GrammarExercise } from '../../types/learning';

export const ENGLISH_GRAMMAR: GrammarExercise[] = [
  {
    id: 'grammar_en_001',
    question: 'She ___ to school every day.',
    type: 'multiple-choice',
    options: ['go', 'goes', 'going', 'went'],
    answer: 'goes',
    explanation: '主语She是第三人称单数，一般现在时动词要加-s。一般现在时表示习惯性动作。',
    difficulty: 1,
    relatedGrammarPoint: '一般现在时第三人称单数'
  },
  {
    id: 'grammar_en_002',
    question: 'I ___ my homework yesterday.',
    type: 'multiple-choice',
    options: ['do', 'did', 'done', 'doing'],
    answer: 'did',
    explanation: 'yesterday表示过去时间，需要用一般过去时。do的过去式是did（不规则变化）。',
    difficulty: 1,
    relatedGrammarPoint: '一般过去时'
  },
  {
    id: 'grammar_en_003',
    question: 'They ___ English for three years.',
    type: 'multiple-choice',
    options: ['study', 'studied', 'have studied', 'are studying'],
    answer: 'have studied',
    explanation: '"for three years"表示从过去持续到现在的动作，用现在完成时have/has + 过去分词。',
    difficulty: 2,
    relatedGrammarPoint: '现在完成时'
  },
  {
    id: 'grammar_en_004',
    question: 'If it ___ tomorrow, we will cancel the picnic.',
    type: 'fill-blank',
    options: ['rains', 'will rain', 'rained', 'rain'],
    answer: 'rains',
    explanation: '条件状语从句遵循"主将从现"原则，即主句用将来时，从句用一般现在时表示将来。',
    difficulty: 2,
    relatedGrammarPoint: '条件句（第一类）'
  },
  {
    id: 'grammar_en_005',
    question: 'The book ___ I bought yesterday is very interesting.',
    type: 'multiple-choice',
    options: ['who', 'which', 'what', 'where'],
    answer: 'which',
    explanation: '先行词book是物，定语从句中作宾语，关系代词用which或that。who用于指人。',
    difficulty: 2,
    relatedGrammarPoint: '定语从句'
  },
  {
    id: 'grammar_en_006',
    question: 'He suggested that she ___ the exam again.',
    type: 'multiple-choice',
    options: ['takes', 'took', 'take', 'taking'],
    answer: 'take',
    explanation: 'suggest后的that从句中要用虚拟语气，谓语动词用should + 动词原形，should可省略。',
    difficulty: 3,
    relatedGrammarPoint: '虚拟语气'
  },
  {
    id: 'grammar_en_007',
    question: 'Not only ___ fluent in English, but also speaks Japanese well.',
    type: 'fill-blank',
    options: ['she is', 'is she', 'she does', 'does she'],
    answer: 'is she',
    explanation: '"not only...but also..."置于句首时，前半部分需要倒装。正常语序是"She is not only..."。',
    difficulty: 3,
    relatedGrammarPoint: '倒装结构'
  },
  {
    id: 'grammar_en_008',
    question: 'I wish I ___ more time to study languages.',
    type: 'multiple-choice',
    options: ['have', 'had', 'will have', 'would have'],
    answer: 'had',
    explanation: 'wish后面的从句通常用虚拟语气，与现在事实相反时用过去式。这里表示对现状的遗憾。',
    difficulty: 3,
    relatedGrammarPoint: 'wish虚拟语气'
  },
  {
    id: 'grammar_en_009',
    question: 'By the time you arrive, we ___ dinner.',
    type: 'multiple-choice',
    options: ['will have finished', 'finish', 'finished', 'have finished'],
    answer: 'will have finished',
    explanation: '"by the time + 一般现在时"表示将来的某个时间点之前完成的动作，用将来完成时。',
    difficulty: 3,
    relatedGrammarPoint: '将来完成时'
  },
  {
    id: 'grammar_en_010',
    question: 'The manager, along with his team, ___ working on the project.',
    type: 'fill-blank',
    options: ['is', 'are', 'were', 'been'],
    answer: 'is',
    explanation: '主语后跟along with、together with、as well as等短语时，谓语动词与前面的主语一致。manager是单数。',
    difficulty: 2,
    relatedGrammarPoint: '主谓一致'
  },
  {
    id: 'grammar_en_011',
    question: 'Having studied all night, he ___ the exam with confidence.',
    type: 'multiple-choice',
    options: ['took', 'takes', 'taking', 'taken'],
    answer: 'took',
    explanation: '现在分词的完成式having studied作状语，表示该动作在主句动作之前完成。主句用一般过去时。',
    difficulty: 3,
    relatedGrammarPoint: '非谓语动词'
  },
  {
    id: 'grammar_en_012',
    question: 'It is high time that we ___ action.',
    type: 'multiple-choice',
    options: ['take', 'took', 'will take', 'would take'],
    answer: 'took',
    explanation: '"It is (high/about) time that..."句型中，从句谓语用一般过去时表示虚拟，意为"早该做某事了"。',
    difficulty: 3,
    relatedGrammarPoint: '特殊虚拟句型'
  },
  {
    id: 'grammar_en_013',
    question: '___ is known to all, the earth moves around the sun.',
    type: 'fill-blank',
    options: ['It', 'As', 'What', 'Which'],
    answer: 'As',
    explanation: 'As引导非限制性定语从句，指代整个主句内容，意为"正如"。It不能引导从句。',
    difficulty: 2,
    relatedGrammarPoint: '非限制性定语从句'
  },
  {
    id: 'grammar_en_014',
    question: 'I would rather you ___ tomorrow than today.',
    type: 'multiple-choice',
    options: ['come', 'came', 'will come', 'coming'],
    answer: 'came',
    explanation: 'would rather后接从句时，与现在/将来事实相反用过去式，与过去事实相反用过去完成时。',
    difficulty: 3,
    relatedGrammarPoint: 'would rather虚拟语气'
  },
  {
    id: 'grammar_en_015',
    question: 'The reason ___ he was late was ___ he missed the bus.',
    type: 'sentence-order',
    options: null,
    answer: 'why; that',
    explanation: 'reason后接why/that引导的定语从句；the reason is/was that...为固定句型，that不可省略。',
    difficulty: 2,
    relatedGrammarPoint: 'reason的用法'
  }
];

export const JAPANESE_GRAMMAR: GrammarExercise[] = [
  {
    id: 'grammar_ja_001',
    question: '昨日、公園___友達と会いました。',
    type: 'multiple-choice',
    options: ['で', 'に', 'を', 'が'],
    answer: 'で',
    explanation: 'で表示动作发生的场所。"在公园"这个地点背景下发生了"见面"这个动作，所以用で。',
    difficulty: 1,
    relatedGrammarPoint: '场所助词で'
  },
  {
    id: 'grammar_ja_002',
    question: '私は毎朝6時___起きます。',
    type: 'multiple-choice',
    options: ['に', 'で', 'へ', 'を'],
    answer: 'に',
    explanation: 'に表示具体的时间点。"每天早上6点"是一个确切的时间，所以用に表示动作发生的时间。',
    difficulty: 1,
    relatedGrammarPoint: '时间助词に'
  },
  {
    id: 'grammar_ja_003',
    question: 'この本は田中さん___もらいました。',
    type: 'multiple-choice',
    options: ['に', 'から', 'で', 'と'],
    answer: 'から',
    explanation: 'もらう表示"从某人那里得到"，动作的来源用から或に表示。から强调来源方向性更强。',
    difficulty: 2,
    relatedGrammarPoint: '授受动词もらう'
  },
  {
    id: 'grammar_ja_004',
    question: '日本語___話せますか？',
    type: 'fill-blank',
    options: ['が', 'を', 'に', 'で'],
    answer: 'が',
    explanation: '可能动词（如話せる）的对象语用が标记，而不是を。这是可能态的特殊用法。',
    difficulty: 2,
    relatedGrammarPoint: '可能态对象语が'
  },
  {
    id: 'grammar_ja_005',
    question: '雨が降り___、家にいます。',
    type: 'multiple-choice',
    options: ['ので', 'のに', 'のを', 'のだ'],
    answer: 'ので',
    explanation: 'ので表示原因理由，意为"因为下雨"。のに表示转折"尽管下雨"，不符合语境。',
    difficulty: 2,
    relatedGrammarPoint: '接续助词ので'
  },
  {
    id: 'grammar_ja_006',
    question: '来週のパーティーに行く___行かない___まだ決めていません。',
    type: 'multiple-choice',
    options: ['か、か', 'し、し', 'たり、たり', 'て、て'],
    answer: 'か、か',
    explanation: '～か～か表示"是……还是……"，列举选择项。～し～し表示并列原因；～たり～たり表示举例。',
    difficulty: 2,
    relatedGrammarPoint: '并列助词か'
  },
  {
    id: 'grammar_ja_007',
    question: '先生は学生に宿題を___と言いました。',
    type: 'fill-blank',
    options: ['しろ', 'すれ', 'せよ', 'しなさい'],
    answer: 'しろ',
    explanation: '引用命令内容时，动词用命令形。する的命令形是しろ（口语）或せよ（书面）。言った后面常接と表示引用内容。',
    difficulty: 3,
    relatedGrammarPoint: '命令形与引用'
  },
  {
    id: 'grammar_ja_008',
    question: 'もう少しで遅刻する___でした。',
    type: 'multiple-choice',
    options: ['ところ', 'はず', 'べき', 'わけ'],
    answer: 'ところ',
    explanation: 'もう少しで～ところだ表示"差一点就……"，描述差点发生但未发生的事情。',
    difficulty: 3,
    relatedGrammarPoint: 'ところだ的用法'
  },
  {
    id: 'grammar_ja_009',
    question: '彼女は歌___踊り___どちらも得意です。',
    type: 'multiple-choice',
    options: ['も、も', 'や、や', 'とか、とか', 'など、など'],
    answer: 'も、も',
    explanation: 'も…も…表示"既……又……"，全面肯定两个项目。や…や…表示不完全列举。',
    difficulty: 2,
    relatedGrammarPoint: '提示助词も'
  },
  {
    id: 'grammar_ja_010',
    question: 'この仕事は一人では___すぎます。',
    type: 'fill-blank',
    options: ['難しい', '難しく', '難し', '難しさ'],
    answer: '難し',
    explanation: '～すぎる接在动词连用形或形容词词干后，表示"过于…"。難しい去掉い变成難し+すぎる。',
    difficulty: 2,
    relatedGrammarPoint: '接尾词すぎる'
  },
  {
    id: 'grammar_ja_011',
    question: '親___相談してから決めたほうがいいですよ。',
    type: 'multiple-choice',
    options: ['に', 'と', 'を', 'から'],
    answer: 'と',
    explanation: '～と相談する表示"和某人商量"。と表示动作的共同参与者或对象。',
    difficulty: 1,
    relatedGrammarPoint: '相談する的搭配'
  },
  {
    id: 'grammar_ja_012',
    question: 'あの人___見たことがあるような気がします。',
    type: 'multiple-choice',
    options: ['に', 'を', 'が', 'で'],
    answer: 'を',
    explanation: '見る是他动词，对象用を标记。～たことがある表示曾经有过某种经历。',
    difficulty: 2,
    relatedGrammarPoint: '～たことがある'
  },
  {
    id: 'grammar_ja_013',
    question: '試験に合格できる___一生懸命勉強しています。',
    type: 'fill-blank',
    options: ['ように', 'ために', 'のでに', 'からに'],
    answer: 'ように',
    explanation: 'ように表示目的，前面接可能动词或否定形式，意为"为了能够…"。ために前面接普通动词。',
    difficulty: 3,
    relatedGrammarPoint: '目的表現のように'
  },
  {
    id: 'grammar_ja_014',
    question: '子供の頃、よくこの公園___遊びました。',
    type: 'multiple-choice',
    options: ['に', 'で', 'へ', 'を'],
    answer: 'で',
    explanation: '遊ぶ是自动词，场所用で表示动作发生的地点。意为"在这个公园里玩"。',
    difficulty: 1,
    relatedGrammarPoint: '自动词与场所助词'
  },
  {
    id: 'grammar_ja_015',
    question: '忙しい___、手伝ってくれてありがとう。',
    type: 'sentence-order',
    options: null,
    answer: 'のに',
    explanation: 'のに表示逆接，"明明很忙却还帮我"。虽然对方很忙但还是提供了帮助，表达感谢中的体谅。',
    difficulty: 2,
    relatedGrammarPoint: '逆接助词のに'
  }
];

export const KOREAN_GRAMMAR: GrammarExercise[] = [
  {
    id: 'grammar_ko_001',
    question: '저는 한국어___공부해요.',
    type: 'multiple-choice',
    options: ['를', '을', '가', '이'],
    answer: '를',
    explanation: '한국어以元音结尾，用를标记宾语。을用于以辅音结尾的词。这是基础宾格助词的使用。',
    difficulty: 1,
    relatedGrammarPoint: '목적격 조사 을/를'
  },
  {
    id: 'grammar_ko_002',
    question: '학교___가요.',
    type: 'multiple-choice',
    options: ['에', '에서', '에게', '까지'],
    answer: '에',
    explanation: '에表示目的地或方向。"去学校"是移动的目的地，所以用에。에서表示动作发生的场所。',
    difficulty: 1,
    relatedGrammarPoint: '위치 조사 에'
  },
  {
    id: 'grammar_ko_003',
    question: '어제 친구___영화를 봤어요.',
    type: 'multiple-choice',
    options: ['하고', '와', '이랑', '부터'],
    answer: '하고',
    explanation: '하고表示"和……一起"。와用于以元音结尾的名词后（친구는辅音结尾所以不用와）。이랑更口语化。',
    difficulty: 1,
    relatedGrammarPoint: '함께 조사 하고/와/이랑'
  },
  {
    id: 'grammar_ko_004',
    question: '내일 날씨가 좋___갈 거예요.',
    type: 'fill-blank',
    options: ['으면', '아서', '지만', '니까'],
    answer: '으면',
    explanation: '(으)면表示条件，"如果天气好的话就去"。条件句中主句常用(ㄹ)거예요表示将来意图。',
    difficulty: 2,
    relatedGrammarPoint: '조건 어미 (으)면'
  },
  {
    id: 'grammar_ko_005',
    question: '배가 너무 불러서 밥을 더 못___겠어요.',
    type: 'multiple-choice',
    options: ['먹', '먹고', '먹어', '먹으'],
    answer: '먹',
    explanation: '못 + 동사원형表示"不能……"。못 먹겠어요意为"不能再吃了/吃不下了"。',
    difficulty: 2,
    relatedGrammarPoint: '부정 못'
  },
  {
    id: 'grammar_ko_006',
    question: '그분은 선생님___보여요.',
    type: 'multiple-choice',
    options: ['처럼', '만큼', '보다', '마냥'],
    answer: '처럼',
    explanation: '처럼表示"像……一样"。"看起来像老师"是对外貌的比喻描述。',
    difficulty: 2,
    relatedGrammarPoint: '비유 조사 처럼'
  },
  {
    id: 'grammar_ko_007',
    question: '일찍 왔___지각했어요.',
    type: 'fill-blank',
    options: ['는데도', '니까', '아서', '지만'],
    answer: '는데도',
    explanation: '는데도表示转折让步，"虽然来得早但是还是迟到了"。强调结果与预期相反。',
    difficulty: 3,
    relatedGrammarPoint: '역접 연결 어미 는데도'
  },
  {
    id: 'grammar_ko_008',
    question: '이 책은 정말 재미있___추천해요!',
    type: 'multiple-choice',
    options: ['아서', '으니까', '으니', '은데'],
    answer: '으니까',
    explanation: '因为有趣所以推荐。(으)니까表示原因理由，常用于建议、劝告、命令等主观性较强的句子末尾。',
    difficulty: 2,
    relatedGrammarPoint: '원인 이유 (으)니까'
  },
  {
    id: 'grammar_ko_009',
    question: '시간이 없___택시를 탈까요?',
    type: 'multiple-choice',
    options: ['으니', '으면', '아도', '든지'],
    answer: '으니',
    explanation: '因为没有时间所以考虑打车。(으)니提出情况背景，后接疑问形式征求对方意见。',
    difficulty: 2,
    relatedGrammarPoint: '상황 제시 (으)니'
  },
  {
    id: 'grammar_ko_010',
    question: '매일 운동하는___건강해졌어요.',
    type: 'fill-blank',
    options: ['덕분에', '때문에', '통해', '대해서'],
    answer: '덕분에',
    explanation: '덕분에表示积极的原因，"多亏每天运动才变得健康了"。带有感谢意味的原因表达。',
    difficulty: 2,
    relatedGrammarPoint: '긍정적 원인 덕분에'
  },
  {
    id: 'grammar_ko_011',
    question: '내일 시험이 있___오늘 일찍 자야 해요.',
    type: 'multiple-choice',
    options: ['으니까', '아서', '지만', '려고'],
    answer: '으니까',
    explanation: '因为有考试所以要早睡。(으)니까表示原因，后接义务、必要等表达。',
    difficulty: 2,
    relatedGrammarPoint: '의무 표현과 (으)니까'
  },
  {
    id: 'grammar_ko_012',
    question: '한국에 온 지 벌써 3년___됐어요.',
    type: 'multiple-choice',
    options: ['이나', '밖에', '나', '이나'],
    answer: '이나',
    explanation: '数词 + 이나表示"多达/竟达"，带有惊讶或感叹的语气。"竟然已经3年了"。',
    difficulty: 3,
    relatedGrammarPoint: '수사와 이나'
  },
  {
    id: 'grammar_ko_013',
    question: '그 영화는 세 번이나___봤어요.',
    type: 'fill-blank',
    options: ['이나', '밖에', '조차', '마저'],
    answer: '이나',
    explanation: '이나接在数量词后表示程度之深，"那部电影我居然看了三遍之多"！',
    difficulty: 3,
    relatedGrammarPoint: '강조 이나'
  },
  {
    id: 'grammar_ko_014',
    question: '공부는컵녕 밥도___못 먹었어요.',
    type: 'multiple-choice',
    options: ['조차', '마저', '야말로', '치고'],
    answer: '조차',
    explanation: '조차表示"连……都"，用于消极或极端情况的追加。"别说学习了，连饭都没吃上"。',
    difficulty: 3,
    relatedGrammarPoint: '부정 추가 조차'
  },
  {
    id: 'grammar_ko_015',
    question: '그 사람은 착한___용기도 있어요.',
    type: 'sentence-order',
    options: null,
    answer: '데다가',
    explanation: '데다가表示递进追加，"不仅善良而且还有勇气"。用于添加另一个积极或消极的特点。',
    difficulty: 2,
    relatedGrammarPoint: '추가 데다가'
  }
];

export const getGrammarByLanguage = (languageCode: string): GrammarExercise[] => {
  switch (languageCode) {
    case 'en': return ENGLISH_GRAMMAR;
    case 'ja': return JAPANESE_GRAMMAR;
    case 'ko': return KOREAN_GRAMMAR;
    default: return [];
  }
};

export const getAllGrammar = (): GrammarExercise[] => {
  return [...ENGLISH_GRAMMAR, ...JAPANESE_GRAMMAR, ...KOREAN_GRAMMAR];
};
