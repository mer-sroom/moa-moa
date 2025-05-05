import BackgroundLayout from "./(components)/common/BackgroundLayout";
import "../../styles/globals.css";
import Navbar from "./(components)/common/Navbar";
import Sidebar from "./(components)/common/Sidebar";
//전역 관리
import { NavigationProvider } from "@/contexts/NavigationContext";
import ModalProvider from "@/contexts/ModalContext";
import { AlertProvider } from "@/contexts/AlertContext";
import { LetterCacheProvider } from "@/contexts/LetterCacheContext";
import LetterModalProvider from "@/contexts/LetterModalContext";

export default function YearSeasonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundLayout>
        <AlertProvider>
          {/* 앱웹뷰 범위 내에서 작동하도록 현재 위치에 modal provider배치 */}
          <ModalProvider>
            <NavigationProvider>
              <LetterCacheProvider>
                <LetterModalProvider>
                  <Navbar />
                  <Sidebar />
                  {children}
                </LetterModalProvider>
              </LetterCacheProvider>
            </NavigationProvider>
          </ModalProvider>
        </AlertProvider>
      </BackgroundLayout>
    </>
  );
}
