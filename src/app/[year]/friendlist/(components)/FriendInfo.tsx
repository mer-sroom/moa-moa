import Link from "next/link";
import styles from "@/styles/friendlist.module.css";

interface FriendInfo {
  id: string;
  nickname: string;
  profileImage: string;
  moaBoxOngoing: boolean;
}

export default function FriendInfo(props: FriendInfo) {
  const { id, nickname, profileImage, moaBoxOngoing } = props;
  return (
    <>
      <Link href={`/2025/moa/select-moa/${id}`} className={styles.friendItem}>
        <div
          className={styles.profileImage}
          style={{ backgroundImage: `url(${profileImage})` }}
        />
        <div>
          <div className={styles.infoWrapper}>
            <p className={styles.nickname}>{nickname}</p>
            <span
              className={`${styles.moaBoxStatus} ${
                moaBoxOngoing ? styles.active : ""
              }`}
            />
          </div>
          <div>
            <p className={styles.moaBoxOngoing}>
              {moaBoxOngoing ? "현재 진행 중인 모아박스가 있어요!" : "-"}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
