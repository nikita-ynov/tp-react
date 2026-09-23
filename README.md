# TP React - Application de recettes

Application web de recettes réalisée avec React et TypeScript. Elle permet de consulter des recettes, d'afficher leur détail, de gérer des favoris et de se connecter à un compte utilisateur.

## Présentation des contributeurs

Cette partie doit être complétée par les trois contributeurs. Chaque personne présente elle-même son travail en utilisant la première personne.

### Contributeur 1 - [Nom et prénom]

> Je me suis occupé(e) de ...
>
> J'ai réalisé ...
>
> Les fichiers ou fonctionnalités principales de ma partie sont : ...

### Contributeur 2 - [Nom et prénom]

> Je me suis occupé(e) de ...
>
> J'ai réalisé ...
>
> Les fichiers ou fonctionnalités principales de ma partie sont : ...

### Contributeur 3 - [Nom et prénom]

> Je me suis occupé(e) de ...
>
> J'ai réalisé ...
>
> Les fichiers ou fonctionnalités principales de ma partie sont : ...

## Fonctionnalités

- Affichage de la liste des recettes depuis l'API DummyJSON.
- Consultation du détail d'une recette avec l'URL `/recipe/:id`.
- Ajout et retrait de recettes dans les favoris.
- Connexion et déconnexion d'un utilisateur.
- Conservation de la session grâce au token stocké dans `localStorage`.
- Accès protégé au profil utilisateur.
- Affichage de la liste des utilisateurs.
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
├── routes/           # Routes publiques et protégées
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
- `https://dummyjson.com/users`
- `https://dummyjson.com/auth/login`
- `https://dummyjson.com/auth/me`
