"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Linkedin, Github, MessageCircle, MapPin, Clock, Send, CheckCircle, AlertCircle, Terminal, Cpu, Share2, ShieldCheck } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { MatrixAnimation } from '@/components/matrix-animation';
import { ScrambleText } from '@/components/scramble-text';

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

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactMethods = [
    {
      icon: Linkedin,
      title: "Linked_Node",
      label: "LinkedIn",
      description: "ignaciogallardosanchez",
      href: "https://www.linkedin.com/in/ignaciogallardosanchez/",
      bitrate: "2.4 MB/s",
      status: "CONNECTED"
    },
    {
      icon: Github,
      title: "Submodule_Git",
      label: "GitHub",
      description: "nachogallardo",
      href: "https://github.com/nachogallardo",
      bitrate: "5.0 MB/s",
      status: "VERIFIED"
    }
  ];

  const info = [
    { icon: MapPin, text: "GEOLOCK: Sevilla, España" },
    { icon: Clock, text: "UPTIME: 24/7 Disponibilidad" },
    { icon: MessageCircle, text: "COMMS: Respuesta 1h" }
  ];

  const [transmissionProgress, setTransmissionProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setTransmissionProgress(0);

    // Synthetic delay with progress updates for dramatic effect
    const delayDuration = 2200;
    const interval = 50;
    const steps = delayDuration / interval;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      setTransmissionProgress(Math.min(Math.floor((currentStep / steps) * 100), 100));
      if (currentStep >= steps) clearInterval(progressTimer);
    }, interval);

    try {
      const formData = new FormData(e.currentTarget);
      formData.delete('username');
      formData.delete('password');

      // Wait for the dramatic animation to finish
      await new Promise(resolve => setTimeout(resolve, delayDuration));

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        formRef.current?.reset();

        // Reset button state after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        throw new Error(result.message || 'Error en la transmisión');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "FALLO DE TRANSMISIÓN",
        description: "Error en el enlace descentralizado.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      clearInterval(progressTimer);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden font-sans border-t border-green-500/5 py-12 md:py-24"
    >
      {/* Background Matrix rain - VIBRANT variant for high-intensity section */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
        <MatrixAnimation color="#0F0" fontSize={14} speed={33} isVibrant={true} density={0.975} variant="rain" />
      </div>

      {/* Grid Pattern suave */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0f0 1px, transparent 1px), linear-gradient(90deg, #0f0 1px, transparent 1px)', backgroundSize: '70px 70px' }}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
        <div className="max-w-6xl mx-auto">
          {/* Section Header HUD Frame */}
          <div className={`mb-8 md:mb-16 border-l-4 border-green-500/50 pl-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center gap-3 mb-4">
              <Share2 className="text-green-500 animate-pulse" size={18} />
              <span className="text-green-500 font-mono text-sm uppercase tracking-[0.3em] font-bold">
                <ScrambleText text="COMM_LINK_ESTABLISHED" isVisible={isVisible} delay={400} />
              </span>
            </div>
            <h2 className="font-headline text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl text-white uppercase italic">
              <ScrambleText text="Hablemos de tu proyecto" isVisible={isVisible} delay={800} />
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-[1px] w-24 bg-green-500/40"></div>
              <span className="text-[10px] font-mono text-green-500/40 tracking-widest">ENCRYPTION: AES-256_ACTIVE</span>
            </div>
          </div>

          <div className="grid gap-8 md:gap-12 lg:grid-cols-[0.8fr_1.2fr] items-start">
            {/* Comunicación Nodes */}
            <div className={`space-y-6 md:space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div>
                <h3 className="text-xs font-mono text-green-500/50 uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                  <Terminal size={12} />
                  READ_PORTS
                </h3>
                <div className="grid gap-4">
                  {contactMethods.map((method, index) => {
                    const isEmail = method.label === "Email";
                    return (
                      <div key={index} className="group">
                        <HUDCard className="py-4 px-5 border-green-500/10 hover:bg-green-500/5 hover:border-green-500/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-sm bg-green-500/10 text-green-500 group-hover:scale-110 transition-transform">
                                <method.icon size={20} />
                              </div>
                              <div>
                                <div className="text-[10px] font-mono text-green-500/40 uppercase leading-none mb-1">{method.title}</div>
                                <a
                                  href={method.href}
                                  target={isEmail ? "_self" : "_blank"}
                                  rel="noopener noreferrer"
                                  className="font-mono font-bold text-white group-hover:text-green-400 transition-colors uppercase italic"
                                >
                                  {method.label}
                                </a>
                              </div>
                            </div>
                            <div className="text-right hidden sm:block">
                              <div className="text-[9px] font-mono text-green-500/40">{method.bitrate}</div>
                              <div className="text-[9px] font-mono text-green-500 tracking-tighter">{method.status}</div>
                            </div>
                          </div>
                        </HUDCard>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technical Readouts */}
              <div className="p-6 border border-green-500/10 bg-black/40 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500/20"></div>
                <h4 className="text-[10px] font-mono text-green-500/50 uppercase tracking-widest mb-4">NODE_METADATA</h4>
                <div className="space-y-3">
                  {info.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-green-400/60 font-mono text-sm">
                      <item.icon size={14} className="text-green-500/40" />
                      <span className="tracking-tight italic">{item.text}</span>
                    </div>
                  ))}
                </div>
                {/* Visual Binary Decoration */}
                <div className="mt-8 text-[8px] font-mono text-green-500/10 break-all leading-none select-none">
                  01101001 01100111 01101110 01100001 01100011 01101001 01101111 00100000 01100111 01100001 01101100 01101100 01100001 01110010 01100100 01101111
                </div>
              </div>
            </div>

            {/* SECURE_CHANNEL Transmission Form */}
            <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <HUDCard className="p-5 sm:p-10 border-green-500/20 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                {/* Form Metadata */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-green-500/40" />
                  <span className="text-[9px] font-mono text-green-500/40 tracking-widest uppercase">SECURE_LINK</span>
                </div>
                <div className="absolute top-4 left-4 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 border border-green-500/30"></div>
                  <div className="w-1.5 h-1.5 border border-green-500/30"></div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 md:space-y-8 mt-4">
                  <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'your-access-key'} />
                  <input type="hidden" name="subject" value="Nuevo mensaje desde portfolio" />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[10px] font-mono text-green-500/60 uppercase tracking-widest pl-1">NOMBRE *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Tu nombre completo"
                        className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-green-100 font-mono placeholder:text-green-500/40 rounded-none h-12 transition-all focus:ring-0 focus-visible:ring-0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-mono text-green-500/60 uppercase tracking-widest pl-1">EMAIL *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="tu@email.com"
                        className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-green-100 font-mono placeholder:text-green-500/40 rounded-none h-12 transition-all focus:ring-0 focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[10px] font-mono text-green-500/60 uppercase tracking-widest pl-1">ASUNTO</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="¿En qué puedo ayudarte?"
                      className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-green-100 font-mono placeholder:text-green-500/40 rounded-none h-12 transition-all focus:ring-0 focus-visible:ring-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[10px] font-mono text-green-500/60 uppercase tracking-widest pl-1">MENSAJE *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Cuéntame sobre tu proyecto..."
                      rows={4}
                      className="bg-black/40 border-green-500/20 focus:border-green-500/50 text-green-100 font-mono placeholder:text-green-500/40 rounded-none resize-none transition-all focus:ring-0 focus-visible:ring-0 md:rows-6"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 md:h-14 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/30 rounded-none font-headline font-black text-lg tracking-[0.2em] transition-all hover:border-green-500 group relative overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3 w-full">
                      {isSubmitting ? (
                        <div className="flex flex-col items-center gap-1 w-full scale-90">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-1 bg-green-900 overflow-hidden relative border border-green-500/20">
                              <div
                                className="absolute top-0 left-0 h-full bg-green-500 shadow-[0_0_10px_#0f0]"
                                style={{ width: `${transmissionProgress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-mono font-bold">{transmissionProgress}%</span>
                          </div>
                          <span className="text-[9px] font-mono animate-pulse tracking-[0.3em]">
                            ENCRYPTING_DATA_PACKET...
                          </span>
                        </div>
                      ) : submitStatus === 'success' ? (
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="italic uppercase">Transmisión_OK</span>
                        </div>
                      ) : (
                        <>
                          <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          <span className="italic uppercase italic">
                            <ScrambleText text="Enviar_Mensaje" isVisible={isVisible} delay={1500} />
                          </span>
                        </>
                      )}
                    </div>
                    {/* Scanning overlay on button hover */}
                    <div className="absolute inset-0 bg-green-500/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </Button>

                  {/* Anti-SPAM Label */}
                  <div className="pt-2 text-[8px] font-mono text-green-500/30 text-center uppercase tracking-widest">
                    SECURE_ENDPOINT_ACTIVE // HUMAN_VERIFICATION_REQUIRED
                  </div>
                </form>
              </HUDCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
