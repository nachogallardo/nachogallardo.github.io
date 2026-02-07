"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Award, Code, Users, Target, Terminal } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { MatrixAnimation } from '@/components/matrix-animation';

// Helper component for scrambling text on visibility
function ScrambleText({ text, delay = 0, isVisible }: { text: string; delay?: number; isVisible: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "01田由甲申电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
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
      }
      iteration += 1 / 3;
    }, 30);
  }, [text]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(startScramble, delay);
      return () => {
        clearTimeout(timer);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isVisible, startScramble, delay]);

  return <span>{displayText}</span>;
}

// Technical HUD container helper
function HUDCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative bg-black/40 backdrop-blur-md border border-green-500/20 p-6 group transition-all duration-500 hover:border-green-500/40 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${className}`}
      style={style}
    >
      {/* HUD Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>

      {/* Internal Scanline Pulse - PERSISTENT */}
      <div className="absolute inset-x-0 h-[100%] w-[1px] bg-green-400/5 left-0 animate-scan-slow pointer-events-none opacity-40"></div>

      {children}
    </div>
  );
}

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [isBadgeVisible, setIsBadgeVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Animation controller for verification progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBadgeVisible) {
      setVerificationProgress(0); // Reset when becoming visible
      interval = setInterval(() => {
        setVerificationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
    } else {
      setVerificationProgress(0); // Optional: keep it at 0 when hidden
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBadgeVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const badgeObserver = new IntersectionObserver(
      ([entry]) => {
        setIsBadgeVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Ensure the badge is well in view
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (badgeRef.current) badgeObserver.observe(badgeRef.current);

    return () => {
      observer.disconnect();
      badgeObserver.disconnect();
    };
  }, []);

  const features = [
    {
      icon: Code,
      title: "Desarrollo Java",
      description: "Especializado en Java SE y frameworks modernos"
    },
    {
      icon: Users,
      title: "Trabajo en Equipo",
      description: "Experiencia colaborativa en metodologías ágiles"
    },
    {
      icon: Target,
      title: "Orientado a Resultados",
      description: "Enfoque en soluciones eficientes y escalables"
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden font-sans border-t border-green-500/5">
      {/* background Matrix rain - UNIQUE SEGMENTED VARIANT for Archive Identity */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
        <MatrixAnimation color="#0F0" fontSize={16} speed={40} isVibrant={true} density={0.98} variant="segmented" />
      </div>

      {/* Grid Pattern suave */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0f0 1px, transparent 1px), linear-gradient(90deg, #0f0 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Section Header Frame */}
          <div className={`mb-16 border-l-4 border-green-500/50 pl-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="text-green-500 animate-pulse" size={18} />
              <span className="text-green-500 font-mono text-sm uppercase tracking-[0.3em] font-bold">
                <ScrambleText text="SYSTEM_STATUS: ACTIVE" isVisible={isVisible} delay={400} />
              </span>
            </div>
            <h2 className="font-headline text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl text-white uppercase italic">
              <ScrambleText text="Desarrollador y Especialista Java" isVisible={isVisible} delay={800} />
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div className={`space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '0.4s' }}>
              {/* Primary Data Module - About Me */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-green-500/10 rounded-sm blur-sm group-hover:bg-green-500/20 transition-all duration-700"></div>

                <div className="relative p-8 bg-black/60 border border-green-500/20 rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:border-green-500/40">
                  {/* Internal HUD Elements */}
                  <div className="absolute top-0 right-0 p-3 flex flex-col items-end gap-1 opacity-40">
                    <div className="text-[10px] font-mono text-green-500 uppercase tracking-widest leading-none">MEMORY_BUFFER_v2.4</div>
                    <div className="h-[1px] w-24 bg-green-500/30"></div>
                    <div className="text-[8px] font-mono text-green-500 select-none">NODE_STATUS: STABLE</div>
                  </div>

                  {/* Top-Left Accent */}
                  <div className="absolute top-0 left-0 w-12 h-[2px] bg-green-500/40"></div>
                  <div className="absolute top-0 left-0 w-[2px] h-12 bg-green-500/40"></div>

                  {/* Decorative Scanline - PERSISTENT */}
                  <div className="absolute inset-0 bg-green-500/10 h-[40%] bottom-0 animate-scan pointer-events-none"></div>

                  {/* Horizontal HUD Separation */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-green-500/40 via-green-500/10 to-transparent"></div>
                  </div>

                  <p className="text-green-400/90 text-xl leading-relaxed font-light relative z-10 selection:bg-green-500/30">
                    Apasionado por la tecnología, con gran capacidad de aprendizaje, trabajo en equipo y adaptabilidad.
                    <span className="text-green-100 font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"> Busco seguir creciendo profesionalmente en Java</span> y ampliar mis conocimientos técnicos.
                  </p>

                  {/* Bottom Technical Bar */}
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 border border-green-500/40"></div>
                      <div className="w-1.5 h-1.5 border border-green-500/40 bg-green-500/20"></div>
                      <div className="w-1.5 h-1.5 border border-green-500/40"></div>
                    </div>
                    <div className="text-[10px] font-mono text-green-500/30 animate-pulse">LLEGADA_DE_DATOS_OK</div>
                  </div>
                </div>
              </div>

              {/* Características destacadas - HUD Grid */}
              <div className="grid gap-6 sm:grid-cols-1">
                {features.map((feature, index) => (
                  <HUDCard
                    key={feature.title}
                    className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    style={{ transitionDelay: `${0.6 + index * 0.1}s` } as React.CSSProperties}
                  >
                    <div className="flex items-start gap-5">
                      <div className="p-3 rounded-sm bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-all">
                        <feature.icon className="text-green-500" size={24} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-mono font-bold text-lg text-white tracking-widest uppercase italic">
                          <ScrambleText text={feature.title} isVisible={isVisible} delay={1000 + index * 200} />
                        </h3>
                        <p className="text-green-500/60 text-sm font-medium">{feature.description}</p>
                      </div>
                    </div>
                  </HUDCard>
                ))}
              </div>
            </div>

            {/* Certification Badge Frame */}
            <div className={`flex flex-col items-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '0.8s' }}>
              <Link
                href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=BC4DDBEE397067D0DCC3895F5B3F8015C76D94F423C84C74B73DBB016D0AE199"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full"
              >
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute -inset-1 bg-green-500/10 rounded-sm blur opacity-50 group-hover:opacity-100 group-hover:bg-green-500/30 transition-all duration-700"></div>

                  <HUDCard className="flex flex-col items-center justify-center gap-6 pt-20 pb-12 px-8 bg-black/90 border-green-500/20 overflow-hidden">
                    {/* Advanced Tech Metadata Overload */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1 text-[8px] font-mono text-green-500/40 select-none">
                      <div>CREDENTIAL_ID: [BC4D-DBEE-3970]</div>
                      <div>SECURITY_LEVEL: [P_LEVEL_01]</div>
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col gap-1 text-[8px] font-mono text-green-500/40 select-none items-end">
                      <div>VERIFICATION_SRC: [ORACLE_AUTH_NODE]</div>
                      <div>ISSUED: [DEC_2019]</div>
                    </div>

                    {/* Badge Image & Reticle System */}
                    <div ref={badgeRef} className="relative flex items-center justify-center w-full min-h-[220px] mt-4 sm:mt-6">
                      {/* Targeting Reticles - Perfectly Centered */}
                      <div className="absolute w-[240px] h-[240px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity z-0">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500 animate-pulse"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500 animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500 animate-pulse"></div>
                      </div>

                      {/* Vertical Data Stream Overlay */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        <MatrixAnimation color="#0F0" fontSize={10} speed={100} isVibrant={false} density={0.8} />
                      </div>

                      <div className="relative z-10 -translate-y-4"> {/* Compensation for wooden base to center the coin */}
                        <Image
                          src="https://brm-workforce.oracle.com/pdf/certview/images/OCPJSE11.png"
                          alt="Oracle Certified Professional, Java SE 11 Developer Badge"
                          width={180}
                          height={180}
                          className="drop-shadow-[0_0_20px_rgba(34,197,92,0.4)] group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(34,197,92,0.6)] transition-all duration-700"
                          priority
                        />
                        {/* Scanning line for image */}
                        <div className="absolute inset-0 bg-green-500/10 h-[2px] top-0 animate-scan pointer-events-none z-20"></div>
                      </div>
                    </div>

                    <div className="space-y-5 w-full relative z-10">
                      <div className="text-center">
                        <p className="font-headline font-black text-2xl text-white tracking-widest uppercase italic group-hover:text-green-400 transition-colors">
                          <ScrambleText text="Java SE 11 Developer" isVisible={isVisible} delay={1200} />
                        </p>
                        <p className="text-[10px] text-green-500/50 font-mono mt-2 tracking-[0.3em]">
                          ORACLE_CERTIFICATION
                        </p>
                      </div>

                      {/* Verification Progress Protocol */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-[8px] font-mono text-green-500/60 uppercase tracking-widest">
                          <span>Verification_In_Progress...</span>
                          <span>{verificationProgress}%</span>
                        </div>
                        <div className="h-[2px] w-full bg-green-500/10 overflow-hidden relative border border-green-500/5">
                          <div
                            className="absolute top-0 left-0 h-full bg-green-500 shadow-[0_0_10px_#0f0] transition-all duration-300"
                            style={{ width: `${verificationProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-3 py-3 px-4 bg-green-500/10 border border-green-500/20 uppercase font-mono text-[10px] tracking-[0.2em] text-green-500 font-bold group-hover:bg-green-500/20 transition-all">
                        {verificationProgress === 100 ? (
                          <>
                            <Award size={14} className="animate-pulse text-green-400" />
                            <span className="text-green-400">OFICIALMENTE_CERTIFICADO_OK</span>
                          </>
                        ) : (
                          <>
                            <div className="w-3 h-3 border-2 border-green-500/40 border-t-green-500 animate-spin"></div>
                            <span>VALIDANDO_CREDENCIALES...</span>
                          </>
                        )}
                      </div>
                    </div>
                  </HUDCard>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
