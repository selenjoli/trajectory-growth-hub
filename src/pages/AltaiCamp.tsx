import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";

import heroBg from "@/assets/altai-hero.jpg";
import altaiPatmos from "@/assets/altai-patmos.jpg";
import altaiWaterfall from "@/assets/altai-waterfall.jpg";
import altaiSwimming from "@/assets/altai-swimming.jpg";
import altaiCampfire from "@/assets/altai-campfire.jpg";
import altaiCottages from "@/assets/altai-cottages.jpg";
import altaiWorkshop from "@/assets/altai-workshop.jpg";
import altaiDining from "@/assets/altai-dining.jpg";
import altaiMap from "@/assets/altai-map.png";
import altaiMorning from "@/assets/altai-morning.jpg";
import altaiDay from "@/assets/altai-day.jpg";
import altaiEvening from "@/assets/altai-evening.jpg";
import altaiNight from "@/assets/altai-night.jpg";
import illustUae from "@/assets/illust-uae.svg";
import illustChina from "@/assets/illust-china.png";
import illustSea from "@/assets/illust-sea.png";
import illustHilderstone from "@/assets/illust-hilderstone-uk.png";

/* ─── data ─── */

const natureSpots = [
  {
    name: "Остров Патмос",
    subtitle: "скальный остров на\u00a0реке Катунь",
    image: altaiPatmos,
    text: "Скальный остров посреди реки Катунь с деревянным подвесным мостом — одно из самых красивых мест Алтая. Дети описывают его одним словом: нереально.",
  },
  {
    name: "Камышлинский водопад",
    subtitle: "поход через лес",
    image: altaiWaterfall,
    text: "Поход через лес к шумящему водопаду — первое настоящее приключение смены.",
  },
  {
    name: "Купание",
    subtitle: "горное озеро и бассейн",
    image: altaiSwimming,
    text: "Горное озеро и бассейн — ежедневно, под присмотром инструкторов.",
  },
  {
    name: "Вечерние костры",
    subtitle: "гитара и звёздное небо",
    image: altaiCampfire,
    text: "Гитара, разговоры, звёздное небо над Алтаем. Именно это дети вспоминают в первую очередь.",
  },
];

const daySchedule = [
  {
    time: "Утро",
    text: "Завтрак, зарядка, первый блок английского — игровой формат, командные задачи.",
    image: altaiMorning,
    bg: "from-amber-100 to-green-50",
  },
  {
    time: "День",
    text: "Мастер-классы, творческие студии, спортивные игры или экскурсия.",
    image: altaiDay,
    bg: "from-sky-100 to-green-50",
  },
  {
    time: "Вечер",
    text: "Квест, дискотека под открытым небом или «свечи» — вечерний круг, где каждый говорит о своём дне.",
    image: altaiEvening,
    bg: "from-orange-100 to-purple-50",
  },
  {
    time: "Ночь",
    text: "Костёр по расписанию, разговоры, тишина гор.",
    image: altaiNight,
    bg: "from-indigo-100 to-slate-100",
  },
];

const testimonials = [
  { id: 1, image: "https://placehold.co/400x700/2E8B57/ffffff?text=Отзыв+1", name: "Тимур, 16 лет, Уфа", role: "Участник лагеря" },
  { id: 2, image: "https://placehold.co/400x700/2E8B57/ffffff?text=Отзыв+2", name: "Светлана, Пермь", role: "мама Егора (14 лет)" },
  { id: 3, image: "https://placehold.co/400x700/2E8B57/ffffff?text=Отзыв+3", name: "Анна, Новосибирск", role: "Родитель" },
];

const otherPrograms = [
  { title: "Дубай", illustration: illustUae, illustClass: "h-24 w-auto", dates: "даты уточняются", price: "от 145 000 ₽", href: "/kanikuly/uae" },
  { title: "Китай", illustration: illustChina, illustClass: "h-24 w-auto", dates: "3–12 июня", price: "от 165 000 ₽", href: "/kanikuly/china" },
  { title: "Море", illustration: illustSea, illustClass: "h-24 w-auto", dates: "23 июня — 15 июля", price: "от 134 000 ₽", href: "/kanikuly/more" },
];

/* ─── page ─── */

/* ─── hook: pause carousels when off-screen ─── */

function useVisibilityPause(setPaused: (v: boolean) => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [setPaused]);
  return ref;
}

/* ─── page ─── */

const AltaiCamp = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [hookSlide, setHookSlide] = useState(0);
  const [hookPaused, setHookPaused] = useState(false);
  const [currentSpot, setCurrentSpot] = useState(0);
  const [spotPaused, setSpotPaused] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [dayPaused, setDayPaused] = useState(false);
  const [dayUserPaused, setDayUserPaused] = useState(false);

  const hookPhotos = [altaiPatmos, altaiWaterfall, altaiSwimming, altaiCampfire, altaiWorkshop];

  const dayRef = useVisibilityPause(setDayPaused);
  const spotRef = useVisibilityPause(setSpotPaused);

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || zoomed !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide]);

  useEffect(() => {
    if (hookPaused) return;
    const interval = setInterval(() => {
      setHookSlide((prev) => (prev + 1) % hookPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [hookPaused, hookPhotos.length]);

  // Nature spots auto-rotation (6s like China)
  useEffect(() => {
    if (spotPaused) return;
    const interval = setInterval(() => {
      setCurrentSpot((prev) => (prev + 1) % natureSpots.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [spotPaused]);

  // Day schedule auto-rotation (10s)
  useEffect(() => {
    if (dayPaused || dayUserPaused) return;
    const interval = setInterval(() => {
      setCurrentDay((prev) => (prev + 1) % daySchedule.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [dayPaused, dayUserPaused]);

  return (
    <main className="bg-program-altai">
      <Header variant="light" />

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10 pt-20 lg:pt-0">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img src={heroBg} alt="Дети в горах Алтая" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm md:text-base font-semibold uppercase tracking-wider px-5 py-2 rounded-full mb-6"
            >
              Языковой лагерь · Горный Алтай
            </motion.span>

            {/* Title wrapper — w-fit so date chip aligns to its right edge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-fit mb-4"
            >
              <div className="flex justify-end mb-3">
                <span className="inline-block bg-program-altai text-white text-sm md:text-base font-bold uppercase tracking-wider px-5 py-2 rounded-full">
                  10–25 июля 2026
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95]">
                <span className="text-program-altai">Алтай:</span> здесь английский
                <br />
                становится частью приключения
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-white/85 max-w-2xl font-normal normal-case leading-relaxed mb-8"
            >
              15 дней в горах, где язык учат не по учебнику — а в квестах, у костра и в разговорах с новыми друзьями со всей России. Для детей и подростков 10–17 лет.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {["15 дней", "10–17 лет"].map((chip) => (
                <span key={chip} className="bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full">
                  {chip}
                </span>
              ))}
            </motion.div>
            <motion.a
              href="#forma"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="inline-block btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest"
            >
              Записаться — от 95 000 ₽
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── Hook — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-6">
                При чём здесь <span className="text-program-altai">Алтай и английский?</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-1/2 space-y-6">
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Выучить английский в классе — можно. Заговорить по-настоящему — только когда это нужно, когда интересно, когда вокруг люди и нет времени бояться ошибиться.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    На Алтае именно такая среда. Английский здесь — язык на котором проходит квест, объясняют правила игры, спрашивают как дела вечером у костра и ждут настоящего ответа.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Горы делают своё дело: ребята быстро открываются, быстро дружат и быстро перестают бояться говорить. Алтай — не фон для лагеря, а часть программы.
                  </p>
                </div>

                {/* Stacked photo carousel */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                  <div
                    className="relative w-full h-[460px]"
                    onMouseEnter={() => setHookPaused(true)}
                    onMouseLeave={() => setHookPaused(false)}
                  >
                    <AnimatePresence>
                      {hookPhotos.map((photo, i) => {
                        const offset = (i - hookSlide + hookPhotos.length) % hookPhotos.length;
                        if (offset > 3) return null;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{
                              opacity: offset === 0 ? 1 : 0.55 - offset * 0.12,
                              scale: 1 - offset * 0.05,
                              y: offset * 16,
                              x: offset * 8,
                              zIndex: hookPhotos.length - offset,
                              rotateZ: offset * -2,
                            }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                          >
                            <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl">
                              <img src={photo} alt="Алтай" className="w-full h-full object-cover" />
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Nature spots — map background with carousel (like China) ── */}
      <section className="section-padding overflow-hidden">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-white mb-4">
              Алтай, который <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">запоминается</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-14 max-w-2xl font-normal normal-case">
              Природа здесь — не фон, а главный герой. Каждый день — новое место, новые впечатления.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div
              className="relative"
              onMouseEnter={() => setSpotPaused(true)}
              onMouseLeave={() => setSpotPaused(false)}
            >
              {/* Map as background — desktop only */}
              <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-10 w-[65%] pointer-events-none">
                <img src={altaiMap} alt="Карта Алтая" className="w-full h-auto rounded-[1.5rem] opacity-80" />
              </div>

              <div className="relative z-10 flex items-center gap-8">
                {/* Carousel card */}
                <div className="w-full lg:w-[55%] shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSpot}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white/10 backdrop-blur-sm rounded-[1.5rem] overflow-hidden"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={natureSpots[currentSpot].image} alt={natureSpots[currentSpot].name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 md:p-8">
                        <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{natureSpots[currentSpot].subtitle}</p>
                        <h3 className="text-xl md:text-2xl text-white mb-3">{natureSpots[currentSpot].name}</h3>
                        <p className="text-sm md:text-base text-white/80 font-normal normal-case leading-relaxed">{natureSpots[currentSpot].text}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Arrows — to the right of the card (desktop) */}
                <div className="hidden lg:flex flex-col gap-4">
                  <button
                    onClick={() => setCurrentSpot((prev) => (prev - 1 + natureSpots.length) % natureSpots.length)}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ArrowLeft className="w-5 h-5 text-program-altai" />
                  </button>
                  <button
                    onClick={() => setCurrentSpot((prev) => (prev + 1) % natureSpots.length)}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5 text-program-altai" />
                  </button>
                </div>
              </div>

              {/* Mobile arrows */}
              <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentSpot((prev) => (prev - 1 + natureSpots.length) % natureSpots.length)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <ArrowLeft className="w-4 h-4 text-program-altai" />
                </button>
                <button
                  onClick={() => setCurrentSpot((prev) => (prev + 1) % natureSpots.length)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <ArrowRight className="w-4 h-4 text-program-altai" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Day schedule — time-of-day carousel with watercolor illustrations ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <AnimatedSection>
          <motion.div
            className="rounded-[2rem] overflow-hidden transition-colors duration-1000"
            animate={{
              background: currentDay === 0
                ? "linear-gradient(to bottom, #fef3c7, #f0fdf4)"
                : currentDay === 1
                ? "linear-gradient(to bottom, #e0f2fe, #f0fdf4)"
                : currentDay === 2
                ? "linear-gradient(to bottom, #ffedd5, #faf5ff)"
                : "linear-gradient(to bottom, #e0e7ff, #f1f5f9)",
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Watercolor illustration */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full aspect-[2.5/1] overflow-hidden"
                >
                  <img
                    src={daySchedule[currentDay].image}
                    alt={daySchedule[currentDay].time}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Time title overlapping the illustration */}
              <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 translate-y-1/2">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={currentDay}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  >
                    {daySchedule[currentDay].time}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>

            {/* Text content below */}
            <div className="px-6 md:px-16 pt-14 md:pt-16 pb-10 md:pb-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDay}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-2xl md:text-3xl text-foreground mb-2">
                    День в лагере — <span className="text-program-altai">как это выглядит</span>
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground font-normal normal-case leading-relaxed max-w-2xl mb-2">
                    {daySchedule[currentDay].text}
                  </p>
                  {currentDay === daySchedule.length - 1 && (
                    <p className="text-muted-foreground text-base font-normal normal-case leading-relaxed italic mt-4">
                      Каждую неделю — репетиция финального выступления, которое дети готовят сами.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Arrows centered below text */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => {
                    setCurrentDay((prev) => (prev - 1 + daySchedule.length) % daySchedule.length);
                    setDayPaused(true);
                    setTimeout(() => setDayPaused(false), 10000);
                  }}
                  className="w-12 h-12 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                {/* Dots */}
                <div className="flex gap-2">
                  {daySchedule.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentDay(i);
                        setDayPaused(true);
                        setTimeout(() => setDayPaused(false), 10000);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentDay ? "bg-program-altai scale-125" : "bg-foreground/20"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    setCurrentDay((prev) => (prev + 1) % daySchedule.length);
                    setDayPaused(true);
                    setTimeout(() => setDayPaused(false), 10000);
                  }}
                  className="w-12 h-12 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <ArrowRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ── Facilities — green bg with photo cards ── */}
      <section className="section-padding overflow-hidden">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-white mb-6">
              Где живут и <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">что едят</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
              <div>
                <p className="text-white/85 text-base md:text-lg font-normal normal-case leading-relaxed">
                  Уютные деревянные коттеджи у подножья гор — комнаты на 5 человек, все удобства. 5-разовое питание, трансфер от аэропорта и обратно, круглосуточный медпункт и сопровождающий педагог на всём протяжении смены.
                </p>
              </div>
              <div>
                <div className="rounded-[1.5rem] overflow-hidden aspect-[16/10]">
                  <img src={altaiCottages} alt="Коттеджи на Алтае" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { image: altaiCottages, text: "Деревянные коттеджи, комнаты на 5 человек" },
                { image: altaiDining, text: "5-разовое питание" },
                { image: altaiSwimming, text: "Трансфер от аэропорта и обратно" },
                { image: altaiWorkshop, text: "Круглосуточный медпункт" },
                { image: altaiCampfire, text: "Сопровождающий педагог 24/7" },
                { image: altaiPatmos, text: "Охраняемая территория" },
              ].map((f, i) => (
                <div key={i} className="rounded-xl overflow-hidden relative aspect-square">
                  <img src={f.image} alt={f.text} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-program-altai/75 backdrop-blur-sm px-4 py-3 h-[4.5rem] flex items-center">
                    <p className="text-white text-sm md:text-base font-bold uppercase tracking-wide leading-snug">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Price — receipt style with side photos ── */}
      <section className="py-20 px-3 md:px-6 xl:px-10">
        <div className="fluid-container">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6">
              <div className="hidden lg:block">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={altaiWorkshop} alt="Фото из лагеря" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] w-full px-8 py-10 shadow-2xl">
                <div className="text-center border-b-2 border-dashed border-foreground/20 pb-6 mb-6">
                  <h2 className="text-2xl md:text-3xl text-foreground mb-1">Стоимость смены</h2>
                  <p className="text-sm text-muted-foreground font-normal normal-case">Лагерь «Алтай» · 10–25 июля 2026</p>
                </div>
                <div className="space-y-4 mb-8">
                  {[
                    "Проживание в коттеджах",
                    "5-разовое питание",
                    "Английский в игровом формате",
                    "Экскурсии и мероприятия",
                    "Купание ежедневно",
                    "Сопровождающий от ассоциации 24/7",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full border-2 border-program-altai bg-program-altai/10 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-program-altai" />
                      </span>
                      <p className="text-foreground text-base font-normal normal-case leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-dashed border-foreground/20 pt-6">
                  <div className="flex items-end justify-between">
                    <span className="text-muted-foreground text-sm font-normal normal-case">Стоимость</span>
                    <span className="text-3xl md:text-4xl font-bold text-foreground">от 95 000 ₽</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-4 font-normal normal-case leading-relaxed mb-6">
                  Трансфер до лагеря оплачивается отдельно. Возможна рассрочка.
                </p>
                <a
                  href="#forma"
                  className="block w-full text-center btn-gold px-6 py-4 rounded-2xl text-sm tracking-widest"
                >
                  Записаться
                </a>
              </div>

              <div className="hidden lg:block">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={altaiCampfire} alt="Фото из лагеря" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Testimonials — pale yellow block ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-testimonial-yellow rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-4">
                Что говорят <span className="text-program-altai">участники</span>
              </h2>
              <p className="text-foreground/60 text-base md:text-lg mb-12 max-w-xl font-normal normal-case">
                Отзывы родителей и детей о наших сменах.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div
                className="relative mx-auto w-[280px] md:w-[340px] h-[560px] md:h-[640px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => { setIsPaused(false); setZoomed(null); }}
              >
                <AnimatePresence>
                  {testimonials.map((item, i) => {
                    const offset = (i - currentTestimonial + testimonials.length) % testimonials.length;
                    if (offset > 4) return null;
                    const isZoomed = zoomed === item.id;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{
                          opacity: isZoomed ? 1 : offset === 0 ? 1 : 0.55 - offset * 0.1,
                          scale: isZoomed ? 1.08 : 1 - offset * 0.045,
                          y: isZoomed ? -8 : offset * 18,
                          x: isZoomed ? 0 : offset * 10,
                          zIndex: isZoomed ? 100 : testimonials.length - offset,
                          rotateZ: isZoomed ? 0 : offset * -2,
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => offset === 0 && setZoomed(isZoomed ? null : item.id)}
                      >
                        <div className="w-full h-full flex flex-col">
                          <div className="flex-1 rounded-[1.2rem] overflow-hidden shadow-2xl bg-background">
                            <img src={item.image} alt={`Отзыв от ${item.name}`} className="w-full h-full object-cover" />
                          </div>
                          <motion.div
                            className="mt-4 text-center"
                            animate={{ opacity: offset === 0 ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-foreground font-bold text-base">{item.name}</p>
                            <p className="text-foreground/60 text-sm">{item.role}</p>
                          </motion.div>
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

      {/* ── Other programs — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 mb-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-14">
                Посмотрите <span className="text-program-altai">ещё</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {otherPrograms.map((p, i) => (
                <AnimatedSection key={p.title} delay={i * 0.08}>
                  <a
                    href={p.href}
                    className="group block rounded-[1.5rem] border border-border hover:border-program-altai/30 p-8 transition-all duration-500 hover:shadow-lg bg-card h-full text-center"
                  >
                    <img src={p.illustration} alt={p.title} className={`${p.illustClass} mx-auto mb-4 object-contain`} />
                    <h3 className="text-lg md:text-xl text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground font-normal normal-case mb-2">{p.dates}</p>
                    <p className="text-base font-bold text-foreground mb-4">{p.price}</p>
                    <span className="inline-block btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest">
                      Подробнее →
                    </span>
                  </a>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.3}>
              <a
                href="/kanikuly/online"
                className="group block rounded-[1.5rem] border border-border hover:border-program-altai/30 p-8 transition-all duration-500 hover:shadow-lg bg-card"
              >
                <div className="flex items-center gap-6">
                  <img src={illustHilderstone} alt="Hilderstone College" className="h-28 w-auto object-contain shrink-0" />
                  <div>
                    <h3 className="text-lg md:text-xl text-foreground mb-2">
                      Онлайн языковая практика с Hilderstone College
                    </h3>
                    <p className="text-sm text-muted-foreground font-normal normal-case leading-relaxed mb-4">
                      Хотите подготовить ребёнка к лагерю заранее — или провести лето с пользой, если поездка не получается? Британский преподаватель, группа до 12 человек, официальный сертификат колледжа.
                    </p>
                    <span className="inline-block btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest">
                      Узнать подробнее →
                    </span>
                  </div>
                </div>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AltaiCamp;
