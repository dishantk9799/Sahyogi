# Sahyogi

Sahyogi is evolving into a premium, Substack-inspired publishing platform for writers,
publications, and reader communities.

This repository uses npm workspaces:

```txt
apps/
  web/      Next.js App Router frontend
  server/   Express JavaScript API
```

## Commands

```bash
npm install
npm run dev
npm run lint
npm run test:run
npm run build
```

## Local Environment

Copy the examples before running the apps:

```bash
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env.local
```

Never commit real environment secrets.

`NEXT_PUBLIC_API_URL` powers server-side content fetches and the Next.js `/api`
rewrite used by browser requests.
