//모아 박스
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

export interface SelectCarouselProps {
  friendId?: string;
  moaBoxes: MoaBox[];
}
