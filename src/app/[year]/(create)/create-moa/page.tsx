"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CreateMoaStep1 from "./step1";
import CreateMoaStep2 from "./step2";
import CreateMoaStep3 from "./step3";
import CreateMoaStep4 from "./step4";
import CreateMoaStep5 from "./step5";

import DotNav from "../(components)/DotNav";
import layout from "@/styles/create-moa/StepLayout.module.css";
import CreateMoaProvider from "@/contexts/CreateMoaContext";

export default function CreateMoaPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [previewBg, setPreviewBg] = useState<string | null>(null);

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const goSelectMoa = () => router.push("/2025/moa/select-moa");
  const handleBgChange = (url: string) => setPreviewBg(url);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CreateMoaStep1 nextStep={nextStep} />;
      case 2:
        return (
          <CreateMoaStep2 nextStep={nextStep} onBgChange={handleBgChange} />
        );
      case 3:
        return <CreateMoaStep3 nextStep={nextStep} />;
      case 4:
        return <CreateMoaStep4 nextStep={nextStep} />;
      case 5:
        return <CreateMoaStep5 />;
      default:
        return null;
    }
  };

  const colors = Array(5).fill("gray");
  colors[step - 1] = "black";

  return (
    <CreateMoaProvider onSuccess={nextStep}>
      <div
        className={layout.wrapper}
        style={
          step === 2 && previewBg
            ? { background: `url(${previewBg}) center / cover no-repeat` }
            : {}
        }
      >
        <DotNav colors={colors} onClick={i => setStep(i + 1)} />
        {renderStep()}
      </div>
    </CreateMoaProvider>
  );
}
