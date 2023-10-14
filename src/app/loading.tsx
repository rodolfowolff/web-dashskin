"use client";
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full h-full items-center justify-center">
      <Spinner className="m-auto w-full" />
    </div>
  );
}
