"use client";
import { useNavigationContext } from "@/contexts/NavigationContext";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../../public/assets/icons/nav_sidebar/nav_logo.svg";
import notifiIcon from "../../../../../public/assets/icons/nav_sidebar/nav_notification_icon.svg";
import styles from "../../../../styles/navbar.module.css";

export default function Navbar() {
  const { isLoggedIn, isOpen, setIsOpen } = useNavigationContext();
  return (
    <>
      <nav className={styles.navbar}>
        <Link href={"/"}>
          <Image
            src={logo}
            alt={"logo"}
            className={styles.logo_icon}
            width={54}
            height={20}
          />
        </Link>
        <div className={styles.btn_wrapper}>
          {isLoggedIn ? (
            <Link href={"/2025/notification"}>
              <Image
                src={notifiIcon}
                alt={"notification_icon"}
                className={styles.notification_icon}
                width={18}
                height={20}
              />
            </Link>
          ) : (
            <div
              onClick={() => alert("로그인 후 사용 가능합니다?")}
              className={styles.notification_icon}
            >
              <Image
                src={notifiIcon}
                alt={"notification_icon"}
                className={styles.notification_icon}
                width={18}
                height={20}
              />
            </div>
          )}
          <button
            id={styles.hamburger_icon}
            className={isOpen ? styles.open : ""}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </>
  );
}
