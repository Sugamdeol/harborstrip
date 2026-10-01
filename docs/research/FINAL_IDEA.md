# Harborstrip

**Pitch:** Share the network failure, leave the captured secrets behind.

Target: developers and technical support engineers preparing HAR attachments for tickets or outside review. Current workaround: a sanitizer, manual editor inspection, and screenshots of failed requests. H1/H2 establish sensitive-data risk and present-day organizational attention. H3–H7 establish strong competition.

**Facts:** HAR exports may contain credentials and private payloads. Existing free offline sanitizers and reports exist. Browser support cases repeatedly ask for HAR. **Hypotheses:** people value strict default aliases, an exact export preview, a removal receipt and a no-dependency CLI together. No user adoption, virality, revenue or product-market fit has been demonstrated.

Differentiation: export is reconstructed rather than mutating a captured object. Unknown custom fields cannot ride along. Strict mode aliases every host/path and stores no alias dictionary in output. Numerical request timing/status/size and enumerated method/protocol/content category remain. A less-private endpoint mode is explicitly selected and reviewed.

Why now: March 2026 Cloudflare DLP support for unsanitized captures is a current signal; not a claim the problem is new. Why open source/GitHub: inspect the privacy boundary, test canaries, run CLI in owned workflows. Viral hypothesis: recipient sees useful offline report and tool attribution, tries it on the next ticket. Repeat use is incident-driven, not daily habit.

Core free. Possible future revenue: paid organizational policy review/integration only after adoption evidence. Expand toward policy-reviewed headers, recipient feedback, and fixture integration when user evidence supports it. Biggest risks: weak differentiation, lost diagnostic context, inference from timing and metadata, hostile input, trusted-host compromise.

Names checked: TraceParcel collides with parcel tracker; TraceSieve with trace-anomaly research; TraceReceipt with code symbols. Harborstrip produced no clear product collision in retrieved search. npm/PyPI package availability and trademark clearance remain unverified. Use a working repository name, no registry publication.
