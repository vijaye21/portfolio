import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { experience } from '../data/portfolioData';
import { SectionHeader } from './About';

export default function Experience() {
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <section
      id="experience"
      className="section-padding relative"
      style={{ background: 'radial-gradient(ellipse 70% 40% at 30% 60%, rgba(139,92,246,0.05) 0%, transparent 60%)' }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="// work experience"
          title={<>Professional <span className="gradient-text">Journey</span></>}
          subtitle="Hands-on QA experience spanning manual testing, automation, performance, and AI application testing."
        />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px timeline-line hidden sm:block" />

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative sm:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-4 sm:left-5 top-8 hidden sm:block">
                <div className="w-6 h-6 rounded-full border-2 border-sky-400 bg-[#020817] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse-glow" />
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8 mb-6 hover:border-sky-400/30 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center">
                        <Briefcase size={16} className="text-sky-400" />
                      </div>
                      <h3 className="font-outfit font-bold text-white text-lg">{exp.role}</h3>
                    </div>
                    <p className="text-sky-400 font-semibold text-base mb-2">{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-sky-400/70" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-sky-400/70" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpanded(expanded === i ? -1 : i)}
                    className="flex items-center gap-1.5 text-sky-400 text-sm font-medium hover:text-sky-300 transition-colors self-start sm:self-auto"
                    aria-label={expanded === i ? 'Collapse details' : 'Expand details'}
                  >
                    {expanded === i ? (
                      <><ChevronUp size={16} /> Collapse</>
                    ) : (
                      <><ChevronDown size={16} /> Details</>
                    )}
                  </button>
                </div>

                {/* Tools used */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.tools.map((tool) => (
                    <span key={tool} className="skill-tag text-xs">{tool}</span>
                  ))}
                </div>

                {/* Expandable Responsibilities */}
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-white/5">
                        <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-4">
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-3">
                          {exp.responsibilities.map((resp, j) => (
                            <motion.li
                              key={j}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.05 }}
                              className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
                              {resp}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
