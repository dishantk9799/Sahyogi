# Sahyogi Web

Next.js App Router frontend for the Sahyogi publishing platform.

## Commands

```bash
npm run dev -w @sahyogi/web
npm run lint -w @sahyogi/web
npm run build -w @sahyogi/web
```

## Environment

Copy `.env.example` to `.env.local`.

`NEXT_PUBLIC_API_URL` should point at the Express server, for example
`http://localhost:5000`. Browser requests use relative `/api` paths so the Next
rewrite can keep cookies same-origin.
