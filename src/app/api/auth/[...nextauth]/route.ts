import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

const authOptions /* : any */ = {
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: "",
    }),
  ],
  callbacks: {
    /**
     * 이 콜백은, NextAuth가 새 유저를 생성하거나 로그인할 때,
     */
    async signIn({ user, account, profile }) {
      // user.name에 "준기" 등 카카오 프로필 닉네임이 들어왔다고 가정
      // nickname이 없을 경우, user.nickname = user.name 로 복사
      if (!user.nickname) {
        user.nickname = user.name || "Guest";
      }

      return true; // 로그인을 계속 진행
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
