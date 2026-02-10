export function computeStats(data: number[]): { min: number; max: number; mean: number } {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const mean = data.reduce((sum, v) => sum + v, 0) / data.length;
  return {
    min: Math.round(min * 100) / 100,
    max: Math.round(max * 100) / 100,
    mean: Math.round(mean * 100) / 100,
  };
}
