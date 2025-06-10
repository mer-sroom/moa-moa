"use client";

import styles from "@/styles/createMoa.module.css";
import type { NextStepProps } from "@/types/createMoa";
import Button from "../../(components)/common/Button";
import Image from "next/image";
import step5 from "@/../../public/assets/icons/createmoa_step5.svg";

// STEP 5 ─ 완료 화면
export default function CreateMoaStep5({ goSelectMoa }: NextStepProps) {
  return (
    <div className={styles.step5_container}>
      <Image src={step5} alt="step5" />
      <div className={styles.step5_font_container}>
        <h1>새로운 모아 생성 완료!</h1>
        <div className={styles.line_sort_gray}>
          <p>
            소중한 마음을 주고받기 위해 <br />한 번 공유해 보세요!
          </p>
        </div>
      </div>
      <div className={styles.button}>
        <Button
          label="메인으로"
          size="medium"
          color="black"
          onClick={goSelectMoa}
        />
      </div>
    </div>
  );
}
