import Button from "../../(components)/common/Button";

interface Props {
  nextStep: () => void;
}

export default function CreateLetterStep4(props: Props) {
  const { nextStep } = props;
  return (
    <>
      <h1>Create Letter - Step Page</h1>
      <div>
        <Button
          label="노래 선택하기"
          size="medium"
          color="black"
          onClick={nextStep}
        ></Button>
        <Button
          label="다음으로"
          size="medium"
          color="white"
          onClick={nextStep}
        ></Button>
      </div>
    </>
  );
}
