import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface DatePickerProps {
  onDateChange: (date: string) => void;
  labelName: string;
}


export default function Calendar({ onDateChange, labelName }: DatePickerProps) {
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
  const nextYear = dayjs().add(1, "year");

  const onDateHandler = (data: Dayjs) => {
    console.log("하위 Handler 확인")
    onDateChange(data.format("YYYY-MM-DD"))
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
      <DemoContainer components={['DatePicker',]}>
        <DemoItem>
          <div>
            <DatePicker
              format="YYYY-MM-DD"
              views={['year', 'month', 'day']}
              onChange={(e) => { setValue(value); onDateHandler(value); }}
              maxDate={nextYear}
              minDate={dayjs('1980-01-01')}
              label={labelName}
              sx={{
                width: '100%',
                '& label': {
                  color: 'var(--color-gray-300)',
                },
              }}
            />
          </div>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  )
}