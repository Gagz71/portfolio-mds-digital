import Link from "next/link";
import styles from "../legal.module.css";
import CyberFragments from "@/components/CyberFragments";

export default function MentionsLegalesPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.legalContainer}>
        {/* ✅ FRAGMENTS CYBER ICI */}
        <CyberFragments />

        <Link href="/accueil#top" className={styles.backLink}>
          ← Retour à l'accueil
        </Link>

        <h1 className={styles.legalTitle}>Mentions Légales</h1>
        
        <div className={styles.legalContent}>

          <section className={styles.legalSection}>
            <h2>1. Éditeur du site</h2>
            <p>
              Le site <strong>mds-digital.fr</strong> (ci-après "le Site") est édité par :
            </p>
            <ul>
              <li><strong>Raison sociale :</strong> MDS Digital</li>
              <li><strong>Forme juridique :</strong> Micro-entreprise</li>
              <li><strong>SIRET :</strong> <span>999 127 822 00016</span></li>
              <li><strong>Adresse :</strong> <span>193 rue Saint Exupery</span>, 71000 Mâcon, France</li>
              <li><strong>Email :</strong> contact@mds-digital.fr</li>
              <li><strong>Responsable de publication :</strong> Dounia MANHOULI</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>2. Hébergement</h2>
            <p>Le Site est hébergé par :</p>
            <ul>
              <li><strong>Nom :</strong> Vercel Inc.</li>
              <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
              <li><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a></li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu du Site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) 
              est la propriété exclusive de MDS Digital, à l'exception des marques, logos ou contenus 
              appartenant à d'autres sociétés partenaires ou auteurs.
            </p>
            <p>
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication, 
              même partielle, de ces différents éléments est strictement interdite sans l'accord exprès 
              par écrit de MDS Digital.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>4. Données personnelles</h2>
            <p>
              Les informations recueillies via le formulaire de contact sont enregistrées dans un fichier 
              informatisé par MDS Digital pour la gestion des demandes de contact.
            </p>
            <p>
              Conformément à la loi « informatique et libertés » et au RGPD, vous pouvez exercer votre droit 
              d'accès, de rectification, d'effacement et d'opposition aux données vous concernant en nous 
              contactant à l'adresse : <strong>contact@mds-digital.fr</strong>
            </p>
            <p>
              Pour plus d'informations, consultez notre{" "}
              <Link href="/politique-confidentialite">Politique de Confidentialité</Link>.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>5. Cookies</h2>
            <p>
              Le Site n'utilise actuellement aucun cookie de tracking ou de publicité. 
              Seuls des cookies techniques nécessaires au bon fonctionnement du site peuvent être utilisés.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>6. Limitation de responsabilité</h2>
            <p>
              MDS Digital s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce Site. 
              Toutefois, MDS Digital ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations 
              mises à disposition sur ce Site.
            </p>
            <p>
              En conséquence, MDS Digital décline toute responsabilité pour toute imprécision, inexactitude ou 
              omission portant sur des informations disponibles sur le Site.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>7. Loi applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. 
              Tout litige relatif à l'utilisation du Site sera soumis aux tribunaux compétents français.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>8. Contact</h2>
            <p>
              Pour toute question ou demande d'information concernant le Site, vous pouvez nous contacter :
            </p>
            <ul>
              <li><strong>Email :</strong> contact@mds-digital.fr</li>
              <li><strong>Via le formulaire de contact :</strong> <Link href="/accueil#contact">Formulaire</Link></li>
            </ul>
          </section>

          <p className={styles.updateDate}>
            <em>Dernière mise à jour : 01/01/2026</em>
          </p>
        </div>
      </div>
    </div>
  );
}