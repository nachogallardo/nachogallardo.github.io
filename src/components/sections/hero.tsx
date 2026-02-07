"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { MatrixAnimation } from '@/components/matrix-animation';
import { ScrambleText } from '@/components/scramble-text';

export function HeroSection() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleProjectsNavigation = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    // Dispatch global surge transition
    window.dispatchEvent(new CustomEvent('dispatch-transition', {
      detail: { variant: 'surge' }
    }));

    // Scroll to projects after surge peaks
    setTimeout(() => {
      const projectsSection = document.getElementById('proyectos');
      if (projectsSection) {
        const offset = 96;
        const elementPosition = projectsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }, []);

  const handleEstablishConnection = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    // Dispatch global surge transition
    window.dispatchEvent(new CustomEvent('dispatch-transition', {
      detail: { variant: 'surge' }
    }));

    // Smooth scroll after data surge peaks
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offset = 96;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center text-center overflow-hidden bg-black font-sans py-12 pt-28 sm:pt-32">

      {/* background Matrix - Vibrant */}
      <div className="absolute inset-0 opacity-80" style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent)' }}>
        <MatrixAnimation color="#0F0" fontSize={14} speed={30} isVibrant={true} density={0.98} />
      </div>

      {/* Scanline Effect Overlay suave */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.05]"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04))',
          backgroundSize: '100% 4px, 3px 100%'
        }}
      />

      {/* Gradiente radial para viñeta global */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_100%)] z-[2]" aria-hidden="true" />

      <div className="relative z-10 container px-4 md:px-6 w-full max-w-[95vw] lg:max-w-7xl flex flex-col items-center justify-center flex-grow">
        <div className={`relative w-full max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto py-8 px-4 sm:py-12 sm:px-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

          {/* Central Content Card with Integrated Matrix - HUD Style */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl rounded-sm border border-green-500/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* ... Integrated Matrix stays same ... */}
            <div className="absolute inset-0 opacity-20">
              <MatrixAnimation color="#0F0" fontSize={12} speed={60} isVibrant={false} density={0.9} />
            </div>

            {/* HUD Elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/40"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/40"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/40"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/40"></div>

            {/* Dynamic Scanline pulse */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-scan"></div>

            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

            {/* Internal tech accent */}
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <div className="w-8 h-1 sm:w-12 bg-green-500 mb-1"></div>
              <div className="w-6 h-1 sm:w-8 bg-green-500/50"></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col gap-6 sm:gap-8 lg:gap-10">
            <div className="space-y-4">
              {/* Identity HUD Block */}
              <div className="relative inline-block mx-auto pb-10 sm:pb-14">
                {/* HUD Metadata Tags */}
                <div className="absolute -top-7 sm:-top-10 left-0 flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-mono text-green-500/60 uppercase tracking-widest animate-fade-in opacity-0" style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500"></div>
                  [IDENT_PROCESS: 0x77A2]
                </div>
                <div className="absolute -top-7 sm:-top-10 right-0 text-[8px] sm:text-[10px] font-mono text-green-500/60 uppercase tracking-widest animate-fade-in opacity-0" style={{ animationDelay: '2.2s', animationFillMode: 'forwards' }}>
                  [ACCESS: <span className="text-green-400">GRANTED</span>]
                </div>

                {/* Glitch Typography */}
                <h1 className="relative font-headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_25px_rgba(0,255,0,0.15)] leading-tight italic uppercase group px-2 sm:px-4">
                  <span className="relative z-10 block break-words">
                    <ScrambleText text="Ignacio Gallardo Sánchez" isVisible={isVisible} delay={400} />
                  </span>
                  {/* Persistent Glitch Layers */}
                  <span className="absolute inset-0 z-0 text-red-500/30 translate-x-[2px] -translate-y-[1px] opacity-0 group-hover:opacity-100 animate-glitch-fast pointer-events-none select-none px-4 hidden sm:block">
                    Ignacio Gallardo Sánchez
                  </span>
                  <span className="absolute inset-0 z-0 text-cyan-500/30 -translate-x-[2px] translate-y-[1px] opacity-0 group-hover:opacity-100 animate-glitch-slow pointer-events-none select-none px-4 hidden sm:block">
                    Ignacio Gallardo Sánchez
                  </span>
                </h1>

                {/* Bottom HUD Metadata */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] font-mono text-green-500/40 uppercase tracking-[0.2em] sm:tracking-[0.4em] whitespace-nowrap animate-fade-in opacity-0" style={{ animationDelay: '2.6s', animationFillMode: 'forwards' }}>
                  [SYSTEM_STATUS: <span className="text-green-500">STABLE_V2.4</span>]
                </div>

                {/* Visual HUD Brackets */}
                <div className="absolute -inset-x-1 sm:-inset-x-4 -inset-y-2 border-x border-green-500/10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-2 sm:w-4 h-[1px] bg-green-500/20"></div>
                  <div className="absolute top-0 right-0 w-2 sm:w-4 h-[1px] bg-green-500/20"></div>
                  <div className="absolute bottom-0 left-0 w-2 sm:w-4 h-[1px] bg-green-500/20"></div>
                  <div className="absolute bottom-0 right-0 w-2 sm:w-4 h-[1px] bg-green-500/20"></div>
                </div>
              </div>

              <div className="relative h-1 w-24 sm:w-48 mx-auto overflow-hidden mt-4 sm:mt-6">
                <div className="absolute inset-0 bg-green-500/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-shimmer"></div>
              </div>
            </div>

            <p className="relative z-10 text-sm sm:text-lg text-green-100/90 md:text-xl max-w-xl mx-auto leading-relaxed font-mono tracking-tight px-4">
              <span className="inline-block animate-slide-up font-medium" style={{ animationDelay: '0.3s' }}>
                {">"} // CERTIFIED JAVA DEVELOPER
              </span>
              <br />
              <span className="inline-block animate-slide-up text-green-400/80 font-bold tracking-[0.1em]" style={{ animationDelay: '0.6s' }}>
                CREATING SCALABLE SOLUTIONS_
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4 sm:pt-8 w-full max-w-md mx-auto sm:max-w-none">
              <Button
                onClick={handleProjectsNavigation}
                size="lg"
                className="relative w-full sm:w-auto h-14 sm:h-16 px-6 sm:px-10 bg-black/60 text-green-500 border border-green-500/20 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-500 animate-slide-up group overflow-hidden rounded-none shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                style={{ animationDelay: '0.9s' }}
              >
                <span className="flex items-center justify-center relative z-10 font-mono font-bold tracking-[0.2em] text-xs sm:text-sm">
                  <Briefcase className="mr-3 h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                  <ScrambleText text="PROJECTS.EXE" isVisible={isVisible} delay={1200} triggerOnHover={true} />
                </span>

                {/* Button HUD Corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>

                {/* Internal Scanline Pulse */}
                <div className="absolute inset-x-0 h-[100%] w-[1px] bg-green-400/10 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-scan-slow pointer-events-none"></div>
              </Button>
              <Button
                onClick={handleEstablishConnection}
                size="lg"
                className="relative w-full sm:w-auto h-14 sm:h-16 px-6 sm:px-10 bg-black/60 text-green-500 border border-green-500/20 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-500 animate-slide-up group overflow-hidden rounded-none shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                style={{ animationDelay: '1.2s' }}
              >
                <span className="flex items-center justify-center relative z-10 font-mono font-bold tracking-[0.2em] text-xs sm:text-sm">
                  <ScrambleText text="ESTABLISH_CONNECTION" isVisible={isVisible} delay={1400} triggerOnHover={true} />
                  <ArrowRight className="ml-4 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-2" />
                </span>

                {/* Button HUD Corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>

                {/* Internal Scanline Pulse */}
                <div className="absolute inset-x-0 h-[100%] w-[1px] bg-green-400/10 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-scan-slow pointer-events-none"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Bridge - Technical Handover Divider */}
      <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none pb-4 px-6 md:px-12 flex items-end justify-between overflow-hidden">
        {/* Left Handover Data */}
        <div className="flex flex-col gap-1 items-start">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-mono text-green-500/50 uppercase tracking-[0.2em]">PROTOCOL_HANDOVER</span>
          </div>
          <div className="h-[1px] w-24 sm:w-32 bg-gradient-to-r from-green-500/40 to-transparent"></div>
        </div>

        {/* Central HUD Line */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-green-500/20 to-transparent">
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-green-400/40 animate-scan-slow"></div>
        </div>

        {/* Right Node Metadata */}
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[10px] font-mono text-green-500/50 uppercase tracking-[0.2em]">NODE_SYNC_2026</span>
          <div className="h-[1px] w-24 sm:w-32 bg-gradient-to-l from-green-500/40 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
