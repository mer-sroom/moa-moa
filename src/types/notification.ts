//모아 알림(moaNotification) 타입
export interface BaseNotification {
  id: number;
  userId: string;
  type: string;
  read: boolean;
  message: string;
  payload: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}
//내 알림(myNotification) 타입, sender 정보 포함함
export interface MyNotification extends BaseNotification {
  sender: {
    id: string;
    nickname: string;
    profileImage?: string;
  };
}

export interface Notifications {
  notifications: {
    myNotifications: MyNotification[];
    moaNotifications: BaseNotification[];
  };
}
