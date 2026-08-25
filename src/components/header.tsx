"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/#about", text: "Sobre mí" },
  { href: "/#habilidades", text: "Stack" },
  { href: "/#proyectos", text: "Proyectos" },
  { href: "/#contact", text: "Contacto" },
];

const socials = [
  { href: "https://github.com/nachogallardo", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/ignaciogallardosanchez/", label: "LinkedIn", icon: Linkedin },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquea el scroll de fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);

    if (href.startsWith("/#")) {
      const elementId = href.substring(2);

      if (pathname !== "/") {
        router.push(href);
        return;
      }

      const element = document.getElementById(elementId);
      if (element) {
        const offset = 80;
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
      return;
    }

    router.push(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background transition-colors duration-300",
        isScrolled || isMenuOpen ? "border-b border-border" : "border-b border-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12 lg:px-16">
        <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex flex-col gap-0.5 min-w-0">
          <span className="font-headline text-[17px] sm:text-[19px] font-semibold tracking-[-0.01em] text-foreground truncate">
            Ignacio Gallardo Sánchez
          </span>
          <span className="font-code text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            Desarrollador Java
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-[14.5px] text-[hsl(40_8%_26%)] transition-colors hover:text-primary"
            >
              {link.text}
            </button>
          ))}
          <div className="flex items-center gap-1.5">
            {socials.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <social.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-input text-foreground"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-background border-t border-border overflow-y-auto">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="flex items-center justify-between border-b border-border py-5 text-left text-lg text-foreground"
              >
                {link.text}
              </button>
            ))}

            <div className="mt-7 flex items-center gap-3">
              {socials.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-sm border border-input text-[15px] text-foreground"
                >
                  <social.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  {social.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
