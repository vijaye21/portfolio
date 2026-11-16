import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  '> initializing portfolio...',
  '> loading QA mindset...',
  '> evaluating Promptfoo & Ragas AI guardrails...',
  '> verifying GitHub Actions & Docker containers...',
  '> running cross-browser & viewport checks...',
  '> all systems green ✓',
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);
  const raf = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // If previously completed in this session, skip immediately
    if (typeof window !== 'undefined' && sessionStorage.getItem('portfolio_preloader_seen')) {
      onDone();
      return;
    }

    let p = 0;
    const step = () => {
      p += Math.random() * 22 + 8;
      if (p >= 100) {
        setProgress(100);
        setLineIndex(LINES.length - 1);
        sessionStorage.setItem('portfolio_preloader_seen', 'true');
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 300);
        }, 300);
        return;
      }
      setProgress(Math.min(p, 100));
      setLineIndex(Math.min(Math.floor((p / 100) * LINES.length), LINES.length - 1));
      raf.current = setTimeout(step, 90 + Math.random() * 80);
    };
    raf.current = setTimeout(step, 100);

    return () => {
      if (raf.current) clearTimeout(raf.current);
    };
  }, [onDone]);

  const handleSkip = () => {
    if (raf.current) clearTimeout(raf.current);
    sessionStorage.setItem('portfolio_preloader_seen', 'true');
    setDone(true);
    onDone();
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'backOut' }}
            className="relative flex items-center justify-center mb-2"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-3xl font-black text-white font-outfit shadow-lg shadow-sky-500/30">
              V
            </div>
            {/* Spinning rings */}
            <div className="absolute w-24 h-24 rounded-full border border-sky-400/20 border-t-sky-400 anim-spin" />
            <div className="absolute w-20 h-20 rounded-full border border-emerald-400/20 border-b-emerald-400 anim-spin-rev" />
          </motion.div>

          {/* Terminal text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-sm px-5 py-3.5 min-w-[280px] sm:min-w-[340px] max-w-[90vw]"
          >
            <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] font-mono text-slate-500 ml-2">qa-diagnostic-session.log</span>
            </div>
            {LINES.slice(0, lineIndex + 1).map((line, i) => (
              <p
                key={i}
                className={`text-xs font-mono leading-relaxed truncate ${
                  i === lineIndex ? 'text-sky-400' : 'text-slate-400'
                }`}
              >
                {line}
                {i === lineIndex && i < LINES.length - 1 && <span className="tw-cursor" />}
              </p>
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="preloader-bar">
            <motion.div className="preloader-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-between w-[200px] text-xs font-mono">
            <span className="text-slate-500">{Math.round(progress)}% loaded</span>
            <button
              onClick={handleSkip}
              className="text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
