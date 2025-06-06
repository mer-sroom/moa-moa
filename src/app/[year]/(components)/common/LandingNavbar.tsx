"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import logo from "../../../../../public/assets/icons/nav_sidebar/nav_logo.svg";
import styles from "../../../../styles/LandingNavbar.module.css";

export default function LandingNavbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const currentYear = format(new Date(), "yyyy");

  return (
    <header className={styles.navbar}>
      {/* 로고 */}
      <Link href="/">
        <Image
          src={logo}
          alt="moa-logo"
          className={styles.logo_icon}
          width={54}
          height={20}
        />
      </Link>

      {/* 메뉴 */}
      <nav className={styles.btn_wrapper}>
        {/* start ➜ /2025/moa/select-moa (올해 자동) */}
        <Link
          href={`/${currentYear}/moa/select-moa`}
          className={styles.menuBtn}
        >
          start
        </Link>

        <Link href="/about" className={styles.menuBtn}>
          About
        </Link>

        {isLoggedIn ? (
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
