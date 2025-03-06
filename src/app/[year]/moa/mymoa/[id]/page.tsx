import prisma from "@/lib/prisma";
//----------------------------------------------------------------
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import NotFound from "@/app/[year]/(components)/not-found";
//----------------------------------------------------------------
import Title from "../(components)/Title";
import MailBox from "../(components)/MailBox";
import Button from "@/app/[year]/(components)/common/Button";
import OpenShareLinkModal from "../(components)/OpenShareLinkModal";
import HandleAddFriend from "../(components)/HandleAddFriend";
import downloadIcon from "@/../../public/assets/icons/download_icon.svg";
import shareIcon from "@/../../public/assets/icons/share_icon.svg";
import addFriend from "@/../../public/assets/icons/add_friend.svg";
import penIcon from "@/../../public/assets/icons/pen.svg";
import styles from "@/styles/mymoa.module.css";
import { authOptions } from "@/app/api/auth/authoptions";

export default async function MyMoaBoxPage({ params }) {
  const { id } = await params; //모아박스 id
  const moaBoxId = Number(id);

  // 세션에서 사용자 정보를 가져오고 로그인 여부 확인
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/login");
  }
  const currentUser = session.user;

  //moaBox정보 받아오기(디자인, 편지지)
  const moaBox = await prisma.moaBox.findUnique({
    where: { id: moaBoxId },
    include: {
      backgroundDesign: true,
      mailBoxDesign: true,
      letters: {
        select: {
          id: true,
          authorName: true,
          isOpened: true,
          letterIconDesign: {
            select: { imageURL: true },
          },
        },
      },
    },
  });
  if (!moaBox) {
    //모아박스가 존재하지 않을 때
    return <NotFound />;
  }
  // 현재 로그인한 사용자가 소유자인지 확인
  const isOwner = moaBox.ownerId === currentUser.id;

  //디자인 정보 불러오기
  const backgroundDesign = moaBox.backgroundDesign?.imageURL;
  const mailBoxDesign = moaBox.mailBoxDesign?.imageURL;
  //모아 박스에 달린 모든 편지 불러오기
  const letters = moaBox.letters;
  return (
    <>
      {/* 마이 모아 전체 배경 img */}
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${backgroundDesign})`,
        }}
      >
        {/*
        {/* 모아 박스 타이틀 */}
        <Title
          title={moaBox.title}
          letterCountPublic={moaBox.letterCountPublic}
          lettersLength={letters.length}
        />

        {/* 모아 박스 컨테이너*/}
        <Suspense fallback={"loading..."}>
          <MailBox
            moaBoxId={moaBoxId}
            designURL={mailBoxDesign}
            letters={letters}
          />
        </Suspense>

        {/* 버튼 컨테이너 */}
        <section className={styles.buttonSection}>
          {isOwner ? (
            <>
              {/* 모아박스 소유주가 본인일 때 */}
              <Button
                icon={<Image src={downloadIcon} alt="share icon" />}
                size="circle"
              ></Button>
              <OpenShareLinkModal>
                <Button
                  label="공유하기"
                  icon={<Image src={shareIcon} alt="share icon" />}
                  size="medium"
                  color="black"
                />
              </OpenShareLinkModal>
            </>
          ) : (
            <>
              {/* 모아박스 소유주가 아닐 때 */}
              <HandleAddFriend targetId={moaBox.ownerId} moaBoxId={moaBoxId}>
                <Button
                  icon={
                    <Image
                      src={addFriend}
                      style={{
                        width: "28px",
                        height: "auto",
                        marginLeft: "4px",
                      }}
                      alt="add friend icon"
                    />
                  }
                  size="circle"
                />
              </HandleAddFriend>

              <Button
                label={<Link href={"/2025/create-letter"}>편지 작성하기</Link>}
                icon={<Image src={penIcon} alt="pen icon" />}
                size="medium"
                color="black"
              />
            </>
          )}
        </section>
      </div>
    </>
  );
}
