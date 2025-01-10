"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ClientProviderProps {
  children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
