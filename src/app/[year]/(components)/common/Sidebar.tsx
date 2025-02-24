"use client";

import { signIn } from "next-auth/react";
import { useNavigationContext } from "@/contexts/NavigationContext";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
//아이콘------------------------------------------------------------------------------
import my_page from "../../../../../public/assets/icons/nav_sidebar/mypage_icon.svg";
import select_moa from "../../../../../public/assets/icons/nav_sidebar/moa_select_icon.svg";
import saved_moa from "../../../../../public/assets/icons/nav_sidebar/saved_moa_icon.svg";
import sent_letter from "../../../../../public/assets/icons/nav_sidebar/sent_letter_icon.svg";
import friend_list from "../../../../../public/assets/icons/nav_sidebar/friend_list_icon.svg";
import copyright_img from "../../../../../public/assets/icons/nav_sidebar/sidebar_copyright.svg";
import login_btn from "../../../../../public/assets/icons/sidebar_login_btn.svg";
//css------------------------------------------------------------------------------
import styles from "../../../../styles/Sidebar.module.css";

//SideBar 메뉴 인터페이스
export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: StaticImageData | string;
}

export default function Sidebar() {
  //전역에서 불러오기
  const { isOpen, setIsOpen, userName, isLoggedIn, userEmail } =
    useNavigationContext();

  // 사이드바 메뉴들
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
      //[id]값을 받아와야 해서 일단 컴포넌트 안으로, userName은 임시값입니다
      href: `/2025/saved-moa/${userName}`,
      icon: saved_moa,
    },
    {
      id: "4",
      label: "내가 작성한 편지",
      href: "/2025/sent-letter",
      icon: sent_letter,
    },
    {
      id: "5",
      label: "친구 목록",
      href: "/2025/friendlist",
      icon: friend_list,
    },
  ];

  return (
    <>
      {/* 사이드 바가 열릴 때 overlay,sidebar, content 각자 다른 animation을 갖고 있어서 각 isOpen을 받아오고 있습니다 */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* 사이드바 본체 */}
      <div
        id="sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      >
        <div
          className={`${styles.sidebar_content} ${
            isOpen ? styles.open : styles.closing
          }`}
        >
          <ul key="sidebar-list">
            {/* 유저 정보 영역 */}
            <div className={styles.user_info}>
              {isLoggedIn ? (
                <>
                  <div className={styles.user_name}>
                    <span>{userName}</span>
                    <span>님</span>
                  </div>
                  <p className={styles.user_login_info}>{userEmail}</p>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className={styles.login_wrapper}>
                    <Image src={login_btn} alt="login_btn" />
                    <h3 className={styles.login_text}>로그인하기</h3>
                  </Link>
                  <p className={styles.login_text}>로그인 후 이용 가능합니다</p>
                </>
              )}
            </div>

            {/* 사이드바 메뉴 목록 */}
            <div className={styles.sidebar_items_wrapper}>
              {sidebarItems.map(item => (
                <li key={item.id} className={styles.sidebar_item}>
                  <Image src={item.icon} alt={item.label} width={24} />
                  {isLoggedIn ? (
                    // 로그인 상태면 Link로 실제 이동 가능
                    <Link
                      href={item.href}
                      className={styles.sidebar_item}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    // 미로그인 상태면 클릭 막기 or 알림
                    <a
                      href="#"
                      className={styles.sidebar_item}
                      onClick={e => {
                        e.preventDefault();
                        // 원하는 동작 (예: signIn 호출)
                        signIn(undefined, { callbackUrl: "/auth/login" });
                        setIsOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </div>
          </ul>

          {/* 사이드바 하단 푸터 */}
          <div
            className={`${styles.sidebar_footer} ${isOpen ? styles.open : ""}`}
          >
            <Image src={copyright_img} alt="copy_right" width={24} />
            <p>© 2025.mer&apos;made. All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
}

// 사용 예제
// <Sidebar isOpen={true} setIsOpen={() => {}} />
