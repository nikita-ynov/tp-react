# TP React - Application de recettes

Application web réalisée avec React et TypeScript autour de la cuisine. Elle permet de consulter des recettes, de lire et publier des articles, de gérer des favoris, de consulter les utilisateurs et de se connecter à un compte.

## Présentation des contributeurs

Cette partie doit être complétée par les trois contributeurs. Chaque personne présente elle-même son travail en utilisant la première personne.

### Contributeur 1 - Nikita Petrenko

> Je me suis occupé(e) de l'authentification et de la structure de l'application.
>
> J'ai réalisé les branches `feature/auth`, `feature/header` et `feature/users`.

### Contributeur 2 - Martin Risch

> Je me suis occupé(e) de l'ajout des articles et de la gestion des favoris.
>
> J'ai réalisé les branches `feature/fav` et `feature/blog`.

### Contributeur 3 - Kevin Joffret

> Je me suis occupé(e) de l'accueil, du détail des recettes, du design global, de la citation du jour et des corrections finales.
>
> J'ai réalisé les branches `feature/recipes`, `feature/quotes` et `fix`.

## Fonctionnalités

- Affichage de la liste des recettes depuis l'API DummyJSON.
- Consultation du détail d'une recette avec l'URL `/recipe/:id`.
- Affichage des informations complémentaires d'une recette et de son auteur.
- Citation du jour : l'identifiant est le jour du mois; le 31, un identifiant entre 1 et 30 est choisi aléatoirement.
- Lecture des articles avec l'URL `/blog` et `/posts/:id`.
- Publication et suppression optimiste d'articles avec Redux et l'API.
- Ajout et suppression de commentaires sur les articles.
- Ajout et retrait de recettes dans les favoris.
- Connexion et déconnexion d'un utilisateur.
- Conservation de la session grâce à l'access token stocké dans `localStorage`.
- Accès protégé au profil utilisateur.
- Affichage de l'annuaire des utilisateurs sur `/users`.
- Consultation d'un profil utilisateur complet sur `/user/:id`.
- Affichage d'une page 404 pour les ressources ou routes inexistantes.
- Navigation entre les pages avec React Router.

## Technologies utilisées

- React 19
- TypeScript
- Vite
- Redux Toolkit et React Redux
- React Router DOM
- Axios
- API [DummyJSON](https://dummyjson.com/)

## Installation

Prérequis : Node.js et npm installés.

```bash
npm install
```

## Lancer le projet

Pour démarrer le serveur de développement :

```bash
npm run dev
```

L'application sera disponible à l'adresse indiquée par Vite, généralement `http://localhost:5173`.

## Routes principales

| Route | Accès | Description |
| --- | --- | --- |
| `/` | Public | Liste des recettes et citation du jour |
| `/recipe/:id` | Public | Détail d'une recette |
| `/blog` | Public | Liste et publication d'articles |
| `/posts/:id` | Public | Article et commentaires |
| `/users` | Public | Annuaire des utilisateurs |
| `/user/:id` | Public | Informations complètes d'un utilisateur |
| `/login` | Public | Connexion utilisateur |
| `/favorites` | Public | Liste des recettes favorites |
| `/profile` | Protégée | Profil de l'utilisateur connecté |

Un accès à `/profile` sans connexion redirige vers `/login`.

## Scripts disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Vérifie TypeScript et construit l'application |
| `npm run lint` | Analyse le code avec Oxlint |
| `npm run preview` | Lance un aperçu de la version construite |

## Organisation du projet

```text
src/
├── components/       # Composants réutilisables comme Header et RecipeCard
├── pages/            # Pages de l'application
├── routes/           # Guards pour les routes publiques et protégées
├── styles/           # Feuilles de style par page ou composant
├── store/            # Store Redux et reducers
├── types/            # Types TypeScript
├── App.tsx           # Page d'accueil et chargement des recettes
├── routes.tsx        # Configuration des routes
└── main.tsx          # Point d'entrée et initialisation de l'application
```

## API utilisée

Les recettes et les utilisateurs viennent de DummyJSON :

- `https://dummyjson.com/recipes`
- `https://dummyjson.com/recipes/:id`
- `https://dummyjson.com/quotes/:id`
- `https://dummyjson.com/users`
- `https://dummyjson.com/users/:id`
- `https://dummyjson.com/auth/login`
- `https://dummyjson.com/auth/me`
- `https://dummyjson.com/posts?limit=0`
- `https://dummyjson.com/posts/add`
- `https://dummyjson.com/posts/:id`
- `https://dummyjson.com/posts/:id/comments`
- `https://dummyjson.com/comments/add`
- `https://dummyjson.com/comments/:id`
