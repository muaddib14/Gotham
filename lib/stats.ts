import { sql } from "@/lib/db";

export type SiteStats = {
  addressesWatched: number;
  scansShared: number;
  liveInCache: number;
};

/**
 * Real counts only — no fabricated "total scans ever" figure. The `scans`
 * table is a 15-min-TTL cache (lib/migrations/001_scans_cache.sql), not a
 * persistent log, so it can't honestly answer "how many scans total" —
 * only "how many are live right now". watchlist/scan_shares are the only
 * tables that actually accumulate.
 */
export async function getStats(): Promise<SiteStats> {
  const [watchlist, shares, cache] = await Promise.all([
    sql`select count(*) from watchlist`,
    sql`select count(*) from scan_shares`,
    sql`select count(*) from scans`,
  ]);
  return {
    addressesWatched: Number(watchlist[0].count),
    scansShared: Number(shares[0].count),
    liveInCache: Number(cache[0].count),
  };
}
