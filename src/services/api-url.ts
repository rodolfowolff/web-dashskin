const baseUrl = process.env.NEXT_PUBLIC_URL_API;

export async function getUsers() {
  const res = await fetch(`${baseUrl}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
  const res = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
};

export async function editUser(data: { _id: string, username: string, email: string, age: number, avatar: string }) {
  const res = await fetch(`${baseUrl}/users/${data._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
};
