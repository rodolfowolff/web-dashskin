"use client";

import React, { createContext, useContext, useState } from "react";

type Selection = string[];

type VisibleColumnsContextType = {
  visibleColumns: string[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
};

const VisibleColumnsContext = createContext<
  VisibleColumnsContextType | undefined
>(undefined);

export const useVisibleColumns = () => {
  const context = useContext(VisibleColumnsContext);
  if (!context) {
    throw new Error(
      "useVisibleColumns must be used within a VisibleColumnsProvider"
    );
  }
  return context;
};

export const VisibleColumnsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const INITIAL_VISIBLE_COLUMNS = ["username", "email", "age", "actions"];
  const [visibleColumns, setVisibleColumns] = useState(INITIAL_VISIBLE_COLUMNS);

  return (
    <VisibleColumnsContext.Provider
      value={{ visibleColumns, setVisibleColumns }}
    >
      {children}
    </VisibleColumnsContext.Provider>
  );
};
