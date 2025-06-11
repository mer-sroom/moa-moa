const { PrismaClient, UserRole } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  /* ──────────────────────────────── 1) 모아 장식 3종 ──────────────────────────────── */
  await prisma.moaDecorationDesign.createMany({
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
    skipDuplicates: true, // 이미 존재하면 무시
  });

  /* ──────────────────────────────── 2) 배경 디자인 3종 (upsert) ──────────────────────────────── */
  const bgSeed = [
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
  ];

  for (const bg of bgSeed) {
    await prisma.backgroundDesign.upsert({
      where: { id: bg.id },
      update: { name: bg.name, imageURL: bg.imageURL }, // 덮어쓰기
      create: bg,
    });
  }

  /* ──────────────────────────────── 3) 우편함 디자인 3종 (upsert) ──────────────────────────────── */
  const boxSeed = [
    {
      id: 1,
      name: "Box-1",
      imageURL: "/assets/icons/create_moa/step2_back.svg",
    },
    { id: 2, name: "Box-2", imageURL: "/assets/icons/create_moa/box-2.svg" },
    { id: 3, name: "Box-3", imageURL: "/assets/icons/create_moa/box-3.svg" },
  ];

  for (const box of boxSeed) {
    await prisma.mailBoxDesign.upsert({
      where: { id: box.id },
      update: { name: box.name, imageURL: box.imageURL },
      create: box,
    });
  }

  /* ──────────────────────────────── 4) 편지 아이콘(선택) & 편지지 기본값 ──────────────────────────────── */
  await prisma.letterIconDesign.createMany({
    data: [
      {
        id: 1,
        name: "LetterIcon-Default",
        imageURL: "/assets/mock/letter_icon.svg",
      },
    ],
    skipDuplicates: true,
  });

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

  /* ──────────────────────────────── 5) 테스트 유저 upsert ──────────────────────────────── */
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

  /* ──────────────────────────────── 6) 목업 MoaBox 하나 ──────────────────────────────── */
  await prisma.moaBox.create({
    data: {
      ownerId: user.id,
      title: "시드용 모아",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3일 뒤
      shareLink: "seed-sample",
      backgroundDesignId: 1,
      mailBoxDesignId: 1,
      decorationDesignId: 1, // ⭐ 원하는 모아 장식(id) 지정
    },
  });

  console.log("✅  seed 완료!");
}

/* 실행 */
main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
