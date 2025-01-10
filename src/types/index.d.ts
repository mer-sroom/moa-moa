declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
  interface Window {
    Kakao: any; // Kakao 객체의 타입을 정의
  }
}

declare module "*.css";
