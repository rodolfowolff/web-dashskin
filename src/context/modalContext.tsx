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
  isDeleted: boolean;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  isViewing: boolean;
  setIsViewing: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isDeleted, setIsDeleted] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isCreating,
        setIsCreating,
        isEditing,
        setIsEditing,
        userInfo,
        setUserInfo,
        isDeleted,
        setIsDeleted,
        isViewing,
        setIsViewing,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
