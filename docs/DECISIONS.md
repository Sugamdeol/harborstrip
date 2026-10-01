# Decisions

- Choose bounded minimization tool over scanner, replay, or generic viewer. Competitive experiment, not market validation.
- Reconstruct from numeric/enumerated allowlist instead of mutating source. Unknown fields cannot leak silently.
- Remove all headers rather than regex secret detection. Fewer diagnostics, simpler privacy boundary.
- Alias every host/path by default. Retain endpoint option explicitly warns user.
- No production library, backend/database/auth/API keys. Fast static hosting, easy inspection.
- Raw source never appears in UI previews or reports. Only sanitized output rendered.
- No analytics, paid actions or community posting. Prepare launch drafts.
- Skill guidance used selectively, not twenty overlapping installations. Backend/DB/React skills not applicable to selected architecture.
