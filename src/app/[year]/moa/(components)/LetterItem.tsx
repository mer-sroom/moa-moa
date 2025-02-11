import {
  mockLetterPaperDesigns,
  mockLetterIconDesigns,
} from "../mymoa/[id]/mockdata";

export default function LetterItem({
  id,
  name,
  paperDesignId,
  iconDesignId,
}: {
  id: number;
  name: string;
  paperDesignId: number;
  iconDesignId: number;
}) {
  //디자인 정보 불러오기
  const PaperDesign = mockLetterPaperDesigns.find(
    design => design.id === paperDesignId
  );
  const IconDesign = mockLetterIconDesigns.find(
    design => design.id === iconDesignId
  );
  //   console.log(PaperDesignURL.imageURL);
  //   console.log(IconDesignURL.imageURL);

  return (
    <div>
      <div
        style={{
          height: "52px",
          backgroundImage: `url(${IconDesign})`,
          backgroundColor: "wheat",
          boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.25)",
        }}
      ></div>
      <p
        style={{
          margin: "0",
          paddingTop: "4px",
          fontSize: "10px",
          textAlign: "center",
        }}
      >
        {name}
      </p>
    </div>
  );
}
