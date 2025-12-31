import Link from "next/link";
import styles from "../../legal.module.css";
import CyberFragments from "@/components/CyberFragments";

export default function PolitiqueConfidentialitePage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.legalContainer}>
        <CyberFragments />
        <Link href="/accueil#top" className={styles.backLink}>
          ← Retour à l'accueil
        </Link>

        <h1 className={styles.legalTitle}>Politique de Confidentialité</h1>
        
        <div className={styles.legalContent}>

          <section className={styles.legalSection}>
            <h2>1. Introduction</h2>
            <p>
              MDS Digital (ci-après "nous", "notre", "le Prestataire"), immatriculée sous le SIRET 999 127 822 00016, accorde une grande importance 
              à la protection de vos données personnelles.
            </p>
            <p>
              La présente politique de confidentialité vous informe de la manière dont nous collectons, 
              utilisons et protégeons vos données personnelles conformément au Règlement Général sur la 
              Protection des Données (RGPD) et à la loi Informatique et Libertés.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>2. Responsable du traitement</h2>
            <ul>
              <li><strong>Responsable :</strong> Dounia MANHOULI - MDS Digital</li>
              <li><strong>Adresse :</strong> 193 rue Saint Exupery, 71000 Mâcon, France</li>
              <li><strong>Email :</strong> contact@mds-digital.fr</li>
              <li><strong>SIRET :</strong> 999 127 822 00016</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>3. Données collectées</h2>
            <p>
              Nous collectons les données personnelles suivantes lorsque vous utilisez notre formulaire de contact :
            </p>
            <ul>
              <li><strong>Nom</strong> : pour vous identifier et personnaliser nos échanges</li>
              <li><strong>Adresse email</strong> : pour répondre à votre demande</li>
              <li><strong>Message</strong> : pour comprendre votre besoin et y répondre</li>
            </ul>
            <p>
              Ces données sont collectées <strong>uniquement avec votre consentement explicite </strong> 
              lorsque vous remplissez et soumettez le formulaire de contact.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>4. Finalités du traitement</h2>
            <p>
              Vos données personnelles sont utilisées uniquement pour les finalités suivantes :
            </p>
            <ul>
              <li><strong>Gestion des demandes de contact :</strong> répondre à vos questions et demandes de devis</li>
              <li><strong>Communication :</strong> vous contacter dans le cadre de votre demande</li>
              <li><strong>Archivage légal :</strong> conservation des échanges à des fins de preuve en cas de litige</li>
            </ul>
            <p>
              <strong>Nous ne revendons jamais vos données à des tiers.</strong>
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>5. Base légale du traitement</h2>
            <p>
              Le traitement de vos données personnelles repose sur les bases légales suivantes :
            </p>
            <ul>
              <li><strong>Consentement :</strong> en soumettant le formulaire de contact</li>
              <li><strong>Intérêt légitime :</strong> gérer les demandes de contact et la relation client</li>
              <li><strong>Obligation légale :</strong> conservation des données pour respecter nos obligations comptables et fiscales</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>6. Destinataires des données</h2>
            <p>
              Vos données personnelles sont destinées uniquement à :
            </p>
            <ul>
              <li><strong>MDS Digital :</strong> pour traiter votre demande</li>
              <li><strong>Resend (service d'envoi d'emails) :</strong> pour transmettre les messages du formulaire de contact</li>
            </ul>
            <p>
              Nous ne transmettons vos données à aucun autre tiers, sauf obligation légale.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>7. Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pendant les durées suivantes :
            </p>
            <ul>
              <li><strong>Demandes de contact non converties :</strong> 3 ans à compter du dernier contact</li>
              <li><strong>Clients :</strong> 10 ans après la fin de la relation contractuelle (obligations comptables)</li>
            </ul>
            <p>
              À l'issue de ces délais, vos données sont supprimées ou anonymisées.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>8. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul>
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
            </ul>
            <p>
              Pour exercer vos droits, contactez-nous à l'adresse : <strong>contact@mds-digital.fr</strong>
            </p>
            <p>
              Nous nous engageons à répondre à votre demande dans un délai de <strong>1 mois</strong> maximum.
            </p>
            <p>
              Vous disposez également du droit d'introduire une réclamation auprès de la CNIL : 
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>9. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
              vos données personnelles contre :
            </p>
            <ul>
              <li>L'accès non autorisé</li>
              <li>La perte ou la destruction</li>
              <li>L'utilisation, la divulgation ou la modification non autorisée</li>
            </ul>
            <p>
              Nos mesures de sécurité incluent :
            </p>
            <ul>
              <li>Chiffrement HTTPS pour toutes les communications</li>
              <li>Hébergement sécurisé (Vercel)</li>
              <li>Accès limité aux données (seul le responsable y a accès)</li>
              <li>Sauvegarde régulière des données</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>10. Cookies</h2>
            <p>
              Notre site n'utilise actuellement <strong>aucun cookie de tracking ou publicitaire</strong>.
            </p>
            <p>
              Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>11. Transfert de données hors UE</h2>
            <p>
              Le service d'envoi d'emails (Resend) peut être hébergé hors de l'Union Européenne. 
              Dans ce cas, vos données sont protégées par des garanties appropriées conformes au RGPD.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>12. Modification de la politique</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
              La date de dernière mise à jour est indiquée en bas de cette page.
            </p>
            <p>
              Toute modification sera publiée sur cette page et, si les changements sont significatifs, 
              nous vous en informerons par email.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>13. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits :
            </p>
            <ul>
              <li><strong>Email :</strong> contact@mds-digital.fr</li>
              <li><strong>Courrier :</strong> Dounia MANHOULI - MDS Digital, 
  193 rue Saint Exupéry, 71000 Mâcon</li>
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