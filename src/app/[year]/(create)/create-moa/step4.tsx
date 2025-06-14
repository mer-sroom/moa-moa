"use client";
import styles from "@/styles/create-moa/createMoa.module.css";
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
    <>
      <div className={styles.create_moa_container}>
        <div className={styles.step4_setting_group}>
          <h2 className={styles.title}>모아 박스 수신 & 공개 설정</h2>
          <p className={styles.line_sort_gray}>
            익명 수신 및 편지 수 공개 여부를 선택할 수 있어요
          </p>
          <div className={styles.step4_options_container}>
            <div className={styles.span_group}>
              <span>비로그인 유저에게도 편지 받기</span>
              <div className={styles.toggle_right}>
                <ToggleButton
                  label="비로그인 유저에게도 편지 받기"
                  checked={allowAnonymous}
                  onChange={setAllowAnonymous}
                />
              </div>
            </div>
            <div className={styles.span_group}>
              <span>받은 편지 개수 공개하기</span>
              <div className={styles.toggle_right}>
                <ToggleButton
                  label="받은 편지 개수 공개하기"
                  checked={letterCountPublic}
                  onChange={setLetterCountPublic}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.create_moa_button}>
          <Button
            label="생성하기"
            size="medium"
            color="black"
            onClick={handleCreate}
          />
        </div>
      </div>
    </>
  );
}
