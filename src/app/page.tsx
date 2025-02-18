"use client";

import { useRef } from "react";
import Navbar from "@/app/[year]/(components)/common/LandingNavbar";
import HomeSection from "@/app/(lending-sections)/HomeSection";
import ExplanationSection from "@/app/(lending-sections)/ExplanationSection";
import FinalSection from "@/app/(lending-sections)/FinalSection";
import styles from "@/styles/LandingPage.module.css";

/**
 * 메인 랜딩 페이지 (루트)
 *  - 1) HomeSection
 *  - 2) ExplanationSection (내부 탭: Send / Get)
 *  - 3) FinalSection
 */
export default function Page() {
  // 파이널 섹션 DOM 참조
  const finalRef = useRef<HTMLElement | null>(null);

  // ExplanationSection("Get a letter" 하위 섹션)에서 화살표 클릭 시
  // 파이널 섹션으로 스크롤하기 위한 콜백
  const scrollToFinal = () => {
    if (finalRef.current) {
      finalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      {/* 상단 고정 네비바 */}
      <Navbar />

      <div className={styles.mainContent}>
        {/* 1) Home Section */}
        <HomeSection
        // 필요하다면, HomeSection 화살표 클릭 → scroll to ExplanationSection
        // 구현도 가능. 예: onClickNext={scrollToExplanation}
        />

        {/* 2) Explanation Section (탭: Send / Get) */}
        <ExplanationSection onScrollFinal={scrollToFinal} />

        {/* 3) Final Section (마지막) */}
        <FinalSection ref={finalRef} />
      </div>
    </div>
  );
}
