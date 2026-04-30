import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { ImpactSnapshot } from './components/sections/ImpactSnapshot';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { CommandMenu } from './components/layout/CommandMenu';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { IntroPreloader } from './components/ui/IntroPreloader';
import { NeuralBackground } from './components/ui/neural-background';
import { CustomCursor } from './components/ui/CustomCursor';
import { AdminPage } from './components/admin/AdminPage';

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const routePath = window.location.pathname.replace(basePath, '') || '/';
  const isAdminPage = routePath === '/admin';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const combo = isMac
        ? e.metaKey && e.key.toLowerCase() === 'k'
        : e.ctrlKey && e.key.toLowerCase() === 'k';

      if (combo) {
        e.preventDefault();
        setCommandOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* ── Intro preloader ── */}
      {!isAdminPage && !preloaderDone && (
        <IntroPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* ── Global NeuralBackground — fixed, behind all content ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-[#F7F9FC]">
        <NeuralBackground
          className="w-full h-full opacity-[0.62]"
          color="rgba(80, 145, 255, 0.36)"
          trailOpacity={0.075}
          particleCount={9000}
          speed={1}
        />
      </div>
      <CustomCursor />

      {isAdminPage ? (
        <AdminPage />
      ) : (
        <>
          <ScrollProgress />
          <Navbar onOpenCommand={() => setCommandOpen(true)} />

          <main>
            <Hero />
            <ImpactSnapshot />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Education />
            <Contact />
          </main>

          <BackToTop />
          <CommandMenu isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
        </>
      )}
    </>
  );
}

export default App;
