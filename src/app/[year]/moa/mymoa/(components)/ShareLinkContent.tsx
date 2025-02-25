"use client";
import Image from "next/image";
import copyIcon from "@/../../public/assets/icons/sharelink_modal/copy_link.svg";
import kakaoIcon from "@/../../public/assets/icons/kakao.svg";
import instaIcon from "@/../../public/assets/icons/sharelink_modal/insta.svg";
import facebookIcon from "@/../../public/assets/icons/sharelink_modal/facebook.svg";
import xIcon from "@/../../public/assets/icons/sharelink_modal/x_sns.svg";
import { useParams } from "next/navigation";

const snsItems = [
  {
    id: "1",
    label: "카카오",
    href: "/2025/moa/select-moa",
    icon: kakaoIcon,
  },
  {
    id: "2",
    label: "인스타",
    href: "",
    icon: instaIcon,
  },
  {
    id: "3",
    label: "페이스북",
    href: "/2025/sent-letter",
    icon: facebookIcon,
  },
  {
    id: "4",
    label: "엑스",
    href: "/2025/friendlist",
    icon: xIcon,
  },
];
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export default function ShareLinkModal() {
  const { id } = useParams();
  return (
    <div
      style={{
        paddingTop: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <input
          value={`${baseUrl}/2025/moa/mymoa/${id}`}
          readOnly
          style={{
            backgroundColor: "var(--color-gray-200)",
            border: "none",
            borderRadius: "52px",
            padding: "15px 15px",
            fontSize: "16px",
            width: "100%",
            maxWidth: "282px",
          }}
        />
        <Image src={copyIcon} alt="link copy icon" onClick={() => {}} />
      </div>
      <div>
        <ul
          style={{
            margin: "0",
            display: "flex",
            padding: "28px 0 8px 0",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "282px",
            gap: "16px",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          {snsItems.map(item => (
            <li
              key={item.id}
              style={{
                backgroundColor: "var(--color-black)",
                borderRadius: "50%",
                width: "55px",
                height: "55px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src={item.icon} alt={item.label} onClick={() => {}} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
