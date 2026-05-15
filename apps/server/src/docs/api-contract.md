# Sahyogi API Contract

The API is organized by feature modules under `src/modules`.

## Core Routes

- `GET /api/health`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/users/:username`
- `PATCH /api/users/me/profile`
- `POST /api/publications`
- `GET /api/publications/:slug`
- `POST /api/publications/:slug/subscribe`
- `GET /api/posts`
- `GET /api/posts/:slug`
- `POST /api/posts`
- `PATCH /api/posts/:id`
- `POST /api/posts/:id/publish`
- `GET /api/dashboard`

Controllers stay thin, services hold business rules, repositories own data access,
and validators define DTO boundaries.
