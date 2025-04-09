
/**
 * Calculate required 5-star reviews to reach target rating
 */
export function calculateRequiredReviews(
  reviewCount: number | undefined, 
  currentRating: number | undefined, 
  targetRating: number | undefined
): number | null {
  if (!reviewCount || !currentRating || !targetRating) {
    return null;
  }

  if (targetRating <= currentRating) {
    return 0;
  }

  if (targetRating > 5) {
    return null;
  }

  const required = Math.ceil(reviewCount * (targetRating - currentRating) / (5 - targetRating));
  return required > 0 ? required : 0;
}
