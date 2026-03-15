import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=800&fit=crop",
    name: "Анна Петрова",
    role: "Родитель",
    text: "Благодаря программам Траектории Роста мой ребёнок не просто улучшил язык — он обрёл уверенность в себе и друзей по всей стране.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=800&fit=crop",
    name: "Мария Иванова",
    role: "Преподаватель",
    text: "Участие в методических семинарах ассоциации полностью изменило мой подход к преподаванию. Это бесценный опыт обмена знаниями.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=800&fit=crop",
    name: "Дмитрий Козлов",
    role: "Руководитель центра",
    text: "Ассоциация дала нам возможность организовывать масштабные туры, которые были бы невозможны для одного центра.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=800&fit=crop",
    name: "Елена Смирнова",
    role: "Родитель",
    text: "Дочь вернулась из поездки совсем другим человеком — более самостоятельной, открытой миру и мотивированной учиться.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=800&fit=crop",
    name: "Ольга Новикова",
    role: "Преподаватель",
    text: "Совместная работа с коллегами из других городов — это вдохновение. Каждая встреча даёт новые идеи для занятий.",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || expandedId !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, expandedId, nextSlide]);

  return (
    <section className="px-3">
      <div className="bg-muted rounded-[2rem] py-20 px-6 md:px-16">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-4">
              Отзывы
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-xl">
              Что говорят участники, родители и преподаватели о программах ассоциации.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div
              className="relative h-[480px] md:h-[520px] cursor-pointer"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => {
                setIsPaused(false);
                setExpandedId(null);
              }}
            >
              <AnimatePresence>
                {testimonials.map((item, i) => {
                  const offset =
                    (i - currentIndex + testimonials.length) %
                    testimonials.length;
                  if (offset > 4) return null;
                  const isExpanded = expandedId === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      animate={{
                        opacity: isExpanded
                          ? 1
                          : offset === 0
                          ? 1
                          : 0.6 - offset * 0.12,
                        scale: isExpanded ? 1.05 : 1 - offset * 0.04,
                        y: isExpanded ? -10 : offset * 18,
                        x: isExpanded ? 0 : offset * 10,
                        zIndex: isExpanded
                          ? 100
                          : testimonials.length - offset,
                        rotateZ: isExpanded ? 0 : offset * -1.5,
                      }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                      onClick={() =>
                        offset === 0 &&
                        setExpandedId(isExpanded ? null : item.id)
                      }
                    >
                      <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-2xl group">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

                        {/* Text content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                          <motion.div
                            animate={{
                              opacity: offset === 0 ? 1 : 0,
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-2">
                              {item.role}
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-3">
                              {item.name}
                            </h3>
                            <motion.p
                              className="text-primary-foreground/80 text-sm md:text-base leading-relaxed"
                              animate={{
                                maxHeight: isExpanded ? 200 : 48,
                              }}
                              transition={{ duration: 0.5 }}
                              style={{ overflow: "hidden" }}
                            >
                              {item.text}
                            </motion.p>
                            {offset === 0 && !isExpanded && (
                              <p className="text-accent text-xs mt-2 font-medium">
                                Нажмите, чтобы прочитать →
                              </p>
                            )}
                          </motion.div>
                        </div>
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
