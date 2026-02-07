"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Github, Linkedin, Menu, X, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { MatrixAnimation } from "@/components/matrix-animation";

// Helper component for scrambling text on hover
function ScrambleButton({ text, onClick }: { text: string; onClick: () => void }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "01田由甲申电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);

  const startScramble = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isAnimatingRef.current = false;
      }
      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      onMouseEnter={startScramble}
      className="relative px-6 py-2.5 transition-all duration-300 group overflow-hidden"
    >
      {/* Button Background - Glass Node */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-sm border border-green-500/20 group-hover:border-green-500/60 group-hover:bg-green-500/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"></div>

      {/* Subtle Aura */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_70%)] transition-opacity duration-500"></div>

      {/* HUD Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500/40 group-hover:border-green-500 transition-all duration-300"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-500/40 group-hover:border-green-500 transition-all duration-300"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-500/40 group-hover:border-green-500 transition-all duration-300"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500/40 group-hover:border-green-500 transition-all duration-300"></div>

      <span className="relative z-10 font-mono text-sm tracking-[0.15em] text-green-500/90 group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all duration-300">
        {displayText.toUpperCase()}
      </span>

      {/* Action Scanline */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-green-400/30 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none"></div>
    </button>
  );
}

// Helper component for mobile navigation links with tech-frames
function MobileNavLink({ text, onClick, delay }: { text: string; onClick: () => void; delay: number }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "01田由甲申电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);

  const startScramble = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isAnimatingRef.current = false;
      }
      iteration += 1 / 2;
    }, 30);
  }, [text]);

  // Trigger on mount for menu opening effect
  useEffect(() => {
    const timer = setTimeout(startScramble, delay * 1000 + 300);
    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [delay]);

  return (
    <button
      onClick={() => {
        startScramble();
        setTimeout(onClick, 400); // Small delay to see the scramble
      }}
      className="relative w-full py-5 px-6 transition-all duration-300 group overflow-hidden animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Link Frame */}
      <div className="absolute inset-0 bg-black/60 border border-green-500/20 group-hover:border-green-500/60 group-active:bg-green-500/10 transition-all duration-300"></div>

      {/* HUD Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-lg tracking-[0.25em] text-green-500/90 group-hover:text-green-400 group-active:scale-95 transition-all">
          {displayText.toUpperCase()}
        </span>
        <div className="w-8 h-[1px] bg-green-500/30 group-hover:w-12 group-hover:bg-green-500 transition-all"></div>
      </div>

      {/* Touch scanline pulse */}
      <div className="absolute inset-x-0 h-[100%] w-[2px] bg-green-400/20 left-0 opacity-0 group-active:opacity-100 group-active:animate-scan-slow pointer-events-none"></div>
    </button>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrambleName, setScrambleName] = useState("Ignacio Gallardo");
  const pathname = usePathname();
  const brandIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isBrandAnimatingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const startBrandScramble = useCallback(() => {
    if (isBrandAnimatingRef.current) return;
    isBrandAnimatingRef.current = true;

    const originalName = "Ignacio Gallardo";
    const chars = "01田由甲申电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐";
    let iteration = 0;

    if (brandIntervalRef.current) clearInterval(brandIntervalRef.current);

    brandIntervalRef.current = setInterval(() => {
      setScrambleName(prev =>
        originalName.split("").map((char, index) => {
          if (index < iteration) return originalName[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iteration >= originalName.length) {
        if (brandIntervalRef.current) clearInterval(brandIntervalRef.current);
        isBrandAnimatingRef.current = false;
      }
      iteration += 1 / 3;
    }, 30);
  }, []);

  // Periodic Scramble
  useEffect(() => {
    const trigger = setInterval(startBrandScramble, 12000);
    return () => {
      clearInterval(trigger);
      if (brandIntervalRef.current) clearInterval(brandIntervalRef.current);
    };
  }, [startBrandScramble]);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      const elementId = href.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        const offset = 96; // Header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  const showProjects = process.env.NEXT_PUBLIC_SHOW_PROJECTS === 'true';

  const navLinks = [
    { href: "#about", text: "Sobre mí" },
    { href: "#habilidades", text: "Habilidades" },
    ...(showProjects ? [{ href: "#proyectos", text: "Proyectos" }] : []),
    { href: "#contact", text: "Contacto" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled || isMenuOpen
          ? "bg-black/90 backdrop-blur-3xl border-b border-green-500/40 shadow-[0_0_30px_rgba(0,0,0,0.9)]"
          : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="container mx-auto flex h-24 items-center px-4 md:px-8">
        {/* Left Column - Brand Logo (flex-1 to balance) */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            onMouseEnter={startBrandScramble}
            onClick={() => {
              setIsMenuOpen(false);
              window.dispatchEvent(new CustomEvent('dispatch-transition', {
                detail: { variant: 'reboot' }
              }));
            }}
            className="font-headline text-xl font-bold transition-all duration-300 group flex items-center gap-4"
          >
            <div className="relative p-2 rounded-sm bg-black/50 backdrop-blur-sm border-2 border-green-500/40 group-hover:border-green-400 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <Code className="h-6 w-6 text-green-500 group-hover:text-green-400 relative z-10" />
              <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-green-400/40 animate-scan pointer-events-none"></div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-base md:text-lg text-green-500 group-hover:text-green-400 tracking-tighter transition-all duration-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] whitespace-nowrap">
                {scrambleName}
              </span>
              <span className="font-mono text-[8px] sm:text-[10px] text-green-900 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold group-hover:text-green-700 transition-colors whitespace-nowrap">
                Access Granted // Protocol v2.4
              </span>
            </div>
          </Link>
        </div>

        {/* Center Column - Navigation Links (Naturally centered) */}
        <nav className="hidden lg:flex items-center gap-4 px-4">
          {navLinks.map((link) => (
            <ScrambleButton
              key={link.href}
              text={link.text}
              onClick={() => handleLinkClick(link.href)}
            />
          ))}
        </nav>

        {/* Right Column - Social Icons & Toggle (flex-1 to balance) */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="https://github.com/nachogallardo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="relative p-3 rounded-sm bg-black/40 border border-green-500/20 hover:border-green-500/60 hover:bg-green-500/5 transition-all duration-300 group"
            >
              <Github className="h-5 w-5 text-green-700 group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] relative z-10 transition-colors" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-green-500/5 transition-opacity"></div>
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/ignaciogallardosanchez/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="relative p-3 rounded-sm bg-black/40 border border-green-500/20 hover:border-green-500/60 hover:bg-green-500/5 transition-all duration-300 group"
            >
              <Linkedin className="h-5 w-5 text-green-700 group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] relative z-10 transition-colors" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-green-500/5 transition-opacity"></div>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>

          <button
            className="lg:hidden p-3 rounded-sm bg-black/60 border border-green-500/40 text-green-500 transition-all duration-300 active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              {isMenuOpen ? (
                <X className="h-6 w-6 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Menú móvil mejorado - Matrix Style */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/98 backdrop-blur-3xl border-b border-green-500/50 animate-slide-up relative overflow-hidden min-h-[70vh] flex flex-col">
          {/* Matrix Rain Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <MatrixAnimation color="#0F0" fontSize={14} speed={40} isVibrant={true} density={0.9} />
          </div>

          {/* Dynamic Background Effects - Cleaner Transition */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.08)_0%,transparent_70%)] animate-pulse-glow"></div>

          <nav className="flex flex-col items-stretch gap-4 py-12 px-6 relative z-10 flex-1">
            {navLinks.map((link, index) => (
              <MobileNavLink
                key={link.href}
                text={link.text}
                onClick={() => handleLinkClick(link.href)}
                delay={index * 0.1}
              />
            ))}

            <div className="mt-auto flex gap-10 pt-10 border-t border-green-500/20 justify-center">
              <Link
                href="https://github.com/nachogallardo"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-4 rounded-sm bg-green-500/5 border border-green-500/20 text-green-500/70 hover:text-green-500 transition-all duration-300 hover:scale-110 group"
              >
                <Github className="h-7 w-7 relative z-10" />
                <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link
                href="https://www.linkedin.com/in/ignaciogallardosanchez/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-4 rounded-sm bg-green-500/5 border border-green-500/20 text-green-500/70 hover:text-green-500 transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="h-7 w-7 relative z-10" />
                <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
