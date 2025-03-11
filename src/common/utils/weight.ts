export const convertToPounds = (lb: number, oz: number | null = null) => {
  if (oz === null || oz === 0) {
    return lb.toFixed(2);
  }

  return (lb + oz / 16).toFixed(2);
};
