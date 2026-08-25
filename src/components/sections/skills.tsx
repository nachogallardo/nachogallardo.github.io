"use client";

const skillCategories = [
  {
    name: "Lenguajes",
    skills: ["Java", "C#", "JavaScript", "TypeScript", "HTML / CSS", "SQL"],
  },
  {
    name: "Frameworks",
    skills: ["Spring Boot", "JPA / Hibernate", "Jakarta EE", "React", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    name: "Bases de datos",
    skills: ["MySQL", "Oracle", "PostgreSQL", "DB2", "MongoDB"],
  },
  {
    name: "DevOps y calidad",
    skills: ["Docker", "Maven", "Git", "Jenkins", "CI/CD", "JUnit", "SonarQube"],
  },
  {
    name: "Servicios y seguridad",
    skills: ["REST API", "Microservicios", "Web Services", "OAuth2", "Spring Security"],
  },
  {
    name: "Metodologías",
    skills: ["Agile", "Scrum", "TDD", "Clean Code", "SOLID"],
  },
];

export function SkillsSection() {
  return (
    <section id="habilidades" className="w-full border-b border-border bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-22 lg:py-24">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-18">
          <span className="font-code text-[11px] uppercase tracking-[0.14em] text-[hsl(40_5%_53%)]">
            02 — Stack
          </span>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-3.5">
              <h2 className="font-headline text-[34px] sm:text-[46px] font-normal leading-[1.12] tracking-[-0.02em] text-[hsl(40_10%_6%)]">
                Tecnologías con las que trabajo
              </h2>
              <p className="max-w-[640px] text-[17px] leading-relaxed text-muted-foreground">
                Herramientas que uso a diario en backend, datos y despliegue.
              </p>
            </div>

            <div className="grid md:grid-cols-2">
              {skillCategories.map((category, index) => {
                const isRightColumn = index % 2 === 1;
                return (
                  <div
                    key={category.name}
                    className={[
                      "flex flex-col gap-4 border-t border-border py-7",
                      isRightColumn ? "md:border-l md:border-l-border md:pl-11" : "md:pr-11",
                      index >= skillCategories.length - 2 ? "md:border-b" : "",
                      index === skillCategories.length - 1 ? "border-b" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-code text-xs text-[hsl(40_10%_71%)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[17px] font-semibold text-[hsl(40_10%_6%)]">{category.name}</h3>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-sm border border-input bg-card px-3.5 py-1.5 text-[13.5px] text-[hsl(40_8%_26%)]"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
