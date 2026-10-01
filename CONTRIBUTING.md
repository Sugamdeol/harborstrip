# Contributing

Node 22+; npm ci, npm run build, npm run dev. Use fix/ or feat/ branches. Run lint, typecheck, test, build and test:e2e (install Chromium with npx playwright install chromium). All fixtures and screenshots must be synthetic. Never attach real network captures to a public issue.

Core reconstruction is in src/core.js, browser wiring in public/app.js. Keep outputs allowlist-based. A PR changing retained metadata must describe its privacy tradeoff, include canary coverage and update docs/PRIVACY.md. No new production dependency without a clear reason. Formatting follows existing source; no formatting-only churn. Good first tasks: synthetic browser capture fixtures, keyboard coverage and report usability feedback.
