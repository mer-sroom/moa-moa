"use client";
import Modal from "../(components)/common/Modal";
import NotificationContent from "./(components)/NotificationContent";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };

  return (
    <Modal
      isOpen={true}
      title="알림함"
      onClose={onClose}
      showActionButtons={false}
      content={<NotificationContent />}
    />
  );
}
