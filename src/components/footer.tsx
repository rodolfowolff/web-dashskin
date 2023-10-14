"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="container mx-auto max-w-7xl pb-1 px-12 bottom-0 h-20 mt-4 bg-[#111111]">
      <div className="flex flex-col justify-center items-center gap-1 pt-6">
        <p className="text-sm text-default-400">
          Criado&nbsp;por&nbsp;
          <Link
            className="text-sm text-slate-50"
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
