# Security review · 1 October 2026

Manual source review + canary tests + browser interactions. Semgrep/Bandit unavailable; no certified or independent audit claimed. npm audit reported zero advisories for current production and development dependency tree at review time.

| Severity | Finding / disposition |
|---|---|
| Critical | None found within reviewed scope |
| High | Unknown captured properties could leak through object spreading. Prevented by reconstruction; canary test covers nested custom fields. |
| High | Untrusted text could execute in offline HTML. Prevented by escaping plus script-free CSP; HTML hostile URL test and no execution path. |
| Medium | Invalid new input could leave previous packet exportable. Fixed by clearing prior state before new file read and on parse failure. |
| Medium | Large input can block local tab. 20 MiB/10,000-entry limits and 30-row DOM pagination; still synchronous processing within bounds. |
| Low | File selection/read race. Revision guard rejects stale reads after newer selection/demo/reset. |
| Accepted Risk | Endpoint mode retains potentially private host/path. Explicit selection, warning and output notice. |
| Accepted Risk | Numerical timing/status/size and method expose behavior; aliases permit correlation. No anonymity guarantee. |
| Accepted Risk | Hosting supply-chain compromise could alter client code. No third-party scripts/dependencies, but host trusted. |

Auth/IDOR/CSRF/session/cookies/OAuth/webhooks: no app-owned accounts or server state. SSRF: no fetch, replay or remote file access. SQL injection: no database. Command injection: CLI uses no shell subprocess, reads explicit path and writes with exclusive creation. Path traversal: user filenames never construct exports; dev server allowlists assets. XSS: textContent UI, escaped standalone reports, no eval/innerHTML. CORS/API abuse/rate-limit: no user-data API. No archive extraction or user file server storage. Never commit real HARs/secrets. Core tests use synthetic canary only.

Retention: in-memory session until reset/reload, browser GC not guaranteed immediate. CLI outputs and user downloads are retained by user. Captured format validation based on JSON structure, not extension/MIME alone. Tests exercise non-http schemes, weird enums and malformed entries.
