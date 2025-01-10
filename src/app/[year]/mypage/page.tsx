"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function MyPage() {
  const { data: session, status } = useSession();
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSpotify() {
      if (session?.user?.id) {
        try {
          const res = await fetch(
            `/api/check-spotify?userId=${session.user.id}`
          );
          const data = await res.json();
          setSpotifyConnected(data.connected);
        } catch (error) {
          console.error("Error checking Spotify connection:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    checkSpotify();
  }, [session]);

  const handleConnectSpotify = () => {
    // Spotify OAuth 로그인 프로세스 시작
    signIn("spotify", { callbackUrl: "/2025/mypage" });
  };

  const handleLogout = () => {
    // 로그아웃 후, 로그인 페이지로 리다이렉트
    signOut({ callbackUrl: "/auth/login" });
  };

  if (status === "loading" || loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>마이페이지</h1>
      <p>
        스포티파이 연결 상태: {spotifyConnected ? "연결됨" : "연결되지 않음"}
      </p>
      {!spotifyConnected && (
        <button onClick={handleConnectSpotify}>스포티파이 연결하기</button>
      )}
      {spotifyConnected && <button onClick={handleLogout}>로그아웃</button>}
      {/* 추가적인 마이페이지 내용 */}
    </div>
  );
}
