import { Suspense, lazy, useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Mail, ChevronDown, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

const HeroCanvas = lazy(() => import('./three/HeroCanvas'));

const TITLES = [
  'Promptfoo & Ragas AI Evaluation',
  'GitHub Actions CI/CD Automation',
  'Docker & Kubernetes Test Grids',
  'API & Mobile Automation (Selenium, Appium)',
  'Cross-Browser & Performance QA (k6, JMeter)',
];

/* ── Typewriter with preloaded first title to prevent empty role ── */
function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(TITLES[0].length);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = TITLES[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && chars < cur.length) {
      t = setTimeout(() => setChars((c) => c + 1), 55);
    } else if (!del && chars === cur.length) {
      t = setTimeout(() => setDel(true), 2400);
    } else if (del && chars > 0) {
      t = setTimeout(() => setChars((c) => c - 1), 30);
    } else {
      t = setTimeout(() => {
        setDel(false);
        setIdx((i) => (i + 1) % TITLES.length);
      }, 150);
    }
    return () => clearTimeout(t);
  }, [chars, del, idx]);

  return (
    <span className="tw-cursor text-sky-400 font-mono font-medium text-xs sm:text-sm">
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
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const el = containerRef.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 20);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 14);
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
      {/* Ambient background glows */}
      <div className="glow-blob w-[450px] h-[450px] -top-32 -right-32 bg-sky-500/20" />
      <div className="glow-blob w-[400px] h-[400px] bottom-0 -left-20 bg-emerald-500/15" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[calc(100dvh-7rem)]">
          {/* ── LEFT: Profile & Value Proposition (Always order-1 for optimal mobile UX) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1">
            {/* Status badges row */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-wrap items-center gap-2.5 mb-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-sm border-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[11px] font-mono font-medium text-emerald-400">Available for Opportunities</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-sm border-sky-500/30 text-[11px] font-mono text-sky-400">
                <span>🛡️</span> Promptfoo &amp; Ragas Tested
              </div>
            </motion.div>

            {/* Name Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1
                className="font-outfit font-black leading-[1.08] text-white mb-2"
                style={{ fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)' }}
              >
                Hi, I'm <span className="gradient-text">Vijay E.</span>
              </h1>
            </motion.div>

            {/* Professional Title & Dynamic Specialization (Resolves the missing role text issue) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-5"
            >
              <h2 className="font-outfit font-extrabold text-xl sm:text-2xl lg:text-3xl text-sky-400 tracking-tight">
                QA Engineer | AI SDET
              </h2>
              <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm font-mono text-slate-400 min-h-[1.75rem]">
                <span className="text-emerald-400 font-semibold flex-shrink-0">Focus //</span>
                <Typewriter />
              </div>
            </motion.div>

            {/* Tagline & Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-7"
            >
              {personalInfo.tagline} Specialized in manual &amp; automated test engineering, evaluating AI applications with <strong>Promptfoo</strong> and <strong>Ragas</strong>, and building continuous test pipelines using <strong>GitHub Actions</strong>, <strong>Docker</strong>, and <strong>Kubernetes</strong>.
            </motion.p>

            {/* CTA Buttons (Standardized heights, alignment, and mobile-friendly stacking) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5 mb-8"
            >
              {/* Explore Work */}
              <button
                id="hero-explore"
                className="h-11 px-5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Explore Work</span>
                <ArrowRight size={15} />
              </button>

              {/* Run QA Inspection Modal Trigger */}
              {onOpenInspector && (
                <button
                  id="hero-inspector"
                  onClick={onOpenInspector}
                  className="h-11 px-5 rounded-full text-xs sm:text-sm font-mono font-semibold border border-emerald-500/40 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400/60 shadow-sm shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Run QA Inspection</span>
                </button>
              )}

              {/* Download Resume */}
              <a
                id="hero-resume"
                href={personalInfo.resumeUrl}
                download
                className="h-11 px-5 rounded-full text-xs sm:text-sm font-semibold border border-sky-400/30 text-sky-300 bg-sky-500/5 hover:bg-sky-500/15 hover:border-sky-400/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={15} />
                <span>Resume</span>
              </a>

              {/* Contact Button */}
              <button
                id="hero-contact"
                className="h-11 px-5 rounded-full text-xs sm:text-sm font-semibold border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail size={15} />
                <span>Contact</span>
              </button>
            </motion.div>

            {/* Social Media Links Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-3.5"
            >
              <span className="text-slate-500 text-xs font-mono tracking-widest uppercase">Connect</span>
              <div className="h-px w-8 bg-slate-800" />
              <div className="flex items-center gap-2.5">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-linkedin"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-xl glass-card border-white/10 hover:border-sky-400/50 hover:bg-sky-400/10 flex items-center justify-center text-slate-400 hover:text-sky-300 transition-all group cursor-pointer"
                >
                  <LinkedinIcon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-github"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 rounded-xl glass-card border-white/10 hover:border-sky-400/50 hover:bg-sky-400/10 flex items-center justify-center text-slate-400 hover:text-sky-300 transition-all group cursor-pointer"
                >
                  <GithubIcon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  id="hero-email"
                  aria-label="Send Email"
                  className="w-10 h-10 rounded-xl glass-card border-white/10 hover:border-sky-400/50 hover:bg-sky-400/10 flex items-center justify-center text-slate-400 hover:text-sky-300 transition-all group cursor-pointer"
                >
                  <Mail size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D Visualization + Telemetry Chips (order-2 on mobile) ── */}
          <motion.div
            style={{ rotateX: springY, rotateY: springX, perspective: 1200 }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 order-2 relative h-[280px] sm:h-[380px] lg:h-[500px] w-full"
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute top-2 right-2 sm:right-0 glass-sm px-3 py-2 flex items-center gap-2 border-emerald-500/30 shadow-lg shadow-black/30 pointer-events-none"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-xs">🧠</div>
              <div>
                <div className="text-white text-xs font-semibold">Ragas Faithfulness: 98%</div>
                <div className="text-emerald-400 text-[10px] font-mono">0 Hallucinations</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute bottom-4 left-2 sm:left-0 glass-sm px-3 py-2 flex items-center gap-2 border-sky-500/30 shadow-lg shadow-black/30 pointer-events-none"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center text-xs">🚀</div>
              <div>
                <div className="text-white text-xs font-semibold">GitHub Actions CI</div>
                <div className="text-sky-400 text-[10px] font-mono">Docker + K8s: All Green</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="absolute bottom-24 right-0 glass-sm px-3 py-2 hidden sm:flex items-center gap-2 border-violet-500/30 shadow-lg shadow-black/30 pointer-events-none"
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
          transition={{ delay: 1.4 }}
          onClick={scrollNext}
          aria-label="Scroll to About Section"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-sky-400 transition-colors cursor-pointer"
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
