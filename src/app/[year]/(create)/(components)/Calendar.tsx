import React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function Calendar (){
    return(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'DatePicker',
                  'StaticDatePicker',
                ]}
              >
                <DemoItem>
                  <DatePicker defaultValue={dayjs(new Date())} />
                  <StaticDatePicker defaultValue={dayjs(new Date())} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
    )
}