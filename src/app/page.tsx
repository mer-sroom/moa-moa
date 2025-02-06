"use client";

import { useState } from "react";
// import Navbar from "@/app/[year]/(components)/common/Navbar";
import styles from "@/styles/LandingPage.module.css";
import Navbar from "@/app/[year]/(components)/common/LandingNavbar";
export default function LandingPage() {
  // 'home' → 첫 섹션, 'explanation' → 두 번째 섹션
  const [selectedSection, setSelectedSection] = useState<
    "home" | "explanation"
  >("home");

  return (
    <div className={styles.container}>
      {/* 상단 고정 Navbar */}
      <Navbar />

      <div className={styles.mainContent}>
        {selectedSection === "home" && (
          <HomeSection onClickNext={() => setSelectedSection("explanation")} />
        )}

        {selectedSection === "explanation" && <ExplanationSection />}
      </div>
    </div>
  );
}

/** 1) 첫 번째 섹션 (HomeSection) */
function HomeSection({ onClickNext }: { onClickNext: () => void }) {
  return (
    <section className={styles.homeSection}>
      {/* 왼쪽 텍스트 영역 (픽셀 고정 배치) */}
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

      {/* 오른쪽 (이미지 배치) */}
      <div className={styles.rightContent}>
        {/* 편지 (중앙) */}
        <img
          src="/assets/icons/lending/letter.svg"
          alt="Letter"
          className={styles.letterImage}
        />
        {/* 뮤직 (편지 뒤, 오른쪽 위) */}
        <img
          src="/assets/icons/lending/music.svg"
          alt="Music"
          className={styles.musicImage}
        />
        {/* 고양이 (편지 앞, 왼쪽 아래) */}
        <img
          src="/assets/icons/lending/Goyang.svg"
          alt="Cat"
          className={styles.catImage}
        />
        {/* 폭탄 (편지 왼편) */}
        <img
          src="/assets/icons/lending/bomb.svg"
          alt="Bomb"
          className={styles.bombImage}
        />
        {/* 돼지 (편지 왼쪽 위) */}
        <img
          src="/assets/icons/lending/pig.svg"
          alt="Pig"
          className={styles.pigImage}
        />
      </div>

      {/* 하단 중앙 화살표 버튼 */}
      <img
        src="/assets/icons/lending/arrow-down.svg"
        alt="Scroll Down"
        className={styles.arrowDown}
        onClick={onClickNext} // 클릭 시 다음 섹션으로
      />
    </section>
  );
}

/** 2) 두 번째 섹션 (설명 섹션) */
function ExplanationSection() {
  return (
    <section className={styles.explanationSection}>
      <h2>설명 섹션</h2>
      <p>섹션을 전환을 해버릴지지 말지,, ㅡ,ㅡ,ㅡ,ㅡ 아ㅏㅏㅏㅏㅏㅏㅏㅏㅏ</p>
    </section>
  );
}
