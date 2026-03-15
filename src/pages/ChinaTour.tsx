import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";

import heroBg from "@/assets/china-hero2.jpg";
import beijing from "@/assets/china-beijing.jpg";
import nanjing from "@/assets/china-nanjing.jpg";
import suzhou from "@/assets/china-suzhou.jpg";
import shanghai from "@/assets/china-shanghai.jpg";
import hangzhou from "@/assets/china-hangzhou.jpg";
import trainImg from "@/assets/china-train.jpg";
import calligraphyImg from "@/assets/china-calligraphy.jpg";
import teaImg from "@/assets/china-tea.jpg";
import disneyImg from "@/assets/china-disney.jpg";
import guideImg from "@/assets/china-guide.jpg";
import chinaMap from "@/assets/china-map-circles.png";
import illustUae from "@/assets/illust-uae.svg";
import illustSea from "@/assets/illust-starfish.png";
import illustAltai from "@/assets/illust-altai.png";
import illustHilderstone from "@/assets/illust-hilderstone-uk.png";

/* ─── data ─── */

const cities = [
  {
    name: "Пекин",
    subtitle: "душа империи",
    image: beijing,
    text: "Великая Китайская стена, Летний дворец, урок каллиграфии в Пекинском университете языка и культуры. И настоящая утка по-пекински — блюдо, ради которого сюда едут специально.",
    mapPos: { top: "8%", left: "72%" },
  },
  {
    name: "Нанкин",
    subtitle: "город мудрости",
    image: nanjing,
    text: "Прогулка по древней городской стене, квартал Конфуция. Здесь история не кричит — она говорит тихо, и это запоминается.",
    mapPos: { top: "22%", left: "58%" },
  },
  {
    name: "Сучжоу",
    subtitle: "китайская Венеция",
    image: suzhou,
    text: "Каналы, классические сады, тайны шёлкового производства. Место, которое художники рисовали сотни лет — и понятно почему.",
    mapPos: { top: "15%", left: "82%" },
  },
  {
    name: "Шанхай",
    subtitle: "пульс будущего",
    image: shanghai,
    text: "Небоскрёбы, набережная Вайтань, смотровая Жемчужина Востока. И для тех кто хочет — день в Шанхайском Диснейленде.",
    mapPos: { top: "38%", left: "62%" },
  },
  {
    name: "Ханчжоу",
    subtitle: "гармония природы",
    image: hangzhou,
    text: "Озеро Сиху, чайные плантации, чайная церемония, храм Прибежище Души. Финальный аккорд маршрута — тихий и красивый.",
    mapPos: { top: "48%", left: "76%" },
  },
];

const memories = [
  {
    image: trainImg,
    title: "Поездка на скоростном поезде 350 км/ч",
    text: "Через рисовые поля. Один раз увидел — запомнил навсегда.",
  },
  {
    image: calligraphyImg,
    title: "Урок каллиграфии в университете",
    text: "Не туристический аттракцион, а настоящий класс с преподавателем в Пекинском университете языка и культуры.",
  },
  {
    image: disneyImg,
    title: "Шанхайский Диснейленд",
    text: "Один из крупнейших в мире. Для тех кто хочет — отдельный день только там.",
  },
  {
    image: teaImg,
    title: "Чайная церемония на плантациях",
    text: "Не в сувенирном магазине, а там где чай растёт — на склонах Ханчжоу.",
  },
];

const included = [
  "Проживание в отелях 3–4* по всему маршруту",
  "Завтраки и обеды",
  "Все основные экскурсии и входные билеты",
  "Трансферы по Китаю, включая скоростные поезда",
  "Гид-переводчик и сопровождающий от Ассоциации",
  "Помощь с оформлением документов",
];

const testimonials = [
  { id: 1, image: "https://placehold.co/400x700/c9a84c/ffffff?text=Отзыв+1", name: "Марина, Санкт-Петербург", role: "мама Сони (13 лет)" },
  { id: 2, image: "https://placehold.co/400x700/c9a84c/ffffff?text=Отзыв+2", name: "Алексей, Москва", role: "папа Кирилла (11 лет)" },
  { id: 3, image: "https://placehold.co/400x700/c9a84c/ffffff?text=Отзыв+3", name: "Елена, Белгород", role: "Родитель" },
  { id: 4, image: "https://placehold.co/400x700/c9a84c/ffffff?text=Отзыв+4", name: "Дима, 14 лет", role: "Участник тура" },
  { id: 5, image: "https://placehold.co/400x700/c9a84c/ffffff?text=Отзыв+5", name: "Наталья, Курск", role: "Родитель" },
];

const otherPrograms = [
  { title: "Дубай", illustration: illustUae, illustClass: "h-24 w-auto", dates: "даты уточняются", price: "от 145 000 ₽", href: "/kanikuly/uae" },
  { title: "Море", illustration: illustSea, illustClass: "h-20 w-auto", dates: "24 июня — 14 июля", price: "от 134 000 ₽", href: "/kanikuly/more" },
  { title: "Алтай", illustration: illustAltai, illustClass: "h-24 w-auto", dates: "10–25 июля", price: "от 95 000 ₽", href: "/kanikuly/altai" },
];

/* ─── page ─── */

const ChinaTour = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);

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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95] mb-4 max-w-4xl"
            >
              Китай: когда история
              <br />
              смотрит тебе <span className="text-accent">в&nbsp;глаза</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-white/85 max-w-2xl font-normal normal-case leading-relaxed mb-8"
            >
              10 дней, 5 городов, тысячи лет цивилизации — и страна, которая строит будущее быстрее всех. Для детей и семей, которым мало просто посмотреть.
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
              Записаться — от 165 000 ₽
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
                  Есть страны, после которых смотришь на мир немного иначе. Китай — одна из них.
                </p>
                <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                  За один день здесь можно подняться на стену, которой две тысячи лет, а вечером сесть в поезд, идущий 350 км/ч. Иероглифы, которые казались загадкой, начинают обретать смысл. Дети понимают, что история — это не параграф в учебнике, а место где можно стоять, дышать и чувствовать.
                </p>
                <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                  Маршрут составлен так, чтобы каждый город открывал что-то своё: Пекин — имперское величие, Нанкин — мудрость, Сучжоу — красоту, Шанхай — скорость, Ханчжоу — покой.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Route — 5 cities with interactive map (desktop) / cards (mobile) ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-white mb-4">
              5 городов — 5 характеров
            </h2>
            <p className="text-white/70 text-lg mb-14 max-w-2xl font-normal normal-case">
              Каждый город открывает свою грань Китая.
            </p>
          </AnimatedSection>

          {/* Desktop: interactive map */}
          <div className="hidden lg:block">
            <AnimatedSection>
              <div className="relative">
                {/* Map image on the right */}
                <div className="relative ml-auto w-[60%]">
                  <img src={chinaMap} alt="Карта маршрута" className="w-full h-auto" />

                  {/* City hover circles overlaid on map */}
                  {cities.map((city, i) => (
                    <div
                      key={city.name}
                      className="absolute"
                      style={{ top: city.mapPos.top, left: city.mapPos.left }}
                      onMouseEnter={() => setHoveredCity(i)}
                      onMouseLeave={() => setHoveredCity(null)}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full bg-white border-2 border-program-china cursor-pointer shadow-lg"
                        animate={{
                          scale: hoveredCity === i ? 1.5 : 1,
                          boxShadow: hoveredCity === i ? "0 0 20px rgba(239,62,51,0.6)" : "0 2px 8px rgba(0,0,0,0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ))}
                </div>

                {/* City card — appears on hover, positioned on the left */}
                <div className="absolute top-0 left-0 w-[45%] h-full flex items-center">
                  <AnimatePresence mode="wait">
                    {hoveredCity !== null ? (
                      <motion.div
                        key={cities[hoveredCity].name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/10 backdrop-blur-md rounded-[1.5rem] overflow-hidden w-full"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={cities[hoveredCity].image} alt={cities[hoveredCity].name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-8">
                          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{cities[hoveredCity].subtitle}</p>
                          <h3 className="text-3xl text-white mb-3">{cities[hoveredCity].name}</h3>
                          <p className="text-white/80 text-base font-normal normal-case leading-relaxed">{cities[hoveredCity].text}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-white/40 text-lg font-normal normal-case"
                      >
                        Наведите на город на карте, чтобы узнать подробнее
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Mobile/Tablet: plain cards */}
          <div className="lg:hidden space-y-5">
            {cities.map((city, i) => (
              <AnimatedSection key={city.name} delay={i * 0.08}>
                <div className="bg-white/10 backdrop-blur-sm rounded-[1.5rem] overflow-hidden">
                  <div className="aspect-[16/10]">
                    <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{city.subtitle}</p>
                    <h3 className="text-2xl md:text-3xl text-white mb-3">{city.name}</h3>
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
                Что останется <span className="text-program-china">в памяти</span>
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

            {/* Guide — horizontal block with photo */}
            <AnimatedSection delay={0.4}>
              <div className="mt-6 rounded-[1.5rem] bg-surface-alt overflow-hidden grid md:grid-cols-[1fr_1.5fr] gap-0">
                <div className="aspect-[4/3] md:aspect-auto">
                  <img src={guideImg} alt="Гид-переводчик" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl text-foreground mb-3">Гид-переводчик на всём маршруте</h3>
                  <p className="text-base text-muted-foreground font-normal normal-case leading-relaxed">
                    Человек, который объясняет не только что смотреть, но и что это значит. Профессиональный переводчик сопровождает группу на протяжении всей поездки — от Пекина до Ханчжоу.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── What's included — receipt style on red ── */}
      <section className="section-padding">
        <div className="fluid-container flex justify-center">
          <AnimatedSection>
            <div className="bg-white rounded-[1.5rem] max-w-lg w-full px-8 py-10 shadow-2xl relative">
              {/* Receipt header */}
              <div className="text-center border-b-2 border-dashed border-foreground/20 pb-6 mb-6">
                <h2 className="text-2xl md:text-3xl text-foreground mb-1">Что входит в стоимость</h2>
                <p className="text-sm text-muted-foreground font-normal normal-case">Тур «Китай» · 3–12 июня 2026</p>
              </div>

              {/* Items */}
              <div className="space-y-4 mb-8">
                {included.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full border-2 border-program-china bg-program-china/10 flex items-center justify-center shrink-0">
                      <span className="w-2 h-2 rounded-full bg-program-china" />
                    </span>
                    <p className="text-foreground text-base font-normal normal-case leading-snug">{item}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-foreground/20 pt-6">
                <div className="flex items-end justify-between">
                  <span className="text-muted-foreground text-sm font-normal normal-case">Стоимость</span>
                  <span className="text-3xl md:text-4xl font-bold text-foreground">от 165 000 ₽</span>
                </div>
              </div>

              {/* Fine print */}
              <p className="text-muted-foreground text-xs mt-4 font-normal normal-case leading-relaxed">
                Авиабилеты, страховка, Диснейленд и дополнительные экскурсии оплачиваются отдельно.
              </p>

              {/* Decorative receipt tear */}
              <div className="absolute -bottom-3 left-0 right-0 h-6 overflow-hidden">
                <svg className="w-full" viewBox="0 0 400 20" preserveAspectRatio="none">
                  <path d="M0,0 Q5,20 10,0 Q15,20 20,0 Q25,20 30,0 Q35,20 40,0 Q45,20 50,0 Q55,20 60,0 Q65,20 70,0 Q75,20 80,0 Q85,20 90,0 Q95,20 100,0 Q105,20 110,0 Q115,20 120,0 Q125,20 130,0 Q135,20 140,0 Q145,20 150,0 Q155,20 160,0 Q165,20 170,0 Q175,20 180,0 Q185,20 190,0 Q195,20 200,0 Q205,20 210,0 Q215,20 220,0 Q225,20 230,0 Q235,20 240,0 Q245,20 250,0 Q255,20 260,0 Q265,20 270,0 Q275,20 280,0 Q285,20 290,0 Q295,20 300,0 Q305,20 310,0 Q315,20 320,0 Q325,20 330,0 Q335,20 340,0 Q345,20 350,0 Q355,20 360,0 Q365,20 370,0 Q375,20 380,0 Q385,20 390,0 Q395,20 400,0" fill="white" />
                </svg>
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
                Что говорят <span className="text-program-china">участники</span>
              </h2>
              <p className="text-foreground/60 text-lg mb-12 max-w-xl font-normal normal-case">
                Отзывы семей, которые побывали в наших турах.
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
                  «Дочка до поездки говорила, что история — скучный предмет. После Великой стены пересмотрела своё отношение. Теперь сама читает про Китай — я не ожидала такого.»
                </p>
                <footer className="text-foreground/60 text-sm font-normal normal-case">
                  — Марина, мама Сони (13 лет), Санкт-Петербург
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
                    className="group block rounded-[1.5rem] border border-border hover:border-program-china/30 p-8 transition-all duration-500 hover:shadow-lg bg-card h-full text-center"
                  >
                    <img src={p.illustration} alt={p.title} className={`${p.illustClass} mx-auto mb-4 object-contain`} />
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
                <div className="flex items-center gap-6">
                  <img src={illustHilderstone} alt="Hilderstone College" className="h-28 w-auto object-contain shrink-0" />
                  <div>
                    <h3 className="text-base text-foreground mb-2">
                      Онлайн языковая практика с Hilderstone College
                    </h3>
                    <p className="text-sm text-muted-foreground font-normal normal-case leading-relaxed mb-4">
                      Британский преподаватель, группа до 12 человек, сертификат. Вторая смена стартует 15 июня — как раз после возвращения из Китая. Хороший способ закрепить то, что услышали и почувствовали в поездке.
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
