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
import { useUser } from "@/context/userAuthContext";

export default function NavbarComponent({
  mobileRoutes,
  routes,
}: {
  mobileRoutes: IRoutes[];
  routes: IRoutes[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logOut, userData } = useUser();

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-dark"
    >
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/dashboard" as="a">
            <Image
              src="/logo.png"
              alt="Logo dashskins"
              priority
              width={96}
              height={96}
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] w-auto h-auto"
            />
          </Link>
          <p className="sr-only">Dashskins</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          {userData && (
            <>
              <Button
                variant="ghost"
                onClick={logOut}
                size="sm"
                className="text-default-100 py-1 px-4 rounded hover:text-default-900"
              >
                Sair
              </Button>
            </>
          )}

          {!userData && (
            <Link href="/" size="sm" color="foreground">
              Cadastrar
            </Link>
          )}
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
            <Link
              className="w-full"
              color="primary"
              href={route.path}
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
