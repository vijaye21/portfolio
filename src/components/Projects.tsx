import type { CSSProperties } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { SectionHeader } from './About';

type Project = typeof projects[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: project.color + '30' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: project.color + '15' }}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="font-outfit font-bold text-white text-xl">{project.title}</h3>
              <p className="text-sm font-medium" style={{ color: project.color }}>{project.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-mono mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          {project.status}
        </div>

        <div className="space-y-5">
          <div>
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Description</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
          </div>
          <div>
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Testing Objective</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{project.objective}</p>
          </div>
          <div>
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Approach</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{project.approach}</p>
          </div>
          <div>
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-3">Tools Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="skill-tag text-xs"
                  style={{ borderColor: project.color + '30', color: project.color + 'cc' }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="section-padding relative"
      style={{ background: 'radial-gradient(ellipse 70% 40% at 70% 50%, rgba(6,182,212,0.04) 0%, transparent 60%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="// projects & case studies"
          title={<>Testing <span className="gradient-text">Case Studies</span></>}
          subtitle="Explore the types of testing I have performed during my internship. Click any card for detailed methodology."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelected(project)}
              className="glass-card p-6 cursor-pointer group hover:scale-[1.03] transition-all duration-300 relative overflow-hidden"
              style={{ '--hover-color': project.color } as CSSProperties}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(project)}
            >
              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${project.color}08, transparent 60%)` }}
              />

              {/* Top border accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                  style={{ background: project.color + '15' }}
                >
                  {project.icon}
                </div>

                {/* Category pill */}
                <span
                  className="text-xs font-mono font-medium px-2 py-0.5 rounded-md mb-3 inline-block"
                  style={{ background: project.color + '15', color: project.color + 'cc' }}
                >
                  {project.category}
                </span>

                <h3 className="font-outfit font-bold text-white text-lg mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="text-[11px] font-mono px-2 py-0.5 rounded border"
                      style={{ borderColor: project.color + '25', color: project.color + 'aa' }}
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="text-[11px] text-slate-500 font-mono">+{project.tools.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color: project.color }}>
                  <ExternalLink size={13} />
                  View Details
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
