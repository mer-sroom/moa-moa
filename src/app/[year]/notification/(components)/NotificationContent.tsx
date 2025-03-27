import Link from "next/link";
import Image from "next/image";
import moa_cat from "../../../../../public/assets/icons/notification/notification_moa_cat.svg";
import accept_btn from "../../../../../public/assets/icons/notification/notification_yes_btn.svg";
import reject_btn from "../../../../../public/assets/icons/notification/notification_no_btn.svg";
import styles from "../../../../styles/notification.module.css";
import defaultImg from "@/../../public/assets/default_img.png";
import { BaseNotification, MyNotification } from "@/types/notification";

//FROM_MOA/LETTER_RECEIVED 알림 읽음 처리 로직
// useEffect(() => {}, []);

interface NotificationContentProps {
  notifications: {
    myNotifications: MyNotification[];
    moaNotifications: BaseNotification[];
  };
}

export default function NotificationContent({
  notifications,
}: NotificationContentProps) {
  //알림 종류에 따라 분류
  //내 소식
  const myNotifications: MyNotification[] = notifications.myNotifications;
  //모아 소식
  const moaNotifications: BaseNotification[] = notifications.moaNotifications;

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
                  <button className={styles.accept_btn}>
                    <Image src={accept_btn} alt="accept" />
                  </button>
                  <button className={styles.reject_btn}>
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
