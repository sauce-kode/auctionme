function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function convertObjectKeysToCamel<T extends Record<string, any>>(
  obj: T
): Record<string, any> {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map(convertObjectKeysToCamel);
  }

  if (typeof obj === "object") {
    const converted: Record<string, any> = {};

    for (const [key, val] of Object.entries(obj)) {
      const camelKey = snakeToCamel(key);
      converted[camelKey] = convertObjectKeysToCamel(val);
    }

    return converted;
  }

  return obj;
}

export function dbToApi<T extends Record<string, any>>(data: T): T {
  return convertObjectKeysToCamel(data) as T;
}
