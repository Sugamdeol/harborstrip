# Draft launch materials

GitHub description: A local HAR minimizer. Review a strict outgoing capture, removal receipt and offline debugging report.
Topics: har, privacy, debugging, developer-tools, local-first, javascript, cli, support-tools.

Show HN: Harborstrip: share a network failure with strict URL aliases and no captured bodies
Body: I built a dependency-free browser tool and Node CLI for preparing HAR support attachments. It reconstructs output from known metadata, strips captured headers/cookies/payloads, and defaults to consistent host/path aliases. Export HAR, a removal receipt, Markdown or an offline HTML report. Existing sanitizers already solve much of this; I wanted an inspectable strict export. The tradeoff is lost context and metadata inference. I'd like feedback on whether a support engineer can still diagnose your synthetic case.

Reddit: I made a local tool for preparing HAR attachments. Does the strict alias mode keep enough context for your support workflow? Try the synthetic demo; please do not post real captures in the comments.

X: Before attaching a HAR to a ticket, review what leaves your machine. Harborstrip removes captured bodies, headers and cookies, aliases hosts/paths, and exports an offline report. Browser + Node CLI, no production dependencies. Feedback welcome.

Product Hunt tagline: A reviewed network packet for your next support ticket.

Do not launch publicly until public URL and GitHub release are verified. Screenshots must use synthetic fixture only.
