import { authOptions } from "@/app/api/auth/authoptions";
import { getServerSession } from "next-auth/next";
import NotFound from "@/app/[year]/(components)/not-found";
import { getSentLetters } from "@/lib/sentLetter";
import Image from "next/image";

export default async function SentLetterPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NotFound();
  }

  const sentLetters = await getSentLetters(session.user.id);

  // console.log(sentLetters);
  if (!sentLetters.length) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "60vh",
          justifyContent: "center",
          opacity: "0.5",
        }}
      >
        <Image
          src="/assets/broke_cat.svg"
          alt="no moa"
          width={180}
          height={180}
        />
        <p>아직 작성한 편지가 없어요! 친구한테 작성하러 가요~</p>
      </div>
    );
  }
  return (
    <div
      style={{
        marginTop: 44,
        display: "flex",
        flexDirection: "column",
        gap: 50,
        overflowY: "auto",
        backgroundColor: "gray",
      }}
    >
      {sentLetters.map(letter => (
        <div
          key={letter.id}
          style={{
            backgroundImage: `url(${letter.letterPaperDesign.imageURL})`,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            padding: "10px 20px",
          }}
        >
          <h3>{letter.title}</h3>
          <p>{letter.content}</p>

          <p>from. {letter.authorName}</p>
          <p>to. {letter.moaBox.owner.nickname}</p>
          <p>
            {letter.createdAt.getFullYear()}년 {letter.createdAt.getMonth()}월{" "}
            {letter.createdAt.getDay()}일
          </p>
        </div>
      ))}
    </div>
  );
}
