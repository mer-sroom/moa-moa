declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
  interface Window {
    Kakao: any; // 이 파일 아직 안쓰니까 다 지우고 다른것들로 채우셔도 됨니당
  }
}

declare module "*.css";
