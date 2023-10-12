import TableComponent from "@/components/table/table";
import { getUsers } from "@/services/api-url";
import { IResponseApi } from "@/types/response-api";

export default async function Home() {
  let users: IResponseApi = await getUsers();
  if (!users || !users.response.success) {
    return null;
  }

  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow pt-4">
      <section className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-4xl font-bold">Dashskins</p>
          <p className="text-lg">Visualização de dados dos usuarios</p>
        </div>
      </section>

      <div className="h-2 w-full bg-transparent my-5" />

      <TableComponent users={users.response.data || []} />
    </main>
  );
}
