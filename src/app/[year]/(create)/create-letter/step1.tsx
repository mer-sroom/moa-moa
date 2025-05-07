import Button from "../../(components)/common/Button";

interface Props {
  nextStep: () => void;
}

export default function CreateLetterStep1(props: Props) {
  const { nextStep } = props;
  return (
    <>
      <h1>Create Letter - Step Page</h1>
      <Button
        label="편지 작성하기"
        size="medium"
        color="black"
        onClick={nextStep}
      />
    </>
  );
}
