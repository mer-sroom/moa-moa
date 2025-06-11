// prisma/seed.ts  (CommonJS 버전)
const { PrismaClient, UserRole } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  /* 1️⃣ 배경 · 우편함 · 장식  ── 3개씩 */
  await prisma.backgroundDesign.createMany({
    data: [
      {
        id: 1,
        name: "BG-1",
        imageURL: "/assets/icons/create_moa/step2_background.svg",
      },
      {
        id: 2,
        name: "BG-2",
        imageURL: "/assets/icons/create_moa/background-2.svg",
      },
      {
        id: 3,
        name: "BG-3",
        imageURL: "/assets/icons/create_moa/background-3.svg",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.mailBoxDesign.createMany({
    data: [
      {
        id: 1,
        name: "Box-1",
        imageURL: "/assets/icons/create_moa/step2_back.svg",
      },
      { id: 2, name: "Box-2", imageURL: "/assets/icons/create_moa/box-2.svg" },
      { id: 3, name: "Box-3", imageURL: "/assets/icons/create_moa/box-3.svg" },
    ],
    skipDuplicates: true,
  });

  await prisma.letterIconDesign.createMany({
    data: [
      {
        id: 1,
        name: "Deco-Star",
        imageURL: "/assets/icons/create_moa/deco-star.svg",
      },
      {
        id: 2,
        name: "Deco-Heart",
        imageURL: "/assets/icons/create_moa/deco-heart.svg",
      },
      {
        id: 3,
        name: "Deco-Ribbon",
        imageURL: "/assets/icons/create_moa/deco-ribbon.svg",
      },
    ],
    skipDuplicates: true,
  });

  /* 2️⃣(선택) 편지지 기본값 하나만 */
  await prisma.letterPaperDesign.createMany({
    data: [
      {
        id: 1,
        name: "Paper-Default",
        imageURL: "/assets/mock/letter_paper.svg",
      },
    ],
    skipDuplicates: true,
  });

  /* 3️⃣ 테스트 유저 (이미 있으면 업데이트) */
  const user = await prisma.user.upsert({
    where: { id: "9e75dabc-363d-4904-bde9-866b6e0e4af0" },
    update: { nickname: "Freshman" },
    create: {
      id: "9e75dabc-363d-4904-bde9-866b6e0e4af0",
      email: "gogo981004@naver.com",
      nickname: "Freshman",
      role: UserRole.USER,
    },
  });

  /* 4️⃣ 목업 MoaBox 하나 만들어 두기 */
  await prisma.moaBox.create({
    data: {
      ownerId: user.id,
      title: "시드용 모아",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3일 뒤
      shareLink: "seed-sample",
      backgroundDesignId: 1,
      mailBoxDesignId: 1,
    },
  });

  console.log("✅  seed 완료!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
