import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/teachers-hero.jpg";

/* ─── data ─── */

const testimonials = [
  {
    id: 1,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+1",
    name: "Наталья, Москва",
    role: "преподаватель",
    text: "После ProSkill Fest я\u00A0переработала два своих курса. Не\u00A0потому что надо было — а\u00A0потому что появились идеи и\u00A0энергия это сделать.",
  },
  {
    id: 2,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+2",
    name: "Анна, Москва",
    role: "учитель английского",
    text: "Я\u00A0не\u00A0ожидала что профессиональное мероприятие может так заряжать. Уехала с\u00A0тремя новыми идеями и\u00A0контактами коллег, с\u00A0которыми до\u00A0сих пор общаюсь.",
  },
  {
    id: 3,
    image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+3",
    name: "Елена, Москва",
    role: "преподаватель",
    text: "За\u00A0пять дней я\u00A0получила больше практических инструментов, чем за\u00A0последние два года курсов повышения квалификации. Так просто и\u00A0эффективно. Рекомендую.",
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

      {/* ── Two programs ── */}
      <section id="programs" className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-14">
              Что у&nbsp;нас <span className="text-accent">есть</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            <AnimatedSection delay={0.05}>
              <div className="rounded-[1.5rem] border border-border p-8 md:p-10 bg-card h-full flex flex-col">
                <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 block">Teachers Development Course · Hilderstone College</span>
                <h3 className="text-xl md:text-2xl text-foreground mb-4 leading-tight">
                  Онлайн-курс с&nbsp;британскими тьюторами
                </h3>
                <p className="text-muted-foreground text-[15px] font-normal normal-case leading-relaxed mb-6 flex-1">
                  Недельный интенсив с&nbsp;британскими тьюторами-практиками — готовые инструменты для уроков, свежий взгляд на&nbsp;свои методы и&nbsp;официальный сертификат британского колледжа. Всё это онлайн, не&nbsp;выезжая из&nbsp;города.
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="text-sm font-bold text-foreground">13 — 17 июля 2026</span>
                  <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-lg">
                    32 000 ₽
                  </span>
                </div>
                <a href="/uchitelya/kurs" className="inline-block btn-gold px-6 py-3 rounded-xl text-sm tracking-widest self-start">
                  Подробнее о&nbsp;курсе →
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <div className="rounded-[1.5rem] border border-border p-8 md:p-10 bg-card h-full flex flex-col">
                <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 block">ProSkill Fest · Ежегодный фестиваль для педагогов</span>
                <h3 className="text-xl md:text-2xl text-foreground mb-4 leading-tight">
                  Живой фестиваль в&nbsp;Москве
                </h3>
                <p className="text-muted-foreground text-[15px] font-normal normal-case leading-relaxed mb-6 flex-1">
                  Живое мероприятие в&nbsp;Москве — доклады от&nbsp;практикующих учителей, мастер-классы, нетворкинг и&nbsp;атмосфера, в&nbsp;которой хочется снова полюбить свою профессию. Создан учителями для учителей.
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="text-sm font-bold text-foreground">7 ноября 2026</span>
                  <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-lg">
                    Москва
                  </span>
                </div>
                <a href="/uchitelya/fest" className="inline-block btn-gold px-6 py-3 rounded-xl text-sm tracking-widest self-start">
                  Подробнее о&nbsp;фестивале →
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-6">
              Честно о&nbsp;том, зачем <span className="text-accent">это нужно</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="max-w-3xl space-y-6">
              <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                Найти качественные курсы повышения квалификации для учителя английского — задача не&nbsp;такая простая. Большинство предложений на&nbsp;рынке это либо дорого и&nbsp;далеко, либо дёшево и&nbsp;без реального результата.
              </p>
              <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                Мы нашли другой вариант. Партнёрство с&nbsp;Hilderstone College даёт прямой доступ к&nbsp;британским педагогам-практикам — людям, которые преподают каждый день и&nbsp;знают как это работает в&nbsp;реальном классе, а&nbsp;не&nbsp;в&nbsp;теории. ProSkill Fest — это то&nbsp;же самое, но&nbsp;в&nbsp;живом формате и&nbsp;с&nbsp;коллегами из&nbsp;разных городов России.
              </p>
              <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
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
            <div className="rounded-[1.5rem] border border-border p-8 md:p-12 bg-card max-w-3xl">
              <h2 className="text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                Вы руководите школой или образовательным центром?
              </h2>
              <p className="text-muted-foreground text-base font-normal normal-case leading-relaxed mb-8">
                Если хотите отправить на&nbsp;курс команду педагогов или узнать о&nbsp;партнёрстве с&nbsp;ассоциацией — у&nbsp;нас есть отдельная страница для руководителей.
              </p>
              <a href="/partnerstvo" className="inline-block btn-gold px-8 py-4 rounded-xl text-sm tracking-widest">
                О партнёрстве для центров →
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
