import { authOptions } from "@/app/api/auth/authoptions";
import { getServerSession } from "next-auth/next";
import NotFound from "@/app/[year]/(components)/not-found";
import { getSentLetters } from "@/lib/sentLetter";
import Image from "next/image";
import OpenSentLetter from "@/app/[year]/sent-letter/(components)/OpenSentLetter";

export default async function SentLetterPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NotFound();
  }
  const sentLetters = await getSentLetters(session.user.id);

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
        <p style={{ textAlign: "center" }}>
          작성한 편지가 없습니다.
          <br />
          친구에게 첫 편지를 작성해보세요!
        </p>
      </div>
    );
  }
  return (
    <div
      style={{
        marginTop: 44,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        overflowY: "auto",
      }}
    >
      {sentLetters.map(letter => (
        <OpenSentLetter letter={letter} key={letter.id}>
          <div
            style={{
              backgroundImage: `url(${letter.letterPaperDesign.imageURL})`,
              // width: "100%",
              height: "100%",
              backgroundSize: "cover",
              padding: "10px 20px",
              borderRadius: 16,
              boxShadow: "0px 4px 4px 0px var(--color-gray-400)",
            }}
          >
            <p>to. {letter.moaBox.owner.nickname}</p>

            <h4>{letter.title}</h4>
            <p style={{ fontSize: 14 }}>{letter.content}</p>

            {/* <p>from. {letter.authorName}</p> */}
            <p style={{ textAlign: "right" }}>
              {letter.createdAt.getFullYear()}년 {letter.createdAt.getMonth()}월{" "}
              {letter.createdAt.getDay()}일
            </p>
          </div>
        </OpenSentLetter>
      ))}
    </div>
  );
}
