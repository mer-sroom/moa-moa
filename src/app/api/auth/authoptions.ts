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
        image: profile.response.profile_image?.replace("http://", "https://"), // 수정함★
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
      profile(profile) {
        const img = profile.properties?.profile_image?.replace(
          "http://",
          "https://"
        ); // 수정함★
        return {
          id: String(profile.id),
          name: profile.properties?.nickname,
          email: profile.kakao_account?.email,
          image: img,
          role: "USER",
        };
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
    async signIn({ user }) {
      /* image 없으면 profileImage를 대체로 사용 */
      if (!(user as any).image && (user as any).profileImage) {
        (user as any).image = (user as any).profileImage; // 수정함★
      }

      /* http → https 강제 */
      if ((user as any).image?.startsWith("http://")) {
        (user as any).image = (user as any).image.replace(
          "http://",
          "https://"
        ); // 수정함★
      }

      delete (user as any).profileImage; // 유지

      if (!user.role) user.role = "USER";
      if (!(user as any).nickname)
        (user as any).nickname = user.name || "Guest";

      return true;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.image as string | null;
      }
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = (user as any).image ?? null;
      }
      if (account) token.accessToken = account.access_token;
      return token;
    },
  },
  events: {
    async signIn({ user, account }) {
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
