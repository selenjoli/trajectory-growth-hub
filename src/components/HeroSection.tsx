import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="px-3 md:px-6 xl:px-10">
      <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
        <img
          src={heroBg}
          alt="Образовательный центр — дети за совместной работой"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
              Ассоциация центров дополнительного образования
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-primary-foreground leading-[0.9] mb-8 max-w-4xl"
          >
            <span className="relative inline-block">
              Траектория
              <span className="absolute -right-1 -top-5 sm:-top-6 md:-top-8 bg-accent text-accent-foreground text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                с 2021 года
              </span>
            </span>
            <br />
            <span className="text-accent">Роста</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
          >
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-lg font-normal normal-case leading-relaxed">
              Мы объединяем образовательные центры из разных городов России, чтобы вместе давать детям, учителям и руководителям то, что в одиночку недостижимо.
            </p>
            <a
              href="#activities"
              className="inline-block bg-action text-action-foreground font-bold uppercase px-8 py-4 rounded-2xl hover:brightness-110 transition-all text-sm tracking-widest shrink-0"
            >
              Узнать больше ↓
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
