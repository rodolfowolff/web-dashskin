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
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Image src="/next.svg" alt="Logo" width={96} height={96} />
          <p className="sr-only">NEXT</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Image src="/next.svg" alt="Logo" width={96} height={96} />
          <p className="sr-only">NEXT</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          {userAuth && userAuth.username && (
            <>
              <Link href="#" color="foreground" size="sm">
                Dashboard
              </Link>

              <Link
                href="#"
                color="foreground"
                size="sm"
                className="text-default-800 bg-slate-200 py-2 px-4 rounded"
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

      <NavbarContent className="sm:hidden text-danger-800" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu>
        {mobileRoutes.map((route: IRoutes) => (
          <NavbarMenuItem key={route.key}>
            <Link
              className="w-full"
              color={
                route.defaultOpen
                  ? "warning"
                  : route === mobileRoutes.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {route.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
