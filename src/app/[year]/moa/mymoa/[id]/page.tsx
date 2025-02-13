//목업 데이터 받아오는 중------------------------------------------
import {
  mockUser, //유저
  mockMoaBoxes, //모아 박스
  mockLetters, //편지
  mockBackgroundDesigns, //배경 디자인
  mockMailBoxDesigns, //모아 박스 디자인인
} from "../../mockData";
//----------------------------------------------------------------
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import NotFound from "@/app/[year]/(components)/not-found";
//----------------------------------------------------------------
import MailBox from "../../(components)/MailBox";
import Button from "@/app/[year]/(components)/common/Button";
import downloadIcon from "../../../../../../public/assets/icons/download_icon.svg";
import shareIcon from "../../../../../../public/assets/icons/share_icon.svg";

export default async function MyMoaBoxPage({ params }) {
  const { id } = await params; //모아박스 id
  const moaBoxId = parseInt(id, 10);

  // 세션에서 사용자 정보를 가져옴
  const session = await getServerSession();
  // 로그인 여부 확인
  if (!session?.user) {
    redirect("/auth/login");
  }

  //모아박스 데이터 불러오기
  const moaBox = mockMoaBoxes.find(box => box.id === moaBoxId);
  //존재하는 moaBox인지, 모아박스의 소유자가 현재 로그인 된 유저가 맞는지 확인
  //(현재는 목업 유저의 아이디 값으로 비교 중입니다)
  if (!moaBox || moaBox.ownerId !== mockUser.id) {
    return <NotFound />;
  }

  //디자인 정보 불러오기
  const backgroundDesign = mockBackgroundDesigns.find(
    design => design.id === moaBox.backgroundDesignId
  );
  const mailBoxDesign = mockMailBoxDesigns.find(
    design => design.id === moaBox.mailBoxDesignId
  );
  //모아 박스에 달린 모든 편지 불러오기
  const letters = mockLetters.filter(letter => letter.moaBoxId === moaBoxId);
  return (
    <>
      {/* 마이 모아 전체 배경 img */}
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
        {/* 모아 박스 타이틀 / 편지 수*/}
        <section
          style={{
            marginTop: "90px",
            maxWidth: "320px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              marginTop: "0",
              borderRadius: "50px",
              background: " rgba(255, 255, 255, 0.52)",
            }}
          >
            {moaBox.title}
          </h2>
          {/* 받은 편지 수 */}
          <div>
            {moaBox.letterCountPublic && (
              <p style={{ margin: "0" }}>
                moaBox Id : {id}, 받은 편지 수 : {letters.length}
              </p>
            )}
          </div>
        </section>
        {/* 모아 박스 컨테이너*/}
        <section style={{ paddingTop: "40px" }}>
          <Suspense fallback={"loading..."}>
            <MailBox
              moaBoxId={moaBoxId}
              designURL={mailBoxDesign.imageURL}
              letters={letters}
            />
          </Suspense>
        </section>
        {/* 버튼 컨테이너 */}
        <section
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
        </section>
      </div>
    </>
  );
}
