"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import styles from "../../../styles/login.module.css";

export default function LoginPage() {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  const initializeKakao = () => {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        if (!kakaoKey) {
          console.error("Kakao JavaScript Key is not provided!");
          return;
        }
        window.Kakao.init(kakaoKey);
        setIsKakaoInitialized(true);
        console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
      }
    }
  };

  const handleKakaoLogin = () => {
    console.log("Redirect URI:", process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI);

    if (typeof window !== "undefined" && window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.authorize({
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      });
    } else {
      console.error("Kakao SDK is not initialized.");
    }
  };

  return (
    <div className={styles.container}>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
        integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={initializeKakao}
      />
      <h1 className={styles.title}>로그인</h1>
      <p className={styles.description}>카카오로 간편하게 로그인하세요.</p>
      <button className={styles.kakaoButton} onClick={handleKakaoLogin}>
        카카오로 로그인
      </button>
    </div>
  );
}
