import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import KakaoProvider from "next-auth/providers/kakao";
import SpotifyProvider from "next-auth/providers/spotify";
import NextAuth from "next-auth/index";
import { NextAuthOptions } from "next-auth/index";

import GoogleProvider from "next-auth/providers/google";
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

interface NaverProfile {
  response: {
    id: string;
    email?: string;
    nickname?: string;
    profile_image?: string;
  };
}

function NaverProvider<P extends Record<string, any> = NaverProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "naver",
    name: "Naver",
    type: "oauth",
    authorization:
      "https://nid.naver.com/oauth2.0/authorize?response_type=code",
    token: "https://nid.naver.com/oauth2.0/token",
    userinfo: "https://openapi.naver.com/v1/nid/me",
    profile(profile) {
      return {
        id: profile.response.id,
        name: profile.response.nickname,
        email: profile.response.email,
        image: profile.response.profile_image, // 여기서는 그대로 'image'로 받음
        role: "USER",
      };
    },
    clientId: options.clientId,
    clientSecret: options.clientSecret,
  };
}
/* -------------------------------------------------------------- */

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      authorization: {
        params: {
          // scope 추가
          scope: "account_email profile_nickname profile_image",
        },
      },
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private",
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if ((user as any).image) {
        (user as any).profileImage = (user as any).image;
        // delete (user as any).image; // session.user.image가 undefined?
      }

      if (!user.role) {
        user.role = "USER";
      }

      if (!user.nickname) {
        user.nickname = user.name || "Guest";
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.profileImage as string; // profileImage 추가
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // role 추가
        token.profileImage = (user as any).profileImage || (user as any).image;
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
