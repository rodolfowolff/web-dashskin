"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface UserType {
  username: string;
  email: string;
}

type UserContextType = {
  userData: null | UserType;
  setUserData: React.Dispatch<React.SetStateAction<null | UserType>>;
  logIn: (email: string, senha: string) => Promise<void>;
  logOut: () => Promise<void>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<null | UserType>(null);
  const [isFetching, setIsFetching] = useState(true);

  async function loadCookieUserData() {
    try {
      setIsFetching(true);
      const token = getCookie("dashskins-access-token") as string;

      if (!token) {
        setUserData(null);
        return;
      } else {
        setUserData({
          username: "admin@admin.com",
          email: "admin@admin.com",
        });
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    loadCookieUserData();
  }, []);

  async function logIn(email: string, senha: string) {
    try {
      const res = await fetch("http://localhost:3333/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: senha,
        }),
      });

      if (!res.ok) {
        setUserData(null);
        throw new Error(res.statusText);
      }

      const data = await res.text();
      const token = data.trim();

      setCookie("dashskins-access-token", token, {
        maxAge: 28800, // 8h
      });

      setUserData({
        username: "admin@admin.com",
        email: "admin@admin.com",
      });
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error(error);

      throw Error(error);
    }
  }

  async function logOut() {
    deleteCookie("dashskins-access-token");
    setUserData(null);
    window.location.href = "/";
  }

  const contextData = useMemo(
    () => ({
      userData,
      setUserData,
      logIn,
      logOut,
      isFetching,
      setIsFetching,
    }),
    [userData, isFetching]
  );

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
