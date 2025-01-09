import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import KakaoProvider from "next-auth/providers/kakao";

// 만약 타입 오류가 난다면, as any로 우회
export const authOptions /* : any */ = {
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // NextAuth는 user.name / user.email 등으로 기본 정보를 전달
      // 만약 user.name에 값이 있으면, nickname 필드로도 세팅
      if (!user.nickname) {
        user.nickname = user.name || "Guest";
      }
      return true;
    },
  },
};
