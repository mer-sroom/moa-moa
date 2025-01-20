import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import KakaoProvider from "next-auth/providers/kakao";
import SpotifyProvider from "next-auth/providers/spotify";
import NextAuth from "next-auth/index";
import { NextAuthOptions } from "next-auth/index";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.nickname) {
        user.nickname = user.name || "Guest";
      }
      return true;
    },
    async session({ session, token }) {
      // 'user' 대신 'token' 사용
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // role 추가
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      if (!user.email) return;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser && existingUser.id !== user.id) {
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
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET, // secret 추가
  session: {
    strategy: "jwt", // JWT 전략 사용
  },
  debug: true, // 개발 중에만 활성화
};

export default NextAuth(authOptions);
