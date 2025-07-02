"use client";

import { useRef } from "react";
import LandingNavbar from "@/app/[year]/(components)/common/LandingNavbar";
import HomeSection from "@/app/(lending-sections)/HomeSection";
import ExplanationSection from "@/app/(lending-sections)/ExplanationSection";
import FinalSection from "@/app/(lending-sections)/FinalSection";
// import MovingLetterStatic from "@/app/(lending-sections)/MovingLetterStatic";
import styles from "@/styles/LandingPage.module.css";

/**
 * 루트 랜딩 페이지
 */
export default function Page() {
  // 두 번째 섹션(ExplanationSection) / 세 번째 섹션(FinalSection) 참조
  const explanationRef = useRef<HTMLElement | null>(null);
  const finalRef = useRef<HTMLElement | null>(null);

  // HomeSection → ExplanationSection
  const scrollToExplanation = () => {
    if (explanationRef.current) {
      explanationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ExplanationSection(“Get a letter”) → FinalSection
  const scrollToFinal = () => {
    if (finalRef.current) {
      finalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ← 고정 편지 레이어 */}
      {/* <MovingLetterStatic /> */}

      <div className={styles.container}>
        <LandingNavbar />
        <div className={styles.mainContent}>
          <HomeSection onClickNext={scrollToExplanation} />
          <ExplanationSection
            ref={explanationRef}
            onScrollFinal={scrollToFinal}
          />
          <FinalSection ref={finalRef} />
        </div>
      </div>
    </>
  );
}
