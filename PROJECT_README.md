# Suivi, Architecture & Documentation du Projet - Site Garden Inn

*Dernière mise à jour : 6 Novembre 2025*

Ce document sert de mémoire et de feuille de route pour le site web du Garden Inn. Il décrit sa philosophie, son architecture technique, l'historique de ses évolutions, son état actuel et les prochaines étapes planifiées. C'est le document de référence pour toute maintenance ou développement futur.

---

## 1. Philosophie & Vue d'Ensemble

Ce site a été conçu pour être **moderne, rapide, maintenable et facile à mettre à jour**. L'objectif est de fournir une expérience utilisateur fluide tout en permettant au propriétaire du site de gérer le contenu le plus simplement possible à terme.

L'architecture est celle d'un site **"statique" (JAMstack)**. Cela signifie que le site est pré-construit en fichiers HTML, CSS et JavaScript purs, ce qui lui confère des avantages majeurs :
*   **Performance :** Temps de chargement quasi instantanés.
*   **Sécurité :** Surface d'attaque très réduite car il n'y a pas de base de données ou de serveur complexe à gérer en permanence.
*   **Scalabilité :** Peut supporter un trafic très élevé sans effort.

---

## 2. Architecture Technique & Stack

### Stack Principale
*   **Framework :** **React (v19)** avec **TypeScript**. TypeScript a été choisi pour garantir un code robuste, auto-documenté et avec moins d'erreurs grâce au typage statique.
*   **Style :** **TailwindCSS**. Ce framework CSS "utility-first" permet de construire des designs complexes rapidement et de manière cohérente, directement dans le HTML. Il facilite grandement la maintenance du style.

### Design System & Palette de Couleurs
Le design vise à être élégant, naturel et à évoquer l'ambiance de la jungle. La palette de couleurs est intentionnellement limitée pour maintenir la cohérence :
*   **Couleurs Primaires (Émeraude) :** Utilisées pour les éléments interactifs, les titres importants et les appels à l'action.
    *   `emerald-600`, `emerald-700`, `emerald-800`, `emerald-900`.
*   **Couleurs Neutres (Pierre) :** Utilisées pour les fonds, le corps du texte et les éléments secondaires.
    *   `stone-50`, `stone-100` (fonds de section).
    *   `stone-300` (bordures).
    *   `stone-600`, `stone-800` (texte).
*   **Fonds :** Principalement `bg-stone-50` et `bg-stone-100` pour une sensation douce et organique.
*   **Texte :** La police par défaut est une police `sans-serif` standard pour une lisibilité maximale.

### Structure des Fichiers Clés
*   `pages/` : Chaque grande section du site (`HomePage`, `RoomsPage`, etc.).
*   `components/` : Composants réutilisables (`Header`, `ImageCarousel`, `Modal`).
*   `constants/` : Données "dures" du site (`data.ts`, `icons.tsx`).
*   `contexts/` : Logique globale, principalement `LocalizationContext` pour les langues.
*   `locales/` : Fichiers de traduction (`en.json`, `fr.json`).

---

## 3. Implémentation des Fonctionnalités Clés

Cette section détaille *comment* certaines des fonctionnalités importantes ont été construites.

### Internationalisation (Anglais / Français)
Le site est entièrement bilingue grâce à un système centralisé.
*   **Mécanisme :** Le `LocalizationContext` est le cœur du système. Au chargement, il détecte la langue choisie par l'utilisateur (stockée dans le `localStorage`) et charge le fichier JSON correspondant (`/locales/en.json` ou `fr.json`).
*   **Utilisation :** Le hook `useTranslation()` donne accès à une fonction `t('cle.de.traduction')`. Le code n'affiche jamais de texte en dur ; il utilise toujours une clé de traduction.
*   **Avantage :** L'ajout d'une nouvelle langue se ferait simplement en ajoutant un nouveau fichier JSON, sans toucher au reste du code.

### Page Chambres : Pop-up (Modale) de Détails
*   **Objectif :** Afficher les détails complexes d'une chambre sans surcharger l'interface.
*   **Implémentation :**
    1.  Un composant réutilisable `<Modal>` a été créé. Il gère son état d'ouverture (`isOpen`) et la logique pour le fermer (clic sur la croix, sur le fond, ou touche "Echap").
    2.  La page `RoomsPage` maintient un état `selectedRoom`. Au départ, il est `null`.
    3.  Chaque `<RoomCard>` reçoit une fonction `onViewDetails`. Quand l'utilisateur clique sur le bouton "+", cette fonction met à jour l'état `selectedRoom` de la page parente avec les données de la chambre cliquée.
    4.  Le changement d'état provoque le rendu de la `<Modal>`, qui affiche les détails de la `selectedRoom`. Remettre `selectedRoom` à `null` ferme la modale.

### Page Transferts : Accordéon Interactif
*   **Objectif :** Rendre la page plus visuelle et moins dense en informations au premier abord.
*   **Implémentation :**
    1.  Un carrousel d'images a été ajouté en haut de la page pour un impact visuel immédiat.
    2.  Les deux tableaux de prix (privé et bus) sont encapsulés dans un `div`.
    3.  Un état local `isDetailsVisible` (un booléen) est contrôlé par le bouton "Voir toutes les options".
    4.  Le `div` contenant les tableaux utilise une astuce CSS avec `grid-template-rows`. Si `isDetailsVisible` est `false`, il a `grid-rows-[0fr]` (hauteur zéro). Si `true`, il passe à `grid-rows-[1fr]` (hauteur automatique). Les propriétés `transition` et `duration` de TailwindCSS créent une animation de déploiement fluide.

### Responsive Design : Navigation Mobile vs Bureau
*   **Objectif :** Assurer une expérience de navigation optimale sur toutes les tailles d'écran.
*   **Implémentation :** Deux composants de navigation distincts sont utilisés.
    1.  `<Header>` : La barre de navigation classique en haut de page. Elle est masquée sur les petits écrans (`hidden md:flex`).
    2.  `<BottomNav>` : Une barre de navigation en bas de l'écran, similaire à celle des applications mobiles. Elle est visible uniquement sur les petits écrans (`md:hidden`).
    *   Les deux systèmes partagent la même logique de navigation et mettent à jour la même variable d'état `activePage`.

---

## 4. Historique des Évolutions

*   **Création initiale :** Site construit avec React, TypeScript et TailwindCSS. Données gérées via un système de traductions JSON.
*   **Amélioration de la Page Chambres :** Remplacement de l'accordéon de détails par une fenêtre modale pour une meilleure expérience utilisateur.
*   **Refonte de la Page Transferts :** Transformation d'une page statique en une page dynamique avec carrousel et accordéon pour les tableaux.
*   **Migration vers une Gestion Locale des Images (Phase 1 du CMS) :** Changement fondamental de l'architecture. Le site a été entièrement refactorisé pour utiliser des images locales (`/public/images`) au lieu de liens externes. Cette étape cruciale a rendu le site **"CMS-ready"**.

---

## 5. État Actuel & Feuille de Route

### Résumé de la Situation Actuelle (Phase 1 Terminée)

Nous venons de finaliser l'étape technique de **migration de toutes les images du site vers une structure de fichiers locaux.** Le site est fonctionnel, mais nécessite que les dossiers d'images soient créés et remplis manuellement.

### Étape 1 : Votre Action Manuelle Requise (À faire maintenant)

Pour que les images s'affichent sur le site, vous devez maintenant créer la structure de dossiers et y placer vos photos.

#### 1. Créez la structure de dossiers suivante :

Vous devez créer cette arborescence de dossiers à la racine de votre projet. Le dossier parent est `public`.

```plaintext
public/
└── images/
    ├── contact/
    ├── home/
    ├── jungle-trek/
    ├── other-excursions/
    │   ├── cooking-class/
    │   ├── flower-trip/
    │   ├── massage/
    │   ├── night-trek/
    │   └── village-tour/
    ├── packages/
    ├── rooms/
    │   ├── bungalow/
    │   ├── family/
    │   ├── standard/
    │   └── superior/
    └── transfers/
```

#### 2. Ajoutez vos images :

Placez vos fichiers images (en `.jpg`, `.png` ou `.webp`) dans les dossiers correspondants.

*   **Respectez les noms de fichiers attendus par le code.** Pour les carrousels, nommez vos fichiers `1.jpg`, `2.jpg`, `3.jpg`, etc.
*   **Exemples :**
    *   Pour le carrousel de la page d'accueil : `public/images/home/`.
    *   Pour la "Chambre Standard" : `public/images/rooms/standard/`.
    *   Pour le carrousel du "Jungle Trekking" : `public/images/jungle-trek/`.
    *   Pour les "Autres Excursions", chaque excursion a son propre dossier. Par exemple, placez `massage.jpg` dans `public/images/other-excursions/massage/`.
    *   Pour l'image de la page contact, placez une image nommée `background.jpg` dans `public/images/contact/`.

### Étape 2 : Prochaines Étapes (Phase 2 - À Lancer)

Maintenant que les fondations sont prêtes, nous pouvons construire **l'interface d'administration.**

*   **Objectif :** Créer une page sécurisée (ex: `votresite.com/admin`) où vous pourrez vous connecter et modifier le contenu du site (images et textes) de manière visuelle.
*   **Technologie proposée :** Nous utiliserons un "Git-based CMS" comme **Decap CMS**. C'est une solution moderne, gratuite et parfaitement adaptée à notre projet.
*   **Comment ça fonctionnera :**
    1.  Je vais ajouter les fichiers de configuration de Decap CMS au projet.
    2.  Vous pourrez vous connecter à l'interface `/admin`.
    3.  Quand vous changerez une image, le CMS modifiera automatiquement les fichiers dans `public/images` et déclenchera une reconstruction automatique du site.

**Cette étape n'a pas encore été réalisée.** Une fois que vous aurez terminé l'Étape 1, il vous suffira de me demander de mettre en place le CMS pour que nous passions à cette phase.