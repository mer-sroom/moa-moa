import type { MoaBox } from "@/types/select-moa";

export interface Letter {
  id: number;
  moaBoxId: number;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  theme: string;
  isOpened: boolean;
  createdAt: Date;
  updatedAt: Date;
  letterIconDesignId: number;
  letterPaperDesignId: number;
}

export interface BackgroundDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MailBoxDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LetterPaperDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LetterIconDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}
//목업 유저
export const mockUser = { id: "user999", name: "머메이드드" };

//목업 데이터 (moaBox 테이블)
export const mockMoaBoxes: MoaBox[] = [
  {
    id: 1,
    ownerId: "user999",
    title: "광기의 모아",
    isGroup: false,
    dueDate: new Date(),
    isPublic: false,
    allowAnonymous: false,
    shareLink: "http://example.com/share/1",
    letterCountPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    backgroundDesignId: 1,
    mailBoxDesignId: 1,
  },
  {
    id: 2,
    ownerId: "user999",
    title: "생일 축하해줘",
    isGroup: false,
    dueDate: new Date(),
    isPublic: false,
    allowAnonymous: false,
    shareLink: "http://example.com/share/2",
    letterCountPublic: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    backgroundDesignId: 2,
    mailBoxDesignId: 2,
  },
];

// 목업 데이터: letter 배열
export const mockLetters = [
  {
    id: 1,
    moaBoxId: 1,
    authorId: "user123",
    authorName: "Author One",
    title: "First Letter",
    content: "This is the first letter.",
    theme: "theme1",
    isOpened: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    letterPaperDesignId: 1,
    letterIconDesignId: 1,
  },
  {
    id: 234,
    moaBoxId: 1,
    authorId: "user123",
    authorName: "ㄴㅇㄹㅇㄴㄹㅇㄹㄹ",
    title: "First Letter",
    content: "This is the first letter.",
    theme: "theme1",
    isOpened: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    letterPaperDesignId: 1,
    letterIconDesignId: 1,
  },
  {
    id: 4563,
    moaBoxId: 1,
    authorId: "user123",
    authorName: "ㅁㄴㅇㄴㅁㅇㅇ",
    title: "First Letter",
    content: "This is the first letter.",
    theme: "theme1",
    isOpened: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    letterPaperDesignId: 1,
    letterIconDesignId: 1,
  },
  {
    id: 23434,
    moaBoxId: 1,
    authorId: "user123",
    authorName: "캭캭",
    title: "First Letter",
    content: "This is the first letter.",
    theme: "theme1",
    isOpened: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    letterPaperDesignId: 1,
    letterIconDesignId: 1,
  },
  {
    id: 456546,
    moaBoxId: 1,
    authorId: "user123",
    authorName: "안농농",
    title: "First Letter",
    content: "This is the first letter.",
    theme: "theme1",
    isOpened: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    letterPaperDesignId: 1,
    letterIconDesignId: 1,
  },
  {
    id: 452346546,
    moaBoxId: 1,
    authorId: "user123",
    authorName: "벡벡벡벡벡벡벡벡벡벡",
    title: "First Letter",
    content: "This is the first letter.",
    theme: "theme1",
    isOpened: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    letterPaperDesignId: 1,
    letterIconDesignId: 1,
  },
  {
    id: 456234546,
    moaBoxId: 1,
    authorId: "user123",
    authorName: "빙빙",
    title: "First Letter",
    content: "This is the first letter.",
    theme: "theme1",
    isOpened: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    letterPaperDesignId: 1,
    letterIconDesignId: 1,
  },
  {
    id: 2,
    moaBoxId: 1,
    authorId: "author2",
    authorName: "Author Two",
    title: "Second Letter",
    content: "This is the second letter.",
    theme: "theme2",
    isOpened: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    letterPaperDesignId: 2,
    letterIconDesignId: 2,
  },
  {
    id: 5468,
    moaBoxId: 2,
    authorId: "author2",
    authorName: "안녕..",
    title: "Second Letter",
    content: "This is the second letter.",
    theme: "theme2",
    isOpened: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    letterPaperDesignId: 2,
    letterIconDesignId: 3,
  },
];

// BackgroundDesign 목업 데이터
export const mockBackgroundDesigns: BackgroundDesign[] = [
  {
    id: 1,
    name: "Default Background",
    imageURL:
      "https://i.pinimg.com/736x/57/37/74/573774fddb7b2069ced7ec49b859814e.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Special Background",
    imageURL:
      "https://i.pinimg.com/736x/5b/00/67/5b0067a8e79d64af95aa49088904edd0.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// MailBoxDesign 목업 데이터
export const mockMailBoxDesigns: MailBoxDesign[] = [
  {
    id: 1,
    name: "House MailBox",
    imageURL:
      "https://i.pinimg.com/originals/d0/2a/c5/d02ac5677cc7b056484ce9f622b0d72a.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Fish Tank MailBox",
    imageURL:
      "https://www.pngall.com/wp-content/uploads/4/Aquarium-Fish-Tank-PNG-Image.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// LetterPaperDesign 목업 데이터
export const mockLetterPaperDesigns: LetterPaperDesign[] = [
  {
    id: 1,
    name: "Standard Paper",
    imageURL: "/images/letter/paper_default.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Elegant Paper",
    imageURL: "/images/letter/paper_elegant.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// LetterIconDesign 목업 데이터
export const mockLetterIconDesigns: LetterIconDesign[] = [
  {
    id: 1,
    name: "cherry",
    imageURL:
      "https://images.vexels.com/media/users/3/294731/isolated/preview/67317bd09b94882cdeda7ea95e2b9d09-self-esteem-cherry-cute-icon.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "flower",
    imageURL:
      "https://images.vexels.com/media/users/3/294729/isolated/preview/c873a2bc381b57447a355d10d6fd1eee-self-esteem-flower-cute-icon.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "fish",
    imageURL:
      "https://static.vecteezy.com/system/resources/previews/037/446/548/non_2x/goldfish-isolated-on-transparent-background-ornamental-fish-generative-ai-png.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
