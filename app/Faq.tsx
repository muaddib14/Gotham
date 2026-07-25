"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Can this tell me if a token is about to rug?",
    a: "No, and anything that claims to is selling you something. Gotham reads what a wallet has already done — deployer history, funding trail, holder concentration — and states findings. It does not predict what happens next.",
  },
  {
    q: "Does this connect my wallet?",
    a: "No. Scanning is read-only public data. There's no wallet connection anywhere in this product — not on the site, not in the extension, not in the API.",
  },
  {
    q: "What's the difference between Gotham engine and Arkham?",
    a: "Gotham engine reads the chain live via RPC — it works on wallets minutes old. Arkham is a separate entity database, added on top when available. The two are never blended into one score; every finding shows which one answered it.",
  },
  {
    q: "Why does it sometimes say “insufficient data”?",
    a: "A token or wallet with almost no history doesn't have enough signal for a confident read. Insufficient data is an honest result, not an error — the findings that were found still show.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Every result states findings only — it never tells you what to do with them. Decisions are yours.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq">
      <div className="sec-head">
        <span className="eyebrow">Before you ask</span>
        <h2>
          Frequently <em>asked</em>
        </h2>
      </div>
      <div className="faq-list">
        {ITEMS.map((item, i) => (
          <div className="faq-item" key={item.q}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{item.q}</span>
              <span className="faq-toggle" aria-hidden="true">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && <p className="faq-a">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
