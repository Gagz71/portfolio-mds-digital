import Link from "next/link";
import styles from "../../legal.module.css";
import CyberFragments from "@/components/CyberFragments";

export default function CGVPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.legalContainer}>
        <CyberFragments />

        <Link href="/accueil#top" className={styles.backLink}>
          ← Retour à l&apos;accueil
        </Link>

        <h1 className={styles.legalTitle}>
          Conditions Générales de Vente (CGV)
        </h1>

        <div className={styles.legalContent}>

          <section className={styles.legalSection}>
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (ci-après &quot;CGV&quot;)
              régissent les relations contractuelles entre MDS Digital,
              micro-entreprise immatriculée sous le SIRET 999 127 822 00016
              (ci-après &quot;le Prestataire&quot;) et toute personne physique ou morale
              souhaitant bénéficier des services proposés (ci-après &quot;le
              Client&quot;).
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>2. Services proposés</h2>
            <p>MDS Digital propose les services suivants :</p>
            <ul>
              <li>
                Développement web (sites vitrines, e-commerce, applications web)
              </li>
              <li>Développement d&apos;applications mobiles (iOS, Android)</li>
              <li>Développement d&apos;outils métier sur-mesure</li>
              <li>Maintenance et évolution d&apos;applications existantes</li>
              <li>Conseil technique et accompagnement</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>3. Devis et commande</h2>
            <p>
              Toute prestation fait l&apos;objet d&apos;un devis préalable détaillant la
              nature des services, le délai de réalisation et le prix.
            </p>
            <p>
              Le devis est valable <strong>30 jours</strong> à compter de sa
              date d&apos;émission.
            </p>
            <p>La commande est considérée comme définitive après :</p>
            <ul>
              <li>Signature du devis par le Client</li>
              <li>Versement de l&apos;acompte demandé (si applicable)</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>4. Tarifs</h2>
            <p>
              Les tarifs sont indiqués en euros (€) <strong>TTC</strong> (TVA
              non applicable, article 293 B du CGI - franchise en base de TVA)
              et sont valables au jour de l&apos;établissement du devis.
            </p>
            <p>
              En tant qu&apos;auto-entrepreneur en franchise de TVA, les prestations
              ne sont pas soumises à la TVA (article 293 B du CGI).
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>5. Modalités de paiement</h2>
            <p>Les modalités de paiement sont les suivantes :</p>
            <ul>
              <li>
                <strong>Acompte :</strong> Un acompte de <strong>30%</strong>{" "}
                peut être demandé à la commande
              </li>
              <li>
                <strong>Solde :</strong> Payable à la livraison ou selon
                échéancier défini dans le devis
              </li>
              <li>
                <strong>Moyens de paiement acceptés :</strong> Virement bancaire
              </li>
            </ul>
            <p>
              <strong>Délai de paiement :</strong> Les factures sont payables à
              réception, sauf mention contraire sur la facture.
            </p>
            <p>
              <strong>Pénalités de retard :</strong> En cas de retard de
              paiement, des pénalités au taux de{" "}
              <strong>3 fois le taux d&apos;intérêt légal en vigueur</strong> seront
              appliquées, ainsi qu&apos;une indemnité forfaitaire de 40€ pour frais
              de recouvrement (conformément à l&apos;article L441-10 du Code de
              commerce).
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>6. Délais de réalisation</h2>
            <p>
              Les délais de réalisation sont indiqués dans le devis à titre
              indicatif et peuvent varier en fonction de la complexité du projet
              et de la réactivité du Client.
            </p>
            <p>
              Un retard dans la livraison ne peut donner lieu à l&apos;annulation de
              la commande ou au refus de paiement, sauf accord préalable écrit.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>7. Obligations du Client</h2>
            <p>Le Client s&apos;engage à :</p>
            <ul>
              <li>
                Fournir au Prestataire toutes les informations et documents
                nécessaires à la réalisation de la prestation
              </li>
              <li>
                Répondre dans les délais convenus aux demandes de validation
              </li>
              <li>Respecter les échéances de paiement</li>
              <li>
                Disposer des droits nécessaires sur les contenus fournis
                (textes, images, etc.)
              </li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>8. Propriété intellectuelle</h2>
            <p>
              Le code source et les créations développées restent la propriété
              de MDS Digital jusqu&apos;au paiement intégral de la prestation.
            </p>
            <p>
              Une fois le paiement effectué, les droits d&apos;exploitation sont
              cédés au Client pour l&apos;usage convenu dans le devis.
            </p>
            <p>
              Le Client s&apos;interdit de revendre, céder ou transférer le code
              source sans autorisation écrite du Prestataire.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>9. Garanties et maintenance</h2>
            <p>
              Le Prestataire garantit que les prestations sont réalisées selon
              les règles de l&apos;art.
            </p>
            <p>
              Une garantie de 3 mois offerte après livraison pour corriger tout bug ou
              dysfonctionnement lié au développement initial.
            </p>
            <p>
              Les services de maintenance et évolution après livraison font
              l&apos;objet de devis séparés.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>10. Résiliation et annulation</h2>
            <p>
              <strong>Annulation par le Client :</strong> En cas d&apos;annulation
              après signature du devis, l&apos;acompte versé reste acquis au
              Prestataire. Les travaux déjà réalisés seront facturés au prorata.
            </p>
            <p>
              <strong>Résiliation pour faute :</strong> En cas de manquement
              grave de l&apos;une des parties à ses obligations, l&apos;autre partie peut
              résilier le contrat de plein droit après mise en demeure restée
              sans effet pendant 15 jours.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>11. Limitation de responsabilité</h2>
            <p>
              La responsabilité du Prestataire est limitée au montant de la
              prestation facturée.
            </p>
            <p>Le Prestataire ne peut être tenu responsable :</p>
            <ul>
              <li>Des contenus fournis par le Client</li>
              <li>De l&apos;utilisation faite par le Client du livrable</li>
              <li>
                Des dommages indirects (perte de chiffre d&apos;affaires, manque à
                gagner, etc.)
              </li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>12. Force majeure</h2>
            <p>
              Les parties ne pourront être tenues responsables si la
              non-exécution ou le retard dans l&apos;exécution de l&apos;une de leurs
              obligations découle d&apos;un cas de force majeure.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>13. Droit applicable et juridiction compétente</h2>
            <p>Les présentes CGV sont régies par le droit français.</p>
            <p>
              En cas de litige, les parties s&apos;engagent à rechercher une solution
              amiable. À défaut, le litige sera porté devant les tribunaux
              compétents de Mâcon.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>14. Contact</h2>
            <p>
              Pour toute question relative aux présentes CGV, vous pouvez nous
              contacter :
            </p>
            <ul>
              <li>
                <strong>Email :</strong> contact@mds-digital.fr
              </li>
              <li>
                <strong>Via le formulaire de contact :</strong>{" "}
                <Link href="/accueil#contact">Formulaire</Link>
              </li>
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
