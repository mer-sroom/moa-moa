"use client";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export interface ButtonProps {
  label?: string;
  className?: string;
  size?: "small" | "medium" | "long" | "circle";
  color?: "black" | "red";
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
};

const ButtonStyle = styled.button<ButtonProps>`
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  margin:10px;
  overflow: hidden;

  ${(props) => buttonSize[props.size]};
  ${(props) => buttonColor[props.color]};
`;

export default function Button({
  label,
  size,
  color,
  className,
}: ButtonProps) {

  return (
    <ButtonStyle className={className} size={size} color={color}>
      {label}
    </ButtonStyle>
  )
}


// 사용 예제
// <Button label="테스트" size="small" color="black"></Button>
// <Button label="테스트" size="long" color="red"></Button>