"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  const handleKakaoLogin = () => {
    // 로그인 후, "/"로 이동
    signIn("kakao", { callbackUrl: "/" });
  };

  const handleLogout = () => {
    // 로그아웃 후, 로그인 페이지로 리다이렉트
    signOut({ callbackUrl: "/auth/login" });
  };

  if (status === "loading") {
    return <p>로딩 중...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>로그인 페이지</h1>
      {!session ? (
        <button onClick={handleKakaoLogin}>카카오로 로그인</button>
      ) : (
        <div style={{ marginTop: 10 }}>
          <p>안녕하세요, {session.user?.name || session.user?.email}님!</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      )}
    </div>
  );
}
