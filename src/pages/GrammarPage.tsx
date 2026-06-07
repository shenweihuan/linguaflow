import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
  RefreshCw,
  ListOrdered,
  PenLine,
  AlignJustify,
  Zap,
  Clock,
} from 'lucide-react';
import useProgressStore from '@/stores/useProgressStore';
import useAchievementStore from '@/stores/useAchievementStore';
import useAuthStore from '@/stores/useAuthStore';
import useCourseStore from '@/stores/useCourseStore';
import { getGrammarByLanguage } from '@/assets/data/grammar';
import type { GrammarExercise } from '@/types/learning';

const typeConfig = {
  'multiple-choice': { icon: ListOrdered, label: '选择题', color: '#00D9C0' },
  'fill-blank': { icon: PenLine, label: '填空题', color: '#FBBF24' },
  'sentence-order': { icon: AlignJustify, label: '排序题', color: '#A78BFA' },
};

function QuestionCard({
  exercise,
  index,
  total,
  selectedAnswer,
  isAnswered,
  onAnswer,
  onNext,
  combo,
}: {
  exercise: GrammarExercise;
  index: number;
  total: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  combo: number;
}) {
  const [fillInput, setFillInput] = useState('');
  const [orderItems, setOrderItems] = useState<string[]>(exercise.answer.split(';'));
  const config = typeConfig[exercise.type];
  const Icon = config.icon;
  const isCorrect = isAnswered && selectedAnswer === exercise.answer;

  useEffect(() => {
    if (exercise.type === 'sentence-order') {
      setOrderItems(exercise.answer.split(';').sort(() => Math.random() - 0.5));
    }
  }, [exercise.id]);

  const handleOrderClick = (clickedIndex: number) => {
    if (isAnswered) return;
    const newItems = [...orderItems];
    const [removed] = newItems.splice(clickedIndex, 1);
    newItems.push(removed);
    setOrderItems(newItems);
    if (newItems.join(';') === exercise.answer) {
      onAnswer(newItems.join(';'));
    }
  };

  const handleSubmitFill = () => {
    if (fillInput.trim()) onAnswer(fillInput.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">第 {index + 1} 题 / 共 {total} 题</span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1`} style={{ backgroundColor: `${config.color}15`, color: config.color }}>
            <Icon className="w-3 h-3" />{config.label}
          </span>
        </div>
        {combo > 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={combo}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF6B35]/20 to-[#FBBF24]/20 border border-[#FBBF24]/30"
          >
            <Zap className="w-4 h-4 text-[#FBBF24]" />
            <span className="text-sm font-bold text-[#FBBF24]">x{combo}</span>
          </motion.div>
        )}
      </div>

      {/* Question Text */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6 sm:p-8 mb-6">
        <p className="text-lg sm:text-xl text-gray-100 leading-relaxed font-medium">{exercise.question}</p>
      </div>

      {/* Options Area */}
      {exercise.type === 'multiple-choice' && exercise.options && (
        <div className="space-y-3 mb-6">
          {exercise.options.map((option) => {
            let optionStyle = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-200';
            if (isAnswered && option === exercise.answer) {
              optionStyle = 'bg-[#00D9C0]/15 border-[#00D9C0]/40 text-[#00D9C0]';
            } else if (isAnswered && option === selectedAnswer && option !== exercise.answer) {
              optionStyle = 'bg-red-500/15 border-red-500/40 text-red-400';
            } else if (selectedAnswer === option && !isAnswered) {
              optionStyle = 'bg-[#FF6B35]/15 border-[#FF6B35]/40 text-[#FF6B35]';
            }

            return (
              <motion.button
                key={option}
                whileHover={!isAnswered ? { scale: 1.01 } : {}}
                whileTap={!isAnswered ? { scale: 0.99 } : {}}
                onClick={() => !isAnswered && onAnswer(option)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${optionStyle}`}
              >
                <span className="font-medium">{option}</span>
                {isAnswered && option === exercise.answer && <CheckCircle2 className="w-5 h-5" />}
                {isAnswered && option === selectedAnswer && option !== exercise.answer && <XCircle className="w-5 h-5" />}
              </motion.button>
            );
          })}
        </div>
      )}

      {exercise.type === 'fill-blank' && (
        <div className="mb-6 space-y-3">
          <div className="flex gap-3">
            <input
              type="text"
              value={fillInput}
              onChange={(e) => setFillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitFill()}
              disabled={isAnswered}
              placeholder="输入你的答案..."
              className={`flex-1 px-4 py-3 rounded-xl bg-white/5 border ${isAnswered ? (isCorrect ? 'border-[#00D9C0]/40' : 'border-red-500/40') : 'border-white/10 focus:border-[#FF6B35]/50'} text-white placeholder-gray-500 outline-none transition-colors`}
            />
            {!isAnswered && (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSubmitFill} className="px-6 py-3 rounded-xl bg-[#FF6B35] text-white font-semibold">提交</motion.button>
            )}
          </div>
          {isAnswered && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-3 rounded-xl text-sm ${isCorrect ? 'bg-[#00D9C0]/10 text-[#00D9C0]' : 'bg-red-500/10 text-red-400'}`}>
              {!isCorrect && <span>正确答案：<strong>{exercise.answer}</strong></span>}
            </motion.div>
          )}
        </div>
      )}

      {exercise.type === 'sentence-order' && (
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-3">点击词语调整顺序：</p>
          <div className="flex flex-wrap gap-2">
            {orderItems.map((item, i) => (
              <motion.button
                key={`${item}-${i}`}
                whileHover={!isAnswered ? { scale: 1.05 } : {}}
                whileTap={!isAnswered ? { scale: 0.95 } : {}}
                onClick={() => handleOrderClick(i)}
                disabled={isAnswered}
                className={`px-4 py-2.5 rounded-xl border font-medium transition-all ${
                  isAnswered ? 'bg-[#00D9C0]/15 border-[#00D9C0]/40 text-[#00D9C0]' : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200'
                }`}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-2xl border p-5 mb-6 ${isCorrect ? 'bg-[#00D9C0]/8 border-[#00D9C0]/20' : 'bg-red-500/8 border-red-500/20'}`}
          >
            <div className="flex items-start gap-3 mb-2">
              {isCorrect ? <CheckCircle2 className="w-5 h-5 text-[#00D9C0] mt-0.5 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />}
              <div>
                <p className={`font-semibold mb-1 ${isCorrect ? 'text-[#00D9C0]' : 'text-red-400'}`}>{isCorrect ? '回答正确！' : '回答错误'}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{exercise.explanation}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNext}
              className="mt-3 w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              下一题 <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function GrammarResult({
  correct,
  wrong,
  total,
  wrongExercises,
  timeSpent,
  onRetry,
  onBack,
}: {
  correct: number;
  wrong: number;
  total: number;
  wrongExercises: { exercise: GrammarExercise; userAnswer: string }[];
  timeSpent: number;
  onRetry: () => void;
  onBack: () => void;
}) {
  const score = Math.round((correct / total) * 100);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center pb-20">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="relative w-36 h-36 mx-auto mb-6">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <motion.circle cx="60" cy="60" r="52" fill="none" stroke={score >= 60 ? '#00D9C0' : '#FF6B35'} strokeWidth="8" strokeLinecap="round" strokeDasharray={327} initial={{ strokeDashoffset: 327 }} animate={{ strokeDashoffset: 327 - (327 * score) / 100 }} transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}</span>
          <span className="text-xs text-gray-400">分</span>
        </div>
      </motion.div>

      <h2 className="font-heading text-2xl font-bold text-white mb-2">练习完成</h2>
      <div className="flex items-center justify-center gap-1.5 text-gray-400 mb-8">
        <Clock className="w-4 h-4" />
        <span className="text-sm">用时 {Math.floor(timeSpent / 60)}分{timeSpent % 60}秒</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: '正确', value: correct, color: 'text-[#00D9C0]', bg: 'bg-[#00D9C0]/10' },
          { label: '错误', value: wrong, color: 'text-red-400', bg: 'bg-red-500/10' },
          { label: '总题数', value: total, color: 'text-gray-300', bg: 'bg-white/5' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-4`}>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {wrongExercises.length > 0 && (
        <div className="bg-white/5 rounded-2xl border border-white/10 p-5 mb-8 text-left max-h-64 overflow-y-auto">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" />错题回顾</h3>
          <div className="space-y-4">
            {wrongExercises.map((item) => (
              <div key={item.exercise.id} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <p className="text-sm text-gray-300 mb-1">{item.exercise.question}</p>
                <p className="text-xs text-red-400">你的答案：{item.userAnswer}</p>
                <p className="text-xs text-[#00D9C0]">正确答案：{item.exercise.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onRetry} className="px-6 py-3 rounded-full bg-[#1A2744] text-white border border-white/10 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />重新练习
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onBack} className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E55525] text-white">返回主页</motion.button>
      </div>
    </motion.div>
  );
}

export default function GrammarPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { startSession, endSession, updateProgress } = useProgressStore();
  const { checkAchievements } = useAchievementStore();
  const { user } = useAuthStore();
  const { currentCourse } = useCourseStore();

  const exercises = currentCourse ? getGrammarByLanguage(currentCourse.language.code) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [combo, setCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongExercises, setWrongExercises] = useState<{ exercise: GrammarExercise; userAnswer: string }[]>([]);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    startSession(courseId || '', 'grammar', 'grammar');
    return () => { endSession(); };
  }, [courseId]);

  const currentExercise = exercises[currentIndex];

  const handleAnswer = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === currentExercise?.answer) {
      setCombo((c) => c + 1);
      setCorrectCount((c) => c + 1);
    } else {
      setCombo(0);
      if (currentExercise) {
        setWrongExercises((prev) => [...prev, { exercise: currentExercise, userAnswer: answer }]);
      }
    }
  }, [currentExercise]);

  const handleNext = useCallback(() => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      finishSession();
    }
  }, [currentIndex, exercises.length]);

  const finishSession = useCallback(() => {
    setShowResult(true);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    endSession({ exercisesCompleted: exercises.length, correctCount });
    updateProgress(courseId || '', {
      completionPercent: Math.min(100, (correctCount / exercises.length) * 100),
    });
    checkAchievements(
      { streakDays: 1, totalWords: 0, grammarScore: Math.round((correctCount / exercises.length) * 100), speakingCount: 0, speakingMinutes: 0, listeningScore: 0, socialCount: 0, likeCount: 0 },
      user?.id || ''
    );
  }, [exercises.length, correctCount, startTime, courseId, endSession, updateProgress, checkAchievements, user?.id]);

  const retry = () => {
    setCurrentIndex(0); setSelectedAnswer(null); setIsAnswered(false); setShowResult(false);
    setCombo(0); setCorrectCount(0); setWrongExercises([]);
    startSession(courseId || '', 'grammar', 'grammar');
  };

  if (!exercises.length) {
    return (<div className="min-h-screen bg-[#0A1628] flex items-center justify-center"><p className="text-gray-400">暂无语法练习数据</p></div>);
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0A1628]/80 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(`/learn/${courseId}`)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /><span className="text-sm">返回</span>
          </button>
          <h1 className="font-heading text-lg font-bold text-white hidden sm:block">语法练习</h1>
          <div className="text-sm text-gray-400">{currentIndex + 1}/{exercises.length}</div>
        </div>
        <div className="h-1 bg-white/5">
          <motion.div className="h-full bg-gradient-to-r from-[#00D9C0] to-[#00B89E]" animate={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {showResult ? (
            <GrammarResult key="result" correct={correctCount} wrong={wrongExercises.length} total={exercises.length} wrongExercises={wrongExercises} timeSpent={Math.round((Date.now() - startTime) / 1000)} onRetry={retry} onBack={() => navigate(`/learn/${courseId}`)} />
          ) : currentExercise ? (
            <QuestionCard key={currentExercise.id} exercise={currentExercise} index={currentIndex} total={exercises.length} selectedAnswer={selectedAnswer} isAnswered={isAnswered} onAnswer={handleAnswer} onNext={handleNext} combo={combo} />
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}

