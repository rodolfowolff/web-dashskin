import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckIcon } from "../icons/CheckIcon";
import { useNotification } from "@/context/notificationContext";

export default function NotificationComponent() {
  const { notification } = useNotification();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end mt-11 px-4 py-10 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={notification !== null}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-[#222222] shadow-lg ring-1 ring-blue-600 ring-opacity-50">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckIcon
                    className="h-8 w-8 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-100">
                    {notification?.type === "success"
                      ? "Sucesso"
                      : notification?.type === "error"
                      ? "Erro"
                      : notification?.type === "warning"
                      ? "Atenção"
                      : ""}
                  </p>
                  <p className="mt-1 text-sm text-default-100">
                    {notification?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
