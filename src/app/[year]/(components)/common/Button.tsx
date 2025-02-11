"use client";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ReactNode } from "react";

export interface ButtonProps {
  label?: String;
  icon?: ReactNode; //Image 태그로 받기 위해
  className?: string;
  size?: "small" | "medium" | "long" | "circle" | "modalBtn";
  color?: "black" | "white" | "red" | "blocked" | "none";
  onClick?: () => void; // toast alert 의 onCLick 속성 추가
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
};

export const buttonColor = {
  black: css`
    background-color: var(--color-black);
    color: white;
    &:hover {
      background-color: var(--color-gray-800);
    }
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
  //버튼 상호작용 x일 때
  blocked: css`
    background-color: var(--color-gray-300);
    color: var(--color-gray-500);
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
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  margin: 10px;
  overflow: hidden;
  border-radius: 60px;
  font-size: 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);
  transition: 0.3s ease;
  ${props => buttonSize[props.size]};
  ${props => buttonColor[props.color]};
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
