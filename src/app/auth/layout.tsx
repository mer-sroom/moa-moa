import { ReactNode } from "react";

export const metadata = {
  title: "Auth - Moa Moa",
  description: "Social Login with Kakao",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
