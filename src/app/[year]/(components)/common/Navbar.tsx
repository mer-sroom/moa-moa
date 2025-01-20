"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import logo from "../../../../../public/nav_logo.svg";
import notifiIcon from "../../../../../public/nav_notification_icon.svg";
import styles from "../../../../styles/navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.navbar}>
        <Image src={logo} alt={"logo"}></Image>
        <div className={styles.btn_wrapper}>
          <Image
            src={notifiIcon}
            alt={"notification_icon"}
            className={styles.notification_icon}
          ></Image>
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
          userName="TestUser"
          loginInfo="카카오 로그인"
          isOpen={isOpen}
        />
      </div>
    </>
  );
}
