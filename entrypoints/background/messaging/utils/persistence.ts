import { browser } from "wxt/browser";
export function saveToLocal(key: string, value: object): Promise<void> {
  return browser.storage.local.set({ [key]: value });
}
export async function loadFromLocal<T>(key: string): Promise<T | undefined> {
  const result = await browser.storage.local.get(key);
  return result[key] as Promise<T | undefined>;
}
