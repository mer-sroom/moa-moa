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
