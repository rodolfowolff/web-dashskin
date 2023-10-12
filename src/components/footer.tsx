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
    <footer className="container mx-auto max-w-7xl pb-10 px-12 bottom-0 h-28 mt-4 bg-slate-50">
      <div className="flex flex-col justify-center items-center gap-1 pt-6">
        <p className="text-sm text-default-400">
          Criado&nbsp;por&nbsp;
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
