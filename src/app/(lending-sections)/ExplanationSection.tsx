/* src/app/(lending-sections)/ExplanationSection.tsx */
"use client";

import React, { useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/styles/ExplanationSection.module.css";
import { DEST_SCROLL } from "@/app/(lending-sections)/letterKeyframes";

interface Props {
  onScrollFinal: () => void;
}

const ExplanationSection = forwardRef<HTMLElement, Props>(
  ({ onScrollFinal }, ref) => {
    /* ───────── state ───────── */
    const [tab, setTab] = useState<"SEND" | "GET">("SEND");
    const [env, setEnv] = useState(false); // 봉투(fade-in)
    const [cards, setCards] = useState(false); // 카드 등장
    /* Get 섹션 재생 트리거 */
    const [playGet, setPlayGet] = useState(false);

    /* ───────── 봉투·카드 등장 타이밍 ───────── */
    useEffect(() => {
      if (window.scrollY >= DEST_SCROLL + 200) {
        setEnv(true);
        setCards(true);
      }
    }, []);
    useEffect(() => {
      const onArrived = () => {
        setTimeout(() => setEnv(true), 1500); // 1.5 s 후 봉투
        setTimeout(() => setCards(true), 2000); // 2.0 s 후 카드
      };
      addEventListener("letter-arrived", onArrived);
      return () => removeEventListener("letter-arrived", onArrived);
    }, []);

    /* ───────── 카드 업그레이드 ­BG ───────── */
    const upgraded = {
      cat: "/assets/icons/lending/cat_upgrade.svg",
      letter: "/assets/icons/lending/Letter_upgrade.svg",
      cd: "/assets/icons/lending/Cd_upgrade.svg",
    };
    const cls = (f: boolean) => (f ? styles.fadeIn : styles.hidden);

    /* ---------- SEND 섹션 ---------- */
    const Send = ({ onClickNext }: { onClickNext: () => void }) => (
      <div className={styles.subSection}>
        {/* 카드 3장 */}
        <motion.div
          className={`${styles.cardsWrapper} ${cls(cards)}`}
          initial="hidden"
          animate={cards ? "show" : "hidden"}
          variants={{
            show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
          }}
        >
          {["cat", "letter", "cd"].map(key => (
            <motion.div
              key={key}
              className={
                key === "letter"
                  ? `${styles.cardCenter} ${styles.cardCore}`
                  : `${styles.card} ${styles.cardCore}`
              }
              style={
                {
                  "--upgrade-img": `url(${
                    upgraded[key as keyof typeof upgraded]
                  })`,
                } as any
              }
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 120 },
                },
              }}
            >
              <Image
                src={
                  key === "cat"
                    ? "/assets/icons/lending/cat.svg"
                    : key === "letter"
                    ? "/assets/icons/lending/letter3.svg"
                    : "/assets/icons/lending/cd.svg"
                }
                alt={key}
                width={100}
                height={100}
                className={
                  key === "cat"
                    ? styles.leftcardImage
                    : key === "letter"
                    ? styles.cardImage
                    : styles.rightcardImage
                }
              />
              <h3>
                {key === "cat"
                  ? "Step 1. 오브제 올리기!"
                  : key === "letter"
                  ? "Step 2. 편지지를 골라봐요!"
                  : "Step 3. 이 편지에는 이 노래가 딱이야!"}
              </h3>
              <p className={styles.cardBody}>
                {key === "cat"
                  ? "편지에 들어갈 귀여운 오브제를 \n 커스텀 해보세요! \n 편지의 포인트가 되어줄 거에요!"
                  : key === "letter"
                  ? "배경이 될 편지지는 중요해요! \n 자유롭게 고르세요! 당신의 선택을 위해 다양하게 준비했습니다!"
                  : "친구에게 보내는 편지 \n 이 편지를 읽을 때는 이 노래가 어울려! 직접 선곡하세요!"}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 봉투 래퍼 */}
        <div className={`${styles.envelopeWrapper} ${cls(env)}`}>
          <Image
            src="/assets/icons/lending/letter4.svg"
            alt="편지봉투"
            fill
            className={styles.envelopeImage}
          />
        </div>

        {/* ↓ 화살표 */}
        <Image
          src="/assets/icons/lending/arrow-down.svg"
          alt="Next"
          width={40}
          height={40}
          className={styles.arrowDown}
          onClick={onClickNext}
        />
      </div>
    );

    /* ---------- GET 섹션 ---------- */
    const Get = ({ onClickNext }: { onClickNext: () => void }) => {
      /* 등장 트리거 */
      const [play, setPlay] = useState(false);
      useEffect(() => {
        const id = setTimeout(() => setPlay(true), 200);
        return () => clearTimeout(id);
      }, []);

      /* 애니메이션 variants */
      const textVar = {
        hidden: { x: 120, opacity: 0 },
        show: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        },
      };
      const imgVar = {
        hidden: { x: "-50%", opacity: 0 },
        show: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        },
      };

      return (
        <div className={`${styles.subSection} ${styles.getSection}`}>
          {/* 기존 flex 레이아웃을 살리는 래퍼 */}
          <div className={styles.contentWrapper}>
            {/* ── 글 ── */}
            <motion.div
              className={styles.textWrapper}
              variants={textVar}
              initial="hidden"
              animate={play ? "show" : "hidden"}
            >
              <h2 className={styles.title}>Get a letter</h2>
              <p>
                받은 편지는 MOA BOX에 보관됩니다! <br></br>
                만들어진 MOA BOX는 각각 기념일이 존재해요! <br></br>
                친구가 어떤 기념일을 설정했을지 궁금하지 않나요? <br></br>
                기념일이 끝나면 MOA BOX가 닫혀버리니 조심하세요! 그전에 편지를 보내야 안전하답니다!<br></br>
                만약 친구와 함께하고 싶은 기념일이 있다면 MOA BOX를 생성할 때 <br></br>
                그룹 설정을 켜고 친구를 추가해주세요!<br></br>
              </p>
              <p className={styles.highlight}>
                지금 바로 예쁜 편지지와 멋진 노래를 담아 편지를 보내보세요!
              </p>
            </motion.div>

            {/* ── 보관함 그림 ── */}
            <motion.div
              className={styles.imageWrapper}
              variants={imgVar}
              initial="hidden"
              animate={play ? "show" : "hidden"}
            >
              <Image
                src="/assets/icons/lending/Get_a_letter_house.svg"
                alt="받은 편지 보관함"
                width={480}
                height={480}
                className={styles.houseImage}
                priority
              />
            </motion.div>
          </div>

          {/* ↓ 화살표 */}
          <Image
            src="/assets/icons/lending/arrow-down.svg"
            alt="Next"
            width={40}
            height={40}
            className={styles.arrowDown}
            onClick={tab === "SEND" ? () => setTab("GET") : onScrollFinal}
            /* ▼ SEND일 땐 15rem, GET일 땐 5rem */
            style={{ marginTop: tab === "SEND" ? "15rem" : "5rem" }}
          />
        </div>
      );
    };

    /* ───────── JSX ───────── */
    return (
      <section ref={ref} className={styles.explanationSection}>
        {/* 탭 버튼 */}
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
          <Send onClickNext={() => setTab("GET")} />
        ) : (
          <Get onClickNext={onScrollFinal} />
        )}
      </section>
    );
  }
);

ExplanationSection.displayName = "ExplanationSection";
export default ExplanationSection;
