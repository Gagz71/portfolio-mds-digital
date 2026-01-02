"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Accueil.module.css";
import CtaBtn from "@/components/CtaBtn";
import ServiceCard from "@/components/ServiceCard";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import AboutSection from "@/components/AboutSection";
import ProjectModal from "@/components/ProjectModal";
import { SERVICES, TECHNOS, PROJETS } from "@/data/content";

export default function AccueilPage() {
  // State pour la modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    name: string;
    screenshots: string[];
    github: string;
  } | null>(null);

  // Fonction pour ouvrir la modal
  const openModal = (projectName: string, screenshots: string[], github: string) => {
    setSelectedProject({ name: projectName, screenshots, github });
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <main className={styles.mainAccueil}>
      {/* ===== HERO ===== */}
      <section id="top" className={styles.sectionTop}>
        <p className={styles.kicker}>VISIBILITÉ • EFFICACITÉ • PERFORMANCE</p>

        <h1 className={styles.heroTitle}>
          <span className={styles.glitch} data-text="Solutions web et mobiles">
            Solutions web et mobiles
          </span>
          <br />
          <span
            className={`${styles.glitch} ${styles.accent}`}
            data-text="sur mesure"
          >
            sur mesure
          </span>
        </h1>

        <p className={styles.pitch}>
          MDS Digital conçoit des solutions web & mobiles sur-mesure pour gagner
          en visibilité et en efficacité.
          <br />
          Sites modernes, applications intuitives, outils concrets : du propre,
          du rapide, du maintenable.
        </p>

        <p className={styles.signature}>Du concept au déploiement</p>

        <div className={styles.divCta}>
          <CtaBtn
            label="VOIR MES PROJETS"
            href="#projets"
            variant="primary"
            tone="cyan"
            size="md"
            icon="arrow"
          />
          <CtaBtn
            label="ME CONTACTER"
            href="#contact"
            variant="secondary"
            tone="cyan"
            size="md"
            icon="arrow"
          />
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className={styles.section}>
        <SectionHeader
          title="Services"
          subtitle="Du site vitrine à l'application sur-mesure, MDS Digital conçoit des solutions web et mobile claires, performantes et déployées proprement."
          number="01"
        />

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>

      {/* ===== TECHNOS ===== */}
      <section id="technos" className={styles.section}>
        <SectionHeader
          title="Technos"
          subtitle="Stack modern pour des projets rapides et performants"
          number="02"
        />

        <div className={styles.technosWrap}>
          {TECHNOS.map((tech) => (
            <span key={tech} className={styles.techBadge}>
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ===== PROJETS ===== */}
      <section id="projets" className={styles.section}>
        <SectionHeader
          title="Projets sélectionnés"
          subtitle="Sites vitrines, apps métier, e-commerce : un aperçu de ce que je peux créer pour vous."
          number="03"
        />

        <div className={styles.projectGrid}>
          {PROJETS.map((projet) => (
            <div key={projet.name} className={styles.projectCard}>
              {/* Image du projet - Clickable pour ouvrir la modal */}
              <div
                className={styles.projectImageWrapper}
                onClick={() => openModal(projet.name, projet.screenshots, projet.github)}
              >
                <Image
                  src={projet.image}
                  alt={projet.name}
                  width={600}
                  height={280}
                  className={styles.projectImage}
                  priority={false}
                />
                <div className={styles.projectBadge}>Voir le projet</div>
              </div>

              {/* Contenu */}
              <div className={styles.projectContent}>
                <div className={styles.projectTitle}>{projet.name}</div>
                <p className={styles.projectDescription}>{projet.description}</p>
                <div className={styles.projectStack}>{projet.stack}</div>

                {/* Bouton GitHub */}
                <div className={styles.projectLinks}>
                  <a
                    href={projet.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubBtn}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className={styles.githubIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Voir sur GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== À PROPOS ===== */}
      <section id="apropos" className={styles.section}>
        <SectionHeader
          title="À propos"
          subtitle="Développeuse full-stack passionnée par les projets bien faits. Prête à collaborer sur le vôtre"
          number="04"
        />

        <AboutSection />
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className={styles.contactSection}>
        <SectionHeader
          title="Contact"
          subtitle="Un projet en tête ? Discutons-en !"
          number="05"
        />
        <ContactForm />
      </section>

      {/* ===== MODAL PROJETS ===== */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          projectName={selectedProject.name}
          screenshots={selectedProject.screenshots}
          githubUrl={selectedProject.github}
        />
      )}
    </main>
  );
}