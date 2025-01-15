import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "../../auth/authoptions"; // 상대 경로 수정
import prisma from "@/lib/prisma"; // 절대 경로 사용
import { refreshAccessToken } from "@/lib/spotify"; // 절대 경로 사용
import { Session } from "next-auth"; // Session 타입 임포트

export async function GET(request: Request) {
  // Session 타입 단언
  const session = (await getServerSession(authOptions)) as Session | null;

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  // 사용자의 Spotify 계정 정보 가져오기
  let account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: "spotify",
    },
  });

  if (!account || !account.access_token) {
    return NextResponse.json(
      { error: "Spotify 계정이 연결되지 않았습니다." },
      { status: 401 }
    );
  }

  // access_token 만료 여부 확인
  const currentTime = Math.floor(Date.now() / 1000);
  if (account.expires_at && account.expires_at < currentTime) {
    try {
      const newAccessToken = await refreshAccessToken(session.user.id, account);
      account = await prisma.account.findFirst({
        where: { id: account.id },
      });
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return NextResponse.json({ error: "토큰 갱신 실패." }, { status: 500 });
    }
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "검색어가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Spotify API 요청 실패." },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data.tracks.items);
  } catch (error) {
    console.error("Spotify Search Error:", error);
    return NextResponse.json(
      { error: "Spotify 검색 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
