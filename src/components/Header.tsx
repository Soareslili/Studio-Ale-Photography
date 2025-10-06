
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.png'

const LINKS = [
  { href: "#Sobre", label: "About" },
  { href: "#Serviços", label: "Services" },
  { href: "#Portfolio", label: "Portfolio" },
  { href: "#Depoimentos", label: "Testimonials" },
  { href: "#Contato", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navBgClass = open || scrolled ? 'bg-black/90 backdrop-blur' : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${navBgClass}`} aria-label="Navegação principal">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <a href="#inicio" className="inline-flex items-center gap-2" onClick={() => setOpen(false)}>
           <img
            src={Logo}
            alt="Logo"
            className="h-13 lg:h-20 ml-20 cursor-pointer select-none"
         
          />
        </a>

        <div className="hidden md:flex md:flex-1 justify-center items-center gap-6">
          {LINKS.map(link => (
            <a key={link.href} href={link.href} className="text-white/90 hover:text-white px-2 py-1 rounded-md hover:bg-white/10 transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-white/10"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>

      
        <div
          className={`md:hidden fixed inset-0 z-40 transition-opacity ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Drawer */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-[320px] z-50 bg-black transform-gpu transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-4 flex items-center justify-between h-16 border-b border-white/10">
            <span className="text-white font-semibold">Menu</span>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10" aria-label="Fechar menu" onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <nav className="px-4 pb-6 flex flex-col gap-2">
            {LINKS.map(link => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block text-white/90 hover:text-white px-3 py-3 rounded-lg hover:bg-white/10 transition-colors">
                {link.label}
              </a>
            ))}
            <a
              href="https://api.whatsapp.com/send?phone=55119999999&text=Ol%C3%A1%20Lino,%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.%20"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center h-11 px-4 rounded-xl bg-red-700 text-white hover:bg-red-600 transition-colors mx-3"
            >
              Orçamento via WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </nav>
  );
}
