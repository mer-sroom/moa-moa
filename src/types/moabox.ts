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

// 편지 미리보기(아이콘 형태일 때)
export interface LetterBase {
  id: number;
  authorName: string;
  isOpened: boolean;
  letterIconDesign: {
    imageURL: string; // 편지 아이콘 이미지 URL
  };
}

// 편지 상세보기(모달 형태일때 추가적으로 요청되는 데이터)
export interface LetterDetail {
  title: string;
  content: string;
  letterPaperDesign: {
    imageURL: string; // 편지지 이미지 URL
  };
  moaBox: {
    ownerId: string; // 나중에 검증을 위한 ownerId
  };
  trackId?: string | null; // spotify track ID
}

//편지 정보를 모두 합친 타입
export type Letter = LetterBase & LetterDetail;

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
