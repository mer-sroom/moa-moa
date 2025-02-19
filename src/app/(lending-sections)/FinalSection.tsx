"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "@/styles/FinalSection.module.css";

const FinalSection = forwardRef<HTMLElement>((props, ref) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEnjoyNow = () => {
    if (!session) {
      // 로그인 안 된 경우 → 로그인 페이지로 이동
      router.push("/auth/login");
    } else {
      // 로그인 된 경우 → 대시보드 등 원하는 페이지로 이동
      router.push("/dashboard");
    }
  };

  return (
    <section ref={ref} className={styles.finalSection}>
      {/* 편지 이미지 (Letter2.svg) 중앙에 배치: Image 컴포넌트로 변경 */}
      <Image
        src="/assets/icons/lending/Letter2.svg"
        alt="Letter2"
        width={600} // 원하는 폭(px)
        height={400} // 원하는 높이(px)
        className={styles.letterImage}
      />

      {/* Enjoy now! 버튼 */}
      <button className={styles.enjoyButton} onClick={handleEnjoyNow}>
        Enjoy now!
      </button>
    </section>
  );
});

FinalSection.displayName = "FinalSection";
export default FinalSection;
