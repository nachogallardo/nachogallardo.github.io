import { ProjectsSection } from '@/components/sections/projects';
import { notFound } from 'next/navigation';

export default function ProjectsPage() {
  const showProjects = process.env.NEXT_PUBLIC_SHOW_PROJECTS === 'true';

  if (!showProjects) {
    notFound();
  }

  return (
    <>
      <ProjectsSection />
    </>
  );
}
