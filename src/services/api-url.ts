const baseUrl = process.env.NEXT_PUBLIC_URL_API;

export async function getUsers() {
  const res = await fetch(`${baseUrl}/users`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache'
  });
  return await res.json();
};