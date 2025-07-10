"use client";

import React from "react";
import Image from "next/image";
import styles from "@/styles/HomeSection.module.css";
import Hlighter from "./hlighter";
import { useMediaQuery } from "react-responsive";
import { redirect } from "next/navigation";
import { useSession } from 'next-auth/react';


interface HomeSectionProps {
  onClickNext?: () => void;
}

export default function HomeSection({ onClickNext }: HomeSectionProps) {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const { data: session, status } = useSession();
  const onCreateButton = () => {
    if (status === 'unauthenticated') return (redirect("/auth/login"))
    else if (status === 'authenticated') return (redirect("/[year]/create-moa"))
  };

  if (isMobile && status === 'unauthenticated') return (redirect("/auth/login"))
  else if (isMobile && status === 'authenticated') return (redirect("/[year]/moa/select-moa"))

  return (
    <section className={styles.homeSection}>
      {/* 왼쪽 텍스트 */}
      <div className={styles.leftContent}>
        <h1 className={styles.title}>MOA MOA!</h1>
        <p className={styles.subtitle}>마음을 모아, 모아!<br></br>편지를 more, more!</p>

        <div className={styles.description}>
          {/* 컴포넌트 Hlighter text에서 줄바꿈(엔터키)하면 웹에도 반영됩니다! */}
          <Hlighter
            text={`당신의 일기장에 적힐 소중하고 특별한 순간을 모두와 함께 즐기세요!
              MOA BOX는 친구들에게 받은 편지를 담아두는 아카이브이자, 개성을 보여줄 수 있는 나만의 작은 편지 보관함입니다. 
              모두와 함께 추억하고 싶은 순간들을 담아줄 MOA BOX를 내 취향대로 꾸미고 서로에게 편지를 건네보세요!`}
            keyword="MOA BOX" />
        </div>
        <button className={styles.createButton} onClick={onCreateButton}>만들기</button>
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
