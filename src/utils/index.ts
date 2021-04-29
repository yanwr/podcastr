export function convertDurationToTimeString(durationSeconds: number): string {
  const hr = Math.floor(durationSeconds / 3600);
  const min = Math.floor((durationSeconds % 3600) / 60)
  const sec = durationSeconds % 60;

  return [hr, min, sec].map(u => String(u).padStart(2, "0")).join(":");
}