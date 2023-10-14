import { TableComponent } from "@/components/table/table";

export default function Dashboard() {
  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow pt-4">
      <section className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-4xl font-bold text-default-100">Dashskins</p>
          <p className="text-lg text-default-100">
            Visualização de dados dos usuarios
          </p>
        </div>
      </section>

      <div className="h-2 w-full bg-transparent my-5" />

      <TableComponent />
    </main>
  );
}
