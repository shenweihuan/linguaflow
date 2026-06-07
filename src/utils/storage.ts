const STORAGE_PREFIX = 'linguaflow_';

function getKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(getKey(key));
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[Storage] Failed to get item "${key}":`, error);
    return null;
  }
}

export function setItem(key: string, value: unknown): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(getKey(key), serialized);
  } catch (error) {
    console.warn(`[Storage] Failed to set item "${key}":`, error);
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(getKey(key));
  } catch (error) {
    console.warn(`[Storage] Failed to remove item "${key}":`, error);
  }
}
