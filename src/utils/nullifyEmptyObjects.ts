export function nullIfEmpty<T>(obj: T): T | null {
  if (obj === null || obj === undefined || obj === "") return null;

  if (typeof obj !== "object" || obj instanceof Date) return obj;

  const cleaned: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value = nullIfEmpty(obj[key]);
    cleaned[key] = value;
  }

  const allNull = Object.values(cleaned).every((v) => v === null);
  return allNull ? null : cleaned;
}
