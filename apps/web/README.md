# Sahyogi Web

Next.js App Router frontend for the Sahyogi publishing platform.

## Commands

```bash
npm run dev -w @sahyogi/web
npm run lint -w @sahyogi/web
npm run build -w @sahyogi/web
```

## Environment

Copy `.env.example` to `.env.local`. Local dev runs on `http://localhost:5173`
to match the backend `CLIENT_URL`.

`NEXT_PUBLIC_API_URL` should point at the Express API root, for example
`http://localhost:5000/api`. Browser requests use relative `/api` paths so the
Next rewrite can keep cookies same-origin.

For production, set `NEXT_PUBLIC_APP_URL` to the deployed web origin and
`NEXT_PUBLIC_API_URL` to the deployed API root ending in `/api`.

Editor, profile, and publication image pickers upload through the backend, so
Cloudinary secrets stay server-side.
