"use client";
import styles from "@/styles/createMoa.module.css";
import Button from "../../(components)/common/Button";

export default function CreateMoaStep5() {
  return (
    <div>
      <h1>새로운 모아 생성 완료!</h1>
      <p className={styles.line_sort_gray}>소중한 마음을 주고받기 위해 @#$%@#$ 해봐요~</p>
      <Button label="메인으로" size="next" color="black"></Button>
    </div>
  )
}
