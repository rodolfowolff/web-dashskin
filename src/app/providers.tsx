"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { VisibleModalProvider } from "@/context/modalContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <VisibleModalProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </VisibleModalProvider>
  );
}
