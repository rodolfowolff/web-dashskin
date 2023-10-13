"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Input, Button, Pagination, SortDescriptor } from "@nextui-org/react";
import { PlusIcon, SearchIcon } from "@/components/icons";
import { IUserResponse } from "@/types/response-api";
import { HeaderTable } from "./header-table";
import { ActionsTableComponent } from "./actions-table";
import { useVisibleModal } from "@/context/modalContext";
import ModalComponent from "../modal/modal";

export const TableComponent = ({ users }: { users: IUserResponse[] }) => {
  const { visibleModal, setVisibleModal } = useVisibleModal();
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "username",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, hasSearchFilter, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: IUserResponse, b: IUserResponse) => {
      const first = String(
        a[sortDescriptor.column as keyof IUserResponse]
      ).toLowerCase();
      const second = String(
        b[sortDescriptor.column as keyof IUserResponse]
      ).toLowerCase();
      const cmp = first.localeCompare(second, "en", { sensitivity: "base" });

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const bottomPaginate = useMemo(() => {
    return (
      <div className="py-2 px-2 grid grid-cols-2">
        <span className="text-default-400 text-xs col-start-1">
          Total {users.length} usuários
        </span>

        <div className="col-start-2">
          <Pagination
            showControls
            classNames={{
              cursor:
                "bg-[#1e1e1e] text-blue-600 hover:bg-blue-600 border border-blue-600 hover:text-white cursor-pointer",
              item: "text-default-600",
            }}
            // color="primary"
            isDisabled={hasSearchFilter}
            page={page}
            total={pages}
            variant="light"
            onChange={setPage}
          />
        </div>

        <div className="col-start-3">
          <label className="flex items-center text-default-400 text-xs">
            Linhas por página
            <select
              className="bg-transparent outline-none text-default-400 text-xs"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [hasSearchFilter, onRowsPerPageChange, page, pages, users.length]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-4 flex flex-wrap w-full gap-2 items-center md:justify-between">
        <div className="flex w-full sm:w-[34rem] bg-zinc-800 h-8 rounded-lg">
          <Input
            isClearable
            classNames={{
              inputWrapper: "border-1 border-gray-700",
              input: "text-default-200",
            }}
            placeholder="Pesquisar usuario por nome..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
            variant="bordered"
            color="primary"
          />
        </div>
        <div className="flex justify-end w-full sm:w-40">
          <Button
            className="bg-blue-700 text-default-100 border-1 border-transparent hover:bg-blue-600 hover:border-1 hover:border-blue-100"
            endContent={<PlusIcon />}
            size="sm"
            onClick={() => setVisibleModal(!visibleModal)}
          >
            Adicionar usuário
          </Button>
        </div>
      </div>

      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full">
              <HeaderTable />

              <tbody className="divide-y divide-foreground-800 bg-[#121212]">
                {sortedItems.map((user) => (
                  <tr key={user._id}>
                    <td className="whitespace-nowrap text-sm font-medium text-foreground-50 pl-4">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <Image
                            className="h-11 w-11 rounded-full"
                            src={user.avatar}
                            alt={user.username + " avatar"}
                            width={70}
                            height={70}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-default-200">
                            {user.username}
                          </div>
                          <div className="mt-1 text-foreground-50 text-xs font-light">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 text-sm text-foreground-50">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 text-sm text-foreground-50">
                      {user.age}
                    </td>

                    <ActionsTableComponent user={user} />
                  </tr>
                ))}
              </tbody>
            </table>

            {bottomPaginate}
          </div>
        </div>
      </div>

      <ModalComponent />
    </div>
  );
};
