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

`NEXT_PUBLIC_API_URL` points at the Express API root, for example
`http://localhost:5000/api`. It powers server-side content fetches and the
Next.js `/api` rewrite used by browser requests.

## Deployment Notes

Use real values only in platform environment settings, never in committed files.

Server:

- Set `NODE_ENV=production`.
- Set `CLIENT_URL` to the deployed web origin.
- Set `API_PUBLIC_URL` to the deployed API origin.
- Keep `ENABLE_SWAGGER=false` unless API docs should be publicly reachable.
- Set `TRUST_PROXY=true` behind a trusted reverse proxy.
- Provide production `MONGO_URI`, `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET`.

Web:

- Set `NEXT_PUBLIC_APP_URL` to the deployed web origin.
- Set `NEXT_PUBLIC_API_URL` to the deployed API root ending in `/api`.

Before release, run:

```bash
npm run lint
npm run test:run
npm run build
```
