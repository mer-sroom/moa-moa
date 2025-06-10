"use client";

import { createContext, useContext, useState } from "react";
import type { CreateMoaBoxInput } from "@/types/moaBoxRequest";

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
  // 초기 필수 필드 모두 채워두기
  const [values, setValues] = useState<Partial<CreateMoaBoxInput>>({
    title: undefined,
    dueDate: undefined,
    backgroundDesignId: 1,
    mailBoxDesignId: 1,
    isPublic: true,
    allowAnonymous: true,
    letterCountPublic: false,
    participantIds: [],
  });

  const update = (p: Partial<CreateMoaBoxInput>) =>
    setValues(v => ({ ...v, ...p }));

  const submit = async () => {
    const res = await fetch("/api/moa-box", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const err = await res.json();
      console.error("모아 생성 검증 에러:", err);
      alert("모아 생성 실패. 콘솔 확인하세요.");
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
