"use client";
import { createContext, useContext, useState } from "react";
import type { CreateMoaBoxInput } from "@/types/moaBoxRequest";
import { useRouter } from "next/navigation";

type Ctx = {
  values: Partial<CreateMoaBoxInput>;
  update: (p: Partial<CreateMoaBoxInput>) => void;
  submit: () => Promise<void>;
};
const Ctx = createContext<Ctx>(null as never);
export const useCreateMoa = () => useContext(Ctx);

export default function CreateMoaProvider({
  children,
  onSuccess,
}: {
  children: React.ReactNode;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Partial<CreateMoaBoxInput>>({});

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
      alert("검증 오류가 발생했습니다. 콘솔을 확인하세요.");
      return;
    }
    onSuccess();
  };

  return (
    <Ctx.Provider value={{ values, update, submit }}>{children}</Ctx.Provider>
  );
}
