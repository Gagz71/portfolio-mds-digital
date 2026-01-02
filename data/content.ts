// ✅ Toutes les données du portfolio centralisées ici

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
    name: "Kaizoku Store",
    description: "E-commerce fullstack avec dashboard admin complet, gestion CRUD des produits, authentification JWT et interface utilisateur moderne. Thème anime/manga.",
    stack: "Node.js • Express • React • MySQL • JWT",
    image: "/projets/kaizoku-store/home.png",
    screenshots: [
      "/projets/kaizoku-store/home.png",
      "/projets/kaizoku-store/auth.png",
      "/projets/kaizoku-store/signup.png",
      "/projets/kaizoku-store/dashboard.png",
      "/projets/kaizoku-store/products.png",
    ],
  },
  {
    name: "MyMomsBox",
    description: "Plateforme e-commerce de box mensuelles avec paiement Stripe intégré, système d'abonnements récurrents et gestion complète des commandes.",
    stack: "Symfony 5 • Twig • MySQL • Stripe",
    image: "/projets/mymomsbox/home.png",
    screenshots: [
      "/projets/mymomsbox/home.png",
      "/projets/mymomsbox/subscriptions.png",
      "/projets/mymomsbox/checkout.png",
      "/projets/mymomsbox/products.png",
      "/projets/mymomsbox/account.png",
    ],
  },
  {
    name: "Pokédex",
    description: "Application Pokédex interactive avec recherche, filtres par type et génération, et intégration de l'API PokéAPI. Interface responsive et moderne.",
    stack: "TypeScript • HTML • CSS • Node.js",
    image: "/projets/pokedex/home.png",
    screenshots: [
      "/projets/pokedex/home.png",
      "/projets/pokedex/search.png",
      "/projets/pokedex/back.png",
      "/projets/pokedex/details.png",
      "/projets/pokedex/favorites.png",
      "/projets/pokedex/front.png",
      "/projets/pokedex/stats.png",
      "/projets/pokedex/evolution.png",
    ],
  },
  {
    name: "li-energies",
    description: "Site vitrine professionnel pour une entreprise d'énergies renouvelables. Design moderne et présentation claire des services proposés.",
    stack: "Symfony 5 • Twig • MySQL",
    image: "/projets/li-energies/home.png",
    screenshots: [
      "/projets/li-energies/home.png",
      "/projets/li-energies/services.png",
      "/projets/li-energies/process.png",
    ],
  },
  {
    name: "Kaamelott Chat",
    description: "Application de chat temps réel avec Socket.io, permettant des conversations instantanées. Thème inspiré de la série Kaamelott.",
    stack: "Node.js • Socket.io • HTML • CSS",
    image: "/projets/kaamelott-chat/home.png",
    screenshots: [
      "/projets/kaamelott-chat/home.png",
      "/projets/kaamelott-chat/chat.png",
      "/projets/kaamelott-chat/mobile_perceval.png",
    ],
  },
] as const;