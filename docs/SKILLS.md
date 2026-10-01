# Skill stack

| Area | Skill | Repository / package | Why used |
|---|---|---|---|
| Validation | idea-validation | samuelcastro/startup-skills | Facts vs hypotheses, evidence and stop criteria |
| Product | product | samuelcastro/startup-skills | Scope and testable acceptance criteria |
| Business | business-model | samuelcastro/startup-skills | No invented paid demand; cheap free core |
| Launch | go-to-market | samuelcastro/startup-skills | Runnable demo and niche feedback |
| Measurement | growth-analytics | samuelcastro/startup-skills | Meaningful manual pilot instead of vanity metrics |
| Anti-slop | anti-ai-slop-ui | rwcod/anti-ai-slop-ui (MIT, v1.0.0 metadata) | Direction/tokens before UI; lint and visual review |
| Anti-slop | antislop | installed miqdadbadjuber/anti-slop package | Working surface, functional controls, evidence-only copy |
| Frontend/design review | frontend-design | frontend-design-premium plugin | Product-specific hierarchy and visual criticism |
| Input security | file-upload | florianbuetow/claude-code | Size/format validation, escaping, traversal, local boundary review |
| Browser QA | playwright-cli | microsoft/playwright-cli | Real interaction/download/browser checks |
| Runtime | cloud-environment-runtime | cloud-environment plugin | Network and credential constraints |
| Deployment | sites-building / sites-hosting | sites plugin | Source persistence, static packaging, public deployment |

Installation: npx skills --help and --list inspected, then selected startup, rwcod, Microsoft and AppSec skills installed for Codex. Guidance read progressively. Taste skill inspected via its GitHub description; no overlapping installation. Existing official documentation complements skill guidance for privacy and security. No React/DB/backend skills needed because no React/DB/backend chosen. Skill vendoring excluded from source; retain installer lockfiles for provenance where created.

Checks: reviewed available README/descriptions, compatibility and relevant instructions. rwcod MIT established in skill metadata; complete upstream license/activity audits for every installed skill were not completed. No arbitrary bundled executable skills were run apart from rwcod's local UI heuristic. AppSec copied skill lacks shared upstream schema resources, so manual scope review used its detection-patterns reference. Semgrep/Bandit not installed. Do not imply a certified scanner audit.
