import "./globals.css";
import { ReactNode } from "react";
import ClientProvider from "@/components/ClientProvider";
import KakaoScript from "@/lib/KakaoScript";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
      <KakaoScript />
    </html>
  );
}
