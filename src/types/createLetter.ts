export interface createdLetter {
  moaBoxId: number;
  authorId: string;
  authorName: string;
  theme?: string;
  title: string;
  content: string;
  trackId: string;
  letterIconDesign: number;
  letterPaperDesign: number;
  createdAt: Date;
  updatedAt?: Date;
}
