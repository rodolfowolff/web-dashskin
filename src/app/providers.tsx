"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ModalProvider } from "@/context/modalContext";
import { UserProvider } from "@/context/userAuthContext";
import { NotificationProvider } from "@/context/notificationContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ModalProvider>
      <NextUIProvider>
        <NotificationProvider>
          <UserProvider>{children}</UserProvider>
        </NotificationProvider>
      </NextUIProvider>
    </ModalProvider>
  );
}
