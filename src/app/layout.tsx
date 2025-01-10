import "./globals.css";
import { ReactNode } from "react";
import ClientProvider from "@/components/ClientProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
