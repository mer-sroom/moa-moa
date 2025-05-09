"use client";
import styles from "@/styles/createMoa.module.css";
import ToggleButton from "../(components)/ToggleButton";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from 'react';


export default function CreateMoaStep4() {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return <div className={styles.step4_Container}>
    <div>
      {visible && (
        <div className={styles.popup}>
          <button className={styles.popup_closeButton}
            onClick={handleClose}>
            <IoCloseOutline color="white" fontSize={"25px"} />
          </button>
          <div className={styles.popup_font}>
            <p>버튼을 검은색으로 만들어</p>
            <p>기능을 활성화 할 수 있어요</p>
          </div>
        </div>
      )}

    </div>
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
  </div>
}
