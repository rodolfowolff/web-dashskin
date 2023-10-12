"use client";

import { Spacer } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow">
      <section className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-4xl font-bold">Dashskins</p>
          <p className="text-lg">Visualização de dados de dashboards</p>
        </div>
        <Spacer y={2} />
        <p className="text-sm">
          Este é o site para visualização de dados de dashboards
        </p>
      </section>
    </main>
  );
}
