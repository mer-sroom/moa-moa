import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/authoptions";
import { getServerSession } from "next-auth/next";
import NotFound from "@/app/[year]/(components)/not-found";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { MoaBox } from "@/types/moabox";
import styles from "@/styles/SavedMoa.module.css";

export default async function SavedMoaPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NotFound();
  }
  //dueDate가 지난 모아 박스만 조회
  const savedMoaBoxes = await prisma.moaBox.findMany({
    where: {
      ownerId: session.user.id,
      dueDate: {
        lte: new Date(),
      },
    },
    include: {
      mailBoxDesign: { select: { imageURL: true } },
    },
  });
  //지난 모아박스가 없는 경우 폴백 화면(추후 수정 예정)
  if (!savedMoaBoxes.length) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "60vh",
          justifyContent: "center",
          opacity: "0.5",
        }}
      >
        <Image
          src="/assets/broke_cat.svg"
          alt="no moa"
          width={180}
          height={180}
        />
        <p>아직 종료된 모아 박스가 없어요!</p>
      </div>
    );
  }

  //모아 박스 년도별로 그룹
  const groupedByYear = savedMoaBoxes.reduce((group, moabox) => {
    //년도 추출(dueDate가 반드시 있다는 전제 하에)
    const year = new Date(moabox.dueDate).getFullYear();
    if (!group[year]) {
      group[year] = [];
    }
    //key : 년도, value : 해당년도의 모아 박스
    //ex : {2023:[23년도 모아박스1, 23년도 모아박스2 ...], 2024:[2024년도 모아박스] ... }
    group[year].push(moabox);
    return group;
  }, {} as Record<number, MoaBox[]>); //값 초기화
  // console.log(groupedByYear);

  const sortedYears = Object.keys(groupedByYear) //내림차순 정렬
    .map(Number)
    .sort((a, b) => b - a);
  // console.log(sortedYears);

  return (
    <div className={styles.container}>
      {/* 년도별 카테고리 */}
      {sortedYears.map(year => (
        <section key={year} className={styles.yearSection}>
          <div className={styles.yearHeader}>
            <p className={styles.yearTitle}>{year} 모아 보관함</p>
            {/* <hr className={styles.divideLine} /> */}
          </div>
          <div className={styles.moaBoxesWrapper}>
            {/* 각각 모아박스 */}
            {groupedByYear[year].map(moaBox => (
              <Link
                href={`/2025/moa/mymoa/${moaBox.id}`}
                key={moaBox.id}
                className={styles.moaBoxLink}
              >
                <div
                  className={styles.moaBoxImage}
                  style={{
                    backgroundImage: `url(${moaBox.mailBoxDesign.imageURL})`,
                  }}
                />
                <p className={styles.moaBoxTitle}>{moaBox.title}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
