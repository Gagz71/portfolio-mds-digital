"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validation Nom
    if (!formData.name.trim()) {
      newErrors.name = "Veuillez saisir votre nom";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Le nom doit faire au moins 2 caractères";
    } else if (formData.name.length > 100) {
      newErrors.name = "Le nom est trop long (max 100 caractères)";
    }

    // Validation Email
    if (!formData.email.trim()) {
      newErrors.email = "Veuillez saisir votre email";
    } else if (formData.email.length > 254) {
      newErrors.email = "L'email est trop long";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email invalide";
      }
    }

    // Validation Message
    if (!formData.message.trim()) {
      newErrors.message = "Veuillez saisir un message";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit faire au moins 10 caractères";
    } else if (formData.message.length > 5000) {
      newErrors.message = "Le message est trop long (max 5000 caractères)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation côté client
    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      
      // Reset success message après 5 secondes
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
      
      // Reset error après 5 secondes
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.glitchCard} onSubmit={handleSubmit}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
              <path d="M3 7l9 6l9 -6"></path>
            </svg>
            <span>CONTACTEZ-MOI</span>
          </div>
          <div className={styles.cardDots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Body */}
        <div className={styles.cardBody}>
          {/* Nom */}
          <div className={`${styles.inputContainer} ${errors.name ? styles.hasError : ''}`}>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.holoInput}
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'loading'}
            />
            <label htmlFor="name" className={styles.inputLabel} data-text="NOM">
              NOM
            </label>
            <div className={styles.inputBorder}></div>
            <div className={styles.inputScanline}></div>
            <div className={styles.inputGlow}></div>
            <div className={styles.inputDataStream}>
              {[...Array(10)].map((_, i) => (
                <div key={i} className={styles.streamBar} style={{ "--i": i } as React.CSSProperties}></div>
              ))}
            </div>
            <div className={styles.inputCorners}>
              <div className={`${styles.corner} ${styles.cornerTl}`}></div>
              <div className={`${styles.corner} ${styles.cornerTr}`}></div>
              <div className={`${styles.corner} ${styles.cornerBl}`}></div>
              <div className={`${styles.corner} ${styles.cornerBr}`}></div>
            </div>
            {errors.name && <div className={styles.errorText}>{errors.name}</div>}
          </div>

          {/* Email */}
          <div className={`${styles.inputContainer} ${errors.email ? styles.hasError : ''}`}>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.holoInput}
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'loading'}
            />
            <label htmlFor="email" className={styles.inputLabel} data-text="EMAIL">
              EMAIL
            </label>
            <div className={styles.inputBorder}></div>
            <div className={styles.inputScanline}></div>
            <div className={styles.inputGlow}></div>
            <div className={styles.inputDataStream}>
              {[...Array(10)].map((_, i) => (
                <div key={i} className={styles.streamBar} style={{ "--i": i } as React.CSSProperties}></div>
              ))}
            </div>
            <div className={styles.inputCorners}>
              <div className={`${styles.corner} ${styles.cornerTl}`}></div>
              <div className={`${styles.corner} ${styles.cornerTr}`}></div>
              <div className={`${styles.corner} ${styles.cornerBl}`}></div>
              <div className={`${styles.corner} ${styles.cornerBr}`}></div>
            </div>
            {errors.email && <div className={styles.errorText}>{errors.email}</div>}
          </div>

          {/* Message */}
          <div className={`${styles.inputContainer} ${errors.message ? styles.hasError : ''}`}>
            <textarea
              id="message"
              name="message"
              className={`${styles.holoInput} ${styles.holoTextarea}`}
              placeholder=" "
              rows={5}
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'loading'}
            />
            <label htmlFor="message" className={styles.inputLabel} data-text="MESSAGE">
              MESSAGE
            </label>
            <div className={styles.inputBorder}></div>
            <div className={styles.inputScanline}></div>
            <div className={styles.inputGlow}></div>
            <div className={styles.inputDataStream}>
              {[...Array(10)].map((_, i) => (
                <div key={i} className={styles.streamBar} style={{ "--i": i } as React.CSSProperties}></div>
              ))}
            </div>
            <div className={styles.inputCorners}>
              <div className={`${styles.corner} ${styles.cornerTl}`}></div>
              <div className={`${styles.corner} ${styles.cornerTr}`}></div>
              <div className={`${styles.corner} ${styles.cornerBl}`}></div>
              <div className={`${styles.corner} ${styles.cornerBr}`}></div>
            </div>
            {errors.message && <div className={styles.errorText}>{errors.message}</div>}
          </div>

          {/* Messages de feedback */}
          {status === 'success' && (
            <div className={styles.successMessage}>
              ✓ Message envoyé avec succès ! Je vous réponds rapidement.
            </div>
          )}

          {status === 'error' && (
            <div className={styles.errorMessage}>
              ✕ {errorMessage || 'Une erreur est survenue. Réessayez.'}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === 'loading'}
          >
            <div className={styles.fragments}>
              <div className={`${styles.fragment} ${styles.fragmentTl}`}></div>
              <div className={`${styles.fragment} ${styles.fragmentBr}`}></div>
            </div>
            <span className={styles.btnText}>
              {status === 'loading' ? 'ENVOI_EN_COURS...' : 'INITIER_CONTACT'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}