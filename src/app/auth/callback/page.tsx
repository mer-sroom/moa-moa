"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/"); // 로그인 성공 후 이동할 경로
  }, [router]);

  return <div>로그인 처리 중입니다...</div>;
}
