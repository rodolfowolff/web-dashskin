import { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { MailIcon } from "../icons";
import { useVisibleModal } from "@/context/modalContext";
import { validateAge, validateEmail, validateName } from "@/utils/validations";

export default function ModalComponent() {
  const { visibleModal, setVisibleModal } = useVisibleModal();
  // const { onOpenChange } = useDisclosure();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");

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

  const isInvalidForm = useMemo(() => {
    return isInvalidName || isInvalidEmail || isInvalidAge;
  });

  const onCloseModal = () => {
    setVisibleModal(false);
    setUserName("");
    setUserEmail("");
    setUserAge("");
  };

  return (
    <>
      <Modal
        isOpen={visibleModal}
        // onOpenChange={onOpenChange}
        placement="top-center"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#111111]/90 backdrop-opacity-90",
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
                Cadastrar
              </ModalHeader>

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
                    isInvalidEmail && "Insira um email válido (Ex: abc@abc.com)"
                  }
                  onClear={() => setUserEmail("")}
                  onValueChange={setUserEmail}
                  className="w-full"
                  labelPlacement="outside"
                />

                <Input
                  isClearable
                  value={userAge}
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
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-red-700/40 text-default-100 border-1 border-transparent hover:bg-red-600 hover:border-1 hover:border-red-100"
                  variant="flat"
                  onPress={onCloseModal}
                  size="sm"
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-blue-700 text-default-100 border-1 border-transparent hover:bg-blue-600 hover:border-1 hover:border-blue-100"
                  onPress={onClose}
                  size="sm"
                >
                  Cadastrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
