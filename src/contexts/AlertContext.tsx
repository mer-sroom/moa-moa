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
    type?: "성공" | "정보" | "경고" | "질문" | "오류"
  ) => void;
  showConfirmModal: (options: {
    message?: string;
    icon: "성공" | "정보" | "경고" | "질문" | "오류";
    confirmMessage?: string;
    skipFollowUpAlert?: boolean; //showConfirmModal 후속 알림 표시할 지
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
    질문: "question",
    오류: "error",
  } as const;

  //후속 알림 모듈화
  const showFollowUpAlert = (title: string, skip?: boolean, text?: string) => {
    if (!skip) {
      Swal.fire({
        title: title,
        text: text,
        icon: title === "취소" ? typeToIconMap["정보"] : typeToIconMap["성공"],
        confirmButtonText: "확인",
        backdrop: "rgba(0,0,0,0.3)",
        buttonsStyling: false, //버튼 기본 스타일 제거
        customClass: {
          popup: "swal-popup",
          icon: "swal-icon",
          title: "swal-title",
          htmlContainer: "swal-text",
          confirmButton: "custom-button confirm",
          actions: "swal-actions-one",
        },
      });
    }
  };

  const showAlert = (
    message: string,
    type: "성공" | "정보" | "경고" | "질문" | "오류" = "정보"
  ) => {
    Swal.fire({
      title: type,
      text: message,
      icon: typeToIconMap[type],
      backdrop: "rgba(0,0,0,0.3)",
      showConfirmButton: true,
      confirmButtonText: "확인",
      buttonsStyling: false, // 기본 스타일 제거
      customClass: {
        popup: "swal-popup",
        icon: "swal-icon",
        title: "swal-title",
        htmlContainer: "swal-text",
        confirmButton: "custom-button confirm",
        actions: "swal-actions-one",
      },
    });
  };

  const showConfirmModal = (options: {
    message?: string;
    icon: string;
    confirmMessage?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    skipFollowUpAlert?: boolean;
  }) => {
    Swal.fire({
      title: options.confirmMessage,
      text: options.message,
      icon: typeToIconMap[options.icon],
      showCancelButton: true,
      // confirmButtonColor: "var(--color-gray-500)",
      cancelButtonColor: "transparent",
      backdrop: "rgba(0,0,0,0.3)",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
      customClass: {
        popup: "swal-popup",
        icon: "swal-icon",
        title: "swal-title",
        htmlContainer: "swal-text",
        actions: "swal-actions",
        confirmButton: "custom-button confirm",
        cancelButton: "custom-button cancel",
      },
    }).then(result => {
      if (result.isConfirmed) {
        showFollowUpAlert(
          "성공적으로 완료되었습니다!",
          options.skipFollowUpAlert
        );
        if (options.onConfirm) options.onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        showFollowUpAlert(
          "취소",
          options.skipFollowUpAlert,
          "요청하신 작업이 취소되었습니다."
        );
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
