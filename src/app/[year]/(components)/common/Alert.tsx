"use client";

import React, { ReactNode } from "react";
import Swal from "sweetalert2";

// 👉 사용예제
// <AlertProvider> {({ showAlert, showConfirmModal }) => ( 이곳에 아래 버튼을 넣어주세요 )} </AlertProvider>
// <button onClick={() => showAlert("메세지 입력", "아이콘 타입(ex.성공, 정보, 경고, 오류)")}> ✅ </button>
// <button onClick={() => showConfirmModal({ message: "삭제", confirmMessage: "삭제 확인",})}> ❓ </button>

export interface AlertRenderProps {
  children: (props: {
    showAlert: (
      message: string,
      type?: "성공" | "정보" | "경고" | "오류"
    ) => void;
    showConfirmModal: (options: {
      message: string;
      confirmMessage?: string;
      onConfirm?: () => void;
      onCancel?: () => void;
    }) => void;
  }) => ReactNode;
}

export const AlertProvider = ({ children }: AlertRenderProps): JSX.Element => {
  const typeToIconMap: {
    [key in "성공" | "정보" | "경고" | "오류"]:
      | "success"
      | "info"
      | "warning"
      | "error";
  } = {
    성공: "success",
    정보: "info",
    경고: "warning",
    오류: "error",
  };

  const showAlert = (
    message: string,
    type: "성공" | "정보" | "경고" | "오류" = "정보"
  ) => {
    Swal.fire({
      title: type,
      html: message,
      icon: typeToIconMap[type],
      backdrop: "rgba(0,0,0,0.3)",
      showConfirmButton: true,
    });
  };

  const showConfirmModal = ({
    message,
    confirmMessage = "진행하시겠습니까?",
    onConfirm,
    onCancel,
  }: {
    message: string;
    confirmMessage?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    Swal.fire({
      title: confirmMessage,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#1b1b1b",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "완료되었습니다!",
          text: message,
          icon: typeToIconMap["성공"],
        });
        if (onConfirm) onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "취소",
          text: "요청하신 작업이 취소되었습니다.",
          icon: typeToIconMap["정보"],
        });
        if (onCancel) onCancel();
      }
    });
  };

  return <>{children({ showAlert, showConfirmModal })}</>;
};
