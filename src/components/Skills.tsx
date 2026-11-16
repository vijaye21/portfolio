import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { skills } from '../data/portfolioData';
import { SectionHeader } from './About';

const SPECIAL_TOOLS = new Set([
  'Promptfoo (LLM & Prompt Eval)',
  'Ragas (RAG Metrics)',
  'DeepEval (LLM Unit Tests)',
  'GitHub Actions',
  'Docker',
  'Kubernetes',
]);

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterTabs = ['All', 'AI Testing', 'CI/CD & DevOps', 'Web & Mobile Automation', 'API Testing & Automation', 'Performance Testing'];

  const filteredSkills = useMemo(() => {
    return skills.filter((group) => {
      // Category filter
      const matchesFilter =
        selectedFilter === 'All' ||
        group.category.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        (selectedFilter === 'AI Testing' && group.category.includes('AI')) ||
        (selectedFilter === 'CI/CD & DevOps' && group.category.includes('CI/CD'));

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        group.category.toLowerCase().includes(q) ||
        group.items.some((item) => item.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  const handleToggle = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <section
      id="skills"
      className="section-padding relative"
      style={{
        background:
          'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%), #020817',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="// technical skills"
          title={
            <>
              Tools of the <span className="gradient-text">Quality Trade</span>
            </>
          }
          subtitle="A comprehensive toolkit for ensuring software reliability across web, mobile, API, AI domains, and modern CI/CD infrastructure."
        />

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Quick Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl glass-card w-full md:w-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedFilter === tab
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search tools (e.g. Promptfoo, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-sky-400/50 transition-all font-mono"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skillGroup, i) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => handleToggle(skillGroup.category)}
              className={`glass-card p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden ${
                activeCategory === skillGroup.category
                  ? 'border-sky-400/50 bg-sky-400/10 shadow-lg shadow-sky-500/10'
                  : 'hover:border-sky-400/30'
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleToggle(skillGroup.category)}
              aria-expanded={activeCategory === skillGroup.category}
            >
              {/* Card Header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${skillGroup.color}15` }}
                >
                  {skillGroup.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm leading-snug font-outfit">
                    {skillGroup.category}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">{skillGroup.items.length} tools</p>
                </div>
              </div>

              {/* Items preview */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {skillGroup.items
                  .slice(0, activeCategory === skillGroup.category ? undefined : 3)
                  .map((item) => {
                    const isSpecial = SPECIAL_TOOLS.has(item);
                    return (
                      <span
                        key={item}
                        className={`skill-tag text-xs ${
                          isSpecial ? 'border-emerald-400/40 text-emerald-300 bg-emerald-500/10 font-bold' : ''
                        }`}
                        style={{
                          borderColor: isSpecial ? undefined : `${skillGroup.color}30`,
                          color: isSpecial ? undefined : `${skillGroup.color}dd`,
                        }}
                      >
                        {isSpecial && <Sparkles size={10} className="text-emerald-400 inline" />}
                        {item}
                      </span>
                    );
                  })}
                {activeCategory !== skillGroup.category && skillGroup.items.length > 3 && (
                  <span className="skill-tag text-xs text-slate-500 border-slate-700">
                    +{skillGroup.items.length - 3} more
                  </span>
                )}
              </div>

              {/* Expand / Collapse text indicator */}
              <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: skillGroup.color + 'aa' }}>
                <span className="text-[10px]">
                  {activeCategory === skillGroup.category ? '[-] collapse tools' : '[+] expand all'}
                </span>
              </div>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${skillGroup.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty state when search produces no results */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12 glass-card rounded-2xl">
            <p className="text-slate-400 text-sm font-mono">No matching skills found for "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('All');
              }}
              className="mt-3 text-xs text-sky-400 underline font-mono cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Expanded full list view */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {(() => {
                const group = skills.find((s) => s.category === activeCategory);
                if (!group) return null;
                return (
                  <div className="glass-card p-6 border-sky-400/30">
                    <h3 className="font-outfit font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-xl">{group.icon}</span>
                      {group.category}
                      <span className="text-slate-400 font-normal text-xs font-mono">— complete inventory</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => {
                        const isSpecial = SPECIAL_TOOLS.has(item);
                        return (
                          <span
                            key={item}
                            className={`skill-tag text-xs ${
                              isSpecial
                                ? 'border-emerald-400/50 text-emerald-300 bg-emerald-500/15 font-semibold shadow-sm'
                                : ''
                            }`}
                            style={{
                              borderColor: isSpecial ? undefined : `${group.color}35`,
                              color: isSpecial ? undefined : group.color + 'dd',
                            }}
                          >
                            {isSpecial && <Sparkles size={11} className="text-emerald-400 inline" />}
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
