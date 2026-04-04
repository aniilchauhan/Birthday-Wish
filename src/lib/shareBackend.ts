const SURPRISE_PATH = '/api/surprise';

/** Empty = same origin (Vercel: API + static together). Set full URL if API is on another host. */
export function surpriseApiUrl(): string {
  const base = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, '') ?? '';
  return base ? `${base}${SURPRISE_PATH}` : SURPRISE_PATH;
}

export async function saveSurpriseToBackend(config: unknown): Promise<string | null> {
  try {
    const res = await fetch(surpriseApiUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { key?: string };
    return data.key && typeof data.key === 'string' ? data.key : null;
  } catch {
    return null;
  }
}

export async function fetchSurpriseByKey(key: string): Promise<Record<string, unknown> | null> {
  if (!/^[A-Za-z0-9_-]{6,32}$/.test(key)) return null;
  try {
    const res = await fetch(`${surpriseApiUrl()}?k=${encodeURIComponent(key)}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { config?: Record<string, unknown> };
    const cfg = data.config;
    return cfg && typeof cfg === 'object' && !Array.isArray(cfg) ? cfg : null;
  } catch {
    return null;
  }
}
