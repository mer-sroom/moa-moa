"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);

  // (1) 세션 로딩 중 표시
  if (status === "loading") {
    return <p>로딩 중...</p>;
  }

  // (2) 로그인 안 된 경우
  if (!session) {
    return <p>로그인 필요</p>;
  }

  // (3) DB에서 "provider=spotify" 레코드가 있는지 확인
  // -> 실제로는 API fetch or SWR 등을 사용
  //    아래는 예시로 간단히 fetch (클라이언트 component)
  useEffect(() => {
    async function checkSpotify() {
      const res = await fetch("/api/check-spotify");
      const data = await res.json();
      setIsSpotifyConnected(data.connected); // { connected: true/false }
    }
    checkSpotify();
  }, []);

  // 스포티파이 연결 버튼
  const connectSpotify = () => {
    signIn("spotify", { callbackUrl: "/[year]/mypage" });
  };

  return (
    <div>
      <h1>마이페이지</h1>
      <p>카카오 로그인 상태: {session.user?.name || session.user?.nickname}</p>

      {isSpotifyConnected ? (
        <p>스포티파이 연결됨</p>
      ) : (
        <button onClick={connectSpotify}>스포티파이 계정 연결하기</button>
      )}
    </div>
  );
}
