import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import KakaoProvider from "next-auth/providers/kakao";
import SpotifyProvider from "next-auth/providers/spotify";
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
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // TypeScript가 'id'를 인식
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
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
  debug: true, // 개발 중에만 활성화
};
