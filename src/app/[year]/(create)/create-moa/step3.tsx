"use client";
import { useEffect, useState } from "react";
import Calendar from "../(components)/Calendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // (UTC 변환용 플러그인)
dayjs.extend(utc);

import Button from "../../(components)/common/Button";
import { FaCheck } from "react-icons/fa";
import styles from "@/styles/create-moa/createMoa.module.css";
import type { NextStepProps, ServerType } from "@/types/createMoa";
import SelectModal from "../(components)/SelectModal";
import Modal from "../../(components)/common/Modal";
import { useCreateMoa } from "@/contexts/CreateMoaContext";

export default function CreateMoaStep3({ nextStep }: NextStepProps) {
  const today = dayjs().format("YYYY-MM-DD");

  // ───────────── local state ─────────────
  const [title, setTitle] = useState("");
  const [startDay, setStartDay] = useState(today);
  const [endDay, setEndDay] = useState(today); // 디데이 (마감)
  const [openSelect, setOpenSelect] = useState(false);
  const [friends, setFriends] = useState<ServerType[]>([]);
  const [memberNames, setMemberNames] = useState<string[]>([]);
  const [memberColor, setMemberColor] = useState(false);

  const { update } = useCreateMoa();

  // ───────────── ① 친구 목록 로드 ─────────────
  useEffect(() => {
    fetch("/api/friendlist", { credentials: "include", cache: "no-store" })
      .then(res => res.json())
      .then(data =>
        setFriends(data.friends.map((f: any) => ({ ...f, selected: false })))
      )
      .catch(err => console.error("friendlist fetch error ▶", err));
  }, []);

  // ───────────── ② endDay 변화 확인 ─────────────
  useEffect(() => {
    console.log("🔵 endDay changed ▶", endDay);
  }, [endDay]);

  // 친구 체크/제거
  const handleCheck = (name: string) => {
    setFriends(prev =>
      prev.map(f => (f.name === name ? { ...f, selected: !f.selected } : f))
    );
  };
  const handleRemove = (name: string) => {
    setFriends(prev =>
      prev.map(f => (f.name === name ? { ...f, selected: false } : f))
    );
  };

  // 선택된 친구 → UI 표시
  useEffect(() => {
    const names = friends.filter(f => f.selected).map(f => f.name);
    setMemberNames(names);
    setMemberColor(names.length > 0);
  }, [friends]);

  const handleClose = () => setOpenSelect(false);

  // ───────────── ③ 다음 단계 (payload 생성) ─────────────
  const handleNext = () => {
    // KST(로컬) 날짜 문자열 → UTC 00:00 ISO
    const isoDueDate = dayjs.utc(endDay).startOf("day").toISOString();

    const payload = {
      title,
      dueDate: isoDueDate,
      participantIds: friends.filter(f => f.selected).map(f => f.id),
      isPublic: true,
    };

    console.log("🟢 handleNext payload ▶", payload); // ← 확인용
    update(payload);
    nextStep();
  };

  // ───────────── JSX ─────────────
  return (
    <>
      <Modal
        isOpen={openSelect}
        showActionButtons={true}
        onClose={handleClose}
        content={
          <SelectModal
            onClose={handleClose}
            onMemberChange={() => {}}
            check={handleCheck}
            removeMember={handleRemove}
            memberValue={friends}
            friendData={memberNames}
          />
        }
      />

      <div className={styles.step3_container}>
        <h1>나의 모아 설정하기</h1>

        {/* ── 모아 이름 ── */}
        <div className={styles.width}>
          <label htmlFor="moa_name" className={styles.upper_label_wrapper}>
            모아 이름짓기
          </label>
          <input
            id="moa_name"
            placeholder="이름을 설정해 주세요"
            className={styles.moa_name_input}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          {/* ── 디데이 ── */}
          <div className={styles.middle_label_wrapper}>
            <label htmlFor="d_day">디데이 설정</label>
            <p className={styles.line_sort_small}>
              (마감 시간은 00:00 으로 자동 조정돼요)
            </p>
          </div>
          <div id="d_day" className={styles.d_day_group}>
            <div id="start" className={styles.d_day_start}>
              <input type="hidden" value={startDay} readOnly />
              <Calendar labelName="시작 날짜" onDateChange={setStartDay} />
            </div>
            <div id="end" className={styles.d_day_end}>
              <input type="hidden" value={endDay} readOnly />
              <Calendar labelName="마감 날짜" onDateChange={setEndDay} />
            </div>
          </div>

          {/* ── 그룹 멤버 ── */}
          <label htmlFor="group_member" className={styles.lower_label_wrapper}>
            모아 그룹설정
          </label>
          <div className={styles.group_member_container}>
            <Button
              label={
                <FaCheck color={memberColor ? "white" : "rgb(222,222,222)"} />
              }
              size="checkbox"
              color={memberColor ? "checkboxTrue" : "checkboxFalse"}
              onClick={() => setOpenSelect(o => !o)}
            />
            <input
              id="group_member"
              disabled={!memberColor}
              placeholder="함께 할 친구를 설정해 주세요"
              className={`${styles.group_member_input} ${
                memberColor ? styles.color : ""
              }`}
              onClick={() => setOpenSelect(true)}
              value={memberNames.join(", ")}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* ── 다음 버튼 ── */}
      <div className={styles.button}>
        <Button
          label="다음으로"
          size="medium"
          color="black"
          onClick={handleNext}
        />
      </div>
    </>
  );
}
