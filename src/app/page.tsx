"use client";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUser } from "@/context/userAuthContext";
import { redirect } from "next/navigation";
import Image from "next/image";

const LoginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Senha is required"),
});

export default function UserLogin() {
  const { logIn, userData } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("userData", userData);
    if (userData && userData.email === "admin@admin.com") {
      redirect("/dashboard");
    }
  }, [userData]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<yup.InferType<typeof LoginSchema>>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      const user = await logIn("admin@admin.com", "admin123");
      console.log("user", user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/next.svg"
          alt="Dashskins Logo"
          width={240}
          height={240}
          className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mx-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-default-100">
          Bem vindo ao Dashskins
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-default-100"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full bg-zinc-900 rounded-md border-0 py-1.5 px-2 text-default-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Digite seu email"
                // disabled={emailSent}
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-default-100"
              >
                Senha
              </label>
              <div className="text-xs">
                <a
                  href="#"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Esqueceu sua senha? Clique aqui
                </a>
              </div>
            </div>

            <div className="mt-1">
              <input
                type="password"
                placeholder="Digite sua senha"
                required
                className="block w-full bg-zinc-900 rounded-md border-0 py-1.5 px-2 text-default-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
