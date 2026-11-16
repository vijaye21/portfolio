import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '../data/portfolioData';
import { SectionHeader } from './About';

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="section-padding relative"
      style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 70%, rgba(14,165,233,0.05) 0%, transparent 60%)' }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="// certifications"
          title={<>Credentials & <span className="gradient-text">Achievements</span></>}
          subtitle="Professional certifications validating my testing and development knowledge."
        />

        <div className="grid sm:grid-cols-2 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
            >
              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity"
                style={{
                  background: `radial-gradient(circle, ${cert.color}, transparent)`,
                  filter: 'blur(20px)',
                }}
              />

              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }}
              />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: cert.color + '15' }}
                  >
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-outfit font-bold text-white text-base leading-snug mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm" style={{ color: cert.color }}>
                      {cert.issuer}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">via {cert.platform}</p>
                  </div>
                  <Award size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0 mt-1" />
                </div>

                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:underline"
                    style={{ color: cert.color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={12} />
                    <span>Verify Certificate</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Verified Completion
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
