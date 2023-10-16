import { IUserResponse } from "@/types/response-api";
import { create } from "zustand";
import { getCookie } from "cookies-next";
const baseUrl = process.env.NEXT_PUBLIC_URL_API;

type Store = {
  users: IUserResponse[];
  fetchUsers: () => Promise<null | IUserResponse[] | undefined>;
  addUser: (data: Omit<IUserResponse, "_id">) => void;
  editUser: (data: IUserResponse) => void;
  deleteUser: (id: string) => void;
};

export const useUserStore = create<Store>()((set) => ({
  users: [],
  fetchUsers: async () => {
    const token = getCookie("dashskins-access-token") as string;
    if (!token) return null;
    const res = await fetch(`${baseUrl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    set({ users: data });
  },
  addUser: async (data: Omit<IUserResponse, "_id">) => {
    const token = getCookie("dashskins-access-token") as string;
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    set((state) => ({ users: [...state.users, res] }));
  },
  editUser: async (data: IUserResponse) => {
    const token = getCookie("dashskins-access-token") as string;
    const response = await fetch(`${baseUrl}/users/${data._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    set((state) => ({
      users: state.users.map((u) => (u._id === data._id ? res : u)),
    }));
  },
  deleteUser: async (userId: string) => {
    const token = getCookie("dashskins-access-token") as string;
    await fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    set((state) => ({
      users: state.users.filter((u) => u._id !== userId),
    }));
  },
}));
