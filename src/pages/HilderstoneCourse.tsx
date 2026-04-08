import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import PhotoLightbox from "@/components/PhotoLightbox";
import ContactFormModal from "@/components/ContactFormModal";

import heroBg from "@/assets/hilderstone-hero.jpg";
import collegePic from "@/assets/hilderstone-college.jpg";
import collegePicShift1 from "@/assets/hilderstone-college-hc-shift1.jpg";
import collegePicReceipt from "@/assets/hilderstone-college-hc-receipt.jpg";
import teacherPic from "@/assets/hilderstone-teacher.jpg";
import teacherPicShift2 from "@/assets/hilderstone-teacher-hc-shift2.jpg";
import certificatePic from "@/assets/hilderstone-certificate.jpg";
import lessonPic from "@/assets/hilderstone-lesson.jpg";
import lessonPicReceipt from "@/assets/hilderstone-lesson-hc-receipt.jpg";
import illustChina from "@/assets/illust-china.png";
import illustSea from "@/assets/illust-starfish.png";
import illustAltai from "@/assets/illust-altai.png";
import illustUae from "@/assets/illust-uae.svg";

/* ---- data ---- */

const testimonials = [
  { id: 1, image: "https://placehold.co/400x700/d4a017/ffffff?text=Отзыв+1" },
  { id: 2, image: "https://placehold.co/400x700/d4a017/ffffff?text=Отзыв+2" },
  { id: 3, image: "https://placehold.co/400x700/d4a017/ffffff?text=Отзыв+3" },
];

const otherPrograms = [
  { title: "Китай", illustration: illustChina, dates: "3–12 июня", price: "от 165 000 руб.", href: "/kanikuly/china" },
  { title: "Море", illustration: illustSea, dates: "24 июня — 14 июля", price: "от 134 000 руб.", href: "/kanikuly/more" },
  { title: "Алтай", illustration: illustAltai, dates: "10–25 июля", price: "от 95 000 руб.", href: "/kanikuly/altai" },
  { title: "Дубай", illustration: illustUae, dates: "Даты уточняются", price: "от 145 000 руб.", href: "/kanikuly/uae" },
];

const whyPhotos = [collegePic, teacherPic, lessonPic];

/* ---- page ---- */

const HilderstoneCourse = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [whySlide, setWhySlide] = useState(0);
  const [whyPaused, setWhyPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || zoomed !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide]);

  useEffect(() => {
    if (whyPaused) return;
    const interval = setInterval(() => {
      setWhySlide((prev) => (prev + 1) % whyPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [whyPaused]);

  return (
    <main className="bg-program-online">
      <Header variant="light" buttonStyle="silver" />

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10 pt-20 lg:pt-0">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img src={heroBg} alt="Онлайн обучение английскому" className="absolute inset-0 w-full h-full object-cover" />
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
                      Онлайн · Hilderstone College, Великобритания
                    </span>
                    <span className="inline-block bg-program-online text-white text-sm md:text-base font-bold uppercase tracking-wider px-5 py-2 rounded-full whitespace-nowrap">
                      Июнь 2026
                    </span>
                  </span>
                  <span className="block">
                    <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">Британский преподаватель.</span>
                  </span>
                </span>
                <span className="block">Из&nbsp;дома.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-white/85 max-w-2xl font-normal normal-case leading-relaxed mb-8"
            >
              Эксклюзивная языковая практика в&nbsp;партнёрстве с&nbsp;престижным британским колледжем Hilderstone&nbsp;&mdash; для детей и&nbsp;подростков от&nbsp;11&nbsp;лет. Тот самый английский, ради которого едут в&nbsp;Англию.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {["10 занятий", "Группа до 12 человек", "От 11 лет"].map((chip) => (
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
              Записаться&nbsp;&mdash; 28&nbsp;500&nbsp;руб.
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── For whom and when ── */}
      <section className="section-padding">
        <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-14">
                Два способа провести лето <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">с&nbsp;пользой</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Shift 1 */}
              <AnimatedSection delay={0.1}>
                <div className="rounded-[1.5rem] overflow-hidden h-full flex flex-col bg-card border border-border">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={collegePicShift1} alt="Hilderstone College" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between gap-4">
                      <h3 className="text-2xl md:text-3xl text-white">Смена&nbsp;1</h3>
                      <span className="bg-gradient-to-r from-amber-400 via-amber-200 via-40% to-amber-500 text-foreground text-sm font-bold px-4 py-2 rounded-full whitespace-nowrap">
                        1&nbsp;&mdash; 12&nbsp;июня
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <p className="text-foreground text-sm font-medium mb-4 flex items-center gap-2">
                      <span className="text-muted-foreground">Ежедневно (кроме выходных)</span>
                      <span className="font-bold">11:15&nbsp;&mdash; 12:45</span>
                    </p>
                    <h4 className="text-base md:text-lg font-bold text-foreground normal-case mb-2">Первая смена</h4>
                    <p className="text-muted-foreground text-sm font-normal normal-case leading-relaxed">
                      Десять занятий с&nbsp;британским преподавателем в&nbsp;мини-группе. Живой язык, реальные задания и&nbsp;уверенность, которая остаётся надолго.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Shift 2 */}
              <AnimatedSection delay={0.2}>
                <div className="rounded-[1.5rem] overflow-hidden h-full flex flex-col bg-card border border-border">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={teacherPicShift2} alt="Преподаватель Hilderstone" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between gap-4">
                      <h3 className="text-2xl md:text-3xl text-white">Смена&nbsp;2</h3>
                      <span className="bg-gradient-to-r from-amber-400 via-amber-200 via-40% to-amber-500 text-foreground text-sm font-bold px-4 py-2 rounded-full whitespace-nowrap">
                        15&nbsp;&mdash; 26&nbsp;июня
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <p className="text-foreground text-sm font-medium mb-4 flex items-center gap-2">
                      <span className="text-muted-foreground">Ежедневно (кроме выходных)</span>
                      <span className="font-bold">11:15&nbsp;&mdash; 12:45</span>
                    </p>
                    <h4 className="text-base md:text-lg font-bold text-foreground normal-case mb-2">Остаётесь дома&nbsp;&mdash; проводите лето с&nbsp;результатом</h4>
                    <p className="text-muted-foreground text-sm font-normal normal-case leading-relaxed">
                      Не&nbsp;получается поехать в&nbsp;этом году? Две недели с&nbsp;британским преподавателем&nbsp;&mdash; реальная языковая среда, живая группа и&nbsp;официальный сертификат. Не&nbsp;просто «позанимались онлайн».
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
        </div>
      </section>

      {/* ── Why serious — 50/50 text + stacked carousel ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-10">
                Hilderstone College&nbsp;&mdash; это не&nbsp;просто название
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="lg:w-1/2 space-y-6">
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Hilderstone College&nbsp;&mdash; британский колледж с&nbsp;многолетней историей преподавания английского как иностранного. Преподаватели колледжа работают с&nbsp;учениками со&nbsp;всего мира, и&nbsp;этот курс&nbsp;&mdash; не&nbsp;адаптация для галочки, а&nbsp;полноценная языковая практика по&nbsp;британским стандартам.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Ребёнок занимается с&nbsp;дипломированным специалистом из&nbsp;Великобритании в&nbsp;живой группе&nbsp;&mdash; не&nbsp;смотрит записанные видео и&nbsp;не&nbsp;проходит тесты в&nbsp;приложении. 90&nbsp;минут каждый день, десять дней подряд. Это работает иначе, чем один урок в&nbsp;неделю.
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
                              <img src={photo} alt="Hilderstone College" className="w-full h-full object-cover" />
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

      {/* ── What happens in lessons + Kinescope video ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-14">
              Что происходит на&nbsp;занятиях
            </h2>
          </AnimatedSection>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
            <AnimatedSection delay={0.2} className="w-full lg:w-[320px] flex-shrink-0">
              <div className="rounded-[1.5rem] overflow-hidden w-full" style={{ position: 'relative', paddingBottom: '177.78%' }}>
                <iframe
                  src="https://kinescope.io/embed/my6qHzv5AXLiPmktJFqVJn"
                  allow="fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="flex-1 flex items-center">
              <div className="space-y-6">
                <p className="text-white/90 text-base md:text-lg font-normal normal-case leading-relaxed">
                  Программа строится на&nbsp;живом общении&nbsp;&mdash; не&nbsp;на&nbsp;переводе и&nbsp;зубрёжке. Ребята расширяют словарный запас, учатся говорить уверенно и&nbsp;получают настоящее погружение в&nbsp;языковую среду.
                </p>
                <p className="text-white/90 text-base md:text-lg font-normal normal-case leading-relaxed">
                  Каждое занятие&nbsp;&mdash; новая тема, новые слова в&nbsp;контексте, практика в&nbsp;разговоре. 90&nbsp;минут каждый день, десять дней подряд&nbsp;&mdash; это не&nbsp;«позанимались онлайн», а&nbsp;реальный интенсив.
                </p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── Certificate ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-10">
                Официальный сертификат британского колледжа
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="lg:w-1/2 space-y-6">
                    <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                      По&nbsp;окончании курса каждый участник проходит онлайн-тестирование по&nbsp;изученным темам и&nbsp;получает официальный сертификат Hilderstone College. Такой сертификат можно добавить в&nbsp;портфолио: он&nbsp;подтверждает, что участник прошёл программу и&nbsp;освоил темы курса.
                    </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Для подростков, которые думают о&nbsp;поступлении или хотят выделиться&nbsp;&mdash; это весомо.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <div className="rounded-[1.5rem] overflow-hidden shadow-2xl">
                    <img src={certificatePic} alt="Сертификат Hilderstone College" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="rounded-[2rem] bg-white/10 backdrop-blur-sm border border-white/15 py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-4">
                Что говорят <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">участники</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 max-w-xl font-normal normal-case">
                Отзывы семей, чьи дети прошли курс с&nbsp;Hilderstone College.
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
      <section className="section-padding" id="price">
        <div className="fluid-container">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left photo */}
              <div className="hidden lg:block flex-1">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={lessonPicReceipt} alt="Онлайн занятие" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Receipt */}
              <div className="bg-white rounded-[1.5rem] w-full lg:w-[480px] shrink-0 px-8 py-10 shadow-2xl">
                <div className="text-center border-b-2 border-dashed border-foreground/20 pb-6 mb-6">
                  <h2 className="text-2xl md:text-3xl text-foreground mb-1">Британское лето начинается в&nbsp;июне</h2>
                  <p className="text-sm text-muted-foreground font-normal normal-case">Hilderstone College · Июнь 2026</p>
                </div>

                {/* Format details moved here */}
                <div className="space-y-3 mb-6 border-b-2 border-dashed border-foreground/20 pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-normal normal-case">Занятий</span>
                    <span className="text-foreground font-medium">10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-normal normal-case">Время</span>
                    <span className="text-foreground font-medium">11:15&nbsp;&mdash; 12:45 (мск)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-normal normal-case">Группа</span>
                    <span className="text-foreground font-medium">до&nbsp;12&nbsp;человек</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-normal normal-case">Платформа</span>
                    <span className="text-foreground font-medium">Zoom</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-normal normal-case">Преподаватель</span>
                    <span className="text-foreground font-medium">из&nbsp;Великобритании</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-normal normal-case">Сертификат</span>
                    <span className="text-foreground font-medium">Hilderstone College</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-end justify-between">
                    <span className="text-muted-foreground text-sm font-normal normal-case">Стоимость</span>
                    <span className="text-3xl md:text-4xl font-bold text-foreground">28&nbsp;500&nbsp;руб.</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-normal normal-case leading-relaxed">
                    За&nbsp;одну смену на&nbsp;выбор
                  </p>
                </div>
                <p className="text-muted-foreground text-xs font-normal normal-case leading-relaxed mb-6">
                  Оставьте заявку&nbsp;&mdash; менеджер свяжется, уточнит уровень ребёнка и&nbsp;поможет выбрать подходящую смену.
                </p>
                <div className="border-t-2 border-dashed border-foreground/20 pt-6">
                  <button
                    onClick={() => setFormOpen(true)}
                    className="block w-full text-center btn-gold px-6 py-4 rounded-2xl text-sm tracking-widest"
                  >
                    Записаться
                  </button>
                </div>
              </div>

              {/* Right photo */}
              <div className="hidden lg:block flex-1">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={collegePicReceipt} alt="Hilderstone College" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Other programs ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 mb-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-4">
                Хотите больше чем&nbsp;онлайн?
              </h2>
              <p className="text-foreground/60 text-lg mb-14 max-w-2xl font-normal normal-case">
                Языковая практика&nbsp;&mdash; хорошее начало или отличное дополнение. Но&nbsp;живое погружение работает иначе.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {otherPrograms.map((p, i) => (
                <AnimatedSection key={p.title} delay={i * 0.08}>
                  <a
                    href={p.href}
                    className="group flex flex-col rounded-[1.5rem] border border-border hover:border-program-online/30 p-8 transition-all duration-500 hover:shadow-lg bg-card h-full text-center"
                  >
                    <div className="h-24 flex items-center justify-center mb-4">
                      <img src={p.illustration} alt={p.title} className="h-full w-auto object-contain" />
                    </div>
                    <h3 className="text-lg md:text-xl text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground font-normal normal-case mb-2">{p.dates}</p>
                    <p className="text-base font-bold text-foreground mb-4">{p.price}</p>
                    <div className="mt-auto">
                      <span className="inline-block btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest">
                        Подробнее
                      </span>
                    </div>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer variant="white" />
      <FloatingButtons arrowColor="hsl(var(--program-online))" />
      <PhotoLightbox photos={whyPhotos} initialIndex={lightboxIndex} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} program="Онлайн-практика Hilderstone" page="HilderstoneCourse" />
    </main>
  );
};

export default HilderstoneCourse;
