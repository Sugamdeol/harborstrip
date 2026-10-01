# Product specification

Vision: reduce the work and uncertainty of preparing network evidence for a support ticket.
Promise: review a minimal outgoing capture before saving it.
User/job: technical support engineer or developer handing a request failure to someone who lacks access to their browser session.

Core loop: open HAR → inspect removal receipt and retained requests → select strict aliases or reviewed endpoints → filter failures → export HAR/report → recipient diagnoses order, timing and status.

| Priority / story | Acceptance criteria |
|---|---|
| P0 Import local HAR | Valid JSON with log.entries loads; malformed structure shows recovery message; >20 MiB or >10,000 entries rejected; source never sent to server. |
| P0 Reconstruct minimal HAR | No captured header/cookie/body/comment/custom field persists; strict mode aliases all URLs; output source immutable; same input/policy deterministic. |
| P0 Review evidence | All requests available with pagination, search and failure filter; retained fields shown; exact exported JSON visible; counts use actual file. |
| P0 Export | Clean HAR, field-removal receipt JSON, Markdown and standalone HTML reports download; HTML treats input as text; CLI uses same engine. |
| P0 Privacy policy | Browser endpoint default with visible retained-host/path warning; optional strict aliases; CLI strict default; no source names in output; no storage or analytics; reset clears state. |
| P0 Demo and failures | Clearly synthetic demo; loading, empty, filtered-empty, invalid input and offline working states. |
| P1 | User feedback on lost context; explicitly reviewed header allowlist if demand. |
| P2 | Large capture streaming; selected-request bundles; CI policies. |

Non-goals: HAR replay, executing curl, root-cause certainty, security certification, authentication, hosted file links, AI analysis and cloud storage. Success hypothesis: support engineers prepare a usable packet in under a minute and recipient can name a failing request. Pilot test with 5 engineers before claiming demand. No usage metric is collected by default. Sensitive metadata can still be inferred. Captures are held only in memory; offline works after assets load or via local hosting. Zero-byte, empty entries, non-http URL, malformed nested data and numerical bounds receive explicit handling.
