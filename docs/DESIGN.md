# Design direction

Reading this as: a working evidence desk for support engineers, with a paper-and-ink shipping-manifest language. ENERGY 2 / RHYTHM 2 / MOTION 1. Anti Slop applied during build and review, as requested.

Character: precise, tangible, restrained, skeptical. Warm paper + ink makes exported evidence feel like a reviewed document. Deep burnt orange reserved for the export action. Sans for controls, Georgia for the compact title, monospace for paths/numeric identifiers. System fonts avoid network font requests. Explicit labels beat decorative icons.

Layout: left narrow policy/import rail, right evidence workspace; receipt band at top, request table/waterfall central, exact JSON preview below. Mobile stacks policy before evidence with horizontally scrollable table inside its own labelled region. Table is necessary to compare requests, not a generic dashboard. Signature: the 'outgoing manifest' receipt, with original request sequence preserved alongside strict aliases. Minimal bars express actual duration, not ornamental analytics.

References: Chrome network panel contributes request order and timeline affordances; HAR sanitizer contributes review-before-download; physical shipping receipts contribute the retained/removed distinction. No interface is cloned. Colors, spacing, tokens and interaction reasons live in DESIGN_SYSTEM. No gradients, glow, glass, fake metrics, stock hero, card grid or floating surfaces. Only hover/focus feedback. Visible focus, labelled controls, text status and 44px controls. Empty state explains how to export a capture; errors tell user to export again or reduce capture. UI opens directly on the tool.
