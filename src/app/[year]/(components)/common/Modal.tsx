"use client";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import x_btn from "../../../../../public/assets/icons/modal_X_btn.svg";
import styles from "../../../../styles/modal.module.css";

// Modal 컴포넌트에 사용할 props 정의
export interface ModalProps {
  //Modal에 표시될 내용(문자열 또는 ReactNode 가능)
  content: string | ReactNode;
  //Modal의 제목 (선택사항)
  title?: string | ReactNode;
  // 모달 컨테이너(내부)의 스타일
  modalStyle?: CSSProperties;
  //모달 뒷배경(오버레이)의 스타일
  overlayStyle?: CSSProperties;
  //모달 타입1,2 체크용. false(기본값): X버튼, true: 닫기/선택하기 버튼
  showActionButtons: boolean;
  isOpen?: boolean; // Modal이 열려 있는지 여부
  onClose?: () => void; // Modal을 닫을 때 호출되는 함수
}
// 기본 모달 스타일
const defaultModalStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "90%",
  maxWidth: "350px",
  maxHeight: "60%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  borderRadius: "28px",
  padding: "24px 30px",
  zIndex: 9999,
  boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.3)",
};
// 오버레이(배경) 스타일
export const defaultOverlayStyle: CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 100,
  width: "100%",
  height: "100%",
  transition: "opacity 0.5s ease, visibility 0s 0.5s",
};

export default function Modal({
  content,
  isOpen,
  title,
  onClose,
  modalStyle: customModalStyle,
  overlayStyle: customOverlayStyle,
  showActionButtons,
}: ModalProps) {
  // isOpen이 false이면 Modal 표시 안 함
  if (!isOpen) return null;
  return (
    <>
      {/* 오버레이를 클릭하면 onClose 호출 -> Modal 닫힘 */}
      <div
        style={{ ...defaultOverlayStyle, ...customOverlayStyle }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div style={{ ...defaultModalStyle, ...customModalStyle }}>
        {showActionButtons ? (
          <div className={styles.action_btn_wrapper}>
            <button onClick={onClose} className={styles.action_btn}>
              닫기
            </button>
            <button className={styles.action_btn}>선택 완료</button>
          </div>
        ) : (
          <Image
            src={x_btn}
            alt="close"
            onClick={onClose}
            className={styles.X_btn}
          />
        )}
        {title && <h3 className={styles.modal_title}>{title}</h3>}
        <div>{content}</div>
      </div>
    </>
  );
}
