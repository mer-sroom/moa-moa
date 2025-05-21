export const dynamic = "force-dynamic";
import Image from "next/image";
import paperTexture from "public/assets/moamoa_paper_texture.jpg";
import moaCatImg from "public/assets/service-imgs/404img.svg";
export default function NotFound() {
  return (
    <div
      style={{
        backgroundImage: `url(${paperTexture.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2vh",
      }}
    >
      <Image
        src={moaCatImg}
        alt="404"
        style={{ width: "70%", maxWidth: 500, height: "auto" }}
      />

      <div style={{ textAlign: "center", color: "var(--color-black)" }}>
        <h3>페이지를 찾을 수 없습니다!</h3>
        <p style={{ fontSize: "0.9rem", lineHeight: "1.3rem" }}>
          잘못된 주소를 입력하셨거나, 페이지가 삭제되었을 수 있습니다.
          <br />
          다시 확인해 주세요!
        </p>
      </div>
    </div>
  );
}
