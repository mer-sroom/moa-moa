"use client";
import React, { useState } from "react";
import Picker from "react-mobile-picker";
// import styled from "styled-components";


type PickerValue = {
    year: string | number;
    month: string | number;
    day: string | number;
};
//npm audit fix
//npm audit fix --force

// type onChangeProps = {
//     onChange: (value: PickerValue, key: string) => void;
// }


export default function CalendarComponents(

) {

    //let Calendar = "Calendar";
    const selections = {
        year: ["2024", "2025", "2026"],
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        day: Array.from({ length: 31 }, (v, i) => i + 1),
    }

    const [pickerValue, setPickerValue] = useState<PickerValue>(
        {
            year: "2025", month: "01", day: "01"
        }
    )

    const handleChange = (value: PickerValue,
        // { title: string, firstName: string, lastName: string,}, 
        key: string): void => {
        //setPickerValue(value); 
        console.log(value)
        console.log(key)
        setPickerValue((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div>
            <Picker value={pickerValue}
                onChange={
                    handleChange
                    //(e: PickerValue) => {
                    // setPickerValue(e.title.value)
                    //console.log("nonono")
                }
                wheelMode="natural">
                {Object.keys(selections).map(name => (
                    <Picker.Column key={name} name={name}>
                        {selections[name].map(option => (
                            <Picker.Item key={option} value={option}>
                                {option}
                            </Picker.Item>
                        ))}
                    </Picker.Column>
                ))}
            </Picker>
        </div>
    )
}
