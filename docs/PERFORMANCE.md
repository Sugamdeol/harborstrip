# Performance review

Measured local source assets initially 28,026 bytes total (before final metadata/social PNG additions); core+browser JS ≈14.8 KiB, no bundler/dependency payload, remote font or third-party request. Same-origin static requests only in E2E capture. No API waterfalls or database queries.

Synthetic Node benchmark: 10,000 simple entries minimized in 47 ms, outgoing compact JSON 5,248,982 bytes. This is one local synthetic run, not browser/device latency or a production percentile. Processing actual files may differ. 20 MiB/10,000 entries cap and 30-row rendering bound growth. JSON preview capped at 300,000 characters and explicitly labelled; full HAR export remains available.

Targets: no network call containing capture data; bounded processing; usable controls at 360px; avoid rendering 10,000 rows. Passed actual E2E for data boundary and widths. Lighthouse, field Core Web Vitals and real mobile hardware measurements not run. Future worker/streaming architecture only if actual large-capture demand appears.
