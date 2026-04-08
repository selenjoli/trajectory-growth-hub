import AnimatedSection from "./AnimatedSection";
const smartCookiesLogo = "/assets/logos/smart-cookies.svg";
const akademiyaLogo = "/assets/logos/akademiya-yazykov.png";
const pershinaPhoto = "/assets/founders/pershina.jpg";
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

const MembersSection = () => {
  return (
    <section className="px-3 md:px-6 xl:px-10">
      <div className="section-alt rounded-[2rem] py-20 px-6 md:px-16">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-4">
              Кто входит
              <br />
              в ассоциацию
            </h2>
            <p className="text-muted-foreground mb-14 max-w-2xl text-lg font-normal normal-case">
              15 школ и центров дополнительного образования — Москва, Подмосковье, Белгород, Курск, Воронеж, Чебоксары, Тамбов, Кисловодск.
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
  );
};

export default MembersSection;
