export interface SentLetter {
  id: number;
  authorName: string;
  title: string;
  content: string;
  createdAt: Date;
  letterIconDesign: {
    imageURL: string;
  };
  letterPaperDesign: {
    imageURL: string;
  };
  moaBox: {
    owner: { nickname: string };
  };
}
