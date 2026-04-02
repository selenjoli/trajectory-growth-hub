import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const ImageLightbox = ({ images, initialIndex, onClose }: ImageLightboxProps) => {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl leading-none z-10 transition-colors"
        onClick={onClose}
        aria-label="Закрыть"
      >
        ×
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums select-none">
          {index + 1} / {images.length}
        </div>
      )}

      {/* Left click zone */}
      {images.length > 1 && (
        <button
          className="absolute left-0 top-0 h-full w-1/4 z-10 cursor-w-resize"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Предыдущая"
        />
      )}

      {/* Right click zone */}
      {images.length > 1 && (
        <button
          className="absolute right-0 top-0 h-full w-1/4 z-10 cursor-e-resize"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Следующая"
        />
      )}

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={index}
            src={images[index]}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl select-none"
            draggable={false}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ImageLightbox;
