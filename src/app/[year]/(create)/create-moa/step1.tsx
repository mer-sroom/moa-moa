"use client";
import styles from "@/styles/createMoa.module.css";
import Button from "../../(components)/common/Button";

export default function CreateMoaStep() {
  return (
    <div>
      <h1>마음을 모아봐요!</h1>
      <div className={styles.line_sort_gray}>
        <p>나만의 우편함을 만들고 기념일을</p>
        <p>설정하면 편지를 받을 수 있어요!</p>
      </div>
      <Button label="모아 생성하기" size="next" color="black"></Button>
    </div>
  )
}
