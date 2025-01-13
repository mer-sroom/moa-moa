import { DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";

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
  np;
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    nickname?: string; // nickname 속성 추가
    role: "USER" | "SUPER_ADMIN"; // 추가한 role 속성
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    identifier: string;
    name: string;
    role: "USER" | "SUPER_ADMIN";
  }
}
