"use client";
import React, { PropsWithChildren, ReactElement } from "react";
import { AlertProvider } from "@/app/[year]/(components)/common/Alert";

interface Props extends PropsWithChildren {
  children: ReactElement;
  letterId: number;
}

export default function HandleDeleteLetter({ children, letterId }: Props) {
  return (
    <AlertProvider>
      {({ showAlert, showConfirmModal }) => {
        const clickHandler = async (e: React.MouseEvent) => {
          e.stopPropagation();
          showConfirmModal({
            message: "삭제한 편지는 복구할 수 없습니다.",
            confirmMessage: "편지를 삭제하시겠습니까?",
            onConfirm: async () => {
              try {
                const res = await fetch(`/api/letter/${letterId}`, {
                  method: "DELETE",
                });
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
      }}
    </AlertProvider>
  );
}
