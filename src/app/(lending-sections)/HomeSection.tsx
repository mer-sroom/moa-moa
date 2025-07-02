"use client";

import React from "react";
import Image from "next/image";
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
        {/* 1) 편지 (letter) */}
        <Image
          id="landing-letter"
          src="/assets/icons/lending/letter.svg"
          alt="Letter"
          width={548}
          height={362}
          className={`${styles.letterImage}`}
        />
        {/* 2) 음악 (music) */}
        <Image
          src="/assets/icons/lending/music.svg"
          alt="Music"
          width={333}
          height={425}
          className={styles.musicImage}
        />
        {/* 3) 고양이 (cat) */}
        <Image
          src="/assets/icons/lending/Goyang.svg"
          alt="Cat"
          width={222}
          height={175}
          className={styles.catImage}
        />
        {/* 4) 폭탄 (bomb) */}
        <Image
          src="/assets/icons/lending/bomb.svg"
          alt="Bomb"
          width={85}
          height={76}
          className={styles.bombImage}
        />
        {/* 5) 돼지 (pig) */}
        <Image
          src="/assets/icons/lending/pig.svg"
          alt="Pig"
          width={100}
          height={100}
          className={styles.pigImage}
        />
      </div>

      {/* 하단 화살표 (옵션) */}
      <Image
        src="/assets/icons/lending/arrow-down.svg"
        alt="Scroll Down"
        width={40}
        height={40}
        className={styles.arrowDown}
        onClick={onClickNext}
      />
    </section>
  );
}
