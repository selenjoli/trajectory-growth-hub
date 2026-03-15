import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoDark from "@/assets/logo-dark.svg";

interface DropdownItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href: string;
  children?: DropdownItem[];
  isButton?: boolean;
}

const leftMenu: MenuItem[] = [
  {
    label: "Программы для детей",
    href: "/kanikuly",
    children: [
      { label: "Дубай", href: "/kanikuly/uae" },
      { label: "Китай", href: "/kanikuly/china" },
      { label: "Море", href: "/kanikuly/more" },
      { label: "Алтай", href: "/kanikuly/altai" },
      { label: "Онлайн-интенсив с Hilderstone", href: "/kanikuly/online" },
    ],
  },
  {
    label: "Учителям",
    href: "/uchitelya",
    children: [
      { label: "Онлайн-курс Hilderstone", href: "/uchitelya/kurs" },
      { label: "ProSkill Fest", href: "/uchitelya/fest" },
    ],
  },
];

const rightMenu: MenuItem[] = [
  { label: "Партнерство", href: "/partnerstvo" },
  { label: "Об ассоциации", href: "/" },
  { label: "Записаться", href: "#forma", isButton: true },
];

const DropdownMenu = ({
  items,
  isOpen,
}: {
  items: DropdownItem[];
  isOpen: boolean;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 mt-2 min-w-[220px] bg-background rounded-xl shadow-lg border border-border py-2 z-50"
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block px-5 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
          >
            {item.label}
          </a>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

const NavItem = ({ item }: { item: MenuItem }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    if (item.children) setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  if (item.isButton) {
    return (
      <a
        href={item.href}
        className="bg-action text-action-foreground font-bold uppercase text-xs tracking-widest px-6 py-3 rounded-xl hover:brightness-110 transition-all"
      >
        {item.label}
      </a>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <a
        href={item.href}
        className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2 flex items-center gap-1"
      >
        {item.label}
        {item.children && (
          <svg
            className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </a>
      {item.children && <DropdownMenu items={item.children} isOpen={open} />}
    </div>
  );
};

/* ─── Mobile menu ─── */
const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const allItems = [...leftMenu, ...rightMenu];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background z-50 overflow-y-auto"
          >
            <div className="flex justify-end p-5">
              <button onClick={onClose} className="text-foreground/60 hover:text-foreground">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="px-6 pb-10 space-y-1">
              {allItems.map((item, idx) => (
                <div key={item.href + idx}>
                  {item.isButton ? (
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="block mt-4 bg-action text-action-foreground font-bold uppercase text-sm tracking-widest px-6 py-4 rounded-xl text-center"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <a
                          href={item.href}
                          onClick={onClose}
                          className="block py-3 text-base font-medium text-foreground/80"
                        >
                          {item.label}
                        </a>
                        {item.children && (
                          <button
                            onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                            className="p-2 text-foreground/50"
                          >
                            <svg
                              className={`w-4 h-4 transition-transform ${expandedIdx === idx ? "rotate-180" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {item.children && expandedIdx === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 border-l-2 border-accent/30 ml-2"
                          >
                            {item.children.map((child) => (
                              <a
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className="block py-2 text-sm text-foreground/60 hover:text-foreground"
                              >
                                {child.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-background relative z-30">
      <div className="fluid-container flex items-center justify-between px-5 md:px-10 xl:px-20 py-5">
        {/* Left nav — desktop */}
        <nav className="hidden lg:flex items-center gap-6 flex-1">
          {leftMenu.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>

        {/* Logo — center */}
        <a href="/" className="flex-shrink-0 lg:mx-8">
          <img
            src={logoDark}
            alt="Траектория Роста"
            className="h-10 md:h-12 w-auto"
          />
        </a>

        {/* Right nav — desktop */}
        <nav className="hidden lg:flex items-center justify-end gap-6 flex-1">
          {rightMenu.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-foreground/70 hover:text-foreground"
          onClick={() => setMobileOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
};

export default Header;
