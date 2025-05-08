"use client";
import DotNav from "../(components)/DotNav";
import { useState } from "react";

import CreateLetterStep1 from "./step1";
import CreateLetterStep2 from "./step2";
import CreateLetterStep3 from "./step3";
import CreateLetterStep4 from "./step4";
import CreateLetterStep5 from "./step5";
import CreateLetterStep6 from "./step6";

export default function CreateLetterStep() {
  // 현재 단계 state
  const [step, setStep] = useState(1);
  // 다음 단계로 이동 (최대 6단계까지 제한)
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));

  // 단계별 dot 색상 표시 및 클릭 시 해당 단계로 이동
  const renderDot = () => {
    if (step >= 6) return null;

    const colors = Array(5).fill("gray");
    const activeIndex = step - 1;
    if (activeIndex >= 0 && activeIndex < 5) {
      colors[activeIndex] = "black"; // 현재 step을 검정으로 표시
    }

    return <DotNav colors={colors} onClick={(i) => setStep(i + 1)} />;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CreateLetterStep1 nextStep={nextStep} />;
      case 2:
        return <CreateLetterStep2 nextStep={nextStep} />;
      case 3:
        return <CreateLetterStep3 nextStep={nextStep} />;
      case 4:
        return <CreateLetterStep4 nextStep={nextStep} />;
      case 5:
        return <CreateLetterStep5 nextStep={nextStep} />;
      case 6:
        return <CreateLetterStep6 />;
      default:
        return null;
    }
  };

  function setCurrentStep(arg0: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      {renderDot()}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {renderStep()}
      </div>
    </>
  );
}
