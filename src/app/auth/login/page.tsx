"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleKakaoLogin = () => {
    signIn("kakao", { callbackUrl: "/" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>로그인 페이지</h1>
      <button onClick={handleKakaoLogin}>카카오로 로그인</button>
    </div>
  );
}
