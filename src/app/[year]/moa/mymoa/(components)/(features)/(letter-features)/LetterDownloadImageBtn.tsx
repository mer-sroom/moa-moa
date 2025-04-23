import Image from "next/image";
import Button from "@/app/[year]/(components)/common/Button";
import Loading from "@/app/[year]/(components)/loading";
import downloadBtn from "@/../../public/assets/icons/download_icon.svg";
import { useAlertContext } from "@/contexts/AlertContext";
import styles from "@/styles/LetterModal.module.css";

interface Props {
  onClick?: () => void; // 캡쳐 시작 시 호출되는 함수 (선택적)
  isCapturing: boolean; //스포티파이 트랙 정보 설정 함수 (선택적)
}

export default function LetterDownloadImageBtn(props: Props) {
  const { onClick, isCapturing } = props;
  const { showAlert } = useAlertContext();

  return (
    <>
      {isCapturing && <Loading />}
      <div className={styles.letterDownloadBtnContainer}>
        <Button
          label="저장하기"
          icon={
            <Image
              style={{ filter: "invert(1)" }}
              src={downloadBtn}
              alt="다운로드"
            />
          }
          size="long"
          color="black"
          onClick={() => {
            try {
              onClick();
            } catch (error) {
              showAlert("캡쳐 중 문제가 발생했습니다", "오류");
              console.error("캡쳐 중 오류 발생:", error);
            }
          }}
        />
      </div>
    </>
  );
}
