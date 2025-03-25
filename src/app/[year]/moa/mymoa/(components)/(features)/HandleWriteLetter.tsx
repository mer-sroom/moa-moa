"use client";
import React, { PropsWithChildren, ReactElement } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Props extends PropsWithChildren {
  children: ReactElement;
  allowAnonymous: boolean;
  isAuthenticated: boolean;
}

export default function HandleCreateLetter(props: Props) {
  const { children, allowAnonymous, isAuthenticated } = props;
  const router = useRouter();
  const clickHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // 친구 요청한 사람이 로그인 되어있지 않다면
    if (!allowAnonymous && !isAuthenticated) {
      const result = await Swal.fire({
        icon: "warning",
        text: "로그인이 필요합니다. 로그인하시겠습니까?",
        showCancelButton: true,
        confirmButtonColor: "#ff8473",
        cancelButtonColor: "#aeaeae",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      });
      if (result.isConfirmed) {
        router.push("/auth/login");
        return;
      }
      if (result.isDismissed) {
        return;
      }
    }
    router.push("/2025/create-letter");
  };

  //자식 컴포넌트에 onClick 핸들러 부착
  const childWithHandler = React.cloneElement(children, {
    onClick: clickHandler,
  });

  return childWithHandler;
}
