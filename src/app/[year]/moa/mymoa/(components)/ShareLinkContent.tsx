"use client";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import copyIcon from "@/../../public/assets/icons/sharelink_modal/copy_link.svg";
import kakaoIcon from "@/../../public/assets/icons/kakao.svg";
import lineIcon from "@/../../public/assets/icons/sharelink_modal/line.svg";
import facebookIcon from "@/../../public/assets/icons/sharelink_modal/facebook.svg";
import xIcon from "@/../../public/assets/icons/sharelink_modal/x_sns.svg";
import Swal from "sweetalert2";
import styles from "@/styles/modal.module.css";

interface SnsItem {
  id: string;
  label: string;
  shareHref: string;
  icon: StaticImageData;
}

const snsItems: SnsItem[] = [
  {
    id: "1",
    label: "카카오",
    shareHref: "https://story.kakao.com/share?url=",
    icon: kakaoIcon,
  },
  {
    id: "2",
    label: "엑스",
    shareHref: "https://twitter.com/intent/tweet?url=",
    icon: xIcon,
  },
  {
    id: "3",
    label: "페이스북",
    shareHref: "http://www.facebook.com/sharer/sharer.php?u=",
    icon: facebookIcon,
  },
  {
    id: "4",
    label: "라인",
    shareHref: "https://line.me/R/msg/text/?",
    icon: lineIcon,
  },
];
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ShareLinkModal() {
  const { id } = useParams();
  const currentUrl = `${baseUrl}/2025/moa/mymoa/${id}`;

  // 클립보드 복사 함수 (비동기)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).catch(e => {
      console.error(e);
      Swal.fire({
        title: "Error",
        text: "복사 중 문제가 생겼습니다",
        icon: "error",
        confirmButtonText: "확인",
      });
    });
  };

  // SNS 공유하기 & 클립보드 복사
  const handleShare = snsUrl => {
    const url = snsUrl + encodeURIComponent(currentUrl);
    window.open(url, "_blank");
    // 혹시 몰라 클립보드 복사 실행
    copyToClipboard();
  };

  // 링크 복사 버튼 이벤트
  const handleCopyLink = async () => {
    try {
      //HTTPS 경우
      if (window.location.protocol === "https:") {
        await copyToClipboard();
      }
      //HTTP 경우
      else {
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      Swal.fire({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: "success",
        title: "링크 복사 완료!",
        didOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    } catch (e) {
      console.error(e);
      Swal.fire({
        title: "Error",
        text: "복사 중 문제가 생겼습니다",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  };
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.linkCopyWrapper}>
        <input value={currentUrl} readOnly className={styles.linkInput} />
        <button className={styles.linkCopyBtn}>
          <Image src={copyIcon} alt="link copy icon" onClick={handleCopyLink} />
        </button>
      </div>
      <div>
        <ul className={styles.snsListWrapper}>
          {snsItems.map(item => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleShare(item.shareHref)}
                className={styles.snsItem}
              >
                <Image src={item.icon} alt={item.label} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
