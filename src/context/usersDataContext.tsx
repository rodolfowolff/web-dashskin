"use client";

import { IUserResponse } from "@/types/response-api";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCookie } from "cookies-next";

type UsersDataContextType = {
  usersData: [] | IUserResponse[];
  setUsersData: React.Dispatch<React.SetStateAction<IUserResponse[]>>;
  getUsersData: () => Promise<null | IUserResponse[] | undefined>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
};

const UsersDataContext = createContext<UsersDataContextType | undefined>(
  undefined
);

export const useUsersData = () => {
  const context = useContext(UsersDataContext);
  if (!context) {
    throw new Error("useUsersData must be used within a UsersDataProvider");
  }
  return context;
};

export const UsersDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [usersData, setUsersData] = useState<[] | IUserResponse[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const token = getCookie("dashskins-access-token") as string;

  async function getUsersData() {
    try {
      setIsFetching(true);
      if (!token) {
        throw new Error("getUsersData error");
      }
      const res = await fetch("http://localhost:3333/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error(error);
      throw Error(error);
    } finally {
      setIsFetching(false);
    }
  }

  async function loadUsersData() {
    try {
      const res = await getUsersData();

      if (!res) {
        throw new Error("loadUsersData error");
      }

      setUsersData(res);
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadUsersData();
  }, []);

  // const contextData = useMemo(
  //   () => ({
  //     usersData,
  //     setUsersData,
  //     getUsersData,
  //     isFetching,
  //     setIsFetching,
  //   }),
  //   [isFetching]
  // );

  return (
    <UsersDataContext.Provider
      value={{
        usersData,
        setUsersData,
        getUsersData,
        isFetching,
        setIsFetching,
      }}
    >
      {children}
    </UsersDataContext.Provider>
  );
};
