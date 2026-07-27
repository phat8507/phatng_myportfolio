import { ArrowUpRight, Globe, Envelope, MapPin, Phone } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { profileData } from "../../data/profile";
import {
  createBlurFadeUpVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
  viewportReveal,
} from "../motion/variants";

export function Contact() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const reveal = createBlurFadeUpVariants(shouldReduceMotion);
  const staggerContainer = createStaggerContainerVariants(shouldReduceMotion, 0.08);
  const staggerItem = createStaggerItemVariants(shouldReduceMotion);
  const contactCards = [
    {
      label: "Email",
      value: profileData.contact.email,
      href: `mailto:${profileData.contact.email}`,
      icon: <Envelope size={16} />,
      external: false,
    },
    {
      label: "Phone",
      value: profileData.contact.phone,
      href: `tel:${profileData.contact.phone.replace(/\s/g, "")}`,
      icon: <Phone size={16} />,
      external: false,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/nhtruongphat",
      href: profileData.contact.linkedin,
      icon: (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5.5 8v4.5M5.5 6v.01M8.5 12.5V10a2 2 0 014 0v2.5M8.5 8v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      external: true,
    },
    {
      label: "GitHub",
      value: "github.com/phat8507",
      href: profileData.contact.github,
      icon: (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 2a7 7 0 00-2.21 13.64c.35.06.48-.15.48-.34v-1.23c-1.95.42-2.36-.94-2.36-.94-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.07 1.64.76 2.04.58.06-.45.24-.76.44-.94-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.39.72-1.88-.07-.18-.31-.89.07-1.85 0 0 .59-.19 1.92.72A6.68 6.68 0 019 6.82c.59 0 1.19.08 1.74.23 1.33-.9 1.92-.72 1.92-.72.38.96.14 1.67.07 1.85.45.49.72 1.11.72 1.88 0 2.7-1.64 3.29-3.21 3.47.25.22.48.65.48 1.31v1.94c0 .19.13.41.48.34A7 7 0 009 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      external: true,
    },
    {
      label: "Portfolio",
      value: "phat8507.github.io/phatng_myportfolio",
      href: profileData.contact.portfolio,
      icon: <Globe size={16} />,
      external: true,
    },
  ];

  return (
    <motion.section
      id="contact"
      className="contact-section border-t relative overflow-hidden"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      <div className="contact-section-glow" aria-hidden="true" />

      <div className="section-container contact-container relative z-10">
        <motion.div
          className="contact-layout"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          <motion.div className="contact-copy" variants={staggerItem}>
            <h2 className="contact-title">
              Let's <span>work</span>
              <br />
              together.
            </h2>
            <p className="contact-description">
              Open to internship opportunities in project coordination, project management, operations, event logistics, and business research.
            </p>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="contact-cta motion-button shiny-cta-same-color inline-flex items-center text-white font-bold rounded-full transition-all hover:opacity-85 hover:-translate-y-0.5"
            >
              <span>
                <Envelope size={14} />
                Send me an email
              </span>
            </a>
          </motion.div>

          <motion.div className="contact-card-list" variants={staggerContainer}>
            {contactCards.map((card) => (
              <motion.div key={card.label} variants={staggerItem}>
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="contact-card contact-gradient-card group"
                >
                  <div className="contact-card-icon">{card.icon}</div>
                  <div className="contact-card-content">
                    <div className="contact-card-label">{card.label}</div>
                    <div className="contact-card-value">{card.value}</div>
                  </div>
                  <ArrowUpRight size={15} className="contact-card-arrow" />
                </a>
              </motion.div>
            ))}

            <motion.div variants={staggerItem}>
              <div className="contact-card contact-gradient-card contact-card--static">
                <div className="contact-card-icon">
                  <MapPin size={16} />
                </div>
                <div className="contact-card-content">
                  <div className="contact-card-label">Location</div>
                  <div className="contact-card-value">{profileData.location}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
