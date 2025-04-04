"use client";
import React, { PropsWithChildren, ReactElement } from "react";
import { useAlertContext } from "@/contexts/AlertContext";
import { useRouter } from "next/navigation";
import { useLetterModalContext } from "@/contexts/LetterModalContext";

interface Props extends PropsWithChildren {
  children: ReactElement;
  letterId: number;
}

export default function HandleDeleteLetter({ children, letterId }: Props) {
  const { showAlert, showConfirmModal } = useAlertContext();
  const { closeLetterModal } = useLetterModalContext();
  const router = useRouter();

  const clickHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    showConfirmModal({
      icon: "경고",
      message: "삭제한 편지는 복구할 수 없습니다.",
      confirmMessage: "편지를 삭제하시겠습니까?",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/letter/${letterId}`, {
            method: "DELETE",
          });
          router.refresh();
          closeLetterModal(); //편지 모달 닫기
        } catch (error) {
          console.error("편지 삭제 중 문제 발생", error);
          showAlert("삭제 중 오류가 발생했습니다.", "오류");
        }
      },
      onCancel: () => {
        showAlert("삭제가 취소되었습니다.", "정보");
      },
    });
  };

  const childWithHandler = React.cloneElement(children, {
    onClick: clickHandler,
  });
  return childWithHandler;
}
