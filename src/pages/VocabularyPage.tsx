import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Volume2,
  RotateCcw,
  BookOpen,
  Smile,
  Meh,
  Frown,
  CheckCircle2,
  XCircle,
  Trophy,
  RefreshCw,
} from 'lucide-react';
import useProgressStore from '@/stores/useProgressStore';
import useAchievementStore from '@/stores/useAchievementStore';
import useAuthStore from '@/stores/useAuthStore';
import useCourseStore from '@/stores/useCourseStore';
import { getVocabularyByLanguage } from '@/assets/data/vocabulary';
import type { Vocabulary, MasteryLevel } from '@/types/learning';

type MasteryChoice = 'known' | 'fuzzy' | 'unknown';

function speakWord(word: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
}

function FlashCard({
  card,
  isFlipped,
  onFlip,
  onSelect,
}: {
  card: Vocabulary;
  isFlipped: boolean;
  onFlip: () => void;
  onSelect: (choice: MasteryChoice) => void;
}) {
  return (
    <div
      className="w-[340px] h-[420px] sm:w-[400px] sm:h-[480px] cursor-pointer perspective-1000 mx-auto"
      onClick={onFlip}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') onFlip(); }}
      role="button"
      tabIndex={0}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1A2744] to-[#0F1A2E] border border-white/10 p-8 flex flex-col items-center justify-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); speakWord(card.word); }}
              className="w-14 h-14 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center hover:bg-[#FF6B35]/25 transition-colors"
            >
              <Volume2 className="w-6 h-6" />
            </motion.button>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-3 text-center">
            {card.word}
          </h2>
          <p className="text-lg text-gray-400 mb-6">{card.phonetic}</p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            点击翻转查看释义
          </motion.p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FF6B35]/10 to-[#0F1A2E] border border-[#FF6B35]/20 p-8 flex flex-col items-center justify-center backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-heading text-2xl font-bold text-white mb-2">{card.word}</h3>
          <p className="text-xl text-[#00D9C0] mb-6 px-4 py-2 rounded-xl bg-[#00D9C0]/10">
            {card.meaning}
          </p>

          <div className="w-full space-y-3 mb-8 text-left">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">例句</p>
              <p className="text-base text-gray-200 leading-relaxed">{card.example}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">翻译</p>
              <p className="text-base text-gray-300">{card.exampleTranslation}</p>
            </div>
          </div>

          <div className="flex gap-3 w-full" onClick={(e) => e.stopPropagation()}>
            {([
              { key: 'known', icon: Smile, label: '认识', color: '#00D9C0', bg: 'hover:bg-[#00D9C0]/20' },
              { key: 'fuzzy', icon: Meh, label: '模糊', color: '#FBBF24', bg: 'hover:bg-[#FBBF24]/20' },
              { key: 'unknown', icon: Frown, label: '不认识', color: '#FF6B35', bg: 'hover:bg-[#FF6B35]/20' },
            ] as const).map(({ key, icon: Icon, label, color, bg }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(key)}
                className={`flex-1 py-3 px-3 rounded-xl border border-white/10 ${bg} transition-colors flex flex-col items-center gap-1`}
              >
                <Icon className="w-5 h-5" style={{ color }} />
                <span className="text-xs text-gray-300">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ResultSummary({
  results,
  total,
  onRestart,
  onBack,
}: {
  results: { word: Vocabulary; choice: MasteryChoice }[];
  total: number;
  onRestart: () => void;
  onBack: () => void;
}) {
  const known = results.filter((r) => r.choice === 'known').length;
  const correctRate = Math.round((known / total) * 100);
  const needReview = results.filter((r) => r.choice !== 'known');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto text-center"
    >
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00D9C0] to-[#00B89E] flex items-center justify-center mx-auto mb-4"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="font-heading text-3xl font-bold text-white mb-2">学习完成！</h2>
        <p className="text-gray-400">本次学习了 {total} 个单词</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: '正确率', value: `${correctRate}%`, color: 'text-[#00D9C0]' },
          { label: '已掌握', value: known, color: 'text-green-400' },
          { label: '需复习', value: needReview.length, color: 'text-[#FF6B35]' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {needReview.length > 0 && (
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-8 text-left max-h-48 overflow-y-auto">
          <p className="text-sm font-semibold text-gray-300 mb-3">需要复习的单词：</p>
          <div className="space-y-2">
            {needReview.map((r) => (
              <div key={r.word.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-200">{r.word.word}</span>
                <span className="text-gray-500">{r.word.meaning.slice(0, 12)}...</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="px-6 py-3 rounded-full bg-[#1A2744] text-white border border-white/10 hover:border-white/20 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          再练一次
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E55525] text-white"
        >
          返回主页
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function VocabularyPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { startSession, endSession, updateProgress } = useProgressStore();
  const { checkAchievements } = useAchievementStore();
  const { user } = useAuthStore();
  const { currentCourse } = useCourseStore();

  const allWords = currentCourse ? getVocabularyByLanguage(currentCourse.language.code) : [];
  const [mode, setMode] = useState<'learn' | 'review'>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<{ word: Vocabulary; choice: MasteryChoice }[]>([]);
  const [showResult, setShowResult] = useState(false);

  const displayWords = mode === 'review'
    ? allWords.filter((w) => w.mastery === 'new' || w.mastery === 'learning')
    : allWords;

  useEffect(() => {
    startSession(courseId || '', 'vocabulary', 'vocabulary');
    return () => { endSession(); };
  }, [courseId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResult) return;
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === ' ') { e.preventDefault(); setIsFlipped((f) => !f); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, showResult, displayWords.length]);

  const currentCard = displayWords[currentIndex];

  const goPrev = useCallback(() => {
    if (currentIndex > 0) { setCurrentIndex(currentIndex - 1); setIsFlipped(false); }
  }, [currentIndex]);

  const goNext = useCallback(() => {
    if (currentIndex < displayWords.length - 1) { setCurrentIndex(currentIndex + 1); setIsFlipped(false); }
  }, [currentIndex, displayWords.length]);

  const handleSelect = useCallback((choice: MasteryChoice) => {
    if (!currentCard) return;
    setResults((prev) => [...prev, { word: currentCard, choice }]);
    if (currentIndex < displayWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      finishSession();
    }
  }, [currentCard, currentIndex, displayWords.length]);

  const finishSession = useCallback(() => {
    setShowResult(true);
    endSession({ exercisesCompleted: results.length + 1 });
    updateProgress(courseId || '', {
      completionPercent: Math.min(100, ((results.length + 1) / allWords.length) * 100),
      vocabularyMastered: results.filter((r) => r.choice === 'known').map((r) => r.word.id),
    });
    checkAchievements(
      {
        streakDays: 1,
        totalWords: results.filter((r) => r.choice === 'known').length + 1,
        grammarScore: 0,
        speakingCount: 0,
        speakingMinutes: 0,
        listeningScore: 0,
        socialCount: 0,
        likeCount: 0,
      },
      user?.id || ''
    );
  }, [results, courseId, allWords.length, endSession, updateProgress, checkAchievements, user?.id]);

  const handleMastered = useCallback(() => {
    handleSelect('known');
  }, [handleSelect]);

  const restart = () => {
    setResults([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowResult(false);
    startSession(courseId || '', 'vocabulary', 'vocabulary');
  };

  if (!allWords.length) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">暂无词汇数据</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0A1628]/80 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(`/learn/${courseId}`)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /><span className="text-sm">返回</span>
          </button>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${mode === 'learn' ? 'bg-[#FF6B35] text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`} onClick={() => { setMode('learn'); setCurrentIndex(0); setIsFlipped(false); setResults([]); setShowResult(false); }}>
              学习模式
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${mode === 'review' ? 'bg-[#00D9C0] text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`} onClick={() => { setMode('review'); setCurrentIndex(0); setIsFlipped(false); setResults([]); setShowResult(false); }}>
              复习模式
            </span>
          </div>
          <div className="text-sm text-gray-400">
            {currentIndex + 1}/{displayWords.length}
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF6B35] to-[#00D9C0]"
            animate={{ width: `${((currentIndex + 1) / displayWords.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-10 pb-24">
        <AnimatePresence mode="wait">
          {showResult ? (
            <motion.div key="result" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <ResultSummary results={results} total={displayWords.length} onRestart={restart} onBack={() => navigate(`/learn/${courseId}`)} />
            </motion.div>
          ) : (
            <motion.div key="flashcard" className="flex flex-col items-center gap-8">
              {/* Flash Card */}
              <AnimatePresence mode="wait">
                {currentCard && (
                  <FlashCard
                    key={currentCard.id}
                    card={currentCard}
                    isFlipped={isFlipped}
                    onFlip={() => setIsFlipped(!isFlipped)}
                    onSelect={handleSelect}
                  />
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <div className="flex gap-1.5">
                  {displayWords.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < currentIndex ? 'bg-[#00D9C0]' : i === currentIndex ? 'bg-[#FF6B35]' : 'bg-white/20'}`} />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goNext}
                  disabled={currentIndex === displayWords.length - 1}
                  className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Quick Master Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMastered}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00D9C0] to-[#00B89E] text-white font-semibold shadow-[0_0_20px_rgba(0,217,192,0.3)]"
              >
                <CheckCircle2 className="w-5 h-5" />
                掌握此词
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
