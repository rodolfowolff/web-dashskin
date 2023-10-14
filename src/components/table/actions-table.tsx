import { Button, Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "../icons";
import { IUserResponse } from "@/types/response-api";
import { useModal } from "@/context/modalContext";

export const ActionsTableComponent = ({ user }: { user: IUserResponse }) => {
  const { visibleModal, setVisibleModal } = useModal();

  return (
    <td className="flex justify-end items-center gap-1 pr-6 h-14">
      <div>
        <Tooltip content="Ver detalhes">
          <Button
            className="bg-transparent text-default-100 hover:bg-blue-600"
            endContent={<EyeIcon size={18} fill="#f8f6f6" />}
            size="sm"
            onClick={() => setVisibleModal(!visibleModal)}
          />
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Editar">
          <Button
            className="bg-transparent text-default-100 hover:bg-blue-600"
            endContent={<EditIcon size={18} fill="#f8f6f6" />}
            size="sm"
            onClick={() => setVisibleModal(!visibleModal)}
          />
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Deletar">
          <Button
            className="bg-transparent text-default-100 hover:bg-blue-600"
            endContent={<DeleteIcon size={18} fill="#f8f6f6" />}
            size="sm"
            onClick={() => setVisibleModal(!visibleModal)}
          />
        </Tooltip>
      </div>
    </td>
  );
};
