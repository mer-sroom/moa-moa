"use client";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export interface ButtonProps {
  label?: string | React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "long" | "circle" | "checkbox";
  color?: "black" | "red" | "checkboxTrue" | "checkboxFalse";
  onClick?: ()=>void;
}

//간단하게만 적었습니당
export const buttonSize = {
  small: css`
    width: 50px;
    height: 30px;
  `,
  medium: css`
    width: 100px;
    height: 30px;
  `,
  long: css`
    width: 200px;
    height: 30px;
`,
  checkbox: css`
    width: 40px;
    height: 40px;
`,
};

export const buttonColor = {
  black: css`
  background-color: black;
  color: white;
      &:hover {
      background-color:rgb(150, 149, 149);
    }
`,
  red: css`
  background-color: red;
  color:black;
      &:hover {
      background-color:rgb(255, 123, 123);
    }
`,
  checkboxTrue: css`
  background-color: black;
  color: white;
  font-size: 16px;
  padding-top :4.5px;
  border: none;
  border-radius: 10px;
      &:active {
      background-color:rgb(150, 149, 149);
   }
`,
  checkboxFalse: css`
  background-color: white;
  color: white;
  font-size: 16px;
  padding-top :4.5px;
  border: 1px solid rgb(222, 222, 222);
  border-radius: 10px;
      &:active {
      background-color:rgb(189, 189, 189);
    }
`,
};

const ButtonStyle = styled.button<ButtonProps>`
  cursor: pointer;
  white-space: nowrap;
  border: none;
  margin:10px;
  overflow: hidden;
  text-align: center;

  ${(props) => buttonSize[props.size]};
  ${(props) => buttonColor[props.color]};
`;

export default function Button({
  label,
  size,
  color,
  className,
  onClick,
}: ButtonProps) {

  return (
    <ButtonStyle
      type="button"
      className={className}
      size={size}
      color={color}
      onClick={onClick}>
      {label}
    </ButtonStyle>
  )
}


// 사용 예제
// <Button label="테스트" size="small" color="black"></Button>
// <Button label="테스트" size="long" color="red"></Button>