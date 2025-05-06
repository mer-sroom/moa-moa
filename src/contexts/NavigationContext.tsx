//네비게이션 바, 사이드 바 전용용
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface NavigationContextProps {
  isOpen: boolean; //Sidebar 제어용
  setIsOpen: (open: boolean) => void;
  isLoggedIn: boolean; //로그인 여부(Navigation, Sidebar에서 공통으로 쓰임)
  userName: string; //유저 이름(Sidebar에서 사용)
  userEmail: string; //이메일 정보(Sidebar에서 사용용)
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  //사용자 세션 정보
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const userName = session?.user?.name ?? "게스트";
  const userEmail = session?.user?.email ?? "";

  // Sidebar의 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationContext.Provider
      value={{ isOpen, setIsOpen, isLoggedIn, userName, userEmail }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("전역 불러오는 중 에러 발생!");
  }
  return context;
}
