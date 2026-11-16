import { Suspense, lazy, useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Mail, ChevronDown, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

const HeroCanvas = lazy(() => import('./three/HeroCanvas'));

const TITLES = [
  'QA Engineer',
  'AI & LLM Tester (Promptfoo & Ragas)',
  'CI/CD Pipeline QA (GitHub Actions)',
  'Automation & API Specialist',
  'Cross-Browser & Mobile QA',
];

/* ── Typewriter with reliable cleanup ── */
function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = TITLES[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && chars < cur.length) {
      t = setTimeout(() => setChars((c) => c + 1), 60);
    } else if (!del && chars === cur.length) {
      t = setTimeout(() => setDel(true), 2200);
    } else if (del && chars > 0) {
      t = setTimeout(() => setChars((c) => c - 1), 35);
    } else {
      t = setTimeout(() => {
        setDel(false);
        setIdx((i) => (i + 1) % TITLES.length);
      }, 200);
    }
    return () => clearTimeout(t);
  }, [chars, del, idx]);

  return (
    <span className="tw-cursor text-sky-400 font-outfit font-bold">
      {TITLES[idx].slice(0, chars)}
    </span>
  );
}

export default function Hero({ onOpenInspector }: { onOpenInspector?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    // Only track on fine pointer (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const el = containerRef.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 24);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 16);
    };
    el.addEventListener('mousemove', handle);
    return () => el.removeEventListener('mousemove', handle);
  }, [mouseX, mouseY]);

  const scrollNext = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100dvh] min-h-screen flex items-center grid-bg overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 100% 70% at 60% 0%, rgba(56,189,248,0.08) 0%, transparent 60%), #020817',
      }}
    >
      {/* Ambient blobs */}
      <div className="glow-blob w-[500px] h-[500px] -top-40 -right-40 bg-sky-500" />
      <div className="glow-blob w-[400px] h-[400px] bottom-0 -left-20 bg-emerald-500/80" />

      <div className="container relative z-10 px-4 sm:px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100dvh-6rem)]">
          {/* ── LEFT: Text (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            {/* Status badges row */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2 mb-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-sm border-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[11px] font-mono font-medium text-emerald-400">Available for Opportunities</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-sm border-sky-500/30 text-[11px] font-mono text-sky-400">
                <span>🛡️</span> Promptfoo &amp; Ragas Tested
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1
                className="font-outfit font-black leading-[1.08] text-white mb-3"
                style={{ fontSize: 'clamp(2.3rem, 6.5vw, 4.5rem)' }}
              >
                Hi, I'm <span className="gradient-text">Vijay E.</span>
              </h1>
            </motion.div>

            {/* Typewriter row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-slate-400 text-sm sm:text-base font-mono">Role //</span>
              <div className="text-base sm:text-lg lg:text-xl font-semibold min-h-[2rem] flex items-center">
                <Typewriter />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-7"
            >
              {personalInfo.tagline} Specialized in manual &amp; automated test engineering, evaluating AI applications with <strong>Promptfoo</strong> and <strong>Ragas</strong>, and building continuous test pipelines using <strong>GitHub Actions</strong>, <strong>Docker</strong>, and <strong>Kubernetes</strong>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <button
                id="hero-explore"
                className="btn btn-blue text-sm"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Work <ArrowRight size={15} />
              </button>

              {onOpenInspector && (
                <button
                  id="hero-inspector"
                  onClick={onOpenInspector}
                  className="btn glass-card text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/10 text-sm flex items-center gap-1.5"
                >
                  <ShieldCheck size={16} /> Run QA Inspection
                </button>
              )}

              <a
                id="hero-resume"
                href={personalInfo.resumeUrl}
                download
                className="btn btn-ghost text-sm"
              >
                <Download size={15} /> Resume
              </a>

              <button
                id="hero-contact"
                className="btn btn-ghost text-sm"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail size={15} /> Contact
              </button>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3"
            >
              <span className="text-slate-500 text-xs font-mono tracking-widest">CONNECT</span>
              <div className="h-px w-8 bg-slate-700" />
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-linkedin"
                aria-label="LinkedIn Profile"
                className="glass-card p-2.5 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all group"
              >
                <LinkedinIcon size={16} className="text-slate-400 group-hover:text-sky-400 transition-colors" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-github"
                aria-label="GitHub Profile"
                className="glass-card p-2.5 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all group"
              >
                <GithubIcon size={16} className="text-slate-400 group-hover:text-sky-400 transition-colors" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                id="hero-email"
                aria-label="Send Email"
                className="glass-card p-2.5 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all group"
              >
                <Mail size={16} className="text-slate-400 group-hover:text-sky-400 transition-colors" />
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D + Floating telemetry chips (5 cols) ── */}
          <motion.div
            style={{ rotateX: springY, rotateY: springX, perspective: 1200 }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 order-1 lg:order-2 relative h-[300px] sm:h-[380px] lg:h-[500px]"
          >
            {/* 3D Canvas */}
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-sky-400/20 border-t-sky-400 anim-spin" />
                </div>
              }
            >
              <HeroCanvas />
            </Suspense>

            {/* Floating QA Telemetry Badges */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute top-2 right-2 sm:right-0 glass-sm px-3 py-2 flex items-center gap-2 border-emerald-500/30"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-xs">🧠</div>
              <div>
                <div className="text-white text-xs font-semibold">Ragas Faithfulness: 98%</div>
                <div className="text-emerald-400 text-[10px] font-mono">0 Hallucinations</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="absolute bottom-6 left-2 sm:left-0 glass-sm px-3 py-2 flex items-center gap-2 border-sky-500/30"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center text-xs">🚀</div>
              <div>
                <div className="text-white text-xs font-semibold">GitHub Actions CI</div>
                <div className="text-sky-400 text-[10px] font-mono">Docker + K8s: All Green</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-24 right-0 glass-sm px-3 py-2 hidden sm:flex items-center gap-2 border-violet-500/30"
            >
              <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center text-xs">🛡️</div>
              <div>
                <div className="text-white text-xs font-semibold">Promptfoo Red-Team</div>
                <div className="text-violet-400 text-[10px] font-mono">Injection Guard: Active</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={scrollNext}
          aria-label="Scroll to About Section"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-sky-400 transition-colors"
        >
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
