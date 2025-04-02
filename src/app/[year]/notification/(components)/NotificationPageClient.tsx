"use client";
import { Suspense } from "react";
import Modal from "../../(components)/common/Modal";
import NotificationContent from "./NotificationContent";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Skeleton from "../../(components)/common/Skeleton";
import { Notifications } from "@/types/notification";
import Loading from "../../(components)/loading";

export default function NotificationPageClient({
  notifications,
}: Notifications) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  }

  //Modal에 넘기는 함수
  const onClose = () => {
    router.back();
  };

  return (
    <>
      <Modal
        isOpen={true}
        title="알림함"
        onClose={onClose}
        showActionButtons={false}
        content={
          <Suspense fallback={<Skeleton width="100%" height="80px" />}>
            <NotificationContent notifications={notifications} />
          </Suspense>
        }
      />
    </>
  );
}
