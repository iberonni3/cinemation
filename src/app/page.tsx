import HeroAct from '@/components/acts/HeroAct';
import SplitReveal from '@/components/acts/SplitReveal';
import ProjectReel from '@/components/acts/ProjectReel';
import AboutSection from '@/components/acts/AboutSection';

export default function Home() {
  return (
    <main>
      <HeroAct />
      <SplitReveal />
      <ProjectReel />
      <AboutSection />
    </main>
  );
}
