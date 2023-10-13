"use client";

import React, { createContext, useContext, useState } from "react";

type VisibleModalContextType = {
  visibleModal: boolean;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const VisibleModalContext = createContext<VisibleModalContextType | undefined>(
  undefined
);

export const useVisibleModal = () => {
  const context = useContext(VisibleModalContext);
  if (!context) {
    throw new Error(
      "useVisibleModal must be used within a VisibleModalProvider"
    );
  }
  return context;
};

export const VisibleModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <VisibleModalContext.Provider value={{ visibleModal, setVisibleModal }}>
      {children}
    </VisibleModalContext.Provider>
  );
};
