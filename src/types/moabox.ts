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

// 공통 필드
export interface LetterBase {
  id: number;
  authorName: string;
  isOpened: boolean;
  letterIconDesign: {
    imageURL: string;
  };
}

// 상세보기에서 필요한 전체 데이터 타입
export interface LetterDetail extends LetterBase {
  letterPaperDesignId: number;
  title: string;
  content: string;
  theme: string;
  createdAt: Date;
  updatedAt: Date;
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
