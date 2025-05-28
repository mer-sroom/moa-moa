"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/create-moa/Step2.module.css";
import Button from "../../(components)/common/Button";
import type { NextStepProps } from "@/types/createMoa";

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
  onBgChange: (url: string) => void /* ★ 부모 콜백 */;
}

export default function CreateMoaStep2({ nextStep, onBgChange }: Props) {
  const [tab, setTab] = useState<Tab>("background");
  const [background, setBackground] = useState(backgrounds[0]);
  const [box, setBox] = useState(boxes[0]);
  const [deco, setDeco] = useState<string | null>(null);

  const thumbs =
    tab === "background" ? backgrounds : tab === "box" ? boxes : decos;

  const handleSelect = (src: string) => {
    if (tab === "background") {
      setBackground(src);
      onBgChange(src); /* ★ 부모에게 알림 */
    } else if (tab === "box") {
      setBox(src);
    } else {
      setDeco(src);
    }
  };

  /* JSX는 이전과 동일 */
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

      {/* ─── 새 푸터 ─── */}
      <footer className={styles.footer}>
        {/* 썸네일 행 */}
        <div className={styles.thumb_row}>
          {thumbs.map(src => (
            <button
              key={src}
              className={styles.thumb_btn}
              onClick={() => handleSelect(src)}
            >
              <Image src={src} alt="thumb" width={60} height={60} />
            </button>
          ))}
        </div>

        {/* 구분선 */}
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
