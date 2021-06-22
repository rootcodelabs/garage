export function ratingValue(rating: number): number | null {
  const ratingVal = Math.round(rating * 10) / 10;
  return ratingVal;
}
