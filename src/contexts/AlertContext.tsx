"use client";
import React, { ReactNode, createContext, useContext } from "react";
import Swal from "sweetalert2";
import "@/styles/Alert.css";

//사용 예제
//showConfirmModal({icon: "경고", message: "삭제한 편지는 복구할 수 없습니다.",confirmMessage: "편지를 삭제하시겠습니까?".. })

//AlertContext에서 제공할 값들
export interface AlertContextValue {
  showAlert: (
    message: string,
    type?: "성공" | "정보" | "경고" | "오류"
  ) => void;
  showConfirmModal: (options: {
    message: string;
    icon: string;
    confirmMessage?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

// AlertProvider는 children을 ReactNode로 받음
export interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({
  children,
}: AlertProviderProps): JSX.Element => {
  const typeToIconMap = {
    성공: "success",
    정보: "info",
    경고: "warning",
    오류: "error",
  } as const;

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

  const showConfirmModal = (options: {
    message: string;
    icon: string;
    confirmMessage?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    Swal.fire({
      title: options.confirmMessage || "진행하시겠습니까?",
      text: options.message,
      icon: typeToIconMap[options.icon],
      showCancelButton: true,
      confirmButtonColor: "var(--color-black)",
      cancelButtonColor: "#aeaeae",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "완료되었습니다!",
          text: options.message,
          icon: typeToIconMap["성공"],
        });
        if (options.onConfirm) options.onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "취소",
          text: "요청하신 작업이 취소되었습니다.",
          icon: typeToIconMap["정보"],
        });
        if (options.onCancel) options.onCancel();
      }
    });
  };
  const value: AlertContextValue = { showAlert, showConfirmModal };
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
export function useAlertContext() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("Alert 전역 불러오는 중 문제 발생!");
  }
  return context;
}
