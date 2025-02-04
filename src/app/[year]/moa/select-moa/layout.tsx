import icon from "../../../../../public/assets/icons/select_moa_icon.svg";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <div style={{ padding: "48px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Image src={icon} alt="select_moa_icon" />
        <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "bold" }}>
          모아 선택 화면
        </h3>
      </div>

      <p style={{ margin: "8px 0" }}>
        새로운 모아 박스를 만들거나 진행 중인 기념일을 모아 볼 수 있어요
      </p>
      {children}
    </div>
  );
}
