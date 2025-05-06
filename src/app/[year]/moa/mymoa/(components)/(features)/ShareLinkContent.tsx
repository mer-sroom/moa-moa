"use client";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import copyIcon from "@/../../public/assets/icons/sharelink_modal/copy_link.svg";
import kakaoIcon from "@/../../public/assets/icons/kakao.svg";
import lineIcon from "@/../../public/assets/icons/sharelink_modal/line.svg";
import facebookIcon from "@/../../public/assets/icons/sharelink_modal/facebook.svg";
import xIcon from "@/../../public/assets/icons/sharelink_modal/x_sns.svg";
import Swal from "sweetalert2";
import { useAlertContext } from "@/contexts/AlertContext";
import styles from "@/styles/modal.module.css";
import NotFound from "@/app/[year]/(components)/not-found";

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
  const { showAlert } = useAlertContext();
  if (!id) {
    return NotFound();
  }
  const currentUrl = `${baseUrl}/2025/moa/mymoa/${id}`;

  // SNS 공유하기
  const handleShare = snsUrl => {
    const url = snsUrl + encodeURIComponent(currentUrl);
    window.open(url, "_blank");
  };

  // 링크 복사 버튼 이벤트
  const handleCopyLink = async () => {
    try {
      //HTTPS 경우
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
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
      showAlert("복사 중 오류가 발생했습니다", "오류");
    }
  };
  //카카오톡 공유하기
  const handleShareKakao = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "모아 모아! 마음을 전달해요😺✉️",
        description: "직접 꾸민 편지와 노래를 담아 친구의 우편함에 넣어봐요📫",
        //나중에는 스크린샷 뜬 거를 S3에서 가져오는게 나을지도?!
        imageUrl:
          "https://i.pinimg.com/736x/df/eb/c4/dfebc49b2f3db477bcdf06796c26a95d.jpg",
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
      buttons: [
        {
          title: "친구한테 편지쓰기",
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    });
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.linkCopyWrapper}>
        <input
          value={currentUrl}
          readOnly
          className={styles.linkInput}
          aria-label="공유 링크"
        />
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
                onClick={
                  item.label === "카카오"
                    ? handleShareKakao
                    : () => handleShare(item.shareHref)
                }
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
