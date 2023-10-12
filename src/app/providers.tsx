"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { VisibleColumnsProvider } from "@/context/visibleColumnsContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <VisibleColumnsProvider>{children}</VisibleColumnsProvider>
    </NextUIProvider>
  );
}
