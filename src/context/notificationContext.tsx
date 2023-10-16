"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface NotificationtType {
  type: "success" | "error" | "warning";
  message: string;
}

type NotificationContextType = {
  notification: NotificationtType | null;
  setNotification: React.Dispatch<
    React.SetStateAction<NotificationtType | null>
  >;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<NotificationtType | null>(
    null
  );

  useEffect(() => {
    if (notification !== null) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
