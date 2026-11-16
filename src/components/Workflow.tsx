import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testingWorkflow } from '../data/portfolioData';
import { SectionHeader } from './About';

export default function Workflow() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section
      id="workflow"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%), #020817',
      }}
    >
      {/* Ambient lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="// testing lifecycle"
          title={<>From Bug to <span className="gradient-text">Quality</span></>}
          subtitle="An interactive visualization of the software testing lifecycle. Click any stage to explore."
        />

        {/* Desktop horizontal flow */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between relative mb-8">
            {/* Connecting line */}
            <div className="absolute top-[28px] left-[40px] right-[40px] h-0.5 bg-gradient-to-r from-sky-400/20 via-cyan-400/40 to-sky-400/20 z-0" />
            {/* Animated pulse on line */}
            <div className="absolute top-[27px] left-[40px] right-[40px] h-0.5 overflow-hidden z-0">
              <motion.div
                className="h-full w-16 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
                animate={{ x: ['calc(-100%)', 'calc(100vw)'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              />
            </div>

            {testingWorkflow.map((stage, i) => (
              <motion.button
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setActiveStage(activeStage === i ? null : i)}
                className="relative z-10 flex flex-col items-center gap-2 group"
                aria-label={`Stage: ${stage.stage}`}
              >
                {/* Node */}
                <div
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-xl transition-all duration-300 ${
                    activeStage === i
                      ? 'scale-110 shadow-lg'
                      : 'group-hover:scale-105'
                  }`}
                  style={{
                    background:
                      activeStage === i ? stage.color + '25' : 'rgba(2,8,23,0.9)',
                    borderColor:
                      activeStage === i ? stage.color : stage.color + '40',
                    boxShadow:
                      activeStage === i
                        ? `0 0 20px ${stage.color}60, 0 0 40px ${stage.color}20`
                        : 'none',
                  }}
                >
                  {stage.icon}
                </div>

                {/* Stage number */}
                <div
                  className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{
                    background: stage.color + '15',
                    color: stage.color,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Label */}
                <span
                  className="text-[11px] font-medium text-center max-w-[80px] leading-tight transition-colors"
                  style={{ color: activeStage === i ? stage.color : '#94a3b8' }}
                >
                  {stage.stage}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Expanded description */}
          <AnimatePresence mode="wait">
            {activeStage !== null && (
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 mt-2"
                style={{ borderColor: testingWorkflow[activeStage].color + '30' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{testingWorkflow[activeStage].icon}</span>
                  <h3 className="font-outfit font-bold text-white text-lg">
                    {testingWorkflow[activeStage].stage}
                  </h3>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      background: testingWorkflow[activeStage].color + '15',
                      color: testingWorkflow[activeStage].color,
                    }}
                  >
                    Stage {activeStage + 1}/{testingWorkflow.length}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{testingWorkflow[activeStage].description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile vertical list */}
        <div className="lg:hidden space-y-3">
          {testingWorkflow.map((stage, i) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <button
                onClick={() => setActiveStage(activeStage === i ? null : i)}
                className="w-full glass-card p-4 flex items-center gap-4 hover:border-sky-400/30 transition-all"
                style={activeStage === i ? { borderColor: stage.color + '40' } : {}}
              >
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    borderColor: activeStage === i ? stage.color : stage.color + '40',
                    background: activeStage === i ? stage.color + '20' : 'transparent',
                    boxShadow: activeStage === i ? `0 0 12px ${stage.color}50` : 'none',
                  }}
                >
                  {stage.icon}
                </div>
                <div className="text-left flex-1">
                  <div className="text-white font-semibold text-sm">{stage.stage}</div>
                  <div className="text-slate-500 text-xs font-mono">Step {i + 1}</div>
                </div>
                <div
                  className="text-xl transition-transform"
                  style={{ transform: activeStage === i ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  ›
                </div>
              </button>

              <AnimatePresence>
                {activeStage === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="glass-card p-4 mt-1 text-slate-300 text-sm leading-relaxed"
                      style={{ borderColor: stage.color + '25' }}
                    >
                      {stage.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {!activeStage && activeStage !== 0 && (
          <p className="text-center text-slate-500 text-sm mt-6 font-mono">
            ↑ Click any stage node to explore the testing activity
          </p>
        )}
      </div>
    </section>
  );
}
