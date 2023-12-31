"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

interface UserType {
  username: string;
  email: string;
}

type UserContextType = {
  userData: null | UserType;
  setUserData: React.Dispatch<React.SetStateAction<null | UserType>>;
  logIn: (email: string, senha: string) => Promise<UserType | null>;
  logOut: () => Promise<void>;
  isLoadingUser: boolean;
  setIsLoadingUser: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<null | UserType>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  async function loadCookieUserData() {
    try {
      setIsLoadingUser(true);
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
      setIsLoadingUser(false);
    }
  }

  useEffect(() => {
    loadCookieUserData();
  }, []);

  async function logIn(email: string, senha: string) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL_API;
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      return userData;
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
      isLoadingUser,
      setIsLoadingUser,
    }),
    [userData, isLoadingUser]
  );

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
