import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { number: 5, suffix: "", label: "лет работаем вместе" },
  { number: 15, suffix: "", label: "центров из 8 регионов России" },
  { number: 5500, suffix: "+", label: "учеников в школах ежегодно" },
  { number: 350, suffix: "", label: "детей в совместных программах" },
];

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  const formatted = current >= 1000 ? current.toLocaleString("ru-RU") : current;

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="section-padding">
      <div className="fluid-container">
        <AnimatedSection>
          <h2 className="text-4xl md:text-6xl text-foreground mb-14">
            Ассоциация
            <br />
            <span className="text-accent">сегодня</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1}>
              <div className="border-t-2 border-primary pt-6">
                <p className="text-5xl md:text-6xl font-black text-foreground mb-3">
                  <AnimatedNumber target={s.number} suffix={s.suffix} />
                </p>
                <p className="text-sm text-muted-foreground font-normal normal-case leading-snug">
                  {s.label}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
