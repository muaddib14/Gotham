"use client";

import { useEffect, useRef, useState } from "react";

type Stats = { addressesWatched: number; scansShared: number; liveInCache: number };

const ITEMS: { key: keyof Stats; label: string }[] = [
  { key: "liveInCache", label: "Scans live right now" },
  { key: "addressesWatched", label: "Addresses watched" },
  { key: "scansShared", label: "Scans shared" },
];

function useCountUp(target: number, active: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs]);
  return value;
}

function Counter({ target, active }: { target: number; active: boolean }) {
  const value = useCountUp(target, active);
  return <>{value.toLocaleString()}</>;
}

export default function StatsBand() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then(setStats)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="stats-band" ref={ref}>
      {ITEMS.map((item) => (
        <div className="stat" key={item.key}>
          <div className="stat-num">
            <Counter target={stats?.[item.key] ?? 0} active={active && stats !== null} />
          </div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </section>
  );
}
