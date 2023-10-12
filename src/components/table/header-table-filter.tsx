import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { columnsTable } from "@/components/table/table";
import { ChevronDownIcon } from "../icons";
import { capitalize } from "@/utils/capitalize";
import { useVisibleColumns } from "@/context/visibleColumnsContext";

export const HeaderTableFilterComponent = () => {
  const { visibleColumns, setVisibleColumns } = useVisibleColumns();

  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          endContent={<ChevronDownIcon className="text-small" />}
          size="sm"
          variant="flat"
        >
          Colunas da tabela
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Colunas da tabela"
        closeOnSelect={false}
        selectedKeys={visibleColumns}
        selectionMode="multiple"
        onSelectionChange={setVisibleColumns as any}
      >
        {columnsTable.map((column) => (
          <DropdownItem key={column.uid} className="capitalize">
            {capitalize(column.name)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
