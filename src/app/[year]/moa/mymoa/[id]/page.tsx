import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/authoptions";
//----------------------------------------------------------------
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
//----------------------------------------------------------------
import NotFound from "@/app/not-found";
import Loading from "@/app/[year]/(components)/loading";
import Title from "../(components)/(ui)/Title";
import MailBox from "../(components)/(ui)/MailBox";
import Button from "@/app/[year]/(components)/common/Button";
import OpenShareLinkModal from "../(components)/(features)/OpenShareLinkModal";
import HandleAddFriend from "../(components)/(features)/HandleAddFriend";
import HandleCreateLetter from "../(components)/(features)/HandleWriteLetter";
import shareIcon from "@/../../public/assets/icons/share_icon.svg";
import addFriend from "@/../../public/assets/icons/add_friend.svg";
import penIcon from "@/../../public/assets/icons/pen.svg";
import styles from "@/styles/mymoa.module.css";
import MoaBoxDownloadImageBtn from "../(components)/(features)/MoaBoxDownloadImageBtn";
import GuideModalMiddle from "../(components)/(ui)/GuideModalMiddle";

export default async function MyMoaBoxPage({ params }) {
  const { id } = await params; //모아박스 id
  const moaBoxId = Number(id);

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

  // 세션에서 사용자 정보를 가져오고 로그인 여부 확인
  const session = await getServerSession(authOptions);
  let isOwner = false;
  if (session?.user) {
    const currentUser = session?.user;
    // 현재 로그인한 사용자가 소유자인지 확인
    isOwner = moaBox.ownerId === currentUser.id;
  }
  //디자인 정보 불러오기
  const backgroundDesign = moaBox.backgroundDesign?.imageURL;
  const mailBoxDesign = moaBox.mailBoxDesign?.imageURL;
  //모아 박스에 달린 모든 편지 불러오기
  const letters = moaBox.letters;

  //모아박스 만료 여부 체크
  const isExpired = new Date(moaBox.dueDate).getTime() <= Date.now();

  return (
    <div className={styles.captureArea} id="captureMoaBoxArea">
      <><GuideModalMiddle owner={isOwner}></GuideModalMiddle></>
      {/* 마이 모아 전체 배경 img */}
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${backgroundDesign})` }}
      >
        <>
          {/* 모아 박스 타이틀 */}
          <Title
            title={moaBox.title}
            letterCountPublic={moaBox.letterCountPublic}
            lettersLength={letters.length}
          />

          {/* 모아 박스 컨테이너*/}
          <Suspense fallback={<Loading />}>
            <MailBox
              moaBoxId={moaBoxId}
              designURL={mailBoxDesign}
              letters={letters}
            />
          </Suspense>
        </>
        {/* 버튼 컨테이너 */}
        <section className={styles.buttonSection}>
          {isOwner ? (
            <>
              {/* 모아박스 소유주가 본인일 때 */}
              {/* 이미지 다운로드 버튼 */}
              <MoaBoxDownloadImageBtn moaBoxTitle={moaBox.title} />
              {isExpired ? ( //소유주이지만, 종료된 모아박스일 때
                <Button label="기념일 종료" size="medium" color="blocked" />
              ) : (
                //종료되지 않은 경우
                <OpenShareLinkModal>
                  <Button
                    label="공유하기"
                    icon={<Image src={shareIcon} alt="share icon" />}
                    size="medium"
                    color="black"
                  />
                </OpenShareLinkModal>
              )}
            </>
          ) : (
            <>
              {/* 모아박스 소유주가 아닐 때 */}
              <HandleAddFriend
                targetId={moaBox.ownerId}
                moaBoxId={moaBoxId}
                isAuthenticated={!!session}
              >
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
                  color="white"
                />
              </HandleAddFriend>
              {isExpired ? (
                //기념일 종료 시
                <Button label="기념일 종료" size="medium" color="blocked" />
              ) : (
                //종료되지 않은 경우
                <HandleCreateLetter
                  allowAnonymous={moaBox.allowAnonymous}
                  isAuthenticated={!!session}
                  moaBoxId={moaBoxId}
                >
                  <Button
                    label={"편지 작성하기"}
                    icon={<Image src={penIcon} alt="pen icon" />}
                    size="medium"
                    color="black"
                  />
                </HandleCreateLetter>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
