"use client";

import React, { useState, forwardRef } from "react";
import Image from "next/image"; // <-- Image import
import styles from "@/styles/ExplanationSection.module.css";

// "Send a letter" 섹션
function SendLetterSection({ onClickNext }: { onClickNext: () => void }) {
  return (
    <div className={styles.subSection}>
      {/* 기존 주석 : "Send a letter" 섹션 제목, 소개 */}
      <h2>Send a letter</h2>
      <p>이곳은 &quot;Send a letter&quot; 섹션 내용입니다.</p>

      {/* --- 새로 추가된 이미지 섹션 시작 --- */}
      <div className={styles.cardsWrapper}>
        {/* 각 카드(박스) */}
        <div className={styles.card}>
          <Image
            src="/assets/icons/lending/cat.svg"
            alt="고양이"
            width={100}
            height={100}
            className={styles.cardImage}
          />
          <h3>귀여운 오므자를 장식해요!</h3>
          <p>
            오늘도 바쁘게만 살아가는 어른 여러분 귀여운 아이콘을 활용해 작은
            행복을 찾아보세요!
          </p>
        </div>

        <div className={styles.cardCenter}>
          <Image
            src="/assets/icons/lending/letter3.svg"
            alt="편지지"
            width={100}
            height={100}
            className={styles.cardImage}
          />
          <h3>편지지를 열어봐요!</h3>
          <p>
            둘이 주고 받는 추억을 아름답게 기록해보아요. 손 편지 한 장이 줄 수
            있는 따뜻함을 최대한 담아내고 싶었어요.
          </p>
        </div>

        <div className={styles.card}>
          <Image
            src="/assets/icons/lending/cd.svg"
            alt="CD"
            width={100}
            height={100}
            className={styles.cardImage}
          />
          <h3>진진작한 음악을 들어요!</h3>
          <p>
            바쁜 시대를 살아가는 우리들에게 가볍게 즐길 수 있는 노래 추천과 함께
            편지로 힐링하는 소중한 시간을 만들어 보세요.
          </p>
        </div>

        {/* 편지봉투(letter4)는 뒤에 배치 */}
        <div className={styles.envelopeWrapper}>
          <Image
            src="/assets/icons/lending/letter4.svg"
            alt="편지봉투"
            fill
            className={styles.envelopeImage}
          />
        </div>
      </div>
      {/* --- 새로 추가된 이미지 섹션 끝 --- */}

      {/* 기존 주석 : 아래로 이동하는 화살표 */}
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
