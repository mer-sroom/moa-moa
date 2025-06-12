import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DatePickerProps {
  onDateChange: (date: string) => void;
  labelName: string;
}

export default function Calendar({ onDateChange, labelName }: DatePickerProps) {
  const [value, setValue] = useState<Dayjs | null>(dayjs()); // 기본값: 오늘
  const nextYear = dayjs().add(1, "year");

  /** 날짜 선택 시 호출 */
  const handleChange = (newValue: Dayjs | null) => {
    if (!newValue) return; // null(취소) 방지
    setValue(newValue); // ★ 새 값을 state에 저장
    console.log("📅 selected ▶", newValue.format("YYYY-MM-DD"));
    onDateChange(newValue.format("YYYY-MM-DD")); // 상위로 전달
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={labelName}
        value={value} // ★ 제어 컴포넌트
        onChange={handleChange} // ★ 수정된 핸들러
        format="YYYY-MM-DD"
        views={["year", "month", "day"]}
        minDate={dayjs("1980-01-01")}
        maxDate={nextYear}
        sx={{
          width: "100%",
          "& label": {
            color: "var(--color-gray-300)",
            fontSize: "var(--font-size-base)",
          },
        }}
      />
    </LocalizationProvider>
  );
}
