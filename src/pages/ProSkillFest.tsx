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
import leaves1 from "@/assets/fest-leaves-1.png";
import leaves2 from "@/assets/fest-leaves-2.png";
import leaves3 from "@/assets/fest-leaves-3.png";

/* ---- gradient shorthand ---- */
const gold = "bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent";

/* ---- data ---- */

const audienceItems = [
  {
    image: leaves1,
    title: "Учителям английского",
    text: "которые хотят не\u00A0просто послушать теорию, а\u00A0унести с\u00A0собой готовые инструменты для уроков.",
  },
  {
    image: leaves2,
    title: "Тем, кто устал от\u00A0одиночества",
    text: "в\u00A0профессиональных поисках и\u00A0хочет наконец поговорить с\u00A0коллегами которые понимают о\u00A0чём речь.",
  },
  {
    image: leaves3,
    title: "Тем, кому нужна энергия",
    text: "и\u00A0вдохновение — особенно в\u00A0ноябре, когда учебный год уже давит.",
  },
  {
    image: leaves1,
    title: "Руководителям центров",
    text: "которые хотят чтобы их педагоги развивались и\u00A0не\u00A0выгорали.",
  },
];

const formatItems = [
  { image: leaves2, title: "25-минутные сессии", text: "от\u00A0практикующих педагогов — интенсивно и\u00A0по\u00A0делу" },
  { image: leaves3, title: "Coffee & Connection", text: "паузы между сессиями с\u00A0розыгрышами методической литературы и\u00A0нетворкинг-играми. Не\u00A0просто кофе — здесь завязывается большинство знакомств" },
  { image: leaves1, title: "Q&A сессия", text: "вопросы спикерам напрямую" },
  { image: leaves2, title: "Closing Remarks", text: "итоги и\u00A0планы" },
];

const programSchedule = [
  { time: "09:15 — 09:55", title: "Coffee & Icebreaker", speaker: "", school: "" },
  { time: "10:00 — 10:25", title: "A Cookie Jar of Smart Ideas for (V)YL", subtitle: "копилка идей для самых маленьких", speaker: "Ms Violet", school: "Smart Cookies Club" },
  { time: "10:30 — 10:55", title: "Managing Teens: как найти ключ к\u00A0мотивации", speaker: "Ms Svetlana", school: "Smart Cookies Club" },
  { time: "11:00 — 11:25", title: "Beyond «Quiet, Please!»", subtitle: "больше чем тишина в\u00A0классе", speaker: "Ms Anastasia", school: "Академия Языков" },
  { time: "11:30 — 11:55", title: "Teaching Vocabulary Beyond Translation", subtitle: "лексика за\u00A0пределами перевода", speaker: "Ms Sofia", school: "Академия Языков" },
  { time: "12:00 — 12:25", title: "To burn or not to burn", subtitle: "профессиональное выгорание и\u00A0тайм-менеджмент", speaker: "Ms Shagane", school: "Liberty School" },
  { time: "12:30 — 13:20", title: "Coffee & Connection", speaker: "", school: "" },
  { time: "13:25 — 13:50", title: "Parents as Partners", subtitle: "от\u00A0претензий к\u00A0сотрудничеству", speaker: "Ms Eugenia", school: "Liberty School" },
  { time: "13:55 — 14:20", title: "Getting the most of your textbook", subtitle: "учебник: инструкция по\u00A0применению", speaker: "Ms Irina", school: "ABC School" },
  { time: "14:25 — 14:50", title: "Demotivation: 5 harmful tips you need to unlearn as a teacher", speaker: "Ms Irina", school: "ABC Club Пушкино" },
  { time: "14:55 — 15:20", title: "Grammar in Motion: Learning Through Play", subtitle: "как повысить эффективность и\u00A0управлять динамикой", speaker: "Ms Alexandra", school: "Lingua Cat" },
  { time: "15:25 — 15:35", title: "Q&A session", speaker: "", school: "" },
  { time: "15:35 — 15:50", title: "Closing Remarks", subtitle: "итоги и\u00A0планы", speaker: "", school: "" },
];

const takeaways = [
  { image: leaves1, title: "Готовые инструменты", text: "Конкретные приёмы и\u00A0упражнения от\u00A0педагогов которые проверили их в\u00A0своих классах. Применить можно в\u00A0ближайший понедельник." },
  { image: leaves3, title: "Записи всех докладов", text: "После феста участники получают доступ к\u00A0материалам сессий. Можно пересмотреть то\u00A0что особенно зацепило — или поделиться с\u00A0коллегами которые не\u00A0смогли приехать." },
  { image: leaves2, title: "Профессиональные контакты", text: "Коллеги из\u00A0разных городов, с\u00A0которыми познакомились в\u00A0Coffee & Connection и\u00A0остались на\u00A0связи. Сообщество которое продолжает общаться после феста." },
  { image: leaves1, title: "Сертификат участника", text: "Каждый участник получает официальный сертификат ProSkill Fest. Хорошее дополнение к\u00A0профессиональному портфолио." },
];

const testimonials = [
  {
    id: 1,
    image: speaker1,
    name: "Марина",
    role: "учитель английского",
    text: "Пришла за\u00A0идеями — ушла с\u00A0тремя готовыми упражнениями которые использую до\u00A0сих пор. Сессия про лексику перевернула мой подход к\u00A0работе со\u00A0словами.",
  },
  {
    id: 2,
    image: speaker2,
    name: "Анна",
    role: "учитель английского",
    text: "Я\u00A0не\u00A0ожидала что профессиональное мероприятие может так заряжать. Уехала с\u00A0новыми идеями и\u00A0контактами коллег с\u00A0которыми до\u00A0сих пор общаюсь.",
  },
  {
    id: 3,
    image: speaker4,
    name: "Светлана",
    role: "преподаватель английского",
    text: "Ноябрь — самый тяжёлый месяц учебного года. После ProSkill Fest я\u00A0вспомнила почему вообще пошла в\u00A0эту профессию. Это дорогого стоит.",
  },
  {
    id: 4,
    image: speaker3,
    name: "Екатерина",
    role: "руководитель языкового центра «Космос», г.\u00A0Троицк",
    text: "Отправила двух педагогов — вернулись вдохновленными, отдохнувшими, мотивированными, с\u00A0идеями, готовыми пробовать новое. Теперь едем всей командой.",
  },
];

/* ---- page ---- */

const ProSkillFest = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <main className="relative overflow-hidden" style={{ backgroundColor: "#F2F2F2" }}>
      <Header variant="dark" />

      {/* Side flowers — full opacity, decorative */}
      <img src={flowersLeft} alt="" className="fixed top-0 left-0 h-full w-auto max-w-[200px] md:max-w-[280px] object-contain object-left pointer-events-none z-0 hidden lg:block" />
      <img src={flowersRight} alt="" className="fixed top-0 right-0 h-full w-auto max-w-[200px] md:max-w-[280px] object-contain object-right pointer-events-none z-0 hidden lg:block" />

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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.2em] text-white/60 mb-6"
            >
              Ежегодный фестиваль для педагогов · Ассоциация «Траектория Роста»
            </motion.p>

            {/* Date chip + Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-4xl"
            >
              <div className="flex items-start justify-between mb-2">
                <div />
                <span className="bg-program-fest text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full whitespace-nowrap">
                  7 ноября 2026
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-4">
                ProSkill{" "}
                <span className={gold}>Fest</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/85 max-w-2xl mb-8 font-normal normal-case leading-relaxed"
            >
              Один день в\u00A0году, когда учителя собираются не\u00A0на\u00A0конференцию — а\u00A0к\u00A0своим.
              Доклады от\u00A0практикующих педагогов, живое общение и\u00A0инструменты которые работают в\u00A0реальном классе.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {["Москва", "Регистрация открыта"].map((chip) => (
                <span key={chip} className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
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

      {/* ── ABOUT ── */}
      <section className="section-padding relative z-10">
        <div className="fluid-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl mb-8">
                Откуда это{" "}
                <span className={gold}>всё началось</span>
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed normal-case">
                <p>
                  Учителя учатся лучше всего у\u00A0других учителей. Не\u00A0у\u00A0авторов учебников
                  и\u00A0не\u00A0у\u00A0методистов из\u00A0академий — а\u00A0у\u00A0тех, кто каждый день заходит в\u00A0класс,
                  сталкивается с\u00A0теми же задачами и\u00A0находит решения которые реально работают.
                </p>
                <p>
                  Ассоциация «Траектория Роста» сделала ProSkill Fest именно из\u00A0этой идеи.
                  Никаких звёздных лекторов на\u00A0недосягаемой высоте — только практики, которые
                  честно рассказывают о\u00A0своих находках, инструментах и\u00A0ошибках.
                </p>
                <p>
                  С\u00A02025 года фестиваль собирает учителей английского из\u00A0разных городов России.
                  Каждый раз — новые темы, новые лица и\u00A0неизменное ощущение что ты наконец среди своих.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── AUDIENCE ── */}
      <section className="section-padding bg-foreground text-primary-foreground relative overflow-hidden">
        <div className="fluid-container relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl text-center mb-12">
              Кому{" "}
              <span className={gold}>сюда</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {audienceItems.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 flex gap-4 items-start">
                  <img src={item.image} alt="" className="w-12 h-12 object-contain shrink-0" />
                  <div>
                    <h3 className="text-lg text-white mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm normal-case leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMAT ── */}
      <section className="section-padding relative z-10">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl text-center mb-4">
              Как устроен{" "}
              <span className={gold}>день</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 normal-case">
              Весь день — очный формат в\u00A0Москве. Только живое общение.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {formatItems.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white border border-foreground/10 rounded-2xl p-6 h-full flex gap-4 items-start">
                  <img src={item.image} alt="" className="w-10 h-10 object-contain shrink-0" />
                  <div>
                    <h3 className="text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm normal-case leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden max-w-4xl mx-auto">
              <img
                src={sessionImg}
                alt="ProSkill Fest — формат дня"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROGRAM 2025 ── */}
      <section id="program" className="section-padding bg-foreground text-primary-foreground relative overflow-hidden">
        <div className="fluid-container relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl text-center mb-4">
              Как это было{" "}
              <span className={gold}>в 2025 году</span>
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto normal-case leading-relaxed">
              Программа каждого феста формируется заново — спикеры предлагают темы которые актуальны
              прямо сейчас в\u00A0их классах. Программа ProSkill Fest 2026 пока в\u00A0разработке,
              следите за\u00A0анонсами.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-2">
            {programSchedule.map((item, i) => {
              const isBreak = !item.speaker && (item.title.includes("Coffee") || item.title === "Q&A session" || item.title === "Closing Remarks");
              return (
                <AnimatedSection key={i} delay={i * 0.03}>
                  <div className={`flex gap-4 md:gap-6 p-4 rounded-xl ${isBreak ? "bg-white/5" : "bg-white/10 border border-white/10"}`}>
                    <span className="text-amber-300/80 text-sm font-mono whitespace-nowrap min-w-[120px] shrink-0">
                      {item.time}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm md:text-base normal-case">{item.title}</p>
                      {item.subtitle && (
                        <p className="text-white/50 text-sm normal-case">{item.subtitle}</p>
                      )}
                      {item.speaker && (
                        <p className="text-amber-300/70 text-xs mt-1 normal-case">
                          {item.speaker} · {item.school}
                        </p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SPEAKERS ── */}
      <section className="section-padding relative z-10">
        <div className="fluid-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl mb-4">
                Кто{" "}
                <span className={gold}>выступает</span>
              </h2>
              <p className="text-muted-foreground mb-6 normal-case leading-relaxed">
                Все спикеры ProSkill Fest — практикующие педагоги.
              </p>
              <p className="text-muted-foreground mb-8 normal-case leading-relaxed">
                Здесь нет приглашённых экспертов которые давно не\u00A0заходили в\u00A0класс.
                Любой учитель с\u00A0интересной темой и\u00A0полезными наработками может подать заявку
                на\u00A0выступление — из\u00A0школ Ассоциации и\u00A0не\u00A0только.
              </p>

              {/* Speaker grid */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                {[speaker1, speaker2, speaker3, speaker4, speaker1].map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={img}
                      alt={`Спикер ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground text-sm mb-6 normal-case">
                Спикеры ProSkill Fest 2026 пока объявляются. Если у\u00A0вас есть тема которой хочется
                поделиться с\u00A0коллегами — ждём вашу заявку.
              </p>
              <a href="#register" className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest">
                Подать заявку на выступление <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TAKEAWAYS ── */}
      <section className="section-padding bg-foreground text-primary-foreground relative overflow-hidden">
        <div className="fluid-container relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl text-center mb-12">
              Что вы{" "}
              <span className={gold}>заберёте с собой</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {takeaways.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 h-full flex gap-4 items-start">
                  <img src={item.image} alt="" className="w-12 h-12 object-contain shrink-0" />
                  <div>
                    <h3 className="text-lg text-white mb-3">{item.title}</h3>
                    <p className="text-white/70 text-sm normal-case leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding relative z-10">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl text-center mb-12">
              Что говорят те,{" "}
              <span className={gold}>кто был</span>
            </h2>
          </AnimatedSection>

          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-48 h-60 md:w-56 md:h-72 rounded-2xl object-cover shrink-0"
                />
                <div>
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed normal-case mb-6 italic">
                    «{testimonials[currentTestimonial].text}»
                  </p>
                  <p className="font-bold">{testimonials[currentTestimonial].name}</p>
                  <p className="text-muted-foreground text-sm normal-case">{testimonials[currentTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentTestimonial ? "bg-program-fest" : "bg-foreground/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="section-padding bg-foreground text-primary-foreground relative overflow-hidden">
        <div className="fluid-container relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl text-center mb-12">
              Где это{" "}
              <span className={gold}>происходит</span>
            </h2>
          </AnimatedSection>
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto items-center">
            <AnimatedSection className="flex-1">
              <img
                src={venueImg}
                alt="Loft Красный Октябрь"
                className="w-full rounded-2xl object-cover h-64 md:h-80"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="flex-1">
              <h3 className="text-xl text-white mb-4 normal-case">Loft Красный Октябрь</h3>
              <p className="text-white/70 normal-case leading-relaxed mb-6">
                В\u00A0самом сердце Москвы, на\u00A0Берсеневской набережной. Пространство которое располагает
                к\u00A0разговору: не\u00A0конференц-зал со\u00A0строгими рядами, а\u00A0живое место где удобно думать
                и\u00A0общаться.
              </p>
              <div className="space-y-3 text-white/80 text-sm normal-case">
                <div className="flex items-start gap-3">
                  <img src={leaves1} alt="" className="w-5 h-5 object-contain shrink-0 mt-0.5" />
                  <span>Берсеневская набережная, 6с3</span>
                </div>
                <div className="flex items-start gap-3">
                  <img src={leaves2} alt="" className="w-5 h-5 object-contain shrink-0 mt-0.5" />
                  <span>Кропоткинская или Полянка — 10\u00A0минут пешком</span>
                </div>
                <div className="flex items-start gap-3">
                  <img src={leaves3} alt="" className="w-5 h-5 object-contain shrink-0 mt-0.5" />
                  <span>Парковки на\u00A0площадке нет — удобнее приехать на\u00A0метро или такси</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PRICING / REGISTER ── */}
      <section id="register" className="section-padding relative z-10">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl text-center mb-12">
              7 ноября. Москва.{" "}
              <span className={gold}>Приходите.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-white border border-foreground/10 rounded-2xl p-8 h-full flex flex-col">
                <h3 className="text-xl mb-4">Для участников</h3>
                <p className="text-muted-foreground normal-case leading-relaxed mb-6 flex-1">
                  Для педагогов и\u00A0руководителей центров ассоциации участие бесплатное — фест существует
                  благодаря поддержке ассоциации.
                </p>
                <p className="text-muted-foreground/60 text-sm normal-case mb-6">
                  Стоимость для внешних участников уточняется.
                </p>
                <a href="#" className="btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest text-center">
                  Зарегистрироваться как участник
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-foreground text-primary-foreground rounded-2xl p-8 h-full flex flex-col">
                <h3 className="text-xl mb-4">Хотите выступить?</h3>
                <p className="text-white/70 normal-case leading-relaxed mb-6 flex-1">
                  ProSkill Fest строится на\u00A0том, что спикеры — такие\u00A0же практики как и\u00A0все в\u00A0зале.
                  Если у\u00A0вас есть тема, инструмент или опыт которым хочется поделиться — ждём заявку.
                </p>
                <a href="#" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl text-sm tracking-widest uppercase font-bold hover:bg-white/20 transition-colors text-center">
                  Подать заявку на выступление <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CROSS-LINKS ── */}
      <section className="section-padding bg-foreground text-primary-foreground">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl text-center mb-4">
              Хотите расти{" "}
              <span className={gold}>не только в ноябре?</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
            <AnimatedSection>
              <Link to="/uchitelya/kurs" className="block bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors h-full">
                <span className="text-xs text-amber-300/70 uppercase tracking-wider">Hilderstone College</span>
                <h3 className="text-lg text-white mt-2 mb-2">Teachers Development Course</h3>
                <p className="text-white/60 text-sm normal-case leading-relaxed mb-4">
                  Недельный онлайн-интенсив с\u00A0британскими тьюторами — готовые инструменты,
                  международный сертификат, живой формат.
                </p>
                <span className="text-amber-300 text-sm font-semibold inline-flex items-center gap-1">
                  Узнать подробнее <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <Link to="/partnerstvo" className="block bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors h-full">
                <span className="text-xs text-amber-300/70 uppercase tracking-wider">Для руководителей</span>
                <h3 className="text-lg text-white mt-2 mb-2">Партнёрство для центров</h3>
                <p className="text-white/60 text-sm normal-case leading-relaxed mb-4">
                  Руководите языковым центром? Узнайте о\u00A0партнёрстве с\u00A0Ассоциацией.
                </p>
                <span className="text-amber-300 text-sm font-semibold inline-flex items-center gap-1">
                  О\u00A0партнёрстве <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProSkillFest;
