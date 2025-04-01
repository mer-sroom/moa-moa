"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import moa_cat from "../../../../../public/assets/icons/notification/notification_moa_cat.svg";
import accept_btn from "../../../../../public/assets/icons/notification/notification_yes_btn.svg";
import reject_btn from "../../../../../public/assets/icons/notification/notification_no_btn.svg";
import styles from "../../../../styles/notification.module.css";
import defaultImg from "@/../../public/assets/default_img.png";
import { BaseNotification, MyNotification } from "@/types/notification";
import Swal from "sweetalert2"; //임시시

interface NotificationContentProps {
  notifications: {
    myNotifications: MyNotification[];
    moaNotifications: BaseNotification[];
  };
}

export default function NotificationContent({
  notifications,
}: NotificationContentProps) {
  const router = useRouter();
  //알림 종류에 따라 분류
  //내 소식
  const myNotifications: MyNotification[] = notifications.myNotifications;
  //모아 소식
  const moaNotifications: BaseNotification[] = notifications.moaNotifications;

  // 모아 소식 읽음 처리
  useEffect(() => {
    async function patchMoaNotificationAsRead() {
      try {
        //읽음처리 되지 않은 모아 소식이 있는지
        const unread = moaNotifications.filter(
          notification => !notification.read
        );
        //있다면 read값 patch요청
        if (unread.length > 0) {
          await fetch("/api/notification", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ids: unread.map(notification => notification.id),
              read: true,
            }),
          });
        }
      } catch (error) {
        console.error("모아 소식 읽음 처리 중 문제 발생", error);
      }
    }
    patchMoaNotificationAsRead();
  }, [moaNotifications]);

  // 내 소식: 친구 요청 수락
  const handleAccept = async (e: React.MouseEvent, notificationId: number) => {
    e.preventDefault();
    const result = await Swal.fire({
      icon: "question",
      text: "친구 요청을 수락하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#ff8473",
      cancelButtonColor: "#aeaeae",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    });

    if (!result.isConfirmed) return;
    if (result.isConfirmed) {
      try {
        const res = await fetch("/api/notification/friend-request", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationId }),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            text: "친구 요청이 수락되었습니다",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "수락 중 문제가 발생했습니다",
          });
        }
      } catch (error) {
        console.error("친구 요청 수락 중 문제 발생", error);
        Swal.fire({
          icon: "error",
          text: "수락 중 문제가 발생했습니다.",
        });
      }
    }
  };

  // 내 소식 : 친구 요청 거절
  const handleReject = async (e: React.MouseEvent, notificationId: number) => {
    e.preventDefault();
    const result = await Swal.fire({
      icon: "warning",
      text: "친구 요청을 거절하시겠습니까? 해당 작업은 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonColor: "#ff8473",
      cancelButtonColor: "#aeaeae",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    });
    if (!result.isConfirmed) return;
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/notification/friend-request`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationId }),
        });
        const data = await res.json();

        if (data.success) {
          Swal.fire({ icon: "info", text: "친구 요청이 거절되었습니다" });
        } else {
          Swal.fire({
            icon: "warning",
            text: "요청 거절 중 문제가 발생했습니다",
          });
        }
      } catch (error) {
        console.error("친구 요청 거절 중 문제 발생", error);
        Swal.fire({
          icon: "warning",
          text: "요청 거절 중 문제가 발생했습니다",
        });
      }
    }
  };

  return (
    <div className={styles.content_wrapper}>
      {/* 내 소식 알림함 */}
      <section className={styles.my_notifications_section}>
        <p className={styles.notifications_category}>내 소식</p>
        <div className={styles.notifications_wrapper}>
          {myNotifications.length === 0 ? (
            <p className={styles.no_notifications}>알림이 없습니다</p>
          ) : (
            myNotifications.map(notification => (
              <div key={notification.id} className={styles.my_notification}>
                {/* 유저 프로필 */}
                <Link href={`/2025/moa/select-moa/${notification.sender.id}`}>
                  <div
                    className={styles.user_profileImg}
                    style={{
                      backgroundImage: notification.sender.profileImage
                        ? `url(${notification.sender.profileImage})`
                        : `url(${defaultImg.src})`,
                    }}
                  />
                </Link>
                {/* 유저 닉네임, 알림 메시지 */}
                <p className={styles.message}>
                  <strong>{notification.sender.nickname}</strong>{" "}
                  {notification.message}
                </p>
                {/* 수락/거절 버튼 */}
                <div className={styles.btn_wrapper}>
                  <button
                    className={styles.accept_btn}
                    onClick={e => handleAccept(e, notification.id)}
                  >
                    <Image src={accept_btn} alt="accept" />
                  </button>
                  <button
                    className={styles.reject_btn}
                    onClick={e => handleReject(e, notification.id)}
                  >
                    <Image src={reject_btn} alt="reject" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      {/* 모아 소식 알림함 */}
      <section className={styles.moa_notifications_section}>
        <p className={styles.notifications_category}>모아 소식</p>
        <div className={styles.notifications_wrapper}>
          {moaNotifications.length === 0 ? (
            <p className={styles.no_notifications}>아직 조용하네요!</p>
          ) : (
            moaNotifications.map(notification => (
              <div
                key={notification.id}
                className={`${styles.moa_notification} ${
                  notification.read ? styles.read : ""
                }`}
              >
                {/* 모아 소식 알림 이미지 */}
                <Image src={moa_cat} alt="moa-cat" />
                {/* 알림 메시지 */}
                <p className={styles.message}>{notification.message}</p>
              </div>
            ))
          )}
        </div>
      </section>
      {/* 모달 하단 그라데이션용 */}
      <div className={styles.gradation} />
    </div>
  );
}
