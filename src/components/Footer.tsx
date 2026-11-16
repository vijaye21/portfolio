import { motion } from 'framer-motion';
import { Mail, Code2, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'AI & CI/CD', href: '#ai-cicd' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socials = [
    { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn', id: 'footer-linkedin' },
    { icon: GithubIcon, href: personalInfo.github, label: 'GitHub', id: 'footer-github' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email', id: 'footer-email' },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#020817] relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #0ea5e9, transparent)', filter: 'blur(40px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="font-outfit font-bold text-white text-lg">
                Vijay<span className="text-sky-400">.</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">
              QA Engineer passionate about building reliable, user-friendly software through rigorous testing.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-500 text-sm hover:text-sky-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              {socials.map(({ icon: Icon, href, label, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 glass-card rounded-xl hover:border-sky-400/40 hover:bg-sky-400/10 transition-all group"
                >
                  <Icon size={16} className="text-slate-400 group-hover:text-sky-400 transition-colors" />
                </a>
              ))}
            </div>
            <p className="text-slate-600 text-xs">{personalInfo.email}</p>
            <p className="text-slate-600 text-xs mt-1">{personalInfo.location}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs text-center">
            © {currentYear} {personalInfo.name} · {personalInfo.title}
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            Built with <Heart size={11} className="text-sky-400" /> using React, Three.js &amp; Framer Motion
          </p>

          {/* Rotating wireframe symbol */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-sky-400/30 text-lg select-none"
            aria-hidden="true"
          >
            ✦
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
