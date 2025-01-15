"use client";
import CalendarComponents from "./(create)/(components)/Calendar111";
import MobilePickerComponent from "./(create)/(components)/Calendar333";
import CustomDatePicker from "./(create)/(components)/Calendar333";
import dynamic from "next/dynamic";

// const DynamicHeader = dynamic(() => import('./(create)/(components)/Calendar333'), {
//   ssr: false,
// })

export default function YearSeasonPage() {
  const handleValueChange = (key: string, value: string) => {
    console.log(`Updated ${key}: ${value}`);
  };
  return (
    <>
      <h1>Year and Season Page</h1>
      <CalendarComponents></CalendarComponents>
      {/* <DynamicHeader></DynamicHeader>  */}
      {/* <MobilePickerComponent onValueChange={handleValueChange} /> */}
    </>
  )
}
