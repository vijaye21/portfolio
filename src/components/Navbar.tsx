import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'AI & CI/CD', href: '#ai-cicd' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenInspector }: { onOpenInspector?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section tracking
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    NAV.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[rgba(3,7,18,0.92)] backdrop-blur-xl border-b border-white/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
            aria-label="Back to top"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center font-outfit font-black text-white text-sm shadow-lg shadow-sky-500/25">
              V
            </div>
            <span className="font-outfit font-bold text-white text-base">
              Vijay<span className="text-sky-400">.</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => go(href)}
                className={`relative px-2.5 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  active === href.slice(1)
                    ? 'text-sky-400'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
                {active === href.slice(1) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-sky-400/10 rounded-lg border border-sky-400/20"
                    style={{ zIndex: -1 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {onOpenInspector && (
              <button
                onClick={onOpenInspector}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all cursor-pointer"
                title="Run live QA diagnostics on this browser"
              >
                <ShieldCheck size={14} />
                <span className="hidden sm:inline">QA Audit</span>
              </button>
            )}

            <a
              href={personalInfo.resumeUrl}
              download
              className="hidden sm:flex btn btn-blue text-xs py-2 px-3.5"
              aria-label="Download Resume"
            >
              <Download size={13} /> Resume
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden glass-sm p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[min(85vw,320px)] z-50 lg:hidden flex flex-col"
              style={{
                background: 'rgba(10,17,32,0.98)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(56,189,248,0.1)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-14 border-b border-white/5">
                <span className="font-outfit font-bold text-white">
                  Vijay<span className="text-sky-400">.</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {NAV.map(({ label, href }) => (
                  <button
                    key={href}
                    onClick={() => go(href)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active === href.slice(1)
                        ? 'bg-sky-400/10 text-sky-400 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                ))}

                {onOpenInspector && (
                  <button
                    onClick={() => {
                      setOpen(false);
                      onOpenInspector();
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-mono text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all flex items-center gap-2 mt-4"
                  >
                    <ShieldCheck size={16} />
                    Run QA Audit
                  </button>
                )}
              </nav>

              {/* Drawer footer */}
              <div className="p-4 border-t border-white/5">
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="btn btn-blue w-full text-xs justify-center"
                >
                  <Download size={14} /> Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
