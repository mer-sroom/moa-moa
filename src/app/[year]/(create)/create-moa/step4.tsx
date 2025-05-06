"use client";
import styles from "@/styles/createMoa.module.css";
import Button from "../../(components)/common/Button";
import ToggleButton from "../(components)/ToggleButton";


export default function CreateMoaStep4() {


  return <>
    <h1>모아 설정</h1>
    <p className={styles.line_sort_gray}>한 번 설정한 값은 수정할 수 없습니다</p>
    <div className={styles.toggle_group}>
      <div>
        <span>비로그인 유저에게도 편지 받기</span>
        <div className={styles.toggle_right}>
          <ToggleButton label="비로그인 유저에게도 편지 받기"></ToggleButton>
          </div>
      </div>
      <div>
        <span>받은 편지 개수 공개하기</span>
        <div className={styles.toggle_right}>
          <ToggleButton label="받은 편지 개수 공개하기"></ToggleButton>
          </div>
      </div>
    </div>
    <Button label="생성하기" size="next" color="black"></Button>
  </>
}
