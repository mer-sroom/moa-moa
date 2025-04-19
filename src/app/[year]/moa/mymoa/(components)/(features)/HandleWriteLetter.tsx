"use client";
import React, { PropsWithChildren, ReactElement } from "react";
import { useRouter } from "next/navigation";
import { useAlertContext } from "@/contexts/AlertContext";

interface Props extends PropsWithChildren {
  children: ReactElement;
  allowAnonymous: boolean;
  isAuthenticated: boolean;
}

export default function HandleCreateLetter(props: Props) {
  const { children, allowAnonymous, isAuthenticated } = props;
  const router = useRouter();
  const { showConfirmModal } = useAlertContext();

  const clickHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // 친구 요청한 사람이 로그인 되어있지 않다면
    if (!allowAnonymous && !isAuthenticated) {
      showConfirmModal({
        icon: "정보",
        confirmMessage: "로그인이 필요합니다",
        message: "로그인 페이지로 이동하시겠습니까?",
        skipFollowUpAlert: true,
        onConfirm: () => {
          router.push("/auth/login");
        },
      });
      return;
    }
    router.push("/2025/create-letter");
  };

  //자식 컴포넌트에 onClick 핸들러 부착
  const childWithHandler = React.cloneElement(children, {
    onClick: clickHandler,
  });

  return childWithHandler;
}
