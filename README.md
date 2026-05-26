# atelier-metier-ia

## Présentation

Application fullstack minimaliste sur Cloudflare Pages.
Frontend statique + API Pages Functions + base D1 (SQLite), tout sur une seule URL.

## Prérequis

- Compte GitHub
- Compte Cloudflare gratuit

## Configuration initiale

Consultez le [guide de mise en place Cloudflare Pages](https://developers.cloudflare.com/pages/get-started/) pour les étapes de configuration du projet.

Deux secrets GitHub sont requis dans **Settings → Secrets and variables → Actions** :

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Token API Cloudflare avec droits Pages et D1 |
| `CLOUDFLARE_ACCOUNT_ID` | Identifiant de votre compte Cloudflare |

## Déploiement

Tout push sur `main` déclenche l'Action GitHub automatiquement.

URL de l'application : `https://atelier-metier-ia.pages.dev`

## Endpoints de l'API

| Méthode | Endpoint         | Description              |
|---------|------------------|--------------------------|
| GET     | /api/items       | Liste tous les items     |
| POST    | /api/items       | Crée un item `{ name }`  |
| DELETE  | /api/items/:id   | Supprime un item         |

## Développement local

```bash
npm install
npx wrangler d1 migrations apply atelier-metier-ia  # migrations en local
npm run dev                                           # http://localhost:8788
```
