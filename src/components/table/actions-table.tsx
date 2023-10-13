import { Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "../icons";
import { IUserResponse } from "@/types/response-api";

export const ActionsTableComponent = ({ user }: { user: IUserResponse }) => {
  return (
    <td className="flex justify-end items-center gap-4 pr-6 h-14">
      <div>
        <Tooltip content="Ver detalhes">
          <button onClick={() => console.log("View user", user._id)}>
            <EyeIcon size={20} fill="#f8f6f6" />
          </button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Editar" color="secondary">
          <button onClick={() => console.log("Edit user", user._id)}>
            <EditIcon size={20} fill="#f8f6f6" />
          </button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Deletar" color="danger">
          <button onClick={() => console.log("Delete user", user._id)}>
            <DeleteIcon size={20} fill="#f8f6f6" />
          </button>
        </Tooltip>
      </div>
    </td>
  );
};
