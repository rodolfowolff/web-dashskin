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

        {routes.map((route: IRoutes) => (
          <NavbarItem key={route.key} isActive={route.defaultOpen}>
            <Link href={route.path} aria-current="page" color="foreground">
              {route.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link href="#" color="foreground">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button as={Link} color="default" href="#" variant="flat">
            Sair
          </Button>
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
