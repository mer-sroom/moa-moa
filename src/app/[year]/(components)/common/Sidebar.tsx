"use client";
import { useState } from "react";
import type { CSSProperties } from "react";

export interface SidebarProps {
  userName: string;
  width?: string;
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

  const SidebarOpen = () => {
    setIsOpen(true);
  };

  const SidebarClose = () => {
    setIsOpen(false);
  };

  const SidebarStyle: CSSProperties = {
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    zIndex: "2",
    backgroundColor: "black",
    color: "white",
    width: "270px",
    height: "100%",
    transition: "0.5s ease",
  };

  const CloseButton: CSSProperties = {
    cursor: "pointer",
  };

  const SidebarBackground: CSSProperties = {
    backgroundColor: "rgba(126, 126, 126, 0.7)",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1",
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <div
        onClick={SidebarOpen} style={{ cursor: "pointer" }}>
        ●●●
      </div>
      <div style={isOpen ? SidebarBackground : {}}></div>
      <div style={{
        ...SidebarStyle,
        ...isOpen ?
          { transform: "translateX(0)" } : { transform: "translateX(270px)" }
      }}>
        <ul key={userName}>
          <h2 style={CloseButton} onClick={SidebarClose}>
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
// <Sidebar userName="테스트유저"></Sidebar>