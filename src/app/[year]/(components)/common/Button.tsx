"use client";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ReactNode } from "react";

export interface ButtonProps {
  label?: string | React.ReactNode | ReactNode;
  icon?: ReactNode; //Image 태그로 받기 위해
  className?: string;
  size?: "small" | "medium" | "long" | "circle" | "modalBtn" | "checkbox" | "next";
  color?: "black" | "white" | "red" | "blocked" | "none" | "checkboxTrue" | "checkboxFalse" | "false";
  onClick?: () => void; // toast alert 의 onCLick 속성 추가
  loading?: boolean; //로딩이 필요한 작업일 때(ex. 이미지 다운로드)

}

//간단하게만 적었습니당
export const buttonSize = {
  small: css`
    max-width: 128px;
    width: 100%;
    height: 56px;
  `,
  medium: css`
    max-width: 316px;
    width: 100%;
    height: 63px;
  `,
  long: css`
    max-width: 370px;
    width: 100%;
    height: 63px;
  `,
  circle: css`
    border-radius: 100%;
    width: 60px;
    height: 60px;
  `,
  modalBtn: css`
    max-width: 174px;
    width: 100%;
    height: 56px;
  `,
  checkbox: css`
    width: 40px;
    height: 40px;
`,
  next: css`
max-width: 370px;
width: 300px;
    height: 40px;
`
};

export const buttonColor = {
  black: css`
    background-color: var(--ui-primary);
    color: var(--text-primary-reverse);
  `,
  white: css`
    background-color: white;
    color: white;
    &:hover {
      transform: scale(1.03);
    }
  `,
  red: css`
    background-color: red;
    color: black;
    &:hover {
      background-color: rgb(255, 123, 123);
    }
  `,
  checkboxTrue: css`
  background-color: #1B1B1B;
  color: white;
  font-size: 16px;
  padding-top :4px;
  border: none;
  border-radius: 10px;
  box-shadow: none;

`,
  checkboxFalse: css`
  background-color: white;
  color: white;
  font-size: 16px;
  padding-top :4px;
  border: 1px solid var(--color-gray-300);
  border-radius: 10px;
  box-shadow: none;

`,
  false: css`
background-color: white;
color: var(--color-gray-500);
font-size: 16px;
padding-top :4.5px;
border: 1px solid var(--color-gray-300);
border-radius: 10px;
      &:active {
      background-color: var(--color-gray-500);
      border: 1px solid var(--color-gray-500);
    }
  `,
  //버튼 상호작용 x일 때
  blocked: css`
    background-color: var(--color-gray-400);
    color: var(--color-gray-300);
    font-weight: bold;
    cursor: default;
  `,
  //배경 X, modal용
  none: css`
    background-color: transparent;
    color: var(--color-gray-300);
    font-weight: bold;
    box-shadow: none;
  `,
};

const ButtonStyle = styled.button<ButtonProps>`
  cursor: pointer;
  white-space: nowrap;
  border: none;
  margin: 10px;
  overflow: hidden;
  border-radius: 60px;
  font-size: 16px;
  margin: 10px 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);
  transition: 0.3s ease;
  ${props => buttonSize[props.size]};
  ${props => buttonColor[props.color]};
  text-align: center;
`;

export default function Button({
  label,
  icon,
  size,
  color,
  className,
  onClick,
}: ButtonProps) {
  return (
    <ButtonStyle
      className={className}
      size={size}
      color={color}
      onClick={onClick}
    >
      <div style={{ justifyContent: "center", display: "flex", gap: "12px" }}>
        {label}
        {icon}
      </div>
    </ButtonStyle>
  );
}

// 사용 예제
// <Button label="테스트" size="small" color="black"></Button>
// <Button label="테스트" size="long" color="red"></Button>
