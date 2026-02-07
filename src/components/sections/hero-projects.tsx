"use client";

import { useState, useEffect } from 'react';
import { MatrixAnimation } from '@/components/matrix-animation';
import { ScrambleText } from '@/components/scramble-text';

export function HeroSectionProjects() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="proyectos-hero" className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden bg-black font-sans">
      {/* Background Matrix - Full screen high impact */}
      <div className="absolute inset-0 opacity-80" style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent)' }}>
        <MatrixAnimation color="#0F0" fontSize={14} speed={30} isVibrant={true} density={0.98} />
      </div>

      {/* Scanline Effect Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.05]"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04))',
          backgroundSize: '100% 4px, 3px 100%'
        }}
      />

      {/* Global Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_100%)] z-[2]" aria-hidden="true" />

      <div className="relative z-10 container px-4 md:px-6">
        <div className={`relative max-w-4xl mx-auto py-12 px-8 sm:py-20 sm:px-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

          {/* Central HUD Card */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl rounded-sm border border-green-500/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <MatrixAnimation color="#0F0" fontSize={12} speed={60} isVibrant={false} density={0.9} />
            </div>

            {/* Tactical Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/40"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/40"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/40"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/40"></div>

            {/* Scanning Laser Pulse */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-scan"></div>
          </div>

          {/* Content Layer */}
          <div className="relative z-20 space-y-6">
            <div className="space-y-4">
              {/* Identity Metadata Block */}
              <div className="relative inline-block mx-auto pb-4">
                <div className="absolute -top-6 left-0 flex items-center gap-2 text-[10px] font-mono text-green-500/60 uppercase tracking-widest animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
                  <div className="w-1.5 h-1.5 bg-green-500"></div>
                  [ARCHIVE_v4.0]
                </div>
                <div className="absolute -top-6 right-0 text-[10px] font-mono text-green-500/60 uppercase tracking-widest animate-fade-in opacity-0" style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}>
                  [NODE: <span className="text-green-400">PROYECTOS</span>]
                </div>

                <h1 className="relative font-headline text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_25px_rgba(0,255,0,0.15)] leading-tight italic uppercase group px-4">
                  <span className="relative z-10 block">
                    <ScrambleText text="Mis Proyectos" isVisible={isVisible} delay={400} />
                  </span>

                  {/* Glitch Shadow Effect */}
                  <span className="absolute inset-0 -z-10 text-green-500 opacity-0 group-hover:opacity-40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-75 block select-none px-4" aria-hidden="true">
                    Mis Proyectos
                  </span>
                  <span className="absolute inset-0 -z-20 text-red-500/40 opacity-0 group-hover:opacity-30 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-75 block select-none px-4" aria-hidden="true">
                    Mis Proyectos
                  </span>
                </h1>
              </div>

              <p className="text-green-500/80 font-mono text-sm sm:text-base max-w-2xl mx-auto leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
                <span className="text-green-400 opacity-50">$</span> ACCESO A REPOSITORIO DE DESPLIEGUE <br className="sm:hidden" />
                <span className="hidden sm:inline"> — </span>
                SELECCIÓN DE TRABAJOS DESTACADOS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Handover Bridge Divider */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent z-20 flex items-center justify-center">
        <div className="w-full max-w-7xl px-4 flex items-center gap-4 opacity-30">
          <div className="h-[1px] flex-1 bg-green-500/50"></div>
          <div className="text-[10px] font-mono text-green-500 uppercase tracking-widest">
            S_Y_S_T_E_M_LOAD
          </div>
          <div className="h-[1px] flex-1 bg-green-500/50"></div>
        </div>
      </div>
    </section>
  );
}
