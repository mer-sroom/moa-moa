"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/create-moa/Step2.module.css";
import Button from "../../(components)/common/Button";
import type { NextStepProps } from "@/types/createMoa";

/* 디자인 후보 목록 */
const backgrounds = [
  "/assets/icons/create_moa/step2_background.svg",
  "/assets/icons/create_moa/background-2.svg",
  "/assets/icons/create_moa/background-3.svg",
  "/assets/icons/create_moa/step2_background.svg",
  "/assets/icons/create_moa/background-2.svg",
  "/assets/icons/create_moa/background-3.svg",
];
const boxes = [
  "/assets/icons/create_moa/step2_back.svg",
  "/assets/icons/create_moa/box-2.svg",
  "/assets/icons/create_moa/box-3.svg",
];
const decos = [
  "/assets/icons/create_moa/deco-star.svg",
  "/assets/icons/create_moa/deco-heart.svg",
  "/assets/icons/create_moa/deco-ribbon.svg",
];

type Tab = "background" | "box" | "deco";

interface Props extends NextStepProps {
  onBgChange: (url: string) => void; // wrapper 배경 갱신 콜백
}

export default function CreateMoaStep2({ nextStep, onBgChange }: Props) {
  /* 선택 상태 */
  const [tab, setTab] = useState<Tab>("background");
  const [background, setBackground] = useState(backgrounds[0]);
  const [box, setBox] = useState(boxes[0]);
  const [deco, setDeco] = useState<string | null>(null);

  /* 썸네일 드래그 스크롤 로직 */
  const rowRef = useRef<HTMLDivElement | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const dragStart = (pageX: number) => {
    isDown.current = true;
    startX.current = pageX - (rowRef.current?.offsetLeft || 0);
    scrollLeft.current = rowRef.current?.scrollLeft || 0;
  };
  const dragMove = (pageX: number) => {
    if (!isDown.current) return;
    const x = pageX - (rowRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.2;
    if (rowRef.current) rowRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const dragEnd = () => (isDown.current = false);

  /* 탭별 썸네일 목록 + 선택 값 */
  const thumbs =
    tab === "background" ? backgrounds : tab === "box" ? boxes : decos;
  const currentSelected =
    tab === "background" ? background : tab === "box" ? box : deco;

  /* 썸네일 클릭 */
  const handleSelect = (src: string) => {
    if (tab === "background") {
      setBackground(src);
      onBgChange(src);
    } else if (tab === "box") setBox(src);
    else setDeco(src);
  };

  return (
    <div className={styles.step2_container}>
      {/* ───────── Preview ───────── */}
      <div className={styles.preview}>
        <Image
          src={box}
          alt="box"
          width={260}
          height={290}
          className={styles.preview_box}
        />
        {deco && (
          <Image
            src={deco}
            alt="decoration"
            width={120}
            height={120}
            className={styles.preview_deco}
          />
        )}
        <div className={styles.next_btn}>
          <Button
            label="다음으로"
            size="medium"
            color="black"
            onClick={nextStep}
          />
        </div>
      </div>

      {/* ───────── Footer ───────── */}
      <footer className={styles.footer}>
        {/* 썸네일 행 (드래그 스크롤) */}
        <div
          ref={rowRef}
          className={styles.thumb_row}
          onMouseDown={e => dragStart(e.pageX)}
          onMouseMove={e => dragMove(e.pageX)}
          onMouseUp={dragEnd}
          onMouseLeave={dragEnd}
          onTouchStart={e => dragStart(e.touches[0].pageX)}
          onTouchMove={e => dragMove(e.touches[0].pageX)}
          onTouchEnd={dragEnd}
        >
          {thumbs.map((src, i) => (
            <button
              key={`${src}-${i}`} // ← src + index 로 유니크 보장
              className={`${styles.thumb_btn} ${
                currentSelected === src ? styles.thumb_selected : ""
              }`}
              onClick={() => handleSelect(src)}
            >
              <Image src={src} alt="thumb" width={96} height={96} />
            </button>
          ))}
        </div>

        <div className={styles.divider} />

        {/* 탭 메뉴 */}
        <nav className={styles.tab_nav}>
          {(["배경", "모아 박스", "장식"] as const).map((label, i) => {
            const value: Tab =
              i === 0 ? "background" : i === 1 ? "box" : "deco";
            return (
              <button
                key={label}
                className={`${styles.tab_btn} ${
                  tab === value ? styles.active : ""
                }`}
                onClick={() => setTab(value)}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}
