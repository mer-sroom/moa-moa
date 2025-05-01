"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react"; // 추가함*
import logo from "../../../../../public/assets/icons/nav_sidebar/nav_logo.svg";
import styles from "../../../../styles/LandingNavbar.module.css";

export default function LandingNavbar() {
  const { data: session } = useSession(); // 추가함*
  const isLoggedIn = !!session?.user; // 추가함*

  return (
    <header className={styles.navbar}>
      {/* 로고 영역 */}
      <div>
        <Link href="/">
          <Image
            src={logo}
            alt="moa-logo"
            className={styles.logo_icon}
            width={54}
            height={20}
          />
        </Link>
      </div>

      {/* 메뉴(버튼) 영역 */}
      <nav className={styles.btn_wrapper}>
        <Link href="/start" className={styles.menuBtn}>
          start
        </Link>
        <Link href="/about" className={styles.menuBtn}>
          About
        </Link>

        {isLoggedIn /* 추가함* */ ? (
          <span className={styles.menuBtn}>
            {`환영합니다 ${session.user.name ?? session.user.email} 님`}
          </span>
        ) : (
          <Link href="/auth/login" className={styles.menuBtn}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
