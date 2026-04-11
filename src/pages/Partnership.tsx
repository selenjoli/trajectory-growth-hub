import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import PhotoLightbox from "@/components/PhotoLightbox";
import ContactFormModal from "@/components/ContactFormModal";
import { useCarousel } from '@/hooks/useCarousel';
const smartCookiesLogo = "/assets/logos/smart-cookies.svg";
const pershinaPhoto = "/assets/founders/pershina.jpg";
const akademiyaLogo = "/assets/logos/akademiya-yazykov.png";
const kokorinaPhoto = "/assets/founders/kokorina.jpg";
const lsStudioLogo = "/assets/logos/ls-studio.png";
const faustovaPhoto = "/assets/founders/faustova.jpg";
const libertyLogo = "/assets/logos/liberty-school.png";
const alekseevaPhoto = "/assets/founders/alekseeva.png";
const abcSchoolLogo = "/assets/logos/abc-school.png";
const ermilovaPhoto = "/assets/founders/ermilova.jpg";
const highflyLogo = "/assets/logos/highfly-school.png";
const goltsovaPhoto = "/assets/founders/goltsova.png";
const linguaCatLogo = "/assets/logos/lingua-cat.png";
const icSchoolLogo = "/assets/logos/ic-school.png";
const kosmosLogo = "/assets/logos/kosmos.png";
const abcClubLogo = "/assets/logos/abc-club.png";
const motionSchoolLogo = "/assets/logos/motion-school.png";
const eyeClubLogo = "/assets/logos/eye-club.png";
const yazykUspekhaLogo = "/assets/logos/yazyk-dlya-uspekha.png";
const lingvaPlusLogo = "/assets/logos/lingva-plus.png";
const spuLogo = "/assets/logos/spu.png";

const heroImg = "/assets/partnership-hero.jpg";
const quoteImg = "/assets/rost-quote.jpg";
const meetingImg = "/assets/rost-meeting.jpg";
const collaborationImg = "/assets/rost-collaboration.jpg";
const turizmImg = "/assets/partnership-rost-turizm.jpg";
const razvitieImg = "/assets/partnership-rost-razvitie.jpg";
const sotrudnichestvoImg = "/assets/partnership-rost-sotrudnichestvo.jpg";
const obrazovanieImg = "/assets/partnership-rost-obrazovanie.jpg";
const russiaMap = "/assets/partnership-russia-map.png";

/* ---- data ---- */

const benefits = [
  {
    image: turizmImg,
    title: "Совместные программы для учеников",
    text: "Ваши дети едут в Китай, на Алтай, на море — в рамках проверенных программ Ассоциации. Вы не организуете логистику с нуля, вы присоединяетесь к готовому. Это то, что ни один центр не потянет в одиночку.",

    link: "/kanikuly",
    linkText: "Смотреть программы",
  },
  {
    image: razvitieImg,
    title: "Развитие педагогов",
    text: "Ваша команда участвует в Teachers Development Course с Hilderstone College и в ProSkill Fest. Мотивированные учителя — это не абстракция, это конкретный результат который видят ученики и родители.",
    link: "/uchitelya",
    linkText: "Программы для педагогов",
  },
  {
    image: sotrudnichestvoImg,
    title: "Живое профессиональное сообщество",
    text: "Конференции, семинары, неформальные встречи. Коллеги которые понимают вас — потому что сами через то же проходят. Это редкость в нашей сфере.",
  },
  {
    image: obrazovanieImg,
    title: "Общий маркетинг",
    text: "Логотип вашего центра на сайте Ассоциации, упоминание в материалах, совместные активности. Вас видят там, куда вы сами не дотянетесь в одиночку.",
  },
  {
    image: meetingImg,
    title: "Обмен опытом без страха",
    text: "Здесь не подсмотрят и не скопируют. Здесь делятся — потому что понимают что сильное сообщество выгоднее чем конкуренция.",
  },
  {
    image: collaborationImg,
    title: "Международные партнёрства",
    text: "Доступ к программам Hilderstone College и другим международным проектам ассоциации — то, что сложно выстроить самостоятельно.",
    link: "/uchitelya/kurs",
    linkText: "Hilderstone College",
  },
];

interface Member {
  name: string;
  school: string;
  city: string;
  logo?: string;
  photo?: string;
}

const founders: Member[] = [
  { name: "Виктория Першина", school: "Smart Cookies Club", city: "Москва", logo: smartCookiesLogo, photo: pershinaPhoto },
  { name: "Марина Кокорина", school: "Академия Языков", city: "Москва", logo: akademiyaLogo, photo: kokorinaPhoto },
  { name: "Галина Фаустова", school: "LS Studio", city: "Белгород", logo: lsStudioLogo, photo: faustovaPhoto },
  { name: "Юлия Алексеева", school: "Liberty School", city: "Московская область", logo: libertyLogo, photo: alekseevaPhoto },
  { name: "Татьяна Ермилова", school: "ABC School", city: "Москва", logo: abcSchoolLogo, photo: ermilovaPhoto },
  { name: "Светлана Гольцова", school: "HighFlySchool", city: "Москва", logo: highflyLogo, photo: goltsovaPhoto },
];

const members: Member[] = [
  { name: "Татьяна Морозова", school: "Lingua Cat", city: "Москва", logo: linguaCatLogo },
  { name: "Ирина Бондарь", school: "IC School", city: "Москва", logo: icSchoolLogo },
  { name: "Екатерина Полянская", school: "Космос", city: "Московская область", logo: kosmosLogo },
  { name: "Юлия Мирошниченко", school: "ABC Club", city: "Московская область", logo: abcClubLogo },
  { name: "Светлана Москаленко", school: "Motion School", city: "Московская область", logo: motionSchoolLogo },
  { name: "Елена Шестакова", school: "Eye Club", city: "Кисловодск", logo: eyeClubLogo },
  { name: "Александра Филиппова", school: "Язык для успеха", city: "Чебоксары", logo: yazykUspekhaLogo },
  { name: "Диана Воробьева", school: "Лингва-Плюс", city: "Курск", logo: lingvaPlusLogo },
  { name: "Вера Романова", school: "SPU", city: "Тамбов", logo: spuLogo },
];


/* ---- gold gradient ---- */
const gold = "bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent";

/* ---- founder card (logo + photo) ---- */
const FounderCard = ({ member, index }: { member: Member; index: number }) => {
  const initials = member.name.split(" ").map((w) => w[0]).join("");
  return (
    <AnimatedSection delay={index * 0.05}>
      <div className="rounded-[1.5rem] border border-border p-6 bg-card hover:border-primary/30 transition-all duration-300 group h-full flex items-start gap-4">
        <div className="flex-1 min-w-0">
          {member.logo ? (
            <div className="h-7 mb-4">
              <img src={member.logo} alt={member.school} className="h-full w-auto object-contain" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm mb-4 group-hover:scale-110 transition-transform duration-300">
              {initials}
            </div>
          )}
          <p className="font-semibold text-foreground normal-case">{member.name}</p>
          <p className="text-sm text-muted-foreground normal-case">{member.school}</p>
          <p className="text-xs text-muted-foreground/60 normal-case mt-1">{member.city}</p>
        </div>
        {member.photo && (
          <div className="w-28 self-stretch rounded-2xl overflow-hidden flex-shrink-0">
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};

/* ---- member card (logo or initials only) ---- */
const MemberCard = ({ member, index }: { member: Member; index: number }) => {
  const initials = member.name.split(" ").map((w) => w[0]).join("");
  return (
    <AnimatedSection delay={index * 0.05}>
      <div className="rounded-[1.5rem] border border-border p-6 bg-card hover:border-primary/30 transition-all duration-300 group h-full">
        {member.logo ? (
          <div className="h-10 mb-4">
            <img src={member.logo} alt={member.school} className="h-full w-auto object-contain" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm mb-4 group-hover:scale-110 transition-transform duration-300">
            {initials}
          </div>
        )}
        <p className="font-semibold text-foreground normal-case">{member.name}</p>
        <p className="text-sm text-muted-foreground normal-case">{member.school}</p>
        <p className="text-xs text-muted-foreground/60 normal-case mt-1">{member.city}</p>
      </div>
    </AnimatedSection>
  );
};

/* ---- page ---- */

const Partnership = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);

  /* gallery for pain block */
  const [gallerySlide, setGallerySlide] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const galleryPhotos = useCarousel('partnership-gallery');
  const testimonialPhotos = useCarousel('partnership-testimonials');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxPhotos, setLightboxPhotos] = useState<string[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonialPhotos.length);
  }, [testimonialPhotos.length]);

  useEffect(() => {
    if (isPaused || zoomed !== null || testimonialPhotos.length === 0) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide, testimonialPhotos.length]);

  useEffect(() => {
    if (galleryPaused) return;
    const interval = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % galleryPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [galleryPaused, galleryPhotos.length]);

  return (
    <main className="space-y-4">
      <Header />

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img
            src={heroImg}
            alt="Команда руководителей Ассоциации Траектория Роста"
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
              Для руководителей образовательных центров
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-[0.95] mb-4 max-w-4xl"
            >
              Вы&nbsp;строите центр.
              <br />
              Мы&nbsp;знаем как это <span className={gold}>бывает.</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
            >
              <p className="text-base md:text-lg text-primary-foreground/85 max-w-lg font-normal normal-case leading-relaxed">
                Ассоциация «Траектория Роста» объединяет 15&nbsp;центров из&nbsp;разных городов России. Не&nbsp;для того чтобы конкурировать — а&nbsp;чтобы вместе делать то, что в&nbsp;одиночку невозможно.
              </p>
              <a href="#about" className="inline-block btn-gold px-8 py-4 rounded-2xl transition-all text-sm tracking-widest shrink-0">
                Узнать об&nbsp;ассоциации ↓
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PAIN — "Это знакомо?" ── */}
      <section id="about" className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-10">
              Это <span className={gold}>знакомо?</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="w-full lg:w-1/2 space-y-6">
                <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                  Строить образовательный центр — значит каждый день решать задачи, для которых нет готовых ответов. Как удержать сильных педагогов. Как объяснить родителям ценность того, что вы делаете. Как расти, когда рядом конкуренты которые демпингуют. Как не выгореть самому.
                </p>
                <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                  Большинство руководителей проходят через это в одиночку. Потому что не с кем поговорить — те кто рядом либо конкуренты, либо не понимают специфики.
                </p>
                <p className="text-foreground text-base md:text-lg font-medium normal-case leading-relaxed">
                  Ассоциация появилась именно из&nbsp;этого ощущения. В&nbsp;2021&nbsp;году несколько руководителей языковых школ начали встречаться и&nbsp;разговаривать — и&nbsp;обнаружили, что у&nbsp;всех одни и&nbsp;те&nbsp;же вопросы. И&nbsp;что многое можно решить вместе.
                </p>
              </div>

              {/* Stacked photo carousel */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <div
                  className="relative w-full h-[460px]"
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
                            y: offset * 16,
                            x: offset * 8,
                            zIndex: galleryPhotos.length - offset,
                            rotateZ: offset * -2,
                          }}
                          exit={{ opacity: 0, scale: 0.9, y: -20 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className={`absolute inset-0 ${offset === 0 ? "cursor-pointer" : ""}`}
                          onClick={() => { if (offset === 0) { setLightboxPhotos(galleryPhotos); setLightboxIndex(i); setLightboxOpen(true); } }}
                        >
                          <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl">
                            <img src={photo} alt="Ассоциация" className="w-full h-full object-cover" />
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
      </section>

      {/* ── BENEFITS — "Что это значит на практике" ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="section-alt rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-4">
                Что это значит <span className={gold}>на&nbsp;практике</span>
              </h2>
              <p className="text-muted-foreground mb-14 text-lg font-normal normal-case">
                Шесть конкретных вещей, которые получает каждый центр в&nbsp;составе ассоциации.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="rounded-2xl overflow-hidden border border-border h-full bg-card">
                    <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />
                    <div className="p-6">
                      <h3 className="text-lg mb-3">{item.title}</h3>
                      <p className="text-muted-foreground text-sm normal-case leading-relaxed">{item.text}</p>
                      {item.link && (
                        <Link to={item.link} className="text-accent text-sm font-semibold inline-flex items-center gap-1 mt-4 hover:underline">
                          {item.linkText} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MEMBERS — "Кто уже внутри" ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="section-alt rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-4">
                <span className={gold}>15&nbsp;центров,</span> которые уже сделали этот&nbsp;шаг
              </h2>
              <p className="text-muted-foreground mb-14 max-w-2xl text-lg font-normal normal-case">
                Москва, Подмосковье, Белгород, Курск, Воронеж, Чебоксары, Тамбов, Кисловодск.
              </p>
            </AnimatedSection>

            <div className="mb-12">
              <p className="text-xs uppercase tracking-[0.15em] text-primary font-bold mb-6">
                Учредители
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {founders.map((m, i) => (
                  <FounderCard key={m.name} member={m} index={i} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-primary font-bold mb-6">
                Участники
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {members.map((m, i) => (
                  <MemberCard key={m.name} member={m} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE — "Почему это работает" ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-12">
              Почему это <span className={gold}>работает</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-1/3 shrink-0">
                <img
                  src={quoteImg}
                  alt="Виктория Першина"
                  className="w-full rounded-2xl object-cover aspect-[3/4]"
                />
              </div>
              <div className="w-full md:w-2/3">
                <blockquote className="border-l-4 border-accent pl-6 md:pl-8">
                  <p className="text-foreground text-lg md:text-xl font-normal normal-case leading-relaxed italic mb-6">
                    «В&nbsp;начале было Слово. Для меня эти строки звучат особенно, когда я&nbsp;думаю о&nbsp;нашем сообществе. Всё действительно началось с&nbsp;живого, тёплого общения. Но&nbsp;слово, сказанное с&nbsp;верой и&nbsp;поддержкой, обретает силу. Сегодня наши совместные проекты объединяют десятки школ и&nbsp;сотни участников. Мы&nbsp;создаём то, что получает искренние отклики и&nbsp;благодарность. Почему? Потому что у&nbsp;нас есть принцип, который не&nbsp;обсуждается: качество и&nbsp;польза. И&nbsp;пока это правило работает — наше слово превращается в&nbsp;дело, которому можно доверять.»
                  </p>
                  <footer className="text-foreground font-bold normal-case">
                    Виктория Першина
                  </footer>
                  <p className="text-muted-foreground text-sm normal-case">
                    Руководитель Smart Cookies Club, Москва
                  </p>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TESTIMONIALS — green bg, stacked carousel ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-accent rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-accent-foreground mb-4">
                <span className={gold}>Что говорят</span> участники ассоциации
              </h2>
              <p className="text-accent-foreground/70 text-lg mb-12 max-w-xl font-normal normal-case">
                Руководители центров — о&nbsp;том, что изменилось после вступления.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div
                className="relative mx-auto w-[320px] md:w-[380px] h-[400px] md:h-[475px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => { setIsPaused(false); setZoomed(null); }}
              >
                <AnimatePresence>
                  {testimonialPhotos.map((photo, i) => {
                    const offset = (i - currentTestimonial + testimonialPhotos.length) % testimonialPhotos.length;
                    if (offset > 4) return null;
                    const isZoomed = zoomed === i;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{
                          opacity: isZoomed ? 1 : offset === 0 ? 1 : 0.55 - offset * 0.1,
                          scale: isZoomed ? 1.08 : 1 - offset * 0.045,
                          y: isZoomed ? -8 : offset * 18,
                          x: isZoomed ? 0 : offset * 10,
                          zIndex: isZoomed ? 100 : testimonialPhotos.length - offset,
                          rotateZ: isZoomed ? 0 : offset * -2,
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => offset === 0 && setZoomed(isZoomed ? null : i)}
                      >
                        <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl bg-background">
                          <img src={photo} alt={`Отзыв ${i + 1}`} className="w-full h-full object-cover" />
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

      {/* ── JOIN — "Как это работает" ── */}
      <section id="join" className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-4">
              Как это <span className={gold}>работает</span>
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl text-lg font-normal normal-case leading-relaxed">
              Никакого сложного процесса. Напишите нам — познакомимся, расскажем как устроена ассоциация изнутри и&nbsp;ответим на&nbsp;все вопросы.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col">
                <h3 className="text-xl mb-6">Обсудить партнёрство</h3>
                <p className="text-muted-foreground text-sm normal-case leading-relaxed mb-8">
                  Расскажите о&nbsp;себе и&nbsp;своём центре — мы&nbsp;свяжемся в&nbsp;течение дня.
                </p>

                <button
                  onClick={() => setFormOpen(true)}
                  className="block w-full text-center btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest mb-6"
                >
                  Оставить заявку
                </button>

                <div className="space-y-2 text-sm text-muted-foreground normal-case mt-auto">
                  <p>📧 rost-traektoria@yandex.ru</p>
                </div>

                <p className="text-xs text-muted-foreground/50 normal-case mt-6">
                  Нажимая кнопку, вы соглашаетесь на&nbsp;обработку персональных данных в&nbsp;соответствии со&nbsp;ст.&nbsp;9&nbsp;ФЗ-152.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl overflow-hidden h-full">
                <img
                  src={russiaMap}
                  alt="География ассоциации"
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CROSS-LINKS — "Посмотрите ещё" ── */}
      <section className="px-3 md:px-6 xl:px-10 mb-4">
        <div className="bg-foreground rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-primary-foreground mb-14">
                Посмотрите <span className={gold}>ещё</span>
              </h2>
            </AnimatedSection>

            <div className="space-y-8">
              <AnimatedSection delay={0.05}>
                <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-start">
                  <div>
                    <p className="text-primary-foreground/70 text-sm normal-case mb-3">
                      Хотите сначала понять как устроена вся ассоциация?
                    </p>
                    <Link
                      to="/"
                      className="text-accent text-sm font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      Об ассоциации <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>

              <hr className="border-primary-foreground/20" />

              <AnimatedSection delay={0.1}>
                <div>
                   <p className="text-primary-foreground/70 text-sm normal-case mb-4">
                    Хотите показать педагогам что у нас есть для них?
                  </p>
                    <div className="grid md:grid-cols-2 gap-4">
                    <Link
                      to="/uchitelya/kurs"
                      className="block bg-primary-foreground/10 border border-primary-foreground/20 rounded-2xl p-6 hover:bg-primary-foreground/15 transition-colors"
                    >
                      <span className="text-xs text-accent uppercase tracking-wider">Hilderstone College</span>
                      <h3 className="text-lg mt-2 mb-2 text-primary-foreground">Teachers Development Course</h3>
                      <p className="text-primary-foreground/70 text-sm normal-case leading-relaxed mb-3">
                        Онлайн-интенсив с&nbsp;британскими тьюторами · июль 2026
                      </p>
                      <span className="text-accent text-sm font-semibold inline-flex items-center gap-1">
                        Подробнее <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>

                    <Link
                      to="/uchitelya/fest"
                      className="block bg-primary-foreground/10 border border-primary-foreground/20 rounded-2xl p-6 hover:bg-primary-foreground/15 transition-colors"
                    >
                      <span className="text-xs text-accent uppercase tracking-wider">ProSkill Fest</span>
                      <h3 className="text-lg mt-2 mb-2 text-primary-foreground">Фестиваль для педагогов</h3>
                      <p className="text-primary-foreground/70 text-sm normal-case leading-relaxed mb-3">
                        7&nbsp;ноября 2026 · Москва
                      </p>
                      <span className="text-accent text-sm font-semibold inline-flex items-center gap-1">
                        Подробнее <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingButtons />
      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} program="Партнёрство" page="Partnership" />
      <PhotoLightbox photos={lightboxPhotos.length ? lightboxPhotos : galleryPhotos} initialIndex={lightboxIndex} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </main>
  );
};

export default Partnership;
