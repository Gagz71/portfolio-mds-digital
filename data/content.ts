// ✅ Toutes les données du portfolio centralisées ici
// Plus besoin de les mettre directement dans le JSX !

export const SERVICES = [
  {
    title: "Site vitrine & landing page",
    description:
      "Un site rapide et moderne pour présenter ton activité, rassurer (preuves, avis, réalisations) et convertir avec un parcours clair + SEO de base.",
  },
  {
    title: "E-commerce & boutique en ligne",
    description:
      "Boutique en ligne complète avec paiement sécurisé (Stripe), gestion des produits et commandes, tunnel de vente optimisé et expérience d'achat fluide.",
  },
  {
    title: "Application web & outil métier",
    description:
      "Des outils web sur-mesure pour gagner du temps au quotidien : dashboards, espaces clients, formulaires, automatisations. Connectés à vos bases SQL/NoSQL ou solutions no-code (Airtable, Notion).",
  },
  {
    title: "Application mobile (iOS/Android)",
    description:
      "Applications mobiles intuitives pour iOS et Android, avec connexion utilisateur, synchronisation cloud (SQL, NoSQL, Airtable) et fonctionnalités adaptées à vos besoins métier.",
  },
  {
    title: "API & Intégrations",
    description:
      "Développement d'APIs REST, connexion avec Stripe, Airtable, Notion, webhooks et intégrations tierces pour automatiser vos workflows et connecter vos outils. Synchronisation en temps réel et gestion des données entre plateformes.",
  },
  {
    title: "Maintenance & évolution",
    description:
      "Support technique, mises à jour de sécurité, optimisations performances, corrections de bugs et ajout de fonctionnalités. Votre solution reste performante dans le temps. Accompagnement sur le long terme avec interventions rapides si besoin.",
  },
] as const;

export const TECHNOS = [
  "Next.js",
  "React Native",
  "Expo",
  "TypeScript",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Stripe",
] as const;

export const PROJETS = [
  {
    name: "Projet A",
    description: "Description courte (on mettra les vrais contenus après).",
    stack: "Next.js • UI moderne • Déploiement",
  },
  {
    name: "Projet B",
    description: "Description courte (on mettra les vrais contenus après).",
    stack: "React • Firebase • Auth/DB",
  },
  {
    name: "Projet C",
    description: "Description courte (on mettra les vrais contenus après).",
    stack: "Mobile • Expo • UX simple",
  },
] as const;

export const ABOUT = {
  intro:
    "Derrière MDS Digital : une développeuse web & mobile basée en Saône-et-Loire. Objectif : créer des solutions simples, fiables et performantes, avec une attention particulière à l'UX, à la qualité du code et au déploiement.",
  detail:
    "Besoin d'un site vitrine, d'une application ou d'un outil interne ? L'idée est de livrer quelque chose d'utile, clair et maintenable — pas juste \"un site\".",
} as const;

export const CONTACT = {
  title: "Un projet web ou mobile ?",
  subtitle: "On échange 10 minutes et une direction claire ressort.",
  ctaLabel: "CONTACT →",
  ctaHref: "/contact",
} as const;