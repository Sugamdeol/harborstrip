# Deployment and cost

Node 24 is used for hosted builds; Node 22+ works locally:

```sh
npm ci --ignore-scripts
npm run build
npm run dev
```

The build copies browser assets and the shared privacy engine into dist/. No environment variables or production dependencies. CI performs lint, typecheck, unit/CLI tests, build and Chromium E2E. On an alternate static host serve dist/ with a 404 for unknown routes. Production security: HTTPS, nosniff, same-origin asset serving; no third-party scripts.

Production is hosted on Vercel at https://harborstrip.vercel.app/. The public GitHub repository is connected to Vercel: pushes to main build production and other branches produce previews. vercel.json sets the Other framework preset, npm ci --ignore-scripts, npm run build and the dist output directory. No environment variables are required. Security headers include nosniff, no-referrer and DENY framing.

GitHub CI runs lint, typecheck, unit/CLI tests, build and Chromium E2E. Deployment readiness and the public page are checked after hosting changes. Captures remain in the browser; Vercel serves only the application assets.

Cost scenario (estimate, not provider quote): app traffic 35 KiB per uncached visit, one visit per user/month. 100 users ≈3.5 MiB; 1K ≈35 MiB; 10K ≈350 MiB; 100K ≈3.5 GiB. Files processed locally, server compute per analysis $0, DB $0, capture storage $0, paid API $0, AI $0. A static host's included allowance can cover early use; actual bill depends on provider plan and traffic. No paid service subscribed. Maintenance time excluded.
