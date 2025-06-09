import styles from "../../../../styles/backgroundLayout.module.css";
import backgroundImg from "public/assets/moamoa_paper_texture.jpg";
export default function BackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={styles.container}
      >
        {children}
      </div>
    </>
  );
}
