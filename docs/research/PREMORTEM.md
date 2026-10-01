# Pre-mortem

| Finalist | Beautiful product, nobody cares | Loved product, still fails | Response |
|---|---|---|---|
| Harborstrip | Sanitizers are good enough; removing paths destroys useful context | False assurance causes sensitive export; maintenance or browser changes | Strict default, clear retained-field preview, allowlist tests, no guarantee of anonymity |
| CSV Contract Card | Partners do not adopt new schema | Encoding/type disagreement, downstream corruption | Prefer established schema formats; defer |
| Skill Permission Diff | Scanner users prefer existing suite | Semantic false positives and missed execution paths | Avoid claiming security verification; defer |
| Env Parity Packet | envdiff already does it | Secret redaction misses unknown names | Reject clone; do not build |
| CORS Case Builder | DevTools enough | Tool gives wrong diagnosis without server evidence | Evidence-only language; defer |

Harborstrip operating-cost risk is low because files stay in browser memory. Distribution and trust are the highest business risks. Supply-chain risk is limited through zero production dependencies. Maintenance still requires real browser/DevTools capture corpus and security review.
