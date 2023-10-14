"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ModalProvider } from "@/context/modalContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ModalProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ModalProvider>
  );
}
