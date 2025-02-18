//모아박스 타입
export type MoaBox = {
  id: number;
  ownerId: string;
  title: string;
  isGroup: boolean;
  dueDate: Date;
  isPublic: boolean;
  allowAnonymous: boolean;
  shareLink: string | null;
  letterCountPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  backgroundDesignId: number | null;
  mailBoxDesignId: number | null;
};

//편지 타입
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
//마이 모아 배경 디자인 타입
export interface BackgroundDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}
//모아 박스 디자인 타입
export interface MailBoxDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}
//편지지 디자인 타입
export interface LetterPaperDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}
//편지 아이콘 디자인 타입
export interface LetterIconDesign {
  id: number;
  name: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}
