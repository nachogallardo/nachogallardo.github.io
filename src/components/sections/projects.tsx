"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ExternalLink, Github, Eye, Cpu, Database, Globe, Layers, Smartphone } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { MatrixAnimation } from '@/components/matrix-animation';
import { HUDCard } from '../ui/hud-card';
import { ScrambleText } from '../scramble-text';

const projects = [
  {
    title: "GasCompare",
    description: "Aplicación móvil para Android diseñada para la monitorización y comparación de precios de combustible en tiempo real en toda España. Integra geolocalización avanzada y filtrado inteligente para maximizar el ahorro del usuario, ofreciendo una interfaz optimizada y datos actualizados al instante.",
    image: { imageUrl: "/images/icon-192.png", imageHint: "Logotipo de GasCompare: Surtidor de gasolina minimalista en verde neón sobre fondo oscuro" },
    tags: ["Aplicación Android"],
    links: [
      {
        label: "WEB APP",
        url: process.env.NEXT_PUBLIC_GASCOMPARE_WEB_URL || "https://gascompare.netlify.app/",
        icon: Globe
      },
      {
        label: "GOOGLE PLAY",
        url: process.env.NEXT_PUBLIC_GASCOMPARE_PLAY_URL || "https://play.google.com/store/apps/details?id=com.gasfinder.app",
        icon: Smartphone
      }
    ],
    metadata: {
      build: "v2.1.0_STABLE",
      node: "ANDROID_CORE",
      sync: "LIVE_LINK"
    },
    icon: <Smartphone className="w-4 h-4" />
  }
];

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const webAppUrl = process.env.NEXT_PUBLIC_GASCOMPARE_WEB_URL || "https://gascompare.netlify.app/";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    // Force reset scroll lock
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    return () => {
      observer.disconnect();
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <section ref={sectionRef} id="proyectos" className="relative w-full min-h-screen pt-12 pb-20 md:pb-32 bg-black font-sans">

      {/* Background Matrix - Full screen high impact */}
      <div className="absolute inset-0 opacity-15" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 95%, transparent)' }}>
        <MatrixAnimation color="#0F0" fontSize={16} speed={45} isVibrant={true} density={0.98} variant="segmented" />
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

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header HUD Style - NEW Replaces Hero */}
          <div className="text-center mb-24 relative">
            <div className={`relative inline-block mx-auto py-12 px-8 sm:py-16 sm:px-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {/* Central HUD Card for Title */}
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

              {/* Title Content */}
              <div className="relative z-20 space-y-6">
                <div className="relative inline-block pb-4">
                  <div className="absolute -top-10 left-0 flex items-center gap-2 text-[10px] font-mono text-green-500/60 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-green-500"></div>
                    <ScrambleText text="[ARCHIVE_v4.0]" isVisible={isVisible} delay={1200} step={1} />
                  </div>
                  <div className="absolute -top-10 right-0 text-[10px] font-mono text-green-500/60 uppercase tracking-widest">
                    [NODE: <span className="text-green-400"><ScrambleText text="PROYECTOS" isVisible={isVisible} delay={1600} step={1} /></span>]
                  </div>

                  <h2 className="relative font-headline text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_25px_rgba(0,255,0,0.15)] leading-tight italic uppercase px-4">
                    <span className="relative z-10 block">
                      <ScrambleText text="MIS PROYECTOS" isVisible={isVisible} delay={500} step={1} />
                    </span>
                  </h2>
                </div>

                <p className="text-green-500/60 font-mono text-xs sm:text-sm max-w-2xl mx-auto uppercase tracking-widest">
                  <span className="text-green-400 opacity-50">$</span> <ScrambleText text="ACCESO A REPOSITORIO DE DESPLIEGUE" isVisible={isVisible} delay={1000} step={1} /> <br className="sm:hidden" />
                  <span className="hidden sm:inline"> — </span>
                  <ScrambleText text="SELECCIÓN DE TRABAJOS DESTACADOS" isVisible={isVisible} delay={1400} step={1} />
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="relative">
                  {/* Outer glow ring for project card */}
                  <div className="absolute -inset-1 bg-green-500/5 rounded-sm blur opacity-0 group-hover:opacity-100 group-hover:bg-green-500/10 transition-all duration-700"></div>

                  <HUDCard className="flex flex-col bg-black/80 border-green-500/20 group-hover:border-green-500/40 h-full overflow-hidden transition-all duration-500">

                    {/* Technical Metadata Header */}
                    <div className="w-full px-5 py-3 border-b border-green-500/10 flex justify-between items-center bg-green-500/5">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="text-green-500/60">{project.icon}</div>
                        <span className="text-[9px] font-mono text-green-500/50 uppercase tracking-widest truncate">{project.metadata.node}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[9px] font-mono text-green-400/70">{project.metadata.sync}</span>
                      </div>
                    </div>

                    {/* Project Image HUD Frame */}
                    {project.image && (
                      <div className="relative h-56 w-full overflow-hidden border-b border-green-500/10">
                        <Link href={webAppUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer">
                          <Image
                            src={project.image.imageUrl}
                            alt={project.title}
                            fill
                            className="object-contain p-4 opacity-100 md:opacity-80 md:group-hover:opacity-100 md:group-hover:scale-105 active:scale-100 active:transform-none transition-all duration-1000 grayscale md:grayscale md:group-hover:grayscale-0 select-none"
                            data-ai-hint={project.image.imageHint}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 md:opacity-60 md:group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>

                          {/* Scanning Line Overlay */}
                          <div className="absolute inset-0 bg-green-500/10 h-[1px] top-0 group-hover:animate-scan pointer-events-none z-10"></div>

                          {/* HUD Corners for image */}
                          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-green-500/40 pointer-events-none"></div>
                          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-green-500/40 pointer-events-none"></div>
                          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-green-500/40 pointer-events-none"></div>
                          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-green-500/40 pointer-events-none"></div>
                        </Link>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow space-y-5">
                      <div className="space-y-2">
                        <h3 className="font-headline text-xl text-white group-hover:text-green-500 transition-colors uppercase italic tracking-tight">
                          {project.title}
                        </h3>
                        <div className="text-[10px] font-mono text-green-500/40 uppercase tracking-widest">
                          BUILD_ID: {project.metadata.build}
                        </div>
                      </div>

                      <p className="text-green-500/60 text-sm font-mono leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {/* Tech Stacks / Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-mono bg-green-500/5 text-green-500/70 border border-green-500/10 rounded-sm hover:border-green-500/40 hover:bg-green-500/10 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Tactical Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-green-500/5">
                        {project.links.map((link) => (
                          <Button
                            key={link.label}
                            asChild
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-black border-green-500/30 text-green-500/80 hover:bg-green-500 hover:text-black hover:border-green-500 font-mono text-[10px] uppercase tracking-widest h-9"
                          >
                            <Link href={link.url} target="_blank" rel="noopener noreferrer">
                              <link.icon size={14} className="mr-2" />
                              {link.label}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </HUDCard>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}
