"use client";
import React from "react";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 토스트 버튼 타입 정의
type ToastButtonProps = {
  label?: string;
  size?: "small" | "medium" | "large" | "long";
  color?: string;
  type?: "info" | "success" | "error" | "default";
  message?: string;
};

// 토스트 버튼 (기본)
const ToastButton = ({
  label = "Click Here",
  size = "medium",
  color = "black",
  type = "success",
  message = "✅ SUCCESS Toast!",
}: ToastButtonProps) => {
  const notify = () => {
    switch (type) {
      case "info":
        toast.info(message);
        break;
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <>
      <Button
        label="테스트"
        size="long"
        color="black"
        onClick={notify}
      ></Button>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        theme="colored" // 이거 빼면 아이콘이랑 상태바만 색깔 있어요 :3
      />
    </>
  );
};

export default ToastButton;

// 사용예제
// <ToastButton></ToastButton>
// <Toast label="Info Toast" type="info" message="🍞 This is an info toast!" />
// <Toast label="Success Toast" type="success" message="✨ Operation successful!" />
// <Toast label="Error Toast" type="error" message="❌ Something went wrong!" />
// <Toast label="Default Toast" type="default" message="🦄 This is Default Toast!" />
