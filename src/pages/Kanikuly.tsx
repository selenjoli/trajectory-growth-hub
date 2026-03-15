import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";
import heroBg from "@/assets/kanikuly-hero.jpg";
import illustChina from "@/assets/illust-china.png";
import illustSea from "@/assets/illust-starfish.png";
import illustAltai from "@/assets/illust-altai.png";
import illustUae from "@/assets/illust-uae.svg";
import illustH1 from "@/assets/illust-hilderstone1.png";
import illustH2 from "@/assets/illust-hilderstone2.png";
import faqSafety from "@/assets/faq-safety.jpg";
import faqResult from "@/assets/faq-result.jpg";
import faqCost from "@/assets/faq-cost.jpg";
import meetingsImg from "@/assets/meetings.jpg";
import kidsImg from "@/assets/kids-tour.jpg";
import partnershipImg from "@/assets/partnership.jpg";
import teachersImg from "@/assets/teachers-workshop.jpg";
import russiaMap from "@/assets/russia-map.png";
import whyConfidence from "@/assets/why-confidence.png";
import whyWorld from "@/assets/why-world.png";
import whyFriends from "@/assets/why-friends.png";
import safetyGuides from "@/assets/safety-guides.png";
import safetyContact from "@/assets/safety-contact.png";
import safetyMedical from "@/assets/safety-medical.png";
import safetyPlaces from "@/assets/safety-places.png";
import safetyDocs from "@/assets/safety-docs.png";

/* ─── data ─── */

const faq = [
  {
    q: "Это безопасно?",
    a: "С каждой группой едут опытные педагоги-сопровождающие, все локации и\u00A0отели проверены лично. Родители получают фото и\u00A0сообщения каждый день.",
    image: faqSafety,
  },
  {
    q: "Это даст результат?",
    a: "Дети возвращаются с\u00A0реальным прогрессом в\u00A0английском, новым пониманием мира и\u00A0уверенностью в\u00A0себе — это замечают все родители, не\u00A0только мы.",
    image: faqResult,
  },
  {
    q: "Сколько это стоит?",
    a: "Программы от\u00A028\u00A0500\u00A0₽ — языковая онлайн-практика с\u00A0британским колледжем. Туры и\u00A0лагеря от\u00A095\u00A0000\u00A0₽. Для большинства программ доступна рассрочка, первый взнос 30%.",
    image: faqCost,
  },
];

const stats = [
  { number: "5", label: "лет проводим программы" },
  { number: "15", label: "центров в\u00A0ассоциации" },
  { number: "5 500+", label: "учеников в\u00A0наших школах ежегодно" },
  { number: "350", label: "детей в\u00A0совместных программах" },
];

interface ProgramCard {
  bgColor: string;
  illustration: string;
  illustClass?: string;
  dates: string;
  price: string;
  title: string;
  subtitle: string;
  text: string;
  href: string;
  notice?: string;
  tag?: string;
  dimmed?: boolean;
}

const programs: ProgramCard[] = [
  {
    bgColor: "bg-program-china",
    illustration: illustChina,
    illustClass: "absolute right-8 top-1/2 -translate-y-1/2 h-[75%] w-auto object-contain",
    dates: "03.06 — 12.06",
    price: "от 165 000 руб*",
    title: "Поездка в\u00A0Китай",
    subtitle: "Для всей семьи",
    text: "Восточное приключение: культура, история и\u00A0современность!",
    href: "/kanikuly/china",
  },
  {
    bgColor: "bg-program-sea",
    illustration: illustSea,
    illustClass: "absolute right-4 top-1/2 -translate-y-1/2 h-[85%] w-auto object-contain",
    dates: "23.06 — 15.07",
    price: "от 134 000 руб*",
    title: "Лагерь на\u00A0море",
    subtitle: "Для детей 8–14 лет",
    text: "21 день счастья! Творческие каникулы и\u00A0море открытий!",
    href: "/kanikuly/more",
  },
  {
    bgColor: "bg-program-altai",
    illustration: illustAltai,
    illustClass: "absolute right-0 top-1/2 -translate-y-[45%] h-[85%] w-auto object-contain",
    dates: "10.07 — 25.07",
    price: "от 95 000 руб*",
    title: "Лагерь на\u00A0Алтае",
    subtitle: "Для детей 10–17 лет",
    text: "Алтай ждёт тебя! Твоё летнее приключение начинается здесь!",
    href: "/kanikuly/altai",
  },
  {
    bgColor: "bg-program-uae",
    illustration: illustUae,
    illustClass: "absolute right-10 top-1/2 -translate-y-[55%] h-[85%] w-auto object-contain",
    dates: "Даты уточняются",
    price: "",
    title: "Поездка в\u00A0ОАЭ",
    subtitle: "Для детей с\u00A010 лет и\u00A0родителей",
    text: "Это не\u00A0просто поездка — это инвестиция в\u00A0будущее ребёнка!",
    href: "/kanikuly/uae",
    dimmed: true,
    notice: "Программа временно приостановлена",
  },
  {
    bgColor: "bg-program-online",
    illustration: illustH1,
    illustClass: "absolute right-6 top-1/2 -translate-y-1/2 h-[60%] w-auto object-contain",
    tag: "Смена 1",
    dates: "01.06 — 12.06",
    price: "28 500 руб",
    title: "Hilderstone College",
    subtitle: "Языковая онлайн-практика",
    text: "10 занятий с\u00A0дипломированным преподавателем из\u00A0Британского колледжа. Сертификат по\u00A0окончании.",
    href: "/kanikuly/online",
  },
  {
    bgColor: "bg-program-hilderstone2",
    illustration: illustH2,
    illustClass: "absolute right-8 bottom-4 h-[95%] w-auto object-contain",
    tag: "Смена 2",
    dates: "15.06 — 26.06",
    price: "28 500 руб",
    title: "Hilderstone College",
    subtitle: "Языковая онлайн-практика",
    text: "Те\u00A0же условия, другие даты — для тех кому первая смена не\u00A0подходит по\u00A0расписанию.",
    href: "/kanikuly/online",
  },
];

const whyItems = [
  { title: "Уверенность", text: "Новая среда и\u00A0новые задачи — ребёнок справляется сам. Этот опыт остаётся с\u00A0ним.", image: whyConfidence },
  { title: "Понимание мира", text: "Другие страны, другие люди, другой уклад — горизонт расширяется и\u00A0уже не\u00A0сужается обратно.", image: whyWorld },
  { title: "Друзья", text: "Дружба, которая завязывается в\u00A0поездке, обычно оказывается крепче школьной. Многие ребята общаются годами.", image: whyFriends },
];

const testimonials = [
  { id: 1, image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+1", name: "Ирина, Белгород", role: "тур в Китай" },
  { id: 2, image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+2", name: "Артём, 15 лет", role: "лагерь на Алтае" },
  { id: 3, image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+3", name: "Елена, Москва", role: "лагерь на море" },
  { id: 4, image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+4", name: "Андрей и Кирилл", role: "тур в ОАЭ" },
  { id: 5, image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+5", name: "Наталья, Москва", role: "Родитель" },
];

const safety = [
  { title: "Сопровождающие", text: "С\u00A0каждой группой едут педагоги с\u00A0опытом работы с\u00A0детьми в\u00A0нестандартных ситуациях.", image: safetyGuides },
  { title: "Связь с\u00A0родителями", text: "Ежедневные фото и\u00A0сообщения в\u00A0родительский чат. Вы\u00A0всегда знаете где ребёнок.", image: safetyContact },
  { title: "Медицинская поддержка", text: "В\u00A0лагерях — круглосуточный медпункт. В\u00A0турах — страховка и\u00A0чёткий протокол.", image: safetyMedical },
  { title: "Проверенные места", text: "Все отели, базы и\u00A0кампусы мы проверяем до\u00A0того как включить в\u00A0программу.", image: safetyPlaces },
  { title: "Документы", text: "Визы, страховки, разрешения — помогаем оформить всё.", image: safetyDocs },
];

const carouselImages = [meetingsImg, kidsImg, partnershipImg, teachersImg];

/* ─── page ─── */

const Kanikuly = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          <img src={heroBg} alt="Дети в образовательном путешествии" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-[0.95] mb-4 max-w-4xl"
            >
              Каникулы,
              <br />
              которые <span className="text-accent">меняют</span> детей
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-6"
            >
              Программы 2026
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
            >
              <p className="text-base md:text-lg text-primary-foreground/85 max-w-lg font-normal normal-case leading-relaxed">
                Образовательные туры, языковые лагеря и&nbsp;онлайн-практика для детей и&nbsp;подростков от&nbsp;8 до&nbsp;17 лет.
              </p>
              <a href="#programs" className="inline-block btn-gold px-8 py-4 rounded-2xl transition-all text-sm tracking-widest shrink-0">
                Выбрать программу ↓
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Program cards ── */}
      <section id="programs" className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-4">
              Что есть <span className="text-accent">в&nbsp;этом году</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-14 font-normal normal-case">
              Шесть программ — выбирайте по&nbsp;возрасту, датам и&nbsp;тому, что откликается вашему ребёнку.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            {programs.map((p, i) => (
              <AnimatedSection key={p.title + i} delay={i * 0.08}>
                <a
                  href={p.href}
                  className={`group block rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl ${p.dimmed ? "opacity-70 hover:opacity-100" : ""}`}
                >
                  <div className={`${p.bgColor} text-white relative overflow-hidden h-[280px] md:h-[300px]`}>
                    {/* Background illustration */}
                    <img
                      src={p.illustration}
                      alt=""
                      className={`${p.illustClass || "absolute right-0 bottom-0 h-[85%] w-auto object-contain"} opacity-100 group-hover:scale-105 transition-transform duration-500 pointer-events-none`}
                    />
                    {/* Text content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                      <div>
                        {p.tag && (
                          <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 mb-3">
                            {p.tag}
                          </span>
                        )}
                        <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight whitespace-nowrap">{p.title}</h3>
                        <p className="text-sm uppercase tracking-wide opacity-80 mt-1 font-bold">{p.subtitle}</p>
                        {p.notice && (
                          <p className="text-sm font-medium opacity-80 mt-2 normal-case italic">{p.notice}</p>
                        )}
                        <p className="text-sm opacity-90 normal-case font-normal leading-relaxed mt-2 max-w-[55%] italic">
                          {p.text}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-lg md:text-xl font-black">{p.dates}</span>
                        {p.price && (
                          <span className="inline-block bg-white text-foreground text-xs font-bold px-3 py-1.5 rounded-lg uppercase">
                            {p.price}
                          </span>
                        )}
                        <span className="inline-block btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest ml-auto">
                          Подробнее →
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-8 normal-case font-normal">
            *Авиабилеты и&nbsp;страховка для туров и&nbsp;лагерей оплачиваются отдельно. Для большинства программ доступна рассрочка.
          </p>
        </div>
      </section>

      {/* ── FAQ — alternating image blocks ── */}
      {faq.map((item, i) => {
        const imageFirst = i % 2 === 1;
        return (
          <section key={item.q} className="section-padding">
            <div className="fluid-container">
              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div className={imageFirst ? "md:order-2" : ""}>
                    <h2 className="text-3xl md:text-5xl text-foreground mb-6">
                      {item.q}
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                  <div className={imageFirst ? "md:order-1" : ""}>
                    <div className="rounded-[2rem] overflow-hidden aspect-[4/3]">
                      <img src={item.image} alt={item.q} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        );
      })}

      {/* ── Stats ── */}
      <section className="section-padding section-alt">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-14">
              Нам <span className="text-accent">доверяют</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <div className="border-t-2 border-primary pt-6">
                  <p className="text-5xl md:text-6xl font-black text-foreground mb-3">{s.number}</p>
                  <p className="text-sm text-muted-foreground font-normal normal-case leading-snug">{s.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why it works — no background ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-4">
              Почему это <span className="text-accent">работает</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mb-4 font-normal normal-case leading-relaxed">
              Когда подросток впервые решает задачу на&nbsp;английском в&nbsp;реальном разговоре с&nbsp;носителем — не&nbsp;на&nbsp;уроке, а&nbsp;в&nbsp;жизни — что-то меняется.
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mb-14 font-normal normal-case leading-relaxed">
              Дети возвращаются более самостоятельными и&nbsp;открытыми. Это замечают родители, это видно по&nbsp;тому как дети говорят о&nbsp;следующей поездке — сами, без&nbsp;напоминаний.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-10">
            {whyItems.map((w, i) => (
              <AnimatedSection key={w.title} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <img src={w.image} alt={w.title} className="w-40 h-40 object-contain mb-5" />
                  <h3 className="text-base text-foreground mb-2">{w.title}</h3>
                  <p className="text-muted-foreground text-[15px] font-normal normal-case leading-relaxed">{w.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials — green carousel, all white text ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-accent rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-white mb-4">
                Что говорят дети и&nbsp;родители
              </h2>
              <p className="text-white/70 text-lg mb-12 max-w-xl font-normal normal-case">
                Отзывы участников, родителей и&nbsp;преподавателей о&nbsp;наших программах.
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

      {/* ── Safety — with illustrations ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-4">
              Как мы <span className="text-accent">заботимся</span> о&nbsp;детях
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-14 font-normal normal-case">
              Отпустить ребёнка в&nbsp;другую страну или на&nbsp;три недели в&nbsp;лагерь — это доверие, которое нужно заслужить.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {safety.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center">
                  <img src={s.image} alt={s.title} className="w-28 h-28 object-contain mb-4" />
                  <h3 className="text-sm text-foreground mb-2">{s.title}</h3>
                  <p className="text-[13px] text-muted-foreground font-normal normal-case leading-relaxed">{s.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── About association — dark blue bg ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-foreground rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-primary-foreground mb-16">
                Ассоциация{" "}
                <span className="text-accent">
                  «Траектория
                  <br />
                  Роста»
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-20">
                <div className="relative h-[350px] md:h-[420px]">
                  <AnimatePresence>
                    {carouselImages.map((img, i) => {
                      const offset = (i - currentImg + carouselImages.length) % carouselImages.length;
                      if (offset > 3) return null;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9, y: 30 }}
                          animate={{
                            opacity: offset === 0 ? 1 : 0.6 - offset * 0.15,
                            scale: 1 - offset * 0.05,
                            y: offset * 16,
                            x: offset * 8,
                            zIndex: carouselImages.length - offset,
                            rotateZ: offset * -1.5,
                          }}
                          exit={{ opacity: 0, scale: 0.9, y: -20 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0"
                        >
                          <img src={img} alt="Встречи ассоциации" className="w-full h-full object-cover rounded-[1.5rem] shadow-2xl" />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
                <div>
                  <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed font-normal normal-case">
                    Мы — объединение центров дополнительного образования из&nbsp;разных городов России. В&nbsp;2021 году несколько руководителей языковых школ начали встречаться на&nbsp;профессиональных конференциях. Деловое общение переросло в&nbsp;дружбу, а&nbsp;дружба — в&nbsp;желание делать что-то вместе.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed font-normal normal-case mb-8">
                    Сегодня в&nbsp;ассоциации 15 центров из&nbsp;Москвы, Подмосковья, Белгорода, Курска, Воронежа, Чебоксар, Тамбова и&nbsp;Кисловодска. Вместе мы организуем программы для детей, которые ни&nbsp;один центр не&nbsp;смог&nbsp;бы сделать в&nbsp;одиночку.
                  </p>
                  <a href="/" className="inline-block btn-gold px-6 py-3 rounded-xl text-sm tracking-widest">
                    Об ассоциации →
                  </a>
                </div>
                <div className="flex justify-center">
                  <img src={russiaMap} alt="Карта России с городами ассоциации" className="w-full max-w-lg h-auto object-contain" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Crosslinks ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-14">
              Есть ещё <span className="text-accent">кое-что</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            <AnimatedSection delay={0.05}>
              <a href="/uchitelya" className="group block rounded-[1.5rem] border border-border hover:border-primary/30 p-8 transition-all duration-500 hover:shadow-lg h-full bg-card">
                <h3 className="text-base text-foreground mb-3">Программы для педагогов</h3>
                <p className="text-[15px] text-muted-foreground mb-6 normal-case font-normal leading-relaxed">
                  Онлайн-курс с&nbsp;британскими преподавателями Hilderstone College и&nbsp;ProSkill Fest — ежегодный фестиваль для учителей.
                </p>
                <span className="inline-block btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest">
                  Узнать подробнее →
                </span>
              </a>
            </AnimatedSection>
            <AnimatedSection delay={0.12}>
              <a href="/partnerstvo" className="group block rounded-[1.5rem] border border-border hover:border-primary/30 p-8 transition-all duration-500 hover:shadow-lg h-full bg-card">
                <h3 className="text-base text-foreground mb-3">Вы руководите образовательным центром?</h3>
                <p className="text-[15px] text-muted-foreground mb-6 normal-case font-normal leading-relaxed">
                  Расскажем как устроено партнёрство в&nbsp;ассоциации и&nbsp;что это даёт на&nbsp;практике.
                </p>
                <span className="inline-block btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest">
                  О партнёрстве →
                </span>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Kanikuly;
