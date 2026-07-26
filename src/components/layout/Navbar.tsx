import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { CvDownloadMenu } from "./CvDownloadMenu";
import { ViewModeToggle } from "./ViewModeToggle";

interface NavbarProps {
  onOpenCommand: () => void;
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home",       href: "#hero"       },
    { name: "About",      href: "#about"      },
    { name: "Projects",   href: "#projects"   },
    { name: "Experience", href: "#experience" },
    { name: "Skills",     href: "#skills"     },
    { name: "Education",  href: "#education"  },
    { name: "Contact",    href: "#contact"    },
  ];

  return (
    <nav
      className={cn(
        "navbar-shell fixed top-0 z-[100] w-full transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <svg className="navbar-glass-filter" aria-hidden="true" focusable="false">
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="section-container">
        <div className={cn("navbar-glass", scrolled && "navbar-glass--scrolled")}>
          <div className="glass-distortion-layer" aria-hidden="true" />
          <div className="glass-tint-layer" aria-hidden="true" />
          <div className="glass-highlight-layer" aria-hidden="true" />
          <div className="navbar-content flex items-center justify-between h-10">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              className="font-display text-[1.2rem] font-bold tracking-tight text-[#0B1220]"
            >
              Phat <span className="text-[#2563EB]">Nguyen</span>
            </a>
          </div>

          {/* Desktop Links & Actions */}
          <div className="hidden xl:flex items-center gap-4 min-w-0">
            <ul className="flex items-center gap-4 shrink-0">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="navbar-link text-[0.82rem] font-semibold text-[#5B6B82] hover:text-[#2563EB] transition-colors whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <ViewModeToggle />

            <div className="flex items-center gap-2 pl-3 border-l border-[#D8E1EC] shrink-0">
              {/* Download CV */}
              <CvDownloadMenu
                align="right"
                className="motion-button inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#0F2A4A] text-white text-[0.78rem] font-bold transition-all hover:bg-[#2563EB] hover:shadow-lg hover:shadow-blue-500/20 whitespace-nowrap"
              >
                <Download size={14} />
                <span>Download CV</span>
              </CvDownloadMenu>

              {/* Command Menu */}
              <button
                onClick={onOpenCommand}
                className="navbar-command-button motion-button flex items-center justify-center w-10 h-10 rounded-full border border-[#D8E1EC] bg-white text-[#0B1220] transition-all hover:border-[#2563EB] hover:text-[#2563EB] shrink-0"
                aria-label="Open command menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbar-command-button motion-button xl:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#D8E1EC] bg-white text-[#0B1220]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Simple Dropdown */}
      <div
        className={cn(
          "navbar-mobile-menu xl:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          <ViewModeToggle className="self-start" />
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-[1.1rem] font-bold text-[#0B1220]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="pt-6 border-t border-[#D8E1EC]">
            <CvDownloadMenu
              align="left"
              onSelect={() => setMobileMenuOpen(false)}
              className="motion-button flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#0F2A4A] text-white font-bold"
            >
              <Download size={18} /> Download CV
            </CvDownloadMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
