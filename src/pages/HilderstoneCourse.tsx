import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, Monitor, GraduationCap, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";

import heroBg from "@/assets/hilderstone-hero.jpg";
import collegePic from "@/assets/hilderstone-college.jpg";
import teacherPic from "@/assets/hilderstone-teacher.jpg";
import certificatePic from "@/assets/hilderstone-certificate.jpg";
import lessonPic from "@/assets/hilderstone-lesson.jpg";
import illustChina from "@/assets/illust-china.png";
import illustSea from "@/assets/illust-starfish.png";
import illustAltai from "@/assets/illust-altai.png";
import illustUae from "@/assets/illust-uae.png";

/* ---- data ---- */

const formatFeatures = [
  { icon: Calendar, text: "10 занятий за две недели, каждый день кроме выходных" },
  { icon: Clock, text: "11:15 - 12:45 по московскому времени" },
  { icon: Users, text: "Группа до 12 человек - живое общение, не лекция" },
  { icon: Monitor, text: "Zoom" },
  { icon: GraduationCap, text: "Дипломированный преподаватель из Великобритании" },
  { icon: BookOpen, text: "Официальный сертификат Hilderstone College по окончании" },
];

const testimonials = [
  { id: 1, image: "https://placehold.co/400x700/d4a017/ffffff?text=Отзыв+1", name: "Татьяна, Воронеж", role: "мама Лизы (10 лет)" },
  { id: 2, image: "https://placehold.co/400x700/d4a017/ffffff?text=Отзыв+2", name: "Елена, Москва", role: "мама Миши (13 лет)" },
  { id: 3, image: "https://placehold.co/400x700/d4a017/ffffff?text=Отзыв+3", name: "Артём, 14 лет", role: "Участник курса" },
];

const otherPrograms = [
  { title: "Китай", illustration: illustChina, illustClass: "h-24 w-auto", dates: "3-12 июня", price: "от 165 000 руб.", href: "/kanikuly/china" },
  { title: "Море", illustration: illustSea, illustClass: "h-20 w-auto", dates: "24 июня - 14 июля", price: "от 134 000 руб.", href: "/kanikuly/more" },
  { title: "Алтай", illustration: illustAltai, illustClass: "h-24 w-auto", dates: "10-25 июля", price: "от 95 000 руб.", href: "/kanikuly/altai" },
  { title: "Дубай", illustration: illustUae, illustClass: "h-24 w-auto", dates: "Даты уточняются", price: "от 145 000 руб.", href: "/kanikuly/uae" },
];

const whyPhotos = [collegePic, teacherPic, lessonPic];

/* ---- page ---- */

const HilderstoneCourse = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [whySlide, setWhySlide] = useState(0);
  const [whyPaused, setWhyPaused] = useState(false);

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
      <Header variant="light" />

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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95]">
                <span className="relative block w-fit">
                  <span className="flex items-center justify-between gap-6 mb-4 md:absolute md:bottom-full md:left-0 md:right-0 md:mb-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm md:text-base font-semibold uppercase tracking-wider px-5 py-2 rounded-full whitespace-nowrap">
                      Онлайн · Hilderstone College, Великобритания
                    </span>
                    <span className="inline-block bg-program-online text-white text-sm md:text-base font-bold uppercase tracking-wider px-5 py-2 rounded-full whitespace-nowrap">
                      Июнь 2026
                    </span>
                  </span>
                  <span className="block whitespace-nowrap">
                    <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">Британский преподаватель.</span>
                  </span>
                </span>
                <span className="block">Из дома.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-white/85 max-w-2xl font-normal normal-case leading-relaxed mb-8"
            >
              Эксклюзивная языковая практика в партнёрстве с престижным британским колледжем Hilderstone — для детей и подростков от 11 лет. Тот самый английский, ради которого едут в Англию.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {["Июнь 2026", "10 занятий", "Группа до 12 человек", "От 11 лет"].map((chip) => (
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
              Записаться — 28 500 руб.
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── For whom and when ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-14">
                Два способа провести лето <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">с пользой</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedSection delay={0.1}>
                <div className="bg-program-online/10 rounded-[1.5rem] p-8 md:p-10 h-full">
                  <span className="text-3xl mb-4 block">📚</span>
                  <h3 className="text-xl md:text-2xl text-foreground mb-4">Едете в поездку — готовьтесь заранее</h3>
                  <p className="text-muted-foreground text-base font-normal normal-case leading-relaxed mb-6">
                    Записались в тур в Китай или лагерь? Первая смена проходит в начале июня — как раз до отъезда. Ребёнок приедет уже разогретым: с живым языком в голове, а не школьными правилами.
                  </p>
                  <div className="bg-white rounded-xl px-5 py-4">
                    <p className="text-foreground font-bold text-sm uppercase tracking-wider mb-1">Смена 1</p>
                    <p className="text-muted-foreground text-sm font-normal normal-case">1 - 12 июня · 11:15 - 12:45 ежедневно (кроме выходных)</p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-program-online/10 rounded-[1.5rem] p-8 md:p-10 h-full">
                  <span className="text-3xl mb-4 block">🏠</span>
                  <h3 className="text-xl md:text-2xl text-foreground mb-4">Остаётесь дома — проводите лето с результатом</h3>
                  <p className="text-muted-foreground text-base font-normal normal-case leading-relaxed mb-6">
                    Не получается поехать в этом году? Две недели с британским преподавателем — реальная языковая среда, живая группа и официальный сертификат. Не просто «позанимались онлайн».
                  </p>
                  <div className="bg-white rounded-xl px-5 py-4">
                    <p className="text-foreground font-bold text-sm uppercase tracking-wider mb-1">Смена 2</p>
                    <p className="text-muted-foreground text-sm font-normal normal-case">15 - 26 июня · 11:15 - 12:45 ежедневно (кроме выходных)</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why serious — 50/50 text + stacked carousel ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-10">
                Hilderstone College — это не просто <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">красивое название</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="lg:w-1/2 space-y-6">
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Hilderstone College — британский колледж с многолетней историей преподавания английского как иностранного. Преподаватели колледжа работают с учениками со всего мира, и этот курс — не адаптация для галочки, а полноценная языковая практика по британским стандартам.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Ребёнок занимается с дипломированным специалистом из Великобритании в живой группе — не смотрит записанные видео и не проходит тесты в приложении. 90 минут каждый день, десять дней подряд. Это работает иначе, чем один урок в неделю.
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
                            className="absolute inset-0"
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

      {/* ── Format and program ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-white mb-14">
              Как устроены <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">занятия</span>
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <AnimatedSection delay={0.1}>
              <div className="space-y-5">
                {formatFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                      <f.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-white/90 text-base md:text-lg font-normal normal-case leading-relaxed pt-1.5">{f.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white/10 backdrop-blur-sm rounded-[1.5rem] p-8 md:p-10">
                <h3 className="text-xl md:text-2xl text-white mb-4">Что происходит на занятиях</h3>
                <p className="text-white/80 text-base font-normal normal-case leading-relaxed">
                  Программа строится на живом общении — не на переводе и зубрёжке. Ребята расширяют словарный запас, учатся говорить уверенно и получают настоящее погружение в языковую среду. Каждое занятие — новая тема, новые слова в контексте, практика в разговоре.
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
              <h2 className="text-4xl md:text-6xl text-foreground mb-10">
                Официальный сертификат <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">британского колледжа</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="lg:w-1/2 space-y-6">
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    По окончании курса каждый участник пишет онлайн-тест по пройденным темам и получает официальный сертификат Hilderstone College. Это не бумажка для мамы на холодильник — это реальный документ британского учебного заведения, который можно добавить в портфолио.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Для подростков, которые думают о поступлении или хотят выделиться — это весомо.
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
        <div className="bg-testimonial-yellow rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-4">
                Что говорят <span className="text-program-online">участники</span>
              </h2>
              <p className="text-foreground/60 text-lg mb-12 max-w-xl font-normal normal-case">
                Отзывы семей, чьи дети прошли курс с Hilderstone College.
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
      <section className="section-padding" id="forma">
        <div className="fluid-container">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left photo */}
              <div className="hidden lg:block flex-1">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={lessonPic} alt="Онлайн занятие" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Receipt */}
              <div className="bg-white rounded-[1.5rem] w-full lg:w-[480px] shrink-0 px-8 py-10 shadow-2xl">
                <div className="text-center border-b-2 border-dashed border-foreground/20 pb-6 mb-6">
                  <h2 className="text-2xl md:text-3xl text-foreground mb-1">Британское лето начинается в июне</h2>
                  <p className="text-sm text-muted-foreground font-normal normal-case">Hilderstone College · Июнь 2026</p>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-end justify-between">
                    <span className="text-muted-foreground text-sm font-normal normal-case">Стоимость</span>
                    <span className="text-3xl md:text-4xl font-bold text-foreground">28 500 руб.</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-normal normal-case leading-relaxed">
                    За одну смену на выбор
                  </p>
                </div>
                <p className="text-muted-foreground text-xs font-normal normal-case leading-relaxed mb-6">
                  Оставьте заявку — менеджер свяжется, уточнит уровень ребёнка и поможет выбрать подходящую смену.
                </p>
                <div className="border-t-2 border-dashed border-foreground/20 pt-6">
                  <a
                    href="#forma"
                    className="block w-full text-center btn-gold px-6 py-4 rounded-2xl text-sm tracking-widest"
                  >
                    Записаться
                  </a>
                </div>
              </div>

              {/* Right photo */}
              <div className="hidden lg:block flex-1">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={collegePic} alt="Hilderstone College" className="w-full h-full object-cover" />
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
              <h2 className="text-4xl md:text-6xl text-foreground mb-4">
                Хотите больше чем <span className="text-program-online">онлайн?</span>
              </h2>
              <p className="text-foreground/60 text-lg mb-14 max-w-2xl font-normal normal-case">
                Языковая практика — хорошее начало или отличное дополнение. Но живое погружение работает иначе.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {otherPrograms.map((p, i) => (
                <AnimatedSection key={p.title} delay={i * 0.08}>
                  <a
                    href={p.href}
                    className="group block rounded-[1.5rem] border border-border hover:border-program-online/30 p-8 transition-all duration-500 hover:shadow-lg bg-card h-full text-center"
                  >
                    <img src={p.illustration} alt={p.title} className={`${p.illustClass} mx-auto mb-4 object-contain`} />
                    <h3 className="text-lg md:text-xl text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground font-normal normal-case mb-2">{p.dates}</p>
                    <p className="text-base font-bold text-foreground mb-4">{p.price}</p>
                    <span className="inline-block btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest">
                      Подробнее
                    </span>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HilderstoneCourse;
