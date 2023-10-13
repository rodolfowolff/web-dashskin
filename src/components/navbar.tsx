"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { IRoutes } from "@/types/routes-type";

export default function NavbarComponent({
  mobileRoutes,
  routes,
}: {
  mobileRoutes: IRoutes[];
  routes: IRoutes[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userAuth, setUserAuth] = useState({
    username: "rwolff",
    email: "a@a.com",
    age: 25,
  });

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-dark"
    >
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Image
            src="/next.svg"
            alt="Logo"
            width={96}
            height={96}
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          />
          <p className="sr-only">NEXT</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Image
            src="/next.svg"
            alt="Logo"
            width={96}
            height={96}
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          />
          <p className="sr-only">NEXT</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          {userAuth && userAuth.username && (
            <>
              <Link
                href="#"
                size="sm"
                className="text-default-100 py-1 px-4 rounded"
              >
                Dashboard
              </Link>

              <Link
                href="#"
                size="sm"
                className="text-default-100 py-1 px-4 rounded"
              >
                Sair
              </Link>
            </>
          )}

          {!userAuth ||
            (!userAuth.username && (
              <Link href="#" color="foreground">
                Cadastrar
              </Link>
            ))}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden text-default-200" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Mobile */}
      <NavbarMenu className="bg-[#111111]">
        {mobileRoutes.map((route: IRoutes) => (
          <NavbarMenuItem key={route.key}>
            <Link className="w-full" color="primary" href="#" size="lg">
              {route.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
