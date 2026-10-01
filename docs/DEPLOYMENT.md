# Deployment and cost

Node 22+:

```sh
npm ci --ignore-scripts
npm run build
npm run dev
```

Static output is public/. No environment variables or production dependencies. CI performs lint, typecheck, unit/CLI tests, build and Chromium E2E. On alternate static host serve public/ with a 404 for unknown routes. Production security: HTTPS, nosniff, same-origin asset serving; no third-party scripts.

Sites is chosen for source persistence and simple static demo. Public access requested by master brief. Live native deployment status must be verified separately. No external registry publishing. GitHub Actions cannot run until GitHub repository creation/push succeeds. GitHub connector inspected but has no create-repository operation; no local GitHub token configured. Browser fallback requires user authorization under browser tool instructions.

Cost scenario (estimate, not provider quote): app traffic 35 KiB per uncached visit, one visit per user/month. 100 users ≈3.5 MiB; 1K ≈35 MiB; 10K ≈350 MiB; 100K ≈3.5 GiB. Files processed locally, server compute per analysis $0, DB $0, capture storage $0, paid API $0, AI $0. A static host's included allowance can cover early use; actual bill depends on provider plan and traffic. No paid service subscribed. Maintenance time excluded.
