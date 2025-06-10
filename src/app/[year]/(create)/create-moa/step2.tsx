"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/create-moa/Step2.module.css";
import Button from "../../(components)/common/Button";
import type { NextStepProps } from "@/types/createMoa";
import { useCreateMoa } from "@/contexts/CreateMoaContext";

/* 디자인 후보 목록 */
const backgrounds = [
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
  onBgChange: (url: string) => void;
}

export default function CreateMoaStep2({ nextStep, onBgChange }: Props) {
  const [tab, setTab] = useState<Tab>("background");
  const [background, setBackground] = useState(backgrounds[0]);
  const [box, setBox] = useState(boxes[0]);
  const [deco, setDeco] = useState<string | null>(null);

  const { update } = useCreateMoa();

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

  const thumbs =
    tab === "background" ? backgrounds : tab === "box" ? boxes : decos;
  const currentSelected =
    tab === "background" ? background : tab === "box" ? box : deco;

  const handleSelect = (src: string, idx: number) => {
    if (tab === "background") {
      setBackground(src);
      onBgChange(src);
      update({ backgroundDesignId: idx + 1 });
    } else if (tab === "box") {
      setBox(src);
      update({ mailBoxDesignId: idx + 1 });
    } else {
      setDeco(src);
    }
  };

  return (
    <div className={styles.step2_container}>
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

      <footer className={styles.footer}>
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
