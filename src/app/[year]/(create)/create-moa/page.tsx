'use client';

import { useState } from 'react';
import CreateMoaStep1 from "./step1"
import CreateMoaStep2 from "./step2"
import CreateMoaStep3 from "./step3"
import CreateMoaStep4 from "./step4"
import CreateMoaStep5 from "./step5"
import Button from "../../(components)/common/Button";
import DotNav from "../(components)/DotNav";
import { useRouter } from 'next/navigation';


export default function CreateMoaStep() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const goSelectMoa = () => router.push('/2025/moa/select-moa');

  const renderStep = () => {
    switch (step) {
      case 1: return <CreateMoaStep1 nextStep={nextStep}></CreateMoaStep1>;
      case 2: return <CreateMoaStep2 nextStep={nextStep}></CreateMoaStep2>;
      case 3: return <CreateMoaStep3 nextStep={nextStep}></CreateMoaStep3>;
      case 4: return <CreateMoaStep4 nextStep={nextStep}></CreateMoaStep4>;
      case 5: return <CreateMoaStep5 goSelectMoa={goSelectMoa}></CreateMoaStep5>;
      default: return null;
    }
  };

  const renderDot = () => {
    switch (step) {
      case 1: return null;
      case 2: return <DotNav color1="black" color2="gray" color3="gray"></DotNav>;
      case 3: return <DotNav color1="gray" color2="black" color3="gray"></DotNav>;
      case 4: return <DotNav color1="gray" color2="gray" color3="black"></DotNav>;
      case 5: return null;
      default: return null;
    }
  };

  console.log(step)

  return (
    <div>
      {renderDot()}
      {renderStep()}
    </div>
  )
}
