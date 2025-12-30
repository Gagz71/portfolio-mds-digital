import AboutCard from "./AboutCard";
import AboutJourney from "./AboutJourney";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <div className={styles.aboutSection}>
      {/* Carte profile centrée */}
      <AboutCard />
      
      {/* Section parcours en dessous */}
      <AboutJourney />
    </div>
  );
}