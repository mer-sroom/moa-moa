"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import logo from "../../../../../public/assets/icons/nav_sidebar/nav_logo.svg";
import notifiIcon from "../../../../../public/assets/icons/nav_sidebar/nav_notification_icon.svg";
import styles from "../../../../styles/navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = true; //나중에 로그인 정보 받아오는 용도도
  return (
    <>
      <div className={styles.navbar}>
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
          <div
            id={styles.hamburger_icon}
            className={isOpen ? styles.open : ""}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <Sidebar
          isLoggedIn={isLoggedIn}
          userName="TestUser"
          loginInfo="카카오 로그인"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}
