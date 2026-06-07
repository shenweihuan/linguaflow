import { ListeningExercise } from '../../types/learning';

export const ENGLISH_LISTENING: ListeningExercise[] = [
  {
    id: 'listen_en_001',
    audioUrl: '/audio/en/listening/daily_greeting.mp3',
    transcript: 'Good morning, everyone! How are you doing today? I hope you all had a wonderful weekend. Today, we\'re going to start our English lesson with some basic conversation practice. First, let\'s review how to introduce yourself properly. Pay attention to the pronunciation and intonation.',
    translation: '大家早上好！你们今天怎么样？希望你们都度过了一个美好的周末。今天，我们将从一些基础对话练习开始英语课。首先，让我们复习如何正确地自我介绍。请注意发音和语调。',
    question: 'What is the speaker going to do first in the lesson?',
    options: ['Review grammar rules', 'Practice basic conversation', 'Take a test', 'Watch a video'],
    answer: 1,
    speed: 'normal'
  },
  {
    id: 'listen_en_002',
    audioUrl: '/audio/en/listening/at_restaurant.mp3',
    transcript: 'Waiter: Good evening, welcome to Sunshine Restaurant. Do you have a reservation?\nCustomer: Yes, I booked a table for two under the name Smith.\nWaiter: Ah, yes. This way, please. Here\'s the menu. Would you like to order something to drink while you decide?\nCustomer: I\'ll have a glass of white wine, please. And my friend will have sparkling water.',
    translation: '服务员：晚上好，欢迎光临阳光餐厅。您有预订吗？\n顾客：是的，我用史密斯的名字预订了一张双人桌。\n服务员：啊，好的。请这边走。这是菜单。您决定的时候想先点些喝的吗？\n顾客：请给我一杯白葡萄酒。我的朋友要气泡水。',
    question: 'What did the customer order to drink?',
    options: ['Red wine and water', 'White wine and sparkling water', 'Beer and juice', 'Coffee and tea'],
    answer: 1,
    speed: 'normal'
  },
  {
    id: 'listen_en_003',
    audioUrl: '/audio/en/listening/weather_report.mp3',
    transcript: 'Here\'s your weather forecast for today. It\'s going to be a beautiful sunny day with temperatures reaching 25 degrees Celsius. There might be some clouds in the afternoon, but no rain is expected. Tomorrow, however, we\'re looking at a chance of thunderstorms in the evening, so you might want to bring an umbrella if you\'re planning to go out.',
    translation: '以下是今天的天气预报。今天将会是晴朗的美好天气，气温将达到25摄氏度。下午可能会有一些云，但预计不会下雨。不过明天傍晚有雷阵雨的可能，所以如果你计划出门的话可能需要带把伞。',
    question: 'What is the weather forecast for tomorrow evening?',
    options: ['Sunny and warm', 'Cloudy but dry', 'Possible thunderstorms', 'Heavy snow'],
    answer: 2,
    speed: 'normal'
  },
  {
    id: 'listen_en_004',
    audioUrl: '/audio/en/listening/job_interview.mp3',
    transcript: 'Interviewer: So, tell me about yourself and why you want to work at our company.\nCandidate: Well, I\'ve been working in marketing for five years now, and I\'ve always admired your company\'s innovative approach. I believe my experience with digital campaigns would be a great asset to your team. I\'m particularly excited about your new project targeting international markets.',
    translation: '面试官：那么，介绍一下你自己以及为什么你想在我们公司工作吧。\n应聘者：嗯，我在市场营销领域已经工作了五年了，我一直很欣赏贵公司的创新方式。我相信我在数字营销活动方面的经验会成为团队的宝贵资产。我对贵公司针对国际市场的新项目特别感兴趣。',
    question: 'How many years of experience does the candidate have?',
    options: ['Three years', 'Four years', 'Five years', 'Six years'],
    answer: 2,
    speed: 'normal'
  },
  {
    id: 'listen_en_005',
    audioUrl: '/audio/en/listening/directions.mp3',
    transcript: 'Excuse me, could you tell me how to get to the nearest subway station? Sure! Go straight down this street for about two blocks until you see a big department store on your left. Turn left there and walk for another block. The station entrance will be right in front of you. You can\'t miss it. It takes about ten minutes on foot.',
    translation: '打扰一下，能告诉我怎么去最近的地铁站吗？当然可以！沿着这条街直走大约两个街区，直到你看到左边有一家大百货公司。在那里左转再走一个街区。地铁站入口就在你正前方。你不会错过的。步行大约需要十分钟。',
    question: 'How long does it take to walk to the station?',
    options: ['About five minutes', 'About ten minutes', 'About fifteen minutes', 'About twenty minutes'],
    answer: 1,
    speed: 'slow'
  },
  {
    id: 'listen_en_006',
    audioUrl: '/audio/en/listening/phone_call.mp3',
    transcript: 'Hello, this is Sarah from ABC Company calling. May I speak with Mr. Johnson, please? Hi Sarah, this is Johnson speaking. How can I help you? I\'m calling about the meeting scheduled for next Monday. We need to reschedule it to Wednesday at the same time because our manager will be out of town. Would that work for you?',
    translation: '你好，我是ABC公司的莎拉。请问约翰逊先生在吗？嗨莎拉，我是约翰逊。有什么可以帮你的？我打电话是为了下周一安排的会议。我们需要改到周三同一时间，因为我们的经理要出差。这样可以吗？',
    question: 'Why does Sarah want to reschedule the meeting?',
    options: ['The room is not available', 'The manager will be away', 'There\'s a holiday', 'She is sick'],
    answer: 1,
    speed: 'normal'
  },
  {
    id: 'listen_en_007',
    audioUrl: '/audio/en/listening/travel_plans.mp3',
    transcript: 'I\'m so excited about my upcoming trip to London! I\'ve already booked my flight tickets and hotel accommodation. I plan to visit the British Museum, Buckingham Palace, and the Tower of London. Of course, I can\'t miss the famous Big Ben and the London Eye. My friend who lives there recommended trying fish and chips at a traditional pub. I\'ll be staying for one week, so I should have enough time to explore.',
    translation: '我对即将到来的伦敦之旅感到非常兴奋！我已经订好了机票和酒店住宿。我计划参观大英博物馆、白金汉宫和伦敦塔。当然，我不能错过著名的大本钟和伦敦眼。住在那里的朋友推荐我去传统酒吧尝尝炸鱼薯条。我会待一周，所以应该有足够的时间去探索。',
    question: 'How long will the speaker stay in London?',
    options: ['Three days', 'Five days', 'One week', 'Two weeks'],
    answer: 2,
    speed: 'normal'
  },
  {
    id: 'listen_en_008',
    audioUrl: '/audio/en/listening/shopping.mp3',
    transcript: 'Can I help you find anything today? Yes, I\'m looking for a birthday gift for my mother. What kind of things does she like? She enjoys reading and gardening. How about this beautiful gardening book with illustrations? It\'s on sale this week - twenty percent off. That sounds perfect! Do you offer gift wrapping? Absolutely, it\'s complimentary. Let me take care of that for you.',
    translation: '今天有什么我可以帮您找到的吗？是的，我想给我妈妈找一份生日礼物。她喜欢什么类型的东西呢？她喜欢阅读和园艺。这本带插图的美园艺书怎么样？这周正在打八折。听起来太完美了！你们提供礼品包装服务吗？当然，这是免费的。让我来为您处理。',
    question: 'What discount is the book offering?',
    options: ['Ten percent off', 'Fifteen percent off', 'Twenty percent off', 'Thirty percent off'],
    answer: 2,
    speed: 'slow'
  }
];

export const JAPANESE_LISTENING: ListeningExercise[] = [
  {
    id: 'listen_ja_001',
    audioUrl: '/audio/ja/listening/morning_greeting.mp3',
    transcript: 'おはようございます。今日も一日頑張りましょう。まず、出席を取ります。田中さん？はい。鈴木さん？はい。山田さん？はい。全員そろいましたね。それでは、教科書の２０ページを開いてください。',
    translation: '早上好。今天也要努力哦。首先点名。田中同学？到。铃木同学？到。山田同学？到。大家都到齐了呢。那么，请打开教科书第20页。',
    question: '先生は何ページを開くように言いましたか？',
    options: ['１０ページ', '１５ページ', '２０ページ', '２５ページ'],
    answer: 2,
    speed: 'normal'
  },
  {
    id: 'listen_ja_002',
    audioUrl: '/audio/ja/listening/at_shop.mp3',
    transcript: '店員：いらっしゃいませ。何かお探しですか？\n客：このシャツを試着してもいいですか？\n店員：もちろんです。試着室はあちらです。サイズは合いますか？\n客：ちょっと大きいですね。小さいサイズはありますか？\n店員：はい、すぐお持ちします。',
    translation: '店员：欢迎光临。您在找什么呢？\n顾客：这件衬衫可以试穿吗？\n店员：当然可以。试衣间在那边。尺寸合适吗？\n顾客：稍微有点大了。有小一点的尺寸吗？\n店员：有的，我马上拿来。',
    question: 'シャツのサイズはどうでしたか？',
    options: ['小さかった', 'ちょうどよかった', '大きかった', '短かった'],
    answer: 2,
    speed: 'normal'
  },
  {
    id: 'listen_ja_003',
    audioUrl: '/audio/ja/listening/train_announcement.mp3',
    transcript: 'まもなく、３番線から東京行き新幹線が発車いたします。危険ですので、黄色い線の内側までお下がりください。お客様のお荷物はお手元にお置きください。ドアが閉まりますのでご注意ください。',
    translation: '开往东京的新干线即将从3号站台发车。为了安全，请退到黄线以内。请将行李放在身边。车门即将关闭，请注意。',
    question: '新幹線は何番線から出発しますか？',
    options: ['１番線', '２番線', '３番線', '４番線'],
    answer: 2,
    speed: 'normal'
  },
  {
    id: 'listen_ja_004',
    audioUrl: '/audio/ja/listening/making_appointment.mp3',
    transcript: 'A：来週の水曜日の午後、空いていますか？\nB：水曜日は午後２時から会議があるんですが…\nA：じゃあ、木曜日はどうですか？\nB：木曜日の午後なら大丈夫です。何時がいいですか？\nA：３時ごろにしましょう。',
    translation: 'A：下周三下午有空吗？\nB：周三下午两点有个会议……\nA：那周四怎么样？\nB：周四下午可以。几点比较好？\nA：定在三点左右吧。',
    question: '二人はいつ会うことにしましたか？',
    options: ['水曜日の２時', '木曜日の２時', '水曜日の３時', '木曜日の３時'],
    answer: 3,
    speed: 'normal'
  },
  {
    id: 'listen_ja_005',
    audioUrl: '/audio/ja/listening/asking_directions.mp3',
    transcript: 'すみません、駅へはどう行けばいいですか？\nこの道をまっすぐ行って、二つ目の角を右に曲がってください。そこから五分ほど歩くと、左側に駅が見えてきます。大きな建物ですから、すぐわかりますよ。',
    translation: '请问，去车站怎么走？沿着这条路直走，在第二个路口右转。从那里走五分钟左右，左边就能看到车站了。是个很大的建筑，一眼就能看到。',
    question: '駅まで歩いて何分かかりますか？',
    options: ['三分', '五分', '七分', '十分'],
    answer: 1,
    speed: 'slow'
  },
  {
    id: 'listen_ja_006',
    audioUrl: '/audio/ja/listening/weather_forecast.mp3',
    transcript: '明日の天気予報をお伝えします。明日は朝から晴れ间が広がり、昼過ぎからは気温が２５度まで上がるでしょう。ただし、夕方からは雲が増え、夜には雨の降る可能性があります。傘を持って出かけたほうがいいかもしれません。',
    translation: '接下来播报明天的天气预报。明天从早上开始晴朗范围扩大，午后气温将上升到25度左右。不过傍晚开始云量增加，夜间有可能下雨。出门时最好带把伞。',
    question: '明日の天気はどうなりますか？',
    options: ['一日中雨', '朝晴れて夕方から曇り', '一日中晴れ', '朝から雨'],
    answer: 1,
    speed: 'normal'
  },
  {
    id: 'listen_ja_007',
    audioUrl: '/audio/ja/listening/at_hospital.mp3',
    transcript: '患者：先生、最近頭痛がひどくて…\n医者：いつ頃からですか？\n患者：一週間くらい前からです。\n医者：熱はありますか？\n患者：ありません。\n医者：では、診察しましょう。少し待ってくださいね。',
    translation: '患者：医生，最近头痛得很厉害……\n医生：什么时候开始的？\n患者：大概一周前开始的。\n医生：发烧吗？\n患者：不发烧。\n医生：那我来检查一下吧。请稍等。',
    question: '患者の症状は何ですか？',
    options: ['熱と頭痛', '頭痛だけ', 'お腹の痛み', 'せき'],
    answer: 1,
    speed: 'normal'
  },
  {
    id: 'listen_ja_008',
    audioUrl: '/audio/ja/listening/ordering_food.mp3',
    transcript: '店員：ご注文はお決まりでしょうか？\n客：ラーメンをお願いします。味は醤油で。\n店員：具はどうなさいますか？\n客：チャーシューと味付け卵を追加でお願いします。\n店員：お飲み物は？\n客：烏龍茶で。',
    translation: '店员：您决定好点什么了吗？\n顾客：请给我拉面。要酱油味的。\n店员：配料要加什么？\n顾客：请加叉烧和调味蛋。\n店员：饮料呢？\n顾客：乌龙茶。',
    question: '客は何を注文しましたか？',
    options: ['味噌ラーメンとコーラ', '醤油ラーメンと烏龍茶', '塩ラーメンと緑茶', '担々麺とビール'],
    answer: 1,
    speed: 'slow'
  }
];

export const KOREAN_LISTENING: ListeningExercise[] = [
  {
    id: 'listen_ko_001',
    audioUrl: '/audio/ko/listening/greeting_class.mp3',
    transcript: '안녕하세요, 여러분! 오늘도 한국어 수업을 시작하겠습니다. 먼저 출석을 부르겠습니다. 김민수 님? 네. 박지영 님? 네. 이수진 님? 네. 다들 왔네요. 그럼 교과서 15쪽을 펴세요.',
    translation: '大家好！今天也让我们开始韩语课吧。首先点名。金民秀同学？到。朴智英同学？到。李秀珍同学？到。大家都到了。那么请打开教科书第15页。',
    question: '선생님은 몇 쪽을 펴라고 했어요?',
    options: ['10쪽', '12쪽', '15쪽', '18쪽'],
    answer: 2,
    speed: 'normal'
  },
  {
    id: 'listen_ko_002',
    audioUrl: '/audio/ko/listening/cafe_order.mp3',
    transcript: '직원: 어서 오세요. 주문하시겠어요?\n손님: 아이스 아메리카노 한 잔 주세요.\n직원: 크게 해드릴까요, 작게 해드릴까요?\n손님: 크게요.\n직원: 테이크아웃이에요, 매장에서 드실 거예요?\n손님: 테이크아웃이요.',
    translation: '员工：欢迎光临。要点餐吗？\n顾客：请给我一杯冰美式咖啡。\n员工：要大杯还是小杯？\n顾客：大杯。\n员工：外带还是在店里喝？\n顾客：外带。',
    question: '손님이 무엇을 주문했어요?',
    options: ['핫 라테', '아이스 아메리카노', '카푸치노', '녹차'],
    answer: 1,
    speed: 'normal'
  },
  {
    id: 'listen_ko_003',
    audioUrl: '/audio/ko/listening/subway_announcement.mp3',
    transcript: '지금부터 2호선 열차가 들어오고 있습니다. 승객 여러분께서는 안전선 뒤로 물러나 주시기 바랍니다. 열차와 승강장 사이가 넓으니 조심하십시오. 문이 닫히니 주의하십시오.',
    translation: '现在2号线列车即将进站。请各位乘客退到安全线后方。列车与站台之间间隙较大，请注意安全。车门即将关闭，请注意。',
    question: '몇 호선 열차가 들어오고 있어요?',
    options: ['1호선', '2호선', '3호선', '4호선'],
    answer: 1,
    speed: 'normal'
  },
  {
    id: 'listen_ko_004',
    audioUrl: '/audio/ko/listening/making_plan.mp3',
    transcript: 'A: 이번 주말에 시간 있어?\nB: 토요일은 좀 바쁜데, 일요일은 괜찮아.\nA: 일요일 오후에 영화 보러 갈래?\nB: 좋아! 어디에서 만날까?\nA: 서울역 앞에서 2시에 만나자.',
    translation: 'A：这个周末有空吗？\nB：周六有点忙，周日可以。\nA：周日下午去看电影怎么样？\nB：好啊！在哪里见面？\nA：在首尔站前面2点见吧。',
    question: '두 사람은 언제 만나기로 했어요?',
    options: ['토요일 오전', '토요일 오후', '일요일 오전', '일요일 오후'],
    answer: 3,
    speed: 'normal'
  },
  {
    id: 'listen_ko_005',
    audioUrl: '/audio/ko/listening/asking_way.mp3',
    transcript: '실례하지만, 여기서 지하철역까지 어떻게 가요?\n이 길을 쭉 가서 사거리에서 왼쪽으로 도세요. 그리고 100미터쯤 가면 역이 보여요.\n걸어서 얼마나 걸려요?\n약 10분 정도 걸려요.',
    translation: '请问，从这里怎么去地铁站？沿这条路一直走到十字路口然后左转。再走大约100米就能看到车站了。走路要多久？大概10分钟左右。',
    question: '지하철역까지 걸어서 얼마나 걸려요?',
    options: ['약 5분', '약 10분', '약 15분', '약 20분'],
    answer: 1,
    speed: 'slow'
  },
  {
    id: 'listen_ko_006',
    audioUrl: '/audio/ko/listening/talking_weather.mp3',
    transcript: '내일 날씨가 어떨 것 같아요? 날씨 예보를 봤는데, 내일은 아침부터 맑고 오후에는 구름이 끼겠대요. 기온은 25도까지 올라간다고 해요. 저녁에는 비가 올 가능성도 있다고 하니 우산을 챙기는 게 좋겠어요.',
    translation: '明天天气会怎么样呢？我看天气预报说，明天从早上开始晴朗，下午会有云。气温据说会升到25度。据说晚上还有可能下雨，所以最好带把伞。',
    question: '내일 저녁 날씨는 어떨까요?',
    options: ['맑음', '구름 많음', '비가 올 수 있음', '눈이 올 수 있음'],
    answer: 2,
    speed: 'normal'
  },
  {
    id: 'listen_ko_007',
    audioUrl: '/audio/ko/listening/at_pharmacy.mp3',
    transcript: '환자: 선생님, 요즘 감기 기운이 있는 것 같아요.\n약사: 증상이 어떻게 되세요?\n환자: 목이 아프고 코가 막혀요.\n약사: 열은 있어요?\n환자: 없어요.\n약사: 그럼 감기약 드릴게요. 하루 세 번 식후 30분에 드세요.',
    translation: '患者：药师先生，我最近好像有点感冒的症状。\n药师：症状是怎样的？\n患者：嗓子疼，鼻子堵。\n药师：发烧吗？\n患者：不发烧。\n药师：那我给您开感冒药。一天三次饭后30分钟服用。',
    question: '감기약은 언제 먹어야 해요?',
    options: ['식전에', '식후 30분에', '자기 전에', '아무 때나'],
    answer: 1,
    speed: 'normal'
  },
  {
    id: 'listen_ko_008',
    audioUrl: '/audio/ko/listening/restaurant_order.mp3',
    transcript: '종업원: 주문하시겠어요?\n손님: 비빔밥 하나 주세요.\n종업원: 매운 거 괜찮으세요?\n손님: 네, 매운 걸로요. 그리고 김치도 주세요.\n종업원: 음료는요?\n손님: 보리차로 할게요.',
    translation: '服务员：要点餐了吗？\n顾客：请给我一份拌饭。\n服务员：辣的可以吗？\n顾客：好的，要辣的。还要一份泡菜。\n服务员：饮料呢？\n顾客：大麦茶。',
    question: '손님이 주문한 메뉴는 무엇인가요?',
    options: ['불고기와 김치', '비빔밥과 김치', '삼겹살과 보리차', '냉면과 음료수'],
    answer: 1,
    speed: 'slow'
  }
];

export const getListeningByLanguage = (languageCode: string): ListeningExercise[] => {
  switch (languageCode) {
    case 'en': return ENGLISH_LISTENING;
    case 'ja': return JAPANESE_LISTENING;
    case 'ko': return KOREAN_LISTENING;
    default: return [];
  }
};

export const getAllListening = (): ListeningExercise[] => {
  return [...ENGLISH_LISTENING, ...JAPANESE_LISTENING, ...KOREAN_LISTENING];
};
