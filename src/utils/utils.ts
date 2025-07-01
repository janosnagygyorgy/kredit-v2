export function limit(value: number, min: number, max?: number): number {
  if (max === undefined) return Math.max(value, min);
  return Math.min(Math.max(value, min), max);
}
