import Image from "next/image";
import Button from "@/app/[year]/(components)/common/Button";
import Loading from "@/app/[year]/(components)/loading";
import downloadBtn from "@/../../public/assets/icons/download_icon.svg";
import styles from "@/styles/LetterModal.module.css";

interface Props {
  onClick: () => void; // 캡쳐 시작 시 호출되는 함수
  isCapturing: boolean; //로딩 상태 확인용
}

export default function LetterDownloadImageBtn(props: Props) {
  const { onClick, isCapturing } = props;

  return (
    <>
      {isCapturing && <Loading />}
      <Button
        className="letterDownloadBtnContainer"
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
        //이미지 캡쳐 용 데이터 패칭(SpotifyImgForCapture에서 사용)
        onClick={onClick}
      />
    </>
  );
}
