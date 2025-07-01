"use client";

import { createContext, useContext, useState } from "react";
import type { CreateMoaBoxInput } from "@/types/moaBoxRequest";
import { useAlertContext } from "@/contexts/AlertContext";

type Ctx = {
  values: Partial<CreateMoaBoxInput>;
  update: (p: Partial<CreateMoaBoxInput>) => void;
  submit: () => Promise<void>;
};

const CreateMoaContext = createContext<Ctx>({} as Ctx);
export const useCreateMoa = () => useContext(CreateMoaContext);

export default function CreateMoaProvider({
  children,
  onSuccess,
}: {
  children: React.ReactNode;
  onSuccess: () => void;
}) {
  /* ★ 초기값에 decorationType 추가 */
  const [values, setValues] = useState<Partial<CreateMoaBoxInput>>({
    title: undefined,
    dueDate: undefined,
    backgroundDesignId: 1,
    mailBoxDesignId: 1,
    isPublic: true,
    allowAnonymous: true,
    letterCountPublic: false,
    participantIds: [],
    decorationDesignId: undefined,
  });

  const update = (p: Partial<CreateMoaBoxInput>) =>
    setValues(v => ({ ...v, ...p }));

  const { showAlert } = useAlertContext();

  const submit = async () => {
    const res = await fetch("/api/moa-box", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      console.error("모아 생성 검증 에러:", await res.json());
      //alert("모아 생성 실패. 콘솔 확인하세요.");
      showAlert("모아 박스 생성에 실패했습니다", "오류");
      return;
    }
    onSuccess();
  };

  return (
    <CreateMoaContext.Provider value={{ values, update, submit }}>
      {children}
    </CreateMoaContext.Provider>
  );
}
