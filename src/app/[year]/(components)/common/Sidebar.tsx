"use client";
import { useState } from "react";
import styles from "@/styles/Sidebar.module.css";

export interface SidebarProps {
  userName: string;
  width: "mobile" | "web" | string;
}

export interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
}

const SidebarItem: SidebarItem[] = [
  { label: "Season", href: "/season", icon: "" },
  { label: "2025", href: "/2025", icon: "" },
  { label: "마이페이지", href: "/mypage", icon: "" },
];

export default function Sidebar(
  { userName, width }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const thisWidth = width === "mobile" ? "270px" :
    width === "web" ? "380px" :
      "700px";

  const SidebarOpen = () => {
    setIsOpen(true);
  };
  const SidebarClose = () => {
    setIsOpen(false)
  };

  return (
    <>
      <div
        onClick={SidebarOpen} className={styles.pointer}>
        ●●●
      </div>
      <div className={isOpen ? styles.background : ""}></div>
      <div
        style={{
          width: `${thisWidth}`,
          transform: `${isOpen ? "translateX(0)" : `translateX(${thisWidth})`}`
        }}
        className={`${styles.sidebar}`}>
        <ul key={userName}>
          <h2 className={styles.pointer} onClick={SidebarClose}>
            X
          </h2>
          <h2>{userName}</h2>
          {SidebarItem.map((item) => (
            <li key={item.label}>
              <a href={item.href} style={{ color: "white" }}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

// 사용 예제
// <Sidebar userName="테스트유저" width="mobile"></Sidebar>