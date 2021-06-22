export function getHumanDuration(duration: number): string {
  const durationMin = duration % 60;
  const durationhours = Math.floor(duration / 60);
  const hours = durationhours === 0 ? '' : durationhours === 1 ? `${durationhours} hr` : `${durationhours} hrs`;
  const minutes = durationMin === 0 ? '' : durationMin === 1 ? `${durationMin} min` : `${durationMin} mins`;
  const durationNew = hours ? `${hours} ${minutes}` : `${minutes}`;
  return durationNew;
}
