// src/app/auth/api/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/lib/prisma";
import KakaoProvider from "@/lib/next-auth/kakao-provider"; // (예시) 커스텀 KakaoProvider

// (1) NextAuthOptions 정의
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(/* prisma */),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // 예: Kakao Provider 직접 구현 or 다른 소셜
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    // ...추가 소셜 로그인 등
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        // etc...
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

// (2) NextAuth를 Handler로 감싸서 export
const handler = NextAuth(authOptions);

// (3) app router에 맞춰서 GET, POST 핸들러 export
export { handler as GET, handler as POST };
