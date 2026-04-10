import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import PhotoLightbox from "@/components/PhotoLightbox";
import ContactFormModal from "@/components/ContactFormModal";

const heroBg = "/assets/china-hero2.jpg";
const beijing = "/assets/china-beijing.jpg";
const beijingWhy = "/assets/china-beijing-why.jpg";
const beijingReceipt = "/assets/china-beijing-receipt.jpg";
const nanjing = "/assets/china-nanjing.jpg";
const nanjingWhy = "/assets/china-nanjing-why.jpg";
const suzhou = "/assets/china-suzhou.jpg";
const suzhouWhy = "/assets/china-suzhou-why.jpg";
const shanghai = "/assets/china-shanghai.jpg";
const shanghaiWhy = "/assets/china-shanghai-why.jpg";
const hangzhou = "/assets/china-hangzhou.jpg";
const hangzhouWhy = "/assets/china-hangzhou-why.jpg";
const hangzhouReceipt = "/assets/china-hangzhou-receipt.jpg";
const trainImg = "/assets/china-train.jpg";
const calligraphyImg = "/assets/china-calligraphy.jpg";
const teaImg = "/assets/china-tea.jpg";
const disneyImg = "/assets/china-disney.jpg";
const guideImg = "/assets/china-guide.jpg";
const chinaMap = "/assets/china-map-circles.png";
const illustUae = "/assets/china-illust-uae.svg";
const illustSea = "/assets/china-illust-sea.png";
const illustAltai = "/assets/china-illust-altai.png";
const illustHilderstone = "/assets/china-illust-hilderstone-uk.png";

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
    title: "ПОЕЗДКА НА СКОРОСТНОМ ПОЕЗДЕ\n350 КМ/Ч",
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
    title: "ЧАЙНАЯ ЦЕРЕМОНИЯ И ПЛАНТАЦИИ",
    text: "Мы не просто отведаем ароматный китайский чай в лучших традициях, но ещё увидим как он растёт",
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

const chinaTestimonial1 = "/assets/china-testimonial-1.jpg";
const chinaTestimonial2 = "/assets/china-testimonial-2.jpg";
const chinaTestimonial3 = "/assets/china-testimonial-3.jpg";
const chinaTestimonial4 = "/assets/china-testimonial-4.jpg";
const chinaTestimonial5 = "/assets/china-testimonial-5.jpg";

const testimonials = [
  { id: 1, image: chinaTestimonial1 },
  { id: 2, image: chinaTestimonial2 },
  { id: 3, image: chinaTestimonial3 },
  { id: 4, image: chinaTestimonial4 },
  { id: 5, image: chinaTestimonial5 },
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
  const [currentCity, setCurrentCity] = useState(0);
  const [cityPaused, setCityPaused] = useState(false);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxPhotos, setLightboxPhotos] = useState<string[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  const galleryPhotos = [beijingWhy, shanghaiWhy, suzhouWhy, hangzhouWhy, nanjingWhy];

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || zoomed !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide]);

  // City carousel auto-play
  useEffect(() => {
    if (cityPaused) return;
    const interval = setInterval(() => {
      setCurrentCity((prev) => (prev + 1) % cities.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [cityPaused]);

  // Gallery carousel auto-play
  useEffect(() => {
    if (galleryPaused) return;
    const interval = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % galleryPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [galleryPaused, galleryPhotos.length]);

  return (
    <main className="bg-program-china">
      <Header variant="light" />

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10 pt-20 lg:pt-0">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img src={heroBg} alt="Великая Китайская стена" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
            <div className="w-fit">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center justify-between gap-3 mb-6"
              >
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm md:text-base font-semibold uppercase tracking-wider px-5 py-2 rounded-full">
                  Познавательный тур
                </span>
                <span className="inline-block bg-program-china text-white text-sm md:text-base font-bold uppercase tracking-wider px-5 py-2 rounded-full">
                  3 — 12 июня 2026
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white leading-[0.95] mb-4"
              >
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">Китай:</span> когда история
                <br />
                смотрит тебе в&nbsp;глаза
              </motion.h1>
            </div>
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
              {["10 дней", "Для всей семьи"].map((chip) => (
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
              Записаться — от 165 000 ₽
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── Why China — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="lg:flex-1 space-y-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-2">
                    Почему Китай — это <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">что-то особенное</span>
                  </h2>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Есть страны, после которых смотришь на мир немного иначе. Китай — одна из них.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    За один день здесь можно подняться на стену, которой две тысячи лет, а вечером сесть в поезд, идущий 350 км/ч. Иероглифы, которые казались загадкой, начинают обретать смысл. Дети понимают, что история — это не параграф в учебнике, а место где можно стоять, дышать и чувствовать.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed mb-2">
                    Маршрут составлен так, чтобы каждый город открывал что-то своё:
                  </p>
                  <ul className="space-y-2">
                    {[
                      { city: "Пекин", desc: "имперское величие" },
                      { city: "Нанкин", desc: "мудрость" },
                      { city: "Сучжоу", desc: "красоту" },
                      { city: "Шанхай", desc: "скорость" },
                      { city: "Ханчжоу", desc: "покой" },
                    ].map((item) => (
                      <li key={item.city} className="flex items-center gap-3 text-muted-foreground text-base md:text-lg font-normal normal-case">
                        <span className="w-2 h-2 rounded-full bg-program-china shrink-0" />
                        <span><strong className="text-foreground">{item.city}</strong> — {item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Photo carousel — horizontal, fills column */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                  <div
                    className="relative w-full aspect-[3/4]"
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
                              y: offset * 16,
                              x: offset * 8,
                              zIndex: whyPhotos.length - offset,
                              rotateZ: offset * -2,
                            }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className={`absolute inset-0 ${offset === 0 ? "cursor-pointer" : ""}`}
                            onClick={() => { if (offset === 0) { setLightboxPhotos(whyPhotos); setLightboxIndex(i); setLightboxOpen(true); } }}
                          >
                            <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl">
                              <img src={photo} alt="Китай" className="w-full h-full object-cover" />
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                {/* Video */}
                <div className="w-full lg:w-[320px] shrink-0 flex justify-center">
                  <div className="relative w-full aspect-[9/16] rounded-[1.2rem] overflow-hidden shadow-2xl">
                    <iframe
                      src="https://kinescope.io/embed/jj4DD68ve6YMPbHpgVBxZw"
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                      frameBorder="0"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Route — 5 cities: map background, carousel left, arrows right ── */}
      <section className="section-padding overflow-hidden">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-4">
              5 городов — 5 характеров
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-14 max-w-2xl font-normal normal-case">
              Каждый город открывает свою грань Китая.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div
              className="relative"
              onMouseEnter={() => setCityPaused(true)}
              onMouseLeave={() => setCityPaused(false)}
            >
              {/* Map as background — desktop only */}
              <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-10 w-[65%] pointer-events-none">
                <img src={chinaMap} alt="Карта маршрута" className="w-full h-auto" />
              </div>

              <div className="relative z-10 flex items-center gap-8">
                {/* Carousel card — takes ~55% on desktop */}
                <div className="w-full lg:w-[55%] shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCity}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white/10 backdrop-blur-sm rounded-[1.5rem] overflow-hidden"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={cities[currentCity].image} alt={cities[currentCity].name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 md:p-8">
                        <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{cities[currentCity].subtitle}</p>
                        <h3 className="text-xl md:text-2xl text-white mb-3">{cities[currentCity].name}</h3>
                        <p className="text-sm md:text-base text-white/80 font-normal normal-case leading-relaxed">{cities[currentCity].text}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Arrows — to the right of the card */}
                <div className="hidden lg:flex flex-col gap-4">
                  <button
                    onClick={() => setCurrentCity((prev) => (prev - 1 + cities.length) % cities.length)}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ArrowLeft className="w-5 h-5 text-program-china" />
                  </button>
                  <button
                    onClick={() => setCurrentCity((prev) => (prev + 1) % cities.length)}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5 text-program-china" />
                  </button>
                </div>
              </div>

              {/* Mobile arrows — below card */}
              <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentCity((prev) => (prev - 1 + cities.length) % cities.length)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <ArrowLeft className="w-4 h-4 text-program-china" />
                </button>
                <button
                  onClick={() => setCurrentCity((prev) => (prev + 1) % cities.length)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <ArrowRight className="w-4 h-4 text-program-china" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── What you'll remember — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-14">
                Что останется <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">в&nbsp;памяти</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6">
              {memories.map((m, i) => (
                <AnimatedSection key={m.title} delay={i * 0.08}>
                  <div className="group rounded-[1.5rem] overflow-hidden bg-surface-alt">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img src={m.image} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="text-lg md:text-xl text-foreground mb-2 whitespace-pre-line">{m.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground font-normal normal-case leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Guide — horizontal block with photo */}
            <AnimatedSection delay={0.4}>
              <div className="mt-6 rounded-[1.5rem] bg-surface-alt overflow-hidden grid md:grid-cols-2 gap-0 md:gap-6">
                <div className="aspect-[4/3] md:aspect-auto">
                  <img src={guideImg} alt="Гид-переводчик" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-lg md:text-xl text-foreground mb-3">Гид-переводчик на всём маршруте</h3>
                  <p className="text-sm md:text-base text-muted-foreground font-normal normal-case leading-relaxed">
                    Человек, который объясняет не только что смотреть, но и что это значит. Профессиональный переводчик сопровождает группу на протяжении всей поездки — от Пекина до Ханчжоу.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── What's included — receipt style with side photos ── */}
      <section className="py-20 px-3 md:px-6 xl:px-10">
        <div className="fluid-container">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left photo */}
              <div className="hidden lg:block flex-1">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={beijingReceipt} alt="Фото из поездки" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Receipt */}
              <div className="bg-white rounded-[1.5rem] w-full lg:w-[480px] shrink-0 px-8 py-10 shadow-2xl">
                <div className="text-center border-b-2 border-dashed border-foreground/20 pb-6 mb-6">
                  <h2 className="text-2xl md:text-3xl text-foreground mb-1">Что входит в стоимость</h2>
                  <p className="text-sm text-muted-foreground font-normal normal-case">Тур «Китай» · 3–12 июня 2026</p>
                </div>
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
                <div className="border-t-2 border-dashed border-foreground/20 pt-6">
                  <div className="flex items-end justify-between">
                    <span className="text-muted-foreground text-sm font-normal normal-case">Стоимость</span>
                    <span className="text-3xl md:text-4xl font-bold text-foreground">от 165 000 ₽</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-4 font-normal normal-case leading-relaxed mb-6">
                  Авиабилеты, страховка, Диснейленд и дополнительные экскурсии оплачиваются отдельно.
                </p>
                <button
                  onClick={() => setFormOpen(true)}
                  className="block w-full text-center btn-gold px-6 py-4 rounded-2xl text-sm tracking-widest"
                >
                  Присоединиться
                </button>
              </div>

              {/* Right photo */}
              <div className="hidden lg:block flex-1">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={hangzhouReceipt} alt="Фото из поездки" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Gallery — "Как это было в 2025" ── */}
      <section className="section-padding overflow-hidden">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-14">
              Как это было <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">в&nbsp;2025</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div
              className="relative mx-auto w-full max-w-3xl aspect-[3/2]"
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
                        y: offset * 18,
                        x: offset * 10,
                        zIndex: galleryPhotos.length - offset,
                        rotateZ: offset * -2,
                      }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute inset-0 ${offset === 0 ? "cursor-pointer" : ""}`}
                      onClick={() => { if (offset === 0) { setLightboxPhotos(galleryPhotos); setLightboxIndex(i); setLightboxOpen(true); } }}
                    >
                      <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl">
                        <img src={photo} alt="Китай 2025" className="w-full h-full object-cover" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </section>
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
                    className="group block rounded-[1.5rem] border border-border hover:border-program-china/30 p-8 transition-all duration-500 hover:shadow-lg bg-card h-full text-center"
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
                className="group block rounded-[1.5rem] border border-border hover:border-program-china/30 p-8 transition-all duration-500 hover:shadow-lg bg-card"
              >
                <div className="flex items-center gap-6">
                  <img src={illustHilderstone} alt="Hilderstone College" className="h-28 w-auto object-contain shrink-0" />
                  <div>
                    <h3 className="text-lg md:text-xl text-foreground mb-2">
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
      <Footer variant="white" />
      <FloatingButtons arrowColor="hsl(var(--program-china))" />
      <PhotoLightbox photos={lightboxPhotos.length ? lightboxPhotos : galleryPhotos} initialIndex={lightboxIndex} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} program="Путешествие в Китай" page="ChinaTour" />
    </main>
  );
};

export default ChinaTour;
