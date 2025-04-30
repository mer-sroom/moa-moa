"use client";

import React, { useState, forwardRef } from "react";
import Image from "next/image";
import styles from "@/styles/ExplanationSection.module.css";

interface ExplanationSectionProps {
  onScrollFinal: () => void;
}

const ExplanationSection = forwardRef<HTMLElement, ExplanationSectionProps>(
  ({ onScrollFinal }, ref) => {
    const [tab, setTab] = useState<"SEND" | "GET">("SEND");

    /* ── ★ 카드별 업그레이드 이미지 경로 ── */
    const upgraded = {
      cat: "/assets/icons/lending/cat_upgrade.svg",
      letter: "/assets/icons/lending/Letter_upgrade.svg",
      cd: "/assets/icons/lending/Cd_upgrade.svg",
    };

    /* ---------------- SEND 섹션 ---------------- */
    function SendLetterSection({ onClickNext }: { onClickNext: () => void }) {
      return (
        <div className={styles.subSection}>
          <div className={styles.cardsWrapper}>
            {/* 왼쪽 카드 */}
            <div
              className={`${styles.card} ${styles.cardCore}`}
              /* ★ 업그레이드 이미지 경로를 CSS 변수로 전달 */
              style={
                {
                  "--upgrade-img": `url(${upgraded.cat})`,
                } as React.CSSProperties
              }
            >
              <Image
                src="/assets/icons/lending/cat.svg"
                alt="고양이"
                width={100}
                height={100}
                className={styles.leftcardImage}
              />
              <h3>귀여운 오므자를 장식해요!</h3>
              <p className={styles.cardBody}>
                오늘도 바쁘게만 살아가는 어른 여러분 귀여운 아이콘을 활용해 작은
                행복을 찾아보세요!
              </p>
            </div>

            {/* 중앙 카드 */}
            <div
              className={`${styles.cardCenter} ${styles.cardCore}`}
              style={
                {
                  "--upgrade-img": `url(${upgraded.letter})`,
                } as React.CSSProperties
              }
            >
              <Image
                src="/assets/icons/lending/letter3.svg"
                alt="편지지"
                width={100}
                height={100}
                className={styles.cardImage}
              />
              <h3>편지지를 열어봐요!</h3>
              <p className={styles.cardBody}>
                둘이 주고 받는 추억을 아름답게 기록해보아요. 손 편지 한 장이 줄
                수 있는 따뜻함을 최대한 담아내고 싶었어요.
              </p>
            </div>

            {/* 오른쪽 카드 */}
            <div
              className={`${styles.card} ${styles.cardCore}`}
              style={
                {
                  "--upgrade-img": `url(${upgraded.cd})`,
                } as React.CSSProperties
              }
            >
              <Image
                src="/assets/icons/lending/cd.svg"
                alt="CD"
                width={100}
                height={100}
                className={styles.rightcardImage}
              />
              <h3>진진작한 음악을 들어요!</h3>
              <p className={styles.cardBody}>
                바쁜 시대를 살아가는 우리들에게 가볍게 즐길 수 있는 노래 추천과
                함께 편지로 힐링하는 소중한 시간을 만들어 보세요.
              </p>
            </div>

            {/* 뒤 편지봉투 */}
            <div className={styles.envelopeWrapper}>
              <Image
                src="/assets/icons/lending/letter4.svg"
                alt="편지봉투"
                fill
                className={styles.envelopeImage}
              />
            </div>
          </div>

          {/* ↓ 버튼 */}
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

    /* ---------------- GET 섹션 (변경 없음) ---------------- */
    function GetLetterSection({ onClickNext }: { onClickNext: () => void }) {
      return (
        <div className={styles.subSection}>
          <h2>Get a letter</h2>
          <p>이곳은 "Get a letter" 섹션 내용입니다.</p>

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

    return (
      <section ref={ref} className={styles.explanationSection}>
        <div className={styles.tabButtons}>
          <button
            onClick={() => setTab("SEND")}
            className={tab === "SEND" ? styles.activeBtn : styles.inactiveBtn}
          >
            Send a letter
          </button>
          <button
            onClick={() => setTab("GET")}
            className={tab === "GET" ? styles.activeBtn : styles.inactiveBtn}
          >
            Get a letter
          </button>
        </div>

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
