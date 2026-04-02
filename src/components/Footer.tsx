import logoRed from "@/assets/logo-red.svg";

interface FooterProps {
  variant?: "gray" | "white";
}

const Footer = ({ variant = "gray" }: FooterProps) => {
  const bgClass = variant === "white" ? "bg-white" : "bg-[hsl(210,33%,96%)]";

  return (
    <footer className={`${bgClass} py-12 px-5 md:px-10 xl:px-20`}>
      <div className="fluid-container">
        {/* Three columns: docs | logo+email | org */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 mb-10 text-sm font-normal normal-case">
          {/* Legal docs */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Документы
            </h4>
            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
              Пользовательское соглашение
            </a>
            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
              Политика конфиденциальности и&nbsp;обработки персональных данных
            </a>
            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
              Согласие на&nbsp;обработку персональных данных
            </a>
          </div>

          {/* Center: logo + email */}
          <div className="flex flex-col items-center justify-start gap-4 md:px-8">
            <img src={logoRed} alt="Траектория Роста" className="h-10" />
            <a
              href="mailto:rost-traektoria@yandex.ru"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-normal normal-case"
            >
              rost-traektoria@yandex.ru
            </a>
          </div>

          {/* Org details */}
          <div className="space-y-2 md:text-right">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Сведения об организации
            </h4>
            <p className="text-muted-foreground">Наименование</p>
            <p className="text-muted-foreground">ИНН: —</p>
            <p className="text-muted-foreground">ОГРН/ОГРНИП: —</p>
            <p className="text-muted-foreground">Юридический адрес: —</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground font-normal normal-case">
            © {new Date().getFullYear()} Ассоциация «Траектория Роста». Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
