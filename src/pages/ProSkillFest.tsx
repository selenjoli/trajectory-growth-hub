import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";

import flowersLeft from "@/assets/fest-flowers-left.png";
import flowersRight from "@/assets/fest-flowers-right.png";
import heroImg from "@/assets/fest-hero.jpg";
import networkingImg from "@/assets/fest-networking.jpg";
import venueImg from "@/assets/fest-venue.jpg";
import sessionImg from "@/assets/fest-session.jpg";
import speaker1 from "@/assets/fest-speaker1.jpg";
import speaker2 from "@/assets/fest-speaker2.jpg";
import speaker3 from "@/assets/fest-speaker3.jpg";
import speaker4 from "@/assets/fest-speaker4.jpg";
import takeawayTools from "@/assets/fest-takeaway-tools.jpg";
import takeawayRecordings from "@/assets/fest-takeaway-recordings.jpg";
import takeawayContacts from "@/assets/fest-takeaway-contacts.jpg";
import takeawayCert from "@/assets/fest-takeaway-cert.jpg";
import leaves1 from "@/assets/fest-leaves-1.png";

/* ---- colors from mockup ---- */
const bordeaux = "#300000";
const orangeAccent = "#F29727";
const orangeGrad = "bg-gradient-to-r from-[#F29727] via-orange-400 via-40% to-[#F29727] bg-clip-text text-transparent";

/* ---- data ---- */

const audienceLeft = [
  {
    title: "Если вы учитель английского",
    text: "и\u00A0хотите не\u00A0просто послушать теорию, а\u00A0унести с\u00A0собой готовые инструменты для уроков.",
  },
  {
    title: "Если вы руководитель центра",
    text: "и\u00A0хотите чтобы ваши педагоги развивались и\u00A0не\u00A0выгорали.",
  },
];

const audienceRight = [
  {
    title: "Если вам нужна энергия",
    text: "и\u00A0вдохновение — особенно в\u00A0ноябре, когда учебный год уже давит.",
  },
  {
    title: "Если вы устали от\u00A0одиночества",
    text: "в\u00A0профессиональных поисках и\u00A0хотите наконец поговорить с\u00A0коллегами которые понимают о\u00A0чём речь.",
  },
];

const formatLeft = [
  { title: "25-минутные сессии", text: "от\u00A0практикующих педагогов — интенсивно и\u00A0по\u00A0делу" },
  { title: "Coffee & Connection", text: "паузы между сессиями с\u00A0розыгрышами методической литературы и\u00A0нетворкинг-играми. Не\u00A0просто кофе — здесь завязывается большинство знакомств" },
];

const formatRight = [
  { title: "Q&A сессия", text: "вопросы спикерам напрямую" },
  { title: "Closing Remarks", text: "итоги и\u00A0планы" },
];

const scheduleCol1 = [
  { time: "09:15 — 09:55", title: "Coffee & Icebreaker", speaker: "", school: "" },
  { time: "10:00 — 10:25", title: "A Cookie Jar of Smart Ideas for (V)YL", subtitle: "копилка идей для самых маленьких", speaker: "Ms Violet", school: "Smart Cookies Club" },
  { time: "10:30 — 10:55", title: "Managing Teens: как найти ключ к\u00A0мотивации", speaker: "Ms Svetlana", school: "Smart Cookies Club" },
  { time: "11:00 — 11:25", title: "Beyond Quiet, Please!", subtitle: "больше чем тишина в\u00A0классе", speaker: "Ms Anastasia", school: "Академия Языков" },
  { time: "11:30 — 11:55", title: "Teaching Vocabulary Beyond Translation", subtitle: "лексика за\u00A0пределами перевода", speaker: "Ms Sofia", school: "Академия Языков" },
  { time: "12:00 — 12:25", title: "To burn or not to burn", subtitle: "профессиональное выгорание и\u00A0тайм-менеджмент", speaker: "Ms Shagane", school: "Liberty School" },
  { time: "12:30 — 13:20", title: "Coffee & Connection", speaker: "", school: "" },
];

const scheduleCol2 = [
  { time: "13:25 — 13:50", title: "Parents as Partners", subtitle: "от\u00A0претензий к\u00A0сотрудничеству", speaker: "Ms Eugenia", school: "Liberty School" },
  { time: "13:55 — 14:20", title: "Getting the most of your textbook", subtitle: "учебник: инструкция по\u00A0применению", speaker: "Ms Irina", school: "ABC School" },
  { time: "14:25 — 14:50", title: "Demotivation: 5 harmful tips you need to unlearn as a teacher", speaker: "Ms Irina", school: "ABC Club Пушкино" },
  { time: "14:55 — 15:20", title: "Grammar in Motion: Learning Through Play", subtitle: "как повысить эффективность и\u00A0управлять динамикой", speaker: "Ms Alexandra", school: "Lingua Cat" },
  { time: "15:25 — 15:35", title: "Q&A session", speaker: "", school: "" },
  { time: "15:35 — 15:50", title: "Closing Remarks", subtitle: "итоги и\u00A0планы", speaker: "", school: "" },
];

const takeaways = [
  { image: takeawayTools, title: "Готовые инструменты", text: "Конкретные приемы и\u00A0упражнения от\u00A0педагогов которые проверили их в\u00A0своих классах. Применить можно в\u00A0ближайший понедельник." },
  { image: takeawayRecordings, title: "Записи всех докладов", text: "После феста участники получают доступ к\u00A0материалам сессий. Можно пересмотреть то\u00A0что особенно зацепило — или поделиться с\u00A0коллегами которые не\u00A0смогли приехать." },
  { image: takeawayContacts, title: "Профессиональные контакты", text: "Коллеги из\u00A0разных городов, с\u00A0которыми познакомились в\u00A0Coffee & Connection и\u00A0остались на\u00A0связи. Сообщество которое продолжает общаться после феста." },
  { image: takeawayCert, title: "Сертификат участника", text: "Каждый участник получает официальный сертификат ProSkill Fest. Хорошее дополнение к\u00A0профессиональному портфолио." },
];

const testimonials = [
  { id: 1, image: "https://placehold.co/400x700/F29727/ffffff?text=Отзыв+1", name: "Марина", role: "учитель английского" },
  { id: 2, image: "https://placehold.co/400x700/F29727/ffffff?text=Отзыв+2", name: "Анна", role: "учитель английского" },
  { id: 3, image: "https://placehold.co/400x700/F29727/ffffff?text=Отзыв+3", name: "Светлана", role: "преподаватель английского" },
  { id: 4, image: "https://placehold.co/400x700/F29727/ffffff?text=Отзыв+4", name: "Екатерина", role: "руководитель языкового центра" },
];

/* ---- schedule item renderer ---- */
const ScheduleItem = ({ item, i }: { item: typeof scheduleCol1[0]; i: number }) => {
  const isBreak = !item.speaker && (item.title.includes("Coffee") || item.title === "Q&A session" || item.title === "Closing Remarks");
  return (
    <AnimatedSection delay={i * 0.03}>
      <div className={`flex gap-3 p-3 rounded-xl ${isBreak ? "bg-white/5" : "bg-white/10 border border-white/10"}`}>
        <span className="text-[#F29727]/80 text-xs font-mono whitespace-nowrap min-w-[100px] shrink-0">
          {item.time}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm normal-case">{item.title}</p>
          {item.subtitle && <p className="text-white/50 text-xs normal-case">{item.subtitle}</p>}
          {item.speaker && <p className="text-[#F29727]/70 text-xs mt-1 normal-case">{item.speaker} · {item.school}</p>}
        </div>
      </div>
    </AnimatedSection>
  );
};

/* ---- page ---- */

const ProSkillFest = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);

  const [gallerySlide, setGallerySlide] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const galleryPhotos = [heroImg, networkingImg, sessionImg, venueImg];

  /* format carousel */
  const [formatSlide, setFormatSlide] = useState(0);
  const [formatPaused, setFormatPaused] = useState(false);
  const formatPhotos = [heroImg, sessionImg, networkingImg, venueImg];

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || zoomed !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide]);

  useEffect(() => {
    if (galleryPaused) return;
    const interval = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % galleryPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [galleryPaused, galleryPhotos.length]);

  useEffect(() => {
    if (formatPaused) return;
    const interval = setInterval(() => {
      setFormatSlide((prev) => (prev + 1) % formatPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [formatPaused, formatPhotos.length]);

  /* Repeating flowers positions */
  const flowerPositions = [0, 900, 1800, 2700, 3600, 4500];

  return (
    <main className="relative overflow-hidden" style={{ backgroundColor: "#F2F2F2" }}>
      <Header variant="dark" />

      {/* Repeating side flowers */}
      {flowerPositions.map((top) => (
        <div key={`flowers-${top}`} className="hidden lg:block">
          <img
            src={flowersLeft}
            alt=""
            className="absolute left-0 w-auto pointer-events-none z-0"
            style={{ top: `${top}px`, maxWidth: "220px" }}
          />
          <img
            src={flowersRight}
            alt=""
            className="absolute right-0 w-auto pointer-events-none z-0"
            style={{ top: `${top + 200}px`, maxWidth: "220px" }}
          />
        </div>
      ))}

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10 pt-20 lg:pt-0 relative z-10">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img
            src={heroImg}
            alt="ProSkill Fest — зал, спикер, участники"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
            <div className="w-fit">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 mb-6"
              >
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm md:text-base font-semibold uppercase tracking-wider px-5 py-2 rounded-full">
                  Ежегодный фестиваль для педагогов
                </span>
                <span className="inline-block bg-[#F29727] text-white text-sm md:text-base font-bold uppercase tracking-wider px-5 py-2 rounded-full ml-auto">
                  7 ноября 2026
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-4"
              >
                ProSkill{" "}
                <span className={orangeGrad}>Fest</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/85 max-w-2xl mb-6 font-normal normal-case leading-relaxed"
            >
              Один день в\u00A0году, когда учителя собираются не\u00A0на\u00A0конференцию — а\u00A0к\u00A0своим.
              Доклады от\u00A0практикующих педагогов, живое общение и\u00A0инструменты которые работают в\u00A0реальном классе.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <span className="bg-white/15 backdrop-blur-sm text-white/80 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
                Москва
              </span>
              <span className="bg-white/15 backdrop-blur-sm text-white/80 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
                Регистрация открыта
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#register" className="btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest">
                Зарегистрироваться
              </a>
              <a href="#program" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl text-sm tracking-widest uppercase font-bold hover:bg-white/20 transition-colors">
                Программа феста
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT — "Откуда это все началось" ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 relative z-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-6">
                Откуда это началось
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-1/2 space-y-6">
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Учителя учатся лучше всего у\u00A0других учителей. Не\u00A0у\u00A0авторов учебников
                    и\u00A0не\u00A0у\u00A0методистов из\u00A0академий — а\u00A0у\u00A0тех, кто каждый день заходит в\u00A0класс,
                    сталкивается с\u00A0теми же задачами и\u00A0находит решения которые реально работают.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Ассоциация «Траектория Роста» сделала ProSkill Fest именно из\u00A0этой идеи.
                    Никаких звездных лекторов на\u00A0недосягаемой высоте — только практики, которые
                    честно рассказывают о\u00A0своих находках, инструментах и\u00A0ошибках.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    С\u00A02025 года фестиваль собирает учителей английского из\u00A0разных городов России.
                    Каждый раз — новые темы, новые лица и\u00A0неизменное ощущение что ты\u00A0наконец среди своих.
                  </p>
                </div>

                {/* Stacked photo carousel */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                  <div
                    className="relative w-full h-[460px]"
                    onMouseEnter={() => setGalleryPaused(true)}
                    onMouseLeave={() => setGalleryPaused(false)}
                  >
                    <AnimatePresence>
                      {galleryPhotos.map((photo, i) => {
                        const offset = (i - gallerySlide + galleryPhotos.length) % galleryPhotos.length;
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
                              zIndex: galleryPhotos.length - offset,
                              rotateZ: offset * -2,
                            }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                          >
                            <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl">
                              <img src={photo} alt="ProSkill Fest" className="w-full h-full object-cover" />
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

      {/* ── AUDIENCE — "Кому сюда" ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 relative z-10">
        <div className="rounded-[2rem] py-20 px-6 md:px-16" style={{ backgroundColor: bordeaux }}>
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-white mb-12">
                Кому сюда
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Left: профессии */}
              <div className="space-y-4">
                {audienceLeft.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 h-full">
                      <h3 className="text-lg text-white mb-2">{item.title}</h3>
                      <p className="text-white/70 text-sm normal-case leading-relaxed">{item.text}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              {/* Right: состояния */}
              <div className="space-y-4">
                {audienceRight.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 h-full">
                      <h3 className="text-lg text-white mb-2">{item.title}</h3>
                      <p className="text-white/70 text-sm normal-case leading-relaxed">{item.text}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMAT — "Как устроен день" ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 relative z-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl mb-4" style={{ color: bordeaux }}>
                <span className={orangeGrad}>Как устроен</span>{" "}
                день
              </h2>
              <p className="text-muted-foreground mb-12 normal-case text-lg">
                Весь день — очный формат в\u00A0Москве. Только живое общение.
              </p>
            </AnimatedSection>

            {/* 3 columns: left items, center carousel, right items */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="space-y-4">
                {formatLeft.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="bg-card border border-border rounded-2xl p-6 h-full">
                      <h3 className="text-lg mb-2" style={{ color: bordeaux }}>{item.title}</h3>
                      <p className="text-muted-foreground text-sm normal-case leading-relaxed">{item.text}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Center: stacked carousel */}
              <AnimatedSection delay={0.1}>
                <div
                  className="relative w-full h-[400px]"
                  onMouseEnter={() => setFormatPaused(true)}
                  onMouseLeave={() => setFormatPaused(false)}
                >
                  <AnimatePresence>
                    {formatPhotos.map((photo, i) => {
                      const offset = (i - formatSlide + formatPhotos.length) % formatPhotos.length;
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
                            zIndex: formatPhotos.length - offset,
                            rotateZ: offset * -2,
                          }}
                          exit={{ opacity: 0, scale: 0.9, y: -20 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0"
                        >
                          <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl">
                            <img src={photo} alt="ProSkill Fest" className="w-full h-full object-cover" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </AnimatedSection>

              <div className="space-y-4">
                {formatRight.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="bg-card border border-border rounded-2xl p-6 h-full">
                      <h3 className="text-lg mb-2" style={{ color: bordeaux }}>{item.title}</h3>
                      <p className="text-muted-foreground text-sm normal-case leading-relaxed">{item.text}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Full-width audience photo */}
            <AnimatedSection>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={sessionImg}
                  alt="ProSkill Fest — формат дня"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PROGRAM 2025 ── */}
      <section id="program" className="px-3 md:px-6 xl:px-10 mt-4 relative z-10">
        <div className="rounded-[2rem] py-20 px-6 md:px-16 relative overflow-hidden" style={{ backgroundColor: bordeaux }}>
          {/* Subtle leaf decorations */}
          <img src={leaves1} alt="" className="absolute right-8 top-12 w-24 opacity-30 pointer-events-none rotate-12" />
          <img src={leaves1} alt="" className="absolute left-8 bottom-12 w-20 opacity-20 pointer-events-none -rotate-45" />
          <img src={leaves1} alt="" className="absolute right-1/3 bottom-1/3 w-16 opacity-15 pointer-events-none rotate-45" />

          <div className="fluid-container relative z-10">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-white mb-4">
                Как это было{" "}
                <span className={orangeGrad}>в\u00A02025 году</span>
              </h2>
              <p className="text-white/60 mb-12 normal-case leading-relaxed text-lg">
                Программа каждого феста формируется заново — спикеры предлагают темы которые актуальны
                прямо сейчас в\u00A0их классах. Программа ProSkill Fest 2026 пока в\u00A0разработке,
                следите за\u00A0анонсами.
              </p>
            </AnimatedSection>

            {/* 2-column schedule */}
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
              <div className="space-y-2">
                {scheduleCol1.map((item, i) => (
                  <ScheduleItem key={i} item={item} i={i} />
                ))}
              </div>
              <div className="space-y-2">
                {scheduleCol2.map((item, i) => (
                  <ScheduleItem key={i} item={item} i={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPEAKERS ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 relative z-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-1/2">
                  <h2 className="text-4xl md:text-6xl mb-4" style={{ color: bordeaux }}>
                    Кто{" "}
                    <span className={orangeGrad}>выступает</span>
                  </h2>
                  <p className="text-muted-foreground mb-6 normal-case leading-relaxed text-lg">
                    Все спикеры ProSkill Fest — практикующие педагоги.
                  </p>
                  <p className="text-muted-foreground mb-8 normal-case leading-relaxed">
                    Здесь нет приглашенных экспертов которые давно не\u00A0заходили в\u00A0класс.
                    Любой учитель с\u00A0интересной темой и\u00A0полезными наработками может подать заявку
                    на\u00A0выступление — из\u00A0школ Ассоциации и\u00A0не\u00A0только.
                  </p>
                  <p className="text-muted-foreground text-sm mb-6 normal-case">
                    Спикеры ProSkill Fest 2026 пока объявляются. Если у\u00A0вас есть тема которой хочется
                    поделиться с\u00A0коллегами — ждем вашу заявку.
                  </p>
                  <a href="#register" className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest">
                    Подать заявку на выступление <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Speaker photos — right column */}
                <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                  {[speaker1, speaker2, speaker3, speaker4].map((img, i) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                      <img src={img} alt={`Спикер ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TAKEAWAYS — "Что заберете с собой" ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 relative z-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl mb-12" style={{ color: bordeaux }}>
                Что вы{" "}
                <span className={orangeGrad}>заберете с собой</span>
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              {takeaways.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="rounded-2xl overflow-hidden border border-border h-full bg-card">
                    <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />
                    <div className="p-6">
                      <h3 className="text-lg mb-3" style={{ color: bordeaux }}>{item.title}</h3>
                      <p className="text-muted-foreground text-sm normal-case leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — orange bg, stacked carousel ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 relative z-10">
        <div className="rounded-[2rem] py-20 px-6 md:px-16" style={{ backgroundColor: orangeAccent }}>
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-white mb-4">
                Что говорят те, кто был
              </h2>
              <p className="text-white/80 text-base md:text-lg mb-12 font-normal normal-case">
                Отзывы участников ProSkill Fest 2025.
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
                          <div className="flex-1 rounded-[1.2rem] overflow-hidden shadow-2xl bg-white/20">
                            <img src={item.image} alt={`Отзыв от ${item.name}`} className="w-full h-full object-cover" />
                          </div>
                          <motion.div
                            className="mt-4 text-center"
                            animate={{ opacity: offset === 0 ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-white font-bold text-base">{item.name}</p>
                            <p className="text-white/70 text-sm">{item.role}</p>
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

      {/* ── VENUE — white bg ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 relative z-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-12">
                Где это{" "}
                <span className={orangeGrad}>происходит</span>
              </h2>
            </AnimatedSection>
            <div className="flex flex-col md:flex-row gap-8">
              <AnimatedSection className="w-full md:w-1/2">
                <img
                  src={venueImg}
                  alt="Loft Красный Октябрь"
                  className="w-full rounded-2xl object-cover h-64 md:h-80"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.1} className="w-full md:w-1/2">
                <h3 className="text-xl mb-4 normal-case" style={{ color: bordeaux }}>Loft Красный Октябрь</h3>
                <p className="text-muted-foreground normal-case leading-relaxed mb-6">
                  В\u00A0самом сердце Москвы, на\u00A0Берсеневской набережной. Пространство которое располагает
                  к\u00A0разговору: не\u00A0конференц-зал со\u00A0строгими рядами, а\u00A0живое место где удобно думать
                  и\u00A0общаться.
                </p>
                <div className="space-y-3 text-foreground/80 text-sm normal-case">
                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: orangeAccent }} />
                    <span>Берсеневская набережная, 6с3</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: orangeAccent }} />
                    <span>Кропоткинская или Полянка — 10 минут пешком</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: orangeAccent }} />
                    <span>Парковки на\u00A0площадке нет — удобнее приехать на\u00A0метро или такси</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING / REGISTER ── */}
      <section id="register" className="px-3 md:px-6 xl:px-10 mt-4 relative z-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl mb-12" style={{ color: bordeaux }}>
                7 ноября. Москва.{" "}
                <span className={orangeGrad}>Приходите.</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedSection>
                <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col">
                  <h3 className="text-xl mb-4" style={{ color: bordeaux }}>Для участников</h3>
                  <p className="text-muted-foreground normal-case leading-relaxed mb-6 flex-1">
                    Для педагогов и\u00A0руководителей центров ассоциации участие бесплатное — фест существует
                    благодаря поддержке ассоциации.
                  </p>
                  <p className="text-muted-foreground/60 text-sm normal-case mb-6">
                    Стоимость для внешних участников уточняется.
                  </p>
                  <a href="#" className="block w-full text-center btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest">
                    Зарегистрироваться как участник
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="rounded-2xl p-8 h-full flex flex-col text-white" style={{ backgroundColor: bordeaux }}>
                  <h3 className="text-xl mb-4">Хотите выступить?</h3>
                  <p className="text-white/70 normal-case leading-relaxed mb-6 flex-1">
                    ProSkill Fest строится на\u00A0том, что спикеры — такие же практики как и\u00A0все в\u00A0зале.
                    Если у\u00A0вас есть тема, инструмент или опыт которым хочется поделиться — ждем заявку.
                  </p>
                  <a href="#" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl text-sm tracking-widest uppercase font-bold hover:bg-white/20 transition-colors text-center">
                    Подать заявку на выступление <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── CROSS-LINKS ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 mb-4 relative z-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-4">
                Хотите расти{" "}
                <span className={orangeGrad}>не только в ноябре?</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <AnimatedSection>
                <Link to="/uchitelya/kurs" className="block bg-card border border-border rounded-2xl p-6 hover:border-[#F29727]/30 transition-colors h-full">
                  <span className="text-xs uppercase tracking-wider" style={{ color: orangeAccent }}>Hilderstone College</span>
                  <h3 className="text-lg mt-2 mb-2">Teachers Development Course</h3>
                  <p className="text-muted-foreground text-sm normal-case leading-relaxed mb-4">
                    Недельный онлайн-интенсив с\u00A0британскими тьюторами — готовые инструменты,
                    международный сертификат, живой формат.
                  </p>
                  <span className="text-sm font-semibold inline-flex items-center gap-1" style={{ color: orangeAccent }}>
                    Узнать подробнее <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <Link to="/partnerstvo" className="block bg-card border border-border rounded-2xl p-6 hover:border-[#F29727]/30 transition-colors h-full">
                  <span className="text-xs uppercase tracking-wider" style={{ color: orangeAccent }}>Для руководителей</span>
                  <h3 className="text-lg mt-2 mb-2">Партнерство для центров</h3>
                  <p className="text-muted-foreground text-sm normal-case leading-relaxed mb-4">
                    Руководите языковым центром? Узнайте о\u00A0партнерстве с\u00A0Ассоциацией.
                  </p>
                  <span className="text-sm font-semibold inline-flex items-center gap-1" style={{ color: orangeAccent }}>
                    О партнерстве <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProSkillFest;
