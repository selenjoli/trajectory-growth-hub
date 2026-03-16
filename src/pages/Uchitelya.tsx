import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/teachers-hero.jpg";
import courseImg from "@/assets/teachers-online-course.jpg";
import festImg from "@/assets/teachers-festival.jpg";
import whyImg from "@/assets/teachers-why.jpg";

/* ─── data ─── */

const testimonials = [
  {
    id: 1,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+1",
    name: "Наталья, Москва",
    role: "преподаватель",
  },
  {
    id: 2,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+2",
    name: "Анна, Москва",
    role: "учитель английского",
  },
  {
    id: 3,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+3",
    name: "Елена, Москва",
    role: "преподаватель",
  },
];

const benefits = [
  {
    title: "Готовые инструменты",
    text: "Не\u00A0теория про методику, а\u00A0конкретные приёмы которые работают в\u00A0классе — с\u00A0учениками любого возраста и\u00A0уровня.",
  },
  {
    title: "Международный сертификат",
    text: "Официальный документ Hilderstone College или сертификат участника ProSkill Fest — весомое дополнение к\u00A0портфолио.",
  },
  {
    title: "Профессиональное сообщество",
    text: "Коллеги из\u00A0других городов и\u00A0школ, которые думают так\u00A0же. Это редкость и\u00A0ценность сама по\u00A0себе.",
  },
];

/* ─── page ─── */

const Uchitelya = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || zoomed !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide]);

  return (
    <main className="space-y-4">
      <Header />

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img
            src={heroImg}
            alt="Преподаватели на профессиональном фестивале"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-6"
            >
              Программы для педагогов · 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-[0.95] mb-4 max-w-4xl"
            >
              Для учителей,
              <br />
              которые хотят <span className="text-accent">расти</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
            >
              <p className="text-base md:text-lg text-primary-foreground/85 max-w-lg font-normal normal-case leading-relaxed">
                Два формата — онлайн-интенсив с&nbsp;британскими преподавателями и&nbsp;живой профессиональный фестиваль. Для тех, кому важно не&nbsp;просто отсидеть курс повышения квалификации, а&nbsp;получить что-то настоящее.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="#programs"
                  className="inline-block btn-gold px-8 py-4 rounded-2xl transition-all text-sm tracking-widest text-center"
                >
                  Онлайн-курс ↓
                </a>
                <a
                  href="#programs"
                  className="inline-block btn-silver px-8 py-4 rounded-2xl transition-all text-sm tracking-widest text-center"
                >
                  ProSkill Fest ↓
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Two programs — structured cards ── */}
      <section id="programs" className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-14">
              Что у&nbsp;нас <span className="text-accent">есть</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Card 1 — online course */}
            <AnimatedSection delay={0.05}>
              <div className="rounded-[1.5rem] border border-border bg-card h-full flex flex-col overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img src={courseImg} alt="Онлайн-курс с британскими преподавателями" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 block">
                    Teachers Development Course · Hilderstone College
                  </span>
                  <h3 className="text-xl md:text-2xl text-foreground mb-5 leading-tight">
                    Онлайн-курс с&nbsp;британскими тьюторами
                  </h3>
                  <p className="text-muted-foreground text-[15px] font-normal normal-case leading-relaxed mb-6">
                    Недельный интенсив с&nbsp;британскими тьюторами-практиками — готовые инструменты для уроков, свежий взгляд на&nbsp;свои методы и&nbsp;официальный сертификат британского колледжа.
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      { label: "Формат", value: "Онлайн, живые занятия" },
                      { label: "Длительность", value: "5 дней, 13–17 июля 2026" },
                      { label: "Сертификат", value: "Hilderstone College, Великобритания" },
                      { label: "Стоимость", value: "32\u00A0000\u00A0₽" },
                    ].map((row) => (
                      <li key={row.label} className="flex items-baseline gap-3">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground shrink-0 w-28">{row.label}</span>
                        <span className="text-sm text-foreground font-medium">{row.value}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="/uchitelya/kurs" className="inline-block btn-gold px-6 py-3 rounded-xl text-sm tracking-widest self-start">
                    Подробнее о&nbsp;курсе →
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 2 — festival */}
            <AnimatedSection delay={0.12}>
              <div className="rounded-[1.5rem] border border-border bg-card h-full flex flex-col overflow-hidden">
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 block">
                    ProSkill Fest · Ежегодный фестиваль для педагогов
                  </span>
                  <h3 className="text-xl md:text-2xl text-foreground mb-5 leading-tight">
                    Живой фестиваль в&nbsp;Москве
                  </h3>
                  <p className="text-muted-foreground text-[15px] font-normal normal-case leading-relaxed mb-6">
                    Доклады от&nbsp;практикующих учителей, мастер-классы, нетворкинг и&nbsp;атмосфера, в&nbsp;которой хочется снова полюбить свою профессию. Создан учителями для учителей.
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      { label: "Формат", value: "Очный, полный день" },
                      { label: "Дата", value: "7 ноября 2026" },
                      { label: "Место", value: "Москва" },
                      { label: "Сертификат", value: "Сертификат участника" },
                    ].map((row) => (
                      <li key={row.label} className="flex items-baseline gap-3">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground shrink-0 w-28">{row.label}</span>
                        <span className="text-sm text-foreground font-medium">{row.value}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="/uchitelya/fest" className="inline-block btn-gold px-6 py-3 rounded-xl text-sm tracking-widest self-start">
                    Подробнее о&nbsp;фестивале →
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Why it matters — problem → solution layout ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-14">
              Честно о&nbsp;том, зачем <span className="text-accent">это нужно</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
            {/* Problem */}
            <AnimatedSection delay={0.05}>
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 block">Проблема</span>
                <p className="text-foreground text-lg md:text-xl font-medium normal-case leading-relaxed mb-4">
                  Найти качественные курсы повышения квалификации для учителя английского — задача не&nbsp;такая простая.
                </p>
                <p className="text-muted-foreground text-base font-normal normal-case leading-relaxed">
                  Большинство предложений на&nbsp;рынке — это либо дорого и&nbsp;далеко, либо дёшево и&nbsp;без реального результата.
                </p>
              </div>
            </AnimatedSection>

            {/* Solution */}
            <AnimatedSection delay={0.15}>
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 block">Наш ответ</span>
                <p className="text-foreground text-lg md:text-xl font-medium normal-case leading-relaxed mb-4">
                  Партнёрство с&nbsp;Hilderstone College даёт прямой доступ к&nbsp;британским педагогам-практикам.
                </p>
                <p className="text-muted-foreground text-base font-normal normal-case leading-relaxed">
                  Людям, которые преподают каждый день и&nbsp;знают как это работает в&nbsp;реальном классе, а&nbsp;не&nbsp;в&nbsp;теории. ProSkill Fest — то&nbsp;же самое, но&nbsp;в&nbsp;живом формате и&nbsp;с&nbsp;коллегами из&nbsp;разных городов.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Result callout */}
          <AnimatedSection delay={0.2}>
            <div className="mt-14 border-l-4 border-accent pl-6 md:pl-8 max-w-3xl">
              <p className="text-foreground text-base md:text-lg font-medium normal-case leading-relaxed">
                Оба формата дают конкретный результат: инструменты которые можно применить на&nbsp;следующий день после занятия, и&nbsp;сертификат который говорит сам за&nbsp;себя.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── What you get — 3 columns ── */}
      <section className="section-padding section-alt">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-14">
              Что вы <span className="text-accent">заберёте</span> с&nbsp;собой
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-10">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.1}>
                <div className="border-t-2 border-primary pt-6">
                  <h3 className="text-base text-foreground mb-3">{b.title}</h3>
                  <p className="text-[15px] text-muted-foreground font-normal normal-case leading-relaxed">
                    {b.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials — green bg ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-accent rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-white mb-12">
                Что говорят участники
              </h2>
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
                            <p className="text-white font-bold text-base">{item.name}</p>
                            <p className="text-white/60 text-sm">{item.role}</p>
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

      {/* ── For school leaders ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-center rounded-[1.5rem] border border-border p-8 md:p-12 bg-card">
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 block">Для руководителей</span>
                <h2 className="text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                  Вы руководите школой или образовательным центром?
                </h2>
                <p className="text-muted-foreground text-base font-normal normal-case leading-relaxed">
                  Если хотите отправить на&nbsp;курс команду педагогов или узнать о&nbsp;партнёрстве с&nbsp;ассоциацией — у&nbsp;нас есть отдельная страница для руководителей.
                </p>
              </div>
              <a href="/partnerstvo" className="inline-block btn-gold px-8 py-4 rounded-xl text-sm tracking-widest shrink-0 self-center">
                О&nbsp;партнёрстве →
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-foreground rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-primary-foreground mb-6">
                Остались <span className="text-accent">вопросы?</span>
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mb-10 font-normal normal-case leading-relaxed">
                Напишите — расскажем подробнее о&nbsp;любой программе и&nbsp;поможем выбрать подходящий формат.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href="mailto:rost-traektoria@yandex.ru"
                  className="inline-block btn-gold px-8 py-4 rounded-xl text-sm tracking-widest"
                >
                  Написать нам →
                </a>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-6 text-primary-foreground/60 text-sm font-normal normal-case">
                <span>rost-traektoria@yandex.ru</span>
              </div>
              <p className="text-primary-foreground/40 text-xs mt-8 font-normal normal-case max-w-lg">
                Нажимая кнопку, вы соглашаетесь на&nbsp;обработку персональных данных в&nbsp;соответствии со&nbsp;ст.&nbsp;9 ФЗ-152.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Uchitelya;
