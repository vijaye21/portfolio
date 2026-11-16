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
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenInspector }: { onOpenInspector?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section tracking with accurate rootMargin
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
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
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030712]/92 backdrop-blur-xl border-b border-sky-400/10 shadow-lg shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer group"
            aria-label="Back to top"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 flex items-center justify-center font-outfit font-black text-white text-base shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              V
            </div>
            <span className="font-outfit font-bold text-white text-lg tracking-tight">
              Vijay<span className="text-sky-400">.</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2.5 px-3 py-1.5 rounded-2xl glass-sm border-white/5"
            aria-label="Main navigation"
          >
            {NAV.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <button
                  key={href}
                  onClick={() => go(href)}
                  className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'text-sky-300 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-sky-400/15 rounded-xl border border-sky-400/30 shadow-sm shadow-sky-400/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* QA Audit Button */}
            {onOpenInspector && (
              <button
                onClick={onOpenInspector}
                className="h-9 px-3 sm:px-3.5 rounded-full text-xs font-mono font-semibold border border-emerald-500/40 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-500/10"
                title="Run live QA diagnostics on this browser"
              >
                <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                <span className="hidden sm:inline">QA Audit</span>
              </button>
            )}

            {/* Resume Button */}
            <a
              href={personalInfo.resumeUrl}
              download
              className="hidden sm:inline-flex h-9 px-3.5 sm:px-4 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 hover:-translate-y-0.5 transition-all items-center gap-1.5 cursor-pointer whitespace-nowrap"
              aria-label="Download Resume"
            >
              <Download size={14} className="flex-shrink-0" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-xl glass-card border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-400/40 transition-all cursor-pointer"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[min(85vw,340px)] z-50 lg:hidden flex flex-col bg-[#030712] border-l border-sky-400/20 shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-emerald-400 flex items-center justify-center font-outfit font-black text-white text-sm">
                    V
                  </div>
                  <span className="font-outfit font-bold text-white text-base">
                    Vijay<span className="text-sky-400">.</span>
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {NAV.map(({ label, href }) => {
                  const isActive = active === href.slice(1);
                  return (
                    <button
                      key={href}
                      onClick={() => go(href)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-sky-400/15 text-sky-300 font-semibold border border-sky-400/30'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                    </button>
                  );
                })}

                {/* Mobile QA Audit Trigger */}
                {onOpenInspector && (
                  <button
                    onClick={() => {
                      setOpen(false);
                      onOpenInspector();
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-mono font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center gap-2 mt-4 cursor-pointer"
                  >
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span>Run QA Environment Audit</span>
                  </button>
                )}
              </nav>

              {/* Drawer Footer with Resume Button */}
              <div className="p-5 border-t border-white/10 bg-[#030712]/50">
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="w-full h-11 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
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
