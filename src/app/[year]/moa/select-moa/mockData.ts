//목업 데이터 (moaBox 테이블)
export const mockMoaBoxes: MoaBox[] = [
  {
    id: 1,
    ownerId: "user123",
    title: "광기의 모아",
    isGroup: false,
    dueDate: null,
    isPublic: false,
    allowAnonymous: false,
    shareLink: "",
    letterCountPublic: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    ownerId: "user456",
    title: "생일 기념 모아",
    isGroup: false,
    dueDate: null,
    isPublic: false,
    allowAnonymous: false,
    shareLink: "",
    letterCountPublic: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    ownerId: "user456",
    title: "테슷트",
    isGroup: false,
    dueDate: null,
    isPublic: false,
    allowAnonymous: false,
    shareLink: "",
    letterCountPublic: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export interface MoaBox {
  id: number;
  ownerId: string;
  title: string;
  isGroup: boolean;
  dueDate: Date | null;
  isPublic: boolean;
  allowAnonymous: boolean;
  shareLink: string | null;
  letterCountPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SelectCarouselProps {
  friendId?: string;
  moaBoxes: MoaBox[];
}
