# Thirty opportunities considered

These are researched hypotheses grouped around retrieved evidence, not thirty independently validated markets. Shared evidence supports the underlying problem; each proposed differentiation still needs user testing. S = small, M = medium, L = large. All costs are architectural estimates excluding development, with no paid AI required.

| # / name | Problem / specific user / evidence | Current workaround and gap | Product and why now | Sharing / GitHub loop / retention | Complexity / cost / risk |
|---|---|---|---|---|---|
| 1 Harborstrip | Support engineers must share sensitive HAR captures. H1,H2 | Pattern sanitizers retain arbitrary fields; need strict minimal export | Alias-first debugging packet with receipt; current DLP attention | Packet credits link to inspectable tool; repeat support cases | S / static / useful context may be lost |
| 2 HAR Pair | Performance engineer compares deploy traces. H5,H6 | Mature compare tools; weak new wedge | Request-matched change ledger; frequent deployments | PR report; repeat deploys | M / static / commoditized |
| 3 HAR Replay Fence | QA secrets enter fixtures. H1,H4 | Manual sanitization can break matching | Reviewed fixture contract; agent test generation | CI adoption; fixture refresh | M / local / replay semantics |
| 4 Redirect Receipt | Support engineer diagnoses redirect loops. H5 | DevTools manual traversal | Alias-preserving redirect chain; distributed auth | Ticket diagram; repeat auth cases | S / static / CORS and redirects ambiguous |
| 5 HAR Budget Gate | Engineer lacks measurable release budget. H5,H6 | Performance suites already exist | Trace-derived CI regression gate | CI badge and PR output; releases | M / local / run noise |
| 6 Header Reveal | Support agent needs one relevant header, not entire capture. H1,H4 | Full HAR or screenshot | Explicit field release with review; privacy pressure | Reviewed ticket attachments; support | M / static / header values can leak |
| 7 CSV Landing-Zero Guard | Analysts lose identifiers. C1 | Manual text import or existing repair | Damage preview before Excel; continued complaints | Before/after screenshot; imports | S / static / duplicates existing utilities |
| 8 CSV Formula Gate | Admin exports untrusted data. C4 | Ad hoc escaping inconsistent | CLI rejects risky exports; ongoing injection | CI checks; each export | S / local / universal mitigation impossible |
| 9 CSV Contract Card | Operations teams disagree on import schema. C2,C3 | Email templates and sample CSV | Portable delimiter/header/type contract | Shared contract; partner imports | M / static / schema adoption |
| 10 Header Inspector | CSV column shift goes unnoticed. C2,C3 | Text editor checks | Quoting-aware header diff; current bug reports | PR artifact; exports | S / static / narrow demand |
| 11 Encoding Receipt | Vendor exports show broken characters. C5 | Guess encoding and re-save | Explicit encoding preview and receipt | Vendor ticket; monthly exports | M / static / detection uncertain |
| 12 Identifier Loss Map | Finance staff receive already-damaged data. C1 | Guess missing digits | Identify irreversible loss without false repair | Review evidence; reconciliations | S / static / cannot reconstruct data |
| 13 CSV Row Provenance | Import failures hard to trace. C2,C5 | Line numbers in editor | Original-to-output row mapping | Shared import reports; bulk uploads | M / static / existing repair competition |
| 14 Export Regression Kit | Developers change CSV escaping. C3,C4 | Handwritten fixtures | Curated export edge-case tests | Repository fixture adoption; releases | S / local / library better than product |
| 15 Skill Inventory | Developers install overlapping skills. A1,A3 | Directory browsing | Cross-agent inventory | Shared stack report; installs | M / local / direct clone |
| 16 Skill Permission Diff | Maintainers update executable skills. A2,A4 | Review every patch | Version-to-version capability changes | PR comments; updates | M / local / static inference incomplete |
| 17 Skill Context Budget | Agent users flood context. A1 | Count words manually | Task-scoped token budget | Stack screenshot; repeated workflows | S / local / token counts model-specific |
| 18 Skill Provenance Card | Users cannot establish origin. A2,A3 | Read README/license | Pinned source and review record | Portable receipts; installs | M / local / no trust guarantee |
| 19 Skill Fixture Lab | Maintainers cannot show benefit. A4 | Anecdotal performance | Paired task evaluation kit | Benchmarks in README; revisions | L / compute / expensive valid evaluation |
| 20 Skill Overlap Lens | Teams duplicate rules. A1,A3 | Manual comparison | Human-readable overlapping clauses | PR review; stack maintenance | M / local / scanner saturation |
| 21 Env Parity Packet | Developer cannot reproduce CI. E1 | diff env, logs | Redacted runtime comparison | Bug attachments; incidents | M / local / established competitors |
| 22 Env Contract Gate | Missing deploy variables crash app. E2 | .env.example manual check | Required-key validation before deploy | CI configuration; deploys | S / local / mature dotenv ecosystem |
| 23 Locale Drift Lens | Date/time bugs differ per machine. E1 | Compare timezone config | Cross-runtime locale probe | Shared diagnostic card; onboarding | M / local / infrequent need |
| 24 Lockfile Story | Reviewer sees large lockfile diff. E3 | Raw Git diff | Explain runtime dependency change | PR artifact; updates | M / local / package ecosystems differ |
| 25 Webhook Shape Delta | Integrators miss payload changes. E3 | Stored logs and schemas | Value-free type diff | Contract report; integration updates | M / static / inference is not contract |
| 26 Docker Disk Map | Developer disk fills silently. E4 | docker system df | Read-only reclaim explanation | Troubleshooting link; periodic use | M / local / Docker daemon privilege |
| 27 CSP Incident Card | Developer cannot explain blocked resource. D2 | Screenshot console | Structured directive report | Team bug card; CSP changes | M / extension / native DevTools competition |
| 28 CORS Case Builder | Frontend and backend teams disagree. D3 | Paste logs, Postman screenshots | Evidence-first browser preflight card | Cross-team tickets; API integration | M / extension / cannot infer cause from HAR alone |
| 29 Source Map Doctor | Original code missing in debugging. D1 | DevTools resource pane | Build-to-map consistency checker | CI checks; builds | M / local / framework-specific |
| 30 Screenshot Handoff | Reviewers manually explain visual bugs. S1,S2 | Annotated screenshots | Redaction-first agent handoff | Shared review image; UI work | L / local / mature OCR competitors |

Decision: advance 1, 9, 16, 21, 28. Reject straightforward viewers, generic generators and scanner clones. Harborstrip remains a competitive experiment, not proof of an unsolved category.
