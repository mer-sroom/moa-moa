"use client";
import { mockLetterPaperDesigns, mockLetterIconDesigns } from "../mockData";

export default function LetterItem({
  id,
  name,
  isOpened,
  paperDesignId,
  iconDesignId,
}: {
  id: number;
  name: string;
  isOpened: boolean;
  paperDesignId: number;
  iconDesignId: number;
}) {
  //편지 읽음
  //디자인 정보 불러오기
  const PaperDesign = mockLetterPaperDesigns.find(
    design => design.id === paperDesignId
  );
  const IconDesign = mockLetterIconDesigns.find(
    design => design.id === iconDesignId
  );
  //편지 오픈 핸들러
  const handleOpenLetter = id => {
    console.log(id);
  };
  console.log(isOpened);

  return (
    <div
      style={isOpened ? { opacity: "30%" } : {}}
      onClick={() => {
        handleOpenLetter(id);
        isOpened = true;
      }}
    >
      {/* 편지 아이콘 */}
      <div
        style={{
          height: "52px",
          width: "70px",
          cursor: "pointer",
          backgroundImage: `url(${IconDesign.imageURL})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          // backgroundColor: "wheat",
          // boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.25)",
        }}
      ></div>
      {/* 편지 작성한 사람 */}
      <p
        style={{
          margin: "0",
          paddingTop: "4px",
          fontSize: "10px",
          textAlign: "center",
          // boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.25)",
          textShadow: "0px 10px 2px 2px rgba(0, 0, 0, 0.9)",
          // mixBlendMode: "difference",
          // color: "blue",
        }}
      >
        {name}
      </p>
    </div>
  );
}
