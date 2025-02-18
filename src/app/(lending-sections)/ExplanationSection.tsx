"use client";

import React, { useState, forwardRef } from "react";
import styles from "@/styles/ExplanationSection.module.css";

/**
 * SendLetterSection:
 *  - 하단 화살표 클릭 시 onClickNext → "Get a letter"로 전환
 */
function SendLetterSection({ onClickNext }: { onClickNext: () => void }) {
  return (
    <div className={styles.subSection}>
      <h2>Send a letter</h2>
      <p>이곳은 "Send a letter" 섹션 내용입니다.</p>

      <img
        src="/assets/icons/lending/arrow-down.svg"
        alt="Next"
        className={styles.arrowDown}
        onClick={onClickNext}
      />
    </div>
  );
}

/**
 * GetLetterSection:
 *  - 하단 화살표 클릭 시 onClickNext → 파이널 섹션으로 스크롤
 */
function GetLetterSection({ onClickNext }: { onClickNext: () => void }) {
  return (
    <div className={styles.subSection}>
      <h2>Get a letter</h2>
      <p>이곳은 "Get a letter" 섹션 내용입니다.</p>

      <img
        src="/assets/icons/lending/arrow-down.svg"
        alt="Next"
        className={styles.arrowDown}
        onClick={onClickNext}
      />
    </div>
  );
}

/**
 * ExplanationSection (두 번째 섹션)
 *  - 상단 탭 버튼: "Send a letter" / "Get a letter"
 *  - "Send" 섹션 하단 화살표 → "Get" 섹션 전환
 *  - "Get" 섹션 하단 화살표 → 파이널 섹션 scrollIntoView
 */
interface ExplanationSectionProps {
  onScrollFinal: () => void;
}

const ExplanationSection = forwardRef<HTMLElement, ExplanationSectionProps>(
  ({ onScrollFinal }, ref) => {
    const [tab, setTab] = useState<"SEND" | "GET">("SEND");

    const handleClickSend = () => setTab("SEND");
    const handleClickGet = () => setTab("GET");

    return (
      <section ref={ref} className={styles.explanationSection}>
        {/* 상단 탭 버튼 */}
        <div className={styles.tabButtons}>
          <button
            onClick={handleClickSend}
            className={tab === "SEND" ? styles.activeBtn : styles.inactiveBtn}
          >
            Send a letter
          </button>
          <button
            onClick={handleClickGet}
            className={tab === "GET" ? styles.activeBtn : styles.inactiveBtn}
          >
            Get a letter
          </button>
        </div>

        {/* 하위 섹션 전환 */}
        {tab === "SEND" ? (
          <SendLetterSection onClickNext={() => setTab("GET")} />
        ) : (
          <GetLetterSection onClickNext={onScrollFinal} />
        )}
      </section>
    );
  }
);

ExplanationSection.displayName = "ExplanationSection";
export default ExplanationSection;
