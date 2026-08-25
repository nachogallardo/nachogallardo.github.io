"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, MapPin, Clock, Languages, ExternalLink, CheckCircle2 } from 'lucide-react';

const ORACLE_BADGE_URL =
  "https://catalog-education.oracle.com/ords/certview/sharebadge?id=BC4DDBEE397067D0DCC3895F5B3F8015C76D94F423C84C74B73DBB016D0AE199";

const facts = [
  { icon: MapPin, text: "Sevilla, España" },
  { icon: Clock, text: "Respuesta en menos de 24 h" },
  { icon: Languages, text: "Español · Inglés básico" },
];

const credentialRows = [
  { label: "Emitida por", value: "Oracle Corporation" },
];

export function HeroSection() {
  return (
    <section id="home" className="w-full border-b border-border bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-24 lg:pb-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20 items-start">

          <div className="flex flex-col gap-8 animate-rise">
            <div className="flex items-center gap-3">
              <span className="h-[7px] w-[7px] rounded-full bg-[hsl(var(--success))]" aria-hidden="true" />
              <span className="font-code text-xs uppercase tracking-[0.1em] text-[hsl(146_30%_35%)]">
                Disponible para nuevas oportunidades
              </span>
            </div>

            <h1 className="font-headline text-[2.75rem] sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-[-0.025em] text-[hsl(40_10%_6%)] text-pretty">
              Backend en Java,<br className="hidden sm:block" /> construido para durar.
            </h1>

            <p className="max-w-[620px] text-lg sm:text-xl leading-relaxed text-[hsl(40_8%_26%)] text-pretty">
              Soy Ignacio Gallardo, desarrollador certificado por Oracle en Java SE 11. Diseño y mantengo
              servicios backend con Spring Boot, APIs REST y arquitecturas de microservicios — con foco en
              código limpio, pruebas y sistemas que otro equipo pueda mantener sin dolor.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
              <Link
                href="#proyectos"
                className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-sm bg-primary px-7 text-[15.5px] font-medium text-primary-foreground transition-colors hover:bg-[hsl(213_51%_20%)]"
              >
                Ver proyectos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex h-[52px] items-center justify-center rounded-sm border border-[hsl(40_10%_76%)] px-7 text-[15.5px] font-medium text-foreground transition-colors hover:border-foreground"
              >
                Hablemos
              </Link>
            </div>

            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-7 border-t border-border pt-5 mt-2">
              {facts.map((fact) => (
                <li key={fact.text} className="flex items-center gap-2.5 text-[14.5px] text-muted-foreground">
                  <fact.icon className="h-4 w-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                  {fact.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Credencial Oracle: la prueba principal */}
          <div className="rounded-sm border border-border bg-card p-8 sm:p-9 flex flex-col gap-6 animate-rise">
            <div className="flex items-center justify-between">
              <span className="font-code text-[11px] uppercase tracking-[0.12em] text-[hsl(40_5%_53%)]">
                Certificación
              </span>
              <span className="inline-flex items-center gap-1.5 font-code text-[11px] uppercase tracking-[0.06em] text-[hsl(var(--success))]">
                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                Verificada
              </span>
            </div>

            <div className="flex justify-center pt-1">
              <Image
                src="/images/oracle-java-badge.svg"
                alt="Insignia Oracle Certified Professional, Java SE 11 Developer"
                width={150}
                height={150}
                priority
              />
            </div>

            <div className="flex flex-col gap-1.5 text-center">
              <p className="font-headline text-[23px] font-semibold leading-tight tracking-[-0.015em] text-[hsl(40_10%_6%)]">
                Oracle Certified Professional
              </p>
              <p className="text-[15px] text-[hsl(40_8%_26%)]">Java SE 11 Developer</p>
            </div>

            <div className="h-px bg-border" />

            <dl className="flex flex-col gap-3">
              {credentialRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between text-[13.5px]">
                  <dt className="text-[hsl(40_5%_53%)]">{row.label}</dt>
                  <dd className="text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={ORACLE_BADGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-[hsl(40_10%_76%)] text-sm font-medium text-primary transition-colors hover:border-primary"
            >
              Verificar en Oracle
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.7} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
