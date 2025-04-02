"use client";
import React from "react";
import Image from "next/image";
import moaCat from "@/../../public/assets/icons/cat.svg";

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  //   backgroundColor: "var(--color-gray-500)", // 필요에 따라 배경색 조정
};

const spinnerStyle: React.CSSProperties = {
  width: "100px",
  height: "100px",
  animation: "spin 3s linear infinite",
};

export default function Loading() {
  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <Image src={moaCat} alt="moa cat image" style={spinnerStyle} />
    </div>
  );
}
