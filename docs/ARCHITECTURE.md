# Architecture

Static HTML/CSS and ES modules, Node >=22 CLI, no production dependencies. A bundler/React/Next.js adds no value to this small local working surface. Pure src/core.js reconstructs capture from known bounded fields. Browser uses it; CLI imports same module. HTTP local server serves only public and src paths. Browser storage absent; no database, remote API, auth or backend.

Privacy boundary: source HAR is untrusted, never merged/spread into output, never executed, never interpolated into HTML unescaped. Strict URL aliases are encounter-ordered, map stays in memory. Report output is derived from sanitized HAR exclusively. Numeric/enumerated metadata still can reveal behavior and size. This is minimization, not anonymity or compliance certification.

Static hosting chosen for cost and no upload service. Sites source repository provides persistence. Separate requested GitHub publication depends on repository-create authorization capability; connector supports file operations but exposes no repository creation at inspection time.
