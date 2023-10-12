"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Link = dynamic(() => import("@nextui-org/react").then((mod) => mod.Link));

export const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("/github")) {
    return null;
  }

  return (
    <footer className="container mx-auto max-w-7xl pb-12 px-12">
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-sm text-default-400">
          Created&nbsp;by&nbsp;
          <Link
            isExternal
            className="text-sm"
            href="https://github.com/rodolfowolff"
            target="_blank"
            rel="noreferrer"
            color="foreground"
          >
            Rodolfo Wolff
          </Link>
        </p>
      </div>
    </footer>
  );
};
