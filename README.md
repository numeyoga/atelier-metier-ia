# atelier-metier-ia

## Présentation

Application fullstack SvelteKit sur Cloudflare Pages.
SSR via SvelteKit + form actions + base D1 (SQLite), tout sur une seule URL.

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

Tout push sur `main` déclenche l'Action GitHub automatiquement : build SvelteKit → migrations D1 → déploiement Pages.

URL de l'application : `https://atelier-metier-ia.pages.dev`

## Architecture

| Fichier | Rôle |
|---------|------|
| `src/routes/+page.svelte` | UI Svelte 5 (liste + formulaire) |
| `src/routes/+page.server.ts` | `load` (lecture D1) + form actions (create, delete) |
| `src/app.d.ts` | Typage `App.Platform` pour D1 |
| `migrations/0001_init.sql` | Schéma de la table `items` |

## Développement local

```bash
npm install
npm run db:migrate:local          # applique les migrations en local
npm run dev                        # http://localhost:5173 (vite dev, sans D1)
npm run build && npm run preview   # http://localhost:8788 (wrangler, avec D1)
```
