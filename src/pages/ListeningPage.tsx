import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Gauge,
  CheckCircle2,
  XCircle,
  Trophy,
  RefreshCw,
  Eye,
  Lightbulb,
} from 'lucide-react';
import useProgressStore from '@/stores/useProgressStore';
import useAchievementStore from '@/stores/useAchievementStore';
import useAuthStore from '@/stores/useAuthStore';
import useCourseStore from '@/stores/useCourseStore';
import { getListeningByLanguage } from '@/assets/data/listening';
import type { ListeningExercise } from '@/types/learning';

const SPEED_OPTIONS = [0.75, 1, 1.25];

function AudioPlayer({
  onPlay,
  isPlaying,
  speed,
  onSpeedChange,
}: {
  onPlay: () => void;
  isPlaying: boolean;
  speed: number;
  onSpeedChange: (s: number) => void;
}) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(45);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((t) => { const nt = t + 1; setProgress((nt / duration) * 100); return nt >= duration ? (clearInterval(intervalRef.current!), duration) : nt; });
      }, 1000 / speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, speed, duration]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-5 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onPlay} className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FBBF24] to-[#D97706] flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)]">
          {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
        </motion.button>

        <div className="flex-1">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect(); const pct = (e.clientX - rect.left) / rect.width; setCurrentTime(pct * duration); setProgress(pct * 100);
          }}>
            <motion.div className="h-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
            <span className="text-xs text-gray-500">{formatTime(duration)}</span>
          </div>
        </div>

        <button onClick={() => { setCurrentTime(0); setProgress(0); }} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400"><RotateCcw className="w-4 h-4" /></button>
      </div>

      <div className="flex items-center gap-3">
        <Gauge className="w-4 h-4 text-gray-500" />
        <div className="flex gap-1.5">
          {SPEED_OPTIONS.map((s) => (
            <button key={s} onClick={() => onSpeedChange(s)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${speed === s ? 'bg-[#FBBF24] text-black' : 'bg-white/10 text-gray-400 hover:bg-white/15'}`}>
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuestionArea({
  exercise,
  selectedAnswer,
  isSubmitted,
  onSelect,
  onSubmit,
  showHint,
  hintLevel,
  onShowHint,
}: {
  exercise: ListeningExercise;
  selectedAnswer: number | null;
  isSubmitted: boolean;
  onSelect: (idx: number) => void;
  onSubmit: () => void;
  showHint: boolean;
  hintLevel: number;
  onShowHint: () => void;
}) {
  const isCorrect = isSubmitted && selectedAnswer === exercise.answer;

  return (
    <div className="space-y-4">
      {/* Question */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <p className="text-base sm:text-lg text-gray-200 leading-relaxed">{exercise.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {exercise.options.map((option, idx) => {
          let style = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-200';
          if (isSubmitted && idx === exercise.answer) style = 'bg-[#00D9C0]/15 border-[#00D9C0]/40 text-[#00D9C0]';
          else if (isSubmitted && idx === selectedAnswer && idx !== exercise.answer) style = 'bg-red-500/15 border-red-500/40 text-red-400';
          else if (selectedAnswer === idx && !isSubmitted) style = 'bg-[#FBBF24]/15 border-[#FBBF24]/40 text-[#FBBF24]';

          return (
            <motion.button key={idx} whileHover={!isSubmitted ? { scale: 1.01 } : {}} whileTap={!isSubmitted ? { scale: 0.99 } : {}}
              onClick={() => !isSubmitted && onSelect(idx)}
              disabled={isSubmitted}
              className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${style}`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                isSubmitted && idx === exercise.answer ? 'bg-[#00D9C0] text-white' :
                isSubmitted && idx === selectedAnswer && idx !== exercise.answer ? 'bg-red-500 text-white' :
                selectedAnswer === idx ? 'bg-[#FBBF24] text-black' : 'bg-white/10 text-gray-400'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="font-medium">{option}</span>
              {isSubmitted && idx === exercise.answer && <CheckCircle2 className="w-5 h-5 ml-auto flex-shrink-0" />}
              {isSubmitted && idx === selectedAnswer && idx !== exercise.answer && <XCircle className="w-5 h-5 ml-auto flex-shrink-0" />}
            </motion.button>
          );
        })}
      </div>

      {/* Actions */}
      {!isSubmitted ? (
        <div className="flex items-center gap-3 pt-2">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={onSubmit}
            disabled={selectedAnswer === null}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FBBF24] to-[#D97706] text-black font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            提交答案
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onShowHint} className="px-4 py-3 rounded-xl bg-white/10 text-gray-300 hover:bg-white/15 flex items-center gap-2 transition-colors">
            <Lightbulb className="w-4 h-4" /><span className="text-sm hidden sm:inline">提示</span>
          </motion.button>
        </div>
      ) : null}

      {/* Hint */}
      <AnimatePresence>
        {showHint && !isSubmitted && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-[#FBBF24]/10 border border-[#FBBF24]/20 rounded-xl p-4 flex items-start gap-2">
              <Eye className="w-4 h-4 text-[#FBBF24] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-[#FBBF24] font-medium">提示</p>
                <p className="text-xs text-gray-400 mt-1">
                  {hintLevel === 1 ? `正确答案的首字母是：${String.fromCharCode(65 + exercise.answer)}` :
                   hintLevel === 2 ? `排除一个错误选项，${String.fromCharCode(65 + ((exercise.answer + 2) % 4))} 不是正确答案` :
                   '再仔细听一遍音频中的关键词'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TranscriptView({ transcript, translation }: { transcript: string; translation: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-2xl border border-white/10 p-5 space-y-4">
      <h4 className="text-sm font-semibold text-gray-400 flex items-center gap-2"><Volume2 className="w-4 h-4" />听力原文</h4>
      <p className="text-base text-gray-200 leading-relaxed whitespace-pre-line">{transcript}</p>
      <div className="border-t border-white/10 pt-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-2">参考翻译</h4>
        <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{translation}</p>
      </div>
    </motion.div>
  );
}

function ListeningResult({
  scores,
  total,
  onRetry,
  onBack,
}: {
  scores: { correct: boolean; id: string }[];
  total: number;
  onRetry: () => void;
  onBack: () => void;
}) {
  const correctCount = scores.filter((s) => s.correct).length;
  const scorePct = Math.round((correctCount / total) * 100);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center pb-20">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="relative w-36 h-36 mx-auto mb-6">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <motion.circle cx="60" cy="60" r="52" fill="none" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" strokeDasharray={327} initial={{ strokeDashoffset: 327 }} animate={{ strokeDashoffset: 327 - (327 * scorePct) / 100 }} transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{scorePct}</span><span className="text-xs text-gray-400">分</span>
        </div>
      </motion.div>

      <h2 className="font-heading text-2xl font-bold text-white mb-2">听力训练完成！</h2>
      <Trophy className="w-10 h-10 text-[#FBBF24] mx-auto mb-6" />

      <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm mx-auto">
        {[
          { label: '正确', value: correctCount, color: 'text-[#00D9C0]', bg: 'bg-[#00D9C0]/10' },
          { label: '错误', value: total - correctCount, color: 'text-red-400', bg: 'bg-red-500/10' },
        ].map((stat) => (<div key={stat.label} className={`${stat.bg} rounded-xl p-4`}><p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p><p className="text-xs text-gray-500 mt-1">{stat.label}</p></div>))}
      </div>

      <div className="flex gap-3 justify-center">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onRetry} className="px-6 py-3 rounded-full bg-[#1A2744] text-white border border-white/10 flex items-center gap-2"><RefreshCw className="w-4 h-4" />重新练习</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onBack} className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FBBF24] to-[#D97706] text-black font-semibold">返回主页</motion.button>
      </div>
    </motion.div>
  );
}

export default function ListeningPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { startSession, endSession, updateProgress } = useProgressStore();
  const { checkAchievements } = useAchievementStore();
  const { user } = useAuthStore();
  const { currentCourse } = useCourseStore();

  const exercises = currentCourse ? getListeningByLanguage(currentCourse.language.code) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState<{ correct: boolean; id: string }[]>([]);

  useEffect(() => { startSession(courseId || '', 'listening', 'listening'); return () => { endSession(); }; }, [courseId]);

  const currentExercise = exercises[currentIndex];

  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null || !currentExercise) return;
    setIsSubmitted(true); setShowTranscript(true); setShowHint(false);
    const correct = selectedAnswer === currentExercise.answer;
    setScores((prev) => [...prev, { correct, id: currentExercise.id }]);
  }, [selectedAnswer, currentExercise]);

  const handleNext = useCallback(() => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1); setSelectedAnswer(null); setIsSubmitted(false);
      setShowTranscript(false); setShowHint(false); setHintLevel(0); setIsPlaying(false);
    } else finishSession();
  }, [currentIndex, exercises.length]);

  const handleShowHint = useCallback(() => {
    setShowHint(true); setHintLevel((l) => l + 1);
  }, []);

  const finishSession = useCallback(() => {
    setShowResult(true);
    const correct = scores.filter((s) => s.correct).length;
    endSession({ exercisesCompleted: exercises.length, correctCount: correct });
    updateProgress(courseId || '', { completionPercent: Math.min(100, (correct / exercises.length) * 100) });
    checkAchievements({ streakDays: 1, totalWords: 0, grammarScore: 0, speakingCount: 0, speakingMinutes: 0, listeningScore: Math.round((correct / exercises.length) * 100), socialCount: 0, likeCount: 0 }, user?.id || '');
  }, [scores, exercises.length, courseId, endSession, updateProgress, checkAchievements, user?.id]);

  const retry = () => {
    setCurrentIndex(0); setSelectedAnswer(null); setIsSubmitted(false); setShowTranscript(false);
    setShowResult(false); setScores([]); setShowHint(false); setHintLevel(0); setIsPlaying(false);
    startSession(courseId || '', 'listening', 'listening');
  };

  if (!exercises.length) {
    return (<div className="min-h-screen bg-[#0A1628] flex items-center justify-center"><p className="text-gray-400">暂无听力练习数据</p></div>);
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0A1628]/80 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(`/learn/${courseId}`)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /><span className="text-sm">返回</span></button>
          <h1 className="font-heading text-lg font-bold text-white hidden sm:block">听力训练</h1>
          <div className="text-sm text-gray-400">{currentIndex + 1}/{exercises.length}</div>
        </div>
        <div className="h-1 bg-white/5">
          <motion.div className="h-full bg-gradient-to-r from-[#FBBF24] to-[#D97706]" animate={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6 pb-20">
        <AnimatePresence mode="wait">
          {showResult ? (
            <ListeningResult key="result" scores={scores} total={exercises.length} onRetry={retry} onBack={() => navigate(`/learn/${courseId}`)} />
          ) : currentExercise ? (
            <motion.div key={currentExercise.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              {/* Audio Player */}
              <AudioPlayer onPlay={() => setIsPlaying(!isPlaying)} isPlaying={isPlaying} speed={speed} onSpeedChange={setSpeed} />

              {/* Question Area */}
              <QuestionArea exercise={currentExercise} selectedAnswer={selectedAnswer} isSubmitted={isSubmitted} onSelect={setSelectedAnswer} onSubmit={handleSubmit} showHint={showHint} hintLevel={hintLevel} onShowHint={handleShowHint} />

              {/* Transcript */}
              <AnimatePresence>{showTranscript && (
                <div className="mt-6">
                  <TranscriptView transcript={currentExercise.transcript} translation={currentExercise.translation} />
                  <div className="mt-4 flex justify-center">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FBBF24] to-[#D97706] text-black font-semibold flex items-center gap-2">
                      {currentIndex < exercises.length - 1 ? <>下一题 <ChevronRight className="w-4 h-4" /></> : '完成练习'}
                    </motion.button>
                  </div>
                </div>
              )}</AnimatePresence>

              {/* Navigation (bottom) */}
              <div className="mt-6 flex items-center justify-between">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { if (currentIndex > 0) { setCurrentIndex(currentIndex - 1); setSelectedAnswer(null); setIsSubmitted(false); setShowTranscript(false); setShowHint(false); } }} disabled={currentIndex === 0} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-gray-300 hover:bg-white/15 disabled:opacity-30 text-sm transition-colors">
                  <ChevronLeft className="w-4 h-4" />上一段
                </motion.button>
                <div className="flex gap-1.5">
                  {exercises.map((_, i) => (<div key={i} className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${i === currentIndex ? 'bg-[#FBBF24]' : scores[i]?.correct ? 'bg-[#00D9C0]' : scores[i] && !scores[i].correct ? 'bg-red-400' : 'bg-white/20'}`} onClick={() => { setCurrentIndex(i); setSelectedAnswer(null); setIsSubmitted(false); setShowTranscript(false); setShowHint(false); }} />))}
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleNext} disabled={!isSubmitted} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FBBF24] text-black font-semibold disabled:opacity-30 text-sm transition-colors">
                  下一段<ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}
