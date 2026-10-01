# Evidence ledger · 1 October 2026

Search dates and publication dates are different. These sources establish problems and existing solutions, not willingness to use our implementation. No interviews, search-volume data, private Discord research, paid experiments, or retention data were available.

| ID | Source | What it establishes |
|---|---|---|
| H1 | https://support.auth0.com/center/s/article/How-to-Manually-Redact-Sensitive-Information | HAR sharing includes secrets; automatic sanitization can need manual review. Updated July 2026. |
| H2 | https://developers.cloudflare.com/changelog/post/2026-03-25-har-file-detection-and-sanitization/ | A 2026 DLP feature blocks or redirects unsanitized HAR uploads. |
| H3 | https://github.com/cloudflare/har-sanitizer | Existing free open-source competitor; archived in retrieved repository view. |
| H4 | https://github.com/google/har-sanitizer | Existing sanitizer covers several credential fields. |
| H5 | https://github.com/0xpanadol/har-viewer | Offline viewing, timeline, comparison already exist. |
| H6 | https://github.com/sitespeedio/compare | HAR performance comparison is already served. |
| H7 | https://marketplace.visualstudio.com/items?itemName=novair.har-sanitizer | Viewer, sanitization, and Markdown ticket report already exist. |
| C1 | https://support.microsoft.com/en-gb/excel/keeping-leading-zeros-and-large-numbers | Excel can remove leading zeros and truncate long numeric identifiers. |
| C2 | https://github.com/mholt/PapaParse/issues/1085 | Reported CSV parser data corruption around duplicate headers. |
| C3 | https://github.com/bgreenwell/xleak/issues/52 | CSV export headers reported unquoted, July 2026. |
| C4 | https://owasp.org/www-community/attacks/CSV_Injection | Formula injection is real; no universally safe CSV mitigation. |
| C5 | https://github.com/hsr88/csv-repair | Existing open-source browser CSV repair, with public launch complaints. |
| C6 | https://nablyx.com/en/excel-safe-csv | Existing local typed XLSX exports limit our differentiation. |
| A1 | https://github.com/evilstar2016/skill-doctor | Local skill inventory, conflicts, duplicates, risk and context-cost competitor. |
| A2 | https://github.com/cisco-ai-defense/skill-scanner | Skill security scanning is already served. |
| A3 | https://github.com/domehahn/skil | Vendor-neutral verification and overlap competitor. |
| A4 | https://arxiv.org/abs/2608.19901 | Recent research reports scanner generalization and false-positive limitations. |
| E1 | https://github.com/GBerghoff/envdiff | Environment snapshots, categorized diffs and redaction competitor. |
| E2 | https://github.com/Brutus1066/envcraft | Deterministic offline dotenv validation and diff competitor. |
| E3 | https://github.com/callmidavid/apidiff | API drift is a stated problem and has an implementation. |
| E4 | https://docs.docker.com/ai/sandboxes/troubleshooting/ | Current Docker disk and filesystem troubleshooting. |
| D1 | https://developer.chrome.com/docs/devtools/developer-resources | Source map debugging needs dedicated diagnostics. |
| D2 | https://developer.chrome.com/blog/csp-issues | CSP debugging has user-research-informed browser support. |
| D3 | https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors | CORS failure diagnosis needs console evidence. |
| S1 | https://github.com/cleanroom-ai/screenshot-redactor | Local screenshot redaction already exists. |
| S2 | https://github.com/DCCA/shotback | Visual feedback and agent handoff already exist. |
| G1 | https://news.ycombinator.com/showhn.html | Show HN requires a product visitors can actually try. |

Freshness: several current crawls concern older issues. They are recurrence evidence, not evidence of a new 2026 incident. Competitor descriptions are product claims, not independently measured quality. Research across public GitHub, official documentation, public Reddit launches, HN and marketplace listings. X, Google Trends, Product Hunt, app-store review mining and private communities were not meaningfully verified.
