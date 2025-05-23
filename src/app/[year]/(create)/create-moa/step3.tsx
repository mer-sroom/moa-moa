"use client";

import { useState } from "react";
import Calendar from "../(components)/Calendar";
import dayjs from 'dayjs';
import Button from "../../(components)/common/Button";
import { FaCheck } from "react-icons/fa";
import styles from "@/styles/createMoa.module.css";
import type { NextStepProps } from "@/types/createMoa";
import SelectModal from "../(components)/SelectModal";
import Modal from "../../(components)/common/Modal";


export default function CreateMoaStep3<NextStepProps>({ nextStep }) {
  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const [startDay, setStartDay] = useState<string>(today);
  const [endDay, setEndDay] = useState<string>(today);
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.moa_name.value)
    console.log(e.currentTarget.start_day.value)
    console.log(e.currentTarget.end_day.value)
    console.log(e.currentTarget.group.value)
  };

  // calendar.tsx 콜백 함수 : 초기 세팅 날짜를 현재 날짜로
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

  const groupHandler = () => {
    setIsOpen(!isOpen);
  };

  //input에 데이터 입력이 되어있을때 innput border색 변경
  const oninputColor = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("입력완")
    setColor(!!e.currentTarget.value)
  };

  //select modal.tsx에서 받아온 이름 적용
  const [member, setMember] = useState<string[]>([]);
  const onDateChange = (data: string[]) => {
    setMember(data)
    console.log(`${"setMember 확인 : " + member}`)
  };

  return (
    <div>
      <Modal isOpen={openSelect}
        showActionButtons={true}
        content={
          <SelectModal
            onClose={() => setOpenSelect(false)}
            onMemberChange={onDateChange} />
        }>
      </Modal>
      <div className={styles.step3_container}>

        <h1>나의 모아 설정하기</h1>
        <div className={styles.width}>
          <form onSubmit={submitHandler}>
            <label htmlFor="moa_name"
              className={styles.upper_label_wrapper}>모아 이름짓기</label>
            <input type="text"
              id="moa_name"
              placeholder="이름을 설정해 주세요"
              className={`${styles.moa_name_input} ${color ? styles.color : ''}`}
              onBlur={oninputColor}
            />
            <div className={styles.middle_label_wrapper}>
              <label htmlFor="d_day" >디데이 설정</label>
              <p className={styles.line_sort_small}>(마감 시간은 00:00 으로 자동 조정돼요)</p>
            </div>
            <div id="d_day" className={styles.d_day_group}>

              <div id="start" className={styles.d_day_start}>
                <input type="text" id="start_day" value={startDay} hidden readOnly />
                <Calendar labelName="시작 날짜" onDateChange={onStartDayHandler}></Calendar>
              </div>

              <div id="end" className={styles.d_day_end}>
                <input type="text" id="end_day" value={endDay} hidden readOnly />
                <Calendar labelName="마감 날짜" onDateChange={onEndDayHandler}></Calendar>
              </div>
            </div>

            <label htmlFor="group" className={styles.lower_label_wrapper}>모아 그룹설정</label>
            <div className={styles.group_member_container}>
              <input type="hidden" id="group" value={`${isOpen}`} />
              <Button
                label={isOpen ?
                  <FaCheck color="white" /> :
                  <FaCheck color="rgb(222, 222, 222)" />}
                size="checkbox"
                color={isOpen ? "checkboxTrue" : "checkboxFalse"}
                onClick={groupHandler}>
              </Button>
              <label htmlFor="group_member"></label>
              <input id="group_member"
                disabled={!isOpen}
                placeholder="함께 할 친구를 설정해 주세요"
                className={styles.group_member_input}
                onClick={() => setOpenSelect(true)}
                value={member}
              />
            </div>
          </form>
        </div>
      </div>
      <div className={styles.button}>
        <Button label="다음으로" size="medium" color="black" onClick={nextStep}></Button>
      </div>
    </div>
  )
}
