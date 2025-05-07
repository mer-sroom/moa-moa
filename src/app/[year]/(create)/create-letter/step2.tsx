import Button from "../../(components)/common/Button";

interface Props {
  nextStep: () => void;
}

export default function CreateLetterStep2(props: Props) {
  const { nextStep } = props;
  return (
    <div>
      오브제 선택하는 자리
      <Button label="완성하기" size="small" color="black" onClick={nextStep} />
    </div>
  );
}
