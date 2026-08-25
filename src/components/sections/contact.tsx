"use client";

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Linkedin, Github, Send, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from '@/hooks/use-toast';

const channels = [
  {
    icon: Mail,
    label: "nachogallardosanchez@gmail.com",
    href: "mailto:nachogallardosanchez@gmail.com",
    external: false,
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/ignaciogallardosanchez",
    href: "https://www.linkedin.com/in/ignaciogallardosanchez/",
    external: true,
  },
  {
    icon: Github,
    label: "github.com/nachogallardo",
    href: "https://github.com/nachogallardo",
    external: true,
  },
];

const fieldClass =
  "h-12 rounded-sm border-input bg-[hsl(40_20%_98%)] text-foreground placeholder:text-[hsl(40_5%_63%)] focus-visible:ring-0 focus-visible:border-primary transition-colors";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'No se pudo enviar el mensaje');
      }

      setIsSent(true);
      formRef.current?.reset();
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      toast({
        title: "No se pudo enviar el mensaje",
        description: "Inténtalo de nuevo o escríbeme directamente por email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-22 lg:py-24">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-18">
          <span className="font-code text-[11px] uppercase tracking-[0.14em] text-[hsl(40_5%_53%)]">
            04 — Contacto
          </span>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-18 items-start">
            <div className="flex flex-col gap-7">
              <h2 className="font-headline text-[34px] sm:text-[46px] font-normal leading-[1.12] tracking-[-0.02em] text-[hsl(40_10%_6%)] text-pretty">
                Hablemos de tu proyecto
              </h2>
              <p className="text-[17.5px] leading-relaxed text-[hsl(40_8%_26%)] text-pretty">
                Estoy abierto a posiciones de backend Java y a colaboraciones puntuales. Cuéntame qué
                necesitas y te respondo en menos de 24 horas.
              </p>

              <ul className="flex flex-col pt-1">
                {channels.map((channel, index) => (
                  <li key={channel.href}>
                    <Link
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className={[
                        "group flex items-center justify-between gap-4 border-t border-border py-5",
                        index === channels.length - 1 ? "border-b" : "",
                      ].join(" ")}
                    >
                      <span className="flex items-center gap-3.5 min-w-0">
                        <channel.icon
                          className="h-[18px] w-[18px] shrink-0 text-muted-foreground"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        <span className="truncate text-base text-foreground group-hover:text-primary transition-colors">
                          {channel.label}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-[hsl(40_5%_53%)] transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-sm border border-border bg-card p-7 sm:p-10"
            >
              <input
                type="hidden"
                name="access_key"
                value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'your-access-key'}
              />
              <input type="hidden" name="from_name" value="Portfolio Ignacio Gallardo" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-[13px] font-medium text-[hsl(40_8%_26%)]">
                    Nombre
                  </Label>
                  <Input id="name" name="name" type="text" required placeholder="Tu nombre" className={fieldClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-[13px] font-medium text-[hsl(40_8%_26%)]">
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" required placeholder="tu@email.com" className={fieldClass} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="subject" className="text-[13px] font-medium text-[hsl(40_8%_26%)]">
                  Asunto
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="¿En qué puedo ayudarte?"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-[13px] font-medium text-[hsl(40_8%_26%)]">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Cuéntame sobre tu proyecto…"
                  className="rounded-sm border-input bg-[hsl(40_20%_98%)] text-foreground placeholder:text-[hsl(40_5%_63%)] resize-none focus-visible:ring-0 focus-visible:border-primary transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-[50px] items-center justify-center gap-2.5 rounded-sm bg-primary px-6 text-[15.5px] font-medium text-primary-foreground transition-colors hover:bg-[hsl(213_51%_20%)] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando…
                  </>
                ) : isSent ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Mensaje enviado
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <Send className="h-4 w-4" strokeWidth={1.7} />
                  </>
                )}
              </button>

              <p className="text-center text-[12.5px] leading-relaxed text-[hsl(40_5%_53%)]">
                Tus datos se usan únicamente para responderte.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
