//모달 오픈 전용 컴포넌트
"use client";
import React, { ReactElement } from "react";
import { useModalContext } from "@/contexts/ModalContext";

interface OpenShareLinkModalProps {
  children: ReactElement;
}

export default function OpenShareLinkModal({
  children,
}: OpenShareLinkModalProps) {
  const { openModal } = useModalContext();

  const clickHandler = (e: React.MouseEvent) => {
    e.stopPropagation(); //모달에 이벤트 버블 방지
    openModal({
      title: "테스트",
      content: "테스트", // 필요에 따라 동적으로 변경 가능
      showActionButtons: false,
    });
  };

  //자식 컴포넌트에 onClick 핸들러 부착(아니면 버튼, 모달 사이 이벤트 버블 생김)
  const childWithHandler = React.cloneElement(children, {
    onClick: clickHandler,
  });

  return childWithHandler;
}
