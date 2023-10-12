"use client"; // Error components must be Client Components

import { Button } from "@nextui-org/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-center w-full">
      <h2 className="text-2xl">Ocorreu um erro ao tentar carregar os dados.</h2>
      <Button
        color="default"
        href="#"
        variant="flat"
        className="mt-4"
        onClick={() => reset()}
      >
        Tentar novamente
      </Button>
    </div>
  );
}
