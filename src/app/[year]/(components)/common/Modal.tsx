"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Modal 컴포넌트에 사용할 props 정의
 */
export interface ModalProps {
  /**
   * Modal에 표시될 내용(문자열 또는 ReactNode 가능)
   */
  content: string | ReactNode;
  /**
   * Modal이 열려 있는지 여부
   */
  isOpen: boolean;
  /**
   * Modal의 제목 (선택사항)
   */
  title?: string;
  /**
   * Modal을 닫을 때 호출되는 함수
   */
  onClose: () => void;
  /**
   * 모달 컨테이너(내부)의 스타일
   */
  modalStyle?: CSSProperties;
  /**
   * 모달 뒷배경(오버레이)의 스타일
   */
  overlayStyle?: CSSProperties;
}

export default function Modal({
  content,
  isOpen,
  title,
  onClose,
  modalStyle: customModalStyle,
  overlayStyle: customOverlayStyle,
}: ModalProps) {
  // isOpen이 false이면 Modal 표시 안 함
  if (!isOpen) return null;

  // 기본 모달 스타일
  const defaultModalStyle: CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "16px",
    zIndex: 9999,
  };

  // 오버레이(배경) 스타일
  const defaultOverlayStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 9998,
  };

  return (
    <>
      {/* 오버레이를 클릭하면 onClose 호출 -> Modal 닫힘 */}
      <div
        style={{ ...defaultOverlayStyle, ...customOverlayStyle }}
        onClick={onClose}
      />
      <div style={{ ...defaultModalStyle, ...customModalStyle }}>
        {title && <h2>{title}</h2>}
        <div>{content}</div>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </>
  );
}
