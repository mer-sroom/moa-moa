export function useSmoothScroll() {
  return (targetY: number, duration = 800) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1); // 0 → 1
      // easeInOutQuad
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      window.scrollTo(0, startY + diff * eased);
      if (elapsed < duration) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
}
