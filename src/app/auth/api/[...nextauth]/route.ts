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
  pages: {
    signIn: "/auth/login", // 커스텀 로그인 페이지
    error: "/auth/error", // 에러 페이지
  },
};

const handler = NextAuth(authOptions as any);
// App Router → export GET, POST
export { handler as GET, handler as POST };
