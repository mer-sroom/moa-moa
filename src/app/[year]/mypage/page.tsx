"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useAlertContext } from "@/contexts/AlertContext";
import Button from "@/app/[year]/(components)/common/Button";
import Image from "next/image";
import moa_cat from "../../../../public/assets/icons/notification/notification_moa_cat.svg";
import kakao from "../../../../public/assets/icons/kakao.svg";
import naver from "../../../../public/assets/icons/naver.svg";
import google from "../../../../public/assets/icons/google.svg";
import spotify from "../../../../public/assets/icons/spotify.svg";
import jumparrow from "../../../../public/assets/icons/jump-arrow.svg";
import styles from "@/styles/mypage.module.css";

export default function MyPage() {
  const { showAlert, showConfirmModal } = useAlertContext();
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoggedIn = !!session?.user;

  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [nickname, setNickname] = useState(session?.user?.name ?? "Guest");
  const [editedNickname, setEditedNickname] = useState(
    session?.user?.name ?? "Guest"
  );
  const [profileImage, setProfileImage] = useState(
    session?.user?.image ?? moa_cat
  );

  // 로그인하지 않은 경우 로그인 페이지로 리디렉션
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  // 프로필 이미지 가져오기
  useEffect(() => {
    if (session?.user?.image) {
      setProfileImage(session.user.image);
      console.log(profileImage);
    } else {
      setProfileImage(moa_cat); // 기본 이미지
    }
  }, [session]);

  // Spotify 연결 여부 확인
  useEffect(() => {
    async function checkSpotify() {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/check-spotify`);
          const data = await res.json();
          setSpotifyConnected(data.connected ?? false);
        } catch (error) {
          console.error("Error checking Spotify Connection", error);
          setSpotifyConnected(false);
        }
      }
    }
    checkSpotify();
  }, [session]);

  // Spotify OAuth 로그인 시작
  const handleConnectSpotify = () => {
    signIn("spotify", { callbackUrl: "/2025/mypage" });
  };

  // 로그아웃 처리 및 리디렉션
  const handleLogout = () => {
    showConfirmModal({
      icon: "질문",
      confirmMessage: "로그아웃",
      message: "다시 로그인하려면 비밀번호가 필요해요.",
      onConfirm: async () => {
        try {
          await signOut({ redirect: false });
          // toast.success("로그아웃 되었습니다.");
          router.push("/auth/login");
        } catch (error) {
          console.error("Logout failed:", error);
          toast.error("로그아웃 실패");
        }
      },
    });
  };

  // 회원탈퇴
  const handleDeleteAccount = () => {
    showConfirmModal({
      icon: "경고",
      confirmMessage: "회원탈퇴",
      message: "회원탈퇴 시 모든 정보가 삭제돼요!",
      onConfirm: async () => {
        try {
          const res = await fetch("/api/user/delete", { method: "DELETE" });
          if (res.ok) {
            await signOut({ callbackUrl: "/auth/login" });
          } else {
            const data = await res.json();
            toast.error(data.error ?? "회원탈퇴 실패");
          }
        } catch (err) {
          console.error(err);
          toast.error("회원탈퇴 실패");
        }
      },
    });
  };

  // 닉네임 변경
  const handleNicknameSave = async () => {
    setNickname(editedNickname);
    toast.success("닉네임 변경 완료!");
    // await fetch()
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.container}>
        {/* 프로필 섹션 */}
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            <Image
              src={profileImage}
              alt="profile Image"
              width={125}
              height={125}
              className={styles.noprofileImage}
            />
          </div>
          <div className={styles.userinfo}>
            <div className={styles.userName}>{nickname}</div>
            <div className={styles.loginWith}>
              <Image
                src={kakao}
                alt="connect icon"
                width={14}
                height={14}
                style={{ paddingRight: 6 }}
              />
              {isLoggedIn ? "연동 로그인 중" : "로그인 정보 없음"}
            </div>
            <div className={styles.spotify}>
              <Image
                src={spotify}
                alt="connect icon"
                width={14}
                height={14}
                style={{ paddingRight: 6 }}
              />
              Spotify
              {spotifyConnected ? " 연결중" : " 연결하기"}
              {!spotifyConnected && (
                <div className={styles.spotify_signout}>
                  <Image
                    src={jumparrow}
                    alt="connect icon"
                    width={10}
                    height={10}
                    style={{ paddingLeft: 7, cursor: "pointer" }}
                    onClick={handleConnectSpotify}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 닉네임 & 이메일 폼 섹션 */}
        <div className={styles.formSection}>
          <div className={styles.formNickname}>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              value={editedNickname}
              onChange={e => setEditedNickname(e.target.value)}
            />
          </div>

          <div className={styles.formEmail}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              value={session?.user?.email ?? "abc@naver.com"}
              readOnly
            />
          </div>
        </div>

        {/* 로그아웃 & 회원탈퇴 버튼 섹션 */}
        <div className={styles.actions}>
          <button onClick={handleLogout} className={styles.logout}>
            로그아웃
          </button>
          <button onClick={handleDeleteAccount} className={styles.delete}>
            회원 탈퇴
          </button>
        </div>

        <Button
          label="저장하기"
          size="long"
          color="black"
          onClick={handleNicknameSave}
        />
      </div>

      {/* 토스트 메시지 */}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        theme="colored"
      />
    </div>
  );
}
