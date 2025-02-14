import { useSession } from "next-auth/react";
import BackgroundLayout from "./(components)/common/BackgroundLayout";
import "../../styles/globals.css";
import Navbar from "./(components)/common/Navbar";
import Sidebar from "./(components)/common/Sidebar";
//전역 관리
import { NavigationProvider } from "@/contexts/NavigationContext";

export default function YearSeasonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundLayout>
        <NavigationProvider>
          <Navbar />
          <Sidebar />
          {children}
        </NavigationProvider>
      </BackgroundLayout>
    </>
  );
}
