import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useModal } from "@/context/modalContext";
import {
  validateAge,
  validateAvatar,
  validateEmail,
  validateName,
} from "@/utils/validations";
import { submitCreateUser, submitEditUser } from "@/app/actions";
import { IUserResponse } from "@/types/response-api";

export default function ModalComponent() {
  const {
    isCreating,
    setIsCreating,
    isEditing,
    setIsEditing,
    userInfo,
    setUserInfo,
  } = useModal();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const isInvalidName = useMemo(() => {
    if (userName === "") return false;
    return validateName(userName) ? false : true;
  }, [userName]);

  const isInvalidEmail = useMemo(() => {
    if (userEmail === "") return false;
    return validateEmail(userEmail) ? false : true;
  }, [userEmail]);

  const isInvalidAge = useMemo(() => {
    if (userAge === "") return false;
    return validateAge(+userAge) ? false : true;
  }, [userAge]);

  const isValidAvatar = useMemo(() => {
    if (userAvatar === "") return false;
    return validateAvatar(userAvatar) ? false : true;
  }, [userAvatar]);

  const onCloseModal = () => {
    setUserInfo({} as IUserResponse);
    setIsCreating(false);
    setIsEditing(false);
    setUserName("");
    setUserEmail("");
    setUserAge("");
    setUserAvatar("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (userName === "" || !validateName(userName)) {
      isValid = false;
    }

    if (userEmail === "" || !validateEmail(userEmail)) {
      isValid = false;
    }

    if (userAge === "" || !validateAge(+userAge)) {
      isValid = false;
    }

    if (userAvatar === "" || !validateAvatar(userAvatar)) {
      isValid = false;
    }

    if (!isValid) {
      alert("Preencha os campos corretamente");
      return;
    }

    if (isCreating) {
      try {
        await submitCreateUser({
          username: userName,
          email: userEmail,
          age: +userAge,
          avatar: userAvatar,
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
        //TODO: show error
        return;
      } finally {
        onCloseModal();
      }
    }

    if (isEditing) {
      try {
        await submitEditUser({
          _id: userInfo?._id,
          username: userName ?? userInfo?.username,
          email: userEmail ?? userInfo?.email,
          age: +userAge ?? userInfo?.age,
          avatar: userAvatar ?? userInfo?.avatar,
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
        //TODO: show error
        return;
      } finally {
        onCloseModal();
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      setUserName(userInfo?.username);
      setUserEmail(userInfo?.email);
      setUserAge(userInfo?.age?.toString());
      setUserAvatar(userInfo?.avatar);
    }
  }, [isEditing]);

  return (
    <>
      <Modal
        isOpen={isCreating || isEditing}
        onClose={onCloseModal}
        // onOpenChange={onOpenChange}
        placement="auto"
        classNames={{
          body: "py-6",
          base: "border-[#111111] bg-[#111111] dark:bg-[#111111] text-[#f4f4f4]",
          header: "border-b-[1px] border-[#f4f4f2]",
          footer: "border-t-[1px] border-[#111111]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isCreating ? "Novo Usuário" : "Editar Usuário"}
              </ModalHeader>

              <form method="POST" action="#" onSubmit={onSubmit}>
                <ModalBody>
                  <Input
                    isClearable
                    value={userName}
                    type="text"
                    label="Nome"
                    variant="bordered"
                    placeholder="Digite o nome"
                    isInvalid={isInvalidName}
                    color={
                      userName === ""
                        ? "primary"
                        : isInvalidName
                        ? "danger"
                        : "success"
                    }
                    errorMessage={isInvalidName && "Insira um nome válido"}
                    onClear={() => setUserName("")}
                    onValueChange={setUserName}
                    className="w-full"
                    labelPlacement="outside"
                  />

                  <Input
                    isClearable
                    value={userEmail}
                    type="email"
                    label="Email"
                    variant="bordered"
                    placeholder="Digite o email"
                    isInvalid={isInvalidEmail}
                    color={
                      userEmail === ""
                        ? "primary"
                        : isInvalidEmail
                        ? "danger"
                        : "success"
                    }
                    errorMessage={
                      isInvalidEmail &&
                      "Insira um email válido (Ex: abc@abc.com)"
                    }
                    onClear={() => setUserEmail("")}
                    onValueChange={setUserEmail}
                    className="w-full"
                    labelPlacement="outside"
                  />

                  <Input
                    isClearable
                    value={String(userAge)}
                    type="string"
                    label="Idade"
                    variant="bordered"
                    placeholder="Digite a idade"
                    isInvalid={isInvalidAge}
                    color={
                      userAge === ""
                        ? "primary"
                        : isInvalidEmail
                        ? "danger"
                        : "success"
                    }
                    errorMessage={
                      isInvalidAge && "Insira uma idade válida (1-100)"
                    }
                    onClear={() => setUserAge("")}
                    onValueChange={setUserAge}
                    className="w-full text-xs"
                    labelPlacement="outside"
                  />

                  <Input
                    isClearable
                    value={userAvatar}
                    type="string"
                    label="Avatar"
                    variant="bordered"
                    placeholder="Digite a url da imagem"
                    isInvalid={isValidAvatar}
                    color={
                      userAvatar === ""
                        ? "primary"
                        : isValidAvatar
                        ? "danger"
                        : "success"
                    }
                    errorMessage={
                      isValidAvatar &&
                      "Insira uma url válida (Ex: https://images.com)"
                    }
                    onClear={() => setUserAvatar("")}
                    onValueChange={setUserAvatar}
                    className="w-full text-xs"
                    labelPlacement="outside"
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    variant="bordered"
                    color="danger"
                    onPress={onCloseModal}
                    size="sm"
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-blue-700 text-default-100 border-1 border-transparent hover:bg-blue-600 hover:border-1 hover:border-blue-100 disabled:opacity-10"
                    onPress={onClose}
                    size="sm"
                    type="submit"
                  >
                    {isCreating ? "Cadastrar" : "Editar"}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
