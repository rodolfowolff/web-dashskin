"use client";

import NavbarComponent from "@/components/navbar";
import routes from "@/config/routes.json";
import { Footer } from "@/components/footer";
import { useUser } from "@/context/userAuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData, isLoadingUser } = useUser();

  useEffect(() => {
    if (!userData) {
      redirect("/");
    }
  }, [userData]);

  if (isLoadingUser) {
    return <Loading />;
  }

  return (
    <div
      className="relative flex flex-col justify-between min-h-screen"
      id="app-container"
    >
      <NavbarComponent
        mobileRoutes={routes.mobileRoutes}
        routes={routes.routes}
      />
      {children}
      <Footer />
    </div>
  );
}
