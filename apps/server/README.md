# Sahyogi Server

Express + TypeScript API for the publishing platform.

## Architecture

```txt
src/
  modules/        feature modules: auth, users, publications, posts, dashboard
  configs/        env, database, cloudinary, swagger
  constants/      HTTP and cookie constants
  middlewares/    auth, validation, rate limiting, error handling
  routes/         API route composition
  utils/          framework-neutral helpers
  docs/           API contract notes
  tests/          Jest + Supertest integration tests
```

Request flow:

```txt
Route -> Validator -> Controller -> Service -> Repository -> Model
```

## Commands

```bash
npm run dev -w @sahyogi/server
npm run test:run -w @sahyogi/server
npm run build -w @sahyogi/server
```

## Environment

Copy `.env.example` to `.env` and fill production secrets. `MONGO_URI` is the
single MongoDB variable used by the API.
