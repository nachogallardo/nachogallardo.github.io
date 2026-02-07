import { AboutSection } from '@/components/sections/about';
import { ContactSection } from '@/components/sections/contact';
import { HeroSection } from '@/components/sections/hero';
import { ProjectsSection } from '@/components/sections/projects';
import { SkillsSection } from '@/components/sections/skills';

export default function Home() {
  const showProjects = process.env.NEXT_PUBLIC_SHOW_PROJECTS !== 'false';

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      {showProjects && <ProjectsSection />}
      <ContactSection />
    </>
  );
}
