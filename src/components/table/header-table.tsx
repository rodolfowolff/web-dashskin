// import { ChevronDownIcon } from "../icons";

export const HeaderTable = () => {
  const columnsTable = [
    { name: "NOME", uid: "username", sortable: true },
    { name: "EMAIL", uid: "email" },
    { name: "IDADE", uid: "age", sortable: true },
    { name: "AÇÕES", uid: "actions" },
  ];

  return (
    <thead>
      <tr>
        {columnsTable.map((item) =>
          item.uid === "actions" ? (
            <th key={item.uid} scope="col" className="relative py-1 pl-3 pr-0">
              <span className="sr-only">Acoes</span>
            </th>
          ) : (
            <th
              key={item.uid}
              scope="col"
              className="pt-4 pl-4 pr-3 text-left text-xs font-semibold text-foreground-50 sm:pl-0"
            >
              <a href="#" className="group inline-flex">
                {item.name}
                {/* TODO: Desativado: nao implementado */}
                {/* <span className="invisible ml-2 flex-none rounded text-foreground-50 group-hover:visible group-focus:visible">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </span> */}
              </a>
            </th>
          )
        )}
      </tr>
    </thead>
  );
};
