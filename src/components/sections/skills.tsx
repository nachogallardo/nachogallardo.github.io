"use client";

import { Badge } from "@/components/ui/badge";
import { Code, Database, Wrench, Rocket, Users, Network, Terminal } from 'lucide-react';
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

      {/* Internal Scanline Pulse */}
      <div className="absolute inset-x-0 h-[100%] w-[1px] bg-green-400/10 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-scan-slow pointer-events-none"></div>

      {children}
    </div>
  );
}

const skillCategories = {
  "Lenguajes": {
    skills: ["Java", "C#", "JavaScript", "TypeScript", "HTML/CSS", "SQL"],
    icon: Code,
    id: "LANG_CORE"
  },
  "Frameworks": {
    skills: ["Spring Boot", "React", "Next.js", "JPA/Hibernate", "Jakarta EE", "Tailwind CSS", "Bootstrap"],
    icon: Rocket,
    id: "FRAME_MOD"
  },
  "Bases de Datos": {
    skills: ["MySQL", "Oracle", "DB2", "MongoDB", "PostgreSQL"],
    icon: Database,
    id: "DB_SYNC"
  },
  "DevOps": {
    skills: ["Docker", "Maven", "Git", "Jenkins", "CI/CD", "JUnit", "SonarQube"],
    icon: Wrench,
    id: "TOOL_DEPLOY"
  },
  "Servicios": {
    skills: ["REST API", "Microservicios", "WebServices", "OAuth2", "Spring Security"],
    icon: Network,
    id: "API_GATE"
  },
  "Metodologías": {
    skills: ["Agile", "Scrum", "TDD", "Clean Code", "SOLID"],
    icon: Users,
    id: "PROC_EXEC"
  },
};

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="habilidades" className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden font-sans border-t border-green-500/5">
      {/* background Matrix rain - SEGMENTED variant for System Diagnostic ID */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
        <MatrixAnimation color="#0F0" fontSize={16} speed={45} isVibrant={true} density={0.98} variant="segmented" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className={`flex items-center justify-center gap-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Terminal className="text-green-500 animate-pulse" size={20} />
              <span className="text-green-500 font-mono text-xs uppercase tracking-[0.4em] font-bold">
                <ScrambleText text="CAPABILITIES_DIAGNOSTIC" isVisible={isVisible} delay={400} />
              </span>
            </div>

            <h2 className="font-headline text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl text-white uppercase italic">
              <ScrambleText text="Mi Stack Tecnológico" isVisible={isVisible} delay={800} />
            </h2>

            <div className={`flex items-center justify-center gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '1.2s' }}>
              <div className="h-[1px] w-12 bg-green-500/30"></div>
              <p className="text-green-500/60 text-xs font-mono uppercase tracking-[0.2em]">System Version 2.4.0 // Java_Specialist</p>
              <div className="h-[1px] w-12 bg-green-500/30"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skillCategories).map(([category, data], index) => (
              <HUDCard
                key={category}
                className={`flex flex-col transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="mb-6 flex items-center justify-between border-b border-green-500/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-all">
                      <data.icon size={18} className="text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-sm text-white tracking-widest uppercase italic group-hover:text-green-400 transition-colors">
                        {category}
                      </h3>
                      <div className="text-[9px] font-mono text-green-500/40 tracking-widest">{data.id}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-green-500/40 animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}></div>
                    <div className="w-1 h-3 bg-green-500/20"></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {data.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skill}
                      className={`bg-green-500/5 hover:bg-green-500/20 text-green-500/90 border border-green-500/20 rounded-none font-mono text-[10px] tracking-widest px-3 py-1 uppercase transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${0.6 + index * 0.1 + skillIndex * 0.05}s` } as any}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Module loading bar effect */}
                <div className="absolute bottom-0 left-0 h-[1px] bg-green-500/40 transition-all duration-1000 ease-out" style={{ width: isVisible ? '100%' : '0%', transitionDelay: `${0.5 + index * 0.1}s` }}></div>
              </HUDCard>
            ))}
          </div>

          {/* HUD Status Readouts */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1.2s' }}>
            {[
              { label: "Años de Experiencia", value: "7+", bitrate: "STABLE_EXP", icon: Rocket },
              { label: "Proyectos Completados", value: "1+", bitrate: "DEPLOY_READY", icon: Code },
              { label: "Certificaciones", value: "1", bitrate: "O_CERTIFIED", icon: Database }
            ].map((stat, index) => (
              <div key={stat.label} className="relative group p-6 bg-black/60 border border-green-500/10 hover:border-green-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-mono text-green-500/50 uppercase tracking-widest">{stat.label}</div>
                  <stat.icon size={14} className="text-green-500/40 group-hover:text-green-500 animate-pulse" />
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-black text-white italic tracking-tighter group-hover:text-green-400 transition-colors">{stat.value}</div>
                  <div className="text-[9px] font-mono text-green-500/60 font-bold">{stat.bitrate}</div>
                </div>
                {/* Decorative scanning line */}
                <div className="absolute inset-x-4 bottom-4 h-[1px] bg-green-500/10 overflow-hidden">
                  <div className="absolute left-0 h-full w-4 bg-green-500/40 animate-scan-slow opacity-0 group-hover:opacity-100"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
