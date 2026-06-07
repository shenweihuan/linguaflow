import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Waves,
} from 'lucide-react';
import useProgressStore from '@/stores/useProgressStore';
import useAchievementStore from '@/stores/useAchievementStore';
import useAuthStore from '@/stores/useAuthStore';
import useCourseStore from '@/stores/useCourseStore';

interface SpeakingSentence {
  id: string;
  sentence: string;
  translation: string;
}

const ENGLISH_SENTENCES: SpeakingSentence[] = [
  { id: 's1', sentence: 'Hello, how are you doing today?', translation: '你好，你今天怎么样？' },
  { id: 's2', sentence: 'I am learning a new language.', translation: '我正在学习一门新语言。' },
  { id: 's3', sentence: 'The weather is really nice today.', translation: '今天天气真好。' },
  { id: 's4', sentence: 'Can you help me with this problem?', translation: '你能帮我解决这个问题吗？' },
  { id: 's5', sentence: 'I would like to order some food, please.', translation: '我想点一些食物，谢谢。' },
  { id: 's6', sentence: 'What time does the movie start?', translation: '电影几点开始？' },
  { id: 's7', sentence: 'She speaks English very fluently.', translation: '她英语说得很流利。' },
  { id: 's8', sentence: 'Let me introduce myself to you.', translation: '让我自我介绍一下。' },
];

function speakText(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
}

function WaveformCanvas({ isRecording }: { isRecording: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const barCount = 40;
      const gap = 4;
      const barWidth = (w - gap * (barCount - 1)) / barCount;

      for (let i = 0; i < barCount; i++) {
        let heightRatio = isRecording ? 0.15 + Math.sin(frame * 0.1 + i * 0.4) * 0.35 + Math.random() * 0.25 : 0.08 + Math.sin(i * 0.3) * 0.04;
        heightRatio = Math.max(0.05, Math.min(0.9, heightRatio));
        const barH = h * heightRatio;
        const x = i * (barWidth + gap);
        const y = (h - barH) / 2;

        const gradient = ctx.createLinearGradient(x, y, x, y + barH);
        gradient.addColorStop(0, '#FF6B35');
        gradient.addColorStop(1, '#00D9C0');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, 3);
        ctx.fill();
      }

      frame++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [isRecording]);

  return <canvas ref={canvasRef} width={400} height={100} className="w-full max-w-[400px] h-[80px]" />;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 60;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? '#00D9C0' : score >= 80 ? '#FBBF24' : score >= 60 ? '#A78BFA' : '#FF6B35';

  return (
    <div className="relative" style={{ width: radius * 2 + 20, height: radius * 2 + 20 }}>
      <svg width={radius * 2 + 20} height={radius * 2 + 20} className="-rotate-90">
        <circle cx={radius + 10} cy={radius + 10} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <motion.circle cx={radius + 10} cy={radius + 10} r={radius} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.5, ease: 'easeOut' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className={`text-xs font-medium ${score >= 90 ? 'text-[#00D9C0]' : score >= 80 ? 'text-[#FBBF24]' : score >= 60 ? 'text-purple-400' : 'text-[#FF6B35]'}`}>
          {score >= 90 ? '优秀' : score >= 80 ? '良好' : score >= 60 ? '及格' : '需加油'}
        </span>
      </div>
    </div>
  );
}

function WordComparison({ original, recognized }: { original: string; recognized: string }) {
  const origWords = original.split(' ');
  const recogWords = recognized.split(' ');

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {origWords.map((word, i) => (
          <span key={i} className={`px-2 py-1 rounded text-sm font-medium ${recogWords[i] === word ? 'bg-[#00D9C0]/20 text-[#00D9C0]' : 'bg-red-500/20 text-red-400'}`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SpeakingPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { startSession, endSession, updateProgress } = useProgressStore();
  const { checkAchievements } = useAchievementStore();
  const { user } = useAuthStore();

  const sentences = ENGLISH_SENTENCES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [recognizedText, setRecognizedText] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [useManualMode, setUseManualMode] = useState(false);
  const [completedIndices, setCompletedIndices] = useState<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognitionRef = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  const currentSentence = sentences[currentIndex];

  useEffect(() => {
    startSession(courseId || '', 'speaking', 'speaking');
    return () => { endSession(); };
  }, [courseId]);

  useEffect(() => {
    if (SpeechRecognitionAPI && !recognitionRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognitionAPI as any)();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript || '';
        handleRecognitionResult(transcript);
      };
      recognition.onerror = () => {
        setIsRecording(false);
        stopTimer();
        setUseManualMode(true);
      };
      recognitionRef.current.onend = () => {
        setIsRecording(false);
        stopTimer();
      };
    }
  }, []);

  const startTimer = () => {
    setRecordTime(0);
    timerRef.current = setInterval(() => setRecordTime((t) => t + 1), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const startRecording = useCallback(() => {
    if (!recognitionRef.current || useManualMode) return;
    setShowScore(false); setHasRecorded(false);
    try {
      recognitionRef.current.start(); setIsRecording(true); startTimer();
    } catch { /* already started */ }
  }, [useManualMode]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      try { recognitionRef.current.stop(); } catch { /* already stopped */ }
    }
  }, [isRecording]);

  const handleRecognitionResult = (transcript: string) => {
    setRecognizedText(transcript);
    calculateScore(transcript);
  };

  const calculateScore = (text: string) => {
    const origWords = currentSentence.sentence.toLowerCase().replace(/[?.,!]/g, '').split(' ');
    const inputWords = text.toLowerCase().replace(/[?.,!]/g, '').split(' ');
    let matchCount = 0;
    origWords.forEach((w, i) => { if (inputWords[i] === w) matchCount++; });
    const similarity = Math.round((matchCount / origWords.length) * 100);
    const finalScore = Math.min(100, similarity + Math.floor(Math.random() * 10));
    setScore(finalScore); setShowScore(true); setHasRecorded(true);
    setCompletedIndices((prev) => new Set([...prev, currentIndex]));
  };

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      handleRecognitionResult(manualInput.trim());
    }
  };

  const goNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetState();
    } else {
      finishSession();
    }
  };

  const resetState = () => {
    setIsRecording(false); setHasRecorded(false); setShowScore(false);
    setScore(0); setRecognizedText(''); setManualInput(''); stopTimer();
  };

  const finishSession = () => {
    const avgScore = completedIndices.size > 0 ? Math.round(Array.from(completedIndices).reduce(() => 70 + Math.random() * 25, 0) / completedIndices.size) : 0;
    endSession({ exercisesCompleted: completedIndices.size, correctCount: Math.floor(completedIndices.size * 0.8) });
    updateProgress(courseId || '', { completionPercent: Math.min(100, (completedIndices.size / sentences.length) * 100) });
    checkAchievements({ streakDays: 1, totalWords: 0, grammarScore: 0, speakingCount: completedIndices.size, speakingMinutes: Math.round(recordTime / 60), listeningScore: 0, socialCount: 0, likeCount: 0 }, user?.id || '');
    navigate(`/learn/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0A1628]/80 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(`/learn/${courseId}`)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /><span className="text-sm">返回</span></button>
          <h1 className="font-heading text-lg font-bold text-white hidden sm:block">口语跟读</h1>
          <div className="text-sm text-gray-400">{currentIndex + 1}/{sentences.length}</div>
        </div>
        <div className="h-1 bg-white/5">
          <motion.div className="h-full bg-gradient-to-r from-[#A78BFA] to-[#7C3AED]" animate={{ width: `${((currentIndex + 1) / sentences.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Sentence Display */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="bg-gradient-to-br from-[#A78BFA]/10 to-transparent rounded-2xl border border-[#A78BFA]/20 p-8 mb-4">
            <p className="font-heading text-2xl sm:text-3xl font-bold text-white leading-relaxed mb-3">{currentSentence?.sentence}</p>
            <p className="text-base text-gray-400">{currentSentence?.translation}</p>
          </div>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => speakText(currentSentence?.sentence || '')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-gray-300 hover:bg-white/15 transition-colors">
            <Volume2 className="w-5 h-5 text-[#A78BFA]" />播放原音
          </motion.button>
        </motion.div>

        {/* Waveform */}
        <div className="flex justify-center mb-8">
          <WaveformCanvas isRecording={isRecording} />
        </div>

        {/* Recording Control */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? stopRecording : useManualMode ? undefined : startRecording}
            disabled={useManualMode}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isRecording ? 'bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)]' : 'bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] shadow-[0_0_30px_rgba(167,139,250,0.3)]'
            }`}
          >
            {isRecording && (
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 rounded-full bg-red-500/30" />
            )}
            {isRecording ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
          </motion.button>
        </div>

        {isRecording && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-400 text-sm mb-4 flex items-center justify-center gap-1.5">
            <Waves className="w-4 h-4 animate-pulse" />
            录制中... {Math.floor(recordTime / 60)}:{String(recordTime % 60).padStart(2, '0')}
          </motion.p>
        )}

        {!isRecording && !showScore && !useManualMode && hasRecorded && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 text-sm mb-4">点击麦克风重新录制</motion.p>
        )}

        {/* Manual Input Fallback */}
        {useManualMode && !showScore && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto mb-8">
            <div className="flex items-start gap-2 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-300 font-medium">浏览器不支持语音识别</p>
                <p className="text-xs text-amber-400/70 mt-1">你可以手动输入你说的内容进行对比练习</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="text" value={manualInput} onChange={(e) => setManualInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()} placeholder="输入你说的句子..." className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#A78BFA]/50 text-white placeholder-gray-500 outline-none" />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleManualSubmit} className="px-5 py-3 rounded-xl bg-[#A78BFA] text-white font-semibold">提交</motion.button>
            </div>
          </motion.div>
        )}

        {/* Score & Feedback */}
        <AnimatePresence>
          {showScore && (
            <motion.div key="score" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-lg mx-auto">
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6 text-center mb-6">
                <ScoreRing score={score} />

                <div className="mt-6 text-left">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">逐词对比</h4>
                  <WordComparison original={currentSentence.sentence} recognized={recognizedText} />
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { resetState(); setUseManualMode(false); }} className="px-5 py-2.5 rounded-full bg-white/10 text-gray-300 hover:bg-white/15 flex items-center gap-2 transition-colors">
                  <RotateCcw className="w-4 h-4" />重新录制
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={goNext} className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white flex items-center gap-2">
                  下一句 <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sentence List */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><Waves className="w-4 h-4" />练习列表</h3>
          <div className="space-y-2">
            {sentences.map((s, i) => (
              <button key={s.id} onClick={() => { setCurrentIndex(i); resetState(); setShowScore(false); }} className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                i === currentIndex ? 'bg-[#A78BFA]/15 border-[#A78BFA]/40' : completedIndices.has(i) ? 'bg-[#00D9C0]/5 border-[#00D9C0]/20' : 'bg-white/5 border-white/10 hover:bg-white/8'
              }`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  completedIndices.has(i) ? 'bg-[#00D9C0] text-white' : i === currentIndex ? 'bg-[#A78BFA] text-white' : 'bg-white/10 text-gray-500'
                }`}>
                  {completedIndices.has(i) ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm truncate ${i === currentIndex ? 'text-white font-medium' : 'text-gray-400'}`}>{s.sentence}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
