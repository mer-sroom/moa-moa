"use client";

import { useState } from "react";
import Modal from "../(components)/common/Modal";
import NotificationContent from "./(components)/NotificationContent";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title="알림함"
        onClose={onClose}
        showActionButtons={false}
        content={<NotificationContent />}
      />
      <div>
        모달창 테스트용 버튼
        <button onClick={() => setIsModalOpen(!isModalOpen)}>
          모달창 열기
        </button>
      </div>
    </>
  );
}
