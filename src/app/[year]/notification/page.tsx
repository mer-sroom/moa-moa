"use client";
import { Suspense, useEffect, useState } from "react";
import Modal from "../(components)/common/Modal";
import NotificationContent from "./(components)/NotificationContent";
import { useRouter } from "next/navigation";

export default function NotificationPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    myNotifications: [],
    moaNotifications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch("/api/notification");
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("알림함 불러오는 중 문제 발생", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  if (loading) return <div>Loading...</div>;

  //Modal에 넘기는 함수
  const onClose = () => {
    router.back();
  };

  return (
    <Modal
      isOpen={true}
      title="알림함"
      onClose={onClose}
      showActionButtons={false}
      content={
        <Suspense fallback="loading...">
          <NotificationContent notifications={notifications} />
        </Suspense>
      }
    />
  );
}
