import Button from "../../../(components)/common/Button";

interface Props {
  nextStep: () => void;
}

export default function CreateLetterStep5(props: Props) {
  const { nextStep } = props;
  return (
    <>
      <div>최종 편지지 확인하는 자리</div>{" "}
      <Button
        label="편지 보내기"
        size="medium"
        color="black"
        onClick={nextStep}
      />
    </>
  );
}
