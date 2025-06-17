import { useState } from "react";
import Button from "../../../(components)/common/Button";
import GuideModal from "@/app/[year]/(components)/common/GuideModal";
import img from '/public/assets/service-imgs/guide/create_letter.png';

interface Props {
  nextStep: () => void;
}

export default function CreateLetterStep2(props: Props) {
  const { nextStep } = props;
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);
  return (
    <div>
      오브제 선택하는 자리
      <GuideModal isOpen={isOpen} img={img} onClose={onClose} />
      <Button label="완성하기" size="small" color="black" onClick={nextStep} />
    </div>
  );
}
