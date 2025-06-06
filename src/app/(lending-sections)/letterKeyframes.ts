export const DEST_SCROLL = 600;

export const LETTER_KEYFRAMES = [
  { scroll: 0, x: 0, y: 0, scale: 1, rotate: -4.8, opacity: 1 },
  { scroll: 600, x: 950, y: 650, scale: 0.8, rotate: 0, opacity: 1 }, // 도착값
  { scroll: 650, x: 950, y: 650, scale: 0.8, rotate: 0, opacity: 1 }, // 동일 ↔ 멈춤
] as const;

export interface Keyframe {
  scroll: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
}
