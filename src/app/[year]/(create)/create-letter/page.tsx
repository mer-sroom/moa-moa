'use client'
import Button from "../../(components)/common/Button";
import DotNav from "../(components)/DotNav";
import { useState } from "react";
import CreateLetterStep1 from "./step1";
import CreateLetterStep2 from "./step2";
import CreateLetterStep3 from "./step3";
import CreateLetterStep4 from "./step4";
import CreateLetterStep5 from "./step5";
import CreateLetterStep6 from "./step6";

export default function CreateLetterStep() {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));

  const renderDot = () => {
    switch (step) {
      case 1: return <DotNav color1="black" color2="gray" color3="gray" color4="gray"></DotNav>;
      case 2: return <DotNav color1="black" color2="gray" color3="gray" color4="gray"></DotNav>;
      case 3: return <DotNav color1="gray" color2="black" color3="gray" color4="gray"></DotNav>;
      case 4: return <DotNav color1="gray" color2="gray" color3="black" color4="gray"></DotNav>;
      case 5: return <DotNav color1="gray" color2="gray" color3="gray" color4="black"></DotNav>;
      case 6: return null;
      default: return null;
    }
  };

  const renderButton = () => {
    switch (step) {
      case 1: return <Button label="편지 작성하기" size="next" color="black" onClick={nextStep}></Button>;
      case 2: return <Button label="완성하기" size="small" color="black" onClick={nextStep}></Button>;
      case 3: return <Button label="작성 완료" size="next" color="black" onClick={nextStep}></Button>;
      case 4: return <div>
        <Button label="노래 선택하기" size="next" color="black" onClick={nextStep}></Button>
        <Button label="다음으로" size="next" color="black" onClick={nextStep}></Button>
      </div>;
      case 5: return <Button label="편지 보내기" size="next" color="black" onClick={nextStep}></Button>;
      case 6: return null;
      default: return null;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <CreateLetterStep1></CreateLetterStep1>;
      case 2: return <CreateLetterStep2></CreateLetterStep2>;
      case 3: return <CreateLetterStep3></CreateLetterStep3>;
      case 4: return <CreateLetterStep4></CreateLetterStep4>;
      case 5: return <CreateLetterStep5></CreateLetterStep5>;
      case 6: return <CreateLetterStep6></CreateLetterStep6>;
      default: return null;
    }
  };

  return (
    <div>
      {renderDot()}
      {renderStep()}
      {renderButton()}
    </div>
  );
}
