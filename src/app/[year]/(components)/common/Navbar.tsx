"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../../../public/nav_logo.svg";
import notifiIcon from "../../../../../public/nav_notification_icon.svg";
import styles from "../../../../styles/navbar.module.css";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        //임시 인라인 작성, 스타일 작성법이 확정되면 css 파일로 옮길 예정
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 30px",
        }}
      >
        <Image src={logo} alt={"logo"}></Image>
        <div className={styles.btn_wrapper}>
          <Image src={notifiIcon} alt={"notification_icon"}></Image>
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
      </div>
    </>
  );
}
