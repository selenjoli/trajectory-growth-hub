import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, PenLine } from "lucide-react";

interface FloatingButtonsProps {
  /** CSS color for the scroll-to-top arrow (defaults to accent green) */
  arrowColor?: string;
}

const FloatingButtons = ({ arrowColor = "hsl(var(--accent))" }: FloatingButtonsProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3 md:bottom-8 md:right-8"
        >
          {/* Write / contact button */}
          <a
            href="#forma"
            className="btn-gold flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg hover:scale-105 transition-transform"
            aria-label="Написать нам"
          >
            <PenLine className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.2} />
          </a>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg hover:scale-105 transition-transform"
            aria-label="Наверх"
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6" style={{ color: arrowColor }} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingButtons;
