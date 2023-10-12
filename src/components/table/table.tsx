"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Selection,
  SortDescriptor,
  TableHeader,
  TableColumn,
} from "@nextui-org/react";
import { PlusIcon, SearchIcon } from "@/components/icons";
import { IUserResponse } from "@/types/response-api";
import { RenderCell } from "./render-cell";
import { useVisibleColumns } from "@/context/visibleColumnsContext";
import { HeaderTableFilterComponent } from "./header-table-filter";

export const columnsTable = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "NOME", uid: "username", sortable: true },
  { name: "IDADE", uid: "age", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "AÇÕES", uid: "actions" },
];

export const TableComponent = ({ users }: { users: IUserResponse[] }) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const { visibleColumns } = useVisibleColumns();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "username",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    return columnsTable.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

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

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Pesquisar por nome..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <HeaderTableFilterComponent />

            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
            >
              Adicionar usuário
            </Button>
          </div>
        </div>
        <div className="flex justify-end items-center">
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
  }, [filterValue, onSearchChange, onRowsPerPageChange]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-xs text-default-400 w-48">
          {selectedKeys === "all"
            ? "Todos os usuários selecionados"
            : `${selectedKeys.size} de ${items.length} usuários selecionados`}
        </span>

        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />

        <span className="text-default-400 text-xs">
          Total {users.length} usuários
        </span>
      </div>
    );
  }, [selectedKeys, items.length, hasSearchFilter, page, pages, users.length]);

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={"Nenhum usuário encontrado"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>
                {RenderCell({ user: item, columnKey: columnKey })}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
