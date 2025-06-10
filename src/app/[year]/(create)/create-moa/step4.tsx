"use client";
/* STEP 4 ― 옵션 토글 + 실제 생성 POST */
import styles from "@/styles/createMoa.module.css";
import ToggleButton from "../(components)/ToggleButton";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import type { NextStepProps } from "@/types/createMoa";
import Button from "../../(components)/common/Button";
import { useCreateMoa } from "@/contexts/CreateMoaContext";

export default function CreateMoaStep4({ nextStep }: NextStepProps) {
  const [visible, setVisible] = useState(true);
  const [allowAnonymous, setAllowAnonymous] = useState(true);
  const [letterCountPublic, setLetterCountPublic] = useState(false);

  const { update, submit } = useCreateMoa();

  const handleClose = () => setVisible(false);

  const handleCreate = async () => {
    update({ allowAnonymous, letterCountPublic });
    await submit();
  };

  return (
    <div>
      <div className={styles.step4_main}>
        {visible && (
          <div className={styles.popup}>
            <button className={styles.popup_closeButton} onClick={handleClose}>
              <IoCloseOutline color="white" fontSize="30px" />
            </button>

            <div className={styles.popup_font}>
              <p>버튼을 검은색으로 만들어</p>
              <p>기능을 활성화 할 수 있어요</p>
            </div>
            <div className={styles.popup_toggle}>
              <div className={styles.popup_circle} />
            </div>
          </div>
        )}

        <div className={styles.step4_setting_group}>
          <h1>모아 설정</h1>
          <p className={styles.line_sort_gray}>
            한 번 설정한 값은 수정할 수 없습니다
          </p>
          <div>
            <div className={styles.span_group}>
              <span>비로그인 유저에게도 편지 받기</span>
              <div className={styles.toggle_right}>
                {/* CSS 유지를 위해 label만 전달 */}
                <ToggleButton label="비로그인 유저에게도 편지 받기" />
              </div>
            </div>
            <div className={styles.span_group}>
              <span>받은 편지 개수 공개하기</span>
              <div className={styles.toggle_right}>
                <ToggleButton label="받은 편지 개수 공개하기" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.step4_button}>
          <Button
            label="생성하기"
            size="medium"
            color="black"
            onClick={handleCreate}
          />
        </div>
      </div>
    </div>
  );
}
