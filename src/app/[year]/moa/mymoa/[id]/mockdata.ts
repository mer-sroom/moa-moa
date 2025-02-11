import background1 from "../../../../../../public/assets/background1.jpg";
import { StaticImageData } from "next/image";
export interface MoaBox {
  id: number;
  ownerId: string;
  title: string;
  isGroup: number;
  dueDate: string; // ISO 문자열로 저장
  isPublic: number;
  allowAnonymous: number;
  shareLink: string;
  letterCountPublic: number;
  createdAt: string;
  updatedAt: string;
  backgroundDesignId: number;
  mailBoxDesignId: number;
}

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
  imageURL: string | StaticImageData;
  createdAt: string;
  updatedAt: string;
}

export interface MailBoxDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
}

export interface LetterPaperDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
}

export interface LetterIconDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
}

// 목업 데이터: moaBox 배열
export const mockMoaBoxes: MoaBox[] = [
  {
    id: 1,
    ownerId: "user1",
    title: "광기의 모아아",
    isGroup: 0,
    dueDate: "2025-03-01T00:00:00.000Z",
    isPublic: 1,
    allowAnonymous: 1,
    shareLink: "http://example.com/share/1",
    letterCountPublic: 2,
    createdAt: "2025-01-01T12:00:00.000Z",
    updatedAt: "2025-01-02T12:00:00.000Z",
    backgroundDesignId: 1,
    mailBoxDesignId: 1,
  },
  {
    id: 2,
    ownerId: "user2",
    title: "생일 축하해줘줘",
    isGroup: 0,
    dueDate: "2025-04-01T00:00:00.000Z",
    isPublic: 0,
    allowAnonymous: 0,
    shareLink: "http://example.com/share/2",
    letterCountPublic: 0,
    createdAt: "2025-02-01T12:00:00.000Z",
    updatedAt: "2025-02-02T12:00:00.000Z",
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
];

// BackgroundDesign 목업 데이터
export const mockBackgroundDesigns: BackgroundDesign[] = [
  {
    id: 1,
    name: "Default Background",
    imageURL:
      "https://i.pinimg.com/736x/57/37/74/573774fddb7b2069ced7ec49b859814e.jpg",
    createdAt: "2025-01-01T12:00:00.000Z",
    updatedAt: "2025-01-01T12:00:00.000Z",
  },
  {
    id: 2,
    name: "Special Background",
    imageURL: "/images/background/special.jpg",
    createdAt: "2025-01-01T12:00:00.000Z",
    updatedAt: "2025-01-01T12:00:00.000Z",
  },
];

// MailBoxDesign 목업 데이터
export const mockMailBoxDesigns: MailBoxDesign[] = [
  {
    id: 1,
    name: "Default MailBox",
    imageURL: "/images/mailbox/default.jpg",
    createdAt: "2025-01-01T12:00:00.000Z",
    updatedAt: "2025-01-01T12:00:00.000Z",
  },
  {
    id: 2,
    name: "Fancy MailBox",
    imageURL: "/images/mailbox/fancy.jpg",
    createdAt: "2025-01-01T12:00:00.000Z",
    updatedAt: "2025-01-01T12:00:00.000Z",
  },
];

// LetterPaperDesign 목업 데이터
export const mockLetterPaperDesigns: LetterPaperDesign[] = [
  {
    id: 1,
    name: "Standard Paper",
    imageURL: "/images/letter/paper_default.jpg",
    createdAt: "2025-01-01T12:00:00.000Z",
    updatedAt: "2025-01-01T12:00:00.000Z",
  },
  {
    id: 2,
    name: "Elegant Paper",
    imageURL: "/images/letter/paper_elegant.jpg",
    createdAt: "2025-01-01T12:00:00.000Z",
    updatedAt: "2025-01-01T12:00:00.000Z",
  },
];

// LetterIconDesign 목업 데이터
export const mockLetterIconDesigns: LetterIconDesign[] = [
  {
    id: 1,
    name: "white cat",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/2048px-Approve_icon.svg.png",
    createdAt: "2025-01-01T12:00:00.000Z",
    updatedAt: "2025-01-01T12:00:00.000Z",
  },
  {
    id: 2,
    name: "white clover",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/2048px-Approve_icon.svg.png",
    createdAt: "2025-01-01T12:00:00.000Z",
    updatedAt: "2025-01-01T12:00:00.000Z",
  },
];
