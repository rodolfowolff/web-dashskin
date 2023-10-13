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
      <h2 className="text-2xl text-default-200">
        Ocorreu um erro ao tentar carregar os dados.
      </h2>
      <Button
        color="primary"
        size="lg"
        href="#"
        variant="flat"
        className="mt-4 hover:bg-blue-600 hover:text-default-100"
        onClick={() => reset()}
      >
        Tentar novamente
      </Button>
    </div>
  );
}
