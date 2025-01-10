import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import KakaoProvider from "next-auth/providers/kakao";
import SpotifyProvider from "next-auth/providers/spotify";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // 표준 Prisma Adapter 사용
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!, // 카카오 시크릿 키 입력
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      // 필요 시 scope 추가
      // authorization: "https://accounts.spotify.com/authorize?scope=user-read-email+user-read-private",
    }),
    // 다른 Provider 추가 가능
  ],
  callbacks: {
    /**
     * signIn 콜백 - 로그인 시 nickname 필드 보정
     */
    async signIn({ user, account, profile }) {
      // user.nickname이 없으면 user.name 또는 "Guest"로 설정
      if (!user.nickname) {
        user.nickname = user.name || "Guest";
      }
      return true;
    },
    /**
     * session 콜백 - 세션에 추가 정보 포함 (선택 사항)
     */
    async session({ session, user }) {
      // 세션에 사용자 ID 추가
      if (session.user) {
        (session.user as any).id = user.id;
      }
      return session;
    },
  },
  events: {
    /**
     * signIn 이벤트 - 동일 이메일을 가진 기존 사용자에게 새 계정 연결
     */
    async signIn({ user, account, profile }) {
      if (!user.email) {
        // 이메일이 없으면 추가 조치 없이 종료
        return;
      }

      // 동일 이메일을 가진 기존 사용자 찾기
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser && existingUser.id !== user.id) {
        // 기존 사용자가 있고, 현재 로그인 시도하는 사용자가 아니면 계정 연결
        await prisma.account.update({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          data: { userId: existingUser.id },
        });
      }
    },
  },
  pages: {
    signIn: "/auth/login", // 커스텀 로그인 페이지 경로
    error: "/auth/error", // 커스텀 에러 페이지 경로
  },
  debug: true, // 디버그 모드 활성화 (개발 중에만 사용)
};
