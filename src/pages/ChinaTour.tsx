import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";

import heroBg from "@/assets/china-hero.jpg";
import beijing from "@/assets/china-beijing.jpg";
import nanjing from "@/assets/china-nanjing.jpg";
import suzhou from "@/assets/china-suzhou.jpg";
import shanghai from "@/assets/china-shanghai.jpg";
import hangzhou from "@/assets/china-hangzhou.jpg";
import trainImg from "@/assets/china-train.jpg";
import calligraphyImg from "@/assets/china-calligraphy.jpg";
import teaImg from "@/assets/china-tea.jpg";
import disneyImg from "@/assets/china-disney.jpg";

/* ─── data ─── */

const cities = [
  {
    name: "Пекин",
    subtitle: "душа империи",
    image: beijing,
    text: "Великая Китайская стена, Летний дворец, урок каллиграфии в\u00A0Пекинском университете языка и\u00A0культуры. И\u00A0настоящая утка по-пекински — блюдо, ради которого сюда едут специально.",
  },
  {
    name: "Нанкин",
    subtitle: "город мудрости",
    image: nanjing,
    text: "Прогулка по\u00A0древней городской стене, квартал Конфуция. Здесь история не\u00A0кричит — она говорит тихо, и\u00A0это запоминается.",
  },
  {
    name: "Сучжоу",
    subtitle: "китайская Венеция",
    image: suzhou,
    text: "Каналы, классические сады, тайны шёлкового производства. Место, которое художники рисовали сотни лет — и\u00A0понятно почему.",
  },
  {
    name: "Шанхай",
    subtitle: "пульс будущего",
    image: shanghai,
    text: "Небоскрёбы, набережная Вайтань, смотровая Жемчужина Востока. И\u00A0для тех кто хочет — день в\u00A0Шанхайском Диснейленде.",
  },
  {
    name: "Ханчжоу",
    subtitle: "гармония природы",
    image: hangzhou,
    text: "Озеро Сиху, чайные плантации, чайная церемония, храм Прибежище Души. Финальный аккорд маршрута — тихий и\u00A0красивый.",
  },
];

const memories = [
  {
    image: trainImg,
    title: "Поездка на\u00A0скоростном поезде 350\u00A0км/ч",
    text: "Через рисовые поля. Один раз увидел — запомнил навсегда.",
  },
  {
    image: calligraphyImg,
    title: "Урок каллиграфии в\u00A0университете",
    text: "Не\u00A0туристический аттракцион, а\u00A0настоящий класс с\u00A0преподавателем в\u00A0Пекинском университете языка и\u00A0культуры.",
  },
  {
    image: disneyImg,
    title: "Шанхайский Диснейленд",
    text: "Один из\u00A0крупнейших в\u00A0мире. Для тех кто хочет — отдельный день только там.",
  },
  {
    image: teaImg,
    title: "Чайная церемония на\u00A0плантациях",
    text: "Не\u00A0в\u00A0сувенирном магазине, а\u00A0там где чай растёт — на\u00A0склонах Ханчжоу.",
  },
];

const included = [
  "Проживание в\u00A0отелях 3–4* по\u00A0всему маршруту",
  "Завтраки и\u00A0обеды",
  "Все основные экскурсии и\u00A0входные билеты",
  "Трансферы по\u00A0Китаю, включая скоростные поезда",
  "Гид-переводчик и\u00A0сопровождающий от\u00A0Ассоциации",
  "Помощь с\u00A0оформлением документов",
];

const testimonials = [
  { id: 1, image: "https://placehold.co/400x700/c9a84c/ffffff?text=Отзыв+1", name: "Марина, Санкт-Петербург", role: "мама Сони (13 лет)" },
  { id: 2, image: "https://placehold.co/400x700/c9a84c/ffffff?text=Отзыв+2", name: "Алексей, Москва", role: "папа Кирилла (11 лет)" },
  { id: 3, image: "https://placehold.co/400x700/c9a84c/ffffff?text=Отзыв+3", name: "Елена, Белгород", role: "Родитель" },
  { id: 4, image: "https://placehold.co/400x700/c9a84c/ffffff?text=Отзыв+4", name: "Дима, 14 лет", role: "Участник тура" },
  { id: 5, image: "https://placehold.co/400x700/c9a84c/ffffff?text=Отзыв+5", name: "Наталья, Курск", role: "Родитель" },
];

const otherPrograms = [
  { emoji: "🇦🇪", title: "Дубай", dates: "даты уточняются", price: "от 145 000 ₽", href: "/kanikuly/uae" },
  { emoji: "🌊", title: "Море", dates: "24 июня — 14 июля", price: "от 134 000 ₽", href: "/kanikuly/more" },
  { emoji: "🏔️", title: "Алтай", dates: "10–25 июля", price: "от 95 000 ₽", href: "/kanikuly/altai" },
];

/* ─── page ─── */

const ChinaTour = () => {
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
    <main className="bg-program-china">
      <Header variant="light" />

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10 pt-20 lg:pt-0">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img src={heroBg} alt="Великая Китайская стена" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
                Познавательный тур · Июнь 2026
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-6 max-w-5xl"
            >
              Китай: когда история
              <br />
              смотрит тебе <span className="text-accent">в&nbsp;глаза</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/85 max-w-2xl font-normal normal-case leading-relaxed mb-8"
            >
              10&nbsp;дней, 5&nbsp;городов, тысячи лет цивилизации — и&nbsp;страна, которая строит будущее быстрее всех. Для детей и&nbsp;семей, которым мало просто посмотреть.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {["3 — 12 июня 2026", "10 дней", "Для всей семьи"].map((chip) => (
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
              Записаться — от&nbsp;165&nbsp;000&nbsp;₽
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── Why China — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-6">
                Почему Китай — это <span className="text-program-china">что-то особенное</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="max-w-3xl space-y-6">
                <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                  Есть страны, после которых смотришь на\u00A0мир немного иначе. Китай — одна из\u00A0них.
                </p>
                <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                  За\u00A0один день здесь можно подняться на\u00A0стену, которой две тысячи лет, а\u00A0вечером сесть в\u00A0поезд, идущий 350\u00A0км/ч. Иероглифы, которые казались загадкой, начинают обретать смысл. Дети понимают, что история — это не\u00A0параграф в\u00A0учебнике, а\u00A0место где можно стоять, дышать и\u00A0чувствовать.
                </p>
                <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                  Маршрут составлен так, чтобы каждый город открывал что-то своё: Пекин — имперское величие, Нанкин — мудрость, Сучжоу — красоту, Шанхай — скорость, Ханчжоу — покой.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Route — 5 cities on red ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-white mb-4">
              5&nbsp;городов — 5&nbsp;характеров
            </h2>
            <p className="text-white/70 text-lg mb-14 max-w-2xl font-normal normal-case">
              Каждый город открывает свою грань Китая.
            </p>
          </AnimatedSection>

          <div className="space-y-5">
            {cities.map((city, i) => (
              <AnimatedSection key={city.name} delay={i * 0.08}>
                <div className="grid md:grid-cols-2 gap-0 bg-white/10 backdrop-blur-sm rounded-[1.5rem] overflow-hidden">
                  <div className="aspect-[4/3] md:aspect-auto">
                    <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{city.subtitle}</p>
                    <h3 className="text-3xl md:text-4xl text-white mb-4">{city.name}</h3>
                    <p className="text-white/80 text-base font-normal normal-case leading-relaxed">{city.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you'll remember — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-14">
                Что останется <span className="text-program-china">в&nbsp;памяти</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6">
              {memories.map((m, i) => (
                <AnimatedSection key={m.title} delay={i * 0.08}>
                  <div className="group rounded-[1.5rem] overflow-hidden bg-surface-alt">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={m.image} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-base text-foreground mb-2">{m.title}</h3>
                      <p className="text-sm text-muted-foreground font-normal normal-case leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Guide note */}
            <AnimatedSection delay={0.4}>
              <div className="mt-6 rounded-[1.5rem] bg-surface-alt p-8 flex gap-6 items-start">
                <span className="text-3xl shrink-0">🗣️</span>
                <div>
                  <h3 className="text-base text-foreground mb-2">Гид-переводчик на\u00A0всём маршруте</h3>
                  <p className="text-sm text-muted-foreground font-normal normal-case leading-relaxed">
                    Человек, который объясняет не\u00A0только что смотреть, но\u00A0и\u00A0что это значит.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── What's included — on red ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-white mb-14">
              Что входит в&nbsp;стоимость
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {included.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="bg-white/10 backdrop-blur-sm rounded-[1.2rem] p-6 flex items-start gap-4">
                  <span className="text-accent text-xl mt-0.5">✓</span>
                  <p className="text-white text-base font-normal normal-case leading-relaxed">{item}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <p className="text-white/60 text-sm mt-8 font-normal normal-case">
              Авиабилеты, страховка, Диснейленд и\u00A0дополнительные экскурсии оплачиваются отдельно.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Testimonials — pale yellow block ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-testimonial-yellow rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-4">
                Что говорят <span className="text-program-china">участники</span>
              </h2>
              <p className="text-foreground/60 text-lg mb-12 max-w-xl font-normal normal-case">
                Отзывы семей, которые побывали в\u00A0наших турах.
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

            {/* Featured quote */}
            <AnimatedSection delay={0.2}>
              <blockquote className="mt-16 max-w-2xl mx-auto text-center">
                <p className="text-foreground/80 text-lg md:text-xl italic font-normal normal-case leading-relaxed mb-4">
                  «Дочка до\u00A0поездки говорила, что история — скучный предмет. После Великой стены пересмотрела своё отношение. Теперь сама читает про\u00A0Китай — я\u00A0не\u00A0ожидала такого.»
                </p>
                <footer className="text-foreground/60 text-sm font-normal normal-case">
                  — Марина, мама Сони (13&nbsp;лет), Санкт-Петербург
                </footer>
              </blockquote>
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
                Посмотрите <span className="text-program-china">ещё</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {otherPrograms.map((p, i) => (
                <AnimatedSection key={p.title} delay={i * 0.08}>
                  <a
                    href={p.href}
                    className="group block rounded-[1.5rem] border border-border hover:border-program-china/30 p-8 transition-all duration-500 hover:shadow-lg bg-card h-full"
                  >
                    <span className="text-3xl mb-4 block">{p.emoji}</span>
                    <h3 className="text-xl text-foreground mb-2">{p.title}</h3>
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
                className="group block rounded-[1.5rem] border border-border hover:border-program-china/30 p-8 transition-all duration-500 hover:shadow-lg bg-card"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">🇬🇧</span>
                  <div>
                    <h3 className="text-base text-foreground mb-2">
                      Онлайн языковая практика с&nbsp;Hilderstone College
                    </h3>
                    <p className="text-sm text-muted-foreground font-normal normal-case leading-relaxed mb-4">
                      Британский преподаватель, группа до\u00A012 человек, сертификат. Вторая смена стартует 15\u00A0июня — как раз после возвращения из\u00A0Китая. Хороший способ закрепить то, что услышали и\u00A0почувствовали в\u00A0поездке.
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

export default ChinaTour;
