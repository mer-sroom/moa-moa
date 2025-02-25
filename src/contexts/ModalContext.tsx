//모달 전용
"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import Modal, { ModalProps } from "@/app/[year]/(components)/common/Modal";

interface ModalContextType {
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    options: ModalProps;
  }>({
    isOpen: false, //초깃값
    options: {
      content: "",
      showActionButtons: false,
    },
  });

  //로직 여러번 사용, 변경 가능성은 낮으므로 메모이제이션
  //모달 여는 함수
  const openModal = useCallback((options: ModalProps) => {
    setModalState({
      isOpen: true,
      options,
    });
  }, []);

  //모달 닫는 함수, isOpen만 업데이트
  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        {...modalState.options}
        isOpen={modalState.isOpen}
        onClose={closeModal}
      />
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("모달 전역 불러오는 중 에러 발생!");
  }
  return context;
}
