# JavaScript Conversion And Stabilization Audit

Branch: `fix/js-conversion-and-stabilization`

## Current Inventory

- TypeScript source/declaration files found: 112
- Frontend: Next.js App Router app under `apps/web`
- Backend: Express app under `apps/server/src`
- Backend structure already separates routes, controllers, services, repositories, models, validators, middleware, config, and utils.
- Frontend structure already separates app routes, components, services, store, constants, hooks, lib, validations, and styles.

## TypeScript Removal Scope

- Convert `.ts` source files to `.js`
- Convert `.tsx` files containing JSX to `.jsx`
- Remove declaration/config artifacts:
  - `tsconfig.base.json`
  - `apps/server/tsconfig.json`
  - `apps/web/tsconfig.json`
  - `apps/web/next-env.d.ts`
  - `apps/server/src/types/express.d.ts`
- Remove TypeScript-only syntax:
  - interfaces and type aliases
  - type annotations
  - generics
  - `import type` / `export type`
  - `React.FC`
  - Next `Metadata` typing
  - `Readonly` and `satisfies`

## Tooling Risks

- Root `check` currently depends on `typecheck`.
- Server build currently depends on `tsc`.
- Server tests currently use `jest` with `ts-jest`.
- Server ESM JavaScript needs explicit relative `.js` imports or a different runtime strategy.
- ESLint configs currently include TypeScript-specific rules/configs.
- shadcn config is still marked as `tsx: true`.

## Known Stabilization Risks

- Auth refresh should return a clean unauthorized response when the refresh cookie is missing or invalid.
- Public post lookup should be publication-aware because post slug uniqueness is scoped by publication.
- Cookie-based auth needs a clearer CSRF/origin strategy before production.
- API coverage is thin; current server test coverage starts with auth only.
- Some frontend content routes intentionally fall back to seed data when `NEXT_PUBLIC_API_URL` is absent.
- Editor image insertion currently uses a fixed external image URL and should move behind config/upload flow.

## Small Task Order

1. Capture audit checklist on the cleanup branch.
2. Convert package scripts, lint configs, and test runner to JavaScript-friendly tooling.
3. Mechanically convert backend TypeScript to JavaScript.
4. Mechanically convert frontend TypeScript/TSX to JavaScript/JSX.
5. Remove TypeScript configs and dependencies.
6. Run install, lint, tests, and builds; fix conversion fallout.
7. Stabilize backend boot and MongoDB connection.
8. Stabilize auth APIs.
9. Stabilize user/profile APIs.
10. Stabilize publication APIs.
11. Stabilize post APIs.
12. Stabilize subscription/dashboard APIs.
13. Stabilize frontend boot and core pages.
14. Stabilize auth/dashboard/editor flows.
15. Update README and setup notes.
16. Run final lint, tests, build, and browser verification where practical.
