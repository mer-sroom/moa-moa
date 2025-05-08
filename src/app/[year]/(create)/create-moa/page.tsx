"use client";

import { useState } from "react";
import CreateMoaStep1 from "./step1";
import CreateMoaStep2 from "./step2";
import CreateMoaStep3 from "./step3";
import CreateMoaStep4 from "./step4";
import CreateMoaStep5 from "./step5";
import Button from "../../(components)/common/Button";
import DotNav from "../(components)/DotNav";

export default function CreateMoaStep() {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));

  const renderButton = () => {
    switch (step) {
      case 1:
        return (
          <Button
            label="모아 생성하기"
            size="next"
            color="black"
            onClick={nextStep}
          ></Button>
        );
      case 2:
        return (
          <Button
            label="다음으로"
            size="small"
            color="black"
            onClick={nextStep}
          ></Button>
        );
      case 3:
        return (
          <Button
            label="다음으로"
            size="next"
            color="black"
            onClick={nextStep}
          ></Button>
        );
      case 4:
        return (
          <Button
            label="생성하기"
            size="next"
            color="black"
            onClick={nextStep}
          ></Button>
        );
      case 5:
        return (
          <Button
            label="메인으로"
            size="next"
            color="black"
            onClick={nextStep}
          ></Button>
        );
      default:
        return null;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CreateMoaStep1></CreateMoaStep1>;
      case 2:
        return <CreateMoaStep2></CreateMoaStep2>;
      case 3:
        return <CreateMoaStep3></CreateMoaStep3>;
      case 4:
        return <CreateMoaStep4></CreateMoaStep4>;
      case 5:
        return <CreateMoaStep5></CreateMoaStep5>;
      default:
        return null;
    }
  };

  const renderDot = () => {
    if (step >= 6) return null;

    const colors = Array(5).fill("gray");
    const activeIndex = step - 1;
    if (activeIndex >= 0 && activeIndex < 5) {
      colors[activeIndex] = "black"; // 현재 step을 검정으로 표시
    }

    return <DotNav colors={colors} onClick={(i) => setStep(i + 1)} />;
  };
  console.log(step);

  return (
    <div>
      {renderDot()}
      {renderStep()}
      {renderButton()}
    </div>
  );
}
