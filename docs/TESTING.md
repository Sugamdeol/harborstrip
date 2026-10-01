# Verification record

Observed locally, 1 October 2026:

- npm run lint: passed syntax checks for core/browser/CLI.
- npm run typecheck: passed TypeScript checkJs for privacy core; browser wiring not statically typechecked.
- npm test: 11 passed, 0 failed. Includes CLI boundary and exclusive write integration.
- npm run build: passed static asset validation/copy.
- npm audit: 0 reported advisories in current tree.
- npm run test:e2e with packaged Chromium 153 executable: passed. Standard Playwright browser download failed; alternate browser binary used without changing app or adding a production dependency. CI uses pinned Playwright's normal install.

E2E exercised valid local file import, synthetic demo, both URL policies, exact preview, search/no-match, failure filter, HAR/HTML/Markdown/receipt downloads, theme toggle, reset, malformed file, 65-row pagination, offline processing after initial load, keyboard focus and 360/390/768/1024/1440 layouts. No JS page errors, external app requests or page-level overflow observed. Screenshots captured and visually inspected at desktop and mobile.

Limits: no independent penetration test, screen reader session, Firefox/WebKit run, native Excel/HAR viewer import, real mobile device, deployed-browser interaction or remote GitHub Actions run. Local browser checks used headless Chromium without sandbox because managed runtime runs as root. No sensitive real user HAR used. Security boundary tests intentionally prove only documented fields/outputs, not universal secret detection.
