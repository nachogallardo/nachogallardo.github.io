"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe, Smartphone } from 'lucide-react';

const WEB_APP_URL = process.env.NEXT_PUBLIC_GASCOMPARE_WEB_URL || "https://gascompare.netlify.app/";
const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_GASCOMPARE_PLAY_URL ||
  "https://play.google.com/store/apps/details?id=com.gasfinder.app";

const project = {
  title: "GasCompare",
  kind: "Aplicación Android",
  status: "En Google Play",
  description:
    "Aplicación Android para consultar y comparar precios de combustible en tiempo real en toda España. " +
    "Integra geolocalización y filtrado inteligente para que el usuario encuentre la gasolinera más barata " +
    "cerca, con datos actualizados al instante.",
  image: "/images/icon-192.png",
  tags: ["Android", "Geolocalización", "API REST", "Datos en tiempo real"],
};

export function ProjectsSection() {
  return (
    <section id="proyectos" className="w-full border-b border-border bg-card">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-22 lg:py-24">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-18">
          <span className="font-code text-[11px] uppercase tracking-[0.14em] text-[hsl(40_5%_53%)]">
            03 — Proyectos
          </span>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-3.5">
              <h2 className="font-headline text-[34px] sm:text-[46px] font-normal leading-[1.12] tracking-[-0.02em] text-[hsl(40_10%_6%)]">
                Trabajo seleccionado
              </h2>
              <p className="max-w-[640px] text-[17px] leading-relaxed text-muted-foreground">
                Producto propio, publicado y en uso.
              </p>
            </div>

            <article className="grid gap-10 rounded-sm border border-border p-7 sm:p-11 md:grid-cols-[340px_minmax(0,1fr)] md:gap-14 md:items-center">
              <div className="flex h-[220px] md:h-[260px] items-center justify-center rounded-sm bg-secondary">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={116}
                  height={116}
                  className="rounded-[22px]"
                />
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-3.5">
                  <span className="font-code text-[11px] uppercase tracking-[0.1em] text-[hsl(40_5%_53%)]">
                    {project.kind}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[hsl(40_10%_76%)]" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5 font-code text-[11px] uppercase tracking-[0.06em] text-[hsl(var(--success))]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))]" aria-hidden="true" />
                    {project.status}
                  </span>
                </div>

                <h3 className="font-headline text-[28px] sm:text-4xl font-semibold leading-tight tracking-[-0.02em] text-[hsl(40_10%_6%)]">
                  {project.title}
                </h3>

                <p className="max-w-[680px] text-base sm:text-[16.5px] leading-relaxed text-[hsl(40_8%_26%)] text-pretty">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-sm bg-secondary px-3.5 py-1.5 text-[13.5px] text-[hsl(40_8%_26%)]">
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 pt-1">
                  <Link
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-[46px] items-center justify-center gap-2.5 rounded-sm bg-primary px-6 text-[14.5px] font-medium text-primary-foreground transition-colors hover:bg-[hsl(213_51%_20%)]"
                  >
                    <Smartphone className="h-4 w-4" strokeWidth={1.6} />
                    Google Play
                  </Link>
                  <Link
                    href={WEB_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-[46px] items-center justify-center gap-2.5 rounded-sm border border-[hsl(40_10%_76%)] px-6 text-[14.5px] font-medium text-foreground transition-colors hover:border-foreground"
                  >
                    <Globe className="h-4 w-4" strokeWidth={1.6} />
                    Versión web
                  </Link>
                </div>
              </div>
            </article>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-sm border border-dashed border-[hsl(40_10%_82%)] px-7 py-6">
              <p className="text-[15.5px] text-muted-foreground">
                Más trabajo, incluido código y experimentos, en mi GitHub.
              </p>
              <Link
                href="https://github.com/nachogallardo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2.5 text-[14.5px] font-medium text-primary hover:underline underline-offset-4"
              >
                github.com/nachogallardo
                <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
