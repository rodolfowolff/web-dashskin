"use server";

import { createUser, deleteUser, editUser } from "@/services/api-url";
import { revalidateTag } from "next/cache";

export async function submitCreateUser(
  data: {
    username: string;
    email: string;
    age: number;
    avatar: string;
  },
  token: string
) {
  await createUser(data, token);
  revalidateTag("users");
}

export async function submitEditUser(data: {
  _id: string;
  username: string;
  email: string;
  age: number;
  avatar: string;
}) {
  await editUser(data);
  revalidateTag("users");
}

export async function submitDeleteUser(id: string) {
  await deleteUser(id);
  revalidateTag("users");
}
