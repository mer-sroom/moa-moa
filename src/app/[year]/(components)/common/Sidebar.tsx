"use client";
import styles from "@/styles/Sidebar.module.css";

export interface SidebarProps {
  userName: string;
  loginInfo: string;
  isOpen: boolean;
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

export default function Sidebar({ userName, loginInfo, isOpen }: SidebarProps) {
  /*나중에 로그인 정보 받아오는 용도*/
  const isLoggedIn = true;
  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} />
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebar_conent}>
          <ul key={userName}>
            <h2>{userName}</h2>
            <p>{loginInfo}</p>
            {SidebarItem.map(item => (
              <li key={item.label}>
                <a href={item.href} style={{ color: "white" }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

// 사용 예제
// <Sidebar userName="테스트유저" width="mobile"></Sidebar>
