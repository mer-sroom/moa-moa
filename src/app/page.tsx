"use client";

import { useRef } from "react";
import LandingNavbar from "@/app/[year]/(components)/common/LandingNavbar";
import HomeSection from "@/app/(lending-sections)/HomeSection";
import ExplanationSection from "@/app/(lending-sections)/ExplanationSection";
import FinalSection from "@/app/(lending-sections)/FinalSection";

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
    <div className={styles.container}>
      {/* 스티키 Navbar */}
      <LandingNavbar />

      <div className={styles.mainContent}>
        {/* 1) Home Section */}
        <HomeSection onClickNext={scrollToExplanation} />

        {/* 2) Explanation Section */}
        <ExplanationSection
          ref={explanationRef}
          onScrollFinal={scrollToFinal}
        />

        {/* 3) Final Section */}
        <FinalSection ref={finalRef} />
      </div>
    </div>
  );
}
