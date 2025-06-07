"use client";

import { useEffect, useState } from "react";
import Calendar from "../(components)/Calendar";
import dayjs from 'dayjs';
import Button from "../../(components)/common/Button";
import { FaCheck } from "react-icons/fa";
import styles from "@/styles/createMoa.module.css";
import type { NextStepProps } from "@/types/createMoa";
import SelectModal from "../(components)/SelectModal";
import Modal from "../../(components)/common/Modal";
import type { MemberType } from "@/types/createMoa";  // db 데이터 저장 (임시) 

export default function CreateMoaStep3<NextStepProps>({ nextStep }) {
  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const [startDay, setStartDay] = useState<string>(today);
  const [endDay, setEndDay] = useState<string>(today);
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(false);
  const [memberColor, setMemberColor] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [member, setMember] = useState<string[]>([]);



  /* ----------------- /     modal.tsx     /----------------- */
  /* ---------------------------------------------------------*/

  // 모달 컴포넌트 닫기 
  const onClose = () => {
    setOpenSelect(false)
  };

  /* ----------------- /     select modal.tsx     /----------------- */
  /* --------------------------------------------------------------- */

  // db 데이터 저장 (임시)
  const [friend, setFriend] = useState<MemberType[]>([
    { name: "머가문", selected: false },
    { name: "멈가문", selected: false },
    { name: "현가문", selected: false },
    { name: "이가문", selected: false },
    { name: "최가문", selected: false },
    { name: "고가문", selected: false },
  ]);

  // select modal input tag 실시간 반영
  const [friendData, setMemberData] = useState<string[]>([]);

  // select modal boolean 값 데이터 처리
  const check = (name_: string) => {
    setFriend((prev) =>
      prev.map((friend) =>
        friend.name === name_
          ? { ...friend, selected: !friend.selected }
          : friend
      ));
    setMemberData(friend.filter((friend) => friend.selected).map(friend => friend.name));
  }

  //select modal 선택된 친구 x버튼으로 빼기
  const removeMember = (remove: string) => {
    setFriend((prev) =>
      prev.map((friend) =>
        friend.name === remove
          ? { ...friend, selected: false }
          : friend
      ));
  };

  // select modal boolean 데이터 변경때마다 input창에 실시간 데이터 반영
  useEffect(() => {
    const onDateChange = friend.filter((friend) => friend.selected).map(friend => friend.name);
    setMemberData(onDateChange);
  }, [friend]);


  /* ----------------- /     calendar.tsx     /----------------- */
  /* ----------------------------------------------------------- */


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


  /* ----------------- /     step3.tsx     /----------------- */
  /* -------------------------------------------------------- */

  // form tag onSubmit data 
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.moa_name.value)
    console.log(e.currentTarget.start_day.value)
    console.log(e.currentTarget.end_day.value)
    console.log(e.currentTarget.group.value)
  };

  //input에 데이터 입력이 되어있을때 input border색 변경
  const oninputColor = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("입력완")
    setColor(!!e.currentTarget.value)
  };

  //input border색 변경 - 모아 그룹 설정 
  useEffect(() => {
    if (member.length > 0) {
      setMemberColor(!!member)
    }
  }, [member]);

  //select modal.tsx에서 받아온 이름 적용
  const onDateChange = (data: string[]) => {
    setMember(data)
    console.log(`${"setMember 확인 : " + member}`)
  };

  // 모아 그룹 설정 disabled input 태그 활성화 
  const groupHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Modal isOpen={openSelect}
        showActionButtons={true}
        onClose={onClose}
        content={
          <SelectModal
            onClose={() => setOpenSelect(false)}
            onMemberChange={onDateChange}
            memberValue={friend}
            check={check}
            removeMember={removeMember}
            friendData={friendData} />
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
              <label htmlFor="d_day">디데이 설정</label>
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
                className={`${styles.group_member_input} ${memberColor ? styles.color : ''}`}
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
