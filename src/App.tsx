import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
import { ModeReactiveBackground } from './components/ui/mode-reactive-background';
import { CustomCursor } from './components/ui/CustomCursor';
import { AdminPage } from './components/admin/AdminPage';

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();
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

      {/* ── Global mode-reactive background — fixed, behind all content ── */}
      <div className="motion-background fixed inset-0 -z-10 pointer-events-none bg-[#F7F9FC]">
        <ModeReactiveBackground className="w-full h-full opacity-[0.62]" />
      </div>

      <CustomCursor />

      {isAdminPage ? (
        <AdminPage />
      ) : (
        <>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>

          <ScrollProgress />
          <Navbar onOpenCommand={() => setCommandOpen(true)} />

          <motion.main
            id="main-content"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hero />
            <ImpactSnapshot />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Education />
            <Contact />
          </motion.main>

          <BackToTop />
          <CommandMenu isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
        </>
      )}
    </>
  );
}

export default App;
