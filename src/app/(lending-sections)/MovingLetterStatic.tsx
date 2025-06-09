"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  LETTER_KEYFRAMES,
  DEST_SCROLL,
  type Keyframe,
} from "@/app/(lending-sections)/letterKeyframes";

const clone = (): Keyframe[] => LETTER_KEYFRAMES.map(k => ({ ...k }));

export default function MovingLetterStatic() {
  const kfsRef = useRef<Keyframe[]>(clone());
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letter = document.getElementById("landing-letter");
    const kfs = kfsRef.current;

    if (letter) {
      const r = letter.getBoundingClientRect();
      kfs[0].x = r.left + r.width / 2;
      kfs[0].y = r.top + r.height / 2 + window.scrollY;
    }

    const centerX = window.innerWidth / 2;
    const destY = DEST_SCROLL;
    const last = kfs.length - 1;
    kfs[last - 1].x = kfs[last].x = centerX;
    kfs[last - 1].y = kfs[last].y = destY;
  }, []);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const onScroll = () => {
      const y = Math.min(window.scrollY, DEST_SCROLL); // clamp
      const kfs = kfsRef.current;

      let i = 0;
      while (i < kfs.length - 1 && y >= kfs[i + 1].scroll) i++;
      const [a, b] = [kfs[i], kfs[i + 1]];
      const t = (y - a.scroll) / (b.scroll - a.scroll);
      const L = (p: number, q: number) => p + (q - p) * t;

      el.style.transform =
        `translate(-50%,-50%) translate(${L(a.x, b.x)}px,${L(a.y, b.y)}px)` +
        ` scale(${L(a.scale, b.scale)}) rotate(${L(a.rotate, b.rotate)}deg)`;
      el.style.opacity = String(L(a.opacity, b.opacity));

      if (!window.__letterArrived && window.scrollY >= DEST_SCROLL) {
        window.__letterArrived = true;

        /* 2 s 유지 → 0.4 s 페이드아웃 */
        setTimeout(() => {
          el.style.transition = "opacity .4s ease";
          el.style.opacity = "0";
          setTimeout(() => {
            el.style.display = "none";
          }, 400); // 완전 제거
        }, 1000);

        /* 착지 이벤트 */
        window.dispatchEvent(new CustomEvent("letter-arrived"));

        /* ★ 더 이상 따라다니지 않도록 스크롤 리스너 해제 */
        window.removeEventListener("scroll", onScroll);
      }
    };

    onScroll(); // 초기 위치
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── 3) 렌더 ── */
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
