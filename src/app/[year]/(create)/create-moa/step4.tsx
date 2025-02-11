"use client";

import { useState } from "react";
import Calendar from "../(components)/Calendar";
import dayjs from 'dayjs';
import Button from "../../(components)/common/Button";
import { FaCheck } from "react-icons/fa";

export default function CreateMoaStep4() {
  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const [startDay, setStartDay] = useState<string>(today);
  const [endDay, setEndDay] = useState<string>(today);
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.moa_name.value)
    console.log(e.currentTarget.start_day.value)
    console.log(e.currentTarget.end_day.value)
    console.log(e.currentTarget.group.value)
  };

  const onStartDayHandler = (data: string) => {
    console.log("상위 start Handler 확인")
    setStartDay(data)
    console.log(data)
  };

  const onEndDayHandler = (data: string) => {
    console.log("상위 end Handler 확인")
    setEndDay(data)
    console.log(data)
  };


  const [isOpen, setIsOpen] = useState(false);
  const groupHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <h1>나의 모아 설정하기</h1>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="moa_name">모아 이름짓기</label>
          <input type="text" id="moa_name" />
          <label htmlFor="d_day">디데이 설정</label>
          <div id="d_day">
            <div id="start">
              <input type="text" id="start_day" value={startDay} hidden readOnly />
              <Calendar labelName="시작 날짜" onDateChange={onStartDayHandler}></Calendar>
            </div>
            <div id="end">
              <input type="text" id="end_day" value={endDay} hidden readOnly />
              <Calendar labelName="마감 날짜" onDateChange={onEndDayHandler}></Calendar>
            </div>
          </div>

          <label htmlFor="group">모아 그룹설정
            <input type="hidden" id="group" value={`${isOpen}`} />
            <Button label={isOpen ? <FaCheck color="white"/> : <FaCheck color="rgb(222, 222, 222)"/>} size="checkbox" color={isOpen ? "checkboxTrue" : "checkboxFalse"} onClick={groupHandler}></Button>
          </label>

          <button type="submit">제출</button>
        </form>
      </div>

      <input type="date" id="start" placeholder={`${today}`}
        onFocus={(e) => { }} style={{ margin: "100px" }} />

    </>
  )
}
