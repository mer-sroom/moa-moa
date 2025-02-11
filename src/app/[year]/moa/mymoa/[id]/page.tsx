import NotFound from "@/app/[year]/(components)/not-found";
import Image from "next/image";
import {
  mockMoaBoxes,
  mockLetters,
  mockBackgroundDesigns,
  mockMailBoxDesigns,
  mockLetterIconDesigns,
  mockLetterPaperDesigns,
} from "./mockdata";
import MailBox from "../../(components)/MailBox";
import { Suspense } from "react";
import Button from "@/app/[year]/(components)/common/Button";
import downloadIcon from "../../../../../../public/assets/icons/download_icon.svg";
import shareIcon from "../../../../../../public/assets/icons/share_icon.svg";

export default async function MyMoaBoxPage({ params }) {
  const { id } = await params; //모아박스 id
  const moaBoxId = parseInt(id, 10);

  //모아박스 데이터 불러오기
  const moaBox = mockMoaBoxes.find(box => box.id === moaBoxId);

  //디자인 정보 불러오기
  const backgroundDesign = mockBackgroundDesigns.find(
    design => design.id === moaBox.backgroundDesignId
  );
  const mailBoxDesign = mockMailBoxDesigns.find(
    design => design.id === moaBox.mailBoxDesignId
  );
  //모아 박스에 달린 모든 편지 불러오기
  const letters = mockLetters.filter(letter => letter.moaBoxId === moaBoxId);
  // console.log(backgroundDesign.imageURL);
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          backgroundImage: `url(${backgroundDesign.imageURL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            marginTop: "90px",
            maxWidth: "320px",
            width: "100%",
            textAlign: "center",
            borderRadius: "50px",
            background: " rgba(255, 255, 255, 0.52)",
          }}
        >
          My Moa Page
        </h2>
        moaBox Id : {id}, 편지 수 : {letters.length}
        <div style={{ paddingTop: "40px" }}>
          <Suspense fallback={"loading..."}>
            <MailBox
              moaBoxId={moaBoxId}
              designURL={mailBoxDesign.imageURL}
              letters={letters}
            />
          </Suspense>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            paddingTop: "68px",
          }}
        >
          <Button
            icon={<Image src={downloadIcon} alt="share icon" />}
            size="circle"
          ></Button>
          <Button
            label="공유하기"
            icon={<Image src={shareIcon} alt="share icon" />}
            size="medium"
            color="black"
          ></Button>
        </div>
      </div>
    </>
  );
}
