import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}

declare module "next-auth/providers/kakao" {
  export interface KakaoProfile {
    id: number;
    connected_at: string;
    properties?: {
      nickname?: string;
      profile_image?: string;
      thumbnail_image?: string;
    };
    kakao_account?: {
      profile_needs_agreement?: boolean;
      profile?: {
        nickname?: string;
        thumbnail_image_url?: string;
        profile_image_url?: string;
      };
      email?: string;
    };
  }

  export default function KakaoProvider<P extends KakaoProfile>(
    options: OAuthUserConfig<P>
  ): OAuthConfig<P>;
}
