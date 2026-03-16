import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";

import heroBg from "@/assets/uae-hero.jpg";
import uaeBeach from "@/assets/uae-beach.jpg";
import uaeAbudhabi from "@/assets/uae-abudhabi.jpg";
import uaeMuseum from "@/assets/uae-museum.jpg";
import uaeMall from "@/assets/uae-mall.jpg";
import uaeFerrari from "@/assets/uae-ferrari.jpg";
import uaeYacht from "@/assets/uae-yacht.jpg";
import uaeCampus from "@/assets/uae-campus.jpg";
import illustChina from "@/assets/illust-china.png";
import illustSea from "@/assets/illust-starfish.png";
import illustAltai from "@/assets/illust-altai.png";
import illustHilderstone from "@/assets/illust-hilderstone-uk.png";

/* ─── data ─── */

const daySchedule = [
  { day: "День 1", title: "Прилёт и знакомство", text: "Прилёт, заселение в\u00a0кампус, знакомство с\u00a0группой и\u00a0городом.", image: uaeBeach },
  { day: "День 2", title: "Обзорная экскурсия", text: "Обзорная экскурсия по\u00a0Дубаю и\u00a0лучшие пляжи эмирата.", image: uaeBeach },
  { day: "День 3", title: "Абу-Даби", text: "Полный день в\u00a0Абу-Даби.", image: uaeAbudhabi },
  { day: "День 4", title: "Музей Будущего", text: "Сафари-парк и\u00a0Музей Будущего — один из\u00a0самых красивых музеев в\u00a0мире, и\u00a0это не\u00a0преувеличение.", image: uaeMuseum },
  { day: "День 5", title: "Downtown Dubai", text: "Музей истории Etihad, Downtown Dubai и\u00a0шоу фонтанов у\u00a0Бурдж-Халифа вечером.", image: uaeBeach },
  { day: "День 6", title: "Ferrari World", text: "Ferrari World — тематический парк, целый день.", image: uaeFerrari },
  { day: "День 7", title: "Dubai Mall и бизнес", text: "Dubai Mall и\u00a0Mall of\u00a0the\u00a0Emirates + экскурсия в\u00a0реальную компанию.", image: uaeMall },
  { day: "День 8", title: "Прощальный вечер", text: "Ужин на\u00a0яхте, прощальный вечер, отъезд.", image: uaeYacht },
];

const included = [
  "Проживание в\u00a0двухместных апартаментах кампуса",
  "Трёхразовое питание",
  "Все экскурсии и\u00a0входные билеты по\u00a0программе",
  "Транспорт на\u00a0все мероприятия",
  "Трансфер аэропорт — кампус — аэропорт",
  "Курс английского, учебные материалы, сертификат",
  "Сопровождающий от\u00a0ассоциации 24/7",
  "Помощь с\u00a0оформлением документов",
];

const campusFeatures = [
  "Курс английского с\u00a0носителями, 18\u00a0часов в\u00a0неделю",
  "Уроки карьеры — как устроен бизнес, какие профессии есть в\u00a0мире",
  "Учебные материалы и\u00a0сертификат по\u00a0окончании",
  "Визит в\u00a0реальную компанию, живой разговор с\u00a0предпринимателями",
];

const testimonials = [
  { id: 1, image: "https://placehold.co/400x700/862990/ffffff?text=Отзыв+1", name: "Дмитрий, Москва", role: "папа Кирилла (14 лет)" },
  { id: 2, image: "https://placehold.co/400x700/862990/ffffff?text=Отзыв+2", name: "Марина, Санкт-Петербург", role: "мама Арины (12 лет)" },
  { id: 3, image: "https://placehold.co/400x700/862990/ffffff?text=Отзыв+3", name: "Кирилл, 14 лет", role: "Участник тура" },
];

const otherPrograms = [
  { title: "Китай", illustration: illustChina, illustClass: "h-24 w-auto", dates: "3–12 июня", price: "от 165 000 ₽", href: "/kanikuly/china" },
  { title: "Море", illustration: illustSea, illustClass: "h-20 w-auto", dates: "24 июня — 14 июля", price: "от 134 000 ₽", href: "/kanikuly/more" },
  { title: "Алтай", illustration: illustAltai, illustClass: "h-24 w-auto", dates: "10–25 июля", price: "от 95 000 ₽", href: "/kanikuly/altai" },
];

/* ─── page ─── */

const UaeTour = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [dayPaused, setDayPaused] = useState(false);
  const [whySlide, setWhySlide] = useState(0);
  const [whyPaused, setWhyPaused] = useState(false);

  const whyPhotos = [uaeBeach, uaeAbudhabi, uaeMuseum, uaeMall, uaeYacht];

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || zoomed !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide]);

  useEffect(() => {
    if (dayPaused) return;
    const interval = setInterval(() => {
      setCurrentDay((prev) => (prev + 1) % daySchedule.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [dayPaused]);

  useEffect(() => {
    if (whyPaused) return;
    const interval = setInterval(() => {
      setWhySlide((prev) => (prev + 1) % whyPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [whyPaused, whyPhotos.length]);

  return (
    <main className="bg-program-uae">
      <Header variant="light" />

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10 pt-20 lg:pt-0">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img src={heroBg} alt="Панорама Дубая" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95]">
                <span className="relative block w-fit">
                  <span className="flex items-center justify-between gap-6 mb-4 md:absolute md:bottom-full md:left-0 md:right-0 md:mb-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm md:text-base font-semibold uppercase tracking-wider px-5 py-2 rounded-full whitespace-nowrap">
                      Образовательный интенсив · ОАЭ
                    </span>
                    <span className="inline-block bg-program-uae text-white text-sm md:text-base font-bold uppercase tracking-wider px-5 py-2 rounded-full whitespace-nowrap">
                      Даты уточняются
                    </span>
                  </span>
                  <span className="block whitespace-nowrap">
                    <span className="text-program-uae">Дубай</span> — город, где будущее
                  </span>
                </span>
                <span className="block">уже наступило</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-white/85 max-w-2xl font-normal normal-case leading-relaxed mb-8"
            >
              8 дней в\u00a0ОАЭ — английский с\u00a0носителями, знакомство с\u00a0реальным бизнесом и\u00a0экскурсии по\u00a0одному из\u00a0самых необычных городов планеты. Для детей от\u00a010\u00a0лет и\u00a0родителей.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {["От 10 лет", "Можно с\u00a0родителями"].map((chip) => (
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
              Узнать когда откроется запись
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-16 px-6 md:px-16">
          <div className="fluid-container max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed mb-4">
                Весенняя поездка в\u00a0Дубай, которая планировалась на\u00a0март-апрель 2026\u00a0года, временно приостановлена в\u00a0связи с\u00a0обстановкой в\u00a0регионе. Программа сохраняется и\u00a0будет возобновлена при первой возможности.
              </p>
              <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed mb-8">
                Если вам интересен этот тур — оставьте контакт, и\u00a0мы сообщим о\u00a0новых датах первыми.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <form id="forma" className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Имя"
                  className="flex-1 px-5 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-program-uae/30"
                />
                <input
                  type="text"
                  placeholder="Телефон или email"
                  className="flex-1 px-5 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-program-uae/30"
                />
                <button
                  type="submit"
                  className="btn-gold px-6 py-3 rounded-xl text-xs tracking-widest whitespace-nowrap"
                >
                  Сообщить о\u00a0новых датах
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Why this tour — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-6">
                Это не\u00a0обычная <span className="bg-gradient-to-r from-purple-400 via-purple-300 via-40% to-purple-600 bg-clip-text text-transparent">экскурсионная поездка</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="max-w-2xl space-y-6 lg:shrink-0">
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Дубай вырос из\u00a0пустыни за\u00a030\u00a0лет. Здесь работают люди 200\u00a0национальностей, а\u00a0английский — не\u00a0школьный предмет, а\u00a0язык повседневной жизни. Дети это чувствуют сразу, как только выходят за\u00a0территорию кампуса.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Программа построена так, чтобы каждый день давал что-то конкретное — не\u00a0просто посмотрели и\u00a0поехали дальше. Занятия в\u00a0кампусе чередуются с\u00a0экскурсиями, а\u00a0урок карьеры в\u00a0реальной компании даёт подросткам то, чего не\u00a0бывает в\u00a0школе: живой разговор с\u00a0людьми, которые уже построили что-то своё.
                  </p>
                </div>

                {/* Stacked photo carousel */}
                <div className="flex justify-center lg:justify-start">
                  <div
                    className="relative w-[340px] h-[460px]"
                    onMouseEnter={() => setWhyPaused(true)}
                    onMouseLeave={() => setWhyPaused(false)}
                  >
                    <AnimatePresence>
                      {whyPhotos.map((photo, i) => {
                        const offset = (i - whySlide + whyPhotos.length) % whyPhotos.length;
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
                              zIndex: whyPhotos.length - offset,
                              rotateZ: offset * -2,
                            }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                          >
                            <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl">
                              <img src={photo} alt="ОАЭ" className="w-full h-full object-cover" />
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

      {/* ── Program by days — on colored bg ── */}
      <section className="section-padding overflow-hidden">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-white mb-4">
              8 дней — <span className="bg-gradient-to-r from-purple-300 via-purple-200 via-40% to-purple-400 bg-clip-text text-transparent">день за\u00a0днём</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-14 max-w-2xl font-normal normal-case">
              Каждый день в\u00a0кампусе: занятия английским с\u00a0носителями — 18\u00a0часов в\u00a0неделю, уроки карьеры, вечерние активности с\u00a0группой.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div
              className="relative"
              onMouseEnter={() => setDayPaused(true)}
              onMouseLeave={() => setDayPaused(false)}
            >
              <div className="relative z-10 flex items-center gap-8">
                <div className="w-full lg:w-[55%] shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDay}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white/10 backdrop-blur-sm rounded-[1.5rem] overflow-hidden"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={daySchedule[currentDay].image} alt={daySchedule[currentDay].title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 md:p-8">
                        <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{daySchedule[currentDay].day}</p>
                        <h3 className="text-xl md:text-2xl text-white mb-3">{daySchedule[currentDay].title}</h3>
                        <p className="text-sm md:text-base text-white/80 font-normal normal-case leading-relaxed">{daySchedule[currentDay].text}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Arrows — desktop */}
                <div className="hidden lg:flex flex-col gap-4">
                  <button
                    onClick={() => setCurrentDay((prev) => (prev - 1 + daySchedule.length) % daySchedule.length)}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ArrowLeft className="w-5 h-5 text-program-uae" />
                  </button>
                  <button
                    onClick={() => setCurrentDay((prev) => (prev + 1) % daySchedule.length)}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5 text-program-uae" />
                  </button>
                </div>
              </div>

              {/* Mobile arrows */}
              <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentDay((prev) => (prev - 1 + daySchedule.length) % daySchedule.length)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <ArrowLeft className="w-4 h-4 text-program-uae" />
                </button>
                <button
                  onClick={() => setCurrentDay((prev) => (prev + 1) % daySchedule.length)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <ArrowRight className="w-4 h-4 text-program-uae" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Campus & Study — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-6">
                Жизнь в\u00a0<span className="bg-gradient-to-r from-purple-400 via-purple-300 via-40% to-purple-600 bg-clip-text text-transparent">международном кампусе</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
                <div>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed mb-6">
                    Особенность этой программы — в\u00a0формате. Вы живёте, учитесь, обедаете и\u00a0отдыхаете на\u00a0одной территории. Рядом студенты из\u00a0разных стран, английский звучит постоянно — не\u00a0потому что так положено, а\u00a0потому что иначе не\u00a0договоришься.
                  </p>
                  <h3 className="text-lg md:text-xl text-foreground mb-4">Что входит в\u00a0учебную часть:</h3>
                  <ul className="space-y-3">
                    {campusFeatures.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted-foreground text-base font-normal normal-case">
                        <span className="w-2 h-2 rounded-full bg-program-uae shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[1.5rem] overflow-hidden aspect-[16/10]">
                  <img src={uaeCampus} alt="Международный кампус в Дубае" className="w-full h-full object-cover" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── What's included — receipt style ── */}
      <section className="py-20 px-3 md:px-6 xl:px-10">
        <div className="fluid-container">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left photo */}
              <div className="hidden lg:block flex-1">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={uaeMuseum} alt="Музей Будущего" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Receipt */}
              <div className="bg-white rounded-[1.5rem] w-full lg:w-[480px] shrink-0 px-8 py-10 shadow-2xl">
                <div className="text-center border-b-2 border-dashed border-foreground/20 pb-6 mb-6">
                  <h2 className="text-2xl md:text-3xl text-foreground mb-1">Что входит в\u00a0стоимость</h2>
                  <p className="text-sm text-muted-foreground font-normal normal-case">Тур «ОАЭ» · даты уточняются</p>
                </div>
                <div className="space-y-4 mb-8">
                  {included.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full border-2 border-program-uae bg-program-uae/10 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-program-uae" />
                      </span>
                      <p className="text-foreground text-base font-normal normal-case leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-xs mt-2 font-normal normal-case leading-relaxed mb-6">
                  Авиабилеты и\u00a0страховка оплачиваются отдельно.
                </p>
                <div className="border-t-2 border-dashed border-foreground/20 pt-6">
                  <p className="text-center text-muted-foreground text-sm font-normal normal-case mb-4">
                    Стоимость будет объявлена после подтверждения программы.
                  </p>
                  <a
                    href="#forma"
                    className="block w-full text-center btn-gold px-6 py-4 rounded-2xl text-sm tracking-widest"
                  >
                    Узнать о\u00a0новых датах
                  </a>
                </div>
              </div>

              {/* Right photo */}
              <div className="hidden lg:block flex-1">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={uaeYacht} alt="Ужин на яхте" className="w-full h-full object-cover" />
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
                Что говорят <span className="text-program-uae">участники</span>
              </h2>
              <p className="text-foreground/60 text-lg mb-12 max-w-xl font-normal normal-case">
                Отзывы семей, которые побывали в\u00a0наших турах.
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

      {/* ── Price & signup ── */}
      <section className="section-padding">
        <div className="fluid-container text-center max-w-2xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-white mb-6">
              Дубай ждёт — <span className="bg-gradient-to-r from-purple-300 via-purple-200 via-40% to-purple-400 bg-clip-text text-transparent">следите за\u00a0датами</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg font-normal normal-case leading-relaxed mb-10">
              Стоимость и\u00a0даты будут объявлены после подтверждения программы. Оставьте контакт — пришлём информацию первыми, как только всё подтвердится.
            </p>
            <a
              href="#forma"
              className="inline-block btn-gold px-10 py-4 rounded-2xl text-sm tracking-widest"
            >
              Оставить контакт
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Other programs — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 mb-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-14">
                Посмотрите <span className="text-program-uae">ещё</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {otherPrograms.map((p, i) => (
                <AnimatedSection key={p.title} delay={i * 0.08}>
                  <a
                    href={p.href}
                    className="group block rounded-[1.5rem] border border-border hover:border-program-uae/30 p-8 transition-all duration-500 hover:shadow-lg bg-card h-full text-center"
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

            {/* Hilderstone cross-sell */}
            <AnimatedSection delay={0.3}>
              <a
                href="/kanikuly/online"
                className="group block rounded-[1.5rem] border border-border hover:border-program-uae/30 p-8 transition-all duration-500 hover:shadow-lg bg-card"
              >
                <div className="flex items-center gap-6">
                  <img src={illustHilderstone} alt="Hilderstone College" className="h-28 w-auto object-contain shrink-0" />
                  <div>
                    <h3 className="text-lg md:text-xl text-foreground mb-2">
                      Онлайн языковая практика с\u00a0Hilderstone College
                    </h3>
                    <p className="text-sm text-muted-foreground font-normal normal-case leading-relaxed mb-4">
                      Хотите подготовить ребёнка к\u00a0поездке заранее или закрепить английский после возвращения? Британский преподаватель, группа до\u00a012\u00a0человек, официальный сертификат колледжа.
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

export default UaeTour;
