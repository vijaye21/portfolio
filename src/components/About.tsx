import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Code2, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/* ── Shared SectionHeader ── */
export function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="eyebrow mb-2.5"
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-outfit font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-3"
      >
        {title}
      </motion.h2>
      <div className="section-divider" />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ── Stat card with professional labels ── */
function Stat({
  icon: Icon,
  value,
  label,
  sub,
  color,
}: {
  icon: typeof Briefcase;
  value: string;
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="glass-card p-5 group flex flex-col justify-between"
    >
      <div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 transition-transform group-hover:scale-110"
          style={{ background: `${color}18` }}
        >
          <Icon size={19} style={{ color }} />
        </div>
        <div className="font-outfit font-black text-2xl text-white tracking-tight mb-1">{value}</div>
        <div className="text-sm font-semibold text-slate-200 mb-0.5">{label}</div>
      </div>
      <div className="text-slate-500 text-xs mt-2 font-mono">{sub}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="section-padding relative"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 30% 60%, rgba(56,189,248,0.04) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="// about me"
          title={
            <>
              The Mind Behind <span className="gradient-text">the Quality</span>
            </>
          }
          subtitle="A dedicated QA professional bridging exploratory manual rigor, AI evaluation benchmarks, and containerized CI/CD automation."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Bio & Testing Philosophy (7 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Profile Information Card */}
            <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
                <div className="w-full h-full border-r-2 border-t-2 border-sky-400 rounded-tr-2xl" />
              </div>

              {/* Avatar & Identity Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 flex items-center justify-center font-outfit font-black text-white text-2xl shadow-lg shadow-sky-500/25">
                    V
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#020817] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
                  </div>
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-white text-xl">{personalInfo.name}</h3>
                  <p className="text-sky-400 text-sm font-semibold">{personalInfo.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={13} className="text-slate-400" />
                    <span className="text-slate-400 text-xs font-mono">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Bio Narrative */}
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                {personalInfo.about}
              </p>

              {/* Skill Tags */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-[11px] font-mono uppercase text-slate-500 tracking-wider mb-3">
                  Core Competencies
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Manual & Exploratory QA',
                    'AI QA (Promptfoo & Ragas)',
                    'GitHub Actions CI/CD',
                    'Docker & Kubernetes',
                    'Selenium WebDriver',
                    'Postman & Newman',
                    'JMeter & k6 Load Testing',
                    'LambdaTest Cross-Browser',
                  ].map((t) => (
                    <span key={t} className="skill-tag text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Testing Philosophy Card with Generous Spacing */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 relative overflow-hidden"
            >
              <div className="absolute right-6 top-3 text-6xl opacity-5 font-serif select-none pointer-events-none">
                "
              </div>
              <p className="text-xs font-mono text-sky-400 mb-2">// testing philosophy</p>
              <blockquote className="text-slate-200 text-sm sm:text-base leading-relaxed italic">
                "Quality is not an accident—it is a continuous habit of anticipating edge cases, validating boundaries, and automating regression safety nets so teams can ship with unwavering confidence."
              </blockquote>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Statistics & Availability (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* 2x2 Stats Grid with Professional Descriptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Stat
                icon={Briefcase}
                value="6+ Mos"
                label="Hands-on QA"
                sub="Internship & Real-World Projects"
                color="#38bdf8"
              />
              <Stat
                icon={Code2}
                value="30+ Tools"
                label="Technical Stack"
                sub="Manual, Automation & AI QA"
                color="#a78bfa"
              />
              <Stat
                icon={GraduationCap}
                value="B.E. CSE"
                label="Engineering Degree"
                sub="Computer Science & Eng"
                color="#22d3ee"
              />
              <Stat
                icon={MapPin}
                value="India"
                label="Location"
                sub="Tiruppur, Tamil Nadu"
                color="#34d399"
              />
            </div>

            {/* Availability & Opportunity Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="eyebrow text-[10px]">Employment Availability</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              <h4 className="font-outfit font-bold text-white text-base mb-1.5">
                Open to QA Engineer &amp; SDET Roles
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Available for full-time QA roles, test automation engineering, and AI quality assurance positions worldwide.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {['Full-Time', 'Internship', 'Immediate Joiner', 'Hybrid / Remote'].map((badge) => (
                  <span
                    key={badge}
                    className="skill-tag text-[11px] border-emerald-500/30 text-emerald-300 bg-emerald-500/10 font-semibold"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-10 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-sky-400 border border-sky-400/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Initiate Discussion</span>
                <ArrowUpRight size={14} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
