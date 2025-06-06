export const LETTER_KEYFRAMES = [
  { scroll: 0, x: 0, y: 0, scale: 1, rotate: -4.8, opacity: 1 },
  { scroll: 800, x: 0, y: 0, scale: 0.8, rotate: 0, opacity: 1 },
  { scroll: 850, x: 0, y: 0, scale: 0.8, rotate: 0, opacity: 0 },
] as const;

/* ▼ 읽기 전용 Keyframe → 가변 Keyframe 으로 복제 */
export type ReadonlyKeyframe = (typeof LETTER_KEYFRAMES)[number];

export interface Keyframe {
  scroll: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
}
