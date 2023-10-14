"use client";

import NavbarComponent from "@/components/navbar";
import router from "@/config/routes.json";
import { Footer } from "@/components/footer";
import { useUser } from "@/context/userAuthContext";
import { redirect } from "next/navigation";
// import Loading from "../loading";
import { UsersDataProvider } from "@/context/usersDataContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData } = useUser();
  console.log("userData RootLayout", userData);
  // if (!userData || userData.email !== "admin@admin.com") {
  //   redirect("/");
  // }

  return (
    <div
      className="relative flex flex-col justify-between min-h-screen"
      id="app-container"
    >
      <UsersDataProvider>
        <NavbarComponent
          mobileRoutes={router.mobileRoutes}
          routes={router.routes}
        />
        {children}
        <Footer />
      </UsersDataProvider>
    </div>
  );
}
