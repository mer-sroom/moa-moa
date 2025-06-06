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
                  ? "귀여운 오므자를 장식해요!"
                  : key === "letter"
                  ? "편지지를 열어봐요!"
                  : "진진작한 음악을 들어요!"}
              </h3>
              <p className={styles.cardBody}>
                {key === "cat"
                  ? "오늘도 작은 행복을 찾아보세요!"
                  : key === "letter"
                  ? "추억을 아름답게 기록해요."
                  : "노래와 함께 힐링!"}
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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit…</p>
              <p className={styles.highlight}>
                Nulla consequat massa quis enim. Donec pede justo…
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
