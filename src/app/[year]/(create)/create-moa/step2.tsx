"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/create-moa/Step2.module.css";
import Button from "../../(components)/common/Button";
import type { NextStepProps } from "@/types/createMoa";
import { useCreateMoa } from "@/contexts/CreateMoaContext";
import { useMediaQuery } from "react-responsive";

/* 디자인 후보 목록 */
const backgrounds = [
  "/assets/icons/create_moa/background/step2_background.svg",
  "/assets/icons/create_moa/background/Blue-Bubble.svg",
  "/assets/icons/create_moa/background/check-patterned-blue.svg",
  "/assets/icons/create_moa/background/cherries.svg",
  "/assets/icons/create_moa/background/hearts-stars.svg",
  "/assets/icons/create_moa/background/lemon.svg",
  "/assets/icons/create_moa/background/eddy-frame.svg",
  "/assets/icons/create_moa/background/fried-eggs.svg",
  "/assets/icons/create_moa/background/doughnut.svg",
  "/assets/icons/create_moa/background/spotted-pattern.svg",
  "/assets/icons/create_moa/background/street.svg",
  "/assets/icons/create_moa/background/tree.svg",
  "/assets/icons/create_moa/background/ice-cream.svg",
  "/assets/icons/create_moa/background/house.svg",
  "/assets/icons/create_moa/background/cupcake.svg",
  
];
const boxes = [
  "/assets/icons/create_moa/step2_back.svg",
   "/assets/icons/create_moa/box-2.svg",
  "/assets/icons/create_moa/box-3.svg",
];
/* 장식은 id + src 로 관리 → FK 전송 */
const decos = [
  { id: 1, src: "/assets/icons/create_moa/deco-star.svg" },
  { id: 2, src: "/assets/icons/create_moa/deco-heart.svg" },
  { id: 3, src: "/assets/icons/create_moa/deco-ribbon.svg" },
];

type Tab = "background" | "box" | "deco";

interface Props extends NextStepProps {
  onBgChange: (url: string) => void;
}

export default function CreateMoaStep2({ nextStep, onBgChange }: Props) {
  const [tab, setTab] = useState<Tab>("background");
  const [background, setBackground] = useState(backgrounds[0]);
  const [box, setBox] = useState(boxes[0]);
  const [decoSrc, setDecoSrc] = useState<string | null>(null);

  const { update } = useCreateMoa();

  const [thumbItemMany, setThumbItemMany] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 600 });

  /* --- 드래그 스크롤용 ref --- */
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

  /* --- 썸네일 · 선택 상태 계산 --- */
  const thumbs =
    tab === "background"
      ? backgrounds
      : tab === "box"
      ? boxes
      : decos.map(d => d.src);

  const currentSelected =
    tab === "background" ? background : tab === "box" ? box : decoSrc;

  /* --- 선택 핸들러 --- */
  const handleSelect = (src: string, idx: number) => {
    if (tab === "background") {
      setBackground(src);
      onBgChange(src);
      update({ backgroundDesignId: idx + 1 }); // id = 1,2,3
    } else if (tab === "box") {
      setBox(src);
      update({ mailBoxDesignId: idx + 1 }); // id = 1,2,3
    } else {
      setDecoSrc(src);
      update({ decorationDesignId: decos[idx].id }); // FK 전송!
    }
  };

  // 하단 item 가운데 정렬, 좌측 정렬
  useEffect(() => {
    switch (tab) {
      case "background":
        if (isMobile ? backgrounds.length > 3 : backgrounds.length > 5) {
          return setThumbItemMany(true)
        }
      case "box":
        if (isMobile ? boxes.length > 3 : boxes.length > 5) {
          return setThumbItemMany(true)
        }
      case "deco":
        if (isMobile ? decos.length > 3 : decos.length > 5) {
          return setThumbItemMany(true)
        }
      default:
        return setThumbItemMany(false);
    }
  }, [tab])

  return (
    <div className={styles.step2_container}>
      {/* ───── 미리보기 영역 ───── */}
      <div className={styles.preview}>
        <Image
          src={box}
          alt="box"
          width={260}
          height={290}
          className={styles.preview_box}
        />
        {decoSrc && (
          <Image
            src={decoSrc}
            alt="decoration"
            width={120}
            height={120}
            className={styles.preview_deco}
          />
        )}
      </div>
        <div className={styles.next_btn}>
          <Button
            label="다음으로"
            size="medium"
            color="black"
            onClick={nextStep}
          />
        </div>

      {/* ───── 썸네일 & 탭 영역 ───── */}
      <footer className={styles.footer}>
        <div
          ref={rowRef}
          className={`${styles.thumb_row} ${
                  thumbItemMany ? styles.many : "" }`}
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
              key={`${src}-${i}`}
              className={`${styles.thumb_btn} ${
                currentSelected === src ? styles.thumb_selected : ""
              }`}
              onClick={() => handleSelect(src, i)}
            >
              <Image src={src} alt="thumb" width={96} height={96} />
            </button>
          ))}
        </div>

        <div className={styles.divider} />

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
