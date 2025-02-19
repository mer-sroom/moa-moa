"use client";

import React from "react";
import styles from "@/styles/HomeSection.module.css";

interface HomeSectionProps {
  onClickNext?: () => void;
}

export default function HomeSection({ onClickNext }: HomeSectionProps) {
  return (
    <section className={styles.homeSection}>
      {/* 왼쪽 텍스트 */}
      <div className={styles.leftContent}>
        <h1 className={styles.title}>MOA MOA!</h1>
        <p className={styles.subtitle}>Connect, Customize, Collect!</p>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque vitae
          quod natus quis quibusdam saepe veritatis quia at officiis, nisi modi
          recusandae magnam obcaecati aliquam autem quidem repellat quae illo.
        </p>
        <button className={styles.createButton}>만들기</button>
      </div>

      {/* 오른쪽 이미지 영역 */}
      <div className={styles.rightContent}>
        <img
          src="/assets/icons/lending/letter.svg"
          alt="Letter"
          className={styles.letterImage}
        />
        <img
          src="/assets/icons/lending/music.svg"
          alt="Music"
          className={styles.musicImage}
        />
        <img
          src="/assets/icons/lending/Goyang.svg"
          alt="Cat"
          className={styles.catImage}
        />
        <img
          src="/assets/icons/lending/bomb.svg"
          alt="Bomb"
          className={styles.bombImage}
        />
        <img
          src="/assets/icons/lending/pig.svg"
          alt="Pig"
          className={styles.pigImage}
        />
      </div>

      {/* 하단 화살표 (옵션) */}
      <img
        src="/assets/icons/lending/arrow-down.svg"
        alt="Scroll Down"
        className={styles.arrowDown}
        onClick={onClickNext}
      />
    </section>
  );
}
