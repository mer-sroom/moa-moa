"use client";

import React, { useState, forwardRef } from "react";
import Image from "next/image"; // <-- Image import
import styles from "@/styles/ExplanationSection.module.css";

// "Send a letter" 섹션
function SendLetterSection({ onClickNext }: { onClickNext: () => void }) {
  return (
    <div className={styles.subSection}>
      <h2>Send a letter</h2>
      <p>이곳은 &quot;Send a letter&quot; 섹션 내용입니다.</p>

      <Image
        src="/assets/icons/lending/arrow-down.svg"
        alt="Next"
        className={styles.arrowDown}
        width={40}
        height={40}
        onClick={onClickNext}
      />
    </div>
  );
}

// "Get a letter" 섹션
function GetLetterSection({ onClickNext }: { onClickNext: () => void }) {
  return (
    <div className={styles.subSection}>
      <h2>Get a letter</h2>
      <p>이곳은 &quot;Get a letter&quot; 섹션 내용입니다.</p>

      <Image
        src="/assets/icons/lending/arrow-down.svg"
        alt="Next"
        className={styles.arrowDown}
        width={40}
        height={40}
        onClick={onClickNext}
      />
    </div>
  );
}

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
