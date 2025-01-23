import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerProps {
  onDateChange: (date: string) => void;
}

export default function Calendar({ onDateChange }: DatePickerProps) {
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
  const nextYear = dayjs().add(1, "year");

  const onDateHandler = (data: Dayjs) => {
    console.log("하위 Handler 확인")
    onDateChange(data.format("YYYY-MM-DD"))
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker',]}>
        <DemoItem>
          <DatePicker
            defaultValue={dayjs(new Date())}
            format="YYYY-MM-DD"
            value={value}
            onChange={(value) => { setValue(value); onDateHandler(value); }}
            maxDate={nextYear}
            minDate={dayjs('1980-01-01')}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  )
}