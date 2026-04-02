import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    id: 1,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+1",
    name: "Анна Петрова",
    role: "Родитель",
  },
  {
    id: 2,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+2",
    name: "Мария Иванова",
    role: "Преподаватель",
  },
  {
    id: 3,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+3",
    name: "Дмитрий Козлов",
    role: "Руководитель центра",
  },
  {
    id: 4,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+4",
    name: "Елена Смирнова",
    role: "Родитель",
  },
  {
    id: 5,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+5",
    name: "Ольга Новикова",
    role: "Преподаватель",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || zoomed !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide]);

  return (
    <section className="px-3 md:px-6 xl:px-10">
      <div className="bg-accent rounded-[2rem] py-20 px-6 md:px-16">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-accent-foreground mb-4">
              Отзывы
            </h2>
            <p className="text-accent-foreground/70 text-lg mb-12 max-w-xl">
              Что говорят участники, родители и преподаватели о программах ассоциации.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div
              className="relative mx-auto w-[320px] md:w-[380px] h-[400px] md:h-[475px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => {
                setIsPaused(false);
                setZoomed(null);
              }}
            >
              <AnimatePresence>
                {testimonials.map((item, i) => {
                  const offset =
                    (i - currentIndex + testimonials.length) %
                    testimonials.length;
                  if (offset > 4) return null;
                  const isZoomed = zoomed === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      animate={{
                        opacity: isZoomed
                          ? 1
                          : offset === 0
                          ? 1
                          : 0.55 - offset * 0.1,
                        scale: isZoomed ? 1.08 : 1 - offset * 0.045,
                        y: isZoomed ? -8 : offset * 18,
                        x: isZoomed ? 0 : offset * 10,
                        zIndex: isZoomed ? 100 : testimonials.length - offset,
                        rotateZ: isZoomed ? 0 : offset * -2,
                      }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 cursor-pointer"
                      onClick={() =>
                        offset === 0 && setZoomed(isZoomed ? null : item.id)
                      }
                    >
                      <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl bg-background">
                        <img
                          src={item.image}
                          alt={`Отзыв ${item.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
