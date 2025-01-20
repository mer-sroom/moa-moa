"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "알 수 없는 오류가 발생했습니다.";
  let showLinkButton = false;

  if (error === "OAuthAccountNotLinked") {
    errorMessage =
      "이미 다른 소셜 계정으로 가입된 이메일입니다. 계정을 연결하시겠습니까?";
    showLinkButton = true;
  }

  const handleLinkAccount = () => {
    // 사용자가 계정 연결을 원할 경우, 동일 이메일로 로그인 시도
    signIn("kakao", { callbackUrl: "/auth/link-account" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>로그인 오류</h1>
      <p>{errorMessage}</p>
      {showLinkButton && (
        <button onClick={handleLinkAccount}>계정 연결하기</button>
      )}
      <Link href="/auth/login">로그인 페이지로 돌아가기</Link>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <ErrorContent />
    </Suspense>
  );
}
