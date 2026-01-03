"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ProjectModal.module.css";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  screenshots: string[];
  githubUrl: string;
};

export default function ProjectModal({
  isOpen,
  onClose,
  projectName,
  screenshots,
  githubUrl,
}: ProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Fermer avec Escape et gérer le scroll
  useEffect(() => {
    if (!isOpen) return;

    // Reset index de manière asynchrone pour éviter cascading renders
    setTimeout(() => setCurrentIndex(0), 0);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Navigation
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  // Navigation clavier
  useEffect(() => {
    if (!isOpen) return;

    const handleArrows = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleArrows);

    return () => {
      document.removeEventListener("keydown", handleArrows);
    };
  }, [isOpen, currentIndex, goToNext, goToPrevious]);

  // Fermeture au clic extérieur
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    // Délai pour éviter que le clic d'ouverture ferme immédiatement
    setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay avec backdrop */}
      <div className={styles.modalOverlay}>
        <div className={styles.modalBackdrop} onClick={onClose} />
        
        <div className={styles.modalContent} ref={modalContentRef}>
          {/* Header */}
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{projectName}</h2>
            
            <div className={styles.modalActions}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubBtnModal}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className={styles.githubIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              
              <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
                ✕
              </button>
            </div>
          </div>

          {/* Image principale */}
          <div className={styles.imageContainer}>
            <Image
              src={screenshots[currentIndex]}
              alt={`${projectName} - Screenshot ${currentIndex + 1}`}
              width={1200}
              height={700}
              className={styles.mainImage}
              priority
            />

            {/* Navigation arrows */}
            {screenshots.length > 1 && (
              <>
                <button 
                  className={`${styles.navBtn} ${styles.navBtnPrev}`} 
                  onClick={goToPrevious}
                  aria-label="Image précédente"
                >
                  ‹
                </button>
                <button 
                  className={`${styles.navBtn} ${styles.navBtnNext}`} 
                  onClick={goToNext}
                  aria-label="Image suivante"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {screenshots.length > 1 && (
            <div className={styles.thumbnailsContainer}>
              {screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${index === currentIndex ? styles.thumbnailActive : ""}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <Image
                    src={screenshot}
                    alt={`Thumbnail ${index + 1}`}
                    width={120}
                    height={70}
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Counter */}
          {screenshots.length > 1 && (
            <div className={styles.counter}>
              {currentIndex + 1} / {screenshots.length}
            </div>
          )}
        </div>
      </div>
    </>
  );
}