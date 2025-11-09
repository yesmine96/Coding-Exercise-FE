import { useEffect, useState } from "react";

export function useCachedFetch<Raw, T = Raw>(
  url: string | null,
  cacheKey?: string,
  mapData?: (data: Raw) => T
): { data: T | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    if (cacheKey) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setData(JSON.parse(cached));
        return;
      }
    }

    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((json: Raw) => {
        const transformed = mapData ? mapData(json) : (json as unknown as T);

        if (cacheKey) {
          try {
            localStorage.setItem(cacheKey, JSON.stringify(transformed));
          } catch (err) {
            console.error("Failed to cache data:", err);
          }
        }

        setData(transformed);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url, cacheKey]);

  return { data, loading, error };
}
