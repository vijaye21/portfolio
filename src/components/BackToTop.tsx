import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          id="back-to-top"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full glass-card border-sky-400/30 flex items-center justify-center hover:bg-sky-400/20 hover:border-sky-400/60 transition-all group shadow-lg"
        >
          <ArrowUp size={16} className="text-sky-400 group-hover:text-sky-300 transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
