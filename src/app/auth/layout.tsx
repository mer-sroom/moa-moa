import { ReactNode } from "react";

export const metadata = {
  title: "Auth - Moa Moa",
  description: "Social Login with Kakao",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>{/* 필요한 메타데이터 추가 */}</head>
      <body>{children}</body>
    </html>
  );
}
