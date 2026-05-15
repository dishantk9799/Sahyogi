# Sahyogi

Sahyogi is evolving into a premium, Substack-inspired publishing platform for writers,
publications, and reader communities.

This repository uses npm workspaces:

```txt
apps/
  web/      Next.js App Router frontend
  server/   Express + TypeScript API
```

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
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
