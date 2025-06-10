"use client";

import styles from "@/styles/createMoa.module.css";
import Image from "next/image";
import step1 from "@/../../public/assets/icons/createmoa_step1.svg";
import Button from "../../(components)/common/Button";
import type { NextStepProps } from "@/types/createMoa";

// STEP 1 ─ 인트로
export default function CreateMoaStep1({ nextStep }: NextStepProps) {
  return (
    <div>
      <div className={styles.step1_container}>
        <Image src={step1} alt="step1" />
        <h1>마음을 모아봐요!</h1>
        <div className={styles.line_sort_gray}>
          <p>나만의 우편함을 만들고 기념일을</p>
          <p>설정하면 편지를 받을 수 있어요!</p>
        </div>
        <div className={styles.button}>
          <Button
            label="모아 생성하기"
            size="medium"
            color="black"
            onClick={nextStep}
          />
        </div>
      </div>
    </div>
  );
}
