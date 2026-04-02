import AnimatedSection from "./AnimatedSection";
import smartCookiesLogo from "@/assets/logos/smart-cookies.svg";
import akademiyaLogo from "@/assets/logos/akademiya-yazykov.png";
import pershinaPhoto from "@/assets/founders/pershina.jpg";
import kokorinaPhoto from "@/assets/founders/kokorina.jpg";
import lsStudioLogo from "@/assets/logos/ls-studio.png";
import faustovaPhoto from "@/assets/founders/faustova.jpg";
import libertyLogo from "@/assets/logos/liberty-school.png";
import alekseevaPhoto from "@/assets/founders/alekseeva.png";

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
  { name: "Юлия Алексеева", school: "Liberty School", city: "Московская область" },
  { name: "Татьяна Ермилова", school: "ABC School", city: "Москва" },
  { name: "Светлана Гольцова", school: "HighFlySchool", city: "Москва" },
];

const members: Member[] = [
  { name: "Татьяна Морозова", school: "Lingua Cat", city: "Москва" },
  { name: "Ирина Бондарь", school: "IC School", city: "Москва" },
  { name: "Екатерина Полянская", school: "Космос", city: "Московская область" },
  { name: "Юлия Мирошниченко", school: "ABC Club", city: "Московская область" },
  { name: "Светлана Москаленко", school: "Motion School", city: "Московская область" },
  { name: "Елена Шестакова", school: "Eye Club", city: "Кисловодск" },
  { name: "Александра Филиппова", school: "Язык для успеха", city: "Чебоксары" },
  { name: "Диана Воробьева", school: "Лингва-Плюс", city: "Курск" },
  { name: "Вера Романова", school: "SPU", city: "Тамбов" },
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
