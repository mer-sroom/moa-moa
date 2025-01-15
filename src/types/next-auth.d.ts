import { DefaultSession } from "next-auth/index";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth/index" {
  interface Session {
    user: {
      id: string; // Prisma User 모델에 맞게 string으로 설정
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "USER" | "SUPER_ADMIN"; // 추가한 role 속성
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    nickname?: string; // nickname 속성 추가
    role: "USER" | "SUPER_ADMIN"; // 추가한 role 속성
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id: string;
    accessToken?: string;
    role: "USER" | "SUPER_ADMIN";
  }
}
