import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/* ── Shared SectionHeader (exported for reuse) ── */
export function SectionHeader({
  label, title, subtitle,
}: { label: string; title: ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="eyebrow mb-3"
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
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
          className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-4"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ── Stat card ── */
function Stat({ icon: Icon, value, label, sub, color }: {
  icon: typeof Briefcase; value: string; label: string; sub: string; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="glass p-5 group tilt-card"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
        style={{ background: `${color}18` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div className="font-outfit font-black text-2xl text-white mb-0.5">{value}</div>
      <div className="text-sm font-semibold mb-0.5" style={{ color }}>{label}</div>
      <div className="text-slate-500 text-xs">{sub}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'radial-gradient(ellipse 80% 50% at 30% 60%, rgba(56,189,248,0.04) 0%, transparent 60%)' }}>
      <div className="container">
        <SectionHeader
          label="// about me"
          title={<>The Mind Behind <span className="grad">the Tests</ span></>}
        />

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Bio — spans 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass p-6 sm:p-8 relative overflow-hidden scanline">
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.07]">
                <div className="w-full h-full border-r-2 border-t-2 border-sky-400 rounded-tr-[20px]" />
              </div>

              {/* Avatar row */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center font-outfit font-black text-white text-2xl shadow-lg shadow-sky-500/30">
                    V
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#030712] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-700" />
                  </div>
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-white">{personalInfo.name}</h3>
                  <p className="text-sky-400 text-sm">{personalInfo.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={11} className="text-slate-500" />
                    <span className="text-slate-500 text-xs">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                {personalInfo.about}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Manual QA',
                  'AI QA (Promptfoo & Ragas)',
                  'GitHub Actions CI/CD',
                  'Docker & Kubernetes',
                  'Selenium',
                  'Postman & Newman',
                  'JMeter & k6',
                  'LambdaTest',
                ].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass p-5 mt-4 relative overflow-hidden"
            >
              <div className="absolute right-4 top-3 text-5xl opacity-5 font-serif leading-none select-none">"</div>
              <p className="text-xs font-mono text-sky-600 mb-2">// testing philosophy</p>
              <p className="text-slate-300 text-sm leading-relaxed italic">
                "Quality is not an act, it is a habit. I don't just find bugs — I prevent them and help teams ship software users can trust."
              </p>
            </motion.div>
          </motion.div>

          {/* Stats grid — spans 2 cols */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
            <Stat icon={Briefcase} value="6 Mo" label="Experience" sub="QA Intern" color="#38bdf8" />
            <Stat icon={Code2} value="30+" label="Tech Skills" sub="Tools & Stacks" color="#a78bfa" />
            <Stat icon={GraduationCap} value="B.E." label="Degree" sub="Computer Science" color="#22d3ee" />
            <Stat icon={MapPin} value="TN" label="Location" sub="Tiruppur, India" color="#34d399" />

            {/* Wide card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2 glass p-5"
            >
              <p className="eyebrow text-[10px] mb-2">Availability</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-slate-300 text-xs font-medium">Open to QA / testing roles</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Full-time', 'Internship', 'Freelance'].map(t => (
                  <span key={t} className="tag text-[10px] px-2 py-0.5 border-emerald-500/25 text-emerald-400 bg-emerald-500/06">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
