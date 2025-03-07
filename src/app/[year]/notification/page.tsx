"use client";
import { Suspense, useEffect, useState } from "react";
import Modal from "../(components)/common/Modal";
import NotificationContent from "./(components)/NotificationContent";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NotificationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    myNotifications: [],
    moaNotifications: [],
  });
  const [loading, setLoading] = useState(true);
  console.log(session);
  useEffect(() => {
    async function fetchNotifications() {
      if (session?.user?.id) {
        try {
          const res = await fetch("/api/notification");
          const data = await res.json();
          setNotifications(data);
        } catch (error) {
          console.error("알림함 불러오는 중 문제 발생", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    fetchNotifications();
  }, [session]);

  if (status === "loading" || loading) {
    return <p>loading...</p>;
  }

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
