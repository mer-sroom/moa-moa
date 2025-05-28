import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import ClientProvider from "@/components/ClientProvider";
import KakaoScript from "@/lib/KakaoScript";

const pretendard = localFont({
  src: [
    {
      path: "../fonts/PretendardVariable.woff2",
      weight: "45 920",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
      <KakaoScript />
    </html>
  );
}
