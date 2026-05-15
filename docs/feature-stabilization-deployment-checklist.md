# Feature Stabilization And Deployment Readiness Checklist

Branch: `fix/feature-stabilization-deployment-ready`

## Ground Rules

- Real credentials stay only in local `.env` files.
- Do not commit `.env`, `.env.local`, `apps/server/.env`, or `apps/web/.env.local`.
- `.env.example` files must use placeholders or safe local examples only.
- Keep API access behind shared config/service helpers.
- Keep backend modules separated by route, controller, service, repository, model, validation, middleware, config, and utils.

## Current Audit Findings

### P0: Local Env And Config Safety

- `.gitignore` has generic `.env` and `.env.*` coverage, but explicit app env entries should be added for clarity.
- `apps/web/.env.example` and the requested local value disagree with current code:
  - requested local shape: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
  - current `apps/web/next.config.js` appends `/api/:path*`
  - current `apps/web/services/content.js` fetches paths already starting with `/api`
- `apps/web/app/layout.jsx` uses a hardcoded fallback app URL.
- `apps/server/src/configs/swagger.js` uses a hardcoded localhost server URL fallback shape.

### P0: Frontend Mocked Or Incomplete Features

- `apps/web/app/dashboard/page.jsx` renders `dashboardMetrics` and `seedPosts` instead of `/api/dashboard` and authenticated posts.
- `apps/web/app/dashboard/posts/page.jsx` renders `seedPosts`; no edit, publish, unpublish, or delete actions are wired.
- `apps/web/components/editor/editor-workspace.jsx` has inactive `Save draft` and `Publish` buttons.
- `apps/web/components/editor/rich-editor.jsx` inserts a fixed Unsplash image URL instead of using upload/config flow.
- `apps/web/app/dashboard/settings/page.jsx` has hardcoded publication settings and no save handler.
- Dashboard pages are not protected on the frontend.

### P1: Backend/API Gaps

- Posts API has create/update/publish/unpublish/list/detail, but no delete endpoint.
- Publications API supports create/update/list mine/detail/subscribe, but no subscriber-list endpoint for dashboard.
- Dashboard API returns only counts; frontend needs recent work and richer states.
- API tests are concentrated in one auth test file and do not cover each endpoint variant yet.
- Duplicate-key database errors still need a centralized `409` mapper.

### P1: Auth And Session UX Gaps

- Login/signup form redirects to dashboard, but no frontend session bootstrap/protected-route guard exists.
- Logout UI is missing.
- Refresh/session persistence is backend-ready but not verified through browser flow.
- UI error messages are generic and do not consistently surface clean API messages.

### P1: Reader And Subscription Gaps

- `apps/web/services/content.js` still uses seed fallback when no API URL is configured; production should prefer real API data.
- `apps/web/services/content.js` returns `seedPublications` for publication listing instead of API data.
- Subscribe form posts to API, but subscriber management is not surfaced in dashboard.
- Search UI/API integration is incomplete.

### P2: Deployment Readiness Gaps

- Production deployment guide needs frontend/backend env variable tables.
- Backend start requires real `MONGO_URI`; local verification should use ignored `.env`.
- npm audit still reports Next's nested PostCSS advisory; npm's force fix suggests an unsafe Next downgrade.
- Full browser smoke testing needs a reliable web+API dev launch using local env.

## Stabilization Order

1. Make env/gitignore handling explicit and create local ignored env files.
2. Normalize web API URL handling around one central helper.
3. Add frontend auth session helper and dashboard route guard.
4. Wire dashboard overview to `/api/dashboard` with loading/error/empty states.
5. Extend posts API with delete and stronger endpoint tests.
6. Wire dashboard post management to real post APIs.
7. Wire editor save draft, edit, publish, and unpublish flows to APIs.
8. Replace fixed editor image insertion with upload/config-ready flow.
9. Add subscriber list API and wire subscriber dashboard.
10. Wire publication/profile settings forms to real APIs with validation.
11. Expand API tests for auth, users, publications, posts, subscriptions, dashboard, and error cases.
12. Run browser verification for home, explore, publication, post detail, auth, dashboard, editor, subscribe, 404, and error states.
13. Update deployment docs and run final lint, tests, build, audit, and secret scan.
