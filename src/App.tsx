import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AITestingAndCICD from './components/AITestingAndCICD';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Workflow from './components/Workflow';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import QAInspectorModal from './components/QAInspectorModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [inspectorOpen, setInspectorOpen] = useState(false);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#020817] text-slate-100 overflow-x-hidden selection:bg-sky-500/30 selection:text-white">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Custom Desktop Cursor (Disabled on touch) */}
      <CustomCursor />

      {/* Initial QA Diagnostic Preloader */}
      {loading && <Preloader onDone={() => setLoading(false)} />}

      {/* Main Navbar */}
      <Navbar onOpenInspector={() => setInspectorOpen(true)} />

      <main id="main-content">
        <Hero onOpenInspector={() => setInspectorOpen(true)} />
        <About />
        <AITestingAndCICD />
        <Skills />
        <Experience />
        <Projects />
        <Workflow />
        <Certifications />
        <Education />
        <Contact />
      </main>

      <Footer />
      <BackToTop />

      {/* Interactive QA Inspector Modal */}
      <QAInspectorModal
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
      />
    </div>
  );
}
