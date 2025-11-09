import { useEffect, useState } from "react";

export function useCachedFetch<Raw, T = Raw>(
  url: string | null,
  cacheKey?: string,
  transformData?: (data: Raw) => T,
  ttlMinutes: number = 60
): { data: T | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const EXPIRATION_SECONDS = 30;
  const LS_EXPIRATION_TIME_KEY = "expirationTime";

  useEffect(() => {
    if (!url) return;

    const now = Date.now();

    if (cacheKey) {
      const cachedString = localStorage.getItem(cacheKey);

      if (cachedString) {
        try {
          const data: T = JSON.parse(cachedString);
          const expirationTime = JSON.parse(
            localStorage.getItem(LS_EXPIRATION_TIME_KEY) ?? ""
          );

          if (now < expirationTime) {
            setData(data);
            return;
          } else {
            localStorage.removeItem(cacheKey);
          }
        } catch {
          localStorage.removeItem(cacheKey);
        }
      }
    }

    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((rawData: Raw) => {
        const finalData = transformData
          ? transformData(rawData)
          : (rawData as unknown as T);

        if (cacheKey) {
          try {
            localStorage.setItem(cacheKey, JSON.stringify(finalData));
            localStorage.setItem(
              LS_EXPIRATION_TIME_KEY,
              JSON.stringify(Date.now() + EXPIRATION_SECONDS * 1000)
            );
          } catch (err) {
            console.error("Failed to save data to cache:", err);
          }
        }

        setData(finalData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url, cacheKey, transformData, ttlMinutes]);

  return { data, loading, error };
}
