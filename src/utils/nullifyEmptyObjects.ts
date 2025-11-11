export function nullIfEmpty<T>(obj: T): T | null {
  if (obj === null || obj === undefined || obj === "") return null;

  if (typeof obj !== "object" || obj instanceof Date) return obj;

  const cleaned: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value = nullIfEmpty(obj[key]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    cleaned[key] = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const allNull = Object.values(cleaned).every((v) => v === null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return allNull ? null : cleaned;
}
