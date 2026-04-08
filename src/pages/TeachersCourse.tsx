import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ContactFormModal from "@/components/ContactFormModal";

const heroBg = "/assets/hilderstone-hero.jpg";
const collegePic = "/assets/hilderstone-college.jpg";
const collegePicSection = "/assets/hilderstone-college-tc-section.jpg";
const collegePicReceipt = "/assets/hilderstone-college-tc-receipt.jpg";
const teacherPic = "/assets/hilderstone-teacher.jpg";
const teacherPicReceipt = "/assets/hilderstone-teacher-tc-receipt.jpg";
const certificatePic = "/assets/hilderstone-certificate.jpg";
const lessonPic = "/assets/hilderstone-lesson.jpg";

const illustMethods = "/assets/illust-teacher-methods.png";
const illustOnline = "/assets/illust-teacher-online.png";
const illustCert = "/assets/illust-teacher-cert.png";
const illustEnergy = "/assets/illust-teacher-energy.png";

const outcomeTelegram = "/assets/outcome-telegram.jpg";
const outcomeMaterials = "/assets/outcome-materials.jpg";
const outcomeRecording = "/assets/outcome-recording.jpg";

const testimonial1 = "/assets/testimonial-teacher-1.jpg";
const testimonial2 = "/assets/testimonial-teacher-2.jpg";
const testimonial3 = "/assets/testimonial-teacher-3.jpg";

/* ---- data ---- */

const testimonials = [
  { id: 1, image: testimonial1 },
  { id: 2, image: testimonial2 },
  { id: 3, image: testimonial3 },
];

const programDays = [
  { day: 1, title: "Language & Culture Unlocked", desc: "Как говорить с учениками о современном мире через язык. Современные медиа и культурный контекст, развитие межкультурной осознанности." },
  { day: 2, title: "The Lexicon Lab", desc: "Как превратить слова из списка в активный инструмент общения. Работа с лексикой без зубрёжки, практические инструменты." },
];

const forYouCards = [
  { text: "Вы преподаёте английский и хотите обновить методический арсенал", img: illustMethods },
  { text: "Ищете живой контакт с британской педагогической школой, а не записанные видео", img: illustOnline },
  { text: "Хотите получить международный сертификат без поездки в Великобританию", img: illustCert },
  { text: "Чувствуете что нужна свежая энергия и новые идеи до конца учебного года", img: illustEnergy },
];

const outcomes = [
  { title: "Готовые инструменты", text: "Приёмы, упражнения и подходы для работы с учениками любого возраста — проверенные в британских классах.", img: lessonPic },
  { title: "Свежий взгляд", text: "Иногда достаточно увидеть как другой педагог решает знакомую задачу — и всё встаёт на место. Это именно такой курс.", img: teacherPic },
  { title: "Международный сертификат", text: "Официальный сертификат Hilderstone College после сдачи онлайн-теста по окончании курса. Весомый документ для портфолио.", img: certificatePic },
  { title: "Мотивация до конца года", text: "Пять дней в среде людей которые горят своим делом — это работает лучше любого отпуска.", img: collegePic },
  { title: "💬 Telegram-чат с преподавателями", text: "Живое общение с британскими тьюторами и однокурсниками во время и после курса — для вопросов, обсуждений и нетворкинга.", img: outcomeTelegram },
  { title: "📁 Материалы навсегда", text: "Все презентации, задания и шаблоны курса собраны в папку и остаются у вас после окончания.", img: outcomeMaterials },
  { title: "🎬 Форс-мажор не проблема", text: "Пропустили занятие — мы записываем каждую сессию, сможете наверстать в удобное время.", img: outcomeRecording },
];

/* ---- gradient shorthand ---- */
const gold = "bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent";

/* ---- page ---- */

const TeachersCourse = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || zoomed !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide]);

  return (
    <main className="bg-program-teachers">
      <Header variant="light" buttonStyle="silver" />

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10 pt-20 lg:pt-0">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img src={heroBg} alt="Teachers Development Course" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4"
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white leading-[0.95]">
                <span className="relative block w-fit">
                  <span className="flex flex-wrap items-center gap-3 mb-4 md:absolute md:bottom-full md:left-0 md:mb-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm md:text-base font-semibold uppercase tracking-wider px-5 py-2 rounded-full whitespace-nowrap">
                      Курс повышения квалификации для педагогов
                    </span>
                    <span className="inline-block bg-program-teachers text-white text-sm md:text-base font-bold uppercase tracking-wider px-5 py-2 rounded-full whitespace-nowrap">
                      Июль 2026
                    </span>
                  </span>
                  <span className="block">
                    <span className={gold}>Rethink. Refresh.</span>
                  </span>
                </span>
                <span className="block">Inspire.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-white/85 max-w-2xl font-normal normal-case leading-relaxed mb-8"
            >
              Недельный интенсив с&nbsp;британскими тьюторами-практиками — готовые инструменты для уроков, свежий взгляд на&nbsp;свои методы и&nbsp;официальный сертификат Hilderstone College. Онлайн, из&nbsp;любого города.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {["13–17 июля 2026", "5 дней", "16,5 акад. часов", "Онлайн"].map((chip) => (
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
              Записаться — 32&nbsp;000&nbsp;₽
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── Для кого ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-14">
              Этот курс <span className={gold}>для вас</span>, если
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            {forYouCards.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-[1.5rem] bg-white/10 backdrop-blur-sm border border-white/15 p-8 h-full flex items-center gap-6">
                  <img src={item.img} alt="" className="w-20 h-20 md:w-24 md:h-24 object-contain shrink-0" />
                  <p className="text-white text-base md:text-lg font-normal normal-case leading-relaxed">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Почему Hilderstone ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-10">
                Почему именно <span className={gold}>Hilderstone College</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="lg:w-1/2 space-y-6">
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Hilderstone College — британский колледж с&nbsp;многолетней историей преподавания английского как иностранного. Команда колледжа работает с&nbsp;учениками со&nbsp;всего мира и&nbsp;понимает как выглядит реальный класс — не&nbsp;идеальный из&nbsp;учебника по&nbsp;методике, а&nbsp;живой, со&nbsp;всеми его сложностями.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Этот курс — не&nbsp;адаптация чужих материалов и&nbsp;не&nbsp;пересказ теорий. Британские тьюторы-практики ведут занятия сами, в&nbsp;прямом эфире. Вы&nbsp;задаёте вопросы, обсуждаете задачи, получаете обратную связь.
                  </p>
                  <p className="text-foreground text-base md:text-lg font-medium normal-case leading-relaxed">
                    Сейчас найти такое сочетание — доступная цена, живой формат, международный сертификат и&nbsp;прямой контакт с&nbsp;британскими педагогами — действительно непросто.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <div className="rounded-[1.5rem] overflow-hidden shadow-2xl">
                    <img src={collegePicSection} alt="Hilderstone College" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Формат и расписание ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-14">
              Как устроена <span className={gold}>неделя</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Left column — 3 info cards stacked */}
            <div className="flex flex-col gap-5">
              <AnimatedSection delay={0.05}>
                <div className="rounded-[1.5rem] bg-white/10 backdrop-blur-sm border border-white/15 p-8 h-full">
                  <span className="text-xs uppercase tracking-wider text-white/50 font-medium block mb-4">Когда</span>
                  <p className="text-white text-xl font-bold mb-2">13–17 июля 2026</p>
                  <p className="text-white/70 text-sm font-normal normal-case">Понедельник — пятница, 5&nbsp;дней подряд</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="rounded-[1.5rem] bg-white/10 backdrop-blur-sm border border-white/15 p-8 h-full">
                  <span className="text-xs uppercase tracking-wider text-white/50 font-medium block mb-4">Формат</span>
                  <p className="text-white text-xl font-bold mb-2">Онлайн, Zoom</p>
                  <p className="text-white/70 text-sm font-normal normal-case">16,5&nbsp;академических часов интенсивной практики</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="rounded-[1.5rem] bg-white/10 backdrop-blur-sm border border-white/15 p-8 h-full">
                  <span className="text-xs uppercase tracking-wider text-white/50 font-medium block mb-4">Нагрузка</span>
                  <p className="text-white text-xl font-bold mb-2">2 сессии в день</p>
                  <p className="text-white/70 text-sm font-normal normal-case">По&nbsp;75&nbsp;минут каждая, перерыв 15&nbsp;мин</p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right column — daily schedule */}
            <AnimatedSection delay={0.2}>
              <div className="rounded-[1.5rem] bg-white/10 backdrop-blur-sm border border-white/15 p-8 md:p-10 h-full flex flex-col">
                <span className="text-xs uppercase tracking-wider text-white/50 font-medium block mb-8">Расписание дня</span>
                <div className="flex items-stretch gap-4 flex-1">
                  {/* Vertical timeline line */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                    <div className="flex-1 w-px bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/30 shrink-0" />
                    <div className="flex-1 w-px bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                  </div>
                  <div className="flex flex-col justify-between gap-4 py-0.5">
                    <div>
                      <p className="text-white font-bold text-base">11:15 — 12:30</p>
                      <p className="text-white/60 text-sm font-normal normal-case">Первая сессия · 75 мин</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm font-normal normal-case">☕ Перерыв · 15 мин</p>
                    </div>
                    <div>
                      <p className="text-white font-bold text-base">12:45 — 14:00</p>
                      <p className="text-white/60 text-sm font-normal normal-case">Вторая сессия · 75 мин</p>
                    </div>
                  </div>
                </div>
                <p className="text-white/70 text-sm font-normal normal-case leading-relaxed mt-8 pt-6 border-t border-white/10">
                  Достаточно насыщенно чтобы был результат, и&nbsp;достаточно компактно чтобы совместить с&nbsp;работой или&nbsp;отпуском.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Видео-блок ── */}
      <section className="section-padding px-3 md:px-6 xl:px-10">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-10">
              Обращение от <span className={gold}>преподавателей</span> Hilderstone&nbsp;College
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-[2rem] overflow-hidden" style={{ position: "relative", paddingTop: "56.25%", width: "100%" }}>
              <iframe
                src="https://kinescope.io/embed/sVNGfZfc8mmsgUjaD9RgR5"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                frameBorder="0"
                allowFullScreen
                style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Программа по дням ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-14">
                Что будет <span className={gold}>на курсе</span>
              </h2>
            </AnimatedSection>

            <div className="space-y-4">
              {programDays.map((d, i) => (
                <AnimatedSection key={d.day} delay={i * 0.06}>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 rounded-[1.2rem] border border-border p-6 md:p-8 bg-card">
                    <div className="shrink-0">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-program-teachers text-white text-lg font-bold">
                        {d.day}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl text-foreground mb-2">{d.title}</h3>
                      <p className="text-muted-foreground text-[15px] font-normal normal-case leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.2}>
              <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed mt-10 max-w-3xl">
                А&nbsp;дальше — работа с&nbsp;грамматикой, навыками и&nbsp;много практического дизайна уроков. Полная программа приходит после регистрации.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Что получите ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-14">
              Что вы <span className={gold}>получите</span> на&nbsp;курсе
            </h2>
          </AnimatedSection>

          {/* Desktop 3-col layout with video */}
          <div className="hidden xl:grid grid-cols-3 gap-5">
            {/* Row 1: 2 cards + video spanning 2 rows */}
            {outcomes.slice(0, 2).map((o, i) => (
              <AnimatedSection key={o.title} delay={i * 0.08}>
                <div className="rounded-[1.5rem] overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex-1">
                    <h3 className="text-lg text-white mb-3">{o.title}</h3>
                    <p className="text-white/75 text-[15px] font-normal normal-case leading-relaxed">{o.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={0.16} className="row-span-2">
              <div className="rounded-[1.5rem] overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm h-full">
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <iframe
                    src="https://kinescope.io/embed/dMrNW7kTLCSeUTysM3cE61"
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                    frameBorder="0"
                    allowFullScreen
                    style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
                  />
                </div>
              </div>
            </AnimatedSection>
            {/* Row 2: 2 cards */}
            {outcomes.slice(2, 4).map((o, i) => (
              <AnimatedSection key={o.title} delay={(i + 3) * 0.08}>
                <div className="rounded-[1.5rem] overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex-1">
                    <h3 className="text-lg text-white mb-3">{o.title}</h3>
                    <p className="text-white/75 text-[15px] font-normal normal-case leading-relaxed">{o.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
            {/* Row 3: 3 cards */}
            {outcomes.slice(4).map((o, i) => (
              <AnimatedSection key={o.title} delay={(i + 5) * 0.08}>
                <div className="rounded-[1.5rem] overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex-1">
                    <h3 className="text-lg text-white mb-3">{o.title}</h3>
                    <p className="text-white/75 text-[15px] font-normal normal-case leading-relaxed">{o.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Tablet 2-col layout with video */}
          <div className="hidden md:grid xl:hidden grid-cols-2 gap-5">
            {outcomes.slice(0, 2).map((o, i) => (
              <AnimatedSection key={o.title} delay={i * 0.08}>
                <div className="rounded-[1.5rem] overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex-1">
                    <h3 className="text-lg text-white mb-3">{o.title}</h3>
                    <p className="text-white/75 text-[15px] font-normal normal-case leading-relaxed">{o.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
            {outcomes.slice(2).map((o, i) => (
              <AnimatedSection key={o.title} delay={(i + 2) * 0.08}>
                <div className="rounded-[1.5rem] overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex-1">
                    <h3 className="text-lg text-white mb-3">{o.title}</h3>
                    <p className="text-white/75 text-[15px] font-normal normal-case leading-relaxed">{o.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={0.72} className="col-span-2">
              <div className="rounded-[1.5rem] overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm" style={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  src="https://kinescope.io/embed/dMrNW7kTLCSeUTysM3cE61"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Mobile 1-col layout */}
          <div className="grid md:hidden grid-cols-1 gap-5">
            {outcomes.map((o, i) => (
              <AnimatedSection key={o.title} delay={i * 0.08}>
                <div className="rounded-[1.5rem] overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex-1">
                    <h3 className="text-lg text-white mb-3">{o.title}</h3>
                    <p className="text-white/75 text-[15px] font-normal normal-case leading-relaxed">{o.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={0.56}>
              <div className="rounded-[1.5rem] overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm" style={{ position: "relative", paddingTop: "177.78%" }}>
                <iframe
                  src="https://kinescope.io/embed/dMrNW7kTLCSeUTysM3cE61"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Отзыв ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="rounded-[2rem] bg-white/10 backdrop-blur-sm border border-white/15 py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-4">
                Что говорят <span className={gold}>участники</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 max-w-xl font-normal normal-case">
                Отзывы педагогов, прошедших курс с&nbsp;Hilderstone College.
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

      {/* ── Цена и запись ── */}
      <section className="section-padding" id="price">
        <div className="fluid-container">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="hidden lg:block flex-1">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={teacherPicReceipt} alt="Преподаватель Hilderstone" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] w-full lg:w-[480px] shrink-0 px-8 py-10 shadow-2xl">
                <div className="text-center border-b-2 border-dashed border-foreground/20 pb-6 mb-6">
                  <h2 className="text-2xl md:text-3xl text-foreground mb-1">Июль 2026. Обновляем методику?</h2>
                  <p className="text-sm text-muted-foreground font-normal normal-case">Teachers Development Course · Hilderstone College</p>
                </div>

                <div className="space-y-3 mb-6 border-b-2 border-dashed border-foreground/20 pb-6">
                  {[
                    { l: "Длительность", v: "5 дней, 13–17 июля" },
                    { l: "Часы", v: "16,5 академических" },
                    { l: "Сессии", v: "2 × 75 мин. в день" },
                    { l: "Платформа", v: "Zoom" },
                    { l: "Сертификат", v: "Hilderstone College" },
                  ].map((r) => (
                    <div key={r.l} className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-normal normal-case">{r.l}</span>
                      <span className="text-foreground font-medium">{r.v}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-end justify-between">
                    <span className="text-muted-foreground text-sm font-normal normal-case">Стоимость</span>
                    <span className="text-3xl md:text-4xl font-bold text-foreground">32&nbsp;000&nbsp;₽</span>
                  </div>
                  <p className="text-sm font-semibold text-program-teachers text-right">Количество мест ограничено</p>
                </div>

                <p className="text-muted-foreground text-xs font-normal normal-case leading-relaxed mb-6">
                  Оставьте заявку — менеджер свяжется, ответит на&nbsp;вопросы и&nbsp;пришлёт детальную программу курса.
                </p>

                <div className="border-t-2 border-dashed border-foreground/20 pt-6 space-y-4">
                  <button
                    onClick={() => setFormOpen(true)}
                    className="block w-full text-center btn-gold px-6 py-4 rounded-2xl text-sm tracking-widest"
                  >
                    Записаться на курс →
                  </button>

                  <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                    <a href="mailto:rost-traektoria@yandex.ru" className="hover:text-foreground transition-colors">rost-traektoria@yandex.ru</a>
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground/60 font-normal normal-case mt-4 text-center">
                  Нажимая кнопку, вы&nbsp;соглашаетесь на&nbsp;обработку персональных данных в&nbsp;соответствии со&nbsp;ст.&nbsp;9&nbsp;ФЗ-152.
                </p>
              </div>

              <div className="hidden lg:block flex-1">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={collegePicReceipt} alt="Hilderstone College" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Другие программы для педагогов ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 mb-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-4">
                Есть ещё один <span className={gold}>формат</span>
              </h2>
              <p className="text-foreground/60 text-lg mb-14 max-w-2xl font-normal normal-case">
                Онлайн — хорошо. Но&nbsp;живое профессиональное мероприятие работает иначе.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedSection delay={0.05}>
                <div className="rounded-[1.5rem] border border-border bg-card p-8 md:p-10 h-full flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 block">
                    ProSkill Fest · 7 ноября 2026 · Москва
                  </span>
                  <h3 className="text-xl md:text-2xl text-foreground mb-4 leading-tight">
                    Ежегодный фестиваль для учителей английского
                  </h3>
                  <p className="text-muted-foreground text-[15px] font-normal normal-case leading-relaxed mb-8 flex-1">
                    Доклады от&nbsp;практикующих педагогов, нетворкинг и&nbsp;атмосфера в&nbsp;которой хочется снова полюбить свою профессию.
                  </p>
                  <a href="/uchitelya/fest" className="inline-block btn-gold px-6 py-3 rounded-xl text-sm tracking-widest self-start">
                    Узнать подробнее →
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.12}>
                <div className="rounded-[1.5rem] border border-border bg-card p-8 md:p-10 h-full flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 block">
                    Для руководителей
                  </span>
                  <h3 className="text-xl md:text-2xl text-foreground mb-4 leading-tight">
                    Хотите отправить на&nbsp;курс команду?
                  </h3>
                  <p className="text-muted-foreground text-[15px] font-normal normal-case leading-relaxed mb-8 flex-1">
                    Руководите языковым центром и&nbsp;хотите отправить на&nbsp;курс нескольких педагогов? Расскажем о&nbsp;возможностях для центров-партнёров.
                  </p>
                  <a href="/partnerstvo" className="inline-block btn-gold px-6 py-3 rounded-xl text-sm tracking-widest self-start">
                    О партнёрстве для центров →
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      <Footer variant="white" />
      <FloatingButtons arrowColor="hsl(var(--program-teachers))" />
      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} program="Курс повышения квалификации Hilderstone" page="TeachersCourse" />
    </main>
  );
};

export default TeachersCourse;
