"use client";

import Link from "next/link";
import styles from "./Accueil.module.css";
import CtaBtn from "@/components/CtaBtn";
import ServiceCard from "@/components/ServiceCard";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import AboutCard from "@/components/AboutCard";
import AboutSection from "@/components/AboutSection";
import { SERVICES, TECHNOS, PROJETS, ABOUT, CONTACT } from "@/data/content";

export default function AccueilPage() {
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

        {/* CTAs optimisés avec hiérarchie claire */}
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
        <SectionHeader title="Technos" 
        subtitle="Stack modern pour des projets rapides et performants"
        number="02" />

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
          link={{ label: "Tout voir →", href: "/projets" }}
          number="03"
        />

        <div className={styles.projectGrid}>
          {PROJETS.map((projet) => (
            <div key={projet.name} className={styles.projectCard}>
              <div className={styles.projectTitle}>{projet.name}</div>
              <p className={styles.projectDescription}>{projet.description}</p>
              <div className={styles.projectStack}>{projet.stack}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== À PROPOS ===== */}
      <section id="apropos" className={styles.section}>
        <SectionHeader 
        title="À propos"
        subtitle="Développeuse full-stack passionnée par les projets bien faits. Prête à collaborer sur le vôtre" 
        number="04" />

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
    </main>
  );
}
