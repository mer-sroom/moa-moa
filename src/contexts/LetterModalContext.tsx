"use client";
import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import type { Letter } from "@/types/moabox";
import LetterModal from "@/app/[year]/moa/mymoa/(components)/(ui)/LetterModal";

interface LetterModalContextType {
  //자식에게 제공할 값
  openLetterModal: (letter: Letter) => void; //여는 함수
  closeLetterModal: () => void; //닫는 함수
}

//초가값(provider가 없을 시 에러)
const LetterModalContext = createContext<LetterModalContextType | undefined>(
  undefined
);

export default function LetterModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    content?: Letter; //모달에 전달할 내용
  }>({
    isOpen: false,
  });

  //모달 열면서 state에 현재 값을 넘겨주는 함수
  const openLetterModal = useCallback((letter: Letter) => {
    setModalState({ isOpen: true, content: letter });
  }, []);
  //닫는 함수(isOpen만 업데이트)
  const closeLetterModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <LetterModalContext.Provider value={{ openLetterModal, closeLetterModal }}>
      {children}
      {modalState.content && (
        <LetterModal
          isOpen={modalState.isOpen}
          letter={modalState.content}
          onClose={closeLetterModal}
        />
      )}
    </LetterModalContext.Provider>
  );
}

export function useLetterModalContext() {
  const context = useContext(LetterModalContext);
  if (!context) {
    throw new Error("모달 전역 불러오는 중 에러 발생!");
  }
  return context;
}
