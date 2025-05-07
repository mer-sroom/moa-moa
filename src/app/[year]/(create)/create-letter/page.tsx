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
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));

  const renderDot = () => {
    switch (step) {
      case 1:
        return (
          <DotNav
            color1="black"
            color2="gray"
            color3="gray"
            color4="gray"
          ></DotNav>
        );
      case 2:
        return (
          <DotNav
            color1="black"
            color2="gray"
            color3="gray"
            color4="gray"
          ></DotNav>
        );
      case 3:
        return (
          <DotNav
            color1="gray"
            color2="black"
            color3="gray"
            color4="gray"
          ></DotNav>
        );
      case 4:
        return (
          <DotNav
            color1="gray"
            color2="gray"
            color3="black"
            color4="gray"
          ></DotNav>
        );
      case 5:
        return (
          <DotNav
            color1="gray"
            color2="gray"
            color3="gray"
            color4="black"
          ></DotNav>
        );
      case 6:
        return null;
      default:
        return null;
    }
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {renderDot()}
      {renderStep()}
    </div>
  );
}
