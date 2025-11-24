export async function loadJSON<T>(path: string): Promise<T> {
  const module = await import(`../presentation-data/${path}`);
  return module.default as T;
}
