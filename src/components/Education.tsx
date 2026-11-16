import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '../data/portfolioData';
import { SectionHeader } from './About';

const levelColors: Record<string, string> = {
  undergraduate: '#0ea5e9',
  hsc: '#8b5cf6',
  sslc: '#06b6d4',
};

export default function Education() {
  return (
    <section
      id="education"
      className="section-padding relative"
      style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)' }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="// education"
          title={<>Academic <span className="gradient-text">Background</span></>}
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 top-4 bottom-4 w-px timeline-line hidden sm:block" />

          {education.map((edu, i) => {
            const color = levelColors[edu.level] || '#0ea5e9';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative sm:pl-20 mb-6"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-5 top-6 hidden sm:block">
                  <div
                    className="w-6 h-6 rounded-full border-2 bg-[#020817] flex items-center justify-center"
                    style={{ borderColor: color }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                    />
                  </div>
                </div>

                <div
                  className="glass-card p-5 sm:p-6 hover:border-sky-400/25 transition-all duration-300 group"
                  style={{ '--color': color } as CSSProperties}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: color + '15' }}
                    >
                      <GraduationCap size={20} style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-outfit font-bold text-white text-base sm:text-lg leading-snug mb-1">
                        {edu.degree}
                      </h3>
                      <p className="font-medium text-sm mb-2" style={{ color }}>
                        {edu.institution}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-slate-400 text-sm">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} style={{ color: color + '80' }} />
                          {edu.period}
                        </span>
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded font-medium"
                          style={{ background: color + '15', color: color + 'cc' }}
                        >
                          {edu.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
