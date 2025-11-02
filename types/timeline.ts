export interface EmbedContent {
  type: 'iframe' | 'html';
  src?: string;
  html?: string;
  height?: string | number;
  width?: string | number;
  title?: string;
}

export interface TimelineEmbed {
  type: 'embed';
  content: EmbedContent;
  title?: string;
  description?: string;
}

export interface StackItem {
  name: string;
  icon: string; // URL or icon name
  category?: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  fileUrl?: string;
  tags?: string[];
  layout?: 'side-by-side' | 'stacked' | 'carousel';
  stacks?: StackItem[];
  links?: Array<{
    label: string;
    url: string;
    target?: string;
    [key: string]: any; // Allow additional properties like className, data-* attributes
  }>;
  embeds?: TimelineEmbed[];
}

export const sampleTimelineData: TimelineItem[] = [
  // ===== Parcours Académique =====
  {
    year: "2021-2025",
    title: "ESPRIT École d'ingénieur - Tunis",
    description: "Ingénierie en architecture logicielle\n\nFormation complète en génie logiciel avec spécialisation en architecture des systèmes d'information, conception de logiciels évolutifs et gestion de projets informatiques complexes.",
    tags: ["Éducation", "Ingénieur", "Architecture Logicielle", "PFE", "Projet Académique"],
    images: [
      "/assets/interview/pfe.jpg",
      "/assets/interview/pfe2.jpg"
    ],
    layout: "side-by-side"
  },
  {
    year: "2018-2019",
    title: "Université Claude Bernard Lyon 1 - France",
    description: "Licence en système d'information et aide à la décision\n\nDouble diplôme axé sur l'analyse des données, la prise de décision et les systèmes d'information d'entreprise.",
    tags: ["Éducation", "Double Diplôme", "Systèmes d'Information"],
   
  },
  {
    year: "2016-2019",
    title: "ESPRIT School of Business - Tunis",
    description: "Licence en informatique de gestion\n\nFormation en informatique appliquée à la gestion d'entreprise, couvrant le développement web, les bases de données et la gestion de projet.",
    tags: ["Éducation", "Licence", "Informatique de Gestion"],
    images: [
      "/assets/interview/ceremonie.jpg",
      "/assets/interview/esb2.jpg"
    ],
    layout: "side-by-side"
  },
  {
    year: "2017",
    title: "Membre Fondateur Enactus ESB",
    description: "Participation à des initiatives entrepreneuriales et sociales.",
    tags: ["Activité Extra-curriculaire", "Leadership"]
  },
  {
    year: "2017",
    title: "Stage Orange Tunisie",
    description: "Stagiaire Technicien NOC - Observation du travail des ingénieurs réseau et apprentissage du suivi d incidents.",
    tags: ["Stage", "Réseau"]
  },  
  {
    year: "2019",
    title: "Stage PFE Discovery Informatique / Discovery Intech",
    description: "Création d'un data warehouse et tableaux de bord de suivi de performance.\n\nRésultats clés :\n- Conception et implémentation d'un entrepôt de données\n- Développement d'ETL pour l'intégration des données\n- Création de tableaux de bord interactifs\n- Optimisation des performances des requêtes",
    tags: ["Stage", "Data Warehouse", "BI", "ETL", "Tableaux de bord"],
    embeds: [
      {
        type: "embed",
        title: "Rapport Principal - Data Warehouse",
        description: "Documentation complète du projet de data warehouse avec analyse des performances et résultats.",
        content: {
          type: "iframe",
          src: "https://publuu.com/flip-book/1002073/2210765/page/1?embed&transparent",
          height: "1200"
        }
      },
      {
        type: "embed",
        title: "Documentation Technique - Outil d'Analyse",
        description: "Documentation technique de l'outil d'analyse développé en parallèle.",
        content: {
          type: "iframe",
          src: "https://publuu.com/flip-book/1002073/2210774/page/1?embed&transparent",
          height: "1200"
        }
      }
    ],
    links: [
      {
        label: "Voir le rapport principal",
        url: "https://publuu.com/flip-book/1002073/2210765"
      },
      {
        label: "Voir la documentation technique",
        url: "https://publuu.com/flip-book/1002073/2210774"
      }
    ]
  },
  {
    year: "2019",
    title: "Hackathon Sfax Smart Medina - XCoding Challenge",
    description: "1ère place au hackathon avec le développement d'algorithmes Dijkstra et de clustering pour l'optimisation de la collecte des déchets urbains. Notre solution a permis de réduire de 30% les coûts de collecte pour la municipalité de Sfax.",
    tags: ["Hackathon", "1ère Place", "Data Science", "Optimisation"],
    images: [
      "/assets/interview/59661020_2065091886879882_810570606335492096_n.jpg",
      "/assets/interview/58657563_333754590614281_5025904235095523328_n.jpg",
      "/assets/interview/58732948_619335418533306_6282682704664199168_n.jpg",
      "/assets/interview/59286180_2276587615940092_8193229980654632960_n.jpg",
      "/assets/interview/59398472_380476705877277_6243646159227715584_n.jpg"
    ],
    layout: "side-by-side",
    links: [
      { label: "", url: "#" },
      { label: "", url: "#" }
    ]
  },


  {
    year: "2022",
    title: "Stage Data Scientist - INAT",
    description: "Analyse de l'impact du changement climatique sur les barrages avec Python et XGBoost.\n\nRésultats clés :\n- Développement d'un modèle prédictif avec une précision de 92%\n- Analyse des tendances climatiques sur 20 ans\n- Recommandations pour la gestion des ressources en eau\n- Visualisation interactive des données",
    tags: ["Stage", "Data Science", "Machine Learning", "Python", "XGBoost"],
    embeds: [
      {
        type: "embed",
        title: "Rapport d'Analyse - Impact Climatique",
        description: "Étude complète sur l'impact du changement climatique sur les barrages avec modélisation prédictive.",
        content: {
          type: "iframe",
          src: "https://publuu.com/flip-book/1002073/2210772/page/2?embed&transparent",
          height: "1200"
        }
      }
    ],
    links: [
      {
        label: "Voir le rapport complet",
        url: "https://publuu.com/flip-book/1002073/2210772"
      }
    ]
  },
  {
    year: "2023",
    title: "Projet Académique HeyTraveler",
    description: "Développement d'une plateforme de mise en relation voyageurs/business partners.\n\nFonctionnalités clés :\n- Système de recommandation personnalisé avec KNN\n- Chat en temps réel avec WebSocket\n- Gestion des réservations et paiements\n- Tableau de bord analytique\n\nRécompense : Projet sélectionné parmi les meilleurs au Bal de Projet ESPRIT 2023\n\nTechnologies : Java Spring Boot, React, PostgreSQL, WebSocket, Flask, KNN, Docker",
    tags: ["Projet Académique", "Full Stack", "Machine Learning", "Java", "React", "Prix d'Excellence"],
    images: [
      "/assets/img/Bal1.jpg",
      "/assets/img/Bal2.jpg",
      "/assets/img/Bal3.jpg"
    ],
    embeds:  [
      {
        type: "embed",
        title: "Rapport HeyTraveler",
        description: "Documentation complète du projet HeyTraveler.",
        content: {
          type: "iframe",
          src: "https://publuu.com/flip-book/1002073/2210775/page/1?embed",
          height: "1200"  
        }
      }
    ],
    links: [
      {
        label: "Voir le projet complet",
        url: "https://publuu.com/flip-book/1002073/2210775"
      },
      {
        label: "Code Source",
        url: "#"
      }
    ]
  },
  {
    year: "2023 - 2025",
    title: "Développeur Full Stack - Comunik CRM",
    description: "Deux stages successifs chez Comunik CRM avec des responsabilités croissantes et des projets variés.\n\n**Stage 1 (2023) - Module de Gestion Utilisateurs**\n- Développement d'un module complet de gestion utilisateurs\n- CRUD avancé avec validation des données\n- Système de rôles et permissions\n- Interface utilisateur réactive avec Bootstrap\n\n**Stage 2 (2025) - Projet de Fin d'Études**\n- Application de gestion de portefeuille clients\n- Réduction de 60% du temps d'entrée manuelle\n- Interface moderne et intuitive\n- Optimisation des performances\n\n**Technologies utilisées**\n- Backend: Laravel, PHP, MySQL, API REST\n- Frontend: Next.js, React, JavaScript, Bootstrap\n- Outils: Git, Docker, Postman",
    tags: ["Stage", "Full Stack", "Laravel", "Next.js", "MySQL", "React", "PFE"],
    embeds: [
      {
        type: "embed",
        title: "Démo Interactive - Module de Gestion Utilisateurs (2023)",
        description: "Découvrez une démo interactive du module de gestion utilisateurs développé en 2023.",
        content: {
          type: "html",
          html: '<div style="position: relative; box-sizing: content-box; max-height: 80vh; max-height: 80svh; width: 100%; aspect-ratio: 1.7777777777777777; padding: 40px 0 40px 0;"><iframe src="https://app.supademo.com/embed/cmg55wxzp9bvo10k80q491heu?embed_v=2&utm_source=embed" loading="lazy" title="Demo ComUnity" allow="clipboard-write" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>'
        }
      },
      {
        type: "embed",
        title: "Rapport de Stage - Module Utilisateurs (2023)",
        description: "Documentation complète du module de gestion utilisateurs.",
        content: {
          type: "iframe",
          src: "https://publuu.com/flip-book/1002073/2210776/page/1?embed&transparent",
          height: "1200"
        }
      },
      {
        type: "embed",
        title: "Rapport PFE - Gestion de Portefeuille Clients (2025)",
        description: "Documentation complète du projet de fin d'études.",
        content: {
          type: "iframe",
          src: "https://heyzine.com/flip-book/c0a788b983.html#page/2",
          height: "1200"
        }
      }
    ],
    links: [
      {
        label: "Voir le rapport du stage 2023",
        url: "https://publuu.com/flip-book/1002073/2210776"
      },
      {
        label: "Ouvrir la démo dans une nouvelle fenêtre",
        url: "https://app.supademo.com/demo/cmg55wxzp9bvo10k80q491heu",
        target: "_blank"
      }
    ]
  },  // ===== Expériences Professionnelles =====
  {
    year: "2025 - Présent",
    title: "Téléperformance - Support Technique Orange Pro B2B",
    description: "Assistance technique pour les entreprises clientes d'Orange Pro.\n\nResponsabilités :\n- Support téléphonique pour le 3901 (ligne dédiée aux professionnels)\n- Diagnostic et résolution des incidents réseau et services\n- Gestion des demandes techniques B2B\n- Assistance sur les produits et services Orange Pro\n- Suivi des dossiers clients et escalade si nécessaire",
    tags: ["Expérience Professionnelle", "Support Technique", "Réseau", "Service Client", "B2B"],
    imageUrl: "/assets/interview/Orange PRO.webp"
  },
  
];
