"use client";

import { IUserResponse } from "@/types/response-api";
import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: IUserResponse;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserResponse>>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({} as IUserResponse);

  return (
    <ModalContext.Provider
      value={{
        isCreating,
        setIsCreating,
        isEditing,
        setIsEditing,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
