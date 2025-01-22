"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"; // next/image 임포트
import styles from "../../../styles/login.module.css";

export default function LoginPage() {
  const { data: session, status } = useSession();

  const handleGoogleLogin = () => signIn("google", { callbackUrl: "/" });
  const handleKakaoLogin = () => signIn("kakao", { callbackUrl: "/" });
  const handleNaverLogin = () => signIn("naver", { callbackUrl: "/" });

  const handleLogout = () => signOut({ callbackUrl: "/auth/login" });

  if (status === "loading") {
    return <p>로딩 중...</p>;
  }

  return (
    <div className={styles.container}>
      {/* 헤더와 바디를 함께 묶는 래퍼 */}
      <div className={styles.headerBodyWrapper}>
        {/* 헤더 */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image
              src="/assets/icons/login-logo.svg"
              alt="MOAMOA Logo"
              width={195}
              height={164}
              style={{ width: "194.73px", height: "164.33px" }}
              priority
            />
          </div>
          <div className={styles.moaTitle}>
            <Image
              src="/assets/icons/Moa-moa.svg"
              alt="moa moa"
              width={253}
              height={35}
            />
          </div>
        </header>

        {/* 바디(로그인 버튼) */}
        <main className={styles.body}>
          <button
            className={`${styles.loginButton} ${styles.google}`}
            onClick={handleGoogleLogin}
          >
            <Image
              src="/assets/icons/google.svg"
              alt="Google Logo"
              width={24}
              height={24}
            />
            <span>구글 연동 로그인</span>
          </button>

          <button
            className={`${styles.loginButton} ${styles.kakao}`}
            onClick={handleKakaoLogin}
          >
            <Image
              src="/assets/icons/kakao.svg"
              alt="Kakao Logo"
              width={24}
              height={24}
            />
            <span>카카오 연동 로그인</span>
          </button>

          <button
            className={`${styles.loginButton} ${styles.naver}`}
            onClick={handleNaverLogin}
          >
            <Image
              src="/assets/icons/naver.svg"
              alt="Naver Logo"
              width={20}
              height={24}
            />
            <span>네이버 연동 로그인</span>
          </button>
        </main>
      </div>

      {/* 푸터 (한 줄 표시) */}
      <footer className={styles.footer}>
        {/* 푸터 로고: 30 x 30 */}
        <Image
          src="/assets/icons/cat.svg"
          alt="푸터 로고"
          width={30}
          height={30}
        />
        <p>moa moa</p>
        <p>Copyright 2025, mer&apos;made, all rights reserved.</p>
      </footer>
    </div>
  );
}
