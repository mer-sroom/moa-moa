const { PrismaClient, UserRole } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  /* 1️⃣ 디자인 마스터 (배경·우편함) */
  const [bgDesign, boxDesign] = await Promise.all([
    prisma.backgroundDesign.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: "Default BG",
        imageURL: "/assets/mock/bg_default.svg",
      },
    }),
    prisma.mailBoxDesign.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: "Default MailBox",
        imageURL: "/assets/mock/box_default.svg",
      },
    }),
  ]);

  /* 2️⃣ 편지 디자인 기본값 추가 (★ 추가) */
  const [paperDesign, iconDesign] = await Promise.all([
    prisma.letterPaperDesign.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: "Default Letter Paper",
        imageURL: "/assets/mock/letter_paper.svg",
      },
    }),
    prisma.letterIconDesign.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: "Default Letter Icon",
        imageURL: "/assets/mock/letter_icon.svg",
      },
    }),
  ]);

  /* 3️⃣ 유저 upsert */
  const user = await prisma.user.upsert({
    where: { id: "9e75dabc-363d-4904-bde9-866b6e0e4af0" },
    update: {
      nickname: "Freshman",
      image:
        "https://phinf.pstatic.net/contact/20210513_74/1620915151149fnok9_GIF/KakaoTalk_20210503_003848951.gif",
    },
    create: {
      id: "9e75dabc-363d-4904-bde9-866b6e0e4af0",
      email: "gogo981004@naver.com",
      emailVerified: new Date("2025-05-01T06:36:41.878Z"),
      name: "Freshman",
      nickname: "Freshman",
      image:
        "https://phinf.pstatic.net/contact/20210513_74/1620915151149fnok9_GIF/KakaoTalk_20210503_003848951.gif",
      role: UserRole.USER,
    },
  });

  /* 4️⃣ MoaBox 생성 */
  const moaBox = await prisma.moaBox.create({
    data: {
      ownerId: user.id,
      title: "프론트엔드 팀 모아",
      isGroup: false,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 뒤
      isPublic: true,
      allowAnonymous: true,
      shareLink: "https://moa.test/mock/share",
      letterCountPublic: true,
      backgroundDesignId: bgDesign.id,
      mailBoxDesignId: boxDesign.id,
    },
  });

  /* 5️⃣ 목업 편지 3개 */
  await prisma.letter.createMany({
    data: [
      {
        moaBoxId: moaBox.id,
        authorId: user.id,
        title: "환영합니다!",
        content: "우리 모아에 첫 편지를 남겨요😊",
        isOpened: false,
        letterPaperDesignId: paperDesign.id,
        letterIconDesignId: iconDesign.id,
      },
      {
        moaBoxId: moaBox.id,
        authorName: "익명의 팬",
        content: "항상 응원해요!",
        isOpened: false,
        letterPaperDesignId: paperDesign.id,
        letterIconDesignId: iconDesign.id,
      },
      {
        moaBoxId: moaBox.id,
        authorName: "익명의 동료",
        content: "오늘도 파이팅!",
        isOpened: true,
        letterPaperDesignId: paperDesign.id,
        letterIconDesignId: iconDesign.id,
      },
    ],
  });

  console.log("✅  Seed completed!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
