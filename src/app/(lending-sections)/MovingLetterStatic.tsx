"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  LETTER_KEYFRAMES,
  type Keyframe,
} from "@/app/(lending-sections)/letterKeyframes";

/** 읽기 전용 원본을 가변 복사본으로 변환 */
function cloneKeyframes(): Keyframe[] {
  return LETTER_KEYFRAMES.map(kf => ({ ...kf }));
}

export default function MovingLetterStatic() {
  /** 가변 복사본을 ref에 보관 (재렌더링 피하기) */
  const keyframesRef = useRef<Keyframe[]>(cloneKeyframes());
  const divRef = useRef<HTMLDivElement | null>(null);

  /* ① 편지·봉투 좌표를 읽어 복사본에 주입 */
  useEffect(() => {
    const letter = document.getElementById("landing-letter");
    const env = document.getElementById("landing-envelope");
    const kfs = keyframesRef.current;

    if (letter) {
      const r = letter.getBoundingClientRect();
      kfs[0].x = r.left + r.width / 2;
      kfs[0].y = r.top + r.height / 2 + window.scrollY;
    }
    if (env) {
      const r = env.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2 + window.scrollY;
      const last = kfs.length - 1;
      kfs[last - 1].x = kfs[last].x = x;
      kfs[last - 1].y = kfs[last].y = y;
    }
  }, []);

  /* ② 스크롤 이벤트 → transform·opacity 보간 */
  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const onScroll = () => {
      const yScroll = window.scrollY;
      const kfs = keyframesRef.current;

      // 현재 구간 인덱스
      let i = 0;
      while (i < kfs.length - 1 && yScroll >= kfs[i + 1].scroll) i++;

      const a = kfs[i];
      const b = kfs[i + 1] ?? kfs[kfs.length - 1];
      const t = a === b ? 0 : (yScroll - a.scroll) / (b.scroll - a.scroll);
      const lerp = (p: number, q: number) => p + (q - p) * t;

      const x = lerp(a.x, b.x);
      const y = lerp(a.y, b.y);
      const sc = lerp(a.scale, b.scale);
      const rt = lerp(a.rotate, b.rotate);
      const op = lerp(a.opacity, b.opacity);

      el.style.transform =
        `translate(-50%, -50%) translate(${x}px, ${y}px)` +
        ` scale(${sc}) rotate(${rt}deg)`;
      el.style.opacity = String(op);
    };

    onScroll(); // 첫 위치
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        transformOrigin: "center",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <Image
        src="/assets/icons/lending/letter.svg"
        alt="Letter"
        width={548}
        height={362}
        priority
      />
    </div>
  );
}
