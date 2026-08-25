"use client";

const features = [
  {
    title: "Desarrollo Java",
    description: "Java SE y frameworks modernos del ecosistema: Spring Boot, JPA/Hibernate y Jakarta EE.",
  },
  {
    title: "Trabajo en equipo",
    description: "Experiencia colaborativa en metodologías ágiles, con Scrum y revisión de código como práctica diaria.",
  },
  {
    title: "Orientado a resultados",
    description: "Soluciones eficientes y escalables, apoyadas en pruebas, SOLID y principios de código limpio.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="w-full border-b border-border bg-card">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-22 lg:py-24">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-18">
          <span className="font-code text-[11px] uppercase tracking-[0.14em] text-[hsl(40_5%_53%)]">
            01 — Perfil
          </span>

          <div className="flex flex-col gap-12">
            <h2 className="max-w-[860px] font-headline text-2xl sm:text-[34px] font-normal leading-[1.42] tracking-[-0.015em] text-[hsl(40_10%_6%)] text-pretty">
              Apasionado por la tecnología, con gran capacidad de aprendizaje, trabajo en equipo y
              adaptabilidad. Busco seguir creciendo profesionalmente en Java y ampliar mis conocimientos
              técnicos.
            </h2>

            <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col gap-3 border-t-2 border-[hsl(40_10%_6%)] pt-5">
                  <h3 className="text-[17px] font-semibold text-[hsl(40_10%_6%)]">{feature.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
