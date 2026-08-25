import Link from 'next/link';

const links = [
  { href: "https://github.com/nachogallardo", label: "GitHub" },
  { href: "https://www.linkedin.com/in/ignaciogallardosanchez/", label: "LinkedIn" },
  { href: "mailto:nachogallardosanchez@gmail.com", label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-6 md:px-12 lg:px-16 py-8">
        <p className="text-[13.5px] text-[hsl(40_5%_53%)]">
          &copy; {currentYear} Ignacio Gallardo Sánchez
        </p>
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="inline-flex min-h-[44px] items-center text-[13.5px] text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
