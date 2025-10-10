import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/Logo.png";

type LinkItem = { href: `#${string}`; label: string };

const LINKS: LinkItem[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#Servicos", label: "Services" },
  { href: "#Portfolio", label: "Portfolio" },
  { href: "#Depoimentos", label: "Testimonials" },
  { href: "#Contato", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#home");

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // ===== Scroll state (cor de fundo e sombra) =====
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ===== Body scroll lock enquanto o menu está aberto =====
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  // ===== Esc para fechar e foco inicial no drawer =====
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      // foca no primeiro foco dentro do drawer
      const firstFocusable = drawerRef.current?.querySelector<
        HTMLButtonElement | HTMLAnchorElement
      >("a, button");
      firstFocusable?.focus();
    } else {
      // devolve foco ao botão do menu
      btnRef.current?.focus();
    }
  }, [open]);

  // ===== Scroll suave com offset do header fixo =====
  const smoothScrollTo = useCallback((hash: string) => {
    const el = document.querySelector<HTMLElement>(hash);
    if (!el) return;
    const header = document.getElementById("site-header");
    const headerH = header?.offsetHeight ?? 72;
    const rectTop = el.getBoundingClientRect().top;
    const y = rectTop + window.scrollY - headerH - 8; // leve respiro

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    window.scrollTo({
      top: y,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      smoothScrollTo(href);
      setActive(href);
      history.replaceState(null, "", href); // atualiza URL sem pular
    }
  };

  // ===== Destacar link ativo (IntersectionObserver) =====
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.replace("#", ""));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!targets.length) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const obs = new IntersectionObserver(
      (entries) => {
        // escolhe a seção mais visível
        let topMost: { id: string; ratio: number } | null = null;
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            const id = `#${ent.target.id}`;
            const ratio = ent.intersectionRatio;
            if (!topMost || ratio > topMost.ratio) topMost = { id, ratio };
          }
        });
        if (topMost) setActive(topMost.id);
      },
      {
        // ativa um pouco antes de ocupar metade da viewport
        root: null,
        rootMargin: prefersReduced ? "0px" : "-20% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  const navBgClass =
    open || scrolled
      ? "bg-black/85 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
      : "bg-transparent";

  const linkBase =
    "px-2 py-1 rounded-md transition-colors duration-200 text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

  return (
    <nav
      id="site-header"
      className={`fixed top-0 left-0 w-full z-[60] ${navBgClass}`}
      aria-label="Navegação principal"
      style={{
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="inline-flex items-center gap-2"
          onClick={(e) => handleLinkClick(e as any, "#home")}
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-16 cursor-pointer select-none transition-transform duration-200 hover:scale-[1.02]"
            draggable={false}
          />
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-2 lg:gap-4">
          {LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`${linkBase} ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-white/80 hover:text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        

        {/* Mobile menu button */}
        <button
          ref={btnRef}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>

        {/* Overlay */}
        <div
          className={`md:hidden fixed inset-0 z-40 transition-opacity ${
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Drawer */}
        <div
          id="mobile-drawer"
          ref={drawerRef}
          className={`md:hidden fixed top-0 right-0 h-[100dvh] w-[85vw] max-w-[340px] z-[50] bg-black transform-gpu transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="p-4 flex items-center justify-between h-16 border-b border-white/10">
            <span className="text-white font-semibold">Menu</span>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
            >
              <X />
            </button>
          </div>

          <nav className="px-4 pb-6 flex flex-col gap-2">
            {LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

           
          
          </nav>
        </div>
      </div>
    </nav>
  );
}
