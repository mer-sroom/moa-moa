"use client";
import Link from "next/link";
import Image from "next/image";
import my_page from "../../../../../public/assets/icons/nav_sidebar/mypage_icon.svg";
import select_moa from "../../../../../public/assets/icons/nav_sidebar/moa_select_icon.svg";
import saved_moa from "../../../../../public/assets/icons/nav_sidebar/saved_moa_icon.svg";
import sent_letter from "../../../../../public/assets/icons/nav_sidebar/sent_letter_icon.svg";
import friend_list from "../../../../../public/assets/icons/nav_sidebar/friend_list_icon.svg";
import copyright_img from "../../../../../public/assets/icons/nav_sidebar/sidebar_copyright.svg";
import styles from "../../../../styles/sidebar.module.css";
import { SidebarProps, SidebarItem } from "@/types/sideBar";

export default function Sidebar(props: SidebarProps) {
  const { isLoggedIn, userName, loginInfo, isOpen } = props;
  const sidebarItems: SidebarItem[] = [
    { id: "1", label: "마이페이지", href: "/2025/mypage", icon: my_page },
    {
      id: "2",
      label: "모아 선택 화면",
      href: "/2025/moa/select-moa",
      icon: select_moa,
    },
    {
      id: "3",
      label: "지난모아 보관함",
      //[id]값을 받아와야 해서 일단 컴포넌트 안으로, userName은 임시값입니다다
      href: `/2025/saved-moa/${userName}`,
      icon: saved_moa,
    },
    {
      id: "4",
      label: "내가 작성한 편지",
      href: "/2025/sent-letter",
      icon: sent_letter,
    },
    //친구 리스트 임시시
    { id: "5", label: "친구 목록", href: "/", icon: friend_list },
  ];

  return (
    <>
      {/* 사이드 바가 열릴 때 overlay,sidebar, content 각자 다른 animation을 갖고 있어서 각 isOpen을 받아오고 있습니다 */}
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} />
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div
          className={`${styles.sidebar_content} ${
            isOpen ? styles.open : styles.closing
          }`}
        >
          <ul key="sidebar-list">
            <div className={styles.user_info}>
              {isLoggedIn && (
                <>
                  <div className={styles.user_name}>
                    <span>{userName}</span>
                    <span>님</span>
                  </div>
                  <p className={styles.user_login_info}>{loginInfo}</p>
                </>
              )}
            </div>

            <div className={styles.sidebar_items_wrapper}>
              {sidebarItems.map(item => (
                <li key={item.id} className={styles.sidebar_item}>
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={28}
                    height={22}
                  />
                  <Link href={item.href} className={styles.sidebar_item}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
          <div className={styles.sidebar_footer}>
            <Image
              src={copyright_img}
              alt="copy_right"
              width={24}
              height={20}
            />
            <p>© 2025.mer'made. All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
}

// 사용 예제
// <Sidebar userName="테스트유저" width="mobile"></Sidebar>
