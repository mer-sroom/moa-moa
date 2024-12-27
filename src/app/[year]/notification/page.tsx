"use client";

import { useState } from "react";
import Alert from "../(components)/common/Alert";

export default function Page() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleOpenAlert = () => {
    setIsAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Alert 팝업 테스트</h2>
      <button onClick={handleOpenAlert}>알림창 열기</button>

      <Alert
        message="테스트"
        type="success"
        isOpen={isAlertOpen}
        onClose={handleCloseAlert}
        // 원하는 스타일 덮어쓰기
        alertStyle={{
          backgroundColor: "orange", // 팝업 박스 배경색
          border: "2px solid red",
        }}
        overlayStyle={{
          backgroundColor: "rgba(100, 100, 255, 0.5)", // 오버레이 색
        }}
      />
    </div>
  );
}
