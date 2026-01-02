"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ProjectModal.module.css";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  screenshots: string[];
};

export default function ProjectModal({
  isOpen,
  onClose,
  projectName,
  screenshots,
}: ProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index quand on ouvre une nouvelle modal
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, projectName]);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Bloquer le scroll du body
      document.body.style.overflow = "hidden";
    }

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
    const handleArrows = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleArrows);
    }

    return () => {
      document.removeEventListener("keydown", handleArrows);
    };
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{projectName}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
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
              <button className={styles.navBtn + " " + styles.navBtnPrev} onClick={goToPrevious}>
                ‹
              </button>
              <button className={styles.navBtn + " " + styles.navBtnNext} onClick={goToNext}>
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
  );
}