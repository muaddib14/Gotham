const CURL = `curl -X POST https://gothamintel.xyz/api/scan \\
  -H "Content-Type: application/json" \\
  -d '{"address":"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"}'`;

const RESPONSE = `{
  "verdict": "mixed",
  "verdict_line": "One read flagged a risk signal; the rest are clean or unavailable.",
  "findings": [
    {
      "read": "token_checks",
      "source": "gotham",
      "status": "flag",
      "summary": "Mint authority ACTIVE · freeze authority ACTIVE."
    },
    {
      "read": "funding_trace",
      "source": "gotham",
      "status": "ok",
      "summary": "Traced 5 hop(s) upstream (trail found)."
    }
  ],
  "answered_ms": 3146
}`;

export default function ApiSection() {
  return (
    <section id="api">
      <div className="sec-head reveal">
        <span className="eyebrow">For builders</span>
        <h2>
          Same engine, <em>one endpoint</em>
        </h2>
      </div>
      <div className="api-grid">
        <div className="api-pane reveal">
          <div className="api-pane-label">Request</div>
          <pre className="api-code">
            <code>{CURL}</code>
          </pre>
        </div>
        <div className="api-pane reveal">
          <div className="api-pane-label">Response</div>
          <pre className="api-code">
            <code>{RESPONSE}</code>
          </pre>
        </div>
      </div>
      <p className="scan-footnote" style={{ textAlign: "center", marginTop: "20px" }}>
        The endpoint above is live — no key required today, capped at 20 requests/day per IP. Issued API keys and
        higher rate limits are planned.
      </p>
    </section>
  );
}
