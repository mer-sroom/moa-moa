import Button from "../../(components)/common/Button";

interface Props {
  nextStep: () => void;
}

export default function CreateLetterStep3(props: Props) {
  const { nextStep } = props;
  return (
    <>
      <h1>Create Letter - Step Page</h1>
      <Button
        label="작성 완료"
        size="medium"
        color="black"
        onClick={nextStep}
      />
    </>
  );
}
