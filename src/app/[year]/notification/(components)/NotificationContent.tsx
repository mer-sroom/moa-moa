import Link from "next/link";
import Image from "next/image";
import moa_cat from "../../../../../public/assets/icons/notification/notification_moa_cat.svg";
import accept_btn from "../../../../../public/assets/icons/notification/notification_yes_btn.svg";
import reject_btn from "../../../../../public/assets/icons/notification/notification_no_btn.svg";
import styles from "../../../../styles/notification.module.css";
import { mockUsers, mockNotifications } from "../data";

//미리 유저 정보 받아오기
const userMap = new Map(mockUsers.map(user => [user.id, user]));

//userId로 nickname, profileImage 받아오는 용도
const getUserInfo = (userId: string) => {
  const user = userMap.get(userId);
  return user //해당하는 유저가 있다면
    ? { profileImage: user.profileImage, nickname: user.nickname }
    : { profileImage: "", nickname: "Unknown" }; //해당하는 유저가 없다면
};

//FROM_MOA/LETTER_RECEIVED 알림 읽음 처리 로직
// useEffect(() => {}, []);

//Notification type에 따라 분류
//내 소식 저장
const myNotifications = mockNotifications.filter(
  notification =>
    notification.type === "INVITE_GROUP_MOA" ||
    notification.type === "FRIEND_REQUEST"
);
//모아 소식 저장
const moaNotifications = mockNotifications.filter(
  notification =>
    notification.type === "LETTER_RECEIVED" || notification.type === "FROM_MOA"
);
export default function NotificationContent() {
  return (
    <>
      <div className={styles.content_wrapper}>
        {/* 내 소식 알림함  */}
        <section className={styles.my_notifications_section}>
          <p className={styles.notifications_category}>내 소식</p>
          <div className={styles.notifications_wrapper}>
            {/* 위에 분류한 값 펼침*/}
            {myNotifications.map(notification => {
              // userId를 통해 user의 profileImg, nickname 받아오기
              const userInfo = getUserInfo(notification.userId);
              return (
                <div key={notification.id} className={styles.my_notification}>
                  {/*유저 프로필 */}
                  <Link href={`/2025/moa/friendmoa/${notification.userId}`}>
                    <div
                      className={styles.user_profileImg}
                      style={{
                        backgroundImage: `url(${userInfo.profileImage})`,
                      }}
                    />
                  </Link>
                  {/* 유저 닉네임, 알림 메시지 */}
                  <p className={styles.message}>
                    <strong>{userInfo.nickname}</strong> {notification.message}
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
              );
            })}
          </div>
        </section>
        {/* 모아 소식 알림함 */}
        <section className={styles.moa_notifications_section}>
          <p className={styles.notifications_category}>모아 소식</p>
          <div className={styles.notifications_wrapper}>
            {/* 위에 분류한 값 펼침 */}
            {moaNotifications.map(notification => (
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
            ))}
          </div>
        </section>
        {/* 모달 하단 그라데이이션용 */}
        <div className={styles.gradation} />
      </div>
    </>
  );
}
