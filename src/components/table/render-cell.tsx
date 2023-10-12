"use client";

import { Key } from "react";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { IUserResponse } from "@/types/response-api";
import { DeleteIcon, EditIcon, EyeIcon } from "../icons";

interface Props {
  user: IUserResponse;
  columnKey: string | Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = user[columnKey as keyof IUserResponse];
  switch (columnKey) {
    case "username":
      return (
        <User
          avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
          classNames={{
            description: "text-default-500",
          }}
          description={user.username}
          name={cellValue}
        >
          {user.username}
        </User>
      );
    case "age":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-500">
            {user.age}
          </p>
        </div>
      );
    case "email":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-500">
            {user.email}
          </p>
        </div>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4">
          <div>
            <Tooltip content="Ver detalhes">
              <button onClick={() => console.log("View user", user._id)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Editar" color="secondary">
              <button onClick={() => console.log("Edit user", user._id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Deletar" color="danger">
              <button onClick={() => console.log("Delete user", user._id)}>
                <DeleteIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
