import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import PhotoLightbox from "@/components/PhotoLightbox";
import ContactFormModal from "@/components/ContactFormModal";

const heroBg = "/assets/uae-hero.jpg";
const uaeBeach = "/assets/uae-beach.jpg";
const uaeBeachWhy = "/assets/uae-beach-why.jpg";
const uaeAbudhabi = "/assets/uae-abudhabi.jpg";
const uaeAbudhabiWhy = "/assets/uae-abudhabi-why.jpg";
const uaeMuseum = "/assets/uae-museum.jpg";
const uaeMuseumWhy = "/assets/uae-museum-why.jpg";
const uaeMall = "/assets/uae-mall.jpg";
const uaeMallWhy = "/assets/uae-mall-why.jpg";
const uaeFerrari = "/assets/uae-ferrari.jpg";
const uaeYacht = "/assets/uae-yacht.jpg";
const uaeYachtWhy = "/assets/uae-yacht-why.jpg";
const uaeCampus = "/assets/uae-campus.jpg";
const illustChina = "/assets/illust-china.png";
const illustSea = "/assets/illust-starfish.png";
const illustAltai = "/assets/illust-altai.png";
const illustHilderstone = "/assets/illust-hilderstone-uk.png";

/* ─── data ─── */

const daySchedule = [
  { day: "День 1", title: "Прилёт и знакомство", text: "Прилёт, заселение в кампус, знакомство с группой и городом.", image: uaeBeach },
  { day: "День 2", title: "Обзорная экскурсия", text: "Обзорная экскурсия по Дубаю и лучшие пляжи эмирата.", image: uaeBeach },
  { day: "День 3", title: "Абу-Даби", text: "Полный день в Абу-Даби.", image: uaeAbudhabi },
  { day: "День 4", title: "Музей Будущего", text: "Сафари-парк и Музей Будущего — один из самых красивых музеев в мире, и это не преувеличение.", image: uaeMuseum },
  { day: "День 5", title: "Downtown Dubai", text: "Музей истории Etihad, Downtown Dubai и шоу фонтанов у Бурдж-Халифа вечером.", image: uaeBeach },
  { day: "День 6", title: "Ferrari World", text: "Ferrari World — тематический парк, целый день.", image: uaeFerrari },
  { day: "День 7", title: "Dubai Mall и бизнес", text: "Dubai Mall и Mall of the Emirates + экскурсия в реальную компанию.", image: uaeMall },
  { day: "День 8", title: "Прощальный вечер", text: "Ужин на яхте, прощальный вечер, отъезд.", image: uaeYacht },
];

const included = [
  "Проживание в двухместных апартаментах кампуса",
  "Трёхразовое питание",
  "Все экскурсии и входные билеты по программе",
  "Транспорт на все мероприятия",
  "Трансфер аэропорт — кампус — аэропорт",
  "Курс английского, учебные материалы, сертификат",
  "Сопровождающий от ассоциации 24/7",
  "Помощь с оформлением документов",
];

const campusFeatures = [
  "Курс английского с носителями, 18 часов в неделю",
  "Уроки карьеры — как устроен бизнес, какие профессии есть в мире",
  "Учебные материалы и сертификат по окончании",
  "Визит в реальную компанию, живой разговор с предпринимателями",
];

const testimonials = [
  { id: 1, image: "https://placehold.co/400x700/862990/ffffff?text=Отзыв+1" },
  { id: 2, image: "https://placehold.co/400x700/862990/ffffff?text=Отзыв+2" },
  { id: 3, image: "https://placehold.co/400x700/862990/ffffff?text=Отзыв+3" },
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);

  const whyPhotos = [uaeBeachWhy, uaeAbudhabiWhy, uaeMuseumWhy, uaeMallWhy, uaeYachtWhy];

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
      setCurrentDay((prev) => (prev < daySchedule.length - 1 ? prev + 1 : prev));
    }, 6000);
    return () => clearInterval(interval);
  }, [dayPaused, currentDay]);

  useEffect(() => {
    if (whyPaused) return;
    const interval = setInterval(() => {
      setWhySlide((prev) => (prev + 1) % whyPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [whyPaused, whyPhotos.length]);

  /* Day carousel helpers */
  const getVisibleDays = () => {
    const items: { index: number; offset: number }[] = [];
    for (let offset = -1; offset <= 3; offset++) {
      const index = currentDay + offset;
      if (index < 0 || index >= daySchedule.length) continue;
      items.push({ index, offset });
    }
    return items;
  };

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
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white leading-[0.95]">
                <span className="relative block w-fit">
                  <span className="flex items-center justify-between gap-6 mb-4 md:absolute md:bottom-full md:left-0 md:right-0 md:mb-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm md:text-base font-semibold uppercase tracking-wider px-5 py-2 rounded-full whitespace-nowrap">
                      Образовательный интенсив · ОАЭ
                    </span>
                    <span className="inline-block bg-program-uae text-white text-sm md:text-base font-bold uppercase tracking-wider px-5 py-2 rounded-full whitespace-nowrap">
                      Даты уточняются
                    </span>
                  </span>
                  <span className="block">
                    <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">Дубай</span> — город, где будущее
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
              8 дней в ОАЭ — английский с носителями, знакомство с реальным бизнесом и экскурсии по одному из самых необычных городов планеты. Для детей от 10 лет и родителей.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {["От 10 лет", "Можно с родителями"].map((chip) => (
                <span key={chip} className="bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full">
                  {chip}
                </span>
              ))}
            </motion.div>
            <motion.button
              onClick={() => setFormOpen(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="inline-block btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest"
            >
              Узнать когда откроется запись
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-16 px-6 md:px-16">
          <div className="fluid-container max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed mb-4">
                Весенняя поездка в Дубай, которая планировалась на март-апрель 2026 года, временно приостановлена в связи с обстановкой в регионе. Программа сохраняется и будет возобновлена при первой возможности.
              </p>
              <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed mb-8">
                Если вам интересен этот тур — оставьте контакт, и мы сообщим о новых датах первыми.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <button
                onClick={() => setFormOpen(true)}
                className="inline-block btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest"
              >
                Оставить контакт
              </button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Why this tour — 50/50 text + carousel ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-10">
                Это не обычная <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">экскурсионная поездка</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="lg:w-1/2 space-y-6">
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Дубай вырос из пустыни за 30 лет. Здесь работают люди 200 национальностей, а английский — не школьный предмет, а язык повседневной жизни. Дети это чувствуют сразу, как только выходят за территорию кампуса.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Программа построена так, чтобы каждый день давал что-то конкретное — не просто посмотрели и поехали дальше. Занятия в кампусе чередуются с экскурсиями, а урок карьеры в реальной компании даёт подросткам то, чего не бывает в школе: живой разговор с людьми, которые уже построили что-то своё.
                  </p>
                </div>

                {/* Stacked photo carousel — 50% */}
                <div className="lg:w-1/2 flex justify-center lg:justify-start">
                  <div
                    className="relative w-full aspect-[4/3]"
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
                              y: offset * 12,
                              x: offset * 8,
                              zIndex: whyPhotos.length - offset,
                              rotateZ: offset * -1.5,
                            }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className={`absolute inset-0 ${offset === 0 ? "cursor-pointer" : ""}`}
                            onClick={() => { if (offset === 0) { setLightboxIndex(i); setLightboxOpen(true); } }}
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

      {/* ── Program by days — horizontal carousel ── */}
      <section className="section-padding overflow-hidden">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-4">
              8 дней — <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">день за днём</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-14 max-w-2xl font-normal normal-case">
              Каждый день в кампусе: занятия английским с носителями — 18 часов в неделю, уроки карьеры, вечерние активности с группой.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div
              onMouseEnter={() => setDayPaused(true)}
              onMouseLeave={() => setDayPaused(false)}
            >
              {/* Desktop carousel — center card + side cards */}
              <div className="hidden md:block">
                <div className="relative flex items-center gap-4 h-[420px] overflow-hidden">
                  {getVisibleDays().map(({ index, offset }) => {
                    const isCenter = offset === 0;
                    const absOffset = Math.abs(offset);
                    return (
                      <motion.div
                        key={`${index}-${offset}`}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: isCenter ? 1 : Math.max(0.3, 0.7 - absOffset * 0.2),
                          scale: isCenter ? 1 : 0.85 - absOffset * 0.05,
                          zIndex: isCenter ? 10 : 5 - absOffset,
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative rounded-[1.5rem] overflow-hidden shrink-0 ${
                          isCenter ? "w-[480px] h-[380px]" : "w-[320px] h-[340px]"
                        }`}
                        style={{ cursor: isCenter ? "default" : "pointer" }}
                        onClick={() => !isCenter && setCurrentDay(index)}
                      >
                        <img
                          src={daySchedule[index].image}
                          alt={daySchedule[index].title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
                        {/* Day label — top left, large */}
                        <div className="absolute top-5 left-6">
                          <p className="text-white/70 text-sm uppercase tracking-widest mb-1">{daySchedule[index].day}</p>
                          <h3 className="text-2xl md:text-3xl text-white leading-tight">{daySchedule[index].title}</h3>
                        </div>
                        {/* Description at bottom */}
                        {isCenter && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="absolute bottom-5 left-6 right-6"
                          >
                            <p className="text-sm text-white/90 font-normal normal-case leading-relaxed">
                              {daySchedule[index].text}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile carousel — single card */}
              <div className="block md:hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDay}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5]"
                  >
                    <img
                      src={daySchedule[currentDay].image}
                      alt={daySchedule[currentDay].title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
                    <div className="absolute top-5 left-5">
                      <p className="text-white/70 text-sm uppercase tracking-widest mb-1">{daySchedule[currentDay].day}</p>
                      <h3 className="text-2xl text-white leading-tight">{daySchedule[currentDay].title}</h3>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-sm text-white/90 font-normal normal-case leading-relaxed">
                        {daySchedule[currentDay].text}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Arrows — below carousel */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentDay((prev) => Math.max(0, prev - 1))}
                  disabled={currentDay === 0}
                  className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                >
                  <ArrowLeft className="w-5 h-5 text-program-uae" />
                </button>
                <span className="text-white/50 text-sm font-medium min-w-[3rem] text-center">
                  {currentDay + 1} / {daySchedule.length}
                </span>
                <button
                  onClick={() => setCurrentDay((prev) => Math.min(daySchedule.length - 1, prev + 1))}
                  disabled={currentDay === daySchedule.length - 1}
                  className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                >
                  <ArrowRight className="w-5 h-5 text-program-uae" />
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-6">
                Жизнь в <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">международном кампусе</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
                <div>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed mb-6">
                    Особенность этой программы — в формате. Вы живёте, учитесь, обедаете и отдыхаете на одной территории. Рядом студенты из разных стран, английский звучит постоянно — не потому что так положено, а потому что иначе не договоришься.
                  </p>
                  <h3 className="text-lg md:text-xl text-foreground mb-4">Что входит в учебную часть:</h3>
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
                  <h2 className="text-2xl md:text-3xl text-foreground mb-1">Что входит в стоимость</h2>
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
                  Авиабилеты и страховка оплачиваются отдельно.
                </p>
                <div className="border-t-2 border-dashed border-foreground/20 pt-6">
                  <p className="text-center text-muted-foreground text-sm font-normal normal-case mb-4">
                    Стоимость будет объявлена после подтверждения программы.
                  </p>
                  <button
                    onClick={() => setFormOpen(true)}
                    className="block w-full text-center btn-gold px-6 py-4 rounded-2xl text-sm tracking-widest"
                  >
                    Узнать о новых датах
                  </button>
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

      {/* ── Testimonials ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="rounded-[2rem] bg-white/10 backdrop-blur-sm border border-white/15 py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-4">
                Что говорят <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">участники</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 max-w-xl font-normal normal-case">
                Отзывы семей, которые побывали в наших турах.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div
                className="relative mx-auto w-[320px] md:w-[380px] h-[400px] md:h-[475px]"
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
                        <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl bg-background">
                          <img src={item.image} alt={`Отзыв ${item.id}`} className="w-full h-full object-cover" />
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-6">
              Дубай ждёт — <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">следите за датами</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg font-normal normal-case leading-relaxed mb-10">
              Стоимость и даты будут объявлены после подтверждения программы. Оставьте контакт — пришлём информацию первыми, как только всё подтвердится.
            </p>
            <button
              onClick={() => setFormOpen(true)}
              className="inline-block btn-gold px-10 py-4 rounded-2xl text-sm tracking-widest"
            >
              Оставить контакт
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Other programs — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 mb-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-14">
                Посмотрите <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">ещё</span>
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
                      Онлайн языковая практика с Hilderstone College
                    </h3>
                    <p className="text-sm text-muted-foreground font-normal normal-case leading-relaxed mb-4">
                      Хотите подготовить ребёнка к поездке заранее или закрепить английский после возвращения? Британский преподаватель, группа до 12 человек, официальный сертификат колледжа.
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
      <Footer variant="white" />
      <FloatingButtons arrowColor="hsl(var(--program-uae))" />
      <PhotoLightbox photos={whyPhotos} initialIndex={lightboxIndex} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} program="Тур в ОАЭ" page="UaeTour" />
    </main>
  );
};

export default UaeTour;
