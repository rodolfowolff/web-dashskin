const baseUrl = process.env.NEXT_PUBLIC_URL_API;
import { getCookie } from "cookies-next";

export async function getUsers() {
  const token = getCookie('dashskins-access-token') as string;
  if (!token) {
    return null;
  }
  const res = await fetch(`${baseUrl}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'force-cache',
    next: { tags: ['users'] },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
};

export async function createUser(data: { username: string, email: string, age: number, avatar: string }) {
  const token = getCookie('dashskins-access-token') as string;
  if (!token) {
    return null;
  }

  const res = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
};

export async function editUser(data: { _id: string, username: string, email: string, age: number, avatar: string }) {
  const token = getCookie('dashskins-access-token') as string;
  if (!token) {
    return null;
  }

  const res = await fetch(`${baseUrl}/users/${data._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
};

export async function deleteUser(id: string) {
  const token = getCookie('dashskins-access-token') as string;
  if (!token) {
    return null;
  }

  const res = await fetch(`${baseUrl}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return;
};
