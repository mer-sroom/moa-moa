"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return <p>로그인 필요</p>;
  }

  // Account 테이블에서 provider='spotify' 레코드가 있는지
  const isSpotifyConnected = false; // 실제로는 useSWR 등으로 DB확인 or session.user?

  const connectSpotify = () => {
    signIn("spotify", { callbackUrl: "/mypage" });
  };

  return (
    <div>
      <h1>마이페이지</h1>
      <p>카카오 로그인 상태: {session.user?.name}</p>
      {isSpotifyConnected ? (
        <p>스포티파이 연결됨</p>
      ) : (
        <button onClick={connectSpotify}>스포티파이 계정 연결하기</button>
      )}
    </div>
  );
}
